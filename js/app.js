//for UI hosting html
//http://localhost:8081/chat/?API_KEY=1234
//https://qa-bots.kore.ai/websdk/chat/?API_KEY=1234

var API_KEY=getAPIKey();//getURLParameterByName('apiKey');
var styleURL='UI/dist/kore-ai-sdk.min.css';
var scriptURL='UI/dist/kore-ai-sdk.min.js';

//check for prod (non dev)
if(location.hostname!=='localhost'){
    //for embed generate js file here
    //https://bots.kore.ai/api/websdkjs?apiKey=1234'
    //by reading from /var/www/websdk/UI/dist/kore-ai-sdk.min.js
    //load script from API to inject window.JWT_OBJ
    scriptURL="//"+location.hostname+'/api/platform/websdkjs/'+API_KEY;
}else{
    //DEV ENV
    //FOLLOWING LINE ONLY FOR DEV TESTING
    //failure
    window.JWT_OBJ ={"errorObj":{"statusCode":400,"status":400,"errorTitle":"Sorry, the virtual assistant is not yet Available","message":"The virtual assistant you’re trying to interact with has not yet been deployed or deployed using incorrect configurations. Please check back later.","name":"BadRequest"}}
}


function loadScript(scriptUrl, cb) {
    var el = document.createElement('script');
    el.language = 'javascript';
    el.async = 'true';
    el.type = 'text/javascript';
    document.getElementsByTagName("head")[0].appendChild(el);
    el.src = scriptUrl;
    el.onload = function (script) {
        if (cb) {
            cb.call(this);
        }
    };
}
function loadStyle(url, cb) {
    var el = document.createElement('link');
    el.rel = 'stylesheet';
    document.getElementsByTagName("head")[0].appendChild(el);
    el.href = url;
    el.onload = function (script) {
        if (cb) {
            cb();
        }
    };
}
function getAPIKey(){
    var url=location.href;//'http://localhost:8080/chat/123';
    var splits=url.split('/');
    var lastFragment=splits[splits.length-1];
    return lastFragment
}
function getURLParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
loadStyle(styleURL);
loadScript(scriptURL,function OnLoadScript(){
    KoreSDK.chatConfig.minimizeMode=false;
    KoreSDK.show(KoreSDK.chatConfig);

});
