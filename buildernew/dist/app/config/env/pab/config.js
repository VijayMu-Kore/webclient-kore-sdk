(function ($win) {
    $win.appConfig = {
        API_SERVER_URL: "https://bots.kore.ai",
        CONTEXT_PATH: '/botbuilder',
        MESSENGER_URL:'https://app.kore.com',
        BOT_ADMIN_URL:window.location.protocol+"//"+window.location.host+'/admin',
        LOAD_WHATFIX: true,
        ON_PREMISE:false,
        HIDE_SSO_LOGIN:true,
        SDK_SPEECH_URL:"https://speech.kore.ai/",
        ENABLE_GOOGLE_SPEECH : false,
        GOOGLE_MAPS_API_KEY: 'AIzaSyBrFX3oIiPxvRTmywKPBFfudkttUej7nAU',
        ENABLE_GOOGLE_MAPS: true,
        ENABLE_SHARE_LOCATION: true,//chat window detects users location and send it to ML
        SMALLTALK_DEPTH:2 // change the depth in-order to increase the depth level in small-talk
    };
})(window);