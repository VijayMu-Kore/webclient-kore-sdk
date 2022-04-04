importScripts('../../lib/lodash.js');

var workerCtx = this;

onmessage=function(e){

	var msg = {
		type:'msg',
		text:"Process started"
	};

	postMessage(msg);

	msg={};

	var window = self;
	var map = e.data.koreUxMap;
	var ctx = e.data.payload;
	var  _  = window._;
	var result;

	try{

		if(map.title){
			result = _.template(map.title)(ctx);
		}else if(map.body){
			result = _.template(map.body)(ctx);
		}

		msg.type='result';
		msg.result= result;

		postMessage(msg);

	}catch(ex){
		postMessage({
			type:'err',
			error:ex.toString()
		});
	}



};