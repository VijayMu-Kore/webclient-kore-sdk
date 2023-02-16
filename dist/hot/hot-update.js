self["webpackHotUpdatekore_web_sdk"]("esm",{

/***/ "./src/templatemanager/templates/finalResultsTemplate/finalResultsTemplate.ts":
/*!************************************************************************************!*\
  !*** ./src/templatemanager/templates/finalResultsTemplate/finalResultsTemplate.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/helpers */ "./src/utils/helpers.js");
/* harmony import */ var _finalResultsTemplate_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./finalResultsTemplate.scss */ "./src/templatemanager/templates/finalResultsTemplate/finalResultsTemplate.scss");
/* harmony import */ var _templateManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../templateManager */ "./src/templatemanager/templateManager.ts");
/* harmony import */ var _templates_searchListViewTemplate_searchListViewTemplate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../templates/searchListViewTemplate/searchListViewTemplate */ "./src/templatemanager/templates/searchListViewTemplate/searchListViewTemplate.ts");
/* harmony import */ var _templates_searchGridViewTemplate_searchGridViewTemplate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../templates/searchGridViewTemplate/searchGridViewTemplate */ "./src/templatemanager/templates/searchGridViewTemplate/searchGridViewTemplate.ts");
/* harmony import */ var _templates_searchCarouselViewTemplate_searchCarouselViewTemplate__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../templates/searchCarouselViewTemplate/searchCarouselViewTemplate */ "./src/templatemanager/templates/searchCarouselViewTemplate/searchCarouselViewTemplate.ts");
/* harmony import */ var _templates_fullsearchResultsTemplate_fullsearchResultsTemplate__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../templates/fullsearchResultsTemplate/fullsearchResultsTemplate */ "./src/templatemanager/templates/fullsearchResultsTemplate/fullsearchResultsTemplate.ts");
/* harmony import */ var _libs_korejquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../libs/korejquery */ "./src/libs/korejquery.js");








var $ = _libs_korejquery__WEBPACK_IMPORTED_MODULE_1__["default"];
var FinalResultsTemplate = /** @class */ (function () {
    function FinalResultsTemplate() {
        this.$ = $;
    }
    FinalResultsTemplate.prototype.renderMessage = function (msgData) {
        var _a, _b;
        var me = this;
        var $ = me.hostInstance.$;
        me.helpersObj = _utils_helpers__WEBPACK_IMPORTED_MODULE_2__["default"] === null || _utils_helpers__WEBPACK_IMPORTED_MODULE_2__["default"] === void 0 ? void 0 : _utils_helpers__WEBPACK_IMPORTED_MODULE_2__["default"].helpers;
        if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == 'finalResultsTemplate') {
            if ((_b = (_a = msgData === null || msgData === void 0 ? void 0 : msgData.message[0].component) === null || _a === void 0 ? void 0 : _a.payload) === null || _b === void 0 ? void 0 : _b.helpers) {
                me.helpersObj = msgData.message[0].component.payload.helpers;
            }
            else {
                msgData.message[0].component.payload['helpers'] = me.helpersObj;
            }
            me.messageResultHtml = $(FinalResultsTemplate.prototype.getTemplateString(msgData.message[0].component.payload.template_type)).tmpl(msgData.message[0].component.payload);
            me.customTemplateObj = new _templateManager__WEBPACK_IMPORTED_MODULE_3__["default"](me);
            me.listTemplateObj = new _templates_searchListViewTemplate_searchListViewTemplate__WEBPACK_IMPORTED_MODULE_4__["default"]();
            me.gridTemplateObj = new _templates_searchGridViewTemplate_searchGridViewTemplate__WEBPACK_IMPORTED_MODULE_5__["default"]();
            me.carouselTemplateObj = new _templates_searchCarouselViewTemplate_searchCarouselViewTemplate__WEBPACK_IMPORTED_MODULE_6__["default"]();
            me.fullSearchTemplateObj = new _templates_fullsearchResultsTemplate_fullsearchResultsTemplate__WEBPACK_IMPORTED_MODULE_7__["default"]();
            FinalResultsTemplate.prototype.bindEvents(me, me.messageResultHtml, msgData);
            return me.messageResultHtml;
        }
    };
    FinalResultsTemplate.prototype.bindEvents = function (me, messageHtml, msgData) {
        var _a;
        var hostWindowInstance = me.hostInstance;
        var $ = (_a = me === null || me === void 0 ? void 0 : me.hostInstance) === null || _a === void 0 ? void 0 : _a.$;
        // if(msgData.message[0].component.payload.searchConfigurationCopy){
        //   me.searchConfigurationCopy = msgData.message[0].component.payload.searchConfigurationCopy;
        // }
        me.groupData = msgData.message[0].component.payload.groupData;
        var container = '.search-data-container';
        if (msgData.message[0].component.payload.searchType == 'isSearch') {
            container = '.search-data-container';
        }
        else if (msgData.message[0].component.payload.searchType == 'isLiveSearch') {
            container = '.live-search-data-container';
        }
        if (me.groupData && me.groupData.length) {
            me.groupData.forEach(function (d) {
                var showAllHTML;
                if (d.message[0].component.payload.template_type == 'searchListTemplate') {
                    showAllHTML = me.listTemplateObj.renderMessage.bind(me, d);
                }
                else if (d.message[0].component.payload.template_type == 'searchGridTemplate') {
                    showAllHTML = me.gridTemplateObj.renderMessage.bind(me, d);
                }
                else if (d.message[0].component.payload.template_type == 'searchCarouselTemplate') {
                    showAllHTML = me.carouselTemplateObj.renderMessage.bind(me, d);
                }
                // var showAllHTML = me.customTemplateObj.renderMessage.bind(me.hostInstance,d);
                $(messageHtml).find(container).append(showAllHTML);
            });
        }
        $(messageHtml).off("click", ".show-all-results").on("click", ".show-all-results", function (e) {
            var isSearchSDK = document.body.className.match('sdk-body');
            if (isSearchSDK !== null) {
                hostWindowInstance.seeAllBtnClickEvent(e);
            }
            else {
                var modifyGroupData = msgData.message[0].component.payload.groupData;
                modifyGroupData.forEach(function (d) {
                    d.message[0].component.payload.isSearch = false;
                    d.message[0].component.payload.isFullResults = true;
                    d.message[0].component.payload.isSearchSDK = true;
                    d.message[0].component.payload.maxSearchResultsAllowed = 10;
                });
                var fullSearchMsgData_1 = {
                    message: [{
                            component: {
                                type: 'template',
                                payload: {
                                    template_type: "fullSearchResultsTemplate",
                                    facets: [],
                                    count: msgData.message[0].component.payload.totalSearchResults,
                                    view: "preview",
                                    isDev: msgData.message[0].component.payload.isDev,
                                    isFilterEnabled: false,
                                    devMode: msgData.message[0].component.payload.devMode,
                                    viewType: msgData.message[0].component.payload.viewType,
                                    facetPosition: 'left',
                                    filterFacetData: [],
                                    groupData: modifyGroupData,
                                    displayFeedback: null,
                                    feedbackData: null
                                }
                            }
                        }]
                };
                // let fullSearchHtml = me.fullSearchTemplateObj.renderMessage.bind(me, fullSearchMsgData);
                // setTimeout(fullSearchHtml, 500)
                setTimeout(function () {
                    $('body').find('.full-search-results-container').remove();
                    $('body').append("<div class=\"full-search-results-container\"></div>");
                    $('.full-search-results-container').append(me.fullSearchTemplateObj.renderMessage.bind(me, fullSearchMsgData_1));
                }, 1000);
            }
        });
        $(messageHtml).off("click", ".know-more-snippet").on("click", ".know-more-snippet", function (e) {
            var url = $(e.target).attr("snippetURL");
            window.open(url, '_blank', 'noopener');
        });
        FinalResultsTemplate.prototype.bindSnippetEvents(me, messageHtml);
        FinalResultsTemplate.prototype.tooltipBindEvent(me, messageHtml);
    };
    FinalResultsTemplate.prototype.getTemplateString = function (type) {
        var finalResultsTemplate = '<script type="text/x-jqury-tmpl">\
    <div class="final-results-container">\
        {{if infoText && infoText.length}}\
          <div class="messageBubble">\
            <div class="messageBubble-content">\
                <div class="botMessage">\
                <span class="bot_Img">\
                    <img class="default-bot-icon" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Icons/bubble_icon.svg">\
                </span>\
                <span>{{html helpers.convertMDtoHTML(infoText)}}</span>\
                </div>\
          </div>\
          </div>\
        {{/if}}\
        {{if snippetData && snippetData?.title}}\
        {{if snippetData.template_type =="paragraph_snippet" || snippetData.template_type =="answer_snippet"}}\
          <div class="search-temp-one snippet-margin">\
            <div class="top-header">\
                <div class="top-header-with-img">\
                    <span class="logo-span"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/snippet-avathar.svg"/></span>\
                    <div class="btn-chip">SUGGESTED ANSWER</div>\
                </div>\
                {{if snippetData && snippetData.source === "Answered by AI"}}\
                <div class="btn-link"><span class="bot-bg-purple"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/bot.svg"/></span>ANSWERED BY AI</div>\
                {{/if}}\
            </div>\
            {{if snippetData && snippetData.title}}\
              <div class="paragraph-temp-title">{{html helpers.convertMDtoHTML(snippetData?.title)}}</div>\
            {{/if}}\
            <div class="temp-data-desc">\
            {{html snippetData?.answer}}\
            </div>\
            <div class="temp-read-link">\
            <span class="desc-read-more">Read more</span> <span class="desc-read-less">Show Less</span>\
            </div>\
            {{if snippetData && snippetData.source !== "Answered by AI"}}\
            <div class="snippet-source-block">\
              <div class="snippet-source-file-name {{if !snippetData.source}} display-none{{/if}}">{{html snippetData.source}}</div>\
              <a href="${snippetData?.page_url}" target="_blank" target="_blank"><div class="snippet-source-url {{if !snippetData.page_url}} display-none{{/if}}"><span class="snippet-source-url-name" title="${snippetData?.page_url}">${snippetData?.page_url}</span><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Icons/external-link.svg"/></div></a>\
            </div>\
            {{/if}}\
            <div class="temp-footer-block">\
                <div class="temp-footer {{if snippetData && snippetData.source !== "Answered by AI"}} justify-content-end {{/if}}">\
                    {{if snippetData && snippetData.source === "Answered by AI"}}\
                    <div class="btn-link"><span class="bot-bg-purple"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/bot.svg"/></span>ANSWERED BY AI</div>\
                    {{/if}}\
                    <div class="temp-right">\
                        <div class="is-it-usefull">Is it useful?</div>\
                        <div class="temp-fotter-actions">\
                            <img  class="snippet-feedback  snippet-like-img" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/like-gray.svg" />\
                            <img class="snippet-feedback  snippet-dislike-img" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/dislike-gary.svg" />\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>\
        {{/if}}\
        {{if snippetData.template_type =="list_element_snippet" || snippetData.template_type =="heading_snippet"}}\
    <div class="search-temp-one list-snippet-temp snippet-margin">\
        <div class="top-header">\
            <div class="top-header-with-img">\
                <span class="logo-span"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/snippet-avathar.svg"/></span>\
                <div class="btn-chip">SUGGESTED ANSWER</div>\
            </div>\
            {{if snippetData && snippetData.source === "Answered by AI"}}\
            <div class="btn-link"><span class="bot-bg-purple"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/bot.svg"/></span>ANSWERED BY AI</div>\
            {{/if}}\
        </div>\
        <div class="list-temp-block">\
            <div class="list-temp-header">{{html snippetData?.title}}</div>\
                <ol type="1" class="list-temp-ul">\
                {{each(key, answer) snippetData.answer}}\
                    <li class="list-temp-li">{{html answer}}</li>\
                    {{/each}}\
                </ol>\
                {{if snippetData.answer.length > 4}}\
                <span class="desc-read-more display-block"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/show-more.svg" />Read more</span> <span class="desc-read-less  display-none"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/show-more.svg" />Show Less</span>\
                {{/if}}\
        </div>\
        {{if snippetData && snippetData.source !== "Answered by AI"}}\
          <div class="snippet-source-block">\
            <div class="snippet-source-file-name  {{if !snippetData.source}} display-none {{/if}}">{{html snippetData?.source}}</div>\
            <a href="${snippetData?.page_url}" target="_blank" target="_blank"><div class="snippet-source-url {{if !snippetData.page_url}} display-none {{/if}}"><span class="snippet-source-url-name">${snippetData?.page_url}</span><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Icons/external-link.svg"/> </div></a>\
          </div>\
        {{/if}}\
        <div class="temp-footer-block">\
            <div class="temp-footer {{if snippetData && snippetData.source !== "Answered by AI"}} justify-content-end {{/if}}">\
                {{if snippetData && snippetData.source === "Answered by AI"}}\
                <div class="btn-link"><span class="bot-bg-purple"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/bot.svg"/></span>ANSWERED BY AI</div>\
                {{/if}}\
                <div class="temp-right">\
                    <div class="is-it-usefull">Is it useful?</div>\
                    <div class="temp-fotter-actions">\
                        <img  class="snippet-feedback  snippet-like-img" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/like-gray.svg" />\
                        <img  class="snippet-feedback  snippet-dislike-img" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/dislike-gary.svg" />\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>\
    {{/if}}\
    {{if snippetData.template_type =="image_snippet"}}\
          <div class="search-temp-one snippet-margin">\
            <div class="top-header">\
                <div class="top-header-with-img">\
                    <span class="logo-span"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/snippet-avathar.svg"/></span>\
                    <div class="btn-chip">SUGGESTED ANSWER</div>\
                </div>\
                {{if snippetData && snippetData.source === "Answered by AI"}}\
                <div class="btn-link"><span class="bot-bg-purple"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/bot.svg"/></span>ANSWERED BY AI</div>\
                {{/if}}\
            </div>\
            {{if snippetData && snippetData.title}}\
              <div class="img-temp-title">{{html helpers.convertMDtoHTML(snippetData?.title)}}</div>\
              {{/if}}\
              {{if snippetData.answer}}\
                <div class="img-temp-data-desc">\
                {{html snippetData?.answer}}\
                </div>\
              {{/if}}\
              {{if snippetData && snippetData.image_url}}\
              <div class="snippet-image-block"><img src="${snippetData.image_url}"/></div>\
              {{/if}}\
            {{if snippetData && snippetData.source !== "Answered by AI"}}\
            <div class="snippet-source-block">\
              <div class="snippet-source-file-name {{if !snippetData.source}} display-none{{/if}}">{{html snippetData.source}}</div>\
              <a href="${snippetData?.page_url}" target="_blank" target="_blank"><div class="snippet-source-url {{if !snippetData.page_url}} display-none{{/if}}"><span class="snippet-source-url-name" title="${snippetData?.page_url}">${snippetData?.page_url}</span><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Icons/external-link.svg"/></div></a>\
            </div>\
            {{/if}}\
            <div class="temp-footer-block">\
                <div class="temp-footer {{if snippetData && snippetData.source !== "Answered by AI"}} justify-content-end {{/if}}">\
                    {{if snippetData && snippetData.source === "Answered by AI"}}\
                    <div class="btn-link"><span class="bot-bg-purple"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/bot.svg"/></span>ANSWERED BY AI</div>\
                    {{/if}}\
                    <div class="temp-right">\
                        <div class="is-it-usefull">Is it useful?</div>\
                        <div class="temp-fotter-actions">\
                            <img  class="snippet-feedback  snippet-like-img" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/like-gray.svg" />\
                            <img class="snippet-feedback  snippet-dislike-img" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/dislike-gary.svg" />\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>\
        {{/if}}\
        {{if snippetData.template_type =="citation_snippet"}}\
        <div class="search-temp-one snippet-margin">\
        <div class="top-header">\
            <div class="top-header-with-img">\
                <span class="logo-span"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/snippet-avathar.svg"/></span>\
                <div class="btn-chip">SUGGESTED ANSWER</div>\
            </div>\
            {{if snippetData && snippetData.source === "Answered by AI"}}\
            <div class="btn-link"><span class="bot-bg-purple"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/bot.svg"/></span>ANSWERED BY AI</div>\
            {{/if}}\
        </div>\
        {{if snippetData && snippetData.title}}\
        <div class="img-temp-title sa-sdk-title" data-title="{{html helpers.convertMDtoHTML(snippetData?.title)}}">{{html helpers.convertMDtoHTML(snippetData?.title)}}</div>\
        {{/if}}\
        <div class="citation-data-desc">\
        {{each(key, data) snippetData.answer}}\
        <span class="snippet-answer-fragment">{{html data.answer_fragment}}</span>{{each(sourceKey, source) data.sources}}<sup class="snippet-citation"><a href="${source.url}" target="_blank">[${sourceKey+1}]</a></sup>{{/each}}. </span>\
        {{/each}}\
        </div>\
        <div class="snippet-referene-block">\
          <div class="reference-block-header">References: </div>\
          <ol type="1" class="reference-list-temp-ul">\
                  {{each(key, item) snippetData.reference}}\
                      <li class="reference-list-temp-li"><a class="sa-sdk-title"  data-title="{{html helpers.convertMDtoHTML(item.title)}}" href="${item.url}" target="_blank"><span>{{html helpers.convertMDtoHTML(item.title)}}</span></a></li>\
                      {{/each}}\
                  </ol>\
        </div>\
        {{if snippetData && snippetData.source !== "Answered by AI"}}\
        <div class="snippet-source-block">\
          <div class="snippet-source-file-name {{if !snippetData.source}} display-none{{/if}}">{{html snippetData.source}}</div>\
          <a href="${snippetData?.page_url}" target="_blank" ><div class="snippet-source-url {{if !snippetData.page_url}} display-none{{/if}}"><span class="snippet-source-url-name" title="${snippetData?.page_url}">${snippetData?.page_url}</span><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Icons/external-link.svg"/></div></a>\
        </div>\
        {{/if}}\
        <div class="temp-footer-block">\
            <div class="temp-footer {{if snippetData && snippetData.source !== "Answered by AI"}} justify-content-end {{/if}}">\
                {{if snippetData && snippetData.source === "Answered by AI"}}\
                <div class="btn-link"><span class="bot-bg-purple"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/bot.svg"/></span>ANSWERED BY AI</div>\
                {{/if}}\
                <div class="temp-right">\
                    <div class="is-it-usefull">Is it useful?</div>\
                    <div class="temp-fotter-actions">\
                        <img  class="snippet-feedback  snippet-like-img" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/like-gray.svg" />\
                        <img class="snippet-feedback  snippet-dislike-img" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/dislike-gary.svg" />\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>\
    {{/if}}\
    {{if snippetData.template_type =="active_citation_snippet"}}\
        <div class="search-temp-one active-citation-snippet snippet-margin">\
        <div class="top-header">\
            <div class="top-header-with-img">\
                <span class="logo-span"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/snippet-avathar.svg"/></span>\
                <div class="btn-chip">SUGGESTED ANSWER</div>\
            </div>\
            {{if snippetData && snippetData.source === "Answered by AI"}}\
            <div class="btn-link"><span class="bot-bg-purple"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/bot.svg"/></span>ANSWERED BY AI</div>\
            {{/if}}\
        </div>\
        {{if snippetData && snippetData.title}}\
        <div class="img-temp-title sa-sdk-title" data-title="{{html helpers.convertMDtoHTML(snippetData?.title)}}">{{html helpers.convertMDtoHTML(snippetData?.title)}}</div>\
        {{/if}}\
        <div class="citation-data-desc">\
        {{each(key, data) snippetData.answer}}\
        <span class="snippet-answer-fragment-block fragment-hover-event {{each(itemKey, item) data.sources}} fragment-${itemKey+1} {{/each}}"\
          fragment="{{each(itemKey, item) data.sources}} .fragment-${itemKey+1}, {{/each}}"><span class="sub-fragment"><span class="snippet-answer-fragment">{{html data.answer_fragment}}</span>{{each(sourceKey, source) data.sources}}<sup class="snippet-citation"><a href="${source.url}" target="_blank"><span class="reference-no">${sourceKey+1}</span></a></sup>{{/each}}</span></span></span>\
        {{/each}}\
        </div>\
        <div class="active-snippet-referene-block">\
          <div class="active-reference-block-header">This answer is generated by SearchAssist referring below </div>\
          <div class="active-reference-list-temp-block">\
                  {{each(key, item) snippetData.reference}}\
                      <div class="active-reference-list-temp fragment-hover-event fragment-${key+1}"  title="{{html item.title}}" fragment=".fragment-${key+1},"><a href="${item.url}" target="_blank"><span class="reference-no">${key+1}</span><span class="reference-title">{{html helpers.convertMDtoHTML(item.title)}}</span></a></div>\
                      {{/each}}\
                  </div>\
        </div>\
        {{if snippetData && snippetData.source !== "Answered by AI"}}\
        <div class="snippet-source-block">\
          <div class="snippet-source-file-name {{if !snippetData.source}} display-none{{/if}}">{{html snippetData.source}}</div>\
          <a href="${snippetData?.page_url}" target="_blank" ><div class="snippet-source-url {{if !snippetData.page_url}} display-none{{/if}}"><span class="snippet-source-url-name" title="${snippetData?.page_url}">${snippetData?.page_url}</span><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Icons/external-link.svg"/></div></a>\
        </div>\
        {{/if}}\
        <div class="temp-footer-block">\
            <div class="temp-footer {{if snippetData && snippetData.source !== "Answered by AI"}} justify-content-end {{/if}}">\
                {{if snippetData && snippetData.source === "Answered by AI"}}\
                <div class="btn-link"><span class="bot-bg-purple"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/bot.svg"/></span>ANSWERED BY AI</div>\
                {{/if}}\
                <div class="temp-right">\
                    <div class="is-it-usefull">Is it useful?</div>\
                    <div class="temp-fotter-actions">\
                        <img  class="snippet-feedback  snippet-like-img" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/like-gray.svg" />\
                        <img class="snippet-feedback  snippet-dislike-img" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/dislike-gary.svg" />\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>\
    {{/if}}\
    {{/if}}\
      <div class="finalResults {{if snippetData && snippetData?.title}}snippet-margin{{/if}}">\
        {{if taskPrefix === "SUGGESTED"}}\
        <span class="live-search-close-icon show-all-results">See All Results</span>\
        {{/if}}\
        <div class="resultsOfSearch">\
            {{if taskPrefix !== "SUGGESTED"}}\
                <div class="search-data-container"></div>\
            {{/if}}\
            {{if taskPrefix === "SUGGESTED"}}\
                <div class="live-search-data-container"></div>\
            {{/if}}\
            <!--{{if noResults}} <span class="text-center">No results found</span> {{/if}}-->\
            {{if showAllResults && !customSearchResult}}\
                {{if taskPrefix !== "SUGGESTED"}}\
                    <div class="bottom-search-show-all-results">\
                        <span class="pointer show-all-results" >See all <span class="search-results-count">(${totalSearchResults} results)</span><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAYAAACALL/6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACHSURBVHgBlZDBDYUwDEOdin/+sEGkMhBMACOwCSuwASMwAwMglQ3YICTAAQ6lwpdUkV9lB4iImXPmsrd537sYEELYAClA2XiHosAJLS1EVrhfjy9i9gN739ibNGenM09SJA3E1RqJNqT1t7+1U0Up51GYskm7zNaJvpht595zP83JKNdBHtoBNXcrtgi1OOQAAAAASUVORK5CYII="></span>\
                    </div>\
                {{/if}}\
            {{/if}}\
        </div>\
        </div>\
    </div>\
</script>';
        if (type === 'finalResultsTemplate') {
            return finalResultsTemplate;
        }
    };
    FinalResultsTemplate.prototype.botActionTrigger = function (event) {
        var me = this;
        me.hostInstance.botActionTrigger(event);
    };
    ;
    FinalResultsTemplate.prototype.bindSnippetEvents = function (me, messageHtml) {
        var $ = me.hostInstance.$;
        $(messageHtml).find('.search-temp-one').off('click', '.snippet-feedback').on('click', '.snippet-feedback', function (event) {
            $(messageHtml).find('.snippet-feedback').removeClass('active');
            $(event.currentTarget).addClass('active');
        });
        if (messageHtml && $(messageHtml).find('.search-temp-one').find('.temp-data-desc').length) {
            setTimeout(function () {
                if ($(messageHtml).find('.search-temp-one').last().find('.temp-data-desc').length && $(messageHtml).find('.search-temp-one').last().find('.temp-data-desc')[0].scrollHeight > 70) {
                    $(messageHtml).find('.search-temp-one').last().find('.desc-read-more').show();
                    $(messageHtml).find('.search-temp-one').last().find('.desc-read-less').hide();
                }
                else {
                    $(messageHtml).find('.search-temp-one').last().find('.desc-read-more').hide();
                    $(messageHtml).find('.search-temp-one').last().find('.desc-read-less').hide();
                }
                $(messageHtml).find('.search-temp-one').off('click', '.desc-read-more').on('click', '.desc-read-more', function (event) {
                    $(event.currentTarget).parent().parent().find('.temp-data-desc').css('-webkit-line-clamp', 'initial');
                    $(event.currentTarget).hide();
                    $(event.currentTarget).parent().find('.desc-read-less').show();
                });
                $(messageHtml).find('.search-temp-one').off('click', '.desc-read-less').on('click', '.desc-read-less', function (event) {
                    $(event.currentTarget).parent().parent().find('.temp-data-desc').css('-webkit-line-clamp', '3');
                    $(event.currentTarget).parent().find('.desc-read-more').show();
                    $(event.currentTarget).hide();
                });
            }, 300);
        }
        else if (messageHtml && $(messageHtml).find('.search-temp-one').find('.list-temp-ul').length) {
            $(messageHtml).find('.search-temp-one').off('click', '.desc-read-more').on('click', '.desc-read-more', function (event) {
                $(messageHtml).find('.list-temp-ul').addClass('show-all-list');
                $(messageHtml).find('.desc-read-more').removeClass('display-block').addClass('display-none');
                $(messageHtml).find('.desc-read-less').removeClass('display-none').addClass('display-block');
            });
            $(messageHtml).find('.search-temp-one').off('click', '.desc-read-less').on('click', '.desc-read-less', function (event) {
                $(messageHtml).find('.list-temp-ul').removeClass('show-all-list');
                $(messageHtml).find('.desc-read-less').removeClass('display-block').addClass('display-none');
                $(messageHtml).find('.desc-read-more').removeClass('display-none').addClass('display-block');
            });
        }
        FinalResultsTemplate.prototype.bindFragmentHoverEvent(me, messageHtml);
    };
    FinalResultsTemplate.prototype.bindFragmentHoverEvent = function (me, messageHtml) {
        var $ = me.hostInstance.$;
        $(messageHtml).find('.active-citation-snippet').off('mouseover', '.fragment-hover-event').on('mouseover', '.fragment-hover-event', function (event) {
            var fragmentClasses = $(event.currentTarget).attr('fragment').split(',').slice(0, -1);
            fragmentClasses.forEach(function (itemClass) {
                if ($(event.currentTarget).hasClass('snippet-answer-fragment-block')) {
                    $(event.currentTarget).parent().parent().closest('.active-citation-snippet').find('.active-snippet-referene-block').find(itemClass).addClass('active');
                }
                else {
                    $(event.currentTarget).parent().parent().closest('.active-citation-snippet').find(itemClass).addClass('active');
                }
            });
        });
        $(messageHtml).find('.active-citation-snippet').off('mouseout', '.fragment-hover-event').on('mouseout', '.fragment-hover-event', function (event) {
            var fragmentClasses = $(event.currentTarget).attr('fragment').split(',').slice(0, -1);
            fragmentClasses.forEach(function (itemClass) {
                $(event.currentTarget).parent().parent().closest('.active-citation-snippet').find(itemClass).removeClass('active');
            });
        });
    };
    FinalResultsTemplate.prototype.tooltipBindEvent = function (me, messageHtml) {
        var $ = me.hostInstance.$;
        $(messageHtml).find('.sa-sdk-title').off('mouseover').on('mouseover', function (e) {
            e.stopPropagation();
            e.stopImmediatePropagation();
            $(e.currentTarget).before('<div class="sdk-tooltip-container">' + $(e.currentTarget).attr('data-title') + '<span class="sa-tooltip-arrow"></span></div>');
            $(e.currentTarget).parent().find('.sdk-tooltip-container').css('top', ($(e.currentTarget).position().top - ($(e.currentTarget).parent().find('.sdk-tooltip-container').height() + 25)) + 'px');
        });
        $(messageHtml).find('.sa-sdk-title').off('mouseout').on('mouseout', function (e) {
            e.stopPropagation();
            e.stopImmediatePropagation();
            $(e.currentTarget).parent().find('.sdk-tooltip-container').remove();
        });
    };
    return FinalResultsTemplate;
}());
FinalResultsTemplate.prototype.$ = $;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FinalResultsTemplate);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("1aeed2b0ad3f4d6ae614")
/******/ })();
/******/ 
/******/ }
)
//# sourceMappingURL=hot-update.js.map