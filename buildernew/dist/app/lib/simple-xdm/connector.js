(function(){

	var connector = {};

	var backdrop = document.createElement('div');
	var backdropstyle = {
		position:'fixed',
		top:'0px',
		left:'0px',
		height:'100%',
		width:'100%',
		opacity:'0',
		'z-index':2
	};

	Object.keys(backdropstyle).map(function(prop){
		backdrop.style[prop] = backdropstyle[prop];
	});
        
        var backdropSide = document.createElement('div');
	var backdropSidestyle = {
		position:'fixed',
		top:'0px',
		right:'0px',
		height:'100%',
		width:'160px',
		opacity:'0',
		'z-index':2
	};

	Object.keys(backdropSidestyle).map(function(prop){
		backdropSide.style[prop] = backdropSidestyle[prop];
	});
   
	connector.connect=function(callback){


		AP.register({
			'onData':function(event,cb){
				window._report_data = (event && event.data) || [];
				window.keys         = (event && event.keys) || [];
				window.dataTypes    = (event && event.dataTypes) || [];
                                window.wfType=(event && event.wfType) || "";
                                window.contextsData = (event && event.contextsData) || [];
                                window.dialogNodeNames = (event && event.dialogNodeNames) || [];
				if(event.displayMode === 'view'){
                                        if(event.wfType==='dialog'){
                                           backdrop.style.top='99px'; 
                                        }else{
                                           backdrop.style.height='88%';
                                        }
					document.body.appendChild(backdrop);
                                        document.body.appendChild(backdropSide);
				}
				callback();
			},
			'onSave':function(event,cb){
				api.save('save action',(window._save_report_config && window._save_report_config()),{});
			}
		});

		AP.require('api',function(_api_){

			window.api  = _api_;

			_api_.getData();

			window.document.body.style.fontFamily="'lato', sans-serif";

			function resize(){
				_api_.resize();
			};

			setInterval(function(){
				resize();
			},50);

			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {

				if (xhttp.readyState == 4 && xhttp.status == 200) {
				   var styleInfo = xhttp.responseText;
				   var style = document.createElement('style');
				   style.innerHTML = styleInfo;
				   document.getElementsByTagName("body")[0].appendChild(style);
			    }

			};

			xhttp.open("GET", "../css/vendor/fonts.css", true);
			xhttp.send();

		});


	};
        connector.saveTemplate=function(reportData,callback,local){
            if(window.api){
                if(!local){
                   window.api.save("SampleTitle",reportData,{},callback); 
                }
                window._report_data_copy = reportData;
                if (window.bindData) {
                    window.bindData(window._report_data_copy);
                }
                if(local){
                    window.api.close(); 
                }

            }else{
                alert("Connecter bridge not established");
            }
           
	};
        connector.close=function(){
            if(window.api){
                window.api.close();
            }
	};

        window.connector = connector;

}());