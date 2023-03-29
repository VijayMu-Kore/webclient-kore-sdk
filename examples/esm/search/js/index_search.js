import {
  KRSearch,
  KRSearchConfig,
} from "../../../../../dist/kore-web-sdk.esm.browser.js";

window.appConfig = {
  "production": true,
  "tag": "qa",
  "API_SERVER_URL": "https://searchassist-qa.kore.ai",
  "USE_SESSION_STORE": false,
  "MIXPANEL_KEY": "5c3bf404d138a0e9ca816fb8421d6665",
  "INLINE_MANUAL_SITE_KEY": "1ec224ee46620656a9b18a17c80587a3",
  "deployment_type": "",
  "APPCUES": {
      "ENABLE": true,
      "APPCUES_KEY": "112004"
  },
  "topicGuideBaseUrl": "https://koredotcom.github.io/koredotai-docs/searchassist/topic-guide/"
};
let findlyConfig = KRSearchConfig;
findlyConfig.botOptions = {
    "queryPipelineId": "fqp-bcd6cde0-7e1c-5e03-9bcb-724d44fb5ee1",
  "logLevel": "debug",
  "userIdentity": "bharadwaj.adapala@kore.com",
  "client": "botbuilder",
  "botInfo": {
      "chatBot": "Data Application",
      "taskBotId": "st-66820211-476c-59d6-8615-cb4a9387c102"
  },
  "clientId": "cs-343fda98-783f-5644-82d6-d3f09796b56d",
  "searchIndexID": "sidx-1c4e40f0-0cd4-58af-b1b6-ece48cf1e20f",
  "koreAPIUrl": "https://searchassist-qa.kore.ai/searchassistapi",
  "reWriteSocketURL": {
      "protocol": "wss",
      "hostname": "searchassist-qa.kore.ai"
  },
  JWTUrl : "https://searchassist-qa.kore.ai/searchassistapi/users/sts?rnd=fle73l",
  accessToken:"Z1mxF0-IRsLGAzE57M-2ri5CFb64oE4GfIesnrzEjSWm8hA1vSE4RW7Npt9_I97N"
};
findlyConfig.pickersConfig ={
  "showDatePickerIcon": false,
  "showDateRangePickerIcon": false,
  "showClockPickerIcon": false,
  "showTaskMenuPickerIcon": true,
  "showradioOptionMenuPickerIcon": false
};
findlyConfig.viaSocket = true;
findlyConfig.isDev = true;
findlyConfig.searchInterfaceConfig = {"_id":"fsin-446bb1f1-e3a2-5c63-9822-3fde24092408","experienceConfig":{"searchBarPosition":"top"},"widgetConfig":{"searchBarFillColor":"#FFFFFF","searchBarBorderColor":"#E4E5E7","searchBarPlaceholderText":"Type here to search","searchBarPlaceholderTextColor":"#3C4043","searchButtonEnabled":false,"buttonText":"BUTTON","buttonTextColor":"#BDC1C6","buttonFillColor":"#EFF0F1","buttonBorderColor":"#EFF0F1","userSelectedColors":["#202124","#3C4043","#5F6368","#9AA0A6","#BDC1C6","#07377F","#0D6EFD","#FF784B","#7027E5","#FFFFFF"],"buttonPlacementPosition":"outside","searchBarIcon":"https://searchassist-qa.kore.ai:443/searchassistapi/getMediaStream/findly/f-99f75785-3e97-52ef-b23c-ad2a937c5600.png?n=8843398486&s=ImZ1SFJSMWtjdWpOaFJBV0RqVCsrbnVHMURpdnI1eXA1cS9aY29EYXVqbTA9Ig$$"},"interactionsConfig":{"welcomeMsg":"Hi, How can I help you?","welcomeMsgColor":"#3C4043","showSearchesEnabled":true,"showSearches":"frequent","autocompleteOpt":true,"querySuggestionsLimit":5,"liveSearchResultsLimit":10,"feedbackExperience":{"queryLevel":false,"smartAnswer":false,"lmod":"2023-03-26T15:25:42.509Z"}},"streamId":"st-66820211-476c-59d6-8615-cb4a9387c102","searchIndexId":"sidx-1c4e40f0-0cd4-58af-b1b6-ece48cf1e20f","indexPipelineId":"fip-90194d62-66fc-520c-99d2-933c86412a37","queryPipelineId":"fqp-bcd6cde0-7e1c-5e03-9bcb-724d44fb5ee1","createdBy":"u-e3165796-308b-5ceb-a4eb-6d6849dec83f","lModifiedBy":"u-e3165796-308b-5ceb-a4eb-6d6849dec83f","createdOn":"2023-03-26T15:25:42.507Z","lModifiedOn":"2023-03-27T04:37:39.492Z","__v":0,"config":{"botActionTemplate":"grid","botActionResultsExperience":"top"}}
               var fSdk = new KRSearch(findlyConfig);
           
            // fSdk.initializeTopDown(findlyConfig,'top-down-search-background-div',searchConfig)
//window.fsdk = fSdk;
fSdk.show(findlyConfig);

// $(".openSearchSDK").click(function () {
//   fsdk.initKoreSDK();
// });
