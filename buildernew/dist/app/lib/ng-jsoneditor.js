(function () {
    var module = angular.module('ng.jsoneditor', []);
    module.constant('ngJsoneditorConfig', {});

    module.directive('ngJsoneditor', ['ngJsoneditorConfig', '$timeout','env_conf', function (ngJsoneditorConfig, $timeout,env_conf) {
        var defaults = ngJsoneditorConfig || {};

        return {
            restrict: 'A',
            require: ['?ngModel','?form'],
            scope: {
                'options': '=',
                'ngJsoneditor': '=',
                'preferText': '=',
                isReq: '@?',
                callback: '=?',
                placeholder: '='
            },
            link: function ($scope, element, attrs, ctrls) {
                var editor,ngModel,formCtrl;

                ngModel  = ctrls[0];
                formCtrl = ctrls[1] || ngModel.$$parentForm;

                if(formCtrl){
                    formCtrl.$addControl(ngModel);
                }

                if (!angular.isDefined(window.JSONEditor)) {
                    throw new Error("Please add the jsoneditor.js script first!");
                }

                function copyToClip(){
                        var success = true,
                        range = document.createRange(),
                        selection,
                        input = ngModel.$viewValue || '';
                    // For IE.
                    if (window.clipboardData) {
                        success = window.clipboardData.setData("Text", input);
                    } else {
                        // Create a temporary element off screen.
                        var tmpElem = $('<div>');
                        tmpElem.css({
                            position: "absolute",
                            left: "-1000px",
                            top: "-1000px",
                        });
                        // Add the input value to the temp element.
                        if(typeof(input) === 'string'){
                            tmpElem.text(input);
                        }else if(typeof(input) === 'object'){
                            tmpElem.text(JSON.stringify(input));
                        }
                        
                        $("body").append(tmpElem);
                        // Select temp element.
                        range.selectNodeContents(tmpElem.get(0));
                        selection = window.getSelection();
                        selection.removeAllRanges();
                        selection.addRange(range);
                        // Lets copy.
                        try {
                            success = document.execCommand("copy");
                            console.log(success);
                        } catch (e) {
                            console.log(e);
                        } finally {
                            // remove temp element.
                            tmpElem.remove();
                        }
                    }
                    if (success) {
                        NotificationService.notify('Json copied successfully', 'success');
                    }
                }

                function _createEditor(options) {
                    var settings = angular.extend({}, defaults, options);
                    var theOptions = angular.extend({}, settings, {
                        onChange: function (evt) {
                            ngModel.$setDirty();
                            $timeout(function () {
                                if (editor) {
                                    try{
                                        ngModel.$setViewValue($scope.preferText === true ? editor.getText() : editor.get());
                                        setValidity(Object.keys(ngModel.$viewValue).length > 0);
                                        if (settings && settings.hasOwnProperty('change')) {
                                            settings.change();
                                        }
                                    }catch(ex){
                                        setValidity(false);
                                    }
                                }
                            });
                        },
                        onEditable:function(node){
                            return true;
                        }
                    });
                    
                    var instance = new JSONEditor(element[0], theOptions);
                    
                    if ($scope.ngJsoneditor instanceof Function) {
                        $timeout(function () {
                            $scope.ngJsoneditor(instance);
                        });
                    }

                    $timeout(function(){
                        $('.jsoneditor-poweredBy').css('display','none');

                        $.each(['.jsoneditor-expand-all', '.jsoneditor-collapse-all', '.jsoneditor-collapsed', '.jsoneditor-expanded'], function(i, scrollEle){

                            $(".jsoneditor").on( 'click', scrollEle, function(){

                               if($('#wsdl div.jsoneditor-tree').is(":visible")){
                                $timeout(function() {

                                    PerfectScrollbar.update($('#wsdl div.jsoneditor-tree')[0]);

                                }, 1000);
                            }

                            if($('#sampleResponse div.jsoneditor-tree').is(":visible")){
                               $timeout(function() {

                                PerfectScrollbar.update($('#sampleResponse div.jsoneditor-tree')[0]);

                            }, 1000);

                           }

                       });

                        });
                        

                        if($('#wsdl div.jsoneditor-tree').is(":visible")){
                            PerfectScrollbar.initialize($('#wsdl div.jsoneditor-tree')[0],{wheelSpeed: 2,wheelPropagation: false});
                        }
                         
                         if($('#sampleResponse div.jsoneditor-tree').is(":visible")){
                             PerfectScrollbar.initialize($('#sampleResponse div.jsoneditor-tree')[0],{wheelSpeed: 2,wheelPropagation: false});
                         }

                          var _img = document.createElement('img');
                         _img.src = env_conf['context-url']+'/assets/debugConsoleIcons/copyJson-white.svg';
                         _img.className = 'copy-icon-service';
                         _img.title = 'Copy to Clipboard';
                         var _target;

                         if($('#serviceNodeParamsRaw') && $('#serviceNodeParamsRaw').length){
                             _target = $('#serviceNodeParamsRaw .jsoneditor-menu')[0].appendChild(_img);
                             $(_target).on('click',function(e){
                                copyToClip();
                             })
                         }
                         if($('#soapSample') && $('#soapSample').length){
                            _target = $('#soapSample .jsoneditor-menu')[0].appendChild(_img);
                            $(_target).on('click',function(e){
                                copyToClip();
                            });
                         }


                        
                       
                    });

                    return instance;
                }

                function setValidity(validity){
                    if($scope.isReq !== 'false' && $scope.isReq){
                        ngModel.$setValidity('invalid',validity);
                    }else{
                        ngModel.$setValidity('invalid',true);
                    }
                }

                $scope.$watch('options', function (newValue, oldValue) {
                    newValue.ace.default={};//Hack for json circular reference error 
                    for (var k in newValue) {
                        if (newValue.hasOwnProperty(k)) {
                            var v = newValue[k];
                            try{
                                if (newValue[k] !== oldValue[k]) {
                                    if (k === 'mode') {
                                        console.log(v);
                                        editor.setMode(v);
                                    } else if (k === 'name') {
                                        editor.setName(v);
                                    }else if(k === 'aceMode'){
                                        editor.setAceMode(v);
                                        editor.aceEditor.getSession().setMode(v);
                                        
                                    } else { //other settings cannot be changed without re-creating the JsonEditor
                                        //editor = _createEditor(newValue);
                                        ngModel.$render();
                                        return;
                                    }
                                }
                            }catch(ex){
                                console.log(ex);
                            }
                        }
                    }
                }, true);

                $scope.$on('$destroy', function () {
                    //remove jsoneditor?
                });

                ngModel.$render = function () {
                    if (($scope.preferText === true) && !angular.isObject(ngModel.$viewValue)) {
                        editor.setText(ngModel.$viewValue || '');
                    } else {
                        editor.set(ngModel.$viewValue || {});
                    }

                    var editorMode = editor.getMode();
                    //Hack to render again
                    editor.setMode(editorMode);
                    //blur registring should be in editor creation but somehow now working because of the above hack
                    if(editorMode !== 'tree' && editor && editor.aceEditor){
                        editor.aceEditor.on('blur', function (e) {
                            if ($scope.callback && $scope.callback.onBlur) {
                                $scope.callback.onBlur(editor);
                            }
                        });
                    }
                    if(editorMode == 'code' && $scope.options && $scope.options.aceViewMode){
                        if(editor && editor.aceEditor && editor.aceEditor.setReadOnly){
                            editor.aceEditor.setReadOnly(true);
                        }
                    }
                    if($scope.placeholder){
                        editor.aceEditor.on("change", update);
                        if($scope.callback && $scope.callback.attachPlaceHolder){
                            $scope.callback.attachPlaceHolder({'ele':element,'editorValue':editor.aceEditor.getValue()}); 
                        }
                       
                    }


                };

                function update() {
                    if($scope.placeholder){
                        var showPlaceHolder = !editor.aceEditor.getValue().length;
                        var node = editor.aceEditor.renderer.emptyMessageNode;
                        if($scope.callback && $scope.callback.attachPlaceHolder ){
                           $scope.callback.attachPlaceHolder({'ele':element,'editorValue':editor.aceEditor.getValue()}); 
                        }
                        if (!showPlaceHolder && node) {
                            editor.aceEditor.renderer.scroller.removeChild(editor.aceEditor.renderer.emptyMessageNode);
                            editor.aceEditor.renderer.emptyMessageNode = null;
                        } else if (showPlaceHolder && !node) {
                            node = editor.aceEditor.renderer.emptyMessageNode = document.createElement("div");
                            node.innerHTML = $scope.placeholder;
                            node.className = "ace_invisible ace_emptyMessage";
                            node.style = {"padding":"0 9px", "margin-top":"10px"};
                            editor.aceEditor.renderer.scroller.appendChild(node);
                        }
                    }
                }

                editor = _createEditor($scope.options);
                
                
                $timeout(function(){
                    $('.ace_text-input').attr('role','textbox');
                });

                 $scope.$on('updateJsonData', function (e, data) {
                    editor.set(data);
                 });

                  function getEditorValue(){
                    return editor.aceEditor.getValue();
                 }

                 if($scope.callback){
                    $scope.callback.getEditorValue = getEditorValue
                 }

                 

            }
        };
    }]);
})();
