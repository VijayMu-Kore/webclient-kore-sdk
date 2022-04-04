(function ($win) {
    $win.appConfig = {
        API_SERVER_URL: "https://qa-bots.kore.ai",
        CONTEXT_PATH: '/botbuilder',//also change in build.json
        MESSENGER_URL:'https://qa.kore.ai',
        BOT_ADMIN_URL:window.location.protocol+"//"+window.location.host+'/admin',
        LOAD_WHATFIX: true,
        INLINE_MANUAL_SITE_KEY: '0af942dc9e148f5465a4da82fa728d2b',
        ON_PREMISE:false,
        HIDE_SSO_LOGIN:true,
        SDK_SPEECH_URL:"https://qa-speech.kore.ai/",
        GOOGLE_ANALYTICS_KEY:'UA-104351085-3', //UA-92655480-2',
        ENABLE_GOOGLE_SPEECH : false,
        GOOGLE_MAPS_API_KEY: 'AIzaSyBrFX3oIiPxvRTmywKPBFfudkttUej7nAU',
        ENABLE_GOOGLE_MAPS: true,
        ENABLE_SHARE_LOCATION: true, //chat window detects users location and send it to ML
        USE_SESSION_STORE:true,
        enableHomepage : true,
        homePageIframeUrl:'https://pilot-site.kore.ai/bot-home-3/'
    };
})(window);