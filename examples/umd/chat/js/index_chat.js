

var chatConfig=KoreChatSDK.chatConfig;
var chatWindow=KoreChatSDK.chatWindow;


var chatWindowInstance = new chatWindow();

// chatWindow.prototype.show=function(){
//     console.log('overridedn')
// }

//chatWindowInstance.installPlugin(Korei18nPlugin);
chatWindowInstance.getJWT(chatConfig.botOptions).then(function(res){
    chatWindowInstance.setJWT(res.jwt);
    chatWindowInstance.show(chatConfig);

},function(errRes){

});
