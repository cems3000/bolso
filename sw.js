importScripts('js/sw-utils.js');

const STATIC_CACHE = 'static-v2';
const DYNAMIC_CACHE = 'dynamic-v2';
const INMUTABLE_CACHE = 'inmutable-v1';

const APP_SHELL = [
    //'/',
    'index.html',
    'css/plantilla.css',
    'img/favicon.ico',
    'img/banner/diseno.jpg',
    'img/plantilla/logo.png',
    'img/producto/1.jpg',
    'img/producto/2.jpg',
    'js/app.js',
    'js/sw-utils.js',
    'css/plugins/bootstrap.min.css',
    'css/plugins/dscountdown.css',
    'css/plugins/animate.css',
    'js/plugins/jquery.min.js',
    'js/plugins/popper.min.js',
    'js/plugins/bootstrap.min.js',
    'js/plugins/dscountdown.min.js',
    'js/plugins/scrollUP.js',
    'js/plugins/jquery.easing.js'

];

const APP_SHELL_INMUTABLE = [
    'https://use.fontawesome.com/releases/v5.1.1/css/all.css',
    'https://fonts.googleapis.com/css?family=Open+Sans|Ubuntu+Condensed'
];

self.addEventListener('install', e => {


    const cacheStatic = caches.open(STATIC_CACHE).then(cache =>
        cache.addAll(APP_SHELL));

    const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache =>
        cache.addAll(APP_SHELL_INMUTABLE));



    e.waitUntil(Promise.all([cacheStatic, cacheInmutable]));

});


self.addEventListener('activate', e => {

    const respuesta = caches.keys().then(keys => {

        keys.forEach(key => {

            if (key !== STATIC_CACHE && key.includes('static')) {
                return caches.delete(key);
            }

            if (key !== DYNAMIC_CACHE && key.includes('dynamic')) {
                return caches.delete(key);
            }

        });

    });

    e.waitUntil(respuesta);

});




self.addEventListener('fetch', e => {


    const respuesta = caches.match(e.request).then(res => {

        if (res) {
            return res;
        } else {

            return fetch(e.request).then(newRes => {

                return actualizaCacheDinamico(DYNAMIC_CACHE, e.request, newRes);

            });

        }

    });



    e.respondWith(respuesta);

});