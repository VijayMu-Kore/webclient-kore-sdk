
import helpers from '../../../utils/helpers';
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
                    <div class="carousel-cosmotics-sellers-grid">\
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
                  </div>\
                  <div class="show-more-list {{if doc_count==0 || doc_count<6 || isLiveSearch || isSearch}}display-none{{/if}}" groupName="${groupName}" templateName="${templateName}" pageNumber="${pageNumber}" fieldName="${fieldName}">\
                    <div class="searchassist-show-more-button">Show more <img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Banking_demo/show_more.png" height="6" width="10" /></div>\
                    </div>\
                    </div>\
                  {{/if}}\
      </script>',
            "layoutType": "tileWithCarousel",
            "templateType": "carousel"
          }
          return cosmeticsTemplate.template
    }
    
}

export default CosmeticsTemplate;