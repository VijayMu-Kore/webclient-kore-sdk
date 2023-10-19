self["webpackHotUpdatekore_web_sdk"]("esm",{

/***/ "./src/templatemanager/templates/searchPDFJSTemplate/searchPDFJSTemplate.ts":
/*!**********************************************************************************!*\
  !*** ./src/templatemanager/templates/searchPDFJSTemplate/searchPDFJSTemplate.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var pdfjs_dist__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pdfjs-dist */ "./node_modules/pdfjs-dist/build/pdf.js");
/* harmony import */ var pdfjs_dist__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pdfjs_dist__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SearchPDFJSTemplate_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SearchPDFJSTemplate.scss */ "./src/templatemanager/templates/searchPDFJSTemplate/SearchPDFJSTemplate.scss");


var pageNumber = 1, page_url = '', gloabl$ = null, canvasHeight = 300;
var SearchPDFJSTemplate = /** @class */ (function () {
    function SearchPDFJSTemplate() {
    }
    SearchPDFJSTemplate.prototype.renderMessage = function (msgData) {
        var _a, _b, _c;
        var me = this;
        var $ = me.$;
        gloabl$ = $;
        // me.helpersObj = helpers?.helpers;
        if ((msgData === null || msgData === void 0 ? void 0 : msgData.message.length) && ((_b = (_a = msgData === null || msgData === void 0 ? void 0 : msgData.message[0].component) === null || _a === void 0 ? void 0 : _a.payload) === null || _b === void 0 ? void 0 : _b.template_type) == 'pdfJSTemplate') {
            page_url = "https://searchassist-app.kore.ai/searchassistapi/getMediaStream/findly/f-19502387-6ebc-50ee-8e6d-46e9780b6345.pdf?n=3604641969&s=Ing1Z21LY29uZE1KY1F2R01pVkc1bENxbVlTMTlMTm45UnRsVGRZYS9CbGc9Ig$$#page=14";
            SearchPDFJSTemplate.prototype.showPdfFile(); //msgData?.message[0]?.component?.payload?.url
            me.messageListHtml = $(SearchPDFJSTemplate.prototype.getTemplateString()).tmpl((_c = msgData === null || msgData === void 0 ? void 0 : msgData.message[0].component) === null || _c === void 0 ? void 0 : _c.payload);
            SearchPDFJSTemplate.prototype.bindEvents(me, me.messageListHtml);
            return me.messageListHtml;
        }
    };
    SearchPDFJSTemplate.prototype.getTemplateString = function () {
        var searchListTemplates = '<script type="text/x-jqury-tmpl">\
    <div class="search-pdfjs-container">\
      <div class="search-pdfjs-sub-container">\
      <div class="search-pdfjs-header">\
      <div class="search-pdfjs-btn">\
       <div id="prev-btn">Previous</div>\
       <div class="input-number"><input type="number" id="numberTextId" value="1" /></div>\
       <div id="next-btn">Next</div>\
       </div>\
       <div class="search-pdfjs-zoom-btn">\
       <span id="zoomOutId">Zoom Out</span>\
        <span id="zoomInId">Zoom In</span>\
       </div>\
      <div class="search-pdf-close-btn">\
       close\
      </div>\
    </div>\
    <div class="search-pdfjs-template">\
      <canvas id="the-canvas" class="search-pdfjs-canvas"></canvas>\
    </div>\
      </div>\
    </div>\
  </script>';
        return searchListTemplates;
    };
    SearchPDFJSTemplate.prototype.showPdfFile = function () {
        pdfjs_dist__WEBPACK_IMPORTED_MODULE_0__.GlobalWorkerOptions.workerSrc = '../../../../node_modules/pdfjs-dist/build/pdf.worker.js';
        // Asynchronous download of PDF
        var loadingTask = pdfjs_dist__WEBPACK_IMPORTED_MODULE_0__.getDocument(page_url);
        loadingTask.promise.then(function (pdf) {
            pdf.getPage(pageNumber).then(function (page) {
                var viewport = page.getViewport({ scale: 5 });
                var canvas = document.getElementById('the-canvas');
                var context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                // Render PDF page into canvas context
                var renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                var renderTask = page.render(renderContext);
                renderTask.promise.then(function () {
                    SearchPDFJSTemplate.prototype.scrollToTopEvent();
                    gloabl$('#numberTextId')[0].value = pageNumber;
                });
            });
        }, function (reason) {
            // PDF loading error
            console.error(reason);
        });
    };
    SearchPDFJSTemplate.prototype.scrollToTopEvent = function () {
        gloabl$('.search-pdfjs-template').scrollTop(0);
    };
    // appendValueNumber(){
    //   gloabl$('#numberTextId').value=pageNumber;
    // }
    SearchPDFJSTemplate.prototype.bindEvents = function (me, messageHtml) {
        var $ = me.$;
        $(messageHtml).off('click', '.search-pdf-close-btn').on('click', '.search-pdf-close-btn', function (event) {
            $('.search-pdfjs-container').remove();
            pageNumber = 1;
            gloabl$ = null;
        });
        $(messageHtml).off('click', '#prev-btn').on('click', '#prev-btn', function (event) {
            if (pageNumber > 1) {
                pageNumber--;
                SearchPDFJSTemplate.prototype.showPdfFile();
            }
        });
        $(messageHtml).off('click', '#next-btn').on('click', '#next-btn', function (event) {
            pageNumber++;
            SearchPDFJSTemplate.prototype.showPdfFile();
        });
        $(messageHtml).off('keyup', '#numberTextId').on('keyup', '#numberTextId', function (event) {
            var _a;
            if ((event === null || event === void 0 ? void 0 : event.keyCode) === 13) {
                pageNumber = Number((_a = event === null || event === void 0 ? void 0 : event.currentTarget) === null || _a === void 0 ? void 0 : _a.value);
                SearchPDFJSTemplate.prototype.showPdfFile();
                canvasHeight = 300;
            }
        });
        $(messageHtml).off('click', '#zoomInId').on('click', '#zoomInId', function (event) {
            canvasHeight = canvasHeight + 40;
            $('.search-pdfjs-canvas')[0].style.height = canvasHeight + '%';
        });
        $(messageHtml).off('click', '#zoomOutId').on('click', '#zoomOutId', function (event) {
            canvasHeight = canvasHeight - 40;
            if (canvasHeight > 300)
                $('.search-pdfjs-canvas')[0].style.height = canvasHeight + '%';
        });
    };
    return SearchPDFJSTemplate;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SearchPDFJSTemplate);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("88b9ba198d34a4aa850f")
/******/ })();
/******/ 
/******/ }
)
//# sourceMappingURL=hot-update.js.map