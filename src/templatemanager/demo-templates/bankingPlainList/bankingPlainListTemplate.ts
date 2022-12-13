
import helpers from '../../../utils/helpers';
import './bankingPlainListTemplate.scss';
class BankingPlainListTemplate {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let helpersObj = helpers;
        if (msgData?.message?.[0]?.component?.payload?.template_type === "bankingPlainList") {
              me.messageHtml = $(BankingPlainListTemplate.prototype.getTemplateString()).tmpl(msgData?.message[0].component?.payload);
            return me.messageHtml;
        }
    }

    getTemplateString() {
        var bankingPlainListTemplate = {
            "id": 1,
            "template": '<script>\
                          <div class="accordions-data-content-bt">\
                            <div class="main-title">{{if isSearch == true}}Top FAQs{{else}}FAQs{{/if}}</div>\
                            {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
                            <div class="accr-template-b">\
                              <div class="accordion click-to-navigate-url faqs-shadow">{{html helpers.convertMDtoHTML(data.heading)}} <img src="images/banking/carrotright-black.svg" class="arrow-left"></div>\
                              <div class="panel">\
                                <div class="acc-inner-content">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                              </div>\
                            </div>\
                            {{/each}}\
                            <div class="show-more-list {{if doc_count==0 || doc_count<6 || isLiveSearch || isSearch}}display-none{{/if}}" groupName="${groupName}" templateName="${templateName}" pageNumber="${pageNumber}" fieldName="${fieldName}">\
                            <div class="searchassist-show-more-button">Show more <img src="{{if devMode}}assets/web-kore-sdk/demo/{{/if}}images/show_more.png" height="6" width="10" /></div>\
                            </div>\
                          </div>\
                        </script>',
            "layoutType": "l3",
            "templateType": "list"
          }
          return bankingPlainListTemplate.template;
    }
    
}

export default BankingPlainListTemplate;