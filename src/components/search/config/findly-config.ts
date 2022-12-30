import korejquery from "../../../libs/korejquery";
const $ = korejquery;
let findlyConfig:any = {};
let botOptionsFindly: any = {};
botOptionsFindly.logLevel = "debug";
var serverUrl = window.location.href;
var paramUrl="searchassist-qa.kore.ai"
if(serverUrl && (serverUrl.includes("https"))){ // for installer 
// if(serverUrl && (serverUrl.includes(".kore.ai") || serverUrl.includes(".korebots.com"))){//for app, dev, qa, pilot, prod
    paramUrl=serverUrl.split('/')[2]
}  
if(window?.JWT_OBJ && window?.JWT_OBJ?.koreAPIUrl){
  paramUrl=window.JWT_OBJ.koreAPIUrl.split("/")[2].split(':')[0];
}
botOptionsFindly.logLevel = 'debug';
// botOptionsFindly.koreAPIUrl = "https://searchassist-qa.kore.ai/searchassistapi/";
botOptionsFindly.koreAPIUrl = "https://"+paramUrl+"/searchassistapi/";
// botOptionsFindly.baseAPIServer = "https://searchassist-qa.kore.ai";
botOptionsFindly.baseAPIServer = "https://"+paramUrl;
function koreGenerateUUID() {
  console.info("generating UUID");
  var d = new Date().getTime();
  if (window.performance && typeof window.performance.now === "function") {
    d += performance.now(); //use high-precision timer if available
  }
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (d + generateRandomNum() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}
function generateRandomNum() {
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1;
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  var seconds = dateObj.getSeconds();
  var minutes = dateObj.getMinutes();
  var hour = dateObj.getHours();
  var generatedNum = year * month * day * (hour + minutes * seconds);
  return generatedNum;
}
botOptionsFindly.JWTUrl =
  "https://mk2r2rmj21.execute-api.us-east-1.amazonaws.com/dev/users/sts";
botOptionsFindly.userIdentity = koreGenerateUUID(); // Provide users email id here
// botOptionsFindly.userIdentity = 'vaishali.addala@kore.com';// Provide users email id here
botOptionsFindly.botInfo = { chatBot: "CosmeticsV1.1", "taskBotId": "st-a359c185-2445-5bc9-b981-682d6f6ec1a0" };
botOptionsFindly.clientId = "cs-16f8dc7e-2a12-5c7f-bbca-6878c8dfb004";
botOptionsFindly.clientSecret = "7AQvrc6OHmF52ByFhcvw+S0dlDH+31stpk+ZaBzujW8=";
botOptionsFindly.searchIndexID = "sidx-53fd79c3-25fd-5c5d-8e09-1c4fcdbbbb62";

// For Socket Connection
botOptionsFindly.reWriteSocketURL = {
  protocol: "wss",
  // hostname: 'searchassist-qa.kore.ai'
  hostname:paramUrl
};
function clearLocalStorageUserDetails() {
  window.localStorage.setItem("userName", "");
  window.localStorage.setItem("userLocation", "");
  window.localStorage.setItem("gender", "");
  window.localStorage.setItem("userAge", "");
}
let favicon: any = document.getElementById("favicon");
 if (window.location && window.location.href && window.location.href.includes('cosmetics')) {
  // cosmetics
  if (window.location && window.location.href && (window.location.href.includes('searchassist-pilot.kore.ai'))) {
    botOptionsFindly.koreAPIUrl = "https://searchassist-pilot.kore.ai/searchassistapi/";
    botOptionsFindly.baseAPIServer = "https://searchassist-pilot.kore.ai";
    botOptionsFindly.reWriteSocketURL = {
        protocol: 'wss',
        hostname: 'searchassist-pilot.kore.ai'
    };
    botOptionsFindly.botInfo = { chatBot: "CosmeticsV1.1", "taskBotId": "st-2fbd4ab1-9de2-5ac0-8ba1-9acbc61708ac" };
botOptionsFindly.clientId = "cs-ea1d088b-4575-5316-96af-0302060901b0";
botOptionsFindly.clientSecret = "AgrfwDZXdX8gpdzHgfQl1vk5JVnpSEFfYJYe/Wnlj1M=";
botOptionsFindly.searchIndexID = "sidx-3311ab62-8bae-556a-8aab-02b3fb3dda6a";
// old
    // botOptionsFindly.botInfo = { chatBot: "Cosmetics", "taskBotId": "st-85d0f5ee-d8ec-5f46-a07b-60b19665f8ef" };
    // botOptionsFindly.clientId = "cs-6d7410bf-ad70-5392-a509-08f42b6b973b";
    // botOptionsFindly.clientSecret = "29vqaA7rQjs3ojPkWKDfMg+zuB3RWC5iBJbUjG7jZQQ=";
    // botOptionsFindly.searchIndexID = "sidx-80f8686d-e870-5ebf-a3d6-3f93ffc5a489";
  } else if(window.location && window.location.href && (window.location.href.includes('searchassist-qa.kore.ai'))){
    botOptionsFindly.koreAPIUrl = "https://searchassist-qa.kore.ai/searchassistapi/";
    botOptionsFindly.baseAPIServer = "https://searchassist-qa.kore.ai";
    botOptionsFindly.reWriteSocketURL = {
        protocol: 'wss',
        hostname: 'searchassist-qa.kore.ai'
    };
  botOptionsFindly.botInfo = { chatBot: "CosmeticsV1.1", "taskBotId": "st-a359c185-2445-5bc9-b981-682d6f6ec1a0" };
  botOptionsFindly.clientId = "cs-16f8dc7e-2a12-5c7f-bbca-6878c8dfb004";
  botOptionsFindly.clientSecret = "7AQvrc6OHmF52ByFhcvw+S0dlDH+31stpk+ZaBzujW8=";
  botOptionsFindly.searchIndexID = "sidx-53fd79c3-25fd-5c5d-8e09-1c4fcdbbbb62";
  }
} 
else {
  setTimeout(function () {
      $('body').addClass('futureBank');
      document.title = 'SearchAssist Demo';
      clearLocalStorageUserDetails();
  }, 1000);
}

botOptionsFindly.interface = "top-down";
findlyConfig = {
  botOptions: botOptionsFindly,
  viaSocket: true,
  pickersConfig: {
    showDatePickerIcon: false, //set true to show datePicker icon
    showDateRangePickerIcon: false, //set true to show dateRangePicker icon
    showClockPickerIcon: false, //set true to show clockPicker icon
    showTaskMenuPickerIcon: true, //set true to show TaskMenu Template icon
    showradioOptionMenuPickerIcon: false, //set true to show Radio Option Template icon
  },
  API_KEY_CONFIG:{'KEY':"YOUR_API_KEY"}
};

export default findlyConfig;
