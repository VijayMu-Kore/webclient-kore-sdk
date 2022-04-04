(function ($win) {
    $win.appConfig = {
        API_SERVER_URL: "https://bots.kore.ai",
        CONTEXT_PATH: '/botbuilder',
        MESSENGER_URL:'https://app.kore.com',
        BOT_ADMIN_URL:window.location.protocol+"//"+window.location.host+'/admin',
        LOAD_WHATFIX: true,
        INLINE_MANUAL_SITE_KEY: 'fe8c3e0e52ad8a896d3a66bc27b76530',//prod Key
        ON_PREMISE:true,
        HIDE_SSO_LOGIN:false,
        SSO_PROVIDERS:{'google':true,'microsoft':true,'linkedin':true,'github':false},
        GOOGLE_SPEECH_API_KEY : 'YOUR GOOGLE API KEY',
        ENABLE_GOOGLE_SPEECH : false,                
        GOOGLE_MAPS_API_KEY : 'AIzaSyBrFX3oIiPxvRTmywKPBFfudkttUej7nAU',
        ENABLE_GOOGLE_MAPS : false,        
        ENABLE_SHARE_LOCATION : false,//chat window detects users location and send it to ML
        NO_CARRY_SSO_EMAIL:true,// enable for not to pass email in sso redirects, default is false or undefined
        USE_SESSION_STORE:true,
        ENABLE_SESSION_EXPIRY_TIMER:true, // enabling this will start a timer 5 mins before the ideal time set for the account about to expire// 
        SESSION_VALIDITY_POLLING:true, // enabling this will start polling the access token validitty check every 5 mins //
        DIRECT_SSO_LOGIN:true, // Should be enabled if only services supports. If this is enabled, app will check for directSSO flag from api and if true it will redirect to given sso login based on idp, insted of builder login page//
        SMALLTALK_DEPTH:2,
        MIX_PANEL_TOKEN:'612614fc2aa4983940ff6103d13877b9',
        ENABLE_MIX_PANEL:true,
        enableHomepage : false,
        homePageIframeUrl:'https://kore.ai/bot-home-3/'
    };
})(window);