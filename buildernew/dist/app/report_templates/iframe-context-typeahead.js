(function () {
    'use strict';

    angular
            .module('app')
            .directive('contextTypeaheadIframe', contextTypeaheadIframe);

    contextTypeaheadIframe.$inject = ['$timeout'];

    function contextTypeaheadIframe($timeout) {

        // Usage:
        // context avaialble options autocomplete

        var directive = {
            require: 'ngModel',
            restrict: 'A',
            link: link,
            scope: {
            }
        };
        return directive;

        //////////////////////

        function link($scope, element, attrs, ctrl) {
            /*  Typeahead code  starts */
            $scope.contexts = [];
            $scope.contextsData = [];
            $scope.contextsData = window.contextsData;
            $scope.dialogNodeNames = window.dialogNodeNames;
            $scope.selected = "";
            $scope.availableContexts = [];
            $scope.currentWord = "";
            $scope.triggeredFromSelect = false;
            function updateContextVariables() {
                $scope.contexts = [];
                $scope.contextsData  = [];
                $scope.contextsData =  window.contextsData;
                if($scope.contextsData && $scope.contextsData.entities) {
                    delete $scope.contextsData.entities;
                }
                if ($scope.contextsData && $scope.contextsData.mappedIntents) {
                    delete $scope.contextsData.mappedIntents;
                }
                $scope.contexts.push('session');
                $scope.contextsData.session = $scope.contextsData;
                $scope.dialogNodeNames = window.dialogNodeNames;
                if($scope.dialogNodeNames && Object.keys($scope.dialogNodeNames).length) {
                    if($scope.dialogNodeNames.entities && $scope.dialogNodeNames.entities.length) {
                        $scope.contexts.push('entities');
                        $scope.contextsData.entities = $scope.dialogNodeNames.entities;
                    }
                    if ($scope.dialogNodeNames.mappedIntents && $scope.dialogNodeNames.mappedIntents.length) {
                        $scope.contexts.push('mappedIntents');
                        $scope.contextsData.mappedIntents = $scope.dialogNodeNames.mappedIntents;
                    }
                    if ($scope.dialogNodeNames.nodes && $scope.dialogNodeNames.nodes.length) {
                        $scope.contexts = $scope.contexts.concat($scope.dialogNodeNames.nodes);
                    }
                }
            }

            function getAccurateCaretPosition(ctrl) {
                var CaretPos = 0;   // IE Support
                var array = [];
                var res = "";
                if (document.selection) {
                    ctrl.focus();
                    var Sel = document.selection.createRange();
                    Sel.moveStart('character', -ctrl.value.length);
                    array = ctrl.value.match(/[^\s]+/g);
                    if (array && array.length > 1) {
                        res = array[array.length - 1];
                        CaretPos = res.length;
                    } else {
                        CaretPos = Sel.text.length;
                    }
                }
                // Firefox support
                else if (ctrl.selectionStart || ctrl.selectionStart == '0') {
                    array = ctrl.value.match(/[^\s]+/g);
                    if (array && array.length > 1) {
                        res = array[array.length - 1];
                        CaretPos = res.length;
                    } else {
                        CaretPos = ctrl.selectionStart;
                    }
                }
                return CaretPos;
            }
            function GetCaretPosition(ctrl) {
                var CaretPos = 0;   // IE Support
                if (document.selection) {
                    ctrl.focus();
                    var Sel = document.selection.createRange();
                    Sel.moveStart('character', -ctrl.value.length);
                    CaretPos = Sel.text.length;
                }
                // Firefox support
                else if (ctrl.selectionStart || ctrl.selectionStart == '0') {
                    CaretPos = ctrl.selectionStart;
                }
                return (CaretPos);
            }

            function ReturnWord(text, caretPos) {
                var index = text.indexOf(caretPos);
                var preText = text.substring(0, caretPos);
                if (preText.indexOf(" ") > 0) {
                    var words = preText.split(" ");
                    var word = words[words.length - 1]; //return last word
                    var array = word.match(/[^\s]+/g);
                    if (array && array.length > 1) {
                        return array[array.length - 1];
                    }
                    return words[words.length - 1]; //return last word
                } else {
                    var array1 = preText.match(/[^\s]+/g);
                    if (array1 && array1.length > 1) {
                        return array1[array1.length - 1];
                    }
                    return preText;
                }
            }

            function getActiveWord() {
                updateContextVariables();
                var activeElement = document.activeElement;
                $scope.selected = activeElement.value;
                $scope.caretPos = GetCaretPosition(activeElement);
                $scope.accurateCaretPosition = getAccurateCaretPosition(activeElement);
                $scope.currentWord = ReturnWord(activeElement.value, $scope.caretPos);
                var identifierMatches = $scope.currentWord.match(/[a-zA-Z]+/g);
                $scope.availableContexts = [];
                if (identifierMatches && identifierMatches[0] === 'context') {
                    var identifiersCount = ($scope.currentWord.split(".").length - 1);
                    if (identifiersCount === 1) {
                        $scope.availableContexts = $scope.contexts || [];
                        var _tempCurrWord = $scope.currentWord.split('.');
                        $scope.currentWord = _tempCurrWord[_tempCurrWord.length - 1];
                    } else if (identifiersCount > 1) {
                        var identifiers = $scope.currentWord.split(".");
                        if (identifiers[identifiers.length - 1] !== "") {
                            identifiers[identifiers.length - 1] = "";
                        }
                        var _currArrayData = [];
                        for (var index = 0; index < identifiers.length; index++) {
                            if (index > 0 && identifiers[index] !== "") {
                                var _list = [];
                                if (_currArrayData.length === 0) {
                                    //_currArrayData = $scope.contextsData;
                                    _currArrayData = [];
                                }
                                if ($scope.contextsData.session.hasOwnProperty(identifiers[index])) {
                                    _currArrayData = $scope.contextsData.session[identifiers[index]] || [];
                                    if (typeof _currArrayData === 'object' && !_currArrayData[0]) {
                                        _list = [];
                                        $.map(_currArrayData, function (item, key) {
                                            _list.push(key);
                                        });
                                        _currArrayData = [];
                                        _currArrayData = _list;
                                    }
                                } else if ($scope.contextsData.hasOwnProperty(identifiers[index])) {
                                    _currArrayData = $scope.contextsData[identifiers[index]] || [];
                                    if (typeof _currArrayData === 'object' && !_currArrayData[0]) {
                                        _list = [];
                                        $.map(_currArrayData, function (item, key) {
                                            _list.push(key);
                                        });
                                        _currArrayData = [];
                                        _currArrayData = _list;
                                    }
                                } else if (identifiers[identifiers.length - 1] === "") {
                                    _currArrayData = [];
                                } else {
                                    _currArrayData = [];
                                }
                            }
                        }
                        $scope.availableContexts = _currArrayData;
                        $scope.currentWord = identifiers[identifiers.length - 1];
                    }
                }
                return $scope.currentWord;
            }
            setTimeout(function () {
                    element.bind("keydown", function (event) {
                        if (event.keyCode === $.ui.keyCode.TAB && $(this).data("ui-autocomplete").menu.active) {
                            event.preventDefault();
                        }
                    }).autocomplete({
                        minLength: 1,
                        source: function (request, response) {
                            if($scope.triggeredFromSelect) {
                                $scope.triggeredFromSelect = false;
                                return;
                            }
                            // delegate back to autocomplete, but extract the last term
                            var term = getActiveWord();
                            response($.ui.autocomplete.filter($scope.availableContexts, term));
                        },
                        focus: function (event, ui) {
                            event.preventDefault();
                            //return false;
                        },
                        select: function (e, ui) {
                            var item = ui.item.value || "";
                            var front = ($scope.selected).substring(0, $scope.caretPos);
                            var lastIndex = front.lastIndexOf(".");
                            front = front.substring(0, lastIndex) + ".";
                            var back = ($scope.selected).substring($scope.caretPos, $scope.selected.length);
                            $(this).val(front + item + back).trigger('input');
                            $scope.triggeredFromSelect = true;
                            return false;
                        },
                        position: { 
                            collision: "flip"
                        },
                        open: function( event, ui ) {
                            $(".ui-autocomplete:visible").css({left:"+="+$scope.accurateCaretPosition*5});
                            if((window.outerWidth-210) < $(".ui-autocomplete:visible").offset().left) {
                                var _leftToReposition = $(".ui-autocomplete:visible").offset().left - (window.outerWidth-210) + 10; 
                                $(".ui-autocomplete:visible").css({left:"-="+_leftToReposition});
                            }
                        }
                    }).autocomplete("widget").addClass("contextTypeaheadDropdown");
            }, 1000);
            //appendTo: element.next() 
            setTimeout(function () {
                $.each($(".panel-body, body"), function () {
                    $(this).bind("mousewheel", function (event) {
                        if($('.contextTypeaheadDropdown :visible').length &&  event.target.className.indexOf('ui-menu-item') === -1 && element.data('ui-autocomplete') !== undefined) {
                            element.autocomplete('close');
                        }
                    });
                    $(this).scroll(function() {
                        if($('.contextTypeaheadDropdown :visible').length) {
                            element.autocomplete('close');
                        }
                    });
                });
            },1000);
            /*  Typeahead code  ends */
        }
    }
})();