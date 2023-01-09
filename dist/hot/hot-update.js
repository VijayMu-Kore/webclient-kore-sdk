self["webpackHotUpdatekore_web_sdk"]("esm",{

/***/ "./src/templatemanager/demo-templates/siemens/siemensTemplate.ts":
/*!***********************************************************************!*\
  !*** ./src/templatemanager/demo-templates/siemens/siemensTemplate.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/helpers */ "./src/utils/helpers.js");
/* harmony import */ var _siemensTemplate_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./siemensTemplate.scss */ "./src/templatemanager/demo-templates/siemens/siemensTemplate.scss");


var SiemensTemplate = /** @class */ (function () {
    function SiemensTemplate() {
    }
    SiemensTemplate.prototype.renderMessage = function (msgData) {
        var _a, _b, _c, _d, _e;
        var me = this;
        var $ = me.hostInstance.$;
        var helpersObj = _utils_helpers__WEBPACK_IMPORTED_MODULE_1__["default"];
        if (((_d = (_c = (_b = (_a = msgData === null || msgData === void 0 ? void 0 : msgData.message) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.component) === null || _c === void 0 ? void 0 : _c.payload) === null || _d === void 0 ? void 0 : _d.template_type) === "siemens") {
            me.messageHtml = $(SiemensTemplate.prototype.getTemplateString()).tmpl((_e = msgData === null || msgData === void 0 ? void 0 : msgData.message[0].component) === null || _e === void 0 ? void 0 : _e.payload);
            SiemensTemplate.prototype.bindClickLogsEvent(me, me.messageHtml);
            return me.messageHtml;
        }
    };
    SiemensTemplate.prototype.getTemplateString = function () {
        var siemensUsecaseTemplate = '<script type="text/x-jqury-tmpl">\
            <div class="siemens-template">\
            {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
            {{if !(data.bestMatch===true)}}\
              <div class="siemens-list-template redirecting-link click-to-navigate-url isClickable" href="${data.doc_confluence_link}" target="_blank">\
                <div class="icon-with-title">\
                  <img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Siemenss_demo/icon1-blue.svg" class="siemens-icon-blue">\
                  <img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Siemenss_demo/icon1.svg" class="siemens-icon">\
                  <span class="name-title">{{html helpers.convertMDtoHTML(data.heading)}}</span>\
                  <span class="redirecting-link click-to-navigate-url faqs-shadow isClickable  click-log-metrics" data-title="${data.heading}" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.doc_confluence_link}" target="_blank">\
                    <img class="siemens-link-icon" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Siemenss_demo/externallink-gray.svg">\
                  </span>\
                </div>\
                <div class="info-test-content four-line-description">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                <div class="author-updates-sec">\
                  <div class="author-names">\
                    <span class="author-title">Author:</span>\
                    <span class="author_name">{{html helpers.convertMDtoHTML(data.author)}}</span>\
                  </div>\
                  <div class="updates-on">\
                    <span class="title">Updated on:</span>\
                    <span class="time-updates">{{html helpers.convertMDtoHTML(data.updateBy)}}</span>\
                  </div>\
                </div>\
                <div class="button-chips">\
                  {{each(key, chip) data.chips}}\
                  <button class="btn-chip" style="color:${chip.color};background:${chip.background};border:1px solid ${chip.color}">{{html helpers.convertMDtoHTML(chip.name)}}</button>\
                  {{/each}}\
                </div>\
                </div>\
                {{/if}}\
                {{/each}}\
                <div class="show-more-list {{if doc_count==0 || doc_count<6 || isLiveSearch || isSearch}}display-none{{/if}}" groupName="${groupName}" templateName="${templateName}" pageNumber="${pageNumber}" fieldName="${fieldName}">\
                <div class="searchassist-show-more-button">Show more <img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Banking_demo/show_more.png" height="6" width="10" /></div>\
                </div>\
                </div>\
            </script>';
        return siemensUsecaseTemplate;
    };
    SiemensTemplate.prototype.bindClickLogsEvent = function (me, messageHtml) {
        var hostWindowInstance = me.hostInstance;
        var $ = me.hostInstance.$;
        $(messageHtml).off("click", ".click-log-metrics").on("click", ".click-log-metrics", function (e) {
            hostWindowInstance === null || hostWindowInstance === void 0 ? void 0 : hostWindowInstance.captureClickAnalytics(e, $(e.currentTarget).closest(".click-log-metrics").attr("contentType"), "click", $(e.currentTarget).closest(".click-log-metrics").attr("contentId"), $(e.currentTarget).closest(".click-log-metrics").attr("id"), $(e.currentTarget).closest(".click-log-metrics").attr("data-title") || $(e.currentTarget).attr("title"));
            if ($(e.currentTarget).hasClass('isClickable')) {
                if ($(e.target).closest('.click-to-navigate-url').attr('href')) {
                    var link = document.createElement('a');
                    link.href = $(e.target).closest('.click-to-navigate-url').attr('href');
                    link.target = "_blank",
                        link.click();
                    link.remove();
                }
            }
        });
    };
    return SiemensTemplate;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SiemensTemplate);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("6f1709dec7a72aacdb6b")
/******/ })();
/******/ 
/******/ }
)
//# sourceMappingURL=hot-update.js.map