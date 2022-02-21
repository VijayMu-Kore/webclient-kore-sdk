
import helpers from '../../../../utils/helpers';
import './searchListViewTemplate.scss';
class SearchListViewTemplate {

    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let helpersObj = helpers;
        if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload) {
            me.messageHtml = $(me.getTemplateString(msgData.message[0].component.payload.template_type)).tmpl(msgData.message[0].component.payload);
            me.bindEvents(me.messageHtml);
            return me.messageHtml;
        }
    }
    bindEvents(messageHtml: any) {
        let me: any = this;
        let chatWindowInstance = me.hostInstance;
        let $ = me.hostInstance.$;
        var _innerText;
        


    }
    getTemplateString(type: any) {
    var listTemplatel1 = '<script type="text/x-jqury-tmpl">\
        {{if structuredData.length}}\
            <div class="title-text-heading {{if renderTitle}}display-block{{else}}display-none{{/if}}">${titleName}</div>\
            <div class="template-1-{{if listType=="classic"}}classic{{else}}plain{{/if}}-list{{if renderTitle}}-result-group{{/if}} mb-15 {{if textAlignment=="center"}}text-center{{/if}}">\
                    {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
                        {{if isClickable == true}}\
                            <div class="{{if listType=="classic"}}classic{{else}}plain{{/if}}-list{{if renderTitle}}-result{{/if}}-item {{if textAlignment=="center"}}text-center{{/if}} click-to-navigate-url faqs-shadow isClickable" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                        {{/if}}\
                        {{if isClickable == false}}\
                            <div class="{{if listType=="classic"}}classic{{else}}plain{{/if}}-list{{if renderTitle}}-result{{/if}}-item {{if textAlignment=="center"}}text-center{{/if}} click-to-navigate-url faqs-shadow" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                        {{/if}}\
                    {{/each}}\
                <div class="show-more-list {{if doc_count==0 || doc_count<6 || isLiveSearch || isSearch}}display-none{{/if}}" groupName="${groupName}" templateName="${templateName}" pageNumber="${pageNumber}" fieldName="${fieldName}">\
                    <div class="searchassist-show-more-button">Show more <img src="{{if devMode}}assets/web-kore-sdk/demo/{{/if}}images/show_more.png" height="6" width="10" /></div>\
                </div>\
            </div>\
        {{/if}}\
    </script>'

    var listTemplatel2 = '<script type="text/x-jqury-tmpl">\
        {{if structuredData.length}}\
            <div class="title-text-heading {{if renderTitle}}display-block{{else}}display-none{{/if}}">${titleName}</div>\
            <div class="template-2-{{if listType=="classic"}}classic{{else}}plain{{/if}}-list{{if isClickable}}-collapse{{/if}}{{if renderTitle}}-result{{/if}} mb-15">\
                {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
                    {{if isClickable == true}}\
                        <div class="{{if listType=="classic"}}classic{{else}}plain{{/if}}-list-item{{if renderTitle}}-result{{/if}} click-to-navigate-url faqs-shadow isClickable" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">\
                            <span>{{html helpers.convertMDtoHTML(data.description)}}</span>\
                        </div>\
                    {{/if}}\
                    {{if isClickable == false}}\
                        <div class="template-2-{{if listType=="classic"}}classic{{else}}plain{{/if}}-list-collapse mb-15 click-to-navigate-url faqs-shadow" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">\
                            <div class="collapse-item-list accordion" id="1">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                        </div>\
                    {{/if}}\
                {{/each}}\
                <div class="show-more-list {{if doc_count==0 || doc_count<6 || isLiveSearch || isSearch}}display-none{{/if}}" groupName="${groupName}" templateName="${templateName}" pageNumber="${pageNumber}" fieldName="${fieldName}">\
                    <div class="searchassist-show-more-button">Show more <img src="{{if devMode}}assets/web-kore-sdk/demo/{{/if}}images/show_more.png" height="6" width="10" /></div>\
                </div>\
            </div>\
        {{/if}}\
    </script>'

    var listTemplatel3 = '<script type="text/x-jqury-tmpl">\
    {{if structuredData.length}}\
        <div class="title-text-heading {{if renderTitle}}display-block{{else}}display-none{{/if}}">${titleName}</div>\
        <div class="template-3-{{{if listType=="classic"}}classic{{else}}plain{{/if}}-list{{if renderTitle}}-result{{/if}} mb-15">\
            {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
                {{if isClickable == true}}\
                    <div class="{{if listType=="classic"}}classic{{else}}plain{{/if}}-list-item{{if renderTitle}}-result{{/if}} click-to-navigate-url faqs-shadow isClickable" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">\
                        <div class="heading-text" title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                        <div class="text-desc two-line-description" title="${data.description}">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                    </div>\
                {{/if}}\
                {{if isClickable == false}}\
                    <div class="template-3-{{if listType=="classic"}}classic{{else}}plain{{/if}}-list-collapse mb-15 click-to-navigate-url faqs-shadow" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">\
                        <div class="collapse-item-list accordion" id="1">\
                            <div class="text-truncate one-line-height" title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div><div class="text-desc-">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                        </div>\
                    </div>\
                {{/if}}\
            {{/each}}\
            <div class="show-more-list {{if doc_count==0 || doc_count<6 || isLiveSearch || isSearch}}display-none{{/if}}" groupName="${groupName}" templateName="${templateName}" pageNumber="${pageNumber}" fieldName="${fieldName}">\
                <div class="searchassist-show-more-button">Show more <img src="{{if devMode}}assets/web-kore-sdk/demo/{{/if}}images/show_more.png" height="6" width="10" /></div>\
            </div>\
        </div>\
    {{/if}}\
    </script>'

    var listTemplatel4 = '<script type="text/x-jqury-tmpl">\
    {{if structuredData.length}}\
        <div class="title-text-heading {{if renderTitle}}display-block{{else}}display-none{{/if}}">${titleName}</div>\
        <div class="template-4-{{if listType=="classic"}}classic{{else}}plain{{/if}}-list{{if isClickable==false}}-collapse{{/if}} {{if isClickable==false}}template-4-{{if listType=="classic"}}classic{{else}}plain{{/if}}-list-collapse-result{{/if}} mb-15">\
            {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
                {{if isClickable == true}}\
                    <div class="{{if listType=="classic"}}classic{{else}}plain{{/if}}-list-item click-to-navigate-url faqs-shadow isClickable" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">\
                        <div class="img-block">\
                            <img src="${data.img}">\
                        </div>\
                        <div class="content_sec">\
                            <div class="heading text-truncate one-line-height" title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                            <div class="text_desc single-line-description" title="${data.description}">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                        </div>\
                    </div>\
                {{/if}}\
                {{if isClickable == false}}\
                        <div class="collapse-item-list-parent click-to-navigate-url faqs-shadow" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">\
                            <div class="collapse-item-list accordion" id="1">\
                                <div class="text-truncate one-line-height" title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div><div class="text-description defalut-show text-truncate one-line-height">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                            </div>\
                            <div class="panel">\
                                <div class="content_sec">\
                                    <div class="img-block">\
                                        <img src="${data.img}">\
                                    </div>\
                                    <div class="text-desc four-line-description">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                                </div>\
                            </div>\
                        </div>\
                {{/if}}\
            {{/each}}\
                    <div class="show-more-list {{if doc_count==0 || doc_count<6 || isLiveSearch || isSearch}}display-none{{/if}}" groupName="${groupName}" templateName="${templateName}" pageNumber="${pageNumber}" fieldName="${fieldName}">\
                        <div class="searchassist-show-more-button">Show more <img src="{{if devMode}}assets/web-kore-sdk/demo/{{/if}}images/show_more.png" height="6" width="10" /></div>\
                    </div>\
        <div>\
    {{/if}}\
    </script>';
    var listTemplate = '<script type="text/x-jqury-tmpl">\
    {{if structuredData.length}}\
        <div class="title-text-heading {{if renderTitle}}display-block{{else}}display-none{{/if}}">${titleName}</div>\
        <div class="template-4-{{if listType=="classic"}}classic{{else}}plain{{/if}}-list{{if isClickable==false}}-collapse{{/if}} {{if isClickable==false}}template-4-{{if listType=="classic"}}classic{{else}}plain{{/if}}-list-collapse-result{{/if}} mb-15">\
            {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
                {{if isClickable == true}}\
                    {{if template_type="listTemplatel1"}}\
                        <div class="{{if listType=="classic"}}classic{{else}}plain{{/if}}-list{{if renderTitle}}-result{{/if}}-item {{if textAlignment=="center"}}text-center{{/if}} click-to-navigate-url faqs-shadow isClickable" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                    {{/if}}\
                    {{if template_type="listTemplatel2"}}\
                        <div class="{{if listType=="classic"}}classic{{else}}plain{{/if}}-list-item{{if renderTitle}}-result{{/if}} click-to-navigate-url faqs-shadow isClickable" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">\
                            <span>{{html helpers.convertMDtoHTML(data.description)}}</span>\
                        </div>\
                    {{/if}}\
                    {{if template_type="listTemplatel3"}}\
                        <div class="{{if listType=="classic"}}classic{{else}}plain{{/if}}-list-item{{if renderTitle}}-result{{/if}} click-to-navigate-url faqs-shadow isClickable" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">\
                            <div class="heading-text" title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                            <div class="text-desc two-line-description" title="${data.description}">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                        </div>\
                    {{/if}}\
                    {{if template_type="listTemplatel4"}}\
                        <div class="{{if listType=="classic"}}classic{{else}}plain{{/if}}-list-item click-to-navigate-url faqs-shadow isClickable" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">\
                            <div class="img-block">\
                                <img src="${data.img}">\
                            </div>\
                            <div class="content_sec">\
                                <div class="heading text-truncate one-line-height" title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                                <div class="text_desc single-line-description" title="${data.description}">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                            </div>\
                        </div>\
                    {{/if}}\
                {{/if}}\
                {{if isClickable == false}}\
                    {{if template_type="listTemplatel1"}}\
                    <div class="{{if listType=="classic"}}classic{{else}}plain{{/if}}-list{{if renderTitle}}-result{{/if}}-item {{if textAlignment=="center"}}text-center{{/if}} click-to-navigate-url faqs-shadow" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                    {{/if}}\
                    {{if template_type="listTemplatel2"}}\
                        <div class="template-2-{{if listType=="classic"}}classic{{else}}plain{{/if}}-list-collapse mb-15 click-to-navigate-url faqs-shadow" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">\
                            <div class="collapse-item-list accordion" id="1">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                        </div>\
                    {{/if}}\
                    {{if template_type="listTemplatel3"}}\
                        <div class="{{if template_type=="listTemplatel3"}}template-3-{{/if}}{{if listType=="classic"}}classic{{else}}plain{{/if}}-list-collapse mb-15 click-to-navigate-url faqs-shadow" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">\
                            <div class="collapse-item-list accordion" id="1">\
                                <div class="text-truncate one-line-height" title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div><div class="text-desc-">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                            </div>\
                        </div>\
                    {{/if}}\
                    {{if template_type="listTemplatel4"}}\
                            <div class="collapse-item-list-parent click-to-navigate-url faqs-shadow" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">\
                                <div class="collapse-item-list accordion" id="1">\
                                    <div class="text-truncate one-line-height" title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div><div class="text-description defalut-show text-truncate one-line-height">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                                </div>\
                                <div class="panel">\
                                    <div class="content_sec">\
                                        <div class="img-block">\
                                            <img src="${data.img}">\
                                        </div>\
                                        <div class="text-desc four-line-description">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                                    </div>\
                                </div>\
                            </div>\
                    {{/if}}\
                {{/if}}\
            {{/each}}\
                    <div class="show-more-list {{if doc_count==0 || doc_count<6 || isLiveSearch || isSearch}}display-none{{/if}}" groupName="${groupName}" templateName="${templateName}" pageNumber="${pageNumber}" fieldName="${fieldName}">\
                        <div class="searchassist-show-more-button">Show more <img src="{{if devMode}}assets/web-kore-sdk/demo/{{/if}}images/show_more.png" height="6" width="10" /></div>\
                    </div>\
        <div>\
    {{/if}}\
    </script>';
        if (type === 'listTemplatel1') {
            return listTemplatel1;
        } else if (type === 'listTemplatel2') {
            return listTemplatel2;
        }else if (type === 'listTemplatel3') {
            return listTemplate //listTemplatel3;
        }else if (type === 'listTemplatel4') {
            return listTemplatel4;
        }

    }

}

export default SearchListViewTemplate;