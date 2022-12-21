
import helpers from '../../../utils/helpers';
import PureJSCarousel from '../../../libs/purejscarousel/purejscarousel';
import './cosmeticsTemplate.scss';
class CosmeticsTemplate {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let hostWindowInstance = me.hostInstance;
        let helpersObj = helpers;
        if (msgData?.message?.[0]?.component?.payload?.template_type === "cosmetics") {
          me.messageHtml = $(CosmeticsTemplate.prototype.getTemplateString()).tmpl(msgData?.message[0].component?.payload);
          hostWindowInstance.getProductPreview(me.messageHtml);
          if(msgData?.message[0].component?.payload.isSearch  || msgData?.message[0].component?.payload.isLiveSearch){
            setTimeout(() => {
              CosmeticsTemplate.prototype.bindEvents(me.messageHtml, 'cosmeticsCarouselId', me);
          }, 500)
          }
          CosmeticsTemplate.prototype.showMoreClickEvents(me.messageHtml, me);
            return me.messageHtml;
        }
    }

    getTemplateString() {
        var cosmeticsTemplate = {
            "id": 15,
            'template': '<script type="text/x-jqury-tmpl">\
                  {{if isSearch == true || isLiveSearch == true}}\
                  <div class="botMessage seller-carousels">\
                    <div class="heading- {{if renderTitle}}display-block{{else}}display-none{{/if}}">${titleName}</div>\
                      <div class="carousel-cosmotics-sellers carousel {{if isSearch == true || isLiveSearch == true}}cosmeticsCarouselId{{/if}}">\
                      {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
                        <div class="slide cosmetics-product-view" data-prod-cat="${data.prod_cat}" data-img="${data.img}" data-title="{{html helpers.convertMDtoHTML(data.heading)}}" data-info="{{html helpers.convertMDtoHTML(data.description)}}" data-price="${data.prod_price}" data-orig-price="${data.prod_original_price}" data-percentage-offer="${data.prod_percentage_offer}" data-bestseller="${data.bestseller}" data-newarrival="${data.newarrival}" >\
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
                              <img src="${data.img}">\
                            </div>\
                            <div class="info-data">\
                              <div class="title">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                            </div>\
                            <div class="product-info">{{html helpers.convertMDtoHTML(data.description)}}</div>\
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
                  {{/if}}\
                  {{if isFullResults == true }}\
                  <div class="botMessage seller-carousels">\
                  <div class="heading- {{if renderTitle}}display-block{{else}}display-none{{/if}}">${titleName}</div>\
                    <div class="carousel-cosmotics-sellers-grid parent-grid-template">\
                    {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
                    <div class="slide-grid cosmetics-product-view" data-prod-cat="${data.prod_cat}" data-img="${data.img}" data-title="{{html helpers.convertMDtoHTML(data.heading)}}" data-info="{{html helpers.convertMDtoHTML(data.description)}}" data-price="${data.prod_price}" data-orig-price="${data.prod_original_price}" data-percentage-offer="${data.prod_percentage_offer}" data-bestseller="${data.bestseller}" data-newarrival="${data.newarrival}">\
                      <div class="inner-data">\
                      <div class="best-sellar {{if  data.bestseller == true}}display-inline-block{{else}}display-none{{/if}}">Best Seller</div>\
                      <div class="new-arrival {{if  data.newarrival == true}}display-inline-block{{else}}display-none{{/if}}">New</div>\
                        <div class="img-block">\
                          <div class="wishlist">\
                            <img class="dflt-wish-img" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Cosmetics_demo/wishlist.svg">\
                            <img class="wish-img-fill" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Cosmetics_demo/wish-fill.svg">\
                          </div>\
                          <div class="add-to-bag">\
                            <img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Cosmetics_demo/bag.svg">\
                            <span>Add to Bag</span>\
                          </div>\
                          <img src="${data.img}">\
                        </div>\
                        <div class="info-data">\
                          <div class="title">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                        </div>\
                        <div class="product-info">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                        <div class="amount-info">\
                          <div class="amount-">${data.prod_price}</div>\
                          <div class="amout-strike">${data.prod_original_price}</div>\
                          <div class="off-info">${data.prod_percentage_offer}</div>\
                        </div>\
                      </div>\
                    </div>\
                    {{/each}}\
                    <div class="show-more-list {{if doc_count==0 || doc_count<6 || isLiveSearch || isSearch}}display-none{{/if}}" groupName="${groupName}" templateName="${templateName}" pageNumber="${pageNumber}" fieldName="${fieldName}">\
                    <div class="searchassist-show-more-button">Show more <img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Banking_demo/show_more.png" height="6" width="10" /></div>\
                    </div>\
                  </div>\
                    </div>\
                  {{/if}}\
      </script>',
            "layoutType": "tileWithCarousel",
            "templateType": "carousel"
          }
          return cosmeticsTemplate.template
    }
    bindEvents(messageHtml:any, carouselId:string, me:any){
      let $ = me.hostInstance.$;
      //carousel events

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
        let carouselOneByOne:any = new PureJSCarousel({
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
  }
  showMoreClickEvents(messageHtml:any, me:any){
    let hostWindowInstance:any = me.hostInstance;
    let $ = me.hostInstance.$;
      //show more click event//
      $(messageHtml)
      .off("click", ".show-more-list")
      .on("click", ".show-more-list", function (e: any) {
      const showMoreData = {
        groupName: $(e.currentTarget).attr("groupName"),
        templateName: $(e.currentTarget).attr("templateName"),
        pageNumber: Number($(e.currentTarget).attr("pageNumber")) + 1,
        fieldName: $(e.currentTarget).attr("fieldName"),
      };
      hostWindowInstance.showMoreClick(showMoreData).then((result: any) => {
        const isSearchSDK = document.body.className.match('sdk-body');
        if(result?.message[0].component.payload){
          if(isSearchSDK!==null){
            result.message[0].component.payload.isSearchSDK = true;
          }
          else{
            result.message[0].component.payload.isSearchSDK = false;
          }
        }
        
        const listHTML = $(CosmeticsTemplate.prototype.getTemplateString()).tmpl(result?.message[0].component.payload);
        $(listHTML).find(".show-more-list").remove();
        $(
          ".full-search-data-container [templateName=" +
          showMoreData.templateName +
          "]"
        ).before($(listHTML).find(".parent-grid-template").children());
        if ((Number($(".full-search-data-container [templateName=" + showMoreData.templateName + "]").attr('pageNumber')) + 1) * 5 >= result?.message[0].component.payload.doc_count) {
          $(".full-search-data-container [templateName=" + showMoreData.templateName + "]").hide();
        }
        var dataContainer = '.data-body-sec';
        if ($('body').hasClass('top-down')) {
          dataContainer = '.content-data-sec';
        }
        $(dataContainer).animate({ scrollTop: (+$(dataContainer).scrollTop() + ($(dataContainer).prop("offsetHeight"))) }, 1000);
      })
      $(e.currentTarget).attr("pageNumber", Number($(e.currentTarget).attr("pageNumber")) + 1);
      });
  }
    
}

export default CosmeticsTemplate;