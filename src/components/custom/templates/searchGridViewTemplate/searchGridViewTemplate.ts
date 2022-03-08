
import helpers from '../../../../utils/helpers';
import './SearchGridViewTemplate.scss';
class SearchGridViewTemplate {

    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        me.helpersObj = helpers;
        if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component?.payload && msgData.message[0].component?.payload?.template_type == 'searchGridTemplate') {
            if (!msgData.message[0].component.payload.helpers) {
                msgData.message[0].component.payload['helpers'] = me.helpersObj;
              }
            me.messageHtml = $(me.getTemplateString(msgData.message[0].component.payload.template_type)).tmpl(msgData.message[0].component.payload);
            me.bindEvents(me.messageHtml);
            return me.messageHtml;
        }
    }
    bindEvents(messageHtml: any) {
        let me: any = this;
        // let chatWindowInstance = me.cwInstance;
        // let $ = me.cwInstance.$;
    }
    getTemplateString(type: any) {
        const searchGridTemplate = '<script type="text/x-jqury-tmpl">\
        {{if structuredData.length}}\
<div class="title-text-heading {{if renderTitle}}display-block{{else}}display-none{{/if}}">${titleName}</div>\
{{if gridLayoutType==="img_common"}}\
<div class="template-4-grid-list mb-15">\
    {{each(key, data) structuredData.slice(0, 5)}}\
    {{if isClickable == true}}\
    <div class="grid-data-item click-to-navigate-url faqs-shadow isClickable" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">\
        <div class="inner-content-list">\
            <div class="image-with-title">\
                {{if data?.img?.length}}\
                <div class="img-block">\
                    <img src="${data.img}">\
                </div>\
                {{/if}}\
                {{if data?.heading?.length}}\
                <div class="info-title two-line-heading" title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                {{/if}}\
            </div>\
            {{if data?.description?.length}}\
            <div class="title-item two-line-description" title="${data.description}">{{html helpers.convertMDtoHTML(data.description)}}</div>\
            {{/if}}\
        </div>\
    </div>\
    {{/if}}\
    {{if isClickable == false}}\
    <div class="grid-data-item click-to-navigate-url faqs-shadow" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">\
        <div class="inner-content-list">\
            <div class="image-with-title">\
                <div class="img-block">\
                    <img src=${data.img}>\
                </div>\
                <div class="info-title two-line-heading" title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
            </div>\
            <div class="title-item two-line-description" title="${data.description}">{{html helpers.convertMDtoHTML(data.description)}}</div>\
        </div>\
    </div>\
    {{/if}}\
    {{/each}}\
    <div class="show-more-list {{if doc_count==0 || doc_count<6 || isLiveSearch || isSearch}}display-none{{/if}}" groupName="${groupName}" templateName="${templateName}" pageNumber="${pageNumber}" fieldName="${fieldName}">\
        <div>Show more <img src="{{if devMode}}assets/web-kore-sdk/demo/{{/if}}images/show_more.png" height="6" width="10" /></div>\
        {{/if}}\
        {{if gridLayoutType==="img_large"}}\
        <div class="template-5-grid-list mb-15">\
            {{each(key, data) structuredData.slice(0, 5)}}\
            {{if isClickable == true}}\
            <div class="grid-data-item click-to-navigate-url faqs-shadow isClickable" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">\
                <div class="inner-content-list ">\
                    <img src="${data.img}">\
                </div>\
            </div>\
            {{/if}}\
            {{if isClickable == false}}\
            <div class="grid-data-item click-to-navigate-url faqs-shadow" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">\
                <div class="inner-content-list">\
                    <img src="${data.img}">\
                </div>\
            </div>\
            {{/if}}\
            {{/each}}\
        </div>\
        {{/if}}\
        {{if gridLayoutType==="img_left"}}\
        <div class="template-6-grid-list">\
            {{each(key, data) structuredData.slice(0, 5)}}\
            <div class="grid-data-item faqs-shadow isClickable" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">\
                <div class="inner-content-list {{if textAlignment==" center"}}text-center{{/if}}">\
                    <div class="heading-main text-truncate one-line-height" title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                    {{each(key, res) [0,1,2]}}\
                    <div class="image-with-text">\
                        <div class="img-block">\
                            <img src="${data.img}" />\
                        </div>\
                        <div class="image-info two-line-description" title="${data.description}">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                    </div>\
                    {{/each}}\
                </div>\
            </div>\
            {{/each}}\
        </div>\
        {{/if}}\
        {{if gridLayoutType==="img_top"}}\
        <div class="template-7-grid-list mb-15">\
            {{each(key, data) structuredData.slice(0, 5)}}\
            {{if isClickable == true}}\
            <div class="grid-data-item  click-to-navigate-url faqs-shadow isClickable" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">\
                {{else}}\
                <div class="grid-data-item  click-to-navigate-url faqs-shadow" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">\
                    {{/if}}\
                    <div class="inner-content-list {{if textAlignment==" center"}}text-center{{/if}}">\
                        <div class="main-img-block">\
                            <img src="${data.img}">\
                        </div>\
                        {{if data?.heading?.length}}\
                        <div class="heading- text-truncate one-line-height" title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                        {{/if}}\
                        {{if data?.description?.length}}\
                        <div class="desc-text-info two-line-description" title="${data.description}">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                        {{/if}}\
                    </div>\
                </div>\
                {{/each}}\
                {{/if}}\
            </div>\
            {{/if}}\
        </script>'
        if (type === 'searchGridTemplate') {
            return searchGridTemplate;
        }
    }

}

export default SearchGridViewTemplate;