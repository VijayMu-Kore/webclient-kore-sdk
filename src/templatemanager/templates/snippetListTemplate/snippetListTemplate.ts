
import helpers from '../../../utils/helpers';
import './snippetListTemplate.scss';
class SnippetListTemplate {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let helpersObj = helpers;

        if (msgData?.message?.[0]?.component?.payload?.template_type === "list_element_snippet" || msgData?.message?.[0]?.component?.payload?.template_type === "heading_snippet") {
            me.messageHtml = $(me.getTemplateString()).tmpl({
                'snippetData': msgData?.message?.[0]?.component?.payload,
                'helpers': helpersObj.helpers
            });
            me.bindSnippetEvents(me.messageHtml);
            return me.messageHtml;
        }
    }
    getTemplateString() {
        var snippetListTemplate = '<script type="text/x-jqury-tmpl">\
        {{if snippetData.template_type =="list_element_snippet" || snippetData.template_type =="heading_snippet"}}\
        <div class="search-temp-one list-snippet-temp">\
        <div class="top-header">\
            <div class="top-header-with-img">\
                <span class="logo-span"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/snippet-avathar.svg"/></span>\
                <div class="btn-chip">SUGGESTED ANSWER</div>\
            </div>\
            {{if snippetData && snippetData.source === "Answered by AI"}}\
            <div class="btn-link"><span class="bot-bg-purple"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/bot.svg"/></span>ANSWERED BY AI</div>\
            {{/if}}\
        </div>\
        <div class="list-temp-block">\
            <div class="list-temp-header">{{html snippetData?.title}}</div>\
                <ol type="1" class="list-temp-ul">\
                {{each(key, answer) snippetData.answer}}\
                    <li class="list-temp-li">{{html answer}}</li>\
                    {{/each}}\
                </ol>\
                {{if snippetData.answer.length > 4}}\
                <span class="desc-read-more display-block"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/show-more.svg" />Read more</span> <span class="desc-read-less  display-none"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/show-more.svg" />Show Less</span>\
                {{/if}}\
        </div>\
        {{if snippetData && snippetData.source !== "Answered by AI"}}\
          <div class="snippet-source-block">\
            <div class="snippet-source-file-name  {{if !snippetData.source}} display-none {{/if}}">{{html snippetData?.source}}</div>\
            <div class="snippet-source-url {{if !snippetData.page_url}} display-none {{/if}}"><span class="snippet-source-url-name">${snippetData?.page_url}</span><a href="${snippetData?.page_url}" target="_blank" target="_blank"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Icons/external-link.svg"/></a> </div>\
          </div>\
        {{/if}}\
        <div class="temp-footer-block">\
            <div class="temp-footer {{if snippetData && snippetData.source !== "Answered by AI"}} justify-content-end {{/if}}">\
                {{if snippetData && snippetData.source === "Answered by AI"}}\
                <div class="btn-link"><span class="bot-bg-purple"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/bot.svg"/></span>ANSWERED BY AI</div>\
                {{/if}}\
                <div class="temp-right">\
                    <div class="is-it-usefull">Is it useful?</div>\
                    <div class="temp-fotter-actions">\
                        <img  class="snippet-feedback  snippet-like-img" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/like-gray.svg" />\
                        <img  class="snippet-feedback  snippet-dislike-img" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/snippet_imgs/dislike-gary.svg" />\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>\
        {{/if}}\
          </script>';
        return snippetListTemplate;
    }
    bindSnippetEvents(messageHtml:any){
        $(messageHtml).find('.search-temp-one').off('click', '.snippet-feedback').on('click', '.snippet-feedback', function (event) {
          $(messageHtml).find('.snippet-feedback').removeClass('active');
          $(event.currentTarget).addClass('active');
        });
        
         if(messageHtml &&  $(messageHtml).find('.search-temp-one').find('.list-temp-ul').length){
          $(messageHtml).find('.search-temp-one').off('click', '.desc-read-more').on('click', '.desc-read-more', function (event) {
            $(messageHtml).find('.list-temp-ul').addClass('show-all-list');
            $(messageHtml).find('.desc-read-more').removeClass('display-block').addClass('display-none');
            $(messageHtml).find('.desc-read-less').removeClass('display-none').addClass('display-block');
          });
          $(messageHtml).find('.search-temp-one').off('click', '.desc-read-less').on('click', '.desc-read-less', function (event) {
            $(messageHtml).find('.list-temp-ul').removeClass('show-all-list');
            $(messageHtml).find('.desc-read-less').removeClass('display-block').addClass('display-none');
            $(messageHtml).find('.desc-read-more').removeClass('display-none').addClass('display-block');
          });
        }
        
      }
}

export default SnippetListTemplate;