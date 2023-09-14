self["webpackHotUpdatekore_web_sdk"]("esm",{

/***/ "./src/templatemanager/templates/snippetListTemplate/snippetListTemplate.ts":
/*!**********************************************************************************!*\
  !*** ./src/templatemanager/templates/snippetListTemplate/snippetListTemplate.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/helpers */ "./src/utils/helpers.js");
/* harmony import */ var _snippetListTemplate_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./snippetListTemplate.scss */ "./src/templatemanager/templates/snippetListTemplate/snippetListTemplate.scss");
/* harmony import */ var _templates_feedBackFormTemplate_feedBackFormTemplate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../templates/feedBackFormTemplate/feedBackFormTemplate */ "./src/templatemanager/templates/feedBackFormTemplate/feedBackFormTemplate.ts");



var SnippetListTemplate = /** @class */ (function () {
    function SnippetListTemplate() {
    }
    SnippetListTemplate.prototype.renderMessage = function (msgData) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
        var me = this;
        var $ = me.hostInstance.$;
        var helpersObj = _utils_helpers__WEBPACK_IMPORTED_MODULE_1__["default"];
        if (((_d = (_c = (_b = (_a = msgData === null || msgData === void 0 ? void 0 : msgData.message) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.component) === null || _c === void 0 ? void 0 : _c.payload) === null || _d === void 0 ? void 0 : _d.template_type) === "list_element_snippet" || ((_h = (_g = (_f = (_e = msgData === null || msgData === void 0 ? void 0 : msgData.message) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.component) === null || _g === void 0 ? void 0 : _g.payload) === null || _h === void 0 ? void 0 : _h.template_type) === "headings_snippet") {
            me.messageHtml = $(SnippetListTemplate.prototype.getTemplateString()).tmpl({
                'snippetData': (_m = (_l = (_k = (_j = msgData === null || msgData === void 0 ? void 0 : msgData.message) === null || _j === void 0 ? void 0 : _j[0]) === null || _k === void 0 ? void 0 : _k.component) === null || _l === void 0 ? void 0 : _l.payload) === null || _m === void 0 ? void 0 : _m.snippetData,
                'helpers': helpersObj.helpers,
                'displayFeedback': (_r = (_q = (_p = (_o = msgData === null || msgData === void 0 ? void 0 : msgData.message) === null || _o === void 0 ? void 0 : _o[0]) === null || _p === void 0 ? void 0 : _p.component) === null || _q === void 0 ? void 0 : _q.payload) === null || _r === void 0 ? void 0 : _r.feedbackDisplay,
                langTranslator: (_v = (_u = (_t = (_s = msgData === null || msgData === void 0 ? void 0 : msgData.message) === null || _s === void 0 ? void 0 : _s[0]) === null || _t === void 0 ? void 0 : _t.component) === null || _u === void 0 ? void 0 : _u.payload) === null || _v === void 0 ? void 0 : _v.langTranslator
            });
            me.feedBackTemplateObj = new _templates_feedBackFormTemplate_feedBackFormTemplate__WEBPACK_IMPORTED_MODULE_2__["default"]();
            setTimeout(function () {
                var _a, _b, _c, _d;
                SnippetListTemplate.prototype.bindSnippetEvents(me, me.messageHtml, (_d = (_c = (_b = (_a = msgData === null || msgData === void 0 ? void 0 : msgData.message) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.component) === null || _c === void 0 ? void 0 : _c.payload) === null || _d === void 0 ? void 0 : _d.snippetData, msgData);
            }, 500);
            return me.messageHtml;
        }
    };
    SnippetListTemplate.prototype.getTemplateString = function () {
        var snippetListTemplate = '<script type="text/x-jqury-tmpl">\
        <div class="search-temp-one list-snippet-temp">\
        <div class="top-header">\
            <div class="top-header-with-img">\
                <span class="logo-span"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/snippet-avathar.svg"/></span>\
                <div class="btn-chip sdk-i18n-lang" sdk-i18n-key="sa_sdk_Suggested_answer">{{html langTranslator("sa_sdk_Suggested_answer")}}</div>\
                </div>\
            {{if snippetData && snippetData.source === "Answered by AI"}}\
            <div class="btn-link"><span class="bot-bg-purple"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/bot.svg"/></span><span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_answered_by_ai">{{html langTranslator("sa_sdk_answered_by_ai")}}</span>\</div>\
            {{/if}}\
        </div>\
        <div class="list-temp-block">\
            <div class="list-temp-header sa-sdk-title" data-title="${snippetData?.title}">{{html helpers.convertMDtoHTML(snippetData?.title)}}</div>\
                <ol type="1" class="list-temp-ul">\
                {{each(key, answer) snippetData.answer}}\
                    <li class="list-temp-li">{{html answer}}</li>\
                    {{/each}}\
                </ol>\
                {{if snippetData.answer.length > 4}}\
                <span class="desc-read-more display-block"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/show-more.svg" />Read more</span> <span class="desc-read-less  display-none"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/show-more.svg" />Show Less</span>\
                {{/if}}\
        </div>\
        {{if snippetData && snippetData.source}}\
          <div class="snippet-source-block">\
            <div class="snippet-source-file-name sa-sdk-title  {{if !snippetData.source}} display-none {{/if}}" data-title="${snippetData?.source}">{{html snippetData?.source}}</div>\
            <a href="${snippetData?.page_url}" target="_blank" target="_blank"><div class="snippet-source-url {{if !snippetData.page_url}} display-none {{/if}}"><span class="snippet-source-url-name">${snippetData?.page_url}</span><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Icons/external-link.svg"/> </div></a>\
          </div>\
        {{/if}}\
        <div class="temp-footer-block">\
            <div class="temp-footer {{if snippetData && snippetData.snippet_type !== "generative_model"}} justify-content-end {{/if}}">\
                {{if snippetData && snippetData.snippet_type === "generative_model"}}\
                <div class="btn-link"><span class="bot-bg-purple"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/bot.svg"/></span><span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_answered_by_ai">{{html langTranslator("sa_sdk_answered_by_ai")}}</span>\</div>\
                {{/if}}\
                {{if displayFeedback}}\
                <div class="temp-right">\
                <div class="is-it-usefull sdk-i18n-lang"  sdk-i18n-key="sa_sdk_is_useful">{{html langTranslator("sa_sdk_is_useful")}}</div>\                    <div class="temp-fotter-actions">\
                        <img  class="snippet-feedback  snippet-like-img" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/like-gray.svg" />\
                        <img  class="snippet-feedback  snippet-dislike-img" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/dislike-gary.svg" />\
                    </div>\
                </div>\
                <div id="snippet-feedback-template"></div>\
                {{/if}}\
            </div>\
        </div>\
    </div>\
          </script>';
        return snippetListTemplate;
    };
    SnippetListTemplate.prototype.bindSnippetEvents = function (me, messageHtml, snippetData, msgData) {
        var $ = me.hostInstance.$;
        var hostInstance = me.hostInstance;
        $(messageHtml).find('.temp-fotter-actions').off('click', '.snippet-like-img').on('click', '.snippet-like-img', function (event) {
            if (!$(event.currentTarget).closest('.snippet-like-img').hasClass('active')) {
                hostInstance.updateFeedBackResult('thumbsUp', snippetData.searchQuery, 'smartAnswer');
                $(messageHtml).find('.snippet-feedback').removeClass('active');
                $(event.currentTarget).addClass('active');
            }
        });
        $(messageHtml).find('.temp-fotter-actions').off('click', '.snippet-dislike-img').on('click', '.snippet-dislike-img', function (event) {
            if (!$(event.currentTarget).closest('.snippet-dislike-img').hasClass('active')) {
                SnippetListTemplate.prototype.appendFeedBaackData(me, messageHtml, snippetData, msgData);
                $(messageHtml).find('.snippet-feedback').removeClass('active');
                $(event.currentTarget).addClass('active');
            }
        });
        if (messageHtml && $(messageHtml).find('.list-temp-ul').length) {
            $(messageHtml).off('click', '.desc-read-more').on('click', '.desc-read-more', function (event) {
                $(messageHtml).find('.list-temp-ul').addClass('show-all-list');
                $(messageHtml).find('.desc-read-more').removeClass('display-block').addClass('display-none');
                $(messageHtml).find('.desc-read-less').removeClass('display-none').addClass('display-block');
            });
            $(messageHtml).off('click', '.desc-read-less').on('click', '.desc-read-less', function (event) {
                $(messageHtml).find('.list-temp-ul').removeClass('show-all-list');
                $(messageHtml).find('.desc-read-less').removeClass('display-block').addClass('display-none');
                $(messageHtml).find('.desc-read-more').removeClass('display-none').addClass('display-block');
            });
        }
        SnippetListTemplate.prototype.tooltipBindEvent(me);
    };
    SnippetListTemplate.prototype.appendFeedBaackData = function (me, messageHtml, snippetData, msgData) {
        var _a, _b, _c, _d;
        var $ = me.hostInstance.$;
        var feedbackMsgData = {
            message: [{
                    component: {
                        type: 'template',
                        payload: {
                            template_type: "feedbackFormTemplate",
                            query: snippetData.searchQuery,
                            feedBackType: 'smartAnswer',
                            langTranslator: (_d = (_c = (_b = (_a = msgData === null || msgData === void 0 ? void 0 : msgData.message) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.component) === null || _c === void 0 ? void 0 : _c.payload) === null || _d === void 0 ? void 0 : _d.langTranslator
                        }
                    }
                }]
        };
        $(messageHtml).find('#snippet-feedback-template').empty().append(me.feedBackTemplateObj.renderMessage.bind(me, feedbackMsgData));
    };
    SnippetListTemplate.prototype.tooltipBindEvent = function (me) {
        var $ = me.hostInstance.$;
        $('.sa-sdk-title').off('mouseover').on('mouseover', function (e) {
            e.stopPropagation();
            e.stopImmediatePropagation();
            $(e.currentTarget).before('<div class="sdk-tooltip-container">' + $(e.currentTarget).attr('data-title') + '<span class="sa-tooltip-arrow"></span></div>');
            $(e.currentTarget).parent().find('.sdk-tooltip-container').css('top', ($(e.currentTarget).position().top - ($(e.currentTarget).parent().find('.sdk-tooltip-container').height() + 25)) + 'px');
        });
        $('.sa-sdk-title').off('mouseout').on('mouseout', function (e) {
            e.stopPropagation();
            e.stopImmediatePropagation();
            $(e.currentTarget).parent().find('.sdk-tooltip-container').remove();
        });
    };
    return SnippetListTemplate;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SnippetListTemplate);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("46ded0e853b272c319bc")
/******/ })();
/******/ 
/******/ }
)
//# sourceMappingURL=hot-update.js.map