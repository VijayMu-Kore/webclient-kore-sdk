self["webpackHotUpdatekore_web_sdk"]("esm",{

/***/ "./src/templatemanager/demo-templates/productsCarousel/productsCarouselTemplate.ts":
/*!*****************************************************************************************!*\
  !*** ./src/templatemanager/demo-templates/productsCarousel/productsCarouselTemplate.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/helpers */ "./src/utils/helpers.js");
/* harmony import */ var _libs_purejscarousel_purejscarousel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../libs/purejscarousel/purejscarousel */ "./src/libs/purejscarousel/purejscarousel.js");
Object(function webpackMissingModule() { var e = new Error("Cannot find module './productCarouselTemplate.scss'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());



var ProductCarouselTemplate = /** @class */ (function () {
    function ProductCarouselTemplate() {
    }
    ProductCarouselTemplate.prototype.renderMessage = function (msgData) {
        var _a, _b, _c, _d;
        var me = this;
        var $ = me.hostInstance.$;
        var helpersObj = _utils_helpers__WEBPACK_IMPORTED_MODULE_1__["default"];
        var extension = '';
        var _extractedFileName = '';
        function strSplit(str) {
            return (str.split('.'));
        }
        if (msgData.message && msgData.message[0] && msgData.message[0].cInfo && msgData.message[0].cInfo.attachments) {
            extension = strSplit(msgData.message[0].cInfo.attachments[0].fileName);
        }
        if (msgData.message && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.url) {
            extension = strSplit(msgData.message[0].component.payload.url);
            _extractedFileName = msgData.message[0].component.payload.url.replace(/^.*[\\\/]/, '');
        }
        if (((_d = (_c = (_b = (_a = msgData === null || msgData === void 0 ? void 0 : msgData.message) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.component) === null || _c === void 0 ? void 0 : _c.payload) === null || _d === void 0 ? void 0 : _d.template_type) === "products_carousel_template") {
            me.messageHtml = $(me.getTemplateString("productCarouselTemplate")).tmpl({
                'msgData': msgData,
                'helpers': helpersObj.helpers,
                'extension': extension
            });
            setTimeout(function () {
                me.bindEvents(me.messageHtml, 'carousel-template');
            }, 1000);
            return me.messageHtml;
        }
    };
    ProductCarouselTemplate.prototype.getTemplateString = function () {
        var productCarouselTemplate = '<script type="text/x-jqury-tmpl">\
        <div class="botMessage seller-carousels">\
          <div class="carousel-cosmotics-sellers carousel carousel-template">\
          {{each(key, data) msgData.message[0].component.payload.elements}}\
            <div class="slide">\
              <div class="inner-data click-to-navigate-url isClickable"  href="${data.url}" target="_blank">\
                <div class="best-sellar {{if  data.bestseller == true}} display-inline-block{{else}}display-none{{/if}}">Best Seller</div>\
                <div class="new-arrival {{if  data.newarrival == true}} display-inline-block{{else}}display-none{{/if}}">New</div>\
                <div class="img-block">\
                  <div class="wishlist">\
                    <img class="dflt-wish-img" src="images/cosmetics/wishlist.svg">\
                    <img class="wish-img-fill" src="images/cosmetics/wish-fill.svg">\
                  </div>\
                  <div class="add-to-bag">\
                    <img src="images/cosmetics/bag.svg">\
                    <span>Add to Bag</span>\
                  </div>\
                  <img src="${data.prod_image}">\
                </div>\
                <div class="info-data">\
                  <div class="title">{{html helpers.convertMDtoHTML(data.brand_name)}}: {{html helpers.convertMDtoHTML(data.prod_name)}}</div>\
                </div>\
                <div class="product-info">{{html helpers.convertMDtoHTML(data.prod_desc)}}</div>\
                <div class="amount-info">\
                  <div class="amount-">${data.prod_price}</div>\
                  <div class="amout-strike">${data.prod_original_price}</div>\
                  <div class="off-info">${data.prod_percentage_offer}</div>\
                </div>\
              </div>\
            </div>\
            {{/each}}\
        </div>\
          <div>\
        </div>\
      </div>\
                          </script>';
        return productCarouselTemplate;
    };
    ProductCarouselTemplate.prototype.bindEvents = function (messageHtml, carouselId) {
        var me = this;
        var chatWindowInstance = me.hostInstance;
        var $ = me.hostInstance.$;
        var newCarouselTemplateCount = $('.carousel').length;
        newCarouselTemplateCount += 1;
        var newCarouselEles = [];
        if (carouselId) {
            if (messageHtml.find('.' + carouselId + ':last').length) {
                messageHtml.find('.' + carouselId + ':last').addClass("carouselTemplate" + newCarouselTemplateCount);
            }
            else {
                $('.' + carouselId).last().addClass("carouselTemplate" + newCarouselTemplateCount);
            }
        }
        else {
            messageHtml.find('.carousel:last').addClass("carouselTemplate" + newCarouselTemplateCount);
        }
        var count = 0;
        if (carouselId) {
            if (messageHtml.find(".carouselTemplate" + newCarouselTemplateCount).length) {
                count = messageHtml.find(".carouselTemplate" + newCarouselTemplateCount).children().length;
            }
            else {
                count = $(".carouselTemplate" + newCarouselTemplateCount).children().length;
            }
            if (count == 0) {
                count = messageHtml.find(".carouselTemplate" + newCarouselTemplateCount).children().length;
            }
        }
        else {
            count = messageHtml.find(".carouselTemplate" + newCarouselTemplateCount).children().length;
        }
        if (count > 1) {
            var carouselOneByOne = new _libs_purejscarousel_purejscarousel__WEBPACK_IMPORTED_MODULE_2__["default"]({
                carousel: '.carouselTemplate' + newCarouselTemplateCount,
                slide: '.slide',
                oneByOne: true,
                jq: $,
            });
            $('.carousel' + newCarouselTemplateCount).parent().show();
            newCarouselEles.push(carouselOneByOne);
            if ($('.carouselTemplate' + newCarouselTemplateCount).width() >= ($('.carouselTemplate' + newCarouselTemplateCount + ' .purejscarousel-slides-container').children().length * $('.carouselTemplate' + newCarouselTemplateCount + ' .purejscarousel-slides-container .slide:first').width())) {
                $('.carouselTemplate' + newCarouselTemplateCount + ' .purejscarousel-btn-prev').hide();
                $('.carouselTemplate' + newCarouselTemplateCount + ' .purejscarousel-btn-next').hide();
            }
            $('.carouselTemplate' + newCarouselTemplateCount + ' .purejscarousel-btn-prev::after').css('height', $('.carouselTemplate' + newCarouselTemplateCount + '.purejscarousel-slides-container').height() + 'px');
            $('.carouselTemplate' + newCarouselTemplateCount + ' .purejscarousel-btn-next::after').css('height', $('.carouselTemplate' + newCarouselTemplateCount + '.purejscarousel-slides-container').height() + 'px');
            $("body").append("<style>.carouselTemplate" + newCarouselTemplateCount + " .purejscarousel-btn-next::after,.carouselTemplate" + newCarouselTemplateCount + " .purejscarousel-btn-prev::after {height:" + ($('.carouselTemplate' + newCarouselTemplateCount + ' .purejscarousel-slides-container').height() - 8) + "px !important; top:-" + ($('.carouselTemplate' + newCarouselTemplateCount + ' .purejscarousel-btn-next').position().top - 27.5) + "px !important;}</style>");
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent('resize', true, false);
            window.dispatchEvent(evt);
        }
        if (carouselId == 'filterCarouselCard') {
            $('.carouselTemplate' + newCarouselTemplateCount + ' .purejscarousel-btn-prev').addClass('filterCard-prev');
            $('.carouselTemplate' + newCarouselTemplateCount + ' .purejscarousel-btn-next').addClass('filterCard-next');
            var initialCard = 0;
            $('.carouselTemplate' + newCarouselTemplateCount).off('click', '.filterCard-next').on('click', '.filterCard-next', function (e) {
                initialCard = initialCard + 1;
                chatWindowInstance.filterCardSelected = initialCard;
                // chatWindowInstance.userContextBankCard = JSON.parse(window.localStorage.getItem('cards'))[initialCard];
                // chatWindowInstance.invokeSpecificSearch(chatWindowInstance.selectedFacetFromSearch);
            });
            $('.carouselTemplate' + newCarouselTemplateCount).off('click', '.filterCard-prev').on('click', '.filterCard-prev', function (e) {
                initialCard = initialCard - 1;
                chatWindowInstance.filterCardSelected = initialCard;
                // chatWindowInstance.userContextBankCard = JSON.parse(window.localStorage.getItem('cards'))[initialCard];
                // chatWindowInstance.invokeSpecificSearch(chatWindowInstance.selectedFacetFromSearch);
            });
        }
    };
    return ProductCarouselTemplate;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductCarouselTemplate);


/***/ }),

/***/ "./src/templatemanager/templateManager.ts":
/*!************************************************!*\
  !*** ./src/templatemanager/templateManager.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _templates_button_buttonTemplate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./templates/button/buttonTemplate */ "./src/templatemanager/templates/button/buttonTemplate.ts");
/* harmony import */ var _templates_listTemplate_listTemplate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./templates/listTemplate/listTemplate */ "./src/templatemanager/templates/listTemplate/listTemplate.ts");
/* harmony import */ var _templates_quickReplyTemplate_quickReplyTemplate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./templates/quickReplyTemplate/quickReplyTemplate */ "./src/templatemanager/templates/quickReplyTemplate/quickReplyTemplate.ts");
/* harmony import */ var _templates_templateAttachment_templateAttachment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./templates/templateAttachment/templateAttachment */ "./src/templatemanager/templates/templateAttachment/templateAttachment.ts");
/* harmony import */ var _templates_tableTemplate_tableTemplate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./templates/tableTemplate/tableTemplate */ "./src/templatemanager/templates/tableTemplate/tableTemplate.ts");
/* harmony import */ var _templates_checkBoxesTemplate_checkBoxesTemplate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./templates/checkBoxesTemplate/checkBoxesTemplate */ "./src/templatemanager/templates/checkBoxesTemplate/checkBoxesTemplate.ts");
/* harmony import */ var _templates_dropdownTemplate_dropdownTemplate__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./templates/dropdownTemplate/dropdownTemplate */ "./src/templatemanager/templates/dropdownTemplate/dropdownTemplate.ts");
/* harmony import */ var _templates_likeDislikeTemplate_likeDislikeTemplate__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./templates/likeDislikeTemplate/likeDislikeTemplate */ "./src/templatemanager/templates/likeDislikeTemplate/likeDislikeTemplate.ts");
/* harmony import */ var _templates_formTemplate_formTemplate__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./templates/formTemplate/formTemplate */ "./src/templatemanager/templates/formTemplate/formTemplate.ts");
/* harmony import */ var _templates_advancedMultiSelect_advancedMultiSelect__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./templates/advancedMultiSelect/advancedMultiSelect */ "./src/templatemanager/templates/advancedMultiSelect/advancedMultiSelect.ts");
/* harmony import */ var _templates_tableListTemplate_tableListTemplate__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./templates/tableListTemplate/tableListTemplate */ "./src/templatemanager/templates/tableListTemplate/tableListTemplate.ts");
/* harmony import */ var _templates_ratingTemplate_ratingTemplate__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./templates/ratingTemplate/ratingTemplate */ "./src/templatemanager/templates/ratingTemplate/ratingTemplate.ts");
/* harmony import */ var _templates_listWidgetTemplate_listWidgetTemplate__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./templates/listWidgetTemplate/listWidgetTemplate */ "./src/templatemanager/templates/listWidgetTemplate/listWidgetTemplate.ts");
/* harmony import */ var _templates_miniTableTemplate_miniTableTemplate__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./templates/miniTableTemplate/miniTableTemplate */ "./src/templatemanager/templates/miniTableTemplate/miniTableTemplate.ts");
/* harmony import */ var _templates_carouselTemplate_carouselTemplate__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./templates/carouselTemplate/carouselTemplate */ "./src/templatemanager/templates/carouselTemplate/carouselTemplate.ts");
/* harmony import */ var _templates_listViewTemplate_listViewTemplate__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./templates/listViewTemplate/listViewTemplate */ "./src/templatemanager/templates/listViewTemplate/listViewTemplate.ts");
/* harmony import */ var _templates_iframeTemplate_iframeTemplate__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./templates/iframeTemplate/iframeTemplate */ "./src/templatemanager/templates/iframeTemplate/iframeTemplate.ts");
/* harmony import */ var _templates_systemTemplate_systemTemplate__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./templates/systemTemplate/systemTemplate */ "./src/templatemanager/templates/systemTemplate/systemTemplate.ts");
/* harmony import */ var _templates_advancedListTemplate_advancedListTemplate__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./templates/advancedListTemplate/advancedListTemplate */ "./src/templatemanager/templates/advancedListTemplate/advancedListTemplate.ts");
/* harmony import */ var _templates_cardTemplate_cardTemplate__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./templates/cardTemplate/cardTemplate */ "./src/templatemanager/templates/cardTemplate/cardTemplate.ts");
/* harmony import */ var _demo_templates_cancelConfirmation_cancelConfirmationTemplate__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./demo-templates/cancelConfirmation/cancelConfirmationTemplate */ "./src/templatemanager/demo-templates/cancelConfirmation/cancelConfirmationTemplate.ts");
/* harmony import */ var _demo_templates_cancelOrder_cancelOrderTemplate__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./demo-templates/cancelOrder/cancelOrderTemplate */ "./src/templatemanager/demo-templates/cancelOrder/cancelOrderTemplate.ts");
/* harmony import */ var _demo_templates_cardPayment_cardPaymentTemplate__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./demo-templates/cardPayment/cardPaymentTemplate */ "./src/templatemanager/demo-templates/cardPayment/cardPaymentTemplate.ts");
/* harmony import */ var _demo_templates_cardPaymentCarousel_cardPaymentCarouselTemplate__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./demo-templates/cardPaymentCarousel/cardPaymentCarouselTemplate */ "./src/templatemanager/demo-templates/cardPaymentCarousel/cardPaymentCarouselTemplate.ts");
/* harmony import */ var _demo_templates_confirmCardPayment_confirmCardPaymentTemplate__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./demo-templates/confirmCardPayment/confirmCardPaymentTemplate */ "./src/templatemanager/demo-templates/confirmCardPayment/confirmCardPaymentTemplate.ts");
/* harmony import */ var _demo_templates_createNewCardPin_createNewCardPinTemplate__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./demo-templates/createNewCardPin/createNewCardPinTemplate */ "./src/templatemanager/demo-templates/createNewCardPin/createNewCardPinTemplate.ts");
/* harmony import */ var _demo_templates_debitCardDetails_debitCardDetailsTemplate__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./demo-templates/debitCardDetails/debitCardDetailsTemplate */ "./src/templatemanager/demo-templates/debitCardDetails/debitCardDetailsTemplate.ts");
/* harmony import */ var _demo_templates_enterEmail_enterEmailTemplate__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./demo-templates/enterEmail/enterEmailTemplate */ "./src/templatemanager/demo-templates/enterEmail/enterEmailTemplate.ts");
/* harmony import */ var _demo_templates_enterOtp_enterOtpTemplate__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./demo-templates/enterOtp/enterOtpTemplate */ "./src/templatemanager/demo-templates/enterOtp/enterOtpTemplate.ts");
/* harmony import */ var _demo_templates_guidedTour_guidedTourTemplate__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./demo-templates/guidedTour/guidedTourTemplate */ "./src/templatemanager/demo-templates/guidedTour/guidedTourTemplate.ts");
/* harmony import */ var _demo_templates_mobileNum_mobileNumTemplate__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./demo-templates/mobileNum/mobileNumTemplate */ "./src/templatemanager/demo-templates/mobileNum/mobileNumTemplate.ts");
/* harmony import */ var _demo_templates_otp_otpTemplate__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./demo-templates/otp/otpTemplate */ "./src/templatemanager/demo-templates/otp/otpTemplate.ts");
/* harmony import */ var _demo_templates_trackOrder_trackOrderTemplate__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./demo-templates/trackOrder/trackOrderTemplate */ "./src/templatemanager/demo-templates/trackOrder/trackOrderTemplate.ts");
/* harmony import */ var _demo_templates_travelCardCarousel_travelCardCarouselTemplate__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./demo-templates/travelCardCarousel/travelCardCarouselTemplate */ "./src/templatemanager/demo-templates/travelCardCarousel/travelCardCarouselTemplate.ts");
/* harmony import */ var _demo_templates_productsCarousel_productsCarouselTemplate__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./demo-templates/productsCarousel/productsCarouselTemplate */ "./src/templatemanager/demo-templates/productsCarousel/productsCarouselTemplate.ts");




















//demo custom templates start//















//demo custom templates end//
// import './customTemplate.css';
// import '../../../libs/purejscarousel.css';
//(function($){
var TemplateManager = /** @class */ (function () {
    function TemplateManager(hostInstance) {
        this.hostInstance = hostInstance; //chatwindowInstance|SearchSDK Instance|WidgetSDK Instanse
        // this.helpers = null;
        // this.extension = null;
        this.templates = [];
        this.installDefaultTemplates();
    }
    TemplateManager.prototype.installTemplate = function (template) {
        this.templates.push(template);
        template.hostInstance = this.hostInstance;
    };
    ;
    TemplateManager.prototype.installDefaultTemplates = function () {
        this.installTemplate(new _templates_button_buttonTemplate__WEBPACK_IMPORTED_MODULE_0__["default"]());
        this.installTemplate(new _templates_listTemplate_listTemplate__WEBPACK_IMPORTED_MODULE_1__["default"]());
        this.installTemplate(new _templates_quickReplyTemplate_quickReplyTemplate__WEBPACK_IMPORTED_MODULE_2__["default"]());
        this.installTemplate(new _templates_templateAttachment_templateAttachment__WEBPACK_IMPORTED_MODULE_3__["default"]());
        this.installTemplate(new _templates_tableTemplate_tableTemplate__WEBPACK_IMPORTED_MODULE_4__["default"]());
        this.installTemplate(new _templates_checkBoxesTemplate_checkBoxesTemplate__WEBPACK_IMPORTED_MODULE_5__["default"]());
        this.installTemplate(new _templates_dropdownTemplate_dropdownTemplate__WEBPACK_IMPORTED_MODULE_6__["default"]());
        this.installTemplate(new _templates_likeDislikeTemplate_likeDislikeTemplate__WEBPACK_IMPORTED_MODULE_7__["default"]());
        this.installTemplate(new _templates_formTemplate_formTemplate__WEBPACK_IMPORTED_MODULE_8__["default"]());
        this.installTemplate(new _templates_advancedMultiSelect_advancedMultiSelect__WEBPACK_IMPORTED_MODULE_9__["default"]());
        this.installTemplate(new _templates_tableListTemplate_tableListTemplate__WEBPACK_IMPORTED_MODULE_10__["default"]());
        this.installTemplate(new _templates_ratingTemplate_ratingTemplate__WEBPACK_IMPORTED_MODULE_11__["default"]());
        this.installTemplate(new _templates_listWidgetTemplate_listWidgetTemplate__WEBPACK_IMPORTED_MODULE_12__["default"]());
        this.installTemplate(new _templates_carouselTemplate_carouselTemplate__WEBPACK_IMPORTED_MODULE_13__["default"]());
        this.installTemplate(new _templates_miniTableTemplate_miniTableTemplate__WEBPACK_IMPORTED_MODULE_14__["default"]());
        this.installTemplate(new _templates_listViewTemplate_listViewTemplate__WEBPACK_IMPORTED_MODULE_15__["default"]());
        this.installTemplate(new _templates_systemTemplate_systemTemplate__WEBPACK_IMPORTED_MODULE_16__["default"]());
        this.installTemplate(new _templates_advancedListTemplate_advancedListTemplate__WEBPACK_IMPORTED_MODULE_17__["default"]());
        this.installTemplate(new _templates_cardTemplate_cardTemplate__WEBPACK_IMPORTED_MODULE_18__["default"]());
        this.installTemplate(new _demo_templates_cancelConfirmation_cancelConfirmationTemplate__WEBPACK_IMPORTED_MODULE_19__["default"]());
        this.installTemplate(new _demo_templates_cancelOrder_cancelOrderTemplate__WEBPACK_IMPORTED_MODULE_20__["default"]());
        this.installTemplate(new _demo_templates_cardPayment_cardPaymentTemplate__WEBPACK_IMPORTED_MODULE_21__["default"]());
        this.installTemplate(new _demo_templates_cardPaymentCarousel_cardPaymentCarouselTemplate__WEBPACK_IMPORTED_MODULE_22__["default"]());
        this.installTemplate(new _demo_templates_confirmCardPayment_confirmCardPaymentTemplate__WEBPACK_IMPORTED_MODULE_23__["default"]());
        this.installTemplate(new _demo_templates_createNewCardPin_createNewCardPinTemplate__WEBPACK_IMPORTED_MODULE_24__["default"]());
        this.installTemplate(new _demo_templates_debitCardDetails_debitCardDetailsTemplate__WEBPACK_IMPORTED_MODULE_25__["default"]());
        this.installTemplate(new _demo_templates_enterEmail_enterEmailTemplate__WEBPACK_IMPORTED_MODULE_26__["default"]());
        this.installTemplate(new _demo_templates_enterOtp_enterOtpTemplate__WEBPACK_IMPORTED_MODULE_27__["default"]());
        this.installTemplate(new _demo_templates_guidedTour_guidedTourTemplate__WEBPACK_IMPORTED_MODULE_28__["default"]());
        this.installTemplate(new _demo_templates_mobileNum_mobileNumTemplate__WEBPACK_IMPORTED_MODULE_29__["default"]());
        this.installTemplate(new _demo_templates_otp_otpTemplate__WEBPACK_IMPORTED_MODULE_30__["default"]());
        this.installTemplate(new _demo_templates_trackOrder_trackOrderTemplate__WEBPACK_IMPORTED_MODULE_31__["default"]());
        this.installTemplate(new _demo_templates_travelCardCarousel_travelCardCarouselTemplate__WEBPACK_IMPORTED_MODULE_32__["default"]());
        this.installTemplate(new _demo_templates_productsCarousel_productsCarouselTemplate__WEBPACK_IMPORTED_MODULE_33__["default"]());
        this.installTemplate(new _templates_iframeTemplate_iframeTemplate__WEBPACK_IMPORTED_MODULE_34__["default"]());
    };
    TemplateManager.prototype.renderMessage = function (msgData) {
        var messageHtml = '';
        var me = this;
        var templatesIndex = 0;
        if (me.templates.length) {
            while (!messageHtml && templatesIndex < me.templates.length) {
                var template = me.templates[templatesIndex];
                if (template.renderMessage) {
                    messageHtml = template.renderMessage.call(template, msgData);
                }
                templatesIndex++;
            }
            if (messageHtml) {
                return messageHtml;
            }
        }
        return messageHtml;
    };
    return TemplateManager;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TemplateManager);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("634401c13f6a40c2dedf")
/******/ })();
/******/ 
/******/ }
)
//# sourceMappingURL=hot-update.js.map