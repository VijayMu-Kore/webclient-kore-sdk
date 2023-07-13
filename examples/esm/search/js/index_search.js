import {
  KRSearch,
  KRSearchConfig,
} from "../../../../../dist/kore-web-sdk.esm.browser.js";

// window.appConfig = {
//   "production": true,
//   "tag": "qa",
//   "API_SERVER_URL": "https://searchassist-qa.kore.ai",
//   "USE_SESSION_STORE": false,
//   "MIXPANEL_KEY": "5c3bf404d138a0e9ca816fb8421d6665",
//   "INLINE_MANUAL_SITE_KEY": "1ec224ee46620656a9b18a17c80587a3",
//   "deployment_type": "",
//   "APPCUES": {
//       "ENABLE": true,
//       "APPCUES_KEY": "112004"
//   },
//   "topicGuideBaseUrl": "https://koredotcom.github.io/koredotai-docs/searchassist/topic-guide/"
// };
let findlyConfig = KRSearchConfig;
// findlyConfig.botOptions = {
//     "queryPipelineId": "fqp-44d1bc72-44cc-56e5-ac61-79d4eff952bd",
//   "logLevel": "debug",
//   "userIdentity": "vishwas.tak@kore.com",
//   "client": "botbuilder",
//   "botInfo": {
//       "chatBot": "debug_payload_test",
//       "taskBotId": "st-ffec6f37-caec-51fb-bcb8-430a34a3a579"
//   },
//   "clientId": "cs-9510d399-1f66-5dc6-a1c4-66282f5af266",
//   "searchIndexID": "sidx-b14e41f1-d50a-5fc2-bbd2-3c89594b2f47",
//   "koreAPIUrl": "https://searchassist-app.kore.ai/searchassistapi",
//   "reWriteSocketURL": {
//       "protocol": "wss",
//       "hostname": "searchassist-app.kore.ai"
//   },
//   JWTUrl : "https://searchassist-app.kore.ai/searchassistapi/users/sts?rnd=fle73l",
//   accessToken:"H6AwMBFrnL9ilgYt76mQ2rBRqXbS_p3nLMMDEUkjdltidnIIT78JWhr28GeLM149"
// };
// findlyConfig.pickersConfig ={
//   "showDatePickerIcon": false,
//   "showDateRangePickerIcon": false,
//   "showClockPickerIcon": false,
//   "showTaskMenuPickerIcon": true,
//   "showradioOptionMenuPickerIcon": false
// };
// findlyConfig.viaSocket = true;
// findlyConfig.isDev = true;
// findlyConfig.searchInterfaceConfig = {"_id":"fsin-d313669e-d89c-53d1-8312-3c883936bce1","experienceConfig":{"searchBarPosition":"bottom"},"widgetConfig":{"searchBarFillColor":"#FFFFFF","searchBarBorderColor":"#E4E5E7","searchBarPlaceholderText":"Search","searchBarPlaceholderTextColor":"#BDC1C6","searchButtonEnabled":false,"buttonText":"Button","buttonTextColor":"#BDC1C6","buttonFillColor":"#EFF0F1","buttonBorderColor":"#EFF0F1","userSelectedColors":[],"buttonPlacementPosition":"inside"},"interactionsConfig":{"welcomeMsg":"Hi, How can I help you","welcomeMsgColor":"#000080","showSearchesEnabled":false,"showSearches":"frequent","autocompleteOpt":false,"feedbackExperience":{"queryLevel":false,"smartAnswer":false,"lmod":"2023-05-16T10:43:17.643Z"},"querySuggestionsLimit":3,"liveSearchResultsLimit":0,"defaultStatus":"searchBar","welcomeMsgFillColor":"#EFF0F1"},"streamId":"st-ffec6f37-caec-51fb-bcb8-430a34a3a579","searchIndexId":"sidx-b14e41f1-d50a-5fc2-bbd2-3c89594b2f47","indexPipelineId":"fip-1345612a-cc5c-544a-8a40-fe7b26612bf2","queryPipelineId":"fqp-44d1bc72-44cc-56e5-ac61-79d4eff952bd","createdBy":"u-e3165796-308b-5ceb-a4eb-6d6849dec83f","lModifiedBy":"u-e3165796-308b-5ceb-a4eb-6d6849dec83f","createdOn":"2023-05-15T12:41:19.951Z","lModifiedOn":"2023-05-16T15:09:52.422Z","__v":0,"config":{"botActionTemplate":"grid","botActionResultsExperience":"top"}}
findlyConfig.API_KEY_CONFIG.KEY="4fb25712e720490da1efcae56b39d48c21a1d0c7433340af8b7207598e91acc0st60";       
var envURL = 'searchassist-app.kore.ai';
findlyConfig.botOptions.koreAPIUrl = "https://" + envURL + "/searchassistapi/";
findlyConfig.botOptions.baseAPIServer = "https://" + envURL;
findlyConfig.botOptions.reWriteSocketURL.hostname = envURL;
var fSdk = new KRSearch(findlyConfig);
           
            // fSdk.initializeTopDown(findlyConfig,'top-down-search-background-div',searchConfig)
//window.fsdk = fSdk;
fSdk.show(findlyConfig);

// $(".openSearchSDK").click(function () {
//   fsdk.initKoreSDK();
// });
