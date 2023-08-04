let findlyConfig:any = {};

let botOptionsFindly: any = {};
botOptionsFindly.logLevel = "debug";
// var serverUrl = window.location.href;
var paramUrl="searchassist.pilot.kore.ai"
var httpStart = 'https://';
var wssUrl = "wss";
// if(serverUrl && (serverUrl.includes("https://") || serverUrl.includes("http://"))){ // for installer 
// // if(serverUrl && (serverUrl.includes(".kore.ai") || serverUrl.includes(".korebots.com"))){//for app, dev, qa, pilot, prod
//     paramUrl=serverUrl.split('/')[2];
//     if(serverUrl.includes("https://")){
//       httpStart = "https://";
//       wssUrl = "wss";
//     }else{
//       httpStart = "http://";
//       wssUrl = "ws";
//     }
// }  
// if(window?.JWT_OBJ && window?.JWT_OBJ?.koreAPIUrl){
//   paramUrl=window.JWT_OBJ.koreAPIUrl.split("/")[2].split(':')[0];
//     if(window.JWT_OBJ.koreAPIUrl.includes("https://")){
//       httpStart = "https://";
//       wssUrl = "wss";
//     }else{
//       httpStart = "http://";
//       wssUrl = "ws";
//     }
// }

botOptionsFindly.logLevel = 'debug';
// botOptionsFindly.koreAPIUrl = "https://searchassist-qa.kore.ai/searchassistapi/";
botOptionsFindly.koreAPIUrl = httpStart+paramUrl+"/searchassistapi/";
// botOptionsFindly.baseAPIServer = "https://searchassist-qa.kore.ai";
botOptionsFindly.baseAPIServer = httpStart+paramUrl;
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
botOptionsFindly.botInfo = {
  chatBot: "snippets",
  taskBotId: "st-b28c38c4-dde4-56ab-8153-098204be6e09",
};
botOptionsFindly.clientId = "cs-cfc0a55d-cb1d-5bd5-8be8-824d94185d43";
botOptionsFindly.clientSecret = "Dwja7aXe30SIqJT1v6/vCCh2ta2eT1If2rByFuh4fh4=";
botOptionsFindly.searchIndexID = "sidx-3c97916f-1b0c-5e25-9dbe-c7d338169b95";


// To modify the web socket url use the following option
// For Socket Connection
botOptionsFindly.reWriteSocketURL = {
  protocol:  wssUrl,
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
// CVS Caremark configs //
 
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
