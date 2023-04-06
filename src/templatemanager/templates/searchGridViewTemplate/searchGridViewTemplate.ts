import helpers from '../../../utils/helpers';
import './searchGridViewTemplate.scss';

class SearchGridViewTemplate {

    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        me.helpersObj = helpers;
        if (msgData?.message[0] && msgData.message[0].component && msgData.message[0].component?.payload && msgData.message[0].component?.payload?.template_type == 'searchGridTemplate') {
      if (!msgData.message[0].component.payload.helpers) {
                msgData.message[0].component.payload['helpers'] = me.helpersObj;
            }
            me.messageGridHtml = $(SearchGridViewTemplate.prototype.getTemplateString(msgData?.message[0].component.payload.template_type,me)).tmpl(msgData?.message[0].component.payload);
            SearchGridViewTemplate.prototype.bindEvents(me, me.messageGridHtml);
            return me.messageGridHtml;
        }
    }
    bindEvents(me: any, messageHtml: any) {
        let hostWindowInstance = me.hostInstance;
        let $ = me.hostInstance.$;
        $(messageHtml)
        .off("click", ".show-more-list")
        .on("click", ".show-more-list", function (e: any) {
            $(e.currentTarget).find('.read-more-img').attr('src', 'https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/kore_website_images/show-more.gif');
            $(e.currentTarget).find('.sa-card-tile-readmore').hide();
        const showMoreData = {
          groupName: $(e.currentTarget).attr("groupName"),
          templateName: $(e.currentTarget).attr("templateName"),
          pageNumber: Number($(e.currentTarget).attr("pageNumber")) + 1,
          fieldName: $(e.currentTarget).attr("fieldName"),
        };
        hostWindowInstance.showMoreClick(showMoreData).then((result: any) => {
          const listHTML = $(SearchGridViewTemplate.prototype.getTemplateString(result?.message[0].component.payload.template_type,me)).tmpl(result?.message[0].component.payload);
        //   $(listHTML).find(".show-more-list").remove();
        //   $(
        //     ".full-search-data-container [templateName=" +
        //     showMoreData.templateName +
        //     "]"
        //   ).before($(listHTML).find(".search-temp-resources-tiles").children());
          $(
            ".full-search-data-container [templateName=" +
            showMoreData.templateName +
            "]"
          ).parent().parent().find(".search-temp-resources-tiles").append($(listHTML).find(".search-temp-resources-tiles").children());
          $('.all-product-details').animate({
            scrollTop: $('.all-product-details').scrollTop() + 300
          }, 1000, 'linear');
          // $('.all-product-details').scrollTop($('.all-product-details').scrollTop() - 30);
          $(e.currentTarget).find('.sa-card-tile-readmore').show();
          $(e.currentTarget).find('.read-more-img').attr('src', 'https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/kore_website_images/goto-page.svg');  
          SearchGridViewTemplate.prototype.bindEvents(me, listHTML);
        })
        $(e.currentTarget).attr("pageNumber", Number($(e.currentTarget).attr("pageNumber")) + 1);
        });
        $(messageHtml)
            .off("click", ".search-task")
            .on("click", ".search-task", function (event: any) {
                event.stopPropagation();
                var ele = $(event.target).closest(".search-task");
                hostWindowInstance.botActionTrigger(event);
            });
        $('.parent-grid-template').off("click", ".click-to-navigate-url").on("click", ".click-to-navigate-url", function (e: any) {
            hostWindowInstance?.clickNavigateToUrl(e);
        });
        $('.parent-grid-template').off("click", ".click-log-metrics").on("click", ".click-log-metrics", function (e: any) {
            hostWindowInstance?.captureClickAnalytics(e,
                $(e.currentTarget).closest(".click-log-metrics").attr("contentType"),
                "click",
                $(e.currentTarget).closest(".click-log-metrics").attr("contentId"),
                $(e.currentTarget).closest(".click-log-metrics").attr("id"),
                $(e.currentTarget).closest(".click-log-metrics").attr("data-title") || $(e.currentTarget).attr("title"));
        });
        SearchGridViewTemplate.prototype.tooltipBindEvent(me);
        $(messageHtml).off('click', '.snippet-go-to').on('click', '.snippet-go-to', function (event:any) {   // added for Kore Web Site
            SearchGridViewTemplate.prototype.pagesGoToPage(hostWindowInstance.vars.searchObject.searchText);
          });
    }
    getTemplateString(type: any,me:any) {
        let $ = me.hostInstance.$;
        const searchGridTemplate = '<script type="text/x-jqury-tmpl">\
        {{if isButtonTemplate == false}}\
        <div>\
            {{if renderTitle}}\
            <div class="title-list-heading">${titleName}</div>\
            {{/if}}\
            {{if gridLayoutType==="img_common"}}\
            <div class="search-list-template-grid-img-title parent-grid-template">\
            {{each(key, data) structuredData.slice(0, 5)}}\
            {{if isClickable == true}}\
            <div class=" grid-item-col {{if textAlignment==" center"}}text-center{{/if}}  click-to-navigate-url click-log-metrics" data-title="${data.heading}" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">\
            {{else}}\
            <div class="grid-item-col {{if textAlignment==" center"}}text-center{{/if}} click-log-metrics" contentId="${data.contentId}" data-title="${data.heading}" contentType="${data.sys_content_type}" id="${key}">\
            {{/if}}\
                <div class="content-info-grid">\
                {{if data.heading.length}}\
                <div class="heading-title">\
                {{if data.img.length}}\
                <div class="img_block">\
                <img src="${data.img}" />\
                </div>\
                {{/if}}\
                    <span class="{{if data.img.length}}two-line-title-heading{{else}}title-heading {{/if}}">{{html helpers.convertMDtoHTML(data.heading)}}</span>\
                </div>\
                {{/if}}\
                {{if data.description}}\
                <div class="desc_text_info sa-sdk-title {{if listType==" classic"}}clamp-text{{/if}}" data-title="${data.description}">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                {{/if}}\
                </div>\
            </div>\
            {{/each}}\
                <div class="show-more-data {{if doc_count==0 || doc_count<6 || isLiveSearch || isSearch}}display-none{{/if}} show-more-list" groupName="${groupName}" templateName="${templateName}" pageNumber="${pageNumber}" fieldName="${fieldName}">\
                <div class="searchassist-show-more-button"><span class="sdk-i18n-lang" sdk-i18n-key="sa_sdk_show_more">{{html langTranslator("sa_sdk_show_more")}}</span> <img src="{{if devMode}}assets/web-kore-sdk/demo/{{/if}}images/show_more.png" height="6" width="10" /></div>\
                </div>\
            </div>\
        {{/if}}\
        {{if gridLayoutType==="img_large"}}\
        <div class="search-list-template-grid-img parent-grid-template">\
        {{each(key, data) structuredData.slice(0, 5)}}\
        {{if isClickable == true}}\
        <div class="parent-grid-template grid-item-col  click-to-navigate-url click-log-metrics" data-title="${data.heading}" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">\
        {{else}}\
        <div class="grid-item-col click-log-metrics" data-title="${data.heading}" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">\
        {{/if}}\
                <div class="content-info-grid">\
                    <div class="img-block-data">\
                    <img src="${data.img}" />\
                    </div>\
                </div>\
            </div>\
            {{/each}}\
            <div class="show-more-data {{if doc_count==0 || doc_count<6 || isLiveSearch || isSearch}}display-none{{/if}} show-more-list" groupName="${groupName}" templateName="${templateName}" pageNumber="${pageNumber}" fieldName="${fieldName}">\
                <div class="searchassist-show-more-button">Show more\
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNiIgdmlld0JveD0iMCAwIDEwIDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNS4zNjQzNyA1LjE0OTQ5QzUuMTc0OTcgNS4zMzgzNyA0Ljg3NDgxIDUuMzQ5NDggNC42NzIzOSA1LjE4MjgyTDQuNjM1NjMgNS4xNDk0OUwwLjE1MDkyNyAwLjg3NzI2NUMtMC4wNTAzMDkxIDAuNjc2NTc5IC0wLjA1MDMwOTEgMC4zNTEyMDIgMC4xNTA5MjcgMC4xNTA1MTVDMC4zNDAzMjYgLTAuMDM4MzY2NCAwLjY0MDQ4IC0wLjA0OTQ3NzMgMC44NDI5MDkgMC4xMTcxODNMMC44Nzk2NjggMC4xNTA1MTVMNSA0LjA1OTI4TDkuMTIwMzMgMC4xNTA1MTVDOS4zMDk3MyAtMC4wMzgzNjY0IDkuNjA5ODggLTAuMDQ5NDc3MyA5LjgxMjMxIDAuMTE3MTgzTDkuODQ5MDcgMC4xNTA1MTVDMTAuMDM4NSAwLjMzOTM5NyAxMC4wNDk2IDAuNjM4NzMxIDkuODgyNSAwLjg0MDYwN0w5Ljg0OTA3IDAuODc3MjY1TDUuMzY0MzcgNS4xNDk0OVoiIGZpbGw9IiM1RjYzNjgiLz4KPC9zdmc+Cg==">\
                </div>\
        </div>\
        </div>\
        {{/if}}\
        {{if gridLayoutType==="img_left"}}\
        <div class="search-list-template-grid-title-img-desc parent-grid-template">\
        {{each(key, data) structuredData.slice(0, 5)}}\
        {{if isClickable == true}}\
        <div class=" parent-grid-templategrid-item-col  click-to-navigate-url click-log-metrics" data-title="${data.heading}" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">\
        {{else}}\
        <div class="grid-item-col click-log-metrics" contentId="${data.contentId}" data-title="${data.heading}" contentType="${data.sys_content_type}" id="${key}">\
        {{/if}}\
            <div class="content-info-grid">\
                <div class="heading-title text_overflow sa-sdk-title" data-title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                {{each(key, res) [0,1,2]}}\
                <div class="img-with-desc">\
                    <div class="img_info">\
                        <img src="${data.img}" />\
                    </div>\
                    <div class="desc-text clamp-text sa-sdk-title" data-title="${data.description}">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                </div>\
                {{/each}}\
            </div>\
        </div>\
        {{/each}}\
        <div class="show-more-data {{if doc_count==0 || doc_count<6 || isLiveSearch || isSearch}}display-none{{/if}} show-more-list" groupName="${groupName}" templateName="${templateName}" pageNumber="${pageNumber}" fieldName="${fieldName}">\
        <div class="searchassist-show-more-button">Show more\
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNiIgdmlld0JveD0iMCAwIDEwIDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNS4zNjQzNyA1LjE0OTQ5QzUuMTc0OTcgNS4zMzgzNyA0Ljg3NDgxIDUuMzQ5NDggNC42NzIzOSA1LjE4MjgyTDQuNjM1NjMgNS4xNDk0OUwwLjE1MDkyNyAwLjg3NzI2NUMtMC4wNTAzMDkxIDAuNjc2NTc5IC0wLjA1MDMwOTEgMC4zNTEyMDIgMC4xNTA5MjcgMC4xNTA1MTVDMC4zNDAzMjYgLTAuMDM4MzY2NCAwLjY0MDQ4IC0wLjA0OTQ3NzMgMC44NDI5MDkgMC4xMTcxODNMMC44Nzk2NjggMC4xNTA1MTVMNSA0LjA1OTI4TDkuMTIwMzMgMC4xNTA1MTVDOS4zMDk3MyAtMC4wMzgzNjY0IDkuNjA5ODggLTAuMDQ5NDc3MyA5LjgxMjMxIDAuMTE3MTgzTDkuODQ5MDcgMC4xNTA1MTVDMTAuMDM4NSAwLjMzOTM5NyAxMC4wNDk2IDAuNjM4NzMxIDkuODgyNSAwLjg0MDYwN0w5Ljg0OTA3IDAuODc3MjY1TDUuMzY0MzcgNS4xNDk0OVoiIGZpbGw9IiM1RjYzNjgiLz4KPC9zdmc+Cg==">\
        </div>\
        </div>\
        </div>\
        {{/if}}\
        {{if gridLayoutType==="img_top"}}\
        <div class="search-list-template-grid-title-img-card parent-grid-template">\
        {{each(key, data) structuredData.slice(0, 5)}}\
        {{if isClickable == true}}\
        <div class=" grid-item-col  click-to-navigate-url click-log-metrics" data-title="${data.heading}" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">\
        {{else}}\
        <div class="grid-item-col click-log-metrics" data-title="${data.heading}" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">\
        {{/if}}\
            <div class="content-info-grid">\
                <div class="main-img-block">\
                    <img src="${data.img}" height="10"/>\
                </div>\
                {{if data.heading.length}}\
                <div class="heading-title text_overflow sa-sdk-title" data-title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                {{/if}}\
                {{if data.description.length}}\
                <div class="desc-text clamp-text sa-sdk-title" data-title="${data.description}">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                {{/if}}\
                <div class="price-tag display-none">$156</div>\
            </div>\
        </div>\
        {{/each}}\
        <div class="show-more-data {{if doc_count==0 || doc_count<6 || isLiveSearch || isSearch}}display-none{{/if}} show-more-list" groupName="${groupName}" templateName="${templateName}" pageNumber="${pageNumber}" fieldName="${fieldName}">\
            <div class="searchassist-show-more-button">Show more\
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNiIgdmlld0JveD0iMCAwIDEwIDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNS4zNjQzNyA1LjE0OTQ5QzUuMTc0OTcgNS4zMzgzNyA0Ljg3NDgxIDUuMzQ5NDggNC42NzIzOSA1LjE4MjgyTDQuNjM1NjMgNS4xNDk0OUwwLjE1MDkyNyAwLjg3NzI2NUMtMC4wNTAzMDkxIDAuNjc2NTc5IC0wLjA1MDMwOTEgMC4zNTEyMDIgMC4xNTA5MjcgMC4xNTA1MTVDMC4zNDAzMjYgLTAuMDM4MzY2NCAwLjY0MDQ4IC0wLjA0OTQ3NzMgMC44NDI5MDkgMC4xMTcxODNMMC44Nzk2NjggMC4xNTA1MTVMNSA0LjA1OTI4TDkuMTIwMzMgMC4xNTA1MTVDOS4zMDk3MyAtMC4wMzgzNjY0IDkuNjA5ODggLTAuMDQ5NDc3MyA5LjgxMjMxIDAuMTE3MTgzTDkuODQ5MDcgMC4xNTA1MTVDMTAuMDM4NSAwLjMzOTM5NyAxMC4wNDk2IDAuNjM4NzMxIDkuODgyNSAwLjg0MDYwN0w5Ljg0OTA3IDAuODc3MjY1TDUuMzY0MzcgNS4xNDk0OVoiIGZpbGw9IiM1RjYzNjgiLz4KPC9zdmc+Cg==">\
            </div>\:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNiIgdmlld0JveD0iMCAwIDEwIDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNS4zNjQzNyA1LjE0OTQ5QzUuMTc0OTcgNS4zMzgzNyA0Ljg3NDgxIDUuMzQ5NDggNC42NzIzOSA1LjE4MjgyTDQuNjM1NjMgNS4xNDk0OUwwLjE1MDkyNyAwLjg3NzI2NUMtMC4wNTAzMDkxIDAuNjc2NTc5IC0wLjA1MDMwOTEgMC4zNTEyMDIgMC4xNTA5MjcgMC4xNTA1MTVDMC4zNDAzMjYgLTAuMDM4MzY2NCAwLjY0MDQ4IC0wLjA0OTQ3NzMgMC44NDI5MDkgMC4xMTcxODNMMC44Nzk2NjggMC4xNTA1MTVMNSA0LjA1OTI4TDkuMTIwMzMgMC4xNTA1MTVDOS4zMDk3MyAtMC4wMzgzNjY0IDkuNjA5ODggLTAuMDQ5NDc3MyA5LjgxMjMxIDAuMTE3MTgzTDkuODQ5MDcgMC4xNTA1MTVDMTAuMDM4NSAwLjMzOTM5NyAxMC4wNDk2IDAuNjM4NzMxIDkuODgyNSAwLjg0MDYwN0w5Ljg0OTA3IDAuODc3MjY1TDUuMzY0MzcgNS4xNDk0OVoiIGZpbGw9IiM1RjYzNjgiLz4KPC9zdmc+Cg==">\
        </div>\
    </div>\
        {{/if}}\
        </div>\
    {{/if}}\
    {{if isButtonTemplate}}\
    {{if structuredData && structuredData.length > 0 }}\
    {{if devMode == true && viewType == "Customize" && selectedFacet == appearanceType}}\
      <div class="bot-actions-customize-info ">\
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFnSURBVHgBpVNNSsNQEH4zabXLuFXEHsGCqLjQ9gTqCWJP0AsUk0j26tJdegLrCczKnyL0CDbgAbKzhvjGmZBIfIQScODxHt/8fzNPqRXSOfS6clbZgAm09sZ9tCxHkToDULZgRCphyykC+MsXb1G1x78ZfRfRumfDGBF6X68+yJG3YET0uLZ/6dZWIM5E+gIABmaWaksShE+Yzq783wClwnRmvK91ZqezYFoNojXNtf4+z96CKG9BE3F2mpiZAWgXsWVXMbHhlm5znoSzHGXCELFnlvz57N+oegm59DnfQyjKfxeyTCsmzJOb+/VM3fqBS2C1u6j+KSg9yZw7R8FOU6diuZLl0zguKqAHnaVD1VjAIaXyyeQBmMCQRzgy15bxhRwzu+yLbGUeqqLwmEyn4SJNSmKtUpl9RFF7e7DBymtr68Tmd8xYUjri5vGIuQq53bvqVKAui9aaDeC05jPJskWqqTT5zj8FOrqqP5/xLgAAAABJRU5ErkJggg==" alt="actions-info">\
        <span class="info-text">Bot Actions cannot be customized</span>\
      </div>\
    {{/if}}\
    {{if selectedFacet !== appearanceType && selectedFacet == "all results"}}\
        <div class="heading-and-show-all" appearanceType="task">\
            <div class="text-heading-main">ACTIONS</div>\
            <div class="show-al-text show-all-blue display-none">Show all Actions</div>\
        </div>\
    {{/if}}\
    {{if selectedFacet == appearanceType || selectedFacet == "all results"}}\
        <div class="new-grid-search-data">\
            {{each(key, task) structuredData}}\
                <div class="title-box-data">\
                    <div id="${key}" class="search-task search-grid-item text-truncate " title="${task.name}" contentId="${task.taskId}" contentType="${task.contentType}" childBotId="${task.childBotId}" childBotName="${task.childBotName}" payload="${task.payload}" seqLogId="${task.seqLogId}">\
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJ1BMVEUAAAAAVaoEbq4DbK8GbK4Gbq8Gba0Fba8Fba4Fbq4Eba4Fba7////SVqJwAAAAC3RSTlMAA0hJVYKDqKmq4875bAAAAAABYktHRAyBs1FjAAAAP0lEQVQI12NgwACMJi5A4CzAwLobDBIYOCaAxDknMLCvnAkEsyYwcECkkBicMDV4GGwQxQEMjCogK5wEMC0HALyTIMofpWLWAAAAAElFTkSuQmCC" class="credit-card display-none">\
                        <div class="name-title">${task.titleText}</div>\
                        {{if task.childBotName !=="" && task.childBotName !== undefined}}\
                            <div class="child-bot">${task.childBotName}</div>\
                        {{/if}}\
                    </div>\
                </div>\
            {{/each}}\
        </div>\
    {{/if}}\
  {{/if}}\
    {{/if}}\
        </script>'
        const koreGridTemplate = '<script type="text/x-jqury-tmpl">\
        <div class="temp-block-header">${titleName}</div>\
        <div class="search-temp-resources-tiles-block sa-resource-tiles-block">\
                <div class="search-temp-width-90">\
                    <div class="search-temp-resources-tiles parent-grid-template">\
                    {{each(key, data) structuredData.slice(0, 4)}}\
                        <div class="sa-card-tile">\
                        {{if data.img.length}}\
                            <div class="sa-card-tile-img-block">\
                            <img src="${data.img}">\
                            </div>\
                        {{/if}}\
                            <div class="sa-card-tile-content-block">\
                            <div class="sa-card-tile-content-header"  title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                            <div class="sa-card-tile-content-desc"  title="${data.description}">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                            </div>\
                            <div class="sa-card-tile-readmore snippet-go-to"> <a href="${data.page_url}">Read More<img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/kore_website_images/goto-page.svg" class="read-more-img"></a></div>\
                        </div>\
                    {{/each}}\
                    </div>\
                </div>\
                <div class="search-temp-see-more show-more-list {{if doc_count==0 || doc_count<6 || isLiveSearch || isSearch}}display-none{{/if}}" groupName="${groupName}" templateName="${templateName}" pageNumber="${pageNumber}" fieldName="${fieldName}">\
                    <div class="sa-card-tile-readmore">See More <img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/kore_website_images/goto-page.svg" class="read-more-img"></div>\
                </div>\
                </div>\
        </script>'
        if (type === 'searchGridTemplate' && !$("body").hasClass("kore-sdk-body") ) {
            return searchGridTemplate;
        }
        if (type === 'searchGridTemplate' && $("body").hasClass("kore-sdk-body") ) {
            return koreGridTemplate;
        }
    }
    tooltipBindEvent(me:any){
        let $ = me.hostInstance.$;
      $('.sa-sdk-title').off('mouseover').on('mouseover',function(e:any){
        e.stopPropagation();
        e.stopImmediatePropagation();
        $(e.currentTarget).before('<div class="sdk-tooltip-container">'+$(e.currentTarget).attr('data-title')+'<span class="sa-tooltip-arrow"></span></div>');
        $(e.currentTarget).parent().find('.sdk-tooltip-container').css('top',($(e.currentTarget).position().top-($(e.currentTarget).parent().find('.sdk-tooltip-container').height()+25))+'px');
      })
      $('.sa-sdk-title').off('mouseout').on('mouseout',function(e:any){
        e.stopPropagation();
        e.stopImmediatePropagation();
        $(e.currentTarget).parent().find('.sdk-tooltip-container').remove();
        })
      }
      pagesGoToPage(query:any){  // added for Kore Web Site
        window.localStorage.setItem("query",query);
        window.localStorage.setItem("searchLocation",window.location.href);
      }
}

export default SearchGridViewTemplate;

