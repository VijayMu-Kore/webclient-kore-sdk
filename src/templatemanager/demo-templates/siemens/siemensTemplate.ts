
import helpers from '../../../utils/helpers';
import './siemensTemplate.scss';
class SiemensTemplate {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let helpersObj = helpers;
        if (msgData?.message?.[0]?.component?.payload?.template_type === "siemens") {
          me.messageHtml = $(SiemensTemplate.prototype.getTemplateString()).tmpl(msgData?.message[0].component?.payload);
            return me.messageHtml;
        }
    }

    getTemplateString() {
        var siemensUsecaseTemplate = {
            "id": 1,
            "template": '<script type="text/x-jqury-tmpl">\
            <div class="siemens-template">\
            {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
            {{if !(data.bestMatch===true)}}\
              <div class="siemens-list-template redirecting-link click-to-navigate-url isClickable" href="${data.doc_confluence_link}" target="_blank">\
                <div class="icon-with-title">\
                  <img src="images/siemens/icon1-blue.svg" class="siemens-icon-blue">\
                  <img src="images/siemens/icon1.svg" class="siemens-icon">\
                  <span class="name-title">{{html helpers.convertMDtoHTML(data.heading)}}</span>\
                  <span class="redirecting-link click-to-navigate-url faqs-shadow isClickable" href="${data.doc_confluence_link}" target="_blank">\
                    <img class="siemens-link-icon" src="images/siemens/externallink-gray.svg">\
                  </span>\
                </div>\
                <div class="info-test-content four-line-description">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                <div class="author-updates-sec">\
                  <div class="author-names">\
                    <span class="author-title">Author:</span>\
                    <span class="author_name">{{html helpers.convertMDtoHTML(data.author)}}</span>\
                  </div>\
                  <div class="updates-on">\
                    <span class="title">Updated on:</span>\
                    <span class="time-updates">{{html helpers.convertMDtoHTML(data.updateBy)}}</span>\
                  </div>\
                </div>\
                <div class="button-chips">\
                  {{each(key, chip) data.chips}}\
                  <button class="btn-chip" style="color:${chip.color};background:${chip.background};border:1px solid ${chip.color}">{{html helpers.convertMDtoHTML(chip.name)}}</button>\
                  {{/each}}\
                </div>\
                </div>\
                {{/if}}\
                {{/each}}\
                <div class="show-more-list {{if doc_count==0 || doc_count<6 || isLiveSearch || isSearch}}display-none{{/if}}" groupName="${groupName}" templateName="${templateName}" pageNumber="${pageNumber}" fieldName="${fieldName}">\
                <div class="searchassist-show-more-button">Show more <img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Banking_demo/show_more.png" height="6" width="10" /></div>\
                </div>\
                </div>\
            </script>',
            "layoutType": "siemens",
            "templateType": "siemens"
          }
        return siemensUsecaseTemplate;
    }
    
}

export default SiemensTemplate;