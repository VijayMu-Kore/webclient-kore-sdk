

import { chatConfig, chatWindow } from '../../../../../dist/kore-web-sdk.esm.browser.js';
import { Korei18nPlugin } from '../../../../../dist/kore-web-sdk.esm.browser.js';
import { KoreFileUploaderPlugin } from '../../../../../dist/kore-web-sdk.esm.browser.js';
import { KorePickersPlugin } from '../../../../../dist/kore-web-sdk.esm.browser.js';
import { GraphTemplatesPlugin } from '../../../../../dist/kore-web-sdk.esm.browser.js';

let chatWindowInstance = new chatWindow();

// chatWindowInstance.installPlugin(Korei18nPlugin);
//chatWindowInstance.installPlugin(new KoreFileUploaderPlugin());

chatWindowInstance.installPlugin(new KorePickersPlugin({}));
chatWindowInstance.installPlugin(new GraphTemplatesPlugin());







// //OPTION #1 with APIKEY
// chatConfig.API_KEY_CONFIG.KEY="xyz";
// chatWindowInstance.show(chatConfig);





// //OPTION #2 with own JWT Service
// var botOptions=chatConfig.botOptions;
// botOptions.JWTUrl = "PLEASE_ENTER_JWTURL_HERE";
// botOptions.botInfo = { 
//     name: "PLEASE_ENTER_BOT_NAME",
//     _id: "PLEASE_ENTER_BOT_ID" 
// };
// chatConfig.botOptions.userIdentity = 'rajasekhar.balla@kore.com';// Provide users email id here
// chatConfig.JWTAsertion=function(commitJWT){
//     chatWindowInstance.getJWT(chatConfig.botOptions).then(function(res){
//         chatWindowInstance.setJWT(res.jwt);
//         commitJWT();
//     },function(errRes){
//         console.log(errRes);
//     });
//  };
//  chatWindowInstance.show(chatConfig);




//OPTION #3(not for production only for quick demo) with generic JWT Service pasing clientId and clientSecret etc,.
let botOptions = chatConfig.botOptions;

botOptions.JWTUrl = "https://mk2r2rmj21.execute-api.us-east-1.amazonaws.com/dev/users/sts";
botOptions.userIdentity = 'rushivar.takhur@kore.com';// Provide users email id here
botOptions.botInfo = { name: "SDK2.0", "_id": "st-80fe78b1-ad41-5726-87fb-ded1a470739b" }; // bot name is case sensitive
botOptions.clientId = "cs-383769c0-5c36-506d-8955-3da982392e89";
botOptions.clientSecret = "YDDzgK9kmUfcp82Jko/3kfTWWfc5rYBWw/P8ZRFADlg=";

chatWindowInstance.show(chatConfig);

