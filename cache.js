'use strict';

/**
 * 基于 Service Worker 的缓存处理。
 */

var VERSION = '1';

var CACHE_NAME = 'MAIN_' + VERSION;

// 缓存
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('Opened Cache: ' + CACHE_NAME);

            return cache.addAll([
                'public/style/css/main.css',
                'public/style/css/main_release.css'
            ]);
        })
    );

});

// 缓存更新
self.addEventListener('activate', function (event) {
    console.log('Have been activated. Cache name: ' + CACHE_NAME);
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                }).map(function (cacheName) {
                    console.log('Deleteing cache: ' + cacheName);
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('message', function (e) {
    var message = e.data;
    console.log('Got the message:' + message);
});

// 捕获请求并返回缓存数据
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            // Cache hit - return response
            // 如果成功匹配 Cache，则直接返回缓存。
            if (response) {
                return response;
            }

            // 如果没有命中任何缓存，则发起请求，
            // 需要注意：一个 request 仅能被消耗一次，而下面的步骤中，发起请求需要消耗一次，缓存操作也需要消耗一次，
            // 因此复制一个 request 进行请求。
            var fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(
                function (response) {
                    // Check if we received a valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    var responseToCache = response.clone();

                    if (event && event.request && event.request.url.indexOf('browser-sync') !== -1) {
                        return response;
                    }

                    caches.open(CACHE_NAME)
                        .then(function (cache) {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                }
            );
        })
    );
});
