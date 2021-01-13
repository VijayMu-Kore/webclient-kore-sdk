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

    var url = window.location.protocol + '//' + window.location.host;
    if (url === 'https://qa-app.smartassist.ai') url = 'https://qa-bots.kore.ai';
    else if (url === 'https://qa1-app.smartassist.ai') url = 'https://qa1-bots.kore.ai';
    else if (url === 'https://uat-app.smartassist.ai') url = 'https://uat.kore.ai';
    else if (url === 'https://staging-app.deflect.ai' || url === 'https://staging-app.smartassist.ai') url = 'https://staging-bots.korebots.com';
    else if (url === 'https://pilots-app.deflect.ai' || url === 'https://pilots-app.smartassist.ai') url = 'https://pilot-bots.kore.ai';
    else if (url === 'https://app.deflect.ai' || url === 'https://app.smartassist.ai') url = 'https://bots.kore.ai';

    botOptions.koreAPIUrl = url + "/api";
    botOptions.brandingAPIUrl = botOptions.koreAPIUrl + '/1.1/smartassist/apps/:appId/settings/widget';
    botOptions.accountId = "";

    // To modify the web socket url use the following option
    // botOptions.reWriteSocketURL = {
    //     protocol: 'PROTOCOL_TO_BE_REWRITTEN',
    //     hostname: 'HOSTNAME_TO_BE_REWRITTEN',
    //     port: 'PORT_TO_BE_REWRITTEN'
    // };

    var chatConfig = {
        botOptions: botOptions,
        brandingInfo: {
            assistantName: "SmartAssist.ai",
            bodyBgColor: "#FFFFFF",
            botIcon: "",
            botIconEnabled: false,
            botchatBgColor: "#F4F4F4",
            botchatTextColor: "#26344A",
            buttonBgColor: "#FFFFFF",
            buttonTextColor: "#26344A",
            desc: "",
            descEnabled: false,
            font: "Inter",
            headerBgColor: "#FFFFFF",
            headerTemplate: "type1",
            headerTextColor: "#26344A",
            logo: "",
            logoEnabled: false,
            userIcon: "",
            userIconEnabled: false,
            userchatBgColor: "#EFF4FF",
            userchatTextColor: "#26344A",
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
