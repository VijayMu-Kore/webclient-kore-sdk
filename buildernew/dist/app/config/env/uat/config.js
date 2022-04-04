(function ($win) {
    $win.appConfig = {
        API_SERVER_URL: "https://uat.kore.ai",
        CONTEXT_PATH: '/botbuilder',
        MESSENGER_URL:'https://app-int.kore.net',
        BOT_ADMIN_URL:window.location.protocol+"//"+window.location.host+'/admin',
        LOAD_WHATFIX: true,
        ON_PREMISE:false,
        HIDE_SSO_LOGIN:true,
        SSO_PROVIDERS:{'google':true,'microsoft':true,'linkedin':true,'github':false},
        SDK_SPEECH_URL:"https://qa1-speech.kore.ai/",
        GOOGLE_ANALYTICS_KEY:'UA-104351085-2',//UA-92655480-3',
        ENABLE_GOOGLE_SPEECH : false,
        GOOGLE_MAPS_API_KEY: 'AIzaSyBrFX3oIiPxvRTmywKPBFfudkttUej7nAU',
        ENABLE_GOOGLE_MAPS: true,
        ENABLE_SHARE_LOCATION: true, //chat window detects users location and send it to ML
        USE_SESSION_STORE:false,
        ENABLE_SESSION_EXPIRY_TIMER:true, // enabling this will start a timer 5 mins before the ideal time set for the account about to expire// 
        SESSION_VALIDITY_POLLING:true, // enabling this will start polling the access token validitty check every 5 mins //
        DIRECT_SSO_LOGIN:true, // Should be enabled if only services supports. If this is enabled, app will check for directSSO flag from api and if true it will redirect to given sso login based on idp, insted of builder login page//
        SMALLTALK_DEPTH:2, // change the depth in-order to increase the depth level in small-talk
        MIX_PANEL_TOKEN:'ed0fdb1ab47068a456b068ff3a92ddf4',
        ENABLE_MIX_PANEL:false,
        MIX_PANEL_DEV:false,
        ENABLE_LINKEDIN_INSIGHT:false,
        LINKEDIN_INSIGHT_ID:6625201,
        enableHomepage : true,
        homePageIframeUrl:'https://pilot-site.kore.ai/bot-home-3/'
    };
})(window);