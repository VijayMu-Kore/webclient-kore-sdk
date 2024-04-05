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
//     "queryPipelineId": "fqp-9b63ffd3-3ed6-59e7-95ca-05af11fdd906",
//   "logLevel": "debug",
//   "userIdentity": "vaishali.addala@kore.com",
//   "client": "botbuilder",
//   "botInfo": {
//       "chatBot": "SA demo",
//       "taskBotId": "st-aec7ef8c-c05c-5111-8658-9ed903e2ec34"
//   },
//   "clientId": "cs-cc7a0cbc-03fe-5d25-b4e2-3f9802d5c46c",
//   "searchIndexID": "sidx-5e988156-845c-529a-8ad4-d01a86d50cdc",
//   "koreAPIUrl": "https://searchassist-qa.kore.ai/searchassistapi",
//   "reWriteSocketURL": {
//       "protocol": "wss",
//       "hostname": "searchassist-qa.kore.ai"
//   },
//   JWTUrl : "https://searchassist-qa.kore.ai/searchassistapi/users/sts?rnd=fle73l",
//   accessToken:"4pqWQ1SXHM7eE8Jo8TYoMknmCcTTo6u2hshBHkPewG1pWAEkXMfH6PIEFKHC9EuY"
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
// findlyConfig.searchInterfaceConfig = {"_id":"fsin-de74ac00-0a66-5e69-aa6f-315213da42fa","experienceConfig":{"searchBarPosition":"bottom"},"widgetConfig":{"searchBarFillColor":"#FFFFFF","searchBarBorderColor":"#E4E5E7","searchBarPlaceholderText":"Search","searchBarPlaceholderTextColor":"#BDC1C6","searchButtonEnabled":false,"buttonText":"Button","buttonTextColor":"#BDC1C6","buttonFillColor":"#EFF0F1","buttonBorderColor":"#EFF0F1","userSelectedColors":[],"buttonPlacementPosition":"inside","searchBarIcon":"https://searchassist-qa.kore.ai:443/searchassistapi/getMediaStream/findly/f-84055fd3-fa7b-5f3c-80b8-060ce0b85dbd.png?n=2675452435&s=InFOanAwSC9GRHEva0pxb055Y3Y1ZUtBSXljdjRpWjZneU1tYkEyZmw0cVU9Ig$$"},"interactionsConfig":{"welcomeMsg":"Hi, How can I help you","welcomeMsgColor":"#000080","showSearchesEnabled":false,"showSearches":"frequent","autocompleteOpt":true,"feedbackExperience":{"queryLevel":false,"lmod":"2023-01-30T11:01:30.831Z"},"querySuggestionsLimit":3,"liveSearchResultsLimit":0,"defaultStatus":"searchBar","welcomeMsgFillColor":"#EFF0F1"},"streamId":"st-aec7ef8c-c05c-5111-8658-9ed903e2ec34","searchIndexId":"sidx-5e988156-845c-529a-8ad4-d01a86d50cdc","indexPipelineId":"fip-847103c9-9cee-5fda-84ef-48ea2529ca2c","createdBy":"u-4e0c8e48-0126-51bb-bb74-ad7bd6d9b53c","lModifiedBy":"u-4e0c8e48-0126-51bb-bb74-ad7bd6d9b53c","createdOn":"2022-08-05T17:07:05.805Z","lModifiedOn":"2023-02-07T10:18:29.260Z","__v":0,"queryPipelineId":"fqp-9b63ffd3-3ed6-59e7-95ca-05af11fdd906","config":{"botActionTemplate":"carousel","botActionResultsExperience":"top"}}
// findlyConfig.API_KEY_CONFIG.KEY = "de0cb5075040436aa292310dadbd386f69fe067f996a4280a873375912e0c6c7stb3"|| "78711128eece408b8ff069b7fb87a4520ae6efe326714c78854ca8703e5de50aste4";    
// findlyConfig['extractionSourceIdList']=[
//   "fs-21fa1ad5-a942-5977-a9be-976a9e3884e1",
//   "fs-8c65bdad-837c-50f0-83d2-08a5da5de393",
//   "fs-2f0bcc3f-024a-5603-8a56-37009bfea49c"
//   ];
// findlyConfig['knowledgeAIConfig'] = {
//   "userInfo": {
//   "jwt": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2ODA1OTQ0NjMsImV4cCI6MTY4MDY4MDg2MywiaXNzIjoiY3MtNmM1MmIzZTktNjRiYS01YjM4LTgwM2UtNmJmMmViMmE4MDliIiwic3ViIjoiMzYwNDM3MDItYWJjNS00YWFkLWJiNWYtZmZhZTkzM2Y3YTkzYTI0NjM2NWEtMWMzZC00Y2UzLTk2YjItNTEwNGJjZGY1NjQ4IiwiaXNBbm9ueW1vdXMiOmZhbHNlfQ.Yh2GUkcanhy72imh2UXaMejvqUS33QpEF1d6okuBjPA",
//   "koreAPIUrl": "https://searchassist-app.kore.ai:443/",
//   "channel": "rtm",
//   "apiKey": "399b4d81323b4310890449443bbe5e28e6e140b88d3e43ed955b4d6a11c7d929sta4",
//   "identity": "36043702-abc5-4aad-bb5f-ffae933f7a93a246365a-1c3d-4ce3-96b2-5104bcdf5648",
//   "botInfo": {
//   "name": "K-AI Marketing",
//   "_id": "st-a4af6c25-38b6-59c0-ada7-af7a822c1891",
//   "searchIndexId": "sidx-c2e7b20e-47f4-5f21-9c43-c59c2b144f44",
//   "clientId": "cs-6c52b3e9-64ba-5b38-803e-6bf2eb2a809b",
//   "clientSecretId": "xjz6WZ+w5W0Cwvg2TjqaXitG6GSd2tloveQksRgl7Ec="
//   }
//   },
//   "jwtGrantData": {
//   "authorization": {
//   "accessToken": "fnBX4tVVzWS8TbtvIKlSX7x1tW5bl85SbeZtoLPnMt0hz-5Td8hz6roHYJ20eRJ-",
//   "token_type": "bearer",
//   "expiresDate": "2023-04-06T07:47:43.812Z",
//   "refreshExpiresDate": "2023-04-19T07:47:43.812Z",
//   "issuedDate": "2023-04-04T07:47:43.812Z"
//   },
//   "userInfo": {
//   "userId": "u-c99640cc-6e2c-58c8-a4ea-ea5d7890aa94",
//   "accountId": "5fd1e4cd000df82aebd64f0a",
//   "identity": "cs-6c52b3e9-64ba-5b38-803e-6bf2eb2a809b__36043702-abc5-4aad-bb5f-ffae933f7a93a246365a-1c3d-4ce3-96b2-5104bcdf5648",
//   "managedBy": "5fd1e4cd000df82aebd64f0a"
//   }
//   }
//   }
findlyConfig = {
    "botOptions": {
        "logLevel": "debug",
        "koreAPIUrl": "https://searchassist-qa.kore.ai/searchassistapi/",
        "baseAPIServer": "https://searchassist-qa.kore.ai",
        "JWTUrl": "https://mk2r2rmj21.execute-api.us-east-1.amazonaws.com/dev/users/sts",
        "userIdentity": 0.3890283945672628,
        "botInfo": {
            "chatBot": "Try Now",
            "taskBotId": "st-527d681b-d0af-5886-9f02-e34483a2b18d"
        },
        "clientId": "cs-33f06b80-9189-5dbe-8803-98930dfb7a82",
        "clientSecret": "ig3cu5VJTF9catfmWcnasFGCnhXa6vHqw5DBl9UPSco=",
        "searchIndexID": "sidx-9b137811-a3e6-5504-9164-a9eea73ec5a3",
        "reWriteSocketURL": {
            "protocol": "wss",
            "hostname": "searchassist-qa.kore.ai"
        },
        "interface": "top-down",
        "assertion": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTIzMzUxNTg4MTcsImV4cCI6MTcxMjQyMTU1ODgxNywiYXVkIjoiaHR0cHM6Ly9pZHByb3h5LmtvcmUuY29tL2F1dGhvcml6ZSIsImlzcyI6ImNzLTMzZjA2YjgwLTkxODktNWRiZS04ODAzLTk4OTMwZGZiN2E4MiIsInN1YiI6IjAuMzg5MDI4Mzk0NTY3MjYyOCIsImlzQW5vbnltb3VzIjoiZmFsc2UifQ.2Ji0Zl_n7aRLX_s9LHF5INe4_1FZ8pf95Y-Ft7WXiiM",
        "accessToken": "jub0Bae4xLn275Mi-DwmAmMtkYFhs1ld1yGKGou3mfg5ohAuDMXwwYfuoGmsmJhz",
        "maxRequestConcurrency": 1
    },
    "viaSocket": true,
    "pickersConfig": {
        "showDatePickerIcon": false,
        "showDateRangePickerIcon": false,
        "showClockPickerIcon": false,
        "showTaskMenuPickerIcon": true,
        "showradioOptionMenuPickerIcon": false
    },
    "API_KEY_CONFIG": {
        "KEY": "YOUR_API_KEY"
    },
    "knowledgeAIConfig": null,
    "tryNowObj": {
        "extractionDocIdList": [],
        "contextUserEmail": "",
        "siteUrl": "https://www.idfcfi3rstbank.com/",
        "siteSearch": true
    }
}
var fSdk = new KRSearch(findlyConfig);
           
            // fSdk.initializeTopDown(findlyConfig,'top-down-search-background-div',searchConfig)
//window.fsdk = fSdk;
fSdk.show(findlyConfig);

// $(".openSearchSDK").click(function () {
//   fsdk.initKoreSDK();
// });
