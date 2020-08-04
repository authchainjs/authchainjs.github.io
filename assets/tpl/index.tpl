<!--
  @license The MIT License (MIT)             - [https://github.com/authchainjs/authchainjs.github.io/blob/master/LICENSE]
  @copyright Copyright (c) 2020 Lauro Moraes - [https://github.com/subversivo58]
  @version 0.1.0 [development stage]         - [https://github.com/authchainjs/authchainjs.github.io/blob/master/VERSIONING.md]
-->
<!DOCTYPE html>
<html lang="en-US">
<head>
    <title>AuthChainJS</title>
    <meta charset="UTF-8">
    <meta name="viewport"    content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="AuthChainJS is a 'distributed', 'reliable' and 'privacy-based' Cryptographic Authentication System on the Web">
    <meta name="keywords"    content="crypto, p2p, contract, smart, sockets, webrtc, datachannel, distributed, authchainjs">
    <meta name="author"      content="Subversivo58">
    <meta name="colab"       content="...">
    <meta name="DEBUG"       content="DEVELOPMENT:DEBUG">
    <meta name="reply-to"    content="https://github.com/authchainjs/authchainjs.github.io/issues/new">
    <link rel="copyright"    href="/copyright.html">
    <link rel="icon"         href="/assets/media/image/icons/authchainjs-icon-24x24.svg" type="image/svg">

    <link rel="stylesheet"   href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css"
                                                                                         type="text/css"
                                                                                         integrity="sha384-r4NyP46KrjDleawBgD5tp8Y7UzmLA05oM1iAEQ17CSuDqnUK2+k9luXQOfXJCJ4I"
                                                                                         crossorigin="anonymous">
    <link rel="stylesheet"   href="/assets/css/core.css"                                 type="text/css">
    <link rel="stylesheet"   href="/assets/css/main.css"                                 type="text/css">
    <link rel="manifest"     href="/manifest.json"                                       type="application/json" async>
    <meta name="theme-color" content="#1ebfff">

    <!-- Preload -->
    <link rel="preload" href="/assets/js/prequel.js" as="script">
    <link rel="preload" href="/assets/js/main.mjs" as="script" crossorigin="anonimous">

    <!-- Prequel - verify required requirements and show browsers suggestions (on "oldbrowser" page) -->
    <script src="assets/js/prequel.js"></script>

    <!-- Content Security Policy Rules -
    <meta http-equiv="Content-Security-Policy"
          content="default-src 'none';
          base-uri 'self';
          child-src 'self';
          block-all-mixed-content;
          frame-src 'self';
          media-src 'self';
          manifest-src 'self';
          connect-src 'self' https://api.github.com https://unpkg.com https://cdnjs.cloudflare.com data:;
          object-src 'none';
          form-action 'self';
          img-src 'self' data:;
          script-src 'self' https://unpkg.com https://cdnjs.cloudflare.com;
          style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net;
          font-src 'self' https://fonts.gstatic.com;"> -->

    <!-- NOSCRIPT !-->
    <noscript>
        <!-- noscript tracking --
        <img src="https://localhost:5000/noscript/1x1.gif" class="d-none" alt="">
        -->
        <meta http-equiv="refresh" content="0;url=/nojs.html">
    </noscript>
</head>
<body id="body">

    <section id="background-mask" class="container-fluid px-0 position-absolute md-z-index">
        <!-- PRELOAD MASK -->
        <div class="col-12 justify-content-center pa d-flex">
            <div class="col-sm-12 col-md-10 d-flex align-items-center">

                <div id="dsn-block-box" class="col-12 mx-auto px-0">
                    <div class="alert bg-dark rounded-0" role="alert">
                        <div class="row px-0 mb-3">
                            <div class="col-12 col-sm-8 col-md-7">
                                <h4 class="i18n-remote mb-0 mt-1">Data Storage Notice</h4>
                            </div>
                            <div class="col-12 col-sm-4 col-md-5">
                                <button type="button" data-toggle="modal" data-target="#modal-remote-language-selector" class="i18n-remote btn btn-outline-primary rounded-0 fr">🌎 Translate</button>
                            </div>
                        </div>
                        <div class="col-12 px-0">
                            <p class="i18n-remote">This website uses <b>cookies</b> and other technologies that store information on your device by continuing on this site you agree to this use and our "policies" regarding this use.</p>
                            <p class="i18n-remote">For more detailed information see our of <a href="./policy.html#cookies">Cookies</a> and <a href="./policy.html#privacy">Privacy</a> policies.</p>
                            <div class="col-12 px-0 mt-3 text-right">
                                <button id="dsn-deny-btn" type="button" class="i18n-remote btn btn-outline-danger rounded-0">REJECT</button>
                                <button id="dsn-agree-btn" type="button" class="i18n-remote btn btn-success rounded-0">AGREE THIS</button>
                            </div>
                         </div>
                    </div>
                </div>

                <div id="preload-block-box" class="col-12 mx-auto px-0 d-none">
                    <div class="col-12 mx-auto px-0 mt-3 d-flex">
                        <img src="/assets/media/image/icons/authchainjs-icon-24x24.svg" class="col-2 img-fluid mx-auto">
                    </div>
                    <div id="output" class="col-12 col-md-8 mx-auto px-0 mt-5 d-block">
                        <div class="progress progress-slim">
                            <div id="offline-resources-request-progress-bar" class="progress-bar progress-bar-info progress-bar-striped"></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>


    <!-- DEVELOPMENT LIVERELOAD SUBLIME-TEXT PLUGIN --
    <script src="http://localhost:35729/livereload.js?snipver=1"></script>
    -->
    <!-- JAVASCRIPT RESOURCES -->
    <script type="module" src="/assets/js/main.mjs"></script>

</body>
</html>