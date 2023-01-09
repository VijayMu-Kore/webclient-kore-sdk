
import helpers from '../../../utils/helpers';
import './siemensFeatureSnippetTemplate.scss';
class SiemensFeatureSnippetTemplate {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let helpersObj = helpers;
        if (msgData?.message?.[0]?.component?.payload?.template_type === "siemensFeatureSnippet") {
          me.messageHtml = $(SiemensFeatureSnippetTemplate.prototype.getTemplateString()).tmpl(msgData?.message[0].component?.payload);
            return me.messageHtml;
        }
    }

    getTemplateString() {
        var siemensFeatureSnippet =  '<script>\
            <div class="messageBubble siemens-snippet-left">\
              <div class="messageBubble-content">\
                  <div class="botImg">\
                      <img class="default-bot-icon" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Icons/bubble_icon.svg">\
                      <img class="default-bot-siemens-icon" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Siemenss_demo/siemens-avatar.svg">\
                  </div>\
                  <div class="botMessage">Sure, I can help with creating an RFQ. Its just ${structuredData[0].carouselData.length} easy steps.</div>\
                  <div class="botMessage">Prior to this youll need to have successfully applied for an account on SCM STAR in DirX</div>\
                  <div class="botMessage">\
                      <div class="heading-inside-bubble">${structuredData[0].heading}:</div>\
                      <ul class="ul-siemens">\
                        {{each(key, tour) structuredData[0].carouselData}}\
                        {{if tour.has_subelements===false}}\
                        <li>{{html helpers.convertMDtoHTML(tour.title)}}</li>\
                        {{/if}}\
                        {{/each}}\
                    </ul>\
                  </div>\
                  <div class="botMessage source-content">Source: www.scmprocure.com/how</div>\
                  <div class="botMessage takea-tour">\
                    <div class="tour-title">Take a tour <img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Siemenss_demo/arrow-right.svg"></div>\
                  </div>\
              </div>\
            </div>\
          </script>';
          return siemensFeatureSnippet;
    }
    
}

export default SiemensFeatureSnippetTemplate;