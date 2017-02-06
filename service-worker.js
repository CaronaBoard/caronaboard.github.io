/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/v2","346dad3207122b6c6d71d08241b1dca5"],["0.670b57b3bab64bfa5b98.js","e728201b98a803ab2707bcdd75ca7f3f"],["elm.html","09fd1d536dc656bba05173a65a114977"],["images/alexandre_goedert.jpg","ae87d27ff83dcae99f30f3c50edc8dd2"],["images/dani_martins.jpg","1fd8019ed788bdb95e133ec997def5a2"],["images/favicons/android-chrome-192x192.png","06348ca54576fd617c26838c9fe25e4a"],["images/favicons/android-chrome-512x512.png","b6084e332c88a742b7a6b6dc4648239a"],["images/favicons/apple-touch-icon.png","1e58e696d1f2a8f702d45c9a564cc3a9"],["images/favicons/browserconfig.xml","845d685a95d4352c595d87f5e6bf9ad7"],["images/favicons/favicon-16x16.png","13a19f06b4e53517eae6478b246d9981"],["images/favicons/favicon-32x32.png","cfcf81d33d5601ba78406607800a891e"],["images/favicons/favicon.ico","964d0fb895c0bf8274a1d68f5aa2ae31"],["images/favicons/manifest.json","d31b018d457d707a2a34c437ba65823e"],["images/favicons/mstile-144x144.png","daf44c7b4c32ea18d7161532b80d9a4e"],["images/favicons/mstile-150x150.png","837d93b560d146ebdab900a95342a985"],["images/favicons/mstile-310x150.png","1ee940ec80bc4ab26c64e6f1a249f1d0"],["images/favicons/mstile-310x310.png","20827067f0a84fd95e786774f66447bb"],["images/favicons/mstile-70x70.png","02966a888fe4b5d82df989626b62e047"],["images/favicons/safari-pinned-tab.svg","70c533d4c2e84f711eac02d4c737b769"],["images/felipe_lahti.jpg","ee936b467212e48cd23910c597f0e3e5"],["images/fernanda_martins.jpg","70fa22c9717d1ea9cadf49311f72cd40"],["images/jeff_stachelski.jpg","1d183e4d478dadb579779fcb8ed33c7b"],["images/leticia_rosa.jpg","80fcad47078b750a95661c3a570772ea"],["images/logo.svg","d4fc15c364b792e01c69f1199936bbec"],["images/marcos_matos.jpg","7dd8d3b967dd7bc279d1be3a27cb4248"],["images/marcus_rodrigues.jpg","d115772428258fe94b98de310caf3489"],["images/mizu.jpg","e9a233ce9239a001f7fc9c6bee421138"],["images/mizu.png","1300ecf4e110815e1a859936ff79dd36"],["images/mizu1.jpg","7ec934fc1bc039d41188d49312b8f9fb"],["images/rodrigo_duarte.jpg","a05d652cee7bb9299bbed905250d7718"],["images/rodrigo_edimar.jpg","e76f6f6cc0f41e890c4158a87b81e1ea"],["images/unknown_men.jpg","c026c5d178d862d1a28567b960e9699e"],["images/unknown_women.jpg","89d0d4d6e0ca2d458613caaba1fbde2e"],["images/youssef_bouguerra.jpg","82fc3367fa16ba2154d4d5c40dc26e9c"],["index.html","3b3722c28ac06bd557434790915b18e0"],["main.670b57b3bab64bfa5b98.js","3165b466d8966dee49f81e090bd9a85a"]];
var cacheName = 'sw-precache-v2-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, /\.js/);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {credentials: 'same-origin'}));
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







