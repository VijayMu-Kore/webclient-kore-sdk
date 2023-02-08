self["webpackHotUpdatekore_web_sdk"]("esm",{

/***/ "./src/templatemanager/templates/feedBackFormTemplate/feedBackFormTemplate.ts":
/*!************************************************************************************!*\
  !*** ./src/templatemanager/templates/feedBackFormTemplate/feedBackFormTemplate.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/helpers */ "./src/utils/helpers.js");
/* harmony import */ var _feedBackFormTemplate_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./feedBackFormTemplate.scss */ "./src/templatemanager/templates/feedBackFormTemplate/feedBackFormTemplate.scss");


var FeedBackFormTemplate = /** @class */ (function () {
    function FeedBackFormTemplate() {
    }
    FeedBackFormTemplate.prototype.renderMessage = function (msgData) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        var me = this;
        var $ = me.hostInstance.$;
        var helpersObj = _utils_helpers__WEBPACK_IMPORTED_MODULE_1__["default"];
        if (((_d = (_c = (_b = (_a = msgData === null || msgData === void 0 ? void 0 : msgData.message) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.component) === null || _c === void 0 ? void 0 : _c.payload) === null || _d === void 0 ? void 0 : _d.template_type) === "feedbackFormTemplate") {
            me.messageHtml = $(FeedBackFormTemplate.prototype.getTemplateString()).tmpl({
                'feedbackData': (_h = (_g = (_f = (_e = msgData === null || msgData === void 0 ? void 0 : msgData.message) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.component) === null || _g === void 0 ? void 0 : _g.payload) === null || _h === void 0 ? void 0 : _h.query,
                'feedBackType': (_m = (_l = (_k = (_j = msgData === null || msgData === void 0 ? void 0 : msgData.message) === null || _j === void 0 ? void 0 : _j[0]) === null || _k === void 0 ? void 0 : _k.component) === null || _l === void 0 ? void 0 : _l.payload) === null || _m === void 0 ? void 0 : _m.feedBackType,
                'helpers': helpersObj.helpers
            });
            setTimeout(function () {
                FeedBackFormTemplate.prototype.bindFeedbackEvents(me, me.messageHtml, msgData.message[0].component.payload);
            }, 500);
            return me.messageHtml;
        }
    };
    FeedBackFormTemplate.prototype.getTemplateString = function () {
        var feedBackFormTemplate = '<script type="text/x-jqury-tmpl">\
      <div class="snippet-bg-blur"></div>\
      <div class="temp-feed-back-form">\
      <div class="temp-feed-back-header-block">\
          <div class="temp-feed-back-header">\
              <div class="temp-feed-back-header-samll">Feedback for</div>\
              <div class="temp-feed-back-header-large">“${feedbackData}”</div>\
          </div>\
          <div class="close-feedback"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Icons/feedback-close.png"/></div>\
          <div class="temp-right-indicator-block"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Icons/feedback-right-pointer.png"/></div>\
      </div>\
      <div class="temp-break-line"></div>\
      <div class="temp-feed-back-qns">What seems to be the issue?</div>\
      <div class="temp-feed-back-ans-tags">\
          <button class="temp-feed-back-ans-tag-btn">Incorrect</button>\
          <button class="temp-feed-back-ans-tag-btn">Outdated</button>\
          <button class="temp-feed-back-ans-tag-btn">Few Results</button>\
      </div>\
      <div class="temp-feed-back-opt-qns">Please help us with more details (Optional)</div>\
      <div class="temp-feed-back-opt-ans">\
          <textarea id="feedback-input-text" placeholder="I dont think these results are of any use for this month" class="input-text"></textarea>\
      </div>\
      <div class="temp-feed-back-footer-block">\
          <button class="temp-feed-back-footer-btn-secondary close-feedback">Close</button>\
          <button class="temp-feed-back-footer-btn-primary submit-feedback">Submit</button>\
      </div>\
  </div>\
      </script>';
        return feedBackFormTemplate;
    };
    FeedBackFormTemplate.prototype.bindFeedbackEvents = function (me, messageHtml, payload) {
        var hostWindowInstance = me.hostInstance;
        var $ = me.hostInstance.$;
        $(messageHtml).off('click', '.close-feedback').on('click', '.close-feedback', function (event) {
            event.stopPropagation();
            $(messageHtml).parent().empty();
        });
        $(messageHtml).off('click', '.temp-feed-back-ans-tag-btn').on('click', '.temp-feed-back-ans-tag-btn', function (event) {
            event.stopPropagation();
            $(messageHtml).find('.temp-feed-back-ans-tag-btn.active').removeClass('active');
            $(event.currentTarget).addClass('active');
        });
        $(messageHtml).off('click', '.submit-feedback').on('click', '.submit-feedback', function (event) {
            event.stopPropagation();
            var feedbackInputText = $(messageHtml).find('#feedback-input-text').val() || '';
            var feedbackButton = $(messageHtml).find('.temp-feed-back-ans-tag-btn.active').html() || '';
            if (feedbackInputText || feedbackButton) {
                hostWindowInstance.updateFeedBackResult('thumbsDown', payload === null || payload === void 0 ? void 0 : payload.query, payload === null || payload === void 0 ? void 0 : payload.feedBackType, feedbackButton, feedbackInputText);
                $('#snippet-feedback-template').empty();
                $('#query-feedback').empty();
            }
        });
    };
    return FeedBackFormTemplate;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FeedBackFormTemplate);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("06e6624f25fa87c6f9e3")
/******/ })();
/******/ 
/******/ }
)
//# sourceMappingURL=hot-update.js.map