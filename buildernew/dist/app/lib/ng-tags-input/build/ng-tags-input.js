/*!
 * ngTagsInput v3.2.0
 * http://mbenford.github.io/ngTagsInput
 *
 * Copyright (c) 2013-2017 Michael Benford
 * License: MIT
 *
 * Generated at 2017-04-15 17:08:51 -0300
 * @small-talk
 * countTag,uiText,AllowClickToEdit,removeOnBackSpace params were added
 * check height function was added to get the count of hidden tags.
 * edit tag listeners was added inorder to provide the feasibility to edit the tag.
 */
(function() {
'use strict';

var KEYS = {
    backspace: 8,
    tab: 9,
    enter: 13,
    escape: 27,
    space: 32,
    up: 38,
    down: 40,
   // left: 37, /** #KORE COMMENTED TO ALLOW LEFT AND RIGHT KEYS WORK WHILE EDITING */ 
   // right: 39,
    delete: 46,
    comma: 188
};

var MAX_SAFE_INTEGER = 9007199254740991;
var SUPPORTED_INPUT_TYPES = ['text', 'email', 'url'];

var tagsInput = angular.module('ngTagsInput', []);

/**
 * @ngdoc directive
 * @name tagsInput
 * @module ngTagsInput
 *
 * @description
 * Renders an input box with tag editing support.
 *
 * @param {string} ngModel Assignable Angular expression to data-bind to.
 * @param {boolean=} [useStrings=false] Flag indicating that the model is an array of strings (EXPERIMENTAL).
 * @param {string=} [template=NA] URL or id of a custom template for rendering each tag.
 * @param {string=} [templateScope=NA] Scope to be passed to custom templates - of both tagsInput and
 *    autoComplete directives - as $scope.
 * @param {string=} [displayProperty=text] Property to be rendered as the tag label.
 * @param {string=} [keyProperty=text] Property to be used as a unique identifier for the tag.
 * @param {string=} [type=text] Type of the input element. Only 'text', 'email' and 'url' are supported values.
 * @param {string=} [text=NA] Assignable Angular expression for data-binding to the element's text.
 * @param {number=} tabindex Tab order of the control.
 * @param {string=} [placeholder=Add a tag] Placeholder text for the control.
 * @param {number=} [minLength=3] Minimum length for a new tag.
 * @param {number=} [maxLength=MAX_SAFE_INTEGER] Maximum length allowed for a new tag.
 * @param {number=} [minTags=0] Sets minTags validation error key if the number of tags added is less than minTags.
 * @param {number=} [maxTags=MAX_SAFE_INTEGER] Sets maxTags validation error key if the number of tags added is greater
 *    than maxTags.
 * @param {boolean=} [allowLeftoverText=false] Sets leftoverText validation error key if there is any leftover text in
 *    the input element when the directive loses focus.
 * @param {string=} [removeTagSymbol=×] (Obsolete) Symbol character for the remove tag button.
 * @param {boolean=} [addOnEnter=true] Flag indicating that a new tag will be added on pressing the ENTER key.
 * @param {boolean=} [addOnSpace=false] Flag indicating that a new tag will be added on pressing the SPACE key.
 * @param {boolean=} [addOnComma=true] Flag indicating that a new tag will be added on pressing the COMMA key.
 * @param {boolean=} [addOnBlur=true] Flag indicating that a new tag will be added when the input field loses focus.
 * @param {boolean=} [addOnPaste=false] Flag indicating that the text pasted into the input field will be split into tags.
 * @param {string=} [pasteSplitPattern=,] Regular expression used to split the pasted text into tags.
 * @param {boolean=} [replaceSpacesWithDashes=true] Flag indicating that spaces will be replaced with dashes.
 * @param {string=} [allowedTagsPattern=.+] Regular expression that determines whether a new tag is valid.
 * @param {boolean=} [enableEditingLastTag=false] Flag indicating that the last tag will be moved back into the new tag
 *    input box instead of being removed when the backspace key is pressed and the input box is empty.
 * @param {boolean=} [addFromAutocompleteOnly=false] Flag indicating that only tags coming from the autocomplete list
 *    will be allowed. When this flag is true, addOnEnter, addOnComma, addOnSpace and addOnBlur values are ignored.
 * @param {boolean=} [spellcheck=true] Flag indicating whether the browser's spellcheck is enabled for the input field or not.
 * @param {expression=} [tagClass=NA] Expression to evaluate for each existing tag in order to get the CSS classes to be used.
 *    The expression is provided with the current tag as $tag, its index as $index and its state as $selected. The result
 *    of the evaluation must be one of the values supported by the ngClass directive (either a string, an array or an object).
 *    See https://docs.angularjs.org/api/ng/directive/ngClass for more information.
 * @param {expression=} [onTagAdding=NA] Expression to evaluate that will be invoked before adding a new tag. The new
 *    tag is available as $tag. This method must return either a boolean value or a promise. If either a false value or a rejected
 *    promise is returned, the tag will not be added.
 * @param {expression=} [onTagAdded=NA] Expression to evaluate upon adding a new tag. The new tag is available as $tag.
 * @param {expression=} [onInvalidTag=NA] Expression to evaluate when a tag is invalid. The invalid tag is available as $tag.
 * @param {expression=} [onTagRemoving=NA] Expression to evaluate that will be invoked before removing a tag. The tag
 *    is available as $tag. This method must return either a boolean value or a promise. If either a false value or a rejected
 *    promise is returned, the tag will not be removed.
 * @param {expression=} [onTagRemoved=NA] Expression to evaluate upon removing an existing tag. The removed tag is available as $tag.
 * @param {expression=} [onTagClicked=NA] Expression to evaluate upon clicking an existing tag. The clicked tag is available as $tag.
 * @param {boolean=} [doNotAllowSpecialCharacters=false] special characters ".", "!", "?" not allowed specially for confirmation node synonyms.
 * @param {boolean=} [doNotAllowAnySpecialCharacters=false] special characters other than underscore and space not allowed specially for confirmation node synonyms.
 * @param {string=} [customErrMsg =NA] Regular expression that determines whether a new tag is valid.
 * @param {string=} [parentModal =NA] Regular expression that determines whether a new tag is valid.
 * @param {boolean=} [countTag=true] [Expression indicates that it shows the hidden tag count]
 * @param {string=} [uiText=NA] [Expression is used to show <JSMessage> from ui end when responses are of Javascript Message Type]
 * @param {boolean=} [AllowClickToEdit=false] [Expression is used to allow on click edit for a tag]
 * @param {boolean=} [removeOnBackSpace=false] [Expression is used to edit the tag on backspace]
 * @param {boolean=} [validateSpecialCharactersInsideBracket=false] [special characters are not allowed inside angular brackets]
 */
tagsInput.directive('tagsInput', ["$timeout", "uuid", "$document", "$window", "$q", "tagsInputConfig", "tiUtil", "_constants_","$parse", function($timeout, uuid, $document, $window, $q, tagsInputConfig, tiUtil, _constants_,$parse) {
    function TagList(options, events, onTagAdding, onTagRemoving) {
        var self = {}, getTagText, setTagText, canAddTag, canRemoveTag;
    
        getTagText = function(tag) {
            return tiUtil.safeToString(tag[options.displayProperty]);
        };

        setTagText = function(tag, text) {
            tag[options.displayProperty] = text;
            // tag.parent = [scope.tags[scope.tags.length-1].nodeId];
            // tag.nodeId = uuid.v4();
        };

        canAddTag = function(tag) {
            var tagText = getTagText(tag);
            
            var valid = tagText &&
                        tagText.length >= options.minLength &&
                        tagText.length <= options.maxLength &&
                        options.allowedTagsPattern.test(tagText) &&
                        !tiUtil.findInObjectArray(self.items, tag, options.keyProperty || options.displayProperty,null,options);
            if(tagText==''){
                valid = false;
                return $q.when(valid && onTagAdding({ $tag: tag })).then(tiUtil.promisifyValue)
            }
            if(tagText && tagText.length >= options.maxLength){
                 if(!valid && !options.maxLengthMsg){
                    window.NotificationService.notify('Characters limit exceeded '+options.maxLength, 'warning');
                }
                if(!valid && options && options.maxLengthMsg){
                    window.NotificationService.notify(options.maxLengthMsg.replace(/<word>/gi, options.maxLength));
                }
            }
            if(options.validateSpecialCharactersInsideBracket && tagText[0]== "<" && tagText[tagText.length-1]==">" && valid){
                valid = !(/['||"||*]/.test(tagText)) && valid;
                if(!valid){
                    window.NotificationService.notify('Special characters like single or double quotes and  *  are not allowed inside brackets', 'warning');
                }
            }
            if(options.doNotAllowSpecialCharacters && valid){
                 valid = !(/[.||!||?]/.test(tagText)) && valid;//specially for confirmation node
                  if(!valid){
                 window.NotificationService.notify('Special characters like ".", "!", "?" are not allowed here', 'warning');
             }
            }
            if(options.doNotAllowAnySpecialCharacters && valid && !(options.parentModal && options.parentModal=='traits')){
                valid = !(/[\=\`\~\!@#\$\%\^&\*\(\)\-\+\{\}\:"\[\];\',\.\/<>\?\|\\]+/.test(tagText)) && valid;
                 if(!valid){
                window.NotificationService.notify('Only alphanumeric characters, spaces and underscores are allowed.', 'warning');
            }
           }
           if(options.doNotAllowAnySpecialCharacters && valid && (options.parentModal && options.parentModal=='traits')){
            valid = !_constants_.checkForSecialChar(tagText,true,'traits') && valid;
            }
            if(options.botNameValidation && valid){
                valid = ((/^[a-zA-Z0-9][a-zA-Z0-9_<>*. ]+$/).test(tagText))
                   if(!valid){
                    window.NotificationService.notify('Only alphanumerics, underscore, asterisk, <, > are allowed and cannot begin with special a character', 'warning');
                   } 
            }
            return $q.when(valid && onTagAdding({ $tag: tag })).then(tiUtil.promisifyValue);
        };

        canRemoveTag = function(tag) {
            return $q.when(onTagRemoving({ $tag: tag })).then(tiUtil.promisifyValue);
        };

        self.items = [];

        self.addText = function(text) {
            var tag = {};
            setTagText(tag, text);
            return self.add(tag);
        };

        self.updateText = function(index,text){
            var tag = {};
            setTagText(tag,text);
            var tagText =  getTagText(tag);
            if (options.replaceSpacesWithDashes) {
                tagText = tiUtil.replaceSpacesWithDashes(tagText);
            }
            setTagText(tag, tagText);
            return canAddTag(tag).then(function(){
                self.items[index]['text'] = tag.text;
                tag['editable'] = true;
                events.trigger('tag-added', { $tag: tag});
            })
            .catch(function(){
                if(tagText){
                    events.trigger('invalid-tag', { $tag: tag });
                }
            });

        };

        self.addTextArr = function(textArr) {
            textArr.forEach(function(text) {
                self.addText(text);
            });
        };

        self.add = function(tag) {
            var tagText = getTagText(tag);

            if (options.replaceSpacesWithDashes) {
                tagText = tiUtil.replaceSpacesWithDashes(tagText);
            }

            setTagText(tag, tagText);

            return canAddTag(tag)
                .then(function() {
                    self.items.push(tag);
                    events.trigger('tag-added', { $tag: tag });
                })
                .catch(function() {
                    if (tagText) {
                      events.trigger('invalid-tag', { $tag: tag });
                    }
                });
        };

        self.remove = function(index) {
            var tag = self.items[index];

            if(tag.hideRemove){
                return false;
            }

            if(options && options.countTag && self.items.length === 1 && index === 0){
                events.trigger('tag-removed');
                return tag;
                
            }

            return canRemoveTag(tag).then(function() {
                self.items.splice(index, 1);
                self.clearSelection();
                events.trigger('tag-removed', { $tag: tag });
                return tag;
            });
        };

        self.select = function(index) {
            if (index < 0) {
                index = self.items.length - 1;
            }
            else if (index >= self.items.length) {
                index = 0;
            }

            self.index = index;
            self.selected = self.items[index];
        };

        self.selectPrior = function() {
            self.select(--self.index);
        };

        self.selectNext = function() {
            self.select(++self.index);
        };

        self.removeSelected = function() {
            return self.remove(self.index);
        };

        self.clearSelection = function() {
            self.selected = null;
            self.index = -1;
        };

        self.getItems = function() {
            return options.useStrings ? self.items.map(getTagText): self.items;
        };

        

        self.clearSelection();

        return self;
    }

    function validateType(type) {
        return SUPPORTED_INPUT_TYPES.indexOf(type) !== -1;
    }

    return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            tags: '=ngModel',
            text: '=?',
            templateScope: '=?',
            tagClass: '&',
            onTagAdding: '&',
            onTagAdded: '&',
            onInvalidTag: '&',
            onTagRemoving: '&',
            onTagRemoved: '&',
            onTagClicked: '&',
            currentNode:'=',
            bridge:'='
            
        },
        replace: false,
        transclude: true,
        templateUrl: 'ngTagsInput/tags-input.html',
        controller: ["$scope", "$attrs", "$element","$timeout",'i18n', function($scope, $attrs, $element,$timeout,i18n) {
            $scope.events = tiUtil.simplePubSub();
            $scope.defaultCollapseValue = false; // to avoid collapse on adding tag
            $scope.itemsArray = [];
            tagsInputConfig.load('tagsInput', $scope, $attrs, {
                template: [String, 'ngTagsInput/tag-item.html'],
                type: [String, 'text', validateType],
                placeholder: [String, i18n.i18nString('type_enter_tag')],
                tabindex: [Number, null],
                removeTagSymbol: [String, String.fromCharCode(215)],
                replaceSpacesWithDashes: [Boolean, true],
                minLength: [Number, 3],
                maxLength: [Number, MAX_SAFE_INTEGER],
                addOnEnter: [Boolean, true],
                addOnSpace: [Boolean, false],
                showOnFocus: [Boolean, false],
                addOnComma: [Boolean, true],
                addOnBlur: [Boolean, true],
                addOnPaste: [Boolean, false],
                pasteSplitPattern: [RegExp, /,/],
                allowedTagsPattern: [RegExp, /.+/],
                enableEditingLastTag: [Boolean, false],
                minTags: [Number, 0],
                maxTags: [Number, MAX_SAFE_INTEGER],
                displayProperty: [String, 'text'],
                keyProperty: [String, ''],
                allowLeftoverText: [Boolean, false],
                addFromAutocompleteOnly: [Boolean, false],
                spellcheck: [Boolean, true],
                useStrings: [Boolean, false],
                doNotAllowSpecialCharacters:[Boolean, false],
                doNotAllowAnySpecialCharacters:[Boolean, false],
                customErrMsg:[String,''],
                parentModal:[String,''],
                countTag:[Boolean,false],
                allowClickToEdit:[Boolean,false], 
                inputSplitPattern: [RegExp, null],
                uiText:[String,'text'],
                removeOnBackSpace:[Boolean,true],
                tagTitle:[Boolean,true],
                maxLengthMsg:[String,''],
                botNameValidation:[Boolean,false],
                validateSpecialCharactersInsideBracket:[Boolean,true]

            });

            $scope.tagList = new TagList($scope.options, $scope.events,
                tiUtil.handleUndefinedResult($scope.onTagAdding, true),
                tiUtil.handleUndefinedResult($scope.onTagRemoving, true));
           
           
            this.registerAutocomplete = function() {
                var input = $element.find('input');

                return {
                    addTag: function(tag) {
                        return $scope.tagList.add(tag);
                    },
                    getTags: function() {
                        return $scope.tagList.items;
                    },
                    getCurrentTagText: function() {
                        return $scope.newTag.text();
                    },
                    getOptions: function() {
                        return $scope.options;
                    },
                    getTemplateScope: function() {
                        return $scope.templateScope;
                    },
                    on: function(name, handler) {
                        $scope.events.on(name, handler, true);
                        return this;
                    }
                };
            };

            this.registerTagItem = function() {
                return {
                    getOptions: function() {
                        return $scope.options;
                    },
                    removeTag: function(index) {
                        if ($scope.disabled) {
                            return;
                        }
                        $scope.tagList.remove(index);
                    },
                    addItem:function(value){
                        $scope.itemsArray.push(value);
                    },
                    tagsLength:function(){
                        return $scope.itemsArray.length;
                    }
                };
            };
            
            /** kore!! to check height inorder to show count which ever exceeds the firs level of input tags */
            function checkHeight(options){
                if(options && options.countTag){
                $timeout(function(){
                     var countTag = $element.find('.tags');
                     var _elements = $element.find('.tag-item');
                         _.map(_elements,function(e,i){
                        if($(e).offset().top > $($(_elements)[0]).offset().top){
                            countTag.children('.count').css({'display':'block'});
                            $(e).css({'display':'none'});
                            $(e).parent().next().css({'display':'none'});
                            console.log($(e),i);
                           
                        }
                    var filteredElements =  _.filter(_elements,function(e,i){
                        return (!$(e).is(':visible'));
                     }).length;
                     if(filteredElements){
                         $scope.count = filteredElements;
                     }else{
                        countTag.children('.count').css({'display':'none'});
                     }
                    
          
                     });
                     });
                    }
                 };
            this.checkHeight = checkHeight;

            $scope.checkHeight = function(options){
                checkHeight(options);
            };


        }],
        link: function(scope, element, attrs, ngModelCtrl) {
            var hotkeys = [KEYS.enter, KEYS.comma, KEYS.space, KEYS.backspace, KEYS.delete, KEYS.left, KEYS.right],
                tagList = scope.tagList,
                events = scope.events,
                options = scope.options,
                input = element.find('input'),
                validationOptions = ['minTags', 'maxTags', 'allowLeftoverText'],
                setElementValidity,
                focusInput;
                scope.stopCollapse = false;
                


            setElementValidity = function() {
                ngModelCtrl.$setValidity('maxTags', tagList.items.length <= options.maxTags);
                ngModelCtrl.$setValidity('minTags', tagList.items.length >= options.minTags);
                ngModelCtrl.$setValidity('leftoverText', scope.hasFocus || options.allowLeftoverText ? true : !scope.newTag.text());
            };

            focusInput = function() {
                $timeout(function() { input[0].focus(); });
            };

            ngModelCtrl.$isEmpty = function(value) {
                return !value || !value.length;
            };

            scope.isEditing = false;

            scope.newTag = {
                text: function(value) {
                    if (angular.isDefined(value)) {
                        scope.text = value;
                        events.trigger('input-change', value);
                    }
                    else {
                        return scope.text || '';
                    }
                },
                invalid: null
            };

            scope.editingTag = {
                text: function(value) {
                    if (angular.isDefined(value)) {
                        scope.editingText = value;
                        events.trigger('edit-input-change', value);
                    } else {
                        return scope.editingText || '';
                    }
                },
                invalid: null

            };

            scope.track = function(tag) {
                return tag[options.keyProperty || options.displayProperty];
            };

            scope.getTagClass = function(tag, index) {
                var selected = tag === tagList.selected;
                return [
                    scope.tagClass({$tag: tag, $index: index, $selected: selected}),
                    { selected: selected }
                ];
            };

            scope.getScripTagClass = function(tag){
                if(tag.$tag.hasOwnProperty('uiText')){
                    return 'jsTag';
                }
            };


            scope.getImage = function(tag) {
                if(tag.tagUsage === 'mandatory') {
                    return window.appConfig.CONTEXT_PATH+'/assets/ontology/rectangle-red.svg';
                }
                else if(tag.tagUsage === 'organizer') {
                    return window.appConfig.CONTEXT_PATH+'/assets/ontology/rectangle-gray.svg';
                }
            };
            scope.$watch('tags', function(value) {
                if (value) {
                    tagList.items = tiUtil.makeObjectArray(value, options.displayProperty);
                    if (options.useStrings) {
                        return;
                    }
                    if(!tagList.items[tagList.items.length - 1]) {
                        tagList.items.pop();
                    }
                    scope.tags = tagList.items;
                }
                else {
                    tagList.items = [];
                }
            });

            scope.$watch('tags.length', function() {
                setElementValidity();


                // ngModelController won't trigger validators when the model changes (because it's an array),
                // so we need to do it ourselves. Unfortunately this won't trigger any registered formatter.
                ngModelCtrl.$validate();

            });
           

            attrs.$observe('disabled', function(value) {
                scope.disabled = value;
            });

            scope.eventHandlers = {
                input: {
                    keydown: function($event,index,tag) {
                        scope.currentIndex = index;
                        scope.tag = tag;
                        events.trigger('input-keydown', $event);
                    },
                    focus: function() {
                        if(options.showOnFocus) {
                            events.trigger('input-change', 'a');
                        }
                        if (scope.hasFocus) {
                            return;
                        }
                        scope.hasFocus = true;
                        events.trigger('input-focus');
                    },
                    blur: function() {
                        $timeout(function() {
                            var activeElement = $document.prop('activeElement'),
                                lostFocusToBrowserWindow = activeElement === input[0],
                                lostFocusToChildElement = element[0].contains(activeElement);

                            if (lostFocusToBrowserWindow || !lostFocusToChildElement) {
                                scope.hasFocus = false;
                                events.trigger('input-blur');
                            }
                        });
                    },
                    editBlur: function($event, tag) {
                        events.trigger('edit-input-blur', tag);
                    },
                    paste: function($event) {
                        $event.getTextData = function() {
                            var clipboardData = $event.clipboardData || ($event.originalEvent && $event.originalEvent.clipboardData);
                            return clipboardData ? clipboardData.getData('text/plain') : $window.clipboardData.getData('Text');
                        };
                        events.trigger('input-paste', $event);
                    }
                },
                host: {
                    click: function(e) {
                        if (scope.disabled) {
                            return;
                        }
                        if(options.countTag){
                            var _element = e.currentTarget;
                            $(_element).find('.count').css('display','none');
                            var _parentElement = $(_element).find('.tag-list');
                            _parentElement.next().css('display','block');
                            _parentElement.children().css('display','block');
                             scope.defaultCollapseValue = true;
                        }
                        if(!scope.isEditing){
                           focusInput(); 
                        }
                        
                    }
                },
                tag: {
                    click: function(tag) {
                        events.trigger('tag-clicked', { $tag: tag });
                    },
                     dblclick: function(tag) {
                        events.trigger('tag-dblclicked', {$tag:tag});
                    }
                }
            };

            events
                .on('tag-added', scope.onTagAdded)
                .on('invalid-tag', scope.onInvalidTag)
                .on('tag-removed', scope.onTagRemoved)
                .on('tag-clicked', scope.onTagClicked)
                .on('tag-dblclicked',function(tag){
                    if(options.allowClickToEdit && !tag.$tag.hasOwnProperty('uiText') && (tag.$tag.hasOwnProperty('basic') || tag.$tag.text.length)){
                        scope.editingTag.text(tag.$tag.text.replace(/&lt;/g, "<").replace(/&gt;/g, ">"));
                        tag.$tag.editable = true;
                        scope.isEditing = true;
                        setTimeout(function(){
                            element.find('input')[0].focus();
                        },0);
                       

                     }else if((tag.$tag.hasOwnProperty('uiText')) || (tag.$tag.type === 'basic' && tag.$tag.text.length > 100 )){
                        scope.bridge.openEditSlider(null,scope.currentNode,tag.$tag);
                     }
                })
                .on('tag-added', function() {
                    scope.newTag.text('');
                })
                .on('tag-added tag-removed', function() {
                    scope.tags = tagList.getItems();
                    // Ideally we should be able call $setViewValue here and let it in turn call $setDirty and $validate
                    // automatically, but since the model is an array, $setViewValue does nothing and it's up to us to do it.
                    // Unfortunately this won't trigger any registered $parser and there's no safe way to do it.
                    ngModelCtrl.$setDirty();
                    focusInput();
                })
                .on('invalid-tag', function() {
                    scope.newTag.invalid = true;
                })
                .on('option-change', function(e) {
                    if (validationOptions.indexOf(e.name) !== -1) {
                        setElementValidity();
                    }
                })
                .on('input-change', function() {
                    tagList.clearSelection();
                    scope.newTag.invalid = null;
                })
                .on('input-focus', function() {
                    element.triggerHandler('focus');
                    ngModelCtrl.$setValidity('leftoverText', true);
                })
                .on('input-blur', function() {
                    if (options.addOnBlur && !options.addFromAutocompleteOnly) {
                        var tags = scope.newTag.text().split(options.inputSplitPattern);
                        tagList.addText(scope.newTag.text());
                    }
                    element.triggerHandler('blur');
                    setElementValidity();
                    $timeout(function(){
                        if(!scope.isEditing){
                            scope.checkHeight(options);
                        }
                        
                    },400);
                    
                })
                /** !!kore on click allow the tag to open in edit mode */
                .on('edit-input-blur', function(tag) {
                    var editingText = scope.editingTag.text();
                    var tags = editingText.split(options.inputSplitPattern);
                    // var firstTagText = tags.shift();
                    //tag.text = firstTagText;
                    //tagList.addText(editingText);
                    tag.editable = false;
                    scope.isEditing = false;
                    
                   
                })
                 /** !!kore look to change of edit input in-order to edit taginput */
                .on('edit-input-change', function() {
                    tagList.clearSelection();
                    scope.editingTag.invalid = null;
                 })
                .on('input-keydown', function(event) {
                    var key = event.keyCode,
                        addKeys = {},removeKeys={},
                        shouldAdd, shouldRemove, shouldSelect, shouldEditLastTag;

                    if (tiUtil.isModifierOn(event) || hotkeys.indexOf(key) === -1) {
                        return;
                    }

                    addKeys[KEYS.enter] = options.addOnEnter;
                    addKeys[KEYS.comma] = options.addOnComma;
                    addKeys[KEYS.space] = options.addOnSpace;

                    removeKeys[KEYS.backspace] = options.removeOnBackSpace;

                    shouldAdd = !options.addFromAutocompleteOnly && addKeys[key];
                    shouldRemove = (removeKeys[key] || key === KEYS.delete) && tagList.selected;
                    shouldEditLastTag = key === KEYS.backspace && scope.newTag.text().length === 0 && options.enableEditingLastTag;
                    shouldSelect = (removeKeys[key] || key === KEYS.left || key === KEYS.right) && scope.newTag.text().length === 0 && !options.enableEditingLastTag;

                    if (shouldAdd) {
                        if(!scope.isEditing){
                            tagList.addText(scope.newTag.text());
                        }else{
                            console.log(scope.currentIndex);
                            tagList.updateText(scope.currentIndex,scope.editingText);
                            scope.isEditing  = false;
                            //scope.tag.text = scope.editingText;
                           // element.find('input')[0].blur();

                        }
                        
                    }
                    else if (shouldEditLastTag) {
                        tagList.selectPrior();
                        tagList.removeSelected().then(function(tag) {
                            if (tag) {
                                scope.newTag.text(tag[options.displayProperty]);
                            }
                        });
                    }
                    else if (shouldRemove) {
                        tagList.removeSelected();
                    }
                    else if (shouldSelect) {
                        if (key === KEYS.left || key === KEYS.backspace) {
                            tagList.selectPrior();
                        }
                        else if (key === KEYS.right) {
                            tagList.selectNext();
                        }
                    }

                    if (shouldAdd || shouldSelect || shouldRemove || shouldEditLastTag) {
                        event.preventDefault();
                    }
                })
                .on('input-paste', function(event) {
                    if (options.addOnPaste) {
                        var data = event.getTextData();
                        var tags = data.split(options.pasteSplitPattern);

                        if (tags.length > 1) {
                            tags.forEach(function(tag) {
                                tagList.addText(tag);
                            });
                            event.preventDefault();
                        }
                    }
                });
                
        }
    };
}]);


/**
 * @ngdoc directive
 * @name tiTagItem
 * @module ngTagsInput
 *
 * @description
 * Represents a tag item. Used internally by the tagsInput directive.
 */
tagsInput.directive('tiTagItem', ["tiUtil","$timeout", function(tiUtil,$timeout) {
    return {
        restrict: 'E',
        require: '^tagsInput',
        template: '<ng-include class="d-flex align-items-center" src="$$template"></ng-include>',
        scope: {
            $scope: '=scope',
            data: '=',
            collapseValue:'='
        },
        link: function(scope, element, attrs, tagsInputCtrl) {
            var tagsInput = tagsInputCtrl.registerTagItem(),
                tagItems =  tagsInputCtrl.registerAutocomplete().getTags(),
                options = tagsInput.getOptions();
            scope.$$template = options.template;
            scope.$$removeTagSymbol = options.removeTagSymbol;
            
            scope.$getDisplayText = function() {
                if(options.uiText !== undefined && scope.data['type'] === 'uxmap'){
                    return scope.data[options.uiText];
                }else{
                    return tiUtil.safeToString(scope.data[options.displayProperty]);
                }
                
            };
            scope.$getTagTitle = function(){
                     if(options.uiText !== undefined && scope.data['type'] === 'uxmap' && options.tagTitle){
                       return scope.data[options.uiText];
                    }else if(options.tagTitle){
                        return tiUtil.safeToString(scope.data[options.displayProperty]);
                    }
               
            };
            scope.$addTagClass = function(){
                if(options.uiText !== undefined && scope.data['type'] === 'uxmap'){
                    return 'jsTag';
                }
            };
            scope.$hideRemoveIcon = function() {
                return scope.data.hideRemove;
            };
            scope.$removeTag = function(event) {
                event.preventDefault();
                event.stopImmediatePropagation();
                tagsInput.removeTag(scope.$index);
                tagsInputCtrl.checkHeight(options);
                
            }
             /** !!kore on addition of tag check height inorder to show the count if exceeds first level of tag-input */
            scope.$addTagItem = function(){
                if(options && options.countTag){
                $timeout(function(){
                    tagsInput.addItem( scope.$getDisplayText(scope.data));
                    if(tagsInput.tagsLength() === tagItems.length && !scope.collapseValue){
                      tagsInputCtrl.checkHeight(options);
                 }
                });
             }
            };
            scope.$watch('$parent.$index', function(value) {
                scope.$index = value;
            });
           
        }
    };
}]);

/**
 * @description [tag count which is hidden].
 */
// tagInput.directive('tiTagCount',['$timeout',function(){

// }]);


/**
 * @ngdoc directive
 * @name autoComplete
 * @module ngTagsInput
 *
 * @description
 * Provides autocomplete support for the tagsInput directive.
 *
 * @param {expression} source Expression to evaluate upon changing the input content. The input value is available as
 *    $query. The result of the expression must be a promise that eventually resolves to an array of strings.
 * @param {string=} [template=NA] URL or id of a custom template for rendering each element of the autocomplete list.
 * @param {string=} [displayProperty=tagsInput.displayText] Property to be rendered as the autocomplete label.
 * @param {number=} [debounceDelay=100] Amount of time, in milliseconds, to wait before evaluating the expression in
 *    the source option after the last keystroke.
 * @param {number=} [minLength=3] Minimum number of characters that must be entered before evaluating the expression
 *    in the source option.
 * @param {boolean=} [highlightMatchedText=true] Flag indicating that the matched text will be highlighted in the
 *    suggestions list.
 * @param {number=} [maxResultsToShow=10] Maximum number of results to be displayed at a time.
 * @param {boolean=} [loadOnDownArrow=false] Flag indicating that the source option will be evaluated when the down arrow
 *    key is pressed and the suggestion list is closed. The current input value is available as $query.
 * @param {boolean=} [loadOnEmpty=false] Flag indicating that the source option will be evaluated when the input content
 *    becomes empty. The $query variable will be passed to the expression as an empty string.
 * @param {boolean=} [loadOnFocus=false] Flag indicating that the source option will be evaluated when the input element
 *    gains focus. The current input value is available as $query.
 * @param {boolean=} [selectFirstMatch=true] Flag indicating that the first match will be automatically selected once
 *    the suggestion list is shown.
 * @param {boolean=} [showOnFocus=true] Flag indicates to show the suggestions on focus without entering any character.
 * @param {expression=} [matchClass=NA] Expression to evaluate for each match in order to get the CSS classes to be used.
 * @param {string=} [autoCompleteId=NA] Id to evaluate position of the element to show autocomplete list ,depending on element id. Value will be same as id added to the same element . id is must for this to key to work.
 *    The expression is provided with the current match as $match, its index as $index and its state as $selected. The result
 *    of the evaluation must be one of the values supported by the ngClass directive (either a string, an array or an object).
 *    See https://docs.angularjs.org/api/ng/directive/ngClass for more information.
 */
tagsInput.directive('autoComplete', ["$document", "$timeout", "$sce", "$q", "tagsInputConfig", "tiUtil", function($document, $timeout, $sce, $q, tagsInputConfig, tiUtil) {
    function SuggestionList(loadFn, options, events) {
        var self = {}, getDifference, lastPromise, getTagId;

        getTagId = function() {
            return options.tagsInput.keyProperty || options.tagsInput.displayProperty;
        };

        getDifference = function(array1, array2) {
            return array1.filter(function(item) {
                return !tiUtil.findInObjectArray(array2, item, getTagId(), function(a, b) {
                    if (options.tagsInput.replaceSpacesWithDashes) {
                        a = tiUtil.replaceSpacesWithDashes(a);
                        b = tiUtil.replaceSpacesWithDashes(b);
                    }
                    return tiUtil.defaultComparer(a, b,true,options.tagsInput.customErrMsg);
                },options.tagsInput.customErrMsg);
            });
        };

        self.reset = function() {
            lastPromise = null;

            self.items = [];
            self.visible = false;
            self.index = -1;
            self.selected = null;
            self.query = null;
        };
        self.show = function() {
            if (options.selectFirstMatch) {
                self.select(0);
            }
            else {
                self.selected = null;
            }
            if(options.autoCompleteId){
                self.id =$("#"+options.autoCompleteId);
                if(self.id && self.id.siblings){
                    if(self.id.siblings(".tags")){
                        if(self.id.siblings(".tags").children('input')){
                            if(self.id.siblings(".tags").children('input').position()){
                                self.leftOffset = self.id.siblings(".tags").children('input').position().left +'px';
                            }
                        }
                    }
                }
            }
            self.visible = true;
        };
        self.load = tiUtil.debounce(function(query, tags) {
            self.query = query;

            var promise = $q.when(loadFn({ $query: query }));
            lastPromise = promise;

            promise.then(function(items) {
                if (promise !== lastPromise) {
                    return;
                }

                items = tiUtil.makeObjectArray(items.data || items, getTagId());
                items = getDifference(items, tags);
                self.items = items.slice(0, options.maxResultsToShow);

                if (self.items.length > 0) {
                    self.show();
                }
                else {
                    self.reset();
                }
            });
        }, options.debounceDelay);

        self.selectNext = function() {
            self.select(++self.index);
        };
        self.selectPrior = function() {
            self.select(--self.index);
        };
        self.select = function(index) {
            if (index < 0) {
                index = self.items.length - 1;
            }
            else if (index >= self.items.length) {
                index = 0;
            }
            self.index = index;
            self.selected = self.items[index];
            events.trigger('suggestion-selected', index);
        };

        self.reset();

        return self;
    }

    function scrollToElement(root, index) {
        var element = root.find('li').eq(index),
            parent = element.parent(),
            elementTop = element.prop('offsetTop'),
            elementHeight = element.prop('offsetHeight'),
            parentHeight = parent.prop('clientHeight'),
            parentScrollTop = parent.prop('scrollTop');

        if (elementTop < parentScrollTop) {
            parent.prop('scrollTop', elementTop);
        }
        else if (elementTop + elementHeight > parentHeight + parentScrollTop) {
            parent.prop('scrollTop', elementTop + elementHeight - parentHeight);
        }
    }

    return {
        restrict: 'E',
        require: '^tagsInput',
        scope: {
            source: '&',
            matchClass: '&',
            tagsInputConfig:'&'
        },
        templateUrl: 'ngTagsInput/auto-complete.html',
        controller: ["$scope", "$element", "$attrs", function($scope, $element, $attrs) {
            $scope.events = tiUtil.simplePubSub();
            
            tagsInputConfig.load('autoComplete', $scope, $attrs, {
                template: [String, 'ngTagsInput/auto-complete-match.html'],
                debounceDelay: [Number, 100],
                minLength: [Number, 3],
                highlightMatchedText: [Boolean, true],
                maxResultsToShow: [Number, 10],
                loadOnDownArrow: [Boolean, false],
                loadOnEmpty: [Boolean, false],
                loadOnFocus: [Boolean, true],
                selectFirstMatch: [Boolean, true],
                displayProperty: [String, ''],
                autoCompleteId: [String, '']
            });

            $scope.suggestionList = new SuggestionList($scope.source, $scope.options, $scope.events);

            this.registerAutocompleteMatch = function() {
                return {
                    getOptions: function() {
                        return $scope.options;
                    },
                    getQuery: function() {
                        return $scope.suggestionList.query;
                    }
                };
            };
        }],
        link: function(scope, element, attrs, tagsInputCtrl) {
            var hotkeys = [KEYS.enter, KEYS.tab, KEYS.escape, KEYS.up, KEYS.down],
                suggestionList = scope.suggestionList,
                tagsInput = tagsInputCtrl.registerAutocomplete(),
                options = scope.options,
                events = scope.events,
                shouldLoadSuggestions;

            options.tagsInput = tagsInput.getOptions();

            shouldLoadSuggestions = function(value) {
                return value && value.length >= options.minLength || !value && options.loadOnEmpty;
            };

            scope.templateScope = tagsInput.getTemplateScope();

            scope.addSuggestionByIndex = function(index) {
                suggestionList.select(index);
                scope.addSuggestion();
            };

            scope.addSuggestion = function() {
                var added = false;

                if (suggestionList.selected) {
                    tagsInput.addTag(angular.copy(suggestionList.selected));
                    suggestionList.reset();
                    added = true;
                }
                return added;
            };

            scope.track = function(item) {
                return item[options.tagsInput.keyProperty || options.tagsInput.displayProperty];
            };

            scope.getSuggestionClass = function(item, index) {
                var selected = item === suggestionList.selected;
                return [
                    scope.matchClass({$match: item, $index: index, $selected: selected}),
                    { selected: selected }
                ];
            };

            tagsInput
                .on('tag-added tag-removed invalid-tag input-blur', function() {
                    suggestionList.reset();
                })
                .on('input-change', function(value) {
                    if (shouldLoadSuggestions(value)) {
                        suggestionList.load(value, tagsInput.getTags());
                    }
                    else {
                        suggestionList.reset();
                    }

                })
                .on('input-focus', function() {
                    var value = tagsInput.getCurrentTagText();
                    if (options.loadOnFocus && shouldLoadSuggestions(value)) {
                        suggestionList.load(value, tagsInput.getTags());
                    }
                })
                .on('input-keydown', function(event) {
                    var key = event.keyCode,
                        handled = false;

                    if (tiUtil.isModifierOn(event) || hotkeys.indexOf(key) === -1) {
                        return;
                    }

                    if (suggestionList.visible) {

                        if (key === KEYS.down) {
                            suggestionList.selectNext();
                            handled = true;
                        }
                        else if (key === KEYS.up) {
                            suggestionList.selectPrior();
                            handled = true;
                        }
                        else if (key === KEYS.escape) {
                            suggestionList.reset();
                            handled = true;
                        }
                        else if (key === KEYS.enter || key === KEYS.tab) {
                            handled = scope.addSuggestion();
                        }
                    }
                    else {
                        if (key === KEYS.down && scope.options.loadOnDownArrow) {
                            suggestionList.load(tagsInput.getCurrentTagText(), tagsInput.getTags());
                            handled = true;
                        }
                    }

                    if (handled) {
                        event.preventDefault();
                        event.stopImmediatePropagation();
                        return false;
                    }
                });

            events.on('suggestion-selected', function(index) {
                scrollToElement(element, index);
            });
        }
    };
}]);


/**
 * @ngdoc directive
 * @name tiAutocompleteMatch
 * @module ngTagsInput
 *
 * @description
 * Represents an autocomplete match. Used internally by the autoComplete directive.
 */
tagsInput.directive('tiAutocompleteMatch', ["$sce", "tiUtil", function($sce, tiUtil) {
    return {
        restrict: 'E',
        require: '^autoComplete',
        template: '<ng-include src="$$template"></ng-include>',
        scope: {
            $scope: '=scope',
            data: '='
        },
        link: function(scope, element, attrs, autoCompleteCtrl) {
            var autoComplete = autoCompleteCtrl.registerAutocompleteMatch(),
                options = autoComplete.getOptions();

            scope.$$template = options.template;
            scope.$index = scope.$parent.$index;

            scope.$highlight = function(text) {
                if (options.highlightMatchedText) {
                    text = tiUtil.safeHighlight(text, autoComplete.getQuery());
                }
                return $sce.trustAsHtml(text);
            };
            scope.$getDisplayText =  function() {
                return tiUtil.safeToString(scope.data[options.displayProperty || options.tagsInput.displayProperty]);
            };

            scope.$hideRemoveIcon = function() {
                return scope.data.hideRemove || options.tagsInput.hideRemove;
            };
        }
    };
}]);


/**
 * @ngdoc directive
 * @name tiTranscludeAppend
 * @module ngTagsInput
 *
 * @description
 * Re-creates the old behavior of ng-transclude. Used internally by tagsInput directive.
 */
tagsInput.directive('tiTranscludeAppend', function() {
    return function(scope, element, attrs, ctrl, transcludeFn) {
        transcludeFn(function(clone) {
            element.append(clone);
        });
    };
});

/**
 * @ngdoc directive
 * @name tiAutosize
 * @module ngTagsInput
 *
 * @description
 * Automatically sets the input's width so its content is always visible. Used internally by tagsInput directive.
 */
tagsInput.directive('tiAutosize', ["tagsInputConfig", function(tagsInputConfig) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            var threshold = tagsInputConfig.getTextAutosizeThreshold(),
                span, resize;

            span = angular.element('<span class="input"></span>');
            span.css('display', 'none')
                .css('visibility', 'hidden')
                .css('width', 'auto')
                .css('white-space', 'pre');

            element.parent().append(span);


            resize = function(originalValue) {
                var value = originalValue, width;

                if (angular.isString(value) && value.length === 0) {
                    value = attrs.placeholder;
                }

                if (value) {
                    span.text(value);
                    span.css('display', '');
                    width = span.prop('offsetWidth');
                    span.css('display', 'none');
                }

                element.css('width', width ? width + threshold + 'px' : '');

                return originalValue;
            };

            ctrl.$parsers.unshift(resize);
            ctrl.$formatters.unshift(resize);

            attrs.$observe('placeholder', function(value) {
                if (!ctrl.$modelValue) {
                    resize(value);
                }
            });
        }
    };
}]);

/**
 * @ngdoc directive
 * @name tiBindAttrs
 * @module ngTagsInput
 *
 * @description
 * Binds attributes to expressions. Used internally by tagsInput directive.
 */
tagsInput.directive('tiBindAttrs', function() {
    return function(scope, element, attrs) {
        scope.$watch(attrs.tiBindAttrs, function(value) {
            angular.forEach(value, function(value, key) {
                attrs.$set(key, value);
            });
        }, true);
    };
});

/**
 * @ngdoc service
 * @name tagsInputConfig
 * @module ngTagsInput
 *
 * @description
 * Sets global configuration settings for both tagsInput and autoComplete directives. It's also used internally to parse and
 *  initialize options from HTML attributes.
 */
tagsInput.provider('tagsInputConfig', function() {
    var globalDefaults = {},
        interpolationStatus = {},
        autosizeThreshold = 3;

    /**
     * @ngdoc method
     * @name tagsInputConfig#setDefaults
     * @description Sets the default configuration option for a directive.
     *
     * @param {string} directive Name of the directive to be configured. Must be either 'tagsInput' or 'autoComplete'.
     * @param {object} defaults Object containing options and their values.
     *
     * @returns {object} The service itself for chaining purposes.
     */
    this.setDefaults = function(directive, defaults) {
        globalDefaults[directive] = defaults;
        return this;
    };

    /**
     * @ngdoc method
     * @name tagsInputConfig#setActiveInterpolation
     * @description Sets active interpolation for a set of options.
     *
     * @param {string} directive Name of the directive to be configured. Must be either 'tagsInput' or 'autoComplete'.
     * @param {object} options Object containing which options should have interpolation turned on at all times.
     *
     * @returns {object} The service itself for chaining purposes.
     */
    this.setActiveInterpolation = function(directive, options) {
        interpolationStatus[directive] = options;
        return this;
    };

    /**
     * @ngdoc method
     * @name tagsInputConfig#setTextAutosizeThreshold
     * @description Sets the threshold used by the tagsInput directive to re-size the inner input field element based on its contents.
     *
     * @param {number} threshold Threshold value, in pixels.
     *
     * @returns {object} The service itself for chaining purposes.
     */
    this.setTextAutosizeThreshold = function(threshold) {
        autosizeThreshold = threshold;
        return this;
    };

    this.$get = ["$interpolate", function($interpolate) {
        var converters = {};
        converters[String] = function(value) { return value; };
        converters[Number] = function(value) { return parseInt(value, 10); };
        converters[Boolean] = function(value) { return value.toLowerCase() === 'true'; };
        converters[RegExp] = function(value) { return new RegExp(value); };

        return {
            load: function(directive, scope, attrs, options) {
                var defaultValidator = function() { return true; };

                scope.options = {};

                angular.forEach(options, function(value, key) {
                    var type, localDefault, validator, converter, getDefault, updateValue;

                    type = value[0];
                    localDefault = value[1];
                    validator = value[2] || defaultValidator;
                    converter = converters[type];

                    getDefault = function() {
                        var globalValue = globalDefaults[directive] && globalDefaults[directive][key];
                        return angular.isDefined(globalValue) ? globalValue : localDefault;
                    };

                    updateValue = function(value) {
                        scope.options[key] = value && validator(value) ? converter(value) : getDefault();
                    };

                    if (interpolationStatus[directive] && interpolationStatus[directive][key]) {
                        attrs.$observe(key, function(value) {
                            updateValue(value);
                            scope.events.trigger('option-change', { name: key, newValue: value });
                        });
                    }
                    else {
                        updateValue(attrs[key] && $interpolate(attrs[key])(scope.$parent));
                    }
                });
            },
            getTextAutosizeThreshold: function() {
                return autosizeThreshold;
            }
        };
    }];
});


/***
 * @ngdoc service
 * @name tiUtil
 * @module ngTagsInput
 *
 * @description
 * Helper methods used internally by the directive. Should not be called directly from user code.
 */
tagsInput.factory('tiUtil', ["$timeout", "$q",'_constants_', function($timeout, $q ,_constants_) {
    var self = {};

    self.debounce = function(fn, delay) {
        var timeoutId;
        return function() {
            var args = arguments;
            $timeout.cancel(timeoutId);
            timeoutId = $timeout(function() { fn.apply(null, args); }, delay);
        };
    };

    self.makeObjectArray = function(array, key) {
        if (!angular.isArray(array) || array.length === 0 || angular.isObject(array[0])) {
            return array;
        }

        var newArray = [];
        array.forEach(function(item) {
            var obj = {};
            obj[key] = item;
            newArray.push(obj);
        });
        return newArray;
    };

    self.findInObjectArray = function(array, obj, key, comparer,options) {
        var item = null;
        comparer = comparer || self.defaultComparer;

        array.some(function(element) {
            if (comparer(element[key], obj[key],false,options.customErrMsg)) {
                item = element;
                return true;
            }
        });

        return item;
    };

    self.defaultComparer = function(a, b ,dontNotify,customErrMsg) {
        // I'm aware of the internationalization issues regarding toLowerCase()
        // but I couldn't come up with a better solution right now
        var isAMatch = self.safeToString(a).toLowerCase() === self.safeToString(b).toLowerCase();
        if(!dontNotify && isAMatch){
            if(!customErrMsg){
                window.NotificationService.notify('This word "'+ b + '" is already added', 'warning');
            }else if(customErrMsg){
                customErrMsg = customErrMsg.replace(/<word>/gi, b);
                window.NotificationService.notify(customErrMsg, 'warning');
            }
        }
        
        return isAMatch;
    };

    self.safeHighlight = function(str, value) {
        str = self.encodeHTML(str);
        value = self.encodeHTML(value);

        if (!value) {
            return str;
        }

        function escapeRegexChars(str) {
            return str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
        }

        var expression = new RegExp('&[^;]+;|' + escapeRegexChars(value), 'gi');
        return str.replace(expression, function(match) {
            return match.toLowerCase() === value.toLowerCase() ? '<em>' + match + '</em>' : match;
        });
    };

    self.safeToString = function(value) {
        return angular.isUndefined(value) || value == null ? '' : value.toString().trim().replace(/&lt;/g, "<").replace(/&gt;/g, ">");
    };

    self.encodeHTML = function(value) {
        return self.safeToString(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    };

    self.handleUndefinedResult = function(fn, valueIfUndefined) {
        return function() {
            var result = fn.apply(null, arguments);
            return angular.isUndefined(result) ? valueIfUndefined : result;
        };
    };

    self.replaceSpacesWithDashes = function(str) {
        return self.safeToString(str).replace(/\s/g, '-');
    };

    self.isModifierOn = function(event) {
        return event.shiftKey || event.ctrlKey || event.altKey || event.metaKey;
    };

    self.promisifyValue = function(value) {
        value = angular.isUndefined(value) ? true : value;
        return $q[value ? 'when' : 'reject']();
    };

    self.simplePubSub = function() {
        var events = {};
        return {
            on: function(names, handler, first) {
                names.split(' ').forEach(function(name) {
                    if (!events[name]) {
                        events[name] = [];
                    }
                    var method = first ? [].unshift : [].push;
                    method.call(events[name], handler);
                });
                return this;
            },
            trigger: function(name, args) {
                var handlers = events[name] || [];
                handlers.every(function(handler) {
                    return self.handleUndefinedResult(handler, true)(args);
                });
                return this;
            }
        };
    };

    return self;
}]);


/* HTML templates */
tagsInput.run(["$templateCache", function($templateCache) {
    $templateCache.put('ngTagsInput/tags-input.html',
    "<div class=\"host\" tabindex=\"-1\"  ng-click=\"eventHandlers.host.click($event)\" ti-transclude-append><div class=\"tags\" ng-class=\"{focused: hasFocus}\"><span class=\"count\" ng-show=\"options.countTag\" ng-bind=\"count\" ng-click=\"eventHandlers.host.click($event)\"></span><ul class=\"tag-list\"><li class=\"tag-item {{tag.hideRemove ? 'defaulttag' : 'manualtag'}}\" ng-repeat=\"tag in tagList.items track by $index\" ng-class=\"getTagClass(tag, $index);\" ng-click=\"!tag.hideRemove && eventHandlers.tag.click(tag)\" ng-dblclick=\"eventHandlers.tag.dblclick(tag)\"><ti-tag-item scope=\"templateScope\" collapse-value=\"defaultCollapseValue\"  data=\"tag\" ng-hide=\"tag.editable\"></ti-tag-item><input class=\"input\" maxlength=\"2048\" autocomplete=\"off\" ng-model=\"editingTag.text\" ng-model-options=\"{getterSetter: true}\" ng-click=\"$event.stopPropagation();\" ng-if=\"tag.editable\" ng-keydown=\"eventHandlers.input.keydown($event,$index,tag)\" ng-focus=\"eventHandlers.input.focus($event)\" ng-blur=\"eventHandlers.input.editBlur($event,tag)\" ng-paste=\"eventHandlers.input.paste($event)\" ng-disabled=\"disabled\" ti-selectall=\"true\" ti-autosize=\"\"><img class=\"top-flag\"ng-src=\"{{getImage(tag)}}\" ng-if=\"tag.tagUsage === 'organizer' || tag.tagUsage === 'mandatory'\"></li></ul><input class=\"input\" autocomplete=\"off\" ng-model=\"newTag.text\" ng-model-options=\"{getterSetter: true}\" ng-keydown=\"eventHandlers.input.keydown($event)\" ng-focus=\"eventHandlers.input.focus($event)\" ng-blur=\"eventHandlers.input.blur($event)\" ng-paste=\"eventHandlers.input.paste($event)\" ng-trim=\"false\" ng-class=\"{'invalid-tag': newTag.invalid}\" ng-disabled=\"disabled\" ti-bind-attrs=\"{type: options.type, placeholder: options.placeholder, tabindex: options.tabindex, spellcheck: options.spellcheck}\" ti-autosize></div></div>"
  );

  $templateCache.put('ngTagsInput/tag-item.html',
    "<span class=\"text-truncate-type-long-text\" title=\"{{$getDisplayText()}}\" ng-bind=\"$getDisplayText()\" ng-attr-title=\"{{$getTagTitle()}}\" ng-class=\"$addTagClass()\"></span> <i  ng-hide=\"$hideRemoveIcon()\" class=\"remove-button btx-close\" ng-click=\"$removeTag($event)\" ng-init=\"$addTagItem()\" ></i>"
  );

  //  $templateCache.put('ngTagsInput/tag-count.html',
  //   "<span ng-bind=\"$getTagCount()\" class=\"count\"></span>"
  // );


  $templateCache.put('ngTagsInput/auto-complete.html',
    "<div class=\"autocomplete\"  ng-style=\"{left:suggestionList.leftOffset}\" ng-if=\"suggestionList.visible\"><ul class=\"suggestion-list\" perfect-scroll><li class=\"suggestion-item\" ng-repeat=\"item in suggestionList.items track by track(item)\" ng-class=\"getSuggestionClass(item, $index)\" ng-click=\"addSuggestionByIndex($index)\" ng-mouseenter=\"suggestionList.select($index)\"><ti-autocomplete-match scope=\"templateScope\" data=\"::item\"></ti-autocomplete-match></li></ul></div>"
  );

  $templateCache.put('ngTagsInput/auto-complete-match.html',
    "<span ng-bind-html=\"$highlight($getDisplayText())\"></span>"
  );
}]);

}());