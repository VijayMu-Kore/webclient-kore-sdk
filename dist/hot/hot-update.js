self["webpackHotUpdatekore_web_sdk"]("esm",{

/***/ "./src/templatemanager/templates/snippetCitationTemplate/snippetCitationTemplate.ts":
/*!******************************************************************************************!*\
  !*** ./src/templatemanager/templates/snippetCitationTemplate/snippetCitationTemplate.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/helpers */ "./src/utils/helpers.js");
/* harmony import */ var _snippetCitationTemplate_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./snippetCitationTemplate.scss */ "./src/templatemanager/templates/snippetCitationTemplate/snippetCitationTemplate.scss");
/* harmony import */ var _templates_feedBackFormTemplate_feedBackFormTemplate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../templates/feedBackFormTemplate/feedBackFormTemplate */ "./src/templatemanager/templates/feedBackFormTemplate/feedBackFormTemplate.ts");



var SnippetCitationTemplate = /** @class */ (function () {
    function SnippetCitationTemplate() {
    }
    SnippetCitationTemplate.prototype.renderMessage = function (msgData) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        var me = this;
        var $ = me.hostInstance.$;
        var helpersObj = _utils_helpers__WEBPACK_IMPORTED_MODULE_1__["default"];
        if (((_d = (_c = (_b = (_a = msgData === null || msgData === void 0 ? void 0 : msgData.message) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.component) === null || _c === void 0 ? void 0 : _c.payload) === null || _d === void 0 ? void 0 : _d.template_type) === "citation_snippet") {
            me.messageHtml = $(SnippetCitationTemplate.prototype.getTemplateString()).tmpl({
                'snippetData': (_h = (_g = (_f = (_e = msgData === null || msgData === void 0 ? void 0 : msgData.message) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.component) === null || _g === void 0 ? void 0 : _g.payload) === null || _h === void 0 ? void 0 : _h.snippetData,
                'helpers': helpersObj.helpers,
                'displayFeedback': (_m = (_l = (_k = (_j = msgData === null || msgData === void 0 ? void 0 : msgData.message) === null || _j === void 0 ? void 0 : _j[0]) === null || _k === void 0 ? void 0 : _k.component) === null || _l === void 0 ? void 0 : _l.payload) === null || _m === void 0 ? void 0 : _m.feedbackDisplay
            });
            me.feedBackTemplateObj = new _templates_feedBackFormTemplate_feedBackFormTemplate__WEBPACK_IMPORTED_MODULE_2__["default"]();
            setTimeout(function () {
                var _a, _b, _c, _d;
                SnippetCitationTemplate.prototype.bindSnippetEvents(me, me.messageHtml, (_d = (_c = (_b = (_a = msgData === null || msgData === void 0 ? void 0 : msgData.message) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.component) === null || _c === void 0 ? void 0 : _c.payload) === null || _d === void 0 ? void 0 : _d.snippetData);
            }, 500);
            return me.messageHtml;
        }
    };
    SnippetCitationTemplate.prototype.getTemplateString = function () {
        var snipppetCitationTemplate = '<script type="text/x-jqury-tmpl">\
        <div class="search-temp-one">\
        <div class="top-header">\
            <div class="top-header-with-img">\
                <span class="logo-span"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/snippet-avathar.svg"/></span>\
                <div class="btn-chip"><span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_Suggested_answer">{{html langTranslator("sa_sdk_Suggested_answer")}}</span>\</div>\
            </div>\
            {{if snippetData && snippetData.snippet_type === "generative_model"}}\
            <div class="btn-link"><span class="bot-bg-purple"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/bot.svg"/></span><span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_answered_by_ai">{{html langTranslator("sa_sdk_answered_by_ai")}}</span>\</div>\
            {{/if}}\
        </div>\
        {{if snippetData && snippetData.title}}\
        <div class="img-temp-title sa-sdk-title" data-title="{{html helpers.convertMDtoHTML(snippetData?.title)}}">{{html helpers.convertMDtoHTML(snippetData?.title)}}</div>\
        {{/if}}\
        <div class="citation-data-desc  {{if snippetData.title==""}}snippet_padding_top_0{{/if}}">\
        {{each(key, data) snippetData.answer}}\
        <span class="snippet-answer-fragment">{{html data.answer_fragment}}</span>{{each(sourceKey, source) data.sources}}<sup class="snippet-citation"><a href="${source.url}" target="_blank">[${source._id}]</a></sup>{{/each}}. </span>\
        {{/each}}\
        </div>\
        <div class="snippet-referene-block">\
          <div class="reference-block-header">References: </div>\
          <ol type="1" class="reference-list-temp-ul">\
                  {{each(key, item) snippetData.reference}}\
                      <li class="reference-list-temp-li" title="{{html helpers.convertMDtoHTML(item.title)}}" ><a  href="${item.url}" target="_blank"><span>{{html helpers.convertMDtoHTML(item.title)}}</span></a></li>\
                      {{/each}}\
                  </ol>\
        </div>\
        {{if snippetData && snippetData.source}}\
        <div class="snippet-source-block">\
          <div class="snippet-source-file-name {{if !snippetData.source}} display-none{{/if}}">{{html snippetData.source}}</div>\
          <a href="${snippetData?.page_url}" target="_blank" ><div class="snippet-source-url {{if !snippetData.page_url}} display-none{{/if}}"><span class="snippet-source-url-name" title="${snippetData?.page_url}">${snippetData?.page_url}</span><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Icons/external-link.svg"/></div></a>\
        </div>\
        {{/if}}\
        <div class="temp-footer-block">\
            <div class="temp-footer {{if snippetData && snippetData.snippet_type !== "generative_model"}} justify-content-end {{/if}}">\
                {{if snippetData && snippetData.snippet_type === "generative_model"}}\
                <div class="btn-link"><span class="bot-bg-purple"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/bot.svg"/></span><span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_answered_by_ai">{{html langTranslator("sa_sdk_answered_by_ai")}}</span>\</div>\
                {{/if}}\
                {{if displayFeedback}}\
                <div class="temp-right">\
                    <div class="is-it-usefull">Is it useful?</div>\
                    <div class="temp-fotter-actions">\
                        <img  class="snippet-feedback  snippet-like-img" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/like-gray.svg" />\
                        <img class="snippet-feedback  snippet-dislike-img" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/dislike-gary.svg" />\
                    </div>\
                </div>\
                <div id="snippet-feedback-template"></div>\
                {{/if}}\
            </div>\
        </div>\
    </div>\
      </script>';
        return snipppetCitationTemplate;
    };
    SnippetCitationTemplate.prototype.bindSnippetEvents = function (me, messageHtml, snippetData) {
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
                SnippetCitationTemplate.prototype.appendFeedBaackData(me, messageHtml, snippetData);
                $(messageHtml).find('.snippet-feedback').removeClass('active');
                $(event.currentTarget).addClass('active');
            }
        });
        SnippetCitationTemplate.prototype.tooltipBindEvent(me);
    };
    SnippetCitationTemplate.prototype.tooltipBindEvent = function (me) {
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
    SnippetCitationTemplate.prototype.appendFeedBaackData = function (me, messageHtml, snippetData) {
        var $ = me.hostInstance.$;
        var feedbackMsgData = {
            message: [{
                    component: {
                        type: 'template',
                        payload: {
                            template_type: "feedbackFormTemplate",
                            query: snippetData.searchQuery,
                            feedBackType: 'smartAnswer'
                        }
                    }
                }]
        };
        $(messageHtml).find('#snippet-feedback-template').empty().append(me.feedBackTemplateObj.renderMessage.bind(me, feedbackMsgData));
    };
    return SnippetCitationTemplate;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SnippetCitationTemplate);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("228fe6e510f029ad8600")
/******/ })();
/******/ 
/******/ }
)
//# sourceMappingURL=hot-update.js.map