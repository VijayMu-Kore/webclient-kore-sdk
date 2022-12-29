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
// botOptionsFindly.botInfo = {
//   chatBot: "New zendesk after Nov 14",
//   taskBotId: "st-3cd359e5-96c3-54a4-afbe-82cf46e208a3",
// };
// botOptionsFindly.clientId = "cs-3c5c78f4-289a-5745-aaa9-944658e9b075";
// botOptionsFindly.clientSecret = "S2K3A7tmcJjYVyIQIGeRCNJEQT6CFwJ5jiH34WQaG7U=";
// botOptionsFindly.searchIndexID = "sidx-62909178-4ea3-5950-897f-b5f8f07626c0";
botOptionsFindly.botInfo = {
  chatBot: "SA demo",
  taskBotId: "st-aec7ef8c-c05c-5111-8658-9ed903e2ec34",
};
botOptionsFindly.clientId = "cs-cc7a0cbc-03fe-5d25-b4e2-3f9802d5c46c";
botOptionsFindly.clientSecret = "/xxpC/mek8mCpgcaTmyvfuFu5fsjycjFX1rQzohLpnU=";
botOptionsFindly.searchIndexID = "sidx-5e988156-845c-529a-8ad4-d01a86d50cdc";
// botOptionsFindly.botInfo = {
//   chatBot: "7 DEC-22",
//   taskBotId: "st-0e74a50d-6082-5f35-8ef7-12f05b67c6e0",
// };
// botOptionsFindly.clientId = "cs-7bdcdb62-0ba3-5a94-8191-bcc2145e740f";
// botOptionsFindly.clientSecret = "MLmrLKTApQk60vS0B3Ud5JTfaEMCASPFqP0WC+BdkTs=";
// botOptionsFindly.searchIndexID = "sidx-546830dd-8d22-5a92-89a2-7432364a3e25";

// botOptionsFindly.botInfo = {
//   chatBot: "Bot actions V2",
//   taskBotId: "st-af4891e5-b228-5c30-b629-e21a49d37d04",
// };
// botOptionsFindly.clientId = "cs-b20a8411-74d9-58b0-b615-78b33e2986ae";
// botOptionsFindly.clientSecret = "UFTq1wsjDREF7gb7XVDcOrg+8Llu98sVs4zGGXRZc1A=";
// botOptionsFindly.searchIndexID = "sidx-ea84961b-7aad-57f6-a021-eeb591433c48";
// botOptionsFindly.botInfo = {
//   chatBot: "PSI_Demo_V1.1",
//   taskBotId: "st-7b63dd9c-d111-5372-ba60-0a8b69963798",
// };
// botOptionsFindly.clientId = "cs-4f4e9434-eca4-566a-9d90-7b7dbed81320";
// botOptionsFindly.clientSecret = "EmgxDGZV8dZhm9pGQePqVeb1CXxlrcD0RwWnize0ass=";
// botOptionsFindly.searchIndexID = "sidx-88a143e1-2447-5d67-b26a-78cf5f97d407";
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
