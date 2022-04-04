(function ($win) {
    $win.appConfig = {
        API_SERVER_URL: "http://localhost",
        CONTEXT_PATH: '/botbuilder',//also change in build.json
        MESSENGER_URL: 'http://localhost',
        BOT_ADMIN_URL: 'http://localhost/admin',
        LOAD_WHATFIX: false,
        ON_PREMISE: false,
        HIDE_SSO_LOGIN:true,
        SDK_SPEECH_URL:"https://speech.kore.ai/",
        ENABLE_GOOGLE_SPEECH : false,
        GOOGLE_MAPS_API_KEY: 'AIzaSyBrFX3oIiPxvRTmywKPBFfudkttUej7nAU',
        ENABLE_GOOGLE_MAPS: true,
        ENABLE_SHARE_LOCATION: true, //chat window detects users location and send it to ML
        SMALLTALK_DEPTH:2 // change the depth in-order to increase the depth level in small-talk
    };
})(window);