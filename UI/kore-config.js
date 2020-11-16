(function (KoreSDK) {

    var KoreSDK = KoreSDK || {};

    var botOptions = {};
    botOptions.logLevel = 'debug';
    // botOptions.koreAPIUrl = "https://bots.kore.ai/api/";
    botOptions.koreSpeechAPIUrl = "";//deprecated
    //botOptions.bearer = "bearer xyz-------------------";
    //botOptions.ttsSocketUrl = '';//deprecated
    botOptions.koreAnonymousFn = koreAnonymousFn;
    botOptions.recorderWorkerPath = '../libs/recorderWorker.js';

    // botOptions.JWTUrl = "PLEASE_ENTER_JWTURL_HERE";
    // botOptions.userIdentity = 'PLEASE_ENTER_USER_EMAIL_ID';// Provide users email id here
    // botOptions.botInfo = { name: "PLEASE_ENTER_BOT_NAME", "_id": "PLEASE_ENTER_BOT_ID" }; // bot name is case sensitive
    // botOptions.clientId = "PLEASE_ENTER_CLIENT_ID";
    // botOptions.clientSecret = "PLEASE_ENTER_CLIENT_SECRET";

    botOptions.koreAPIUrl = "https://bankingassistant-qa.kore.ai/api";
    botOptions.brandingAPIUrl = botOptions.koreAPIUrl + '/1.1/wbservice/workbench/sdkBranding';
    botOptions.accountId = "5f84847183c72b4b6ac3fabd";

    botOptions.JWTUrl = "https://mk2r2rmj21.execute-api.us-east-1.amazonaws.com/dev/users/sts";
    botOptions.userIdentity = '';// Provide users email id here
    botOptions.botInfo = { name: "Banking Assist", "_id": "st-cdefce0f-9eed-54c5-b3d7-3c1b2f83b8ec" }; // bot name is case sensitive
    botOptions.clientId = "cs-7a64f3e5-c653-5ed7-9197-84c0e77cc21e";
    botOptions.clientSecret = "wg5jbOXUIwrRcKFrPKHosGsAQsdgX/primRgWTK4Zmc=";

    // To modify the web socket url use the following option
    // botOptions.reWriteSocketURL = {
    //     protocol: 'PROTOCOL_TO_BE_REWRITTEN',
    //     hostname: 'HOSTNAME_TO_BE_REWRITTEN',
    //     port: 'PORT_TO_BE_REWRITTEN'
    // };

    var chatConfig = {
        botOptions: botOptions,
        brandingInfo: {
            "botName": "Smartassist Bot",
            "widgetBgImage": "",
            "bankLogo": "https://bankingassistant-qa.kore.ai:443/api/getMediaStream/market/f-d372add1-3ee4-59f4-9e36-d6e5a2a54369.png?e=1604992197&n=8660621990&s=IjVxejNJNUNjT2Z6NVJjUU9zczlKU2c0R2QyNnJ6S0I1R0ZyNk5WdC85bDQ9Ig$$",
            "botchatBgColor": "#1372ff",
            "botchatTextColor": "#FFFFFF",
            "buttonActiveBgColor": "#D3D3D3",
            "buttonActiveTextColor": "#26344A",
            "buttonInactiveBgColor": "#D3D3D3",
            "buttonInactiveTextColor": "#26344A",
            "createdBy": "u-7397a65f-80c1-588c-9d79-dcc42824beac",
            "lastModifiedBy": "u-7397a65f-80c1-588c-9d79-dcc42824beac",
            "theme": "Theme11",
            "userchatBgColor": "#34363b",
            "userchatTextColor": "#FFFFFF",
            "widgetBgColor": "#000000",
            "widgetBorderColor": "#000000",
            "widgetDividerColor": "#275481",
            "widgetTextColor": "#FFFFFF",
            "createdOn": "2020-10-22T06:03:18.996Z",
            "lastModifiedOn": "2020-10-22T06:03:18.996Z"
        },
        allowIframe: false, 			// set true, opens authentication links in popup window, default value is "false"
        isSendButton: false, 			// set true, to show send button below the compose bar
        isTTSEnabled: false,			// set true, to hide speaker icon
        ttsInterface: 'webapi',        // webapi or awspolly , where default is webapi
        isSpeechEnabled: false,			// set true, to hide mic icon
        allowGoogleSpeech: true,		// set true, to use Google speech engine instead KORE.AI engine.This feature requires valid Google speech API key. (Place it in 'web-kore-sdk/libs/speech/key.js')
        allowLocation: true,			// set false, to deny sending location to server
        loadHistory: true,				// set true to load recent chat history
        messageHistoryLimit: 10,		// set limit to load recent chat history
        autoEnableSpeechAndTTS: false, 	// set true, to use talkType voice keyboard.
        graphLib: "d3",				// set google, to render google charts.This feature requires loader.js file which is available in google charts documentation.
        googleMapsAPIKey: "",
        minimizeMode: true,             // set true, to show chatwindow in minimized mode, If false is set remove #chatContainer style in chatwindow.css  
        multiPageApp: {
            enable: false,              //set true for non SPA(Single page applications)
            userIdentityStore: 'localStorage',//'localStorage || sessionStorage'
            chatWindowStateStore: 'localStorage'//'localStorage || sessionStorage'
        },
        supportDelayedMessages: true,    // enable to add support for renderDelay in message nodes which will help to render messages with delay from UI       
        pickersConfig: {
            showDatePickerIcon: false,           //set true to show datePicker icon
            showDateRangePickerIcon: false,      //set true to show dateRangePicker icon
            showClockPickerIcon: false,          //set true to show clockPicker icon
            showTaskMenuPickerIcon: false,       //set true to show TaskMenu Template icon
            showradioOptionMenuPickerIcon: false //set true to show Radio Option Template icon
        }
    };
    /* 
       allowGoogleSpeech will use Google cloud service api.
       Google speech key is required for all browsers except chrome.
       On Windows 10, Microsoft Edge will support speech recognization.
    */

    KoreSDK.chatConfig = chatConfig
})(window.KoreSDK);
