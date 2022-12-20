
import helpers from '../../../utils/helpers';
import PureJSCarousel from '../../../libs/purejscarousel/purejscarousel';
import './productsCarouselTemplate.scss';
class ProductsCarouselTemplate {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let helpersObj = helpers;
        var extension = '';
        var _extractedFileName = '';
        function strSplit(str:any) {
            return (str.split('.'));
        }
        if (msgData.message && msgData.message[0] && msgData.message[0].cInfo && msgData.message[0].cInfo.attachments) {
            extension = strSplit(msgData.message[0].cInfo.attachments[0].fileName);
        }
        if (msgData.message && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.url) {
            extension = strSplit(msgData.message[0].component.payload.url);
            _extractedFileName = msgData.message[0].component.payload.url.replace(/^.*[\\\/]/, '');
        }
        if (msgData?.message?.[0]?.component?.payload?.template_type === "products_carousel_template") {
            me.messageHtml = $(me.getTemplateString("productCarouselTemplate")).tmpl({
                'msgData': msgData,
                'helpers': helpersObj.helpers,
                'extension': extension
            });
            setTimeout(() => {
              me.bindEvents(me.messageHtml, 'carousel-template');
          }, 500)
            return me.messageHtml;
        }
    }

    getTemplateString() {
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
                    <img class="dflt-wish-img" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Cosmetics_demo/wishlist.svg">\
                    <img class="wish-img-fill" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Cosmetics_demo/wish-fill.svg">\
                  </div>\
                  <div class="add-to-bag">\
                    <img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Cosmetics_demo/bag.svg">\
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
    }
    bindEvents(messageHtml:any, carouselId:string){
      let me :any = this;
      let chatWindowInstance:any = me.hostInstance;
      let $ = me.hostInstance.$;
      let newCarouselTemplateCount = $('.carousel').length;
      newCarouselTemplateCount += 1;
      let newCarouselEles = [];
      if (carouselId) {
        if (messageHtml.find('.' + carouselId + ':last').length) {
          messageHtml.find('.' + carouselId + ':last').addClass("carouselTemplate" + newCarouselTemplateCount);
        } else {
          $('.' + carouselId).last().addClass("carouselTemplate" + newCarouselTemplateCount);
        }
      } else {
          messageHtml.find('.carousel:last').addClass("carouselTemplate" + newCarouselTemplateCount);
      }
      var count = 0;
      if (carouselId) {
        if (messageHtml.find(".carouselTemplate" + newCarouselTemplateCount).length) {
          count = messageHtml.find(".carouselTemplate" + newCarouselTemplateCount).children().length;
        } else {
          count = $(".carouselTemplate" + newCarouselTemplateCount).children().length;
        }
        if (count == 0) {
          count = messageHtml.find(".carouselTemplate" + newCarouselTemplateCount).children().length;
        }
      } else {
        count = messageHtml.find(".carouselTemplate" + newCarouselTemplateCount).children().length;
      }
      if (count > 1) {
        var carouselOneByOne = new PureJSCarousel({
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
        $('.carouselTemplate' + newCarouselTemplateCount + ' .purejscarousel-btn-next').addClass('filterCard-next')

        var initialCard = 0;
        $('.carouselTemplate' + newCarouselTemplateCount).off('click', '.filterCard-next').on('click', '.filterCard-next', function (e:any) {
          initialCard = initialCard + 1;
          chatWindowInstance.filterCardSelected = initialCard;
          // chatWindowInstance.userContextBankCard = JSON.parse(window.localStorage.getItem('cards'))[initialCard];
          // chatWindowInstance.invokeSpecificSearch(chatWindowInstance.selectedFacetFromSearch);
        })
        $('.carouselTemplate' + newCarouselTemplateCount).off('click', '.filterCard-prev').on('click', '.filterCard-prev', function (e:any) {
          initialCard = initialCard - 1;
          chatWindowInstance.filterCardSelected = initialCard;
          // chatWindowInstance.userContextBankCard = JSON.parse(window.localStorage.getItem('cards'))[initialCard];
          // chatWindowInstance.invokeSpecificSearch(chatWindowInstance.selectedFacetFromSearch);
        })
      }
  }
}

export default ProductsCarouselTemplate;