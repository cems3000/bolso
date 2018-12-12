var url = window.location.href;
var swLocation = '/bolso/sw.js';

if (navigator.serviceWorker) {
    if (url.includes('localhost')) {
        swLocation = '/sw.js';
    }

    navigator.serviceWorker.register(swLocation);
}