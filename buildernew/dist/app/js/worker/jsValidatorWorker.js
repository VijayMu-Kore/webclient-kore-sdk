importScripts('../../lib/lodash.js', 
              '../../lib/rrule.js', 
              '../../lib/moment.js');

var workerCtx = this;

var onmessage = function (e) { 
    'use strict';
    var window = self;
	var  _  = window._;
    var fields = e.data.code;
    var context = {
        context: e.data.contextForResolution,
        DateUtil: e.data.dateTimeFields,
        rrule: window.RRule,
        moment: window.moment
    };
    
    if (e.data && e.data.contextForResolution && e.data.contextForResolution.session) {
        var _session = e.data.contextForResolution.session;
        var _sessionKeys = Object.keys(_session);
        if (_sessionKeys && _sessionKeys.length) {
            Object.keys(_session).forEach(function (key) {
                context[key] = _session[key];
            });
        }
    }
    
    function resolveLodashTemplates(){
            var result={};
            var code;
            Object.keys(fields).map(function(key){

                if(typeof(fields[key]) !== "string"){
                    result[key] = fields[key];
                    return;
                }
                
                var _mergeScript = '';
                if (e.data.botFunctions) {
                    _mergeScript = e.data.botFunctions + fields[key];
                } else {
                    _mergeScript = fields[key];
                }
                
                _mergeScript='<%'+_mergeScript+'%>';
                
                _.templateSettings = {
                    escape : /<%-([\s\S]+?)%>/g,
                    evaluate : /<%([\s\S]+?)%>/g,
                    interpolate : /<%=([\s\S]+?)%>/g
                };

                code = _.template(_mergeScript)(context);

                _.templateSettings = {
                    escape : /<%-([\s\S]+?)%>/g,
                    evaluate : /<%([\s\S]+?)%>/g,
                    interpolate : /\{\{(.+?)\}\}/g
                };

                code = _.template(code)(context);

                result[key] = _.template(code)(context);

                _.templateSettings = {
                    escape : /<%-([\s\S]+?)%>/g,
                    evaluate : /<%([\s\S]+?)%>/g,
                    interpolate : /<%=([\s\S]+?)%>/g
                };

            });
            // result.updatedContext = context.context;
            return result;
        }
    
    postMessage(resolveLodashTemplates());
};
