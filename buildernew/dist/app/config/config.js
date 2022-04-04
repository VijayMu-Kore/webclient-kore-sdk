(function ($win) {
    function extend(a, b){
        for(var key in b)
            if(b.hasOwnProperty(key))
                a[key] = b[key];
        return a;
    }
    if ($win.appConfig) {
        var configs="config_override";//this will be assigned by server   
        if(typeof configs ==="string"){
            configs={};
        }
        var serverAppConfig=configs || {};     
        extend($win.appConfig,serverAppConfig); 
    }
})(window);