self["webpackHotUpdatekore_web_sdk"]("esm",{

/***/ "./src/templatemanager/templates/listTemplate/listTemplate.ts":
/*!********************************************************************!*\
  !*** ./src/templatemanager/templates/listTemplate/listTemplate.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/helpers */ "./src/utils/helpers.js");
/* harmony import */ var _listTemplate_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./listTemplate.scss */ "./src/templatemanager/templates/listTemplate/listTemplate.scss");


var ListTemplate = /** @class */ (function () {
    function ListTemplate() {
    }
    ListTemplate.prototype.renderMessage = function (msgData) {
        var _a, _b, _c, _d;
        var me = this;
        var $ = me.hostInstance.$;
        var helpersObj = _utils_helpers__WEBPACK_IMPORTED_MODULE_1__["default"];
        if (((_d = (_c = (_b = (_a = msgData === null || msgData === void 0 ? void 0 : msgData.message) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.component) === null || _c === void 0 ? void 0 : _c.payload) === null || _d === void 0 ? void 0 : _d.template_type) === "list") {
            me.messageHtml = $(me.getTemplateString()).tmpl({
                'msgData': msgData,
                'helpers': helpersObj.helpers
            });
            me.bindEvents(me.messageHtml);
            return me.messageHtml;
        }
    };
    ListTemplate.prototype.bindEvents = function (messageHtml) {
        var me = this;
        var chatWindowInstance = me.hostInstance;
        var $ = me.hostInstance.$;
        $(messageHtml).off('click', '.listTmplContentChild .buyBtn,.viewMoreList .viewMore,.listItemPath,.listRightContent').on('click', '.listTmplContentChild .buyBtn,.viewMoreList .viewMore,.listItemPath,.listRightContent', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var selectedTarget = e.currentTarget;
            var type = $(selectedTarget).attr('type');
            if (type) {
                type = type.toLowerCase();
            }
            if (type == 'postback' || type == 'text') {
                //chatWindowInstance.assignValueToInput($(selectedTarget).attr('actual-value') || $(selectedTarget).attr('value'));
                // var _innerText = $(this)[0].innerText.trim() || $(this).attr('data-value').trim();
                var _innerText = ($(selectedTarget)[0] && $(selectedTarget)[0].innerText) ? $(selectedTarget)[0].innerText.trim() :  false || ($(selectedTarget) && $(selectedTarget).attr('data-value')) ? $(selectedTarget).attr('data-value').trim() : '';
                chatWindowInstance.sendMessage($(selectedTarget).attr('actual-value') || $(selectedTarget).attr('value'), { renderMsg: _innerText });
            }
            else if (type == 'url' || type == 'web_url') {
                if ($(selectedTarget).attr('msgData') !== undefined) {
                    var msgData = void 0;
                    try {
                        msgData = JSON.parse($(selectedTarget).attr('msgData'));
                    }
                    catch (err) {
                        console.log(err);
                    }
                    if (msgData && msgData.message && msgData.message[0].component && (msgData.message[0].component.formData || (msgData.message[0].component.payload && msgData.message[0].component.payload.formData))) {
                        if (msgData.message[0].component.formData) {
                            msgData.message[0].component.payload.formData = msgData.message[0].component.formData;
                        }
                        chatWindowInstance.renderWebForm(msgData);
                        return;
                    }
                }
                var a_link = $(selectedTarget).attr('url');
                if (a_link.indexOf('http:') < 0 && a_link.indexOf('https:') < 0) {
                    a_link = "http:////" + a_link;
                }
                chatWindowInstance.openExternalLink(a_link);
            }
            if (e.currentTarget.classList && e.currentTarget.classList.length > 0 && e.currentTarget.classList[1] === 'likeDiv') {
                $('.likeImg').addClass('hide');
                $('.likedImg').removeClass('hide');
                $('.likeDislikeDiv').addClass('dummy');
            }
            if (e.currentTarget.classList && e.currentTarget.classList.length > 0 && e.currentTarget.classList[1] === 'disLikeDiv') {
                $('.disLikeImg').addClass('hide');
                $('.disLikedImg').removeClass('hide');
                $('.likeDislikeDiv').addClass('dummy');
            }
            if (e.currentTarget.classList && e.currentTarget.classList.length > 0 && e.currentTarget.classList[0] === 'checkboxBtn') {
                var checkboxSelection = $(e.currentTarget.parentElement.parentElement).find('.checkInput:checked');
                var selectedValue = [];
                var toShowText = [];
                for (var i = 0; i < checkboxSelection.length; i++) {
                    selectedValue.push($(checkboxSelection[i]).attr('value'));
                    toShowText.push($(checkboxSelection[i]).attr('text'));
                }
                //chatWindowInstance.assignValueToInput(`${$(selectedTarget).attr('title')}: ${selectedValue.toString()}`);
                chatWindowInstance.sendMessage($(selectedTarget).attr('title') + ": " + selectedValue.toString(), { renderMsg: toShowText.toString() });
            }
            if (e.currentTarget.classList && e.currentTarget.classList.length > 0 && e.currentTarget.classList[0] === 'quickReply') {
                var _parentQuikReplyEle_1 = e.currentTarget.parentElement.parentElement;
                var _leftIcon_1 = _parentQuikReplyEle_1.parentElement.parentElement.querySelectorAll('.quickreplyLeftIcon');
                var _rightIcon_1 = _parentQuikReplyEle_1.parentElement.parentElement.querySelectorAll('.quickreplyRightIcon');
                setTimeout(function () {
                    var _a;
                    if ((_a = _parentQuikReplyEle_1.parentElement.parentElement.getElementsByClassName('user-account')) === null || _a === void 0 ? void 0 : _a.length) {
                        _parentQuikReplyEle_1.parentElement.parentElement.getElementsByClassName('user-account')[0].classList.remove('marginT50');
                    }
                    _parentQuikReplyEle_1.parentElement.parentElement.removeChild(_leftIcon_1[0]);
                    _parentQuikReplyEle_1.parentElement.parentElement.removeChild(_rightIcon_1[0]);
                    _parentQuikReplyEle_1.parentElement.removeChild(_parentQuikReplyEle_1);
                }, 50);
            }
            chatWindowInstance.focusInputTextbox();
            // setTimeout(() => {
            //     const _chatInput = _chatContainer.find('.kore-chat-footer .chatInputBox');
            //     _chatInput.focus();
            // }, 600);
        });
    };
    ListTemplate.prototype.getTemplateString = function () {
        var listTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
     {{if msgData.message}} \
         <li data-time="${msgData.createdOnTimemillis}" id="${msgData.messageId || msgItem.clientMessageId}"\
             class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon"> \
             <div class="listTmplContent"> \
                 {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                 {{if msgData.icon}}<div aria-live="off" class="profile-photo"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
                 <ul class="listTmplContentBox"> \
                     {{if msgData.message[0].component.payload.text || msgData.message[0].component.payload.heading}} \
                         <li class="listTmplContentHeading"> \
                             {{if msgData.type === "bot_response" && msgData.message[0].component.payload.heading}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.heading, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "user")}} {{/if}} \
                             {{if msgData.message[0].cInfo && msgData.message[0].cInfo.emoji}} \
                                 <span class="emojione emojione-${msgData.message[0].cInfo.emoji[0].code}">${msgData.message[0].cInfo.emoji[0].title}</span> \
                             {{/if}} \
                         </li> \
                     {{/if}} \
                     {{each(key, msgItem) msgData.message[0].component.payload.elements}} \
                         {{if msgData.message[0].component.payload.buttons}} \
                             {{if key<= 2 }}\
                                 <li class="listTmplContentChild"> \
                                     {{if msgItem.image_url}} \
                                         <div class="listRightContent" {{if msgItem.default_action && msgItem.default_action.url}}url="${msgItem.default_action.url}"{{/if}} {{if msgItem.default_action && msgItem.default_action.title}}data-value="${msgItem.default_action.title}"{{/if}} {{if msgItem.default_action && msgItem.default_action.type}}type="${msgItem.default_action.type}"{{/if}} {{if msgItem.default_action && msgItem.default_action.payload}} value="${msgItem.default_action.payload}"{{/if}}> \
                                             <img alt="image" src="${msgItem.image_url}" onerror="this.onerror=null;this.src=\'../libs/img/no_image.png\';"/> \
                                         </div> \
                                     {{/if}} \
                                     <div class="listLeftContent"> \
                                         <div class="listItemTitle">{{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgItem.title, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgItem.title, "user")}} {{/if}}</div> \
                                         {{if msgItem.subtitle}}<div class="listItemSubtitle">{{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgItem.subtitle, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgItem.subtitle, "user")}} {{/if}}</div>{{/if}} \
                                         {{if msgItem.default_action && msgItem.default_action.url}}<div class="listItemPath" type="url" url="${msgItem.default_action.url}">${msgItem.default_action.url}</div>{{/if}} \
                                         {{if msgItem.buttons}}\
                                         <div> \
                                             <span class="buyBtn" {{if msgItem.buttons[0].type}}type="${msgItem.buttons[0].type}"{{/if}} {{if msgItem.buttons[0].url}}url="${msgItem.buttons[0].url}"{{/if}} {{if msgItem.buttons[0].payload}}value="${msgItem.buttons[0].payload}"{{/if}}>{{if msgItem.buttons[0].title}}${msgItem.buttons[0].title}{{else}}Buy{{/if}}</span> \
                                         </div> \
                                         {{/if}}\
                                     </div>\
                                 </li> \
                             {{/if}}\
                         {{else}} \
                             <li class="listTmplContentChild"> \
                                 {{if msgItem.image_url}} \
                                     <div class="listRightContent" {{if msgItem.default_action && msgItem.default_action.url}}url="${msgItem.default_action.url}"{{/if}} {{if msgItem.default_action && msgItem.default_action.title}}data-value="${msgItem.default_action.title}"{{/if}} {{if msgItem.default_action && msgItem.default_action.type}}type="${msgItem.default_action.type}"{{/if}} {{if msgItem.default_action && msgItem.default_action.payload}} value="${msgItem.default_action.payload}"{{/if}}> \
                                         <img alt="image" src="${msgItem.image_url}" onerror="this.onerror=null;this.src=\'../libs/img/no_image.png\';" /> \
                                     </div> \
                                 {{/if}} \
                                 <div class="listLeftContent"> \
                                     <div class="listItemTitle">{{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgItem.title, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgItem.title, "user")}} {{/if}}</div> \
                                     {{if msgItem.subtitle}}<div class="listItemSubtitle">{{if msgData.type === "bot_response"}} {{html helpers.convertMDtoHTML(msgItem.subtitle, "bot")}} {{else}} {{html helpers.convertMDtoHTML(msgItem.subtitle, "user")}} {{/if}}</div>{{/if}} \
                                     {{if msgItem.default_action && msgItem.default_action.url}}<div class="listItemPath" type="url" url="${msgItem.default_action.url}">${msgItem.default_action.url}</div>{{/if}} \
                                     {{if msgItem.buttons}}\
                                     <div> \
                                         <span class="buyBtn" {{if msgItem.buttons[0].type}}type="${msgItem.buttons[0].type}"{{/if}} {{if msgItem.buttons[0].url}}url="${msgItem.buttons[0].url}"{{/if}} {{if msgItem.buttons[0].payload}}value="${msgItem.buttons[0].payload}"{{/if}}>{{if msgItem.buttons[0].title}}${msgItem.buttons[0].title}{{else}}Buy{{/if}}</span> \
                                     </div> \
                                     {{/if}}\
                                 </div>\
                             </li> \
                         {{/if}} \
                     {{/each}} \
                     </li> \
                     {{if msgData.message[0].component.AlwaysShowGlobalButtons || (msgData.message[0].component.payload.elements.length > 3 && msgData.message[0].component.payload.buttons)}}\
                     <li class="viewMoreList"> \
                         <span class="viewMore" url="{{if msgData.message[0].component.payload.buttons[0].url}}${msgData.message[0].component.payload.buttons[0].url}{{/if}}" type="${msgData.message[0].component.payload.buttons[0].type}" value="{{if msgData.message[0].component.payload.buttons[0].payload}}${msgData.message[0].component.payload.buttons[0].payload}{{else}}${msgData.message[0].component.payload.buttons[0].title}{{/if}}">${msgData.message[0].component.payload.buttons[0].title}</span> \
                     </li> \
                     {{/if}}\
                 </ul> \
             </div> \
         </li> \
     {{/if}} \
 </scipt>';
        return listTemplate;
    };
    return ListTemplate;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ListTemplate);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("833e621cf647b7ac0c70")
/******/ })();
/******/ 
/******/ }
)
//# sourceMappingURL=hot-update.js.map