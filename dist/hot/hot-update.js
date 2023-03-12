self["webpackHotUpdatekore_web_sdk"]("esm",{

/***/ "./src/templatemanager/templates/snippetParagraphTemplate/snippetParagraphTemplate.ts":
/*!********************************************************************************************!*\
  !*** ./src/templatemanager/templates/snippetParagraphTemplate/snippetParagraphTemplate.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/helpers */ "./src/utils/helpers.js");
/* harmony import */ var _snippetParagraphTemplate_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./snippetParagraphTemplate.scss */ "./src/templatemanager/templates/snippetParagraphTemplate/snippetParagraphTemplate.scss");
/* harmony import */ var _templates_feedBackFormTemplate_feedBackFormTemplate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../templates/feedBackFormTemplate/feedBackFormTemplate */ "./src/templatemanager/templates/feedBackFormTemplate/feedBackFormTemplate.ts");



var SnippetParagraphTemplate = /** @class */ (function () {
    function SnippetParagraphTemplate() {
    }
    SnippetParagraphTemplate.prototype.renderMessage = function (msgData) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        var me = this;
        var $ = me.hostInstance.$;
        var helpersObj = _utils_helpers__WEBPACK_IMPORTED_MODULE_1__["default"];
        if (((_d = (_c = (_b = (_a = msgData === null || msgData === void 0 ? void 0 : msgData.message) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.component) === null || _c === void 0 ? void 0 : _c.payload) === null || _d === void 0 ? void 0 : _d.template_type) === "paragraph_snippet" || ((_h = (_g = (_f = (_e = msgData === null || msgData === void 0 ? void 0 : msgData.message) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.component) === null || _g === void 0 ? void 0 : _g.payload) === null || _h === void 0 ? void 0 : _h.template_type) === "answer_snippet") {
            me.messageHtml = $(SnippetParagraphTemplate.prototype.getTemplateString(me)).tmpl({
                'snippetData': (_m = (_l = (_k = (_j = msgData === null || msgData === void 0 ? void 0 : msgData.message) === null || _j === void 0 ? void 0 : _j[0]) === null || _k === void 0 ? void 0 : _k.component) === null || _l === void 0 ? void 0 : _l.payload) === null || _m === void 0 ? void 0 : _m.snippetData,
                'helpers': helpersObj.helpers,
                'displayFeedback': (_r = (_q = (_p = (_o = msgData === null || msgData === void 0 ? void 0 : msgData.message) === null || _o === void 0 ? void 0 : _o[0]) === null || _p === void 0 ? void 0 : _p.component) === null || _q === void 0 ? void 0 : _q.payload) === null || _r === void 0 ? void 0 : _r.feedbackDisplay
            });
            me.feedBackTemplateObj = new _templates_feedBackFormTemplate_feedBackFormTemplate__WEBPACK_IMPORTED_MODULE_2__["default"]();
            setTimeout(function () {
                var _a, _b, _c, _d;
                SnippetParagraphTemplate.prototype.bindSnippetEvents(me, me.messageHtml, (_d = (_c = (_b = (_a = msgData === null || msgData === void 0 ? void 0 : msgData.message) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.component) === null || _c === void 0 ? void 0 : _c.payload) === null || _d === void 0 ? void 0 : _d.snippetData);
            }, 500);
            return me.messageHtml;
        }
    };
    SnippetParagraphTemplate.prototype.getTemplateString = function (me) {
        var $ = me.hostInstance.$;
        var snipppetParagaraphTemplate = '<script type="text/x-jqury-tmpl">\
      <div class="search-temp-one">\
      <div class="top-header">\
          <div class="top-header-with-img">\
              <span class="logo-span"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/snippet-avathar.svg"/></span>\
              <div class="btn-chip">SUGGESTED ANSWER</div>\
          </div>\
          {{if snippetData && snippetData.source === "Answered by AI"}}\
          <div class="btn-link"><span class="bot-bg-purple"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/bot.svg"/></span>ANSWERED BY AI</div>\
          {{/if}}\
      </div>\
      {{if snippetData && snippetData.title}}<div class="paragraph-temp-header sa-sdk-title" data-title="${snippetData?.title}">{{html helpers.convertMDtoHTML(snippetData?.title)}}</div>{{/if}}\
      <div class="temp-data-desc">\
      {{html snippetData?.answer}}\
      </div>\
      <div class="temp-read-link">\
      <span class="desc-read-more">Read more</span> <span class="desc-read-less">Show Less</span>\
      </div>\
      {{if snippetData && snippetData.source !== "Answered by AI"}}\
      <div class="snippet-source-block">\
        <div class="snippet-source-file-name {{if !snippetData.source}} display-none{{/if}}">{{html snippetData.source}}</div>\
        <a href="${snippetData?.page_url}" target="_blank" target="_blank"><div class="snippet-source-url {{if !snippetData.page_url}} display-none{{/if}}"><span class="snippet-source-url-name sa-sdk-title" data-title="${snippetData?.page_url}">${snippetData?.page_url}</span><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Icons/external-link.svg"/></div></a>\
      </div>\
      {{/if}}\
      <div class="temp-footer-block">\
          <div class="temp-footer {{if snippetData && snippetData.source !== "Answered by AI"}} justify-content-end {{/if}}">\
              {{if snippetData && snippetData.source === "Answered by AI"}}\
              <div class="btn-link"><span class="bot-bg-purple"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/bot.svg"/></span>ANSWERED BY AI</div>\
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
        var koreSnippetParagaraphTemplate = '<script type="text/x-jqury-tmpl">\
     <div class="search-temp-one-top-tile">\
     <div class="search-temp-one-top-tile-block top-search-template">\
         <div class="top-header">\
             {{if snippetData && snippetData.title}}<div class="top-header-txt">SmartAssist</div>{{/if}}\
          </div>\
          <!-- <div class="top-sub-header">AI-Powered, Omnichannel, Call Routing Solution</div>\ -->\
          <div class="temp-data-desc">\
             {{html snippetData?.answer}}\
          </div>\
          <div class="temp-footer-block">\
              <div class="temp-footer">\
                  <div class="btn-link" {{if !snippetData.source}} display-none{{/if}}" title="{{html snippetData.source}}">\
                     {{html snippetData.source}}\
                  </div>\
                  <div class="temp-right">\
                      <div class="is-it-usefull">Go to Page</div>\
                      <div class="temp-fotter-actions">\
                      <a class="snippet-go-to" href="${snippetData?.page_url}"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/kore_website_images/goto-page.svg" />\</a>\
                      </div>\
                  </div>\
              </div>\
          </div>\
     </div>\
     <div class="sa-right-magnifier">\
     <img class="magnifier-img" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/kore_website_images/sa-search-magnifier.svg" />\
     </div>\
    </div>\
      </script>';
        if ($("body").hasClass("kore-sdk-body")) {
            return koreSnippetParagaraphTemplate;
        }
        else {
            return snipppetParagaraphTemplate;
        }
    };
    SnippetParagraphTemplate.prototype.bindSnippetEvents = function (me, messageHtml, snippetData) {
        var $ = me.hostInstance.$;
        var hostInstance = me.hostInstance;
        $(messageHtml).find('.temp-fotter-actions').off('click', '.snippet-like-img').on('click', '.snippet-like-img', function (event) {
            if (!$(event.currentTarget).closest('.snippet-like-img').hasClass('active')) {
                hostInstance.updateFeedBackResult('thumbsUp', snippetData.searchQuery, 'smartAnswer');
                $(messageHtml).find('.snippet-feedback').removeClass('active');
                $(event.currentTarget).addClass('active');
            }
        });
        $(messageHtml).find('.temp-right').off('click', '.snippet-go-to').on('click', '.snippet-go-to', function (event) {
            SnippetParagraphTemplate.prototype.snippetgoToPage(snippetData);
        });
        $(messageHtml).find('.temp-fotter-actions').off('click', '.snippet-dislike-img').on('click', '.snippet-dislike-img', function (event) {
            if (!$(event.currentTarget).closest('.snippet-dislike-img').hasClass('active')) {
                SnippetParagraphTemplate.prototype.appendFeedBaackData(me, messageHtml, snippetData);
                $(messageHtml).find('.snippet-feedback').removeClass('active');
                $(event.currentTarget).addClass('active');
            }
        });
        if (messageHtml && $(messageHtml).find('.temp-data-desc').length) {
            setTimeout(function () {
                if ($(messageHtml).find('.temp-data-desc').length && $(messageHtml).find('.temp-data-desc')[0].scrollHeight > 160) {
                    $(messageHtml).find('.desc-read-more').show();
                    $(messageHtml).find('.desc-read-less').hide();
                }
                else {
                    $(messageHtml).find('.desc-read-more').hide();
                    $(messageHtml).find('.desc-read-less').hide();
                }
                $(messageHtml).off('click', '.desc-read-more').on('click', '.desc-read-more', function (event) {
                    $(event.currentTarget).parent().parent().find('.temp-data-desc').css('-webkit-line-clamp', 'initial');
                    $(event.currentTarget).hide();
                    $(event.currentTarget).parent().find('.desc-read-less').show();
                });
                $(messageHtml).off('click', '.desc-read-less').on('click', '.desc-read-less', function (event) {
                    $(event.currentTarget).parent().parent().find('.temp-data-desc').css('-webkit-line-clamp', '8');
                    $(event.currentTarget).parent().find('.desc-read-more').show();
                    $(event.currentTarget).hide();
                });
            }, 300);
        }
        SnippetParagraphTemplate.prototype.tooltipBindEvent(me);
    };
    SnippetParagraphTemplate.prototype.appendFeedBaackData = function (me, messageHtml, snippetData) {
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
    SnippetParagraphTemplate.prototype.tooltipBindEvent = function (me) {
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
    SnippetParagraphTemplate.prototype.snippetgoToPage = function (snippetData) {
        // window.location.href+"/search/query="+snippetData.searchQuery
        window.localStorage.setItem("query", snippetData.searchQuery);
        window.localStorage.setItem("searchLocation", window.location.href);
    };
    return SnippetParagraphTemplate;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SnippetParagraphTemplate);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("6f17ab19db82833d866e")
/******/ })();
/******/ 
/******/ }
)
//# sourceMappingURL=hot-update.js.map