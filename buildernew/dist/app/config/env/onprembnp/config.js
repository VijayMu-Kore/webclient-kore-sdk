(function ($win) {
    $win.appConfig = {
        API_SERVER_URL: "https://onprem.korebot.com",
        CONTEXT_PATH: '/botbuilder',
        MESSENGER_URL:'https://message.korebot.com',
        BOT_ADMIN_URL:window.location.protocol+"//"+window.location.host+'/admin',
        LOAD_WHATFIX: true,
        ON_PREMISE:true,
        HIDE_SSO_LOGIN:true,
        GOOGLE_SPEECH_API_KEY : 'YOUR GOOGLE API KEY',
        ENABLE_GOOGLE_SPEECH : false,
        GOOGLE_MAPS_API_KEY: 'AIzaSyBrFX3oIiPxvRTmywKPBFfudkttUej7nAU',
        ENABLE_GOOGLE_MAPS: false,
        ENABLE_SHARE_LOCATION: true //chat window detects users location and send it to ML
    };
})(window);