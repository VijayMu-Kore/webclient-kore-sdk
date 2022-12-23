
import helpers from '../../../utils/helpers';
import './cosmeticsProductTemplate.scss';
class CosmeticsProductTemplate {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let hostWindowInstance = me.hostInstance;
        let helpersObj = helpers;
        if (msgData?.message?.[0]?.component?.payload?.template_type === "cosmeticsProduct") {
          me.messageHtml = $(CosmeticsProductTemplate.prototype.getTemplateString()).tmpl(msgData?.message[0].component?.payload);
        hostWindowInstance.getProductPreview(me.messageHtml);
        CosmeticsProductTemplate.prototype.bindEvents(me, me.messageHtml);
          return me.messageHtml;
        }
    }

    getTemplateString() {
        var cosmeticsProductTemplate = {
            "id": 16,
            'template': '<script type="text/x-jqury-tmpl">\
            <div class="cosmetics-grid-template2">\
                  <div class="heading-template-viewall">\
                    <span class="heading-text">${titleName}</span>\
                    <span class="view-all hide">View all</span>\
                  </div>\
                  <div class="arrivals-grids-template parent-grid-template">\
                  {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
                    <div class="slide-gride cosmetics-product-view" data-prod-cat="${data.prod_cat}" data-img="${data.img}" data-title="{{html helpers.convertMDtoHTML(data.heading)}}" data-info="{{html helpers.convertMDtoHTML(data.description)}}" data-price="${data.prod_price}" data-orig-price="${data.prod_original_price}" data-percentage-offer="${data.prod_percentage_offer}" data-bestseller="${data.bestseller}" data-newarrival="${data.newarrival}">\
                      <div class="inner-content-data">\
                        <div class="img-block">\
                          <div class="add-to-bag">\
                            <img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Cosmetics_demo/bag.svg">\
                            <span>Add to Bag</span>\
                          </div>\
                          <img class="banner-img" src="${data.img}">\
                          <div class="wishlist">\
                            <img class="dflt-wish-img" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Cosmetics_demo/wishlist.svg">\
                            <img class="wish-img-fill" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Cosmetics_demo/wish-fill.svg">\
                          </div>\
                        </div>\
                        <div class="content-block">\
                        <div class="type-tag sponsered {{if data.sponsered == true}} display-inline-block{{else}}display-none{{/if}}"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Cosmetics_demo/info.svg">Sponsered</div>\
                          <div class="type-tag  {{if data.bestseller == true}} display-inline-block{{else}}display-none{{/if}}">Best Seller</div>\
                          <div class="type-tag offer {{if data.newarrival == true}} display-inline-block{{else}}display-none{{/if}}">New</div>\
                          <div class="type-tag offer">${data.prod_percentage_offer}</div>\
                          <div class="title">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                          <div class="text-desc">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                          <div class="amount-info">${data.prod_price}</div>\
                          <div class="amount-info strike-text">${data.prod_original_price}</div>\
                        </div>\
                      </div>\
                    </div>\
                    {{/each}}\
                    <div class="show-more-list {{if doc_count==0 || doc_count<(maxSearchResultsAllowed+1) || isLiveSearch || isSearch}}display-none{{/if}}" groupName="${groupName}" templateName="${templateName}" pageNumber="${pageNumber}" fieldName="${fieldName}">\
                    <div class="searchassist-show-more-button">Show more <img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Banking_demo/show_more.png" height="6" width="10" /></div>\
                    </div>\
                  </div>\
                  </div>\
            </script>',
            "layoutType": "tileWithCarousel",
            "templateType": "carousel"
          }
          return cosmeticsProductTemplate.template
    }

    bindEvents(me:any, messageHtml: any) {
      let hostWindowInstance = me.hostInstance;
      let $ = me.hostInstance.$;
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
      
      const listHTML = $(CosmeticsProductTemplate.prototype.getTemplateString()).tmpl(result?.message[0].component.payload);
      $(listHTML).find(".show-more-list").remove();
      $(
        ".full-search-data-container [templateName=" +
        showMoreData.templateName +
        "]"
      ).before($(listHTML).find(".parent-grid-template").children());
      if ((Number($(".full-search-data-container [templateName=" + showMoreData.templateName + "]").attr('pageNumber')) + 1) * result?.message[0].component.payload.maxSearchResultsAllowed >= result?.message[0].component.payload.doc_count) {
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

export default CosmeticsProductTemplate;