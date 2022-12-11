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
  chatBot: "SA demo",
  taskBotId: "st-aec7ef8c-c05c-5111-8658-9ed903e2ec34",
};
botOptionsFindly.clientId = "cs-cc7a0cbc-03fe-5d25-b4e2-3f9802d5c46c";
botOptionsFindly.clientSecret = "/xxpC/mek8mCpgcaTmyvfuFu5fsjycjFX1rQzohLpnU=";
botOptionsFindly.searchIndexID = "sidx-5e988156-845c-529a-8ad4-d01a86d50cdc";

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
 
if (window.location && window.location.href && window.location.href.includes('#futurebank')) {
  // For Demo 20/1/21
  botOptionsFindly.botInfo = { chatBot: "Covid Help", "taskBotId": "st-1847ca83-3ea9-519d-bfe4-7c993c8bc477" };
  botOptionsFindly.clientId = "cs-30d2773b-0131-5e3f-b6d5-ed93cbae67c6";
  botOptionsFindly.clientSecret = "UdsX+q2hBSNVttzDoARy05zCluj9b0Ns0f2LRjmFwow=";
  botOptionsFindly.searchIndexID = "sidx-810d6e38-b522-54d3-8f2b-cdee7667fb34";
  setTimeout(function () {
      $('body').addClass('futureBank');
      document.title = 'Future Bank';
      clearLocalStorageUserDetails();
  }, 1000);
}
else if (window.location && window.location.href && window.location.href.includes('#pnc')) {
  // A/B Testing Bot
  botOptionsFindly.botInfo = { chatBot: "PNC App", "taskBotId": "st-e425ec59-273d-5a9b-86ac-119d4444c800" };
  botOptionsFindly.clientId = "cs-1eb8ea6f-a1d4-5045-ac55-7fe9593074cd";
  botOptionsFindly.clientSecret = "9dDCbzh9ZU0XSFgXVjp2vM3+ZodqO+l9JjaaN8gQ/UU=";
  botOptionsFindly.searchIndexID = "sidx-c0d78244-572a-590c-9148-31b45cc3ff3c";
  setTimeout(function () {
      $('body').addClass('pnc');
      document.title = 'PNC';
      clearLocalStorageUserDetails();
  }, 1000);
} else if (window.location && window.location.href && (window.location.href.includes('#cdc') || window.location.href.includes('#polio') || window.location.href.includes('#hepatitis') || window.location.href.includes('#coronavirus'))) {
  // CDC
  botOptionsFindly.koreAPIUrl = "https://searchassist-qa.kore.ai/searchassistapi/";
  botOptionsFindly.baseAPIServer = "https://searchassist-qa.kore.ai";
  botOptionsFindly.reWriteSocketURL = {
      protocol: 'wss',
      hostname: 'searchassist-qa.kore.ai'
  };
  // botOptionsFindly.botInfo = { chatBot: "CDC App", "taskBotId": "st-8f0ccfc3-6920-5371-be24-f386bcef49c2" };
  // botOptionsFindly.clientId = "cs-d76f4a33-80c8-51ad-b6a7-810606a366b1";
  // botOptionsFindly.clientSecret = "NmFqR0CP6aeomim0lzdkYtmihA2f2ey92Niy3MGKMDg=";
  // botOptionsFindly.searchIndexID = "sidx-1857c1f1-7f93-55e2-9c04-124e148f1543";
  botOptionsFindly.botInfo = { chatBot: "Covid Help", "taskBotId": "st-1847ca83-3ea9-519d-bfe4-7c993c8bc477" };
  botOptionsFindly.clientId = "cs-30d2773b-0131-5e3f-b6d5-ed93cbae67c6";
  botOptionsFindly.clientSecret = "UdsX+q2hBSNVttzDoARy05zCluj9b0Ns0f2LRjmFwow=";
  botOptionsFindly.searchIndexID = "sidx-810d6e38-b522-54d3-8f2b-cdee7667fb34";
  setTimeout(function () {
      $('body').addClass('cdc');
      document.title = 'CDC';
      // favicon.setAttribute("href", "../demo/images/cdc.png"); 
  }, 1000);
} else if (window.location && window.location.href && (window.location.href.includes('#cosmetics') || window.location.href.includes('#essi') || window.location.href.includes('#lblanc') || window.location.href.includes('#cyze'))) {
  // cosmetics
  botOptionsFindly.koreAPIUrl = "https://searchassist-qa.kore.ai/searchassistapi/";
  botOptionsFindly.baseAPIServer = "https://searchassist-qa.kore.ai";
  botOptionsFindly.reWriteSocketURL = {
      protocol: 'wss',
      hostname: 'searchassist-qa.kore.ai'
  };
  // botOptionsFindly.botInfo = { chatBot: "Cosmetics", "taskBotId": "st-cf0ce3fc-4e46-56fa-b083-c47f8c405e8c" };
  // botOptionsFindly.clientId = "cs-3c22d3c0-67ea-5335-a7dc-691a3972d961";
  // botOptionsFindly.clientSecret = "2iQclyckzscxUFQVUms1lDCLo5P5IT9BaxU1UDE9ENQ=";
  // botOptionsFindly.searchIndexID = "sidx-2ccc1c39-b76d-5e78-9f96-3af138adafd7";
  botOptionsFindly.botInfo = { chatBot: "CosmeticsV1.1", "taskBotId": "st-a359c185-2445-5bc9-b981-682d6f6ec1a0" };
  botOptionsFindly.clientId = "cs-16f8dc7e-2a12-5c7f-bbca-6878c8dfb004";
  botOptionsFindly.clientSecret = "7AQvrc6OHmF52ByFhcvw+S0dlDH+31stpk+ZaBzujW8=";
  botOptionsFindly.searchIndexID = "sidx-53fd79c3-25fd-5c5d-8e09-1c4fcdbbbb62";
  setTimeout(function () {
      $('body').addClass('belcorp');
      $('body').addClass('cosmetics');
      document.title = 'Cosmetics';
      favicon.setAttribute("href", "../demo/images/cosmetic-icon.svg");
  }, 1000);
} else if (window.location && window.location.href && (window.location.href.includes('#belcorp'))) {
  // belcrop
  botOptionsFindly.koreAPIUrl = "https://pilot.searchassist.ai/searchassistapi/";
  botOptionsFindly.baseAPIServer = "https://pilot.searchassist.ai";
  botOptionsFindly.reWriteSocketURL = {
      protocol: 'wss',
      hostname: 'pilot.searchassist.ai'
  };
  botOptionsFindly.botInfo = { chatBot: "Belcorp", "taskBotId": "st-05c53414-a6a0-5376-bd8b-a1ee4f287cd1" };
  botOptionsFindly.clientId = "cs-aa7a9f01-3929-514f-8595-111fde1998c9";
  botOptionsFindly.clientSecret = "4V8nmOHtv1HTWiy86XsbCfbWCxqVi8DhwLPLwHjM5Cc=";
  botOptionsFindly.searchIndexID = "sidx-c64eec48-c5eb-5ae3-8cc2-40bc7ebf87b7";
  setTimeout(function () {
      $('body').addClass('belcorp');
      document.title = 'Belcorp';
      favicon.setAttribute("href", "../demo/images/belcrop-logo.svg");
  }, 1000);
} else if (window.location && window.location.href && (window.location.href.includes('#scm'))) {
  // Siemens
  botOptionsFindly.koreAPIUrl = "https://searchassist-qa.kore.ai/searchassistapi/";
  botOptionsFindly.baseAPIServer = "https://searchassist-qa.kore.ai";
  botOptionsFindly.reWriteSocketURL = {
      protocol: 'wss',
      hostname: 'searchassist-qa.kore.ai'
  };
  botOptionsFindly.botInfo = { chatBot: "Siemens V1.1", "taskBotId": "st-bbb0e3ae-9865-5b0a-ab6a-6031da5ab3f1" };
  botOptionsFindly.clientId = "cs-5abd51e8-f538-5e6b-8610-ce9c98b66efb";
  botOptionsFindly.clientSecret = "MZTKNHkT8mimFMTooEE9E+ZjykiTMTeNGxfEIFBgrrk=";
  botOptionsFindly.searchIndexID = "sidx-333198c8-0bcd-5bef-adbc-dc80372a8af9";
  setTimeout(function () {
      $('body').addClass('siemens');
      document.title = 'SCM Procure';
      favicon.setAttribute("href", "../demo/images/siemens-icon.jpg");
  }, 1000);
} else if (window.location && window.location.href && (window.location.href.includes('#banking') || window.location.href.includes('#cards') || window.location.href.includes('#loans') || window.location.href.includes('#offers') || window.location.href.includes('#invest'))) {
  // banking
  botOptionsFindly.koreAPIUrl = "https://searchassist-qa.kore.ai/searchassistapi/";
  botOptionsFindly.baseAPIServer = "https://searchassist-qa.kore.ai";
  botOptionsFindly.reWriteSocketURL = {
      protocol: 'wss',
      hostname: 'searchassist-qa.kore.ai'
  };
  botOptionsFindly.botInfo = { chatBot: "Bank", "taskBotId": "st-95fd4a73-0a3c-5514-a11c-822682b8ab1f" };
  botOptionsFindly.clientId = "cs-f3c49041-f08e-53c7-9095-2ad1d09fa76b";
  botOptionsFindly.clientSecret = "oi3xWjrf8vILmEd8l6sq99C6HHGrAC6NkKU2PGlegLY=";
  botOptionsFindly.searchIndexID = "sidx-171fce08-eab2-53f3-aa03-8d44926c75b4";
  setTimeout(function () {
      if (!$('body').hasClass('banking')) {
          $('body').addClass('banking')
      }
      document.title = 'Banking';
      favicon.setAttribute("href", "../demo/images/banking/bankingavatar.svg");
  }, 1000);
}
else if (window.location && window.location.href && (window.location.href.includes('#tr'))) {
  // Siemens
  botOptionsFindly.koreAPIUrl = "https://searchassist-qa.kore.ai/searchassistapi/";
  botOptionsFindly.baseAPIServer = "https://searchassist-qa.kore.ai";
  botOptionsFindly.reWriteSocketURL = {
      protocol: 'wss',
      hostname: 'searchassist-qa.kore.ai'
  };
  botOptionsFindly.botInfo = { chatBot: "TR", "taskBotId": "st-9c5592dc-7c18-5b9b-9c54-869aecdda25d" };
  botOptionsFindly.clientId = "cs-9b11cc16-6ee9-5bea-be7c-39b9d1358fcd";
  botOptionsFindly.clientSecret = "c0GbteFfqet5HBH3pKd+EOws8bzy1w5LgRfl0LrHFcg=";
  botOptionsFindly.searchIndexID = "sidx-2963a1bb-6315-5c8d-959c-884993fd4a80";
  setTimeout(function () {
      $('body').addClass('siemens');
      document.title = 'TR';
      favicon.setAttribute("href", "../demo/images/siemens-icon.jpg");
  }, 1000);
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
