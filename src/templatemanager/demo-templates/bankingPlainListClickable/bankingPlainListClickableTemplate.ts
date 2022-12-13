
import helpers from '../../../utils/helpers';
import './bankingPlainListClickableTemplate.scss';
class BankingPlainListClickableTemplate {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let helpersObj = helpers;
        if (msgData?.message?.[0]?.component?.payload?.template_type === "bankingPlainListClickable") {
              me.messageHtml = $(BankingPlainListClickableTemplate.prototype.getTemplateString()).tmpl(msgData?.message[0].component?.payload);
            return me.messageHtml;
        }
    }

    getTemplateString() {
        var bankingPlainListClickableTemplate = {
            "id": 1,
            "template": '<script>\
                        <div class="results-web-content">\
                          <div class="main-title">Web Results</div>\
                          {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
                          <div class="external-link-block">\
                            <a target="_blank" href="${data.url}" class="click-to-navigate-url faqs-shadow isClickable"  title="${data.heading}"><img src="images/banking/externallink-gray.svg"></a>\
                            <div class="title" title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
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
          return bankingPlainListClickableTemplate.template;
    }
    
}

export default BankingPlainListClickableTemplate;