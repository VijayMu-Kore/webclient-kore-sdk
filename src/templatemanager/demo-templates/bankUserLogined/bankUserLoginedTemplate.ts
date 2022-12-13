
import helpers from '../../../utils/helpers';
import './bankUserLoginedTemplate.scss';
class BankUserLoginedTemplate {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let helpersObj = helpers;
        if (msgData?.message?.[0]?.component?.payload?.template_type === "bankUserLogined") {
            me.messageHtml = $(BankUserLoginedTemplate.prototype.getTemplateString()).tmpl(msgData?.message[0].component?.payload);
            return me.messageHtml;
        }
    }

    getTemplateString() {
        var bankingUsecaseListCarouselTemplate = {
            "id": 1,
            "template": '<script type="text/x-jqury-tmpl">\
            <div class="banking-demo-list">\
            <div class="title-text-heading {{if renderTitle}}display-block{{else}}display-none{{/if}}">${titleName}</div>\
              {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
                <div class="banking-list-template">\
                  <div class="icon-with-title">\
                    <img class="banking-title-icon" src="images/banking/icon1.svg">\
                    <span class="name-title"title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</span>\
                    <span class="redirecting-link">\
                      <a href="${data.url}" target="_blank"><img class="banking-link-icon" src="images/banking/externallink-gray.svg"></a>\
                    </span>\
                  </div>\
                  <div class="info-test-content four-line-description">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                  {{if data.carouselData && data.carouselData.length}}\
                  <div class="title-heading-banking {{if data.subtitle}}display-block{{else}}display-none{{/if}}">${data.subtitle}</div>\
                  <div class="banking-carousel-template-data">\
                    <div class="carousel bankCarouselId${key+1}">\
                      {{each(key, subData) data.carouselData}}\
                        <div class="slide">\
                          <div class="inner-content-list">\
                            <div class="img-block-with-text">\
                                <div class="img-block">\
                                    <img src="${subData.image}">\
                                </div>\
                                <div class="text-content">\
                                    <div class="main-heading text-truncate">{{html helpers.convertMDtoHTML(subData.title)}}</div>\
                                    <div class="stars">\
                                      <span>${subData.rating}</span>\
                                      <img src="images/banking/star-fill.svg">\
                                      <img src="images/banking/star-fill.svg">\
                                      <img src="images/banking/star-fill.svg">\
                                      <img src="images/banking/star-fill.svg">\
                                      <img src="images/banking/star-unfil.svg">\
                                    </div>\
                                    <div class="info-content two-line-description">{{html helpers.convertMDtoHTML(subData.preview_text)}}</div>\
                                </div>\
                            </div>\
                            <div class="chips-data">\
                            {{each(i, chipText) subData.chips}}\
                              <div class="chip-name">${chipText}</div>\
                              {{/each}}\
                            </div>\
                          </div>\
                      </div>\
                    {{/each}}\
                  </div>\
                </div>\
                {{/if}}\
                </div>\
                {{/each}}\
                <div class="show-more-list {{if doc_count==0 || doc_count<6 || isLiveSearch || isSearch}}display-none{{/if}}" groupName="${groupName}" templateName="${templateName}" pageNumber="${pageNumber}" fieldName="${fieldName}">\
                <div class="searchassist-show-more-button">Show more <img src="{{if devMode}}assets/web-kore-sdk/demo/{{/if}}images/show_more.png" height="6" width="10" /></div>\
                </div>\
              </div>\
            </script>',
            "layoutType": "siemens",
            "templateType": "siemens"
          }
          return bankingUsecaseListCarouselTemplate.template;
    }
    
}

export default BankUserLoginedTemplate;