//This JS script should be ES5 version compatible to work in old browsers
var
    match       = navigator.userAgent.match(/Edge?\/(\d+)\./),
    edgeVersion = match ? parseInt(match[1]) : 0;

window._isEdge = edgeVersion > 0 && edgeVersion < 80;
window._isIE11 = Boolean(navigator.userAgent.match(/rv:11/));

// Redirect to UMD bundle for browsers without module support and non-Chrome Edge browser
if (!/index\.umd\.html/.test(document.location.href)) {
    var
        moduleSupport = 'noModule' in HTMLScriptElement.prototype;
    if (!moduleSupport || window._isEdge || window._isIE11) {
        document.location = 'index.umd.html' + document.location.search;
    }
}

if (document.location.protocol === 'file:') {
    alert('WARNING: You should run examples on a Web server (not using the file: protocol)');
}

if (window.isDemoBrowser) {
    // Handle styling while loading other theme than the default (stockholm).
    // To make pre-rendered page look nice in all themes
    // Check localStorage and QS
    var
        theme      = localStorage.getItem('b-example-theme'),
        themeLink  = document.getElementById('bryntum-theme'),
        themeNames = {
            classic         : 'classic',
            default         : 'classic',
            'classic-dark'  : 'classic-dark',
            dark            : 'classic-dark',
            'classic-light' : 'classic-light',
            light           : 'classic-light',
            material        : 'material'
        };

    if (document.location.search.indexOf('theme=') > -1) {
        theme = /theme=([^&]*)/.exec(document.location.search)[1];
    }

    window.theme = theme && themeNames[theme.toLowerCase()] || 'stockholm';
    themeLink.href = themeLink.href.replace(/[a-z-]+\.css/, window.theme + '.css');
    var listener = function() {
        document.body.classList.remove('is-loading-theme');
        window.removeEventListener('load', listener);
    };
    window.addEventListener('load', listener);
}
