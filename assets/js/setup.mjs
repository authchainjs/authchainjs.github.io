/**
 * @license The MIT License (MIT)             - [https://github.com/authchainjs/authchainjs.github.io/blob/master/LICENSE]
 * @copyright Copyright (c) 2020 Lauro Moraes - [https://github.com/subversivo58]
 * @version 0.1.0 [development stage]         - [https://github.com/authchainjs/authchainjs.github.io/blob/master/VERSIONING.md]
 */

// helpers
import _, {
    IsWebBrowserContext,
    IsWebWorkerContext,
    IsServiceWorkerContext,
    IsFrameBox,
    noop, dc, wd, nv, sw, ua, ls, ss, ot, dt, ts,
    // PHP time() approach
    time,
    // protocol
    uri,
    // root (domain)
    BaseRoot,
    // XMLHttpRequest
    XHR,
    // FormData
    FD,
    // global get APIS...
    indexedDB,
    IDBTransaction,
    IDBKeyRange,
    URL,
    Geolocation,
    RegLogout,
    Notifics,
    Fetch,
    Storage,
    Worker,
    ServiceWorker,
    Promise
} from './modules/helpers/Exporter.mjs'
import iLibJS from './modules/lib/IlibJS.mjs'
import Emitter from './modules/lib/Emitter.mjs'
import {
    Cookies as AWCookies,
    Storage as AWStorage,
    Caches as AWCache,
    CleanBrowserStoragement as AWClearBrowserStoragement
} from './modules/lib/AwesomeStorage.mjs'
import AWIndexedDB from './modules/lib/AwesomeIndexedDB.mjs'
import {
    Bytes2Size,
    DeepFreeze,
    DeepEqual,
    ValidURL,
    StringDistance,
    FindAndReplace,
    Queue,
    Stack,
    PathName,
    DirsLevel,
    Redirect,
    SendBeacon,
    SoundPlay,
    ColorPallet,
    TimeLength,
    TimeAgo,
    ReadingTextTime,
    AnchorScrool,
    BrightnessDetector,
    SpyDOM,
    PressHoldCollorCharger
} from './modules/functions/Functions.mjs'

import PolicyHandler from './modules/models/PolicyHandler.mjs'

const Policy = new PolicyHandler();

let BaseRootRegExp = new RegExp(BaseRoot),
    redirectAfterSetup = (dc.referrer !== '') ? dc.referrer : BaseRoot,
    IsSWUpdated

const i18n = new iLibJS('i18n')

const Events = new Emitter('setup')

// for first connection
let DSNDenyBtn = _.DOM.getById('dsn-deny-btn'),
    DSNAgreeBtn = _.DOM.getById('dsn-agree-btn')

// case user don't accept data storage aqgreement
_.DOM.event(DSNDenyBtn, 'click', async evt => {
    // clear all browser storagement (Storage, Cache, Cookie and IndexedDB)
    await AWClearBrowserStoragement()
    // bye bye ... redirect
    Redirect('https://www.google.com/search?q=AuthChainJS')
})


// After HTMLDocument is charged and parsed [don't wait charge stylesheet's, images and subframe's]
_.DOM.event(dc, 'DOMContentLoaded', async evt => {




    Events.on('setup-finish', () => {
        // register ServiceWorker
        nv.serviceWorker.register('/sw-es6-module-shim.js', {
            scope: '/'
        }).then(register => {
            console.log('[Register ServiceWorker] We are live 🚀 !')
            IsSWUpdated = register.installing
            register.addEventListener('updatefound', () => {
                // A wild service worker has appeared in reg.installing!
                IsSWUpdated.addEventListener('statechange', () => {
                    // Has network.state changed?
                    switch (IsSWUpdated.state) {
                        case 'installed':
                            if ( nv.serviceWorker.controller ) {
                                console.log('BUUUUUUUUUUSTA---------------------->')
                                // new update available
                                //$('#modal-serviceworker-updater').modal({
                                //    backdrop: 'static',
                                //    keyboard: false
                                //})
                                //$('#modal-serviceworker-updater-btn').on('click', () => {
                                    // send message to SW
                                    IsSWUpdated.postMessage({
                                        cmd: 'skipWaiting'
                                    })
                                //})
                            }
                            // No update available
                            break
                    }
                })
            })
        }).catch(console.error)

        let refreshing
        nv.serviceWorker.addEventListener('controllerchange', function() {
            if ( refreshing ) {
                return
            }
            ///wd.location.reload()
            refreshing = true
        })

        // observe message
        nv.serviceWorker.addEventListener('message', function(event) {
            if ( 'cmd' in event.data ) {
                console.log(event.data)
            }
        })
    })






    await i18n.get(`${BaseRoot}assets/lang/${PolicyHandler.language}.json`, {
        credentials: 'include',
        cache: 'reload'
    })

    await _.DOM.event(DSNAgreeBtn, 'click', async () => {





        _.DOM.fadeOut(_.DOM.getById('dsn-block-box'), .3, () => {
            _.DOM.getById('preload-block-box').classList.remove('d-none')
        })

        // request configuration file (CFG)
        let CFG = await Fetch('/config/settings.json').then(res => res.json())

        if ( CFG ) {



            // check cookie state
            if ( Policy.permission !== 'authorized' ) {
                // authorize
                Policy.acceptStoragement().then(success => {
                    // analitycs and set language
                    const ConnectionDB = new AWIndexedDB('AuthChainJS', 1, console.log)
                    AWCookies.set('i18n', PolicyHandler.language, {expire: 30, secure: true}).then(() => {/*...*/})
                    // is first time...create db
                    CFG.indexed[1].tbv[2] = CFG
                    ConnectionDB.open(CFG.indexed).then(IDB => {
                        //IDB.update([{
                        //    tbn: 'drive',
                        //    tbk: 'resources',
                        //    tbv: CFG
                        //}]).then(console.log)
                    }).then(async () => {
                    })
                })
            }




            // async fetch resources
            let fetchAsync = async uri => {
                return _.isObject(uri) ? await fetch(uri[0], {integrity: uri[1], crossorigin: 'anonymous'}) : await fetch(uri)
            }
            // show progress
            let allProgress = (uris, progressCallback) => {
                let FIFO = new Queue(),
                    responses = [],
                    d = 0
                uris.forEach(url => FIFO.push(url))
                return new Promise((resolve, reject) => {
                    ;(function init() {
                        let shift = FIFO.shift()
                        if ( shift ) {
                            fetchAsync(shift).then(resp => {
                                if ( resp.ok ) {
                                    _.isObject(shift) ? responses.push([shift[0], resp]) : responses.push([shift, resp])
                                    d++
                                    progressCallback((d * 100) / uris.length, shift)
                                    return Promise.resolve()
                                }
                                throw new Error(shift)
                            }).then(init).catch(reject)
                        } else {
                            resolve(responses)
                        }
                    })();
                })
            }
            // prepare image resources
            let progressbar = _.DOM.getById('offline-resources-request-progress-bar')


            allProgress(CFG.serviceworker.cacheList.basic, (p, u) => {
                p = Math.floor(p.toFixed(0)-5)
                switch (true) {
                    case p > 25 && p < 50:
                        //_.addClass(progressbar, 'w-25')
                        progressbar.classList.add('w-25')
                        break
                    case p > 50 && p < 75:
                        //_.addClass(progressbar, 'w-50')
                        progressbar.classList.add('w-50')
                        break
                    case p > 75 && p < 100:
                        //_.addClass(progressbar, 'w-75')
                        progressbar.classList.add('w-75')
                        break
                }
            }).then(res => {
                //_.addClass(progressbar, 'w-100')
                progressbar.classList.add('w-100')
                // first open cache
                caches.open(`SW-${CFG.serviceworker.cacheVersion}`).then(async cache => {
                    for await(let item of res) {
                        cache.put(item[0], item[1])
                    }
                    Events.emit('setup-finish')
                })
                //
            }).catch(console.error)

        } else {
            alert('Configuration failed!')
        }

    }, _.EventOptions(false, true, true))


    i18n.transcript()
    i18n.observe(document)


}, _.EventOptions(false, true, true), true);
