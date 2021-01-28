import { LocaleManager, Localizable, AsyncHelper, AjaxHelper, DomHelper, Button, Popup, Tooltip, Toast, Widget, BrowserHelper, EventHelper, ResizeHelper, VersionHelper, DataGenerator, Fullscreen, Events, GlobalEvents, Rectangle } from '../../build/schedulerpro.module.js';
// Load localization


let earlyErrorEvent;

const
    errorListener = errorEvent => earlyErrorEvent = errorEvent;

window.addEventListener('error', errorListener);

if (location.protocol === 'file:') {
    alert('ERROR: You must run examples on a webserver (not using the file: protocol)');
}

// needed for tests
window.__BRYNTUM_EXAMPLE = true;

if (VersionHelper.isTestEnv) {
    window.__applyTestConfigs = true;
}

const
    hintKey              = 'preventhints-' + document.location.href,
    productName          = 'schedulerpro', // PRODUCT NAME (DON'T CHANGE OR REMOVE !!!)
    productFullName      = 'Bryntum Scheduler', // PRODUCT FULL NAME (DON'T CHANGE OR REMOVE !!!)
    defaultTheme         = 'stockholm',
    queryString          = BrowserHelper.queryString,
    maxVideoDuration     = 1000 * 60 * 5,
    browserPaths         = [
        '/examples/', // In our source structure
        '/grid/', // On bryntum.com...
        '/scheduler/',
        '/schedulerpro-pro/',
        '/gantt/',
        '/calendar/'
    ],
    themes               = {
        stockholm       : 'Stockholm',
        classic         : 'Classic',
        'classic-light' : 'Classic-Light',
        'classic-dark'  : 'Classic-Dark',
        material        : 'Material'
    },
    sizeComboIdLocaleMap = {
        'b-size-full'  : 'Full size',
        'b-size-phone' : 'Phone size'
    },
    // Demos that should not use RC online
    disableRootCause     = [
        'bigdataset',
        'csp'
    ],
    pathName             = location.pathname,
    isDemoBrowser        = browserPaths.some(path => pathName.endsWith(path) || Boolean(pathName.match(path + 'index.*html$'))),
    isOnline             = /^(www\.)?bryntum\.com/.test(location.host),
    moduleTag            = document.querySelector('script[type=module]'),
    isModule             = pathName.endsWith('module.html') || (moduleTag && moduleTag.src.includes('app.module.js')) || (pathName.endsWith('index.html') && isOnline),
    isUmd                = pathName.endsWith('umd.html');

if (!isDemoBrowser) {
    document.body.classList.add('b-initially-hidden');
}

// Prevent google translate messing up the DOM in our examples, https://github.com/facebook/react/issues/11538
document.body.classList.add('notranslate');

class Shared extends Localizable(Events()) {
    //region Init

    constructor() {
        super();

        this.initRootCause();

        const
            me    = this,
            reset = 'reset' in queryString;

        if (reset) {
            BrowserHelper.removeLocalStorageItem('b-example-language');
            BrowserHelper.removeLocalStorageItem('b-example-theme');
        }

        // me.onResize = me.onResize.bind(me);
        me.destroyTooltips = me.destroyTooltips.bind(me);
        //me.onWindowScroll  = me.onWindowScroll.bind(me);

        // Module bundle is used by default online

        me.testMode        = queryString.test != null;
        me.developmentMode = queryString.develop != null;

        me.productName = productName;
        me.productFullName = productFullName;

        if (productName === 'calendar' && BrowserHelper.isIE11) {
            Toast.show('Calendar only supports Modern browsers');
        }

        // Apply theme for demo unless the example supplies its own theme
        if (!isDemoBrowser && !document.body.matches('[class*=b-theme]')) {
            const currentThemeId = me.getStoredThemeId() || me.theme;
            if (BrowserHelper.isSafari) {
                // HACK: Bizarre Safari bug, it freezes up completely without this
                setTimeout(() => {
                    me.applyTheme(currentThemeId, true);
                }, 0);
            }
            else {
                // Apply default theme first time when the page is loading
                me.applyTheme(currentThemeId, true);
            }
        }
        else {
            document.body.classList.remove('b-initially-hidden');
        }

        // Enables special styling when generating thumbs
        if (queryString.thumb) {
            document.body.classList.add('b-generating-thumb');
        }

        // Subscribe on locale update to save it into the localStorage
        me.localeManager.on('locale', localeConfig => {
            BrowserHelper.setLocalStorageItem('b-example-language', localeConfig.locale.localeName);

            const
                // cannot use destructure here because of optional chaining
                sizeCombo = me.infoButton?.menu.widgetMap.sizeCombo,
                value     = sizeCombo?.value;

            if (sizeCombo) {
                // Widgets would be localized, but we also have some data records to update manually
                sizeCombo.store.forEach(record => {
                    record.text = me.L(sizeComboIdLocaleMap[record.id]);
                });

                // reset the value to update displayed localized value
                sizeCombo.value = value;
            }
        });

        // Apply default locale first time when the page is loading
        me.localeManager.applyLocale(BrowserHelper.getLocalStorageItem('b-example-language') || LocaleManager.locale.localeName, false, true);
        //}

        const overrideRowCount = queryString.rowCount;

        if (overrideRowCount) {
            const
                parts = overrideRowCount.split(',');

            if (parts.length === 1) {
                DataGenerator.overrideRowCount = parseInt(parts[0]);
            }
            else {
                DataGenerator.overrideRowCount = parts.map(p => parseInt(p));
            }
        }

        //<debug>
        // const
        //     positionMode    = queryString.position || 'translate',
        //     testPerformance = queryString.testPerformance,
        //     rowScrollMode   = queryString.rowScrollMode || 'move';
        //
        // let defaultConfig = Grid.defaultConfig;
        // Object.defineProperty(Grid, 'defaultConfig', {
        //     get : () => {
        //         return Object.assign(defaultConfig, {
        //             testPerformance : testPerformance,
        //             positionMode    : positionMode,
        //             rowScrollMode   : rowScrollMode,
        //             destroyStore    : true
        //         });
        //     }
        // });
        //</debug>

        me.insertHeader();

        // window.addEventListener('resize', me.onResize.bind(me));
        // me.onResize();

        me.loadDescription();
        // Don't load hints for the example browser (or if viewing with ?develop or in tests)
        if (!isDemoBrowser && !me.developmentMode && !me.testMode) {
            me.loadHints();
        }

        if (!isOnline && !VersionHelper.isTestEnv) {
            me.performVersionCheck();
        }

        if (!isDemoBrowser) {
            me.injectFavIcon();
        }

        document.body.style.paddingRight = '0';
    }

    /**
     * Registers the passed URL to return the passed mocked up Fetch Response object to the
     * AjaxHelper's promise resolve function.
     * @param {String} url The url to return mock data for
     * @param {Object|Function} response A mocked up Fetch Response object which must contain
     * at least a `responseText` property, or a function to which the `url` and a `params` object
     * and the `Fetch` `options` object is passed which returns that.
     * @param {String} response.responseText The data to return.
     * @param {Boolean} [response.synchronous] resolve the Promise immediately
     * @param {Number} [response.delay=100] resolve the Promise after this number of milliseconds.
     */
    mockUrl(url, response) {
        AjaxHelper.mockUrl.apply(AjaxHelper, arguments);
    }

    injectFavIcon() {
        DomHelper.createElement({
            tag    : 'link',
            parent : document.head,
            rel    : 'icon',
            href   : '../_shared/images/favicon.png',
            sizes  : '32x32'
        });
    }

    // onResize() {
    //     const container = document.getElementById('container') || document.querySelector('.b-gridbase');
    //
    //     // Demos using  `adopt` will take over container
    //     if (container) {
    //         if (document.body.matches('.b-size-phone')) {
    //             const contentHeight = 667 + 60 + 20;
    //
    //             if (contentHeight > document.body.offsetHeight) {
    //                 const scale = document.body.offsetHeight / contentHeight;
    //                 container.style.transform = `translate(-50%, -50%) scale(${scale})`;
    //             }
    //         }
    //         else {
    //             container.style.transform = '';
    //         }
    //     }
    // }

    //endregion

    //region Header with tools

    insertHeader() {
        const
            pathElements = document.location.pathname.split('/').reduce((result, value) => {
                if (value && !value.endsWith('.html')) {
                    result.push(value);
                }
                return result;
            }, []),
            exampleName  = document.title.split(' - ')[1] || document.title,
            exampleId    = pathElements[pathElements.length - 1];

        let header = document.querySelector('header.demo-header');

        if (!header) {
            header = DomHelper.insertFirst(document.getElementById('container'), {
                tag       : 'header',
                className : 'demo-header'
            });
        }

        header.innerHTML = `
            <div id="title-container">
                <a id="title" href="${isDemoBrowser ? '#' : '../../examples/'}${!isDemoBrowser && isUmd ? 'index.umd.html' : ''}#example-examples-scheduler-${exampleId}">
                    ${exampleName}
                </a>
            </div>
            <div id="tools"></div>
        `;

        const
            tools            = document.getElementById('tools'),
            fullscreenButton = new Button({
                ref      : 'fullscreenButton',
                id       : 'fullscreen-button',
                icon     : 'b-icon-fullscreen',
                tooltip  : 'L{Fullscreen}',
                cls      : 'b-tool keep',
                keep     : true,
                appendTo : tools,
                onClick() {
                    if (Fullscreen.enabled) {
                        if (!Fullscreen.isFullscreen) {
                            Fullscreen.request(document.body);
                        }
                        else {
                            Fullscreen.exit();
                        }
                    }
                }
            }),
            codeButton       = new Button({
                ref     : 'codeButton',
                icon    : 'b-icon-code',
                cls     : 'b-tool keep',
                tooltip : {
                    html  : 'L{Click to show the built in code editor}',
                    align : 't100-b100'
                },
                preventTooltipOnTouch : true,
                appendTo              : tools,
                hidden                : true,
                keep                  : true,
                async onClick({ source : button }) {
                    if (!shared.codeEditor?.isVisible) {
                        if (!shared.codeEditor) {
                            shared.codeEditor = await CodeEditor.addToPage(button);
                        }
                        shared.codeEditor.show().then(() => {
                            shared.codeEditor.focus();
                        });
                    }
                    else {
                        shared.codeEditor.hide();
                    }
                }
            }),
            infoButton       = new Button({
                ref     : 'infoButton',
                icon    : 'b-fa-cog',
                cls     : 'b-tool keep',
                tooltip : {
                    html  : 'L{Click to show info and switch theme or locale}',
                    align : 't100-b100'
                },
                preventTooltipOnTouch : true,
                keep                  : true,
                appendTo              : tools,
                menu                  : {
                    type                   : 'popup',
                    anchor                 : true,
                    align                  : 't100-b100',
                    cls                    : 'info-popup',
                    width                  : '23em',
                    highlightReturnedFocus : false,
                    onBeforeShow() {
                        // Add Ajax-loaded items at last minute.
                        this.items = infoButton.menuItems;
                        delete this.onBeforeShow;
                    }
                }
            }),
            headerTools      = document.getElementById('header-tools');

        Object.assign(this, { fullscreenButton, codeButton, infoButton });

        if (headerTools) {
            Array.from(headerTools.children).forEach(child => {
                tools.insertBefore(child, infoButton);
            });
            headerTools.remove();
        }
    }

    //endregion

    //region Hints

    async initHints() {
        const
            me        = this,
            { hints } = me,
            delay     = hints && hints.delay || 0;

        if (!hints || me.preventHints) {
            return;
        }

        me.toolTips = [];

        // Hide all hints on click anywhere, it also handles touch.
        // Add it first so that it can interrupt and stop the hint showing.
        document.body.addEventListener('mousedown', me.destroyTooltips, true);

        await AsyncHelper.sleep(delay);

        for (const [key, hint] of Object.entries(hints)) {
            const target = key && DomHelper.down(document.body, key);

            if (target) {
                const tooltipCfg = Object.assign({
                    forElement   : target,
                    scrollAction : 'hide',
                    align        : 't-b',
                    html         : {
                        children : [hint.title ? {
                            html      : hint.title,
                            classname : 'header'
                        } : null, {
                            html      : hint.content,
                            classname : 'description'
                        }]
                    },
                    autoShow     : true,
                    cls          : 'b-hint',
                    textContent  : true
                }, hint);

                // we've just combined "title" & "content" into "html" above
                delete tooltipCfg.title;
                delete tooltipCfg.content;

                me.toolTips.push(new Tooltip(tooltipCfg));

                // The delay here essentially causes mousedown dismiss handler to not add immediately so hints stay
                // up even if there were an immediate click
                await AsyncHelper.sleep(me.toolTips.length * 500);

                // If, during the asynchronicity, interaction happened, we must escape.
                if (me.preventHints) {
                    return;
                }
            }
        }

        //window.addEventListener('scroll', this.onWindowScroll, true);
    }

    // NOTE: this was commented out since it has negative effect on scrolling performance
    // onWindowScroll(e) {
    //     if (!e.target.matches('[class^=b-resize-monitor]')) {
    //         this.destroyTooltips();
    //     }
    // }

    destroyTooltips() {
        const me = this;

        // If hints are in the delay stage, prevent them.
        clearTimeout(me.hintTimer);

        me.toolTips.forEach(tip => tip.destroy());
        me.toolTips.length = 0;
        me.preventHints = true;

        document.body.removeEventListener('mousedown', me.destroyTooltips, true);
        //window.removeEventListener('scroll', me.onWindowScroll, true);
    }

    loadHints() {
        const me = this;

        AjaxHelper.get('meta/hints.json', { parseJson : true }).then(response => {
            // If interaction has happened, do not display the hints
            if (!me.preventHints) {
                me.hints = response.parsedJson;

                if (Object.keys(me.hints).length) {
                    me.hasHints = true;
                }
                if (!localStorage.getItem(hintKey)) {
                    // Delay a little to allow Ajax-loaded UIs to arrive so that
                    // hint selectors exist.
                    me.hintTimer = setTimeout(() => {
                        me.initHints();
                    }, 100);
                }
            }
        });
    }

    //endregion

    //region Description

    loadDescription() {
        const
            me     = this,
            button = me.infoButton,
            url    = `${isDemoBrowser ? '_shared/browser/' : ''}app.config.json`;

        AjaxHelper.get(url, { parseJson : true }).then(response => {
            const
                appConfig      = response.parsedJson,
                currentThemeId = me.theme,
                locales        = [],
                { body }       = document;

            Object.keys(me.localeManager.locales).forEach(key => {
                const
                    locale = me.localeManager.locales[key];
                locales.push({
                    value : key,
                    text  : locale.desc,
                    data  : locale
                });
            });

            let localeValue       = me.localeManager.locale.localeName,
                storedLocaleValue = BrowserHelper.getLocalStorageItem('b-example-language'),
                themeCombo;

            // check that stored locale is actually available among locales for this demo
            if (storedLocaleValue && locales.some(l => l.key === storedLocaleValue)) localeValue = storedLocaleValue;

            // Leave as a config on the button during app startup.
            // Items will be added just in time in onBeforeShow to speed app startup.
            button.menuItems = [
                {
                    type : 'widget',
                    html : `<div class="header">${appConfig.title}</div><div class="description">${appConfig.description}</div>`
                },
                // Do not create theme combo ONLY for non-standard theme
                ...((!themes[currentThemeId] || body.matches('.b-theme-custom')) ? [] : [themeCombo = {
                    type        : 'combo',
                    ref         : 'themeCombo',
                    placeholder : 'L{Select theme}',
                    editable    : false,
                    value       : currentThemeId,
                    items       : themes,
                    onAction({ value }) {
                        me.applyTheme(value);
                        button.menu.hide();
                    }
                }]),
                {
                    type        : 'combo',
                    ref         : 'localeCombo',
                    placeholder : 'L{Select locale}',
                    editable    : false,
                    store       : {
                        data    : locales,
                        sorters : [{
                            field     : 'text',
                            ascending : true
                        }]
                    },
                    displayField : 'text',
                    valueField   : 'value',
                    value        : localeValue,
                    onAction     : ({ value }) => {
                        me.localeManager.applyLocale(value);
                        Toast.show(me.L('L{Locale changed}'));
                        button.menu.hide();
                    }
                },
                ...(isDemoBrowser ? [] : [{
                    type        : 'combo',
                    ref         : 'sizeCombo',
                    placeholder : 'L{Select size}',
                    editable    : false,
                    hidden      : productName === 'schedulerpro',
                    items       : [
                        {
                            text  : me.L(sizeComboIdLocaleMap['b-size-full']),
                            value : 'b-size-full'
                        },
                        {
                            text  : me.L(sizeComboIdLocaleMap['b-size-phone']),
                            value : 'b-size-phone'
                        }
                    ],
                    value    : 'b-size-full',
                    onAction : ({ value }) => {
                        if (me.curSize) body.classList.remove(me.curSize);
                        body.classList.add(value);
                        body.classList.add('b-change-size');
                        setTimeout(() => body.classList.remove('b-change-size'), 400);
                        me.curSize = value;
                        button.menu.hide();
                        // TODO: should remove this at some point
                        //     window.addEventListener('resize', me.onResize);
                        //     me.onResize();
                    }
                }, {
                    type     : 'button',
                    ref      : 'hintButton',
                    text     : 'L{Display hints}',
                    onAction : () => {
                        button.menu.hide();
                        me.preventHints = false;
                        me.initHints();
                    }
                }, {
                    type     : 'checkbox',
                    ref      : 'hintCheck',
                    text     : 'L{Automatically}',
                    flex     : '0 1 auto',
                    tooltip  : 'L{CheckAutoHints}',
                    checked  : !localStorage.getItem(hintKey),
                    onAction : ({ checked }) => {
                        if (checked) {
                            localStorage.removeItem(hintKey);
                        }
                        else {
                            localStorage.setItem(hintKey, true);
                        }
                    }
                }])
            ];

            // React to theme changes
            GlobalEvents.on({
                theme : ({ theme, prev }) => {
                    theme = theme.toLowerCase();

                    themeCombo && (themeCombo.value = theme);
                    BrowserHelper.setLocalStorageItem('b-example-theme', theme);
                    body.classList.add(`b-theme-${theme}`);
                    body.classList.remove(`b-theme-${prev}`);

                    // display after loading theme to not show initial transition from default theme
                    body.classList.remove('b-initially-hidden');
                    if (isDemoBrowser) {
                        body.style.visibility = 'visible';
                    }

                    me.prevTheme = prev;

                    me.trigger('theme', {
                        theme,
                        prev
                    });
                },
                // call before other theme listeners
                prio : 1
            });
        });
    }

    //endregion

    //region Theme applying

    applyTheme(newThemeName, initial = false) {
        const
            { body } = document;

        newThemeName = newThemeName.toLowerCase();

        // only want to block transition when doing initial apply of theme
        if (initial) {
            body.classList.add('b-notransition');
        }

        DomHelper.setTheme(newThemeName).then(() => {
            // display after loading theme to not show initial transition from default theme
            body.classList.remove('b-initially-hidden');
            if (isDemoBrowser) {
                body.style.visibility = 'visible';
            }

            if (initial) {
                body.classList.add(`b-theme-${newThemeName}`);
                setTimeout(() => {
                    body.classList.remove('b-notransition');
                }, 100);
            }
        });
    }

    getStoredThemeId(defaultThemeId) {
        // TODO: cleanup this after 5.0.0, no need to use out-of-dated 'dark', 'light', 'default'
        const
            themeId    = queryString.theme || (!this.testMode && BrowserHelper.getLocalStorageItem('b-example-theme')) || defaultThemeId,
            themeNames = {
                stockholm       : 'stockholm',
                classic         : 'classic',
                default         : 'classic',
                'classic-dark'  : 'classic-dark',
                dark            : 'classic-dark',
                'classic-light' : 'classic-light',
                light           : 'classic-light',
                material        : 'material'
            };
        return (themeId ? themeNames[themeId] : null) || defaultThemeId;
    }

    get themeInfo() {
        // CSS file has to be loaded to make the themeInfo available, so fallback to the default theme name
        return DomHelper.themeInfo || { name : this.getStoredThemeId(defaultTheme) };
    }

    get theme() {
        return this.themeInfo.name.toLowerCase();
    }

    // Utility method for when creating thumbs.
    // Eg: shared.fireMouseEvent('mouseover', document.querySelector('.b-task-rollup'));
    fireMouseEvent(type, target, offset = [0, 0]) {
        const
            targetRect = Rectangle.from(target),
            center     = targetRect.center;

        target.dispatchEvent(new MouseEvent(type, {
            clientX : center.x + offset[0],
            clientY : center.y + offset[1],
            bubbles : true
        }));
    }

    //endregion

    // region RootCause

    // Shared RootCause code for frameworks should be updated here scripts/grunt/tasks/templates/rootcause.ejs

    initRootCause() {
        const
            recordVideo       = queryString.video === '1',
            disabled          = !recordVideo && disableRootCause.some(exclude => queryString[exclude]),
            isRootCauseReplay = (() => {
                try {
                    // eslint-disable-next-line no-unused-vars
                    const a = window.top.location.href;
                }
                catch (e) {
                    return true;
                }
                return false;
            })();

        if ((isOnline || isRootCauseReplay) && !disabled && !VersionHelper.isTestEnv) {
            const
                script = document.createElement('script');

            script.async = true;
            script.crossOrigin = 'anonymous';
            script.src = 'https://app.therootcause.io/rootcause-full.js';
            script.addEventListener('load', this.startRootCause);

            document.head.appendChild(script);
        }
    }

    startRootCause() {
        if (queryString.bugbash) {
            const date = new Date();

            // Bug bash cookie lasting 1d
            date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));

            document.cookie = 'bugbash=1' + '; expires=' + date.toUTCString() + '; path=/';
        }

        const
            isBugBash    = Boolean(BrowserHelper.getCookie('bugbash')),
            appIds       = {
                bugbash      : 'd0ed295cf2ef50d15c2ce571b288ee37c3853cf8',
                calendar     : '56c4eb365f023b3b2c6d65623914ca87db182c4a',
                grid         : '9ea6c8f84f179d4c4b7be11ff217bc29367357f8',
                scheduler    : '3dcfabf52d4fa704fb95259a317c72a6ce376313',
                schedulerpro : '8cfa4cf07fc1bf9694a01a3a627f5778d85f5c83',
                gantt        : '9df03cbdc00b455de8bfe58d831e6fd76cc8881e'
            },
            appId        = appIds[isBugBash ? 'bugbash' : productName] || 'unknown',
            version      = VersionHelper.getVersion(productName),
            recordEvents = isBugBash || !('ontouchstart' in document.documentElement), // Skip event recording on touch devices as RC could cause lag
            recordVideo  = isBugBash || queryString.video === '1';

        if (!window.RC) {
            console.log('RootCause not initialized');
            return;
        }

        // eslint-disable-next-line no-undef
        window.logger = new RC.Logger({
            captureScreenshot               : true,
            recordUserActions               : recordEvents && !location.pathname.match('bigdataset'),
            logAjaxRequests                 : true,
            applicationId                   : appId,
            maxNbrLogs                      : isOnline ? 1 : 0,
            autoStart                       : isOnline,
            treatFailedAjaxAsError          : true,
            treatResourceLoadFailureAsError : true,
            showFeedbackButton              : isOnline ? {
                hideDelayAfterSubmit : 500
            } : false,
            recordSessionVideo     : recordVideo,
            showIconWhileRecording : {
                tooltip : 'NOTE: This session is being recorded for debugging purposes'
            },
            recorderConfig : {
                recordScroll             : BrowserHelper.isChrome, // quite big overhead for this in FF
                // Ignore our own auto-generated ids since they are not stable
                shouldIgnoreDomElementId : (id) => /^(b_|b-)/.test(id),
                ignoreCssClasses         : [
                    'focus',
                    'hover',
                    'dirty',
                    'selected',
                    'resizable',
                    'committing',
                    'b-active',
                    'b-sch-terminals-visible'
                ]
            },
            version              : version,
            ignoreErrorMessageRe : /Script error|Unexpected token var|ResizeObserver/i,
            ignoreFileRe         : /^((?!bryntum).)*$/, // Ignore non-bryntum domain errors

            onBeforeLog(data) {
                // Avoid weird errors coming from the browser itself or translation plugins etc
                // '.' + 'js' to avoid cache-buster interference
                if (data.isJsError && (!data.file || !data.file.includes('.' + 'js') || data.file.includes('chrome-extension'))) {
                    return false;
                }
            },

            onErrorLogged(responseText, loggedErrorData) {
                if (loggedErrorData.isFeedback) {
                    let data;

                    try {
                        data = JSON.parse(responseText);
                    }
                    catch (e) {
                    }

                    if (data) {
                        Toast.show({
                            html    : `<h3>Thank you!</h3><p class="feedback-savedmsg">Feedback saved, big thanks for helping us improve. <a target="_blank" href="${data.link}"><i class="b-fa b-fa-link"></i>Link to session</a></p>`,
                            timeout : 10000
                        });
                    }
                }
            }
        });

        if (recordVideo) {
            setTimeout(() => {
                window.logger.stop();
            }, maxVideoDuration);
        }

        // Abort early error listener
        window.removeEventListener('error', errorListener);

        if (earlyErrorEvent) {
            window.logger.logException(earlyErrorEvent.error);
        }
    }

    // endregion

    onThumbError(e) {
        if (e.target.src.includes('thumb')) {
            e.target.style.display = 'none';
        }
    }

    // region version check
    performVersionCheck() {
        const
            lastCheck        = BrowserHelper.getLocalStorageItem('b-latest-version-check-timestamp'),
            checkProductName = `${this.productName}${this.productName.toLowerCase().match(/schedulerpro|grid/) ? '' : '-vanilla'}`;

        // Only 1 version check every other day
        if (lastCheck && Date.now() - new Date(Number(lastCheck)) < 1000 * 60 * 60 * 24 * 2) {
            return;
        }

        AjaxHelper.get(`https://bryntum.com/latest/?product=${checkProductName}`, {
            parseJson   : true,
            credentials : 'omit'
        }).then(this.notifyIfLaterVersionExists).catch(() => {});

        BrowserHelper.setLocalStorageItem('b-latest-version-check-timestamp', Date.now());
    }

    notifyIfLaterVersionExists(response) {
        const
            latestVersion = response.parsedJson && response.parsedJson.name;

        if (latestVersion && VersionHelper.checkVersion(productName, latestVersion, '<')) {
            const
                toast = Toast.show({
                    cls     : 'version-update-toast',
                    html    : `<h4>Update available! <i class="b-fa b-fa-times"></i></h4>A newer version ${latestVersion} is available. Download from our <a href="https://customerzone.bryntum.com">Customer Zone</a>.`,
                    timeout : 15000
                });

            // Clicking the toast snoozes for 1 month
            toast.element.addEventListener('click', () => {
                const
                    inTwoWeeks = new Date().setDate(new Date().getDate() + 14);

                BrowserHelper.setLocalStorageItem('b-latest-version-check-timestamp', inTwoWeeks);
            });
        }
    }

    // endregion
}

const
    keywords  = [
        'import', 'if', 'switch', 'else', 'var', 'const', 'let', 'delete', 'true', 'false', 'from', 'return', 'new',
        'function', '=>', 'class', 'get', 'set', 'break', 'return', 'export', 'default', 'static', 'extends'
    ],
    jsSyntax  = {
        string  : /'.*?'|`.*?`|".*?"/g,
        comment : /[^"](\/\/.*)/g,
        keyword : new RegExp(keywords.join('[ ;,\n\t]|[ ;,\n\t]'), 'g'),
        tag     : /&lt;.*?&gt;/g,
        curly   : /[{}[\]()]/g
    },
    cssSyntax = {
        keyword : /^\..*\b/gm,
        string  : /:(.*);/g
    };

class CodeEditor extends Popup {

    static get $name() {
        return 'CodeEditor';
    }

    static get defaultConfig() {
        return {
            textContent : false,
            autoClose   : false,
            autoShow    : false,
            scrollable  : true,
            closable    : true,

            hideAnimation : {
                right : {
                    from     : 0,
                    to       : 0,
                    duration : '.3s',
                    delay    : '0s'
                }
            },

            showAnimation : {
                right : {
                    from     : 0,
                    to       : 0,
                    duration : '.3s',
                    delay    : '0s'
                }
            },

            title : this.L('<i class="b-fa b-fa-code"></i> L{Code editor}'),

            codeCache : {},

            tools : {
                download : {
                    tooltip : this.L('L{Download code}'),
                    html    : '<a class="b-fa b-fa-file-download" href=""></a>'
                }
            },

            tbar : [
                {
                    type     : 'combo',
                    ref      : 'filesCombo',
                    editable : false,
                    value    : isModule ? 'app.module.js' : isUmd ? 'app.umd.js' : 'app.js',
                    items    : [
                        isModule ? 'app.module.js' : isUmd ? 'app.umd.js' : 'app.js'
                    ],
                    style    : 'margin-right: .5em',
                    onChange : 'up.onFilesComboChange'
                },
                {
                    type     : 'checkbox',
                    label    : 'L{Auto apply}',
                    ref      : 'autoApply',
                    checked  : true,
                    onAction : 'up.onAutoApplyAction'
                },
                {
                    type     : 'button',
                    text     : 'L{Apply}',
                    icon     : 'b-fa b-fa-sync-alt',
                    ref      : 'applyButton',
                    disabled : true,
                    onAction : 'up.applyChanges'
                }
            ],

            bbar : [
                {
                    type : 'widget',
                    ref  : 'status',
                    html : 'Idle'
                }
            ]
        };
    }

    construct(config) {
        super.construct(config);

        const
            me = this;

        me.update = me.buffer('applyChanges', isOnline ? 1500 : 250);

        new ResizeHelper({
            targetSelector : '.b-codeeditor',
            rightHandle    : false,
            skipTranslate  : true,
            minWidth       : 190,
            listeners      : {
                resizeStart() {
                    me.resizing = true;
                },
                resize() {
                    me.resizing = false;
                },
                thisObj : me
            }
        });
    }

    get bodyConfig() {
        const
            result = super.bodyConfig;

        result.children = [{
            tag      : 'pre',
            children : [{
                tag       : 'code',
                reference : 'codeElement'
            }]
        }];

        return result;
    }

    show() {
        if (this.showAnimation) {
            this.showAnimation.right.from = `-${this.width}px`;
        }

        document.body.style.paddingRight = `${this.width}px`;
        return super.show();
    }

    hide() {
        if (this.hideAnimation) {
            this.hideAnimation.right.to = `-${this.width}px`;
        }

        document.body.style.paddingRight = 0;
        return super.hide();
    }

    onElementResize(resizedElement, lastRect, myRect) {
        super.onElementResize(resizedElement, lastRect, myRect);
        if (this.resizing) {
            document.body.style.transition = 'none';
            document.body.style.paddingRight = `${this.width}px`;
            requestAnimationFrame(() => {
                document.body.style.transition = '';
            });
        }
    }

    processJS(code) {
        // Html encode tags used in strings
        code = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');

        // Wrap keywords etc in !keyword!
        Object.keys(jsSyntax).forEach(type => {
            code = code.replace(jsSyntax[type], `§${type}§$&</span>`);
        });

        // Replace wrap from above with span (needs two steps to not think class="xx" is a keyword, etc)
        code = code.replace(/§(.*?)§/g, '<span class="$1">');

        return code;
    }

    processCSS(css) {
        // Wrap keywords etc in !keyword!
        Object.keys(cssSyntax).forEach(type => {
            css = css.replace(cssSyntax[type], (match, p1) => {
                // RegEx with group, use matched group
                if (typeof p1 === 'string') {
                    return match.replace(p1, `§${type}§${p1}</span>`);
                }
                // No group, use entire match
                else {
                    return `§${type}§${match}</span>`;
                }
            });
        });

        // Replace wrap from above with span (needs two steps to not think class="xx" is a keyword, etc)
        css = css.replace(/§(.*?)§/g, '<span class="$1">');

        return css;
    }

    onCloseClick() {
        this.hide();
    }

    onFilesComboChange({ value }) {
        this.loadCode(value);
    }

    onAutoApplyAction({ checked }) {
        this.widgetMap.applyButton.disabled = checked;

        if (checked) {
            this.applyChanges();
        }
    }

    applyChanges() {
        // Add a warning note to investigators of bugs where demo code was modified
        if (window.logger && window.logger.active && !this.addedCodeChangeTag) {
            window.logger.addTag('Code changed', 'true');
            this.addedCodeChangeTag = true;
        }

        switch (this.mode) {
            case 'js':
                this.updateJS();
                break;

            case 'css':
                this.updateCSS();
                break;
        }

        this.updateDownloadLink();
    }

    updateCSS() {
        const
            me = this;

        if (!me.cssElement) {
            me.cssElement = DomHelper.createElement({
                parent : document.head,
                tag    : 'style',
                type   : 'text/css'
            });
        }

        me.codeCache[me.filename] = me.cssElement.innerHTML = me.codeElement.innerText;
    }

    async updateJS() {
        const
            me               = this,
            code             = me.codeElement.innerText + '\nexport default null;\n',
            // Elements added by demo code
            renderedElements = new Set(document.querySelectorAll('[data-app-element=true]')),
            // Widgets added by demo code
            renderedWidgets  = new Set();

        me.codeCache[me.filename] = me.codeElement.innerText;

        // Clean out styles from any copy-pasted IDE code snippets
        Array.from(me.codeElement.querySelectorAll('pre [style]')).forEach(el => el.style = '');

        // Store all current uncontained widgets to be able to cleanup on import fail. If the import fails because of a
        // syntax error some code might have executed successfully and we might get unwanted widgets rendered
        DomHelper.forEachSelector('.b-widget.b-outer', element => {
            const
                widget = Widget.fromElement(element, 'widget');
            if (widget !== this) {
                renderedWidgets.add(widget);
            }
        });

        try {
            me.status = '<i class="b-icon b-icon-spinner">Applying changes';

            // Keeping comment out code around in case we need it to later on support multi module editing
            // // Post to store in backend session
            // const response = await AjaxHelper.post(`../_shared/module.php?file=${me.filename}`, code, { parseJson : true });
            //
            // // Safari doesn't send cookies in import requests, so we extract it and
            // // pass it as part of the URL.
            // if (!me.phpSessionId) {
            //     me.phpSessionId = /PHPSESSID=([^;]+)/.exec(document.cookie)[1];
            // }
            //
            // if (response.parsedJson.success) {

            const
                imports   = code.match(/import .*/gm),
                pathParts = document.location.pathname.split('/'),
                base      = `${document.location.protocol}//${document.location.host}`;

            let rewrittenCode = code;

            // Rewrite relative imports as absolute, to work with createObjectURL approach below

            imports && imports.forEach(imp => {
                const
                    parts = imp.split('../');
                if (parts.length) {
                    const
                        // ../_shared needs Grid/examples, while ../../lib needs Grid/
                        absolute  = pathParts.slice().splice(0, pathParts.length - parts.length).join('/'),
                        // import xx from 'http://lh/Grid/lib...'
                        statement = `${parts[0]}${base}${absolute}/${parts[parts.length - 1]}`;

                    rewrittenCode = rewrittenCode.replace(imp, statement);
                }
            });

            // Retrieve module from session. Wrapped in eval() to hide it from FF, it refuses to load otherwise
            // eslint-disable-next-line no-eval,no-template-curly-in-string
            //await eval(`import('./module.php?file=${me.filename}&dt=${new Date().getTime()}&token=${me.phpSessionId}')`);

            // Retrieve module from object url. Wrapped in eval() to hide it from FF, it refuses to load otherwise
            const
                objectUrl = URL.createObjectURL(new Blob([rewrittenCode], { type : 'text/javascript' }));
            // eslint-disable-next-line no-eval
            await eval(`import(objectUrl)`);

            URL.revokeObjectURL(objectUrl);

            document.body.style.paddingRight = `${this.width}px`;

            DomHelper.removeEachSelector(document, '#tools > .remove-widget');

            me.widgetMap.applyButton.disable();

            // Destroy pre-existing demo tools, grids etc. after the import, to lessen flickering
            renderedWidgets.forEach(widget => !widget.isDestroyed && !widget.keep && widget.destroy());

            // Destroy any additional elements added by the demo
            renderedElements.forEach(element => element.remove());

            // If we have gotten this far the code is valid
            me.element.classList.remove('invalid');
            me.title = me.L('<i class="b-fa b-fa-fw b-fa-code"></i> L{Code editor}');
            me.status = 'Idle';
            // }
        }
        catch (e) {
            // Exception, either some network problem or invalid code
            me.title = me.L('<i class="b-fa b-fa-fw b-fa-skull"></i> L{Code editor}');
            me.element.classList.add('invalid');
            me.status = e.message;

            if (!VersionHelper.isTestEnv) {
                console.warn(e.message);
            }

            // Remove any widgets created by the failed import (might have successfully added some)
            DomHelper.forEachSelector('.b-widget', element => {
                const
                    widget = Widget.fromElement(element);
                // Only care about top level components
                if (widget && !widget.isDestroyed && !widget.owner && !renderedWidgets.has(widget)) {
                    try {
                        widget.destroy();
                    }
                    catch (e) {
                        // We might be in a case where a misconfigured Widget throws an exception mid-setup
                    }
                }
            });
        }
    }

    async loadCode(filename = isModule ? 'app.module.js' : isUmd ? 'app.umd.js' : 'app.js') {
        const
            me = this;

        let code      = me.codeCache[filename],
            exception = null;

        me.filename = filename;

        if (!code) {
            try {
                const
                    response = await AjaxHelper.get(location.href.replace(/[^/]*$/, '') + filename);
                code = me.codeCache[filename] = await response.text();
            }
            catch (e) {
                code = '';
                exception = e;
            }
        }

        me.loadedCode = code;

        if (filename.endsWith('.js')) {
            me.mode = 'js';
            code = me.processJS(code);
        }
        else if (filename.endsWith('.css')) {
            me.mode = 'css';
            code = me.processCSS(code);
        }

        me.codeElement.innerHTML = code;
        me.status = `${exception ? exception.message : 'Idle'}`;

        me.toggleReadOnly();
        me.updateDownloadLink();

        me.contentElement.querySelector('code').setAttribute('spellcheck', 'false');
    }

    get focusElement() {
        return this.codeElement;
    }

    set status(status) {
        this.widgetMap.status.html = status;
    }

    updateDownloadLink() {
        let { downloadLink } = this;

        if (!downloadLink) {
            downloadLink = this.downloadLink = this.tools.download.element.firstElementChild;
        }

        downloadLink.download = this.filename;
        downloadLink.href = `data:text/${this.filename.endsWith('.css') ? 'css' : 'javascript'};charset=utf-8,${escape(this.codeElement.innerText)}`;
    }

    get supportsImport() {
        if (!Object.prototype.hasOwnProperty.call(this, '_supportsImports')) {
            try {
                eval('import(\'../_shared/dummy.js\')'); // eslint-disable-line no-eval
                this._supportsImports = true;
            }
            catch (e) {
                this._supportsImports = false;
            }
        }
        return this._supportsImports;
    }

    toggleReadOnly() {
        const
            me                            = this,
            { widgetMap, contentElement } = me,
            readOnly                      = me.mode === 'js' && (me.hasImports || isUmd || !me.supportsImport);

        if (readOnly) {
            contentElement.classList.add('readonly');
            widgetMap.applyButton.disabled = true;
            widgetMap.autoApply.disabled = true;
            me.status = '<i class="b-fa b-fa-lock" /> Read only' + (!me.supportsImport ? ' (try it on Chrome or Firefox)' : '');
        }
        else {
            contentElement.classList.remove('readonly');
            widgetMap.autoApply.disabled = false;
            me.status = 'Idle';
        }

        // Have not figured out any easy way of editing additional modules, read only for now.
        // Ticket to resolve : https://app.assembla.com/spaces/bryntum/tickets/8429
        contentElement.querySelector('code').setAttribute('contenteditable', !readOnly);
    }

    // Find all imports in the code, extracting their filename to populate combo with
    extractImports(code) {
        const
            regex   = /'\.\/(.*)';/g,
            imports = [];

        let result;

        while ((result = regex.exec(code)) !== null) {
            imports.push(result[1]);
        }

        return imports;
    }

    static async addToPage(button) {
        const
            editor                        = shared.codeEditor = new CodeEditor({
                owner    : button,
                appendTo : Widget.floatRoot
            }),
            { widgetMap, contentElement } = editor,
            filesStore                    = widgetMap.filesCombo.store;

        if (editor.showAnimation) {
            editor.element.style.right = `-${editor.width}px`;
        }
        else {
            editor.element.style.right = 0;
        }

        Widget.disableThrow = true;

        await editor.loadCode();

        // Populate combo with imports. If we have imports, editing will be disabled for now #8429
        const
            imports = editor.extractImports(editor.loadedCode);
        filesStore.add(imports.map(file => ({
            text  : file,
            value : file
        })));
        editor.hasImports = imports.length > 0;

        editor.toggleReadOnly();

        // Include css in combo
        if (document.head.querySelector('[href$="app.css"]')) {
            filesStore.add({
                text  : 'resources/app.css',
                value : 'resources/app.css'
            });
        }

        // Only show combo if it has multiple items, no point otherwise :)
        widgetMap.filesCombo[filesStore.count > 1 ? 'show' : 'hide']();

        EventHelper.on({
            element : contentElement,
            input() {
                if (widgetMap.autoApply.checked) {
                    editor.update();
                }
                else {
                    widgetMap.applyButton.enable();
                }
            },
            keydown(event) {
                if (event.key === 'Enter') {
                    document.execCommand('insertHTML', false, '<br>');
                    event.preventDefault();
                }
            },
            thisObj : editor
        });

        return editor;
    }
}

//<debug>
// lazy debugging
setTimeout(async() => {
    window.grid = bryntum.query('grid', true) || bryntum.query('treegrid', true);
    window.scheduler = bryntum.query('scheduler', true) || bryntum.query('schedulerpro', true);
    window.schedulerPro = bryntum.query('schedulerpro', true);
    window.gantt = bryntum.query('gantt', true);
    window.calendar = bryntum.query('calendar', true);

    if ((window.grid || window.scheduler || window.gantt || window.calendar) && !isDemoBrowser) {
        shared.codeButton.show();
    }

    // Show code editor
    if (queryString.code) {
        shared.codeEditor = await CodeEditor.addToPage(shared.codeButton);
        shared.codeEditor.show().then(() => shared.codeEditor.focus());
    }
}, 100);
//</debug>

const shared = new Shared();

// ugly, but needed for bundled demo browser to work
window.shared = shared;

export default shared;
