import { Store, AjaxHelper, BrowserHelper, DomHelper, DomSync, EventHelper, Toolbar, Popup, Widget, GlobalEvents, VersionHelper } from '../../../build/schedulerpro.module.js';
/* eslint-disable no-new */

class ExamplesApp {
    constructor() {
        const
            me              = this,
            version         = VersionHelper.getVersion(shared.productName),
            groupOrder      = window.groupOrder || {
                Pro                   : 0,
                'Integration/Pro'     : 1,
                Basic                 : 2,
                Intermediate          : 3,
                Advanced              : 4,
                Integration           : 5,
                'Integration/Angular' : 6,
                'Integration/Ionic'   : 7,
                'Integration/React'   : 8,
                'Integration/Vue'     : 9
            },
            examples        = (window.examples || []).map(example => Object.assign(
                {
                    fullFolder : this.exampleFolder(example),
                    id         : this.exampleId(example)
                }, example)
            ),
            storageName     = (name) => `bryntum-${shared.productName}-demo-${name}`,
            saveToStorage   = (name, value) => BrowserHelper.setLocalStorageItem(storageName(name), value),
            loadFromStorage = (name) => BrowserHelper.getLocalStorageItem(storageName(name)),
            store           = me.examplesStore = new Store({
                data   : examples,
                fields : [
                    'folder',
                    'rootFolder',
                    'fullFolder',
                    'group',
                    'title',
                    'version',
                    'build',
                    'since',
                    'offline',
                    'ie',
                    'edge',
                    'id',
                    'updated'
                ],
                groupers : [
                    {
                        field : 'group',
                        fn    : (a, b) => groupOrder[a.group] - groupOrder[b.group]
                    }
                ],
                listeners : {
                    change() {
                        if (me.rendered) {
                            me.refresh();
                        }
                    },
                    thisObj : me
                }
            });

        me.exampleStore = store;
        me.currentTipLoadPromiseByURL = {};
        me.testMode = BrowserHelper.queryString.test != null;

        // remove prerendered examples
        me.examplesContainerEl = document.getElementById('scroller');
        me.examplesContainerEl.innerHTML = '';

        EventHelper.on({
            scroll : {
                handler() {
                    const topElement = document.elementFromPoint(100, 150);
                    jumpTo.value = topElement?.dataset?.group ?? null;
                },
                element   : document.getElementById('browser'),
                throttled : 250
            },
            keydown : {
                handler(e) {
                    // Hook CTRL/F to find
                    if (e.key === 'f' && e.ctrlKey) {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        e.cancelBubble = true;
                        toolbar.widgetMap.filterField.focus();
                    }
                },
                element : document.body
            }
        });

        // Add style for IE11
        if (BrowserHelper.isIE11) {
            document.body.classList.add('b-ie');
        }

        document.getElementById('title').innerHTML = `${shared.productFullName} ${version}`;

        GlobalEvents.on({
            theme() {
                if (me.rendered) {
                    me.refresh();
                }
            }
        });

        me.isOnline = /^(www\.)?bryntum\.com/.test(location.host) || location.search.includes('online');
        me.buildTip = me.isOnline ? 'This demo is not viewable online, but included when you download the trial. ' : 'This demo needs to be built before it can be viewed. ';

        const toolbar = new Toolbar({
            adopt : 'toolbar',
            items : {
                jumpTo : {
                    type     : 'combo',
                    width    : '15em',
                    triggers : {
                        list : {
                            cls   : 'b-fa b-fa-list',
                            align : 'start'
                        }
                    },
                    editable    : false,
                    placeholder : 'Jump to',
                    items       : [{ id : 'top', text : 'Top' }].concat(
                        store.groupRecords.map(r => ({ id : r.id, text : r.meta.groupRowFor }))
                    ),
                    highlightExternalChange : false,
                    onSelect({ record, userAction }) {
                        if (userAction && record) {
                            if (record.id === 'top') {
                                me.scrollToElement(document.querySelector('#intro'));
                                jumpTo.value = null;
                            }
                            else {
                                me.scrollToElement(document.querySelector(`a[data-group="${record.text}"]`));
                            }
                        }
                    }
                },
                filterField : {
                    type  : 'filterfield',
                    width : '15em',
                    store,
                    filterFunction(record, value) {
                        // Check if all words in value exist in example title
                        return value?.toLowerCase().split(' ').every(word => record.title.toLowerCase().includes(word));
                    },
                    placeholder : 'Type to filter',
                    triggers    : {
                        filter : {
                            cls   : 'b-fa b-fa-filter',
                            align : 'start'
                        }
                    },
                    listeners : {
                        change({ value }) {
                            saveToStorage('filter', value);
                        }
                    }
                },
                separator     : '->',
                upgradeButton : {
                    id    : 'upgrade-button',
                    type  : 'button',
                    text  : 'Upgrade guide',
                    icon  : 'b-fa-book',
                    width : '12.5em',
                    href  : me.isOnline ? `/docs/${shared.productName === 'schedulerpro' ? 'schedulerpro-pro' : shared.productName}#upgrade-guide` : '../docs#upgrade-guide'
                },
                docsButton : {
                    id    : 'docs-button',
                    type  : 'button',
                    text  : 'Documentation',
                    icon  : 'b-fa-book-open',
                    width : '12.5em',
                    href  : me.isOnline ? `/docs/${shared.productName === 'schedulerpro' ? 'schedulerpro-pro' : shared.productName}` : '../docs'
                },
                trialButton : me.isOnline ? {
                    type  : 'button',
                    id    : 'downloadtrial',
                    text  : 'Download Trial',
                    icon  : 'b-fa-download',
                    width : '12.5em',
                    menu  : {
                        type      : 'trialpanel',
                        productId : shared.productName,
                        align     : {
                            align            : 't-b',
                            constrainPadding : 20
                        }
                    }
                } : null
            }
        });

        const { filterField, jumpTo } = toolbar.widgetMap;

        if (location.search.match('prerender')) {
            me.embedDescriptions().then(me.render.bind(me));
        }
        else {
            me.render();
        }

        if (!me.testMode) {
            const storedFilter = loadFromStorage('filter');
            storedFilter && (filterField.value = storedFilter);
        }

        this.examplesContainerEl.addEventListener('focusin', me.onFocusIn.bind(me));
    }

    onCloseClick() {
        document.getElementById('intro').style.maxHeight = '0';
    }

    onFocusIn({ target }) {
        if (target?.id?.startsWith('b-example')) {
            this.exampleElements.forEach(example => example.classList[example === target ? 'add' : 'remove']('b-focused'));
            window.location.hash = `#${target?.id.replace(/^b-/, '')}`;
        }
    }

    scrollToLocationHash() {
        // To prevent browser built-in scroll by location hash we use example and header ids with `b-` prefix
        if (window.location.hash) {
            const element = document.getElementById(`b-${window.location.hash.split('#')[1]}`);
            if (element) {
                this.scrollToElement(element);
                element.classList.add('b-focused');
                element.focus();
            }
        }
    }

    scrollToElement(element) {
        if (element) {
            element.scrollIntoView(!BrowserHelper.isIE11 && !VersionHelper.isTestEnv && { behavior : 'smooth' });
        }
    }

    getDomConfig() {
        const
            // Use the getter which relies on DomHelper.themeInfo getter which creates a DOM element and extracts theme name from it,
            // otherwise switching between themes will not change the examples preview pictures.
            { theme } = shared,
            version   = VersionHelper.getVersion(shared.productName),
            isNew     = example => (version && example.since && version.startsWith(example.since)),
            isUpdated = example => (version && example.updated && version.startsWith(example.updated)),
            configs   = [];

        this.examplesStore.records.forEach(example => {
            if (example.isSpecialRow) {
                const group = example.meta.groupRowFor;

                configs.push(
                    {
                        tag       : 'h2',
                        id        : `b-${group}`,
                        className : {
                            'group-header' : 1,
                            [group]        : 1
                        },
                        dataset : {
                            syncId : `header-${group}`,
                            group
                        },
                        html : group
                    });
            }
            else {
                // Show build popup for examples marked as offline and for those who need building when demo browser is offline
                const
                    hasPopup = (example.build && !this.isOnline) || example.offline,
                    id       = example.id;

                configs.push({
                    tag       : 'a',
                    className : {
                        example : 1,
                        new     : isNew(example),
                        updated : isUpdated(example),
                        offline : example.offline
                    },
                    id,
                    draggable : false,
                    href      : example.fullFolder,
                    dataset   : {
                        linkText : hasPopup && this.exampleLinkText(example),
                        linkUrl  : hasPopup && example.fullFolder,
                        syncId   : id,
                        group    : example.group
                    },
                    children : [
                        {
                            className : 'image',
                            children  : [
                                {
                                    tag       : 'img',
                                    draggable : false,
                                    src       : this.exampleThumbnail(example, theme),
                                    alt       : example.tooltip || example.title || '',
                                    dataset   : {
                                        group : example.group
                                    }
                                },
                                {
                                    tag       : 'i',
                                    className : {
                                        tooltip                                     : 1,
                                        'b-fa'                                      : 1,
                                        [hasPopup ? 'b-fa-cog build' : 'b-fa-info'] : 1
                                    }
                                },
                                example.version ? {
                                    className : 'version',
                                    html      : example.version
                                } : null
                            ]
                        },
                        {
                            tag       : 'label',
                            className : 'title',
                            html      : example.title,
                            dataset   : {
                                group : example.group
                            }
                        }
                    ]
                });
            }
        });

        return configs;
    }

    refresh() {
        const me = this;
        DomSync.sync({
            targetElement : me.examplesContainerEl,
            domConfig     : {
                onlyChildren : true,
                children     : me.getDomConfig()
            },
            syncIdField : 'syncId'
        });

        me.exampleElements = document.querySelectorAll('.example');
    }

    render() {
        const me = this;

        me.refresh();

        // A singleton tooltip which displays example info on hover of (i) icons.
        Widget.attachTooltip(me.examplesContainerEl, {
            forSelector  : 'i.tooltip',
            header       : true,
            scrollAction : 'realign',
            textContent  : true,
            maxWidth     : '18em',
            getHtml      : async({ tip }) => {
                const activeTarget = tip.activeTarget;

                if (activeTarget.dataset.tooltip) {
                    tip.titleElement.innerHTML = activeTarget.dataset.tooltipTitle;
                    return activeTarget.dataset.tooltip;
                }

                const linkNode = activeTarget.closest('a');

                const url = `${linkNode.getAttribute('href') || linkNode.dataset.linkUrl}/app.config.json`;

                // Cancel all ongoing ajax loads (except for the URL we are interested in)
                // before fetching tip content
                for (const u in me.currentTipLoadPromiseByURL) {
                    if (u !== url) {
                        me.currentTipLoadPromiseByURL[u].abort();
                    }
                }

                // if we don't have ongoing requests to the URL
                if (!me.currentTipLoadPromiseByURL[url]) {
                    const
                        requestPromise = me.currentTipLoadPromiseByURL[url] = AjaxHelper.get(url, { parseJson : true }),
                        response       = await requestPromise,
                        json           = response.parsedJson,
                        html           = activeTarget.dataset.tooltip = json.description.replace(/[\n\r]/g, '') +
                            ((/build/.test(activeTarget.className)) ? `<br><b>${me.buildTip}</b>` : '');

                    activeTarget.dataset.tooltipTitle = tip.titleElement.innerHTML = json.title.replace(/[\n\r]/g, '');

                    delete me.currentTipLoadPromiseByURL[url];

                    return html;
                }
            }
        });

        document.getElementById('intro').style.display = 'block';
        document.getElementById('close-button').addEventListener('click', me.onCloseClick.bind(me));
        document.body.addEventListener('error', me.onThumbError.bind(me), true);

        EventHelper.on({
            element : me.examplesContainerEl,
            click(event) {
                const el = DomHelper.up(event.target, '[data-link-url]');
                new Popup({
                    forElement : el,
                    maxWidth   : '18em',
                    cls        : 'b-demo-unavailable',
                    header     : '<i class="b-fa b-fa-cog"></i> ' + (me.isOnline ? 'Download needed' : 'Needs building'),
                    html       : me.buildTip + `The demo can be found in distribution folder: <i class="b-fa b-fa-folder-open"> <b>` +
                        (!me.isOnline ? `<a href="${el.dataset.linkUrl}">${el.dataset.linkText}</a>` : el.dataset.linkText) + '</b>',
                    closeAction  : 'destroy',
                    width        : el.getBoundingClientRect().width,
                    anchor       : true,
                    scrollAction : 'realign'
                });
                event.preventDefault();
            },
            delegate : '[data-link-url]'
        });

        EventHelper.on({
            element : me.examplesContainerEl,
            click(event) {
                // To be able to select example name, need to make the text do not work as a link
                if (window.getSelection().toString().length) {
                    event.preventDefault();
                }
            },
            delegate : 'a.example label'
        });

        const
            demoDiv      = document.getElementById('live-example'),
            widgetConfig = window.introWidget; // taken from `examples/_shared/data/widget.js`

        if (demoDiv && widgetConfig) {
            const createIntro = () => {
                // Use "appendTo" instead of "adopt" to insert Grid into the sized container, so IE11 can measure height for grid body
                widgetConfig.appendTo = demoDiv;
                widgetConfig.requireSize = true;
                Widget.create(widgetConfig);
            };

            // Only create the widget when the CSS decides that the host div becomes visible.
            if (DomHelper.getStyleValue(demoDiv, 'display') !== 'none') {
                createIntro();
            }
            else {
                const remover = EventHelper.on({
                    element : window,
                    resize() {
                        if (DomHelper.isVisible(demoDiv)) {
                            createIntro();
                            remover();
                        }
                    }
                });
            }
        }

        me.rendered = true;
        me.scrollToLocationHash();
    }

    embedDescriptions() {
        return new Promise((resolve) => {
            const promises = [];
            this.examplesStore.forEach(example => {
                promises.push(
                    AjaxHelper.get(this.exampleConfig(example), { parseJson : true }).then(response => {
                        const json = response.parsedJson;
                        if (json) {
                            example.tooltip = json.title + ' - ' +
                                json.description.replace(/[\n\r]/g, ' ').replace(/"/g, '\'');
                        }
                    })
                );
            });
            Promise.all(promises).then(resolve);
        });
    }

    onThumbError(e) {
        if (e.target?.src?.includes('thumb')) {
            e.target.style.display = 'none';
        }
    }

    exampleFolder(example, defaultRoot = '') {
        return `${example.rootFolder || defaultRoot}${example.folder}`;
    };

    exampleConfig(example) {
        return `${example.fullFolder}/app.config.json`;
    }

    exampleId(example) {
        return `b-example-${this.exampleFolder(example).replace(/\.\.\//gm, '').replace(/\//gm, '-')}`;
    }

    exampleLinkText(example) {
        return this.exampleFolder(example, 'examples/').replace(/\.\.\//gm, '').replace(/\//gm, '/<wbr>');
    }

    exampleThumbnail(example, theme) {
        return `${example.fullFolder}/meta/thumb.${theme.toLowerCase()}.png`;
    }

}

window.demoBrowser = new ExamplesApp();
