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
botOptionsFindly.botInfo = {
  chatBot: "Answer snippets1",
  taskBotId: "st-bb827e73-55ec-5ebe-8e95-f585a5f152b4",
};
botOptionsFindly.clientId = "cs-b2affdb1-c681-5b9a-b4a0-0ce3cefa7a7c";
botOptionsFindly.clientSecret = "ffVC9WlZsyAzII115FaY6YYRVzdIt6lefezTMdnzCBw=";
botOptionsFindly.searchIndexID = "sidx-2867c11d-2ab6-5916-be5c-b33c9ba15e70";


// To modify the web socket url use the following option
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
