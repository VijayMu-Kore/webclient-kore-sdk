(function ($win) {
    $win.appConfig = {
        API_SERVER_URL: "https://workflows-bots.kore.ai",
        CONTEXT_PATH: '/botbuilder',//also change in build.json
        MESSENGER_URL:'https://workflows.kore.com',
        BOT_ADMIN_URL:window.location.protocol+"//"+window.location.host+'/admin',
        LOAD_WHATFIX: true,
        ON_PREMISE:false,
        HIDE_SSO_LOGIN:true,
        SDK_SPEECH_URL:"https://speech.kore.ai/",
        ENABLE_GOOGLE_SPEECH : false,
        GOOGLE_MAPS_API_KEY: 'AIzaSyBrFX3oIiPxvRTmywKPBFfudkttUej7nAU',
        ENABLE_GOOGLE_MAPS: true,
        ENABLE_SHARE_LOCATION: true //chat window detects users location and send it to ML
    };
})(window);