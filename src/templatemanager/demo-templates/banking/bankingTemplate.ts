
import helpers from '../../../utils/helpers';
import './bankingTemplate.scss';
class BankingTemplate {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let helpersObj = helpers;
        if (msgData?.message?.[0]?.component?.payload?.template_type === "banking") {
            me.messageHtml = $(BankingTemplate.prototype.getTemplateString()).tmpl(msgData?.message[0].component?.payload);
            return me.messageHtml;
        }
    }

    getTemplateString() {
        var bankingUsecaseTemplate = {
            "id": 1,
            "template": '<script type="text/x-jqury-tmpl">\
            <div class="banking-demo-list">\
            <div class="title-text-heading {{if renderTitle}}display-block{{else}}display-none{{/if}}">${titleName}</div>\
            {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
              <div class="banking-list-template redirecting-link click-to-navigate-url isClickable" href="${data.url}" target="_blank">\
                <div class="icon-with-title">\
                  <img  class="banking-title-icon" src="images/banking/icon1.svg">\
                  <span class="name-title">{{html helpers.convertMDtoHTML(data.heading)}}</span>\
                  <span class="redirecting-link">\
                  <a href="${data.url}" target="_blank"><img  class="banking-link-icon" src="images/banking/externallink-gray.svg"></a>\
                  </span>\
                </div>\
                <div class="info-test-content four-line-description">{{html helpers.convertMDtoHTML(data.description)}}</div>\
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
          return bankingUsecaseTemplate.template;
    }
    
}

export default BankingTemplate;