
import helpers from '../../../../utils/helpers';
import PureJSCarousel from '../../../../../libs/purejscarousel';
import './searchCarouselViewTemplate.scss';
class SearchCarouselViewTemplate {

    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        me.helpersObj = helpers;
        if (msgData?.message[0] && msgData?.message[0].component && msgData?.message[0].component?.payload && msgData?.message[0].component?.payload?.template_type == 'searchCarouselTemplate') {
            if (!msgData?.message[0].component?.payload?.helpers) {
                msgData.message[0].component.payload['helpers'] = me.helpersObj.helpers;
            }
            msgData.message[0].component.payload['helpers'] = me.helpersObj.helpers;
            if (msgData?.message[0].component?.payload && msgData?.message[0].component?.payload?.gridLayoutType === 'img_common') {
                const payload = msgData?.message[0].component?.payload?.structuredData;
                const checkImg = payload.some((res: any) => res !== '');
                msgData.message[0].component.payload.templateType = checkImg ? 'L4' : '';
            }
            me.messageCarouselHtml = $(SearchCarouselViewTemplate.prototype.getTemplateString(msgData?.message[0].component?.payload?.template_type)).tmpl(msgData?.message[0].component?.payload);

            SearchCarouselViewTemplate.prototype.bindEvents(me, me.messageCarouselHtml);
            return me.messageCarouselHtml;
        }
    }
    bindEvents(me: any, messageHtml: any) {
        let hostWindowInstance = me.hostInstance;
        let $ = me.hostInstance.$;
        setTimeout(() => {
            const me: any = this;
            let newCarouselTemplateCount = $('.carousel').length;
            let newCarouselEles = [];
            newCarouselTemplateCount += 1;
            messageHtml
                .find(".carousel:last")
                .addClass("carouselTemplate" + newCarouselTemplateCount);
            var count = messageHtml
                .find(".carouselTemplate" + newCarouselTemplateCount)
                .children().length;
            if (count > 1) {
                var carouselOneByOne = new PureJSCarousel({
                    carousel: ".carouselTemplate" + newCarouselTemplateCount,
                    slide: ".slide",
                    oneByOne: true,
                    jq: $,
                });
                $(".carousel" + newCarouselTemplateCount)
                    .parent()
                    .show();
                newCarouselEles.push(carouselOneByOne);
                if (
                    $(".carouselTemplate" + newCarouselTemplateCount).width() >=
                    $(
                        ".carouselTemplate" +
                        newCarouselTemplateCount +
                        " .purejscarousel-slides-container"
                    ).children().length *
                    $(
                        ".carouselTemplate" +
                        newCarouselTemplateCount +
                        " .purejscarousel-slides-container .slide:first"
                    ).width()
                ) {
                    $(
                        ".carouselTemplate" +
                        newCarouselTemplateCount +
                        " .purejscarousel-btn-prev"
                    ).hide();
                    $(
                        ".carouselTemplate" +
                        newCarouselTemplateCount +
                        " .purejscarousel-btn-next"
                    ).hide();
                }
                $(
                    ".carouselTemplate" +
                    newCarouselTemplateCount +
                    " .purejscarousel-btn-prev::after"
                ).css(
                    "height",
                    $(
                        ".carouselTemplate" +
                        newCarouselTemplateCount +
                        ".purejscarousel-slides-container"
                    ).height() + "px"
                );
                $(
                    ".carouselTemplate" +
                    newCarouselTemplateCount +
                    " .purejscarousel-btn-next::after"
                ).css(
                    "height",
                    $(
                        ".carouselTemplate" +
                        newCarouselTemplateCount +
                        ".purejscarousel-slides-container"
                    ).height() + "px"
                );
                $("body").append(
                    "<style>.carouselTemplate" +
                    newCarouselTemplateCount +
                    " .purejscarousel-btn-next::after,.carouselTemplate" +
                    newCarouselTemplateCount +
                    " .purejscarousel-btn-prev::after {height:" +
                    ($(
                        ".carouselTemplate" +
                        newCarouselTemplateCount +
                        " .purejscarousel-slides-container"
                    ).height() -
                        8) +
                    "px !important; top:-" +
                    ($(
                        ".carouselTemplate" +
                        newCarouselTemplateCount +
                        " .purejscarousel-btn-next"
                    ).position().top -
                        27.5) +
                    "px !important;}</style>"
                );

                var evt = document.createEvent("HTMLEvents");
                evt.initEvent("resize", true, false);
                window.dispatchEvent(evt);
            }
        }, 500);
        $(messageHtml)
            .off("click", ".search-task")
            .on("click", ".search-task", function (event: any) {
                event.stopPropagation();
                var ele = $(event.target).closest(".search-task");
                hostWindowInstance.botActionTrigger(event);
            });
        $(messageHtml).off("click", ".click-to-navigate-url").on("click", ".click-to-navigate-url", function (e: any) {
            hostWindowInstance?.clickNavigateToUrl(e);
        });
        $(messageHtml).off("click", ".click-log-metrics").on("click", ".click-log-metrics", function (e: any) {
            hostWindowInstance?.captureClickAnalytics(e,
                $(e.currentTarget).closest(".faqs-shadow").attr("contentType"),
                "click",
                $(e.currentTarget).closest(".faqs-shadow").attr("contentId"),
                $(e.currentTarget).closest(".faqs-shadow").attr("id"),
                $(e.currentTarget).attr("title"));
        });
    }

    getTemplateString(type: any) {
        const searchCarouselTemplate = '<script type="text/x-jqury-tmpl">\
        {{if isButtonTemplate == false}}\
            {{if structuredData.length}}\
            {{if renderTitle}}\
            <div class="title-list-heading">${titleName}</div>\
            {{/if}}\
            {{if gridLayoutType==="img_common"}}\
            <div class="search-list-template-carousel{{if templateType==="L4"}}-img-title{{/if}}">\
            <div class="carousel">\
            {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
            {{if isClickable == true}}\
            <div class="slide grid-item-col click-to-navigate-url click-log-metrics" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">\
            {{else}}\
            <div class="slide grid-item-col click-log-metrics" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">\
            {{/if}}\
                    <div class="content-info-grid">\
                        <div class="heading-title text_overflow">\
                        {{if data.img.length}}\
                        <div class="img_block">\
                        <img src="${data.img}"/>\
                        </div>\
                        {{/if}}\
                        <span title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</span>\
                        </div>\
                        <div class="desc_text_info clamp-text" title="${data.description}">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                    </div>\
                </div>\
            {{/each}}\
            </div>\
        </div>\
            {{/if}}\
            {{if gridLayoutType==="img_large"}}\
            <div class="search-list-template-carousel-grid-img">\
            <div class="carousel">\
                {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
                {{if isClickable == true}}\
            <div class="slide grid-item-col click-to-navigate-url click-log-metrics" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">\
            {{else}}\
            <div class="slide grid-item-col click-log-metrics" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">\
            {{/if}}\
                    <div class="content-info-grid">\
                        <div class="img-block-data">\
                            <img src="${data.img}">\
                        </div>\
                    </div>\
                </div>\
                {{/each}}\
            </div>\
            </div>\
            {{/if}}\
            {{if gridLayoutType==="img_left"}}\
            <div class="search-list-template-carousel-title-img-desc">\
            <div class="carousel">\
                {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
                {{if isClickable == true}}\
            <div class="slide grid-item-col click-to-navigate-url click-log-metrics" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">\
            {{else}}\
            <div class="slide grid-item-col click-log-metrics" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">\
            {{/if}}\
                    <div class="content-info-grid">\
                        <div class="heading-title text_overflow" title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                        <div class="img-with-desc">\
                            <div class="img_info">\
                                <img src="${data.img}">\
                            </div>\
                            <div class="desc-text clamp-text" title="${data.description}">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                        </div>\
                    </div>\
                </div>\
                {{/each}}\
            </div>\
            </div>\
            {{/if}}\
            {{if gridLayoutType==="img_top"}}\
            <div class="search-list-template-carousel-title-img-card">\
            <div class="carousel">\
                {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
                {{if isClickable == true}}\
            <div class="slide grid-item-col click-to-navigate-url click-log-metrics" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">\
            {{else}}\
            <div class="slide grid-item-col click-log-metrics" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">\
            {{/if}}\
                    <div class="content-info-grid">\
                        <div class="main-img-block">\
                            <img src="${data.img}" height="10">\
                        </div>\
                        {{if data.heading.length}}\
                        <div class="heading-title text_overflow" title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                        {{/if}}\
                        {{if data.description.length}}\
                        <div class="desc-text clamp-text" title="${data.description}">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                        {{/if}}\
                        <div class="price-tag">$156</div>\
                    </div>\
                </div>\
                {{/each}}\
            </div>\
        </div>\
            {{/if}}\
            {{/if}}\
        {{/if}}\
        {{if isButtonTemplate}}\
        {{if structuredData && structuredData.length > 0 }}\
        <div class="action-carousel-parent-container">\
        {{if devMode == true && viewType == "Customize" && selectedFacet == appearanceType}}\
          <div class="bot-actions-customize-info ">\
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFnSURBVHgBpVNNSsNQEH4zabXLuFXEHsGCqLjQ9gTqCWJP0AsUk0j26tJdegLrCczKnyL0CDbgAbKzhvjGmZBIfIQScODxHt/8fzNPqRXSOfS6clbZgAm09sZ9tCxHkToDULZgRCphyykC+MsXb1G1x78ZfRfRumfDGBF6X68+yJG3YET0uLZ/6dZWIM5E+gIABmaWaksShE+Yzq783wClwnRmvK91ZqezYFoNojXNtf4+z96CKG9BE3F2mpiZAWgXsWVXMbHhlm5znoSzHGXCELFnlvz57N+oegm59DnfQyjKfxeyTCsmzJOb+/VM3fqBS2C1u6j+KSg9yZw7R8FOU6diuZLl0zguKqAHnaVD1VjAIaXyyeQBmMCQRzgy15bxhRwzu+yLbGUeqqLwmEyn4SJNSmKtUpl9RFF7e7DBymtr68Tmd8xYUjri5vGIuQq53bvqVKAui9aaDeC05jPJskWqqTT5zj8FOrqqP5/xLgAAAABJRU5ErkJggg==" alt="actions-info">\
            <span class="info-text">Bot Actions cannot be customized</span>\
          </div>\
        {{/if}}\
        {{if selectedFacet !== appearanceType && selectedFacet == "all results"}}\
            <div class="heading-and-show-all" appearanceType="task">\
                <div class="text-heading-main">ACTIONS</div>\
                <div class="show-all-text display-none">Show all Actions</div>\
            </div>\
        {{/if}}\
        {{if selectedFacet == appearanceType || selectedFacet == "all results"}}\
          <div class="carousel action-results-container carousel-search-data-items">\
            {{each(key, task) structuredData}}\
              <div class="slide">\
                <div class="title-box-data text-truncate">\
                    <div id="${key}" class="search-task search-grid-item text-truncate one-line-height" title="${task.name}" contentId="${task.taskId}" contentType="${task.contentType}" childBotId="${task.childBotId}" childBotName="${task.childBotName}" payload="${task.payload}" seqLogId="${task.seqLogId}">${task.titleText}</div>\
                    {{if task.childBotName !=="" && task.childBotName !== undefined}}\
                      <div class="child-bot">${task.childBotName}</div>\
                    {{/if}}\
                </div>\
              </div>\
            {{/each}}\
          </div>\
        {{/if}}\
        </div>\
      {{/if}}\
        {{/if}}\
        </script>'
        if (type === 'searchCarouselTemplate') {
            return searchCarouselTemplate;
        }
    }





}

export default SearchCarouselViewTemplate;


// getTemplateString(type: any) {
    //     const searchCarouselTemplate = '<script type="text/x-jqury-tmpl">\
    //         <div class="title-list-heading">Template title comes here</div>\
    //         <div class="search-list-template-carousel">\
    //             <div class="carousel">\
    //                 <div class="slide grid-item-col">\
    //                     <div class="content-info-grid">\
    //                         <div class="heading-title">\
    //                             <span>Description comes here</span>\
    //                         </div>\
    //                         <div class="desc_text_info">Description comes here, descrip  tion comes here, description comes here, description comes here, description comes here, description comes here, desc....</div>\
    //                     </div>\
    //                 </div>\
    //                 <div class="slide grid-item-col">\
    //                     <div class="content-info-grid">\
    //                         <div class="heading-title">\
    //                             <span>Description comes here</span>\
    //                         </div>\
    //                         <div class="desc_text_info">Description comes here, descrip  tion comes here, description comes here, description comes here, description comes here, description comes here, desc....</div>\
    //                     </div>\
    //                 </div>\
    //                 <div class="slide grid-item-col">\
    //                     <div class="content-info-grid">\
    //                         <div class="heading-title">\
    //                             <span>Description comes here</span>\
    //                         </div>\
    //                         <div class="desc_text_info">Description comes here, descrip  tion comes here, description comes here, description comes here, description comes here, description comes here, desc....</div>\
    //                     </div>\
    //                 </div>\
    //                 <div class="slide grid-item-col">\
    //                     <div class="content-info-grid">\
    //                         <div class="heading-title">\
    //                             <span>Description comes here</span>\
    //                         </div>\
    //                         <div class="desc_text_info">Description comes here, descrip  tion comes here, description comes here, description comes here, description comes here, description comes here, desc....</div>\
    //                     </div>\
    //                 </div>\
    //             </div>\
    //         </div>\
    //     </script>'
    //     if (type === 'searchCarouselTemplate') {
    //         return searchCarouselTemplate;
    //     }
    // }

    // getTemplateString(type: any) {
    //     const searchCarouselTemplate = '<script type="text/x-jqury-tmpl">\
    //         <div class="title-list-heading">Template title comes here</div>\
    //         <div class="search-list-template-carousel-img-title">\
    //             <div class="carousel">\
    //                 <div class="slide grid-item-col">\
    //                     <div class="content-info-grid">\
    //                         <div class="heading-title">\
    //                         <div class="img_block">\
    //                             <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAnCAYAAAB0Q6rCAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPISURBVHgB1ZhPUhpBFMZf9yCYMmXIDcgJgkvFRLpAq1xFTiCeQHICzQkkJ5CcAHap8k81aoCl5AaTE4RFNpLwOv1GZ2iGYZghiuRbqN12V/+q5/X3XjeDB9WlTK/CUhks6y0skgZ41Yd+c1cIm5qMfpxJmbV4UupmGhZT9gBVaUfkuuyrlJkkT94uMKyrXh/v1hJJa/kIlHqAVT1QvIEKf8ACiAHLMA77D830EiQrCaVUlrkjED4WxHoNFkjn8luXc35CfzPOPnAN64UCAtqwcFJds5WAZxK50ktIZH/Bn25JiF7UeRyeQfK6fbLKUz85tyT9lled/ahz5w58KVtlVFAx+xBU7Uy2slHmzx2YWTxwN7Uj5CGC5g6sgEWO1yDNH3jQ/xLQ20sAa0AEzR24KN43ENUnJ0k5Uj1E1EaxbkeZPzPwubzJw4zaFrnjwlbudR/ZG/q9Ld41o86dCZhsiSwpjh0FaTfirpqKDSxvOkeuLWk7qka1o8dSLGAHFtWx0ZW2OJNxoSnLwYyKDHwh23s+WFcEXacyFSKIxunsdnt53TqFGRQJmBZhXJkL2OCcdE+6pk7JadD3tXdK0nhQrDwL9FTg4SLMq5k5MlHQJ11DH0AM6CWeqjuwrjQ0hRk8FjDFmrcj7hrIDlzP1NA1DNhpGRCj5Cy6lB2LdQqzONChwK+s5ZEdIbii2BjJSOSpfmjlgzadhaQQKdvZs0BPBKYd0beRvAlLcEFj/dBK7yRaqVMP1jis+n/dotgsU1iNQUfw9UDgoB2ZBGtCK8BhnaBg7+K6I33OYlv4gkCBwmoMWpeZ06D5OGz70L8jFqxUIIKKW5tlE5oZX4jACFCINa9aG0KrngEdmoz4aMPKIkLVXMRCVjIXmSYLf1f04eqOLeTAjqdi6hsgmNChyYj7Wicm7KRFwqQn9BjeiTHoBEz81PRAQhWb0TUxGU08dFy/tIgZihPSPTQjANvtozC7lO2JoeVUbAG+zi2eGeEKmqyfhbTX5rrwDwo6VPQFww4V+Tq9jRhdOiOOfPVxYLKnHZr4CJrkBGG1dEFsVEd9ffQJjfthp9lXXN0fKlUynUDX0vUwJwhIRp58O4xNeALRoQpygrC6w/F1VJ/9/XO70xG0woF5qNLTiqWiyFVGkhHM+RJKF9C4FZ7e5ZrZ9gFbT37diVPhkTgMbU1n3R67kK2qfsY89EYw3jAPyJNJ4Z7PAWxgrBk6TrEak7KTQY7/wQs8XRz4Gh/mcsPgF04EC06Z4D2+OzsNmNchsQWLJDX4zmGl5hZgfwFKpyGomp0UxAAAAABJRU5ErkJggg==">\
    //                         </div>\
    //                         <span>Description comes here</span>\
    //                         </div>\
    //                         <div class="desc_text_info">Description comes here, descrip  tion comes here, description comes here, description comes here, description comes here, description comes here, desc....</div>\
    //                     </div>\
    //                 </div>\
    //                 <div class="slide grid-item-col">\
    //                     <div class="content-info-grid">\
    //                         <div class="heading-title">\
    //                         <div class="img_block">\
    //                             <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAnCAYAAAB0Q6rCAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPISURBVHgB1ZhPUhpBFMZf9yCYMmXIDcgJgkvFRLpAq1xFTiCeQHICzQkkJ5CcAHap8k81aoCl5AaTE4RFNpLwOv1GZ2iGYZghiuRbqN12V/+q5/X3XjeDB9WlTK/CUhks6y0skgZ41Yd+c1cIm5qMfpxJmbV4UupmGhZT9gBVaUfkuuyrlJkkT94uMKyrXh/v1hJJa/kIlHqAVT1QvIEKf8ACiAHLMA77D830EiQrCaVUlrkjED4WxHoNFkjn8luXc35CfzPOPnAN64UCAtqwcFJds5WAZxK50ktIZH/Bn25JiF7UeRyeQfK6fbLKUz85tyT9lled/ahz5w58KVtlVFAx+xBU7Uy2slHmzx2YWTxwN7Uj5CGC5g6sgEWO1yDNH3jQ/xLQ20sAa0AEzR24KN43ENUnJ0k5Uj1E1EaxbkeZPzPwubzJw4zaFrnjwlbudR/ZG/q9Ld41o86dCZhsiSwpjh0FaTfirpqKDSxvOkeuLWk7qka1o8dSLGAHFtWx0ZW2OJNxoSnLwYyKDHwh23s+WFcEXacyFSKIxunsdnt53TqFGRQJmBZhXJkL2OCcdE+6pk7JadD3tXdK0nhQrDwL9FTg4SLMq5k5MlHQJ11DH0AM6CWeqjuwrjQ0hRk8FjDFmrcj7hrIDlzP1NA1DNhpGRCj5Cy6lB2LdQqzONChwK+s5ZEdIbii2BjJSOSpfmjlgzadhaQQKdvZs0BPBKYd0beRvAlLcEFj/dBK7yRaqVMP1jis+n/dotgsU1iNQUfw9UDgoB2ZBGtCK8BhnaBg7+K6I33OYlv4gkCBwmoMWpeZ06D5OGz70L8jFqxUIIKKW5tlE5oZX4jACFCINa9aG0KrngEdmoz4aMPKIkLVXMRCVjIXmSYLf1f04eqOLeTAjqdi6hsgmNChyYj7Wicm7KRFwqQn9BjeiTHoBEz81PRAQhWb0TUxGU08dFy/tIgZihPSPTQjANvtozC7lO2JoeVUbAG+zi2eGeEKmqyfhbTX5rrwDwo6VPQFww4V+Tq9jRhdOiOOfPVxYLKnHZr4CJrkBGG1dEFsVEd9ffQJjfthp9lXXN0fKlUynUDX0vUwJwhIRp58O4xNeALRoQpygrC6w/F1VJ/9/XO70xG0woF5qNLTiqWiyFVGkhHM+RJKF9C4FZ7e5ZrZ9gFbT37diVPhkTgMbU1n3R67kK2qfsY89EYw3jAPyJNJ4Z7PAWxgrBk6TrEak7KTQY7/wQs8XRz4Gh/mcsPgF04EC06Z4D2+OzsNmNchsQWLJDX4zmGl5hZgfwFKpyGomp0UxAAAAABJRU5ErkJggg==">\
    //                         </div>\
    //                         <span>Description comes here</span>\
    //                         </div>\
    //                         <div class="desc_text_info">Description comes here, descrip  tion comes here, description comes here, description comes here, description comes here, description comes here, desc....</div>\
    //                     </div>\
    //                 </div>\
    //                 <div class="slide grid-item-col">\
    //                     <div class="content-info-grid">\
    //                         <div class="heading-title">\
    //                         <div class="img_block">\
    //                             <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAnCAYAAAB0Q6rCAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPISURBVHgB1ZhPUhpBFMZf9yCYMmXIDcgJgkvFRLpAq1xFTiCeQHICzQkkJ5CcAHap8k81aoCl5AaTE4RFNpLwOv1GZ2iGYZghiuRbqN12V/+q5/X3XjeDB9WlTK/CUhks6y0skgZ41Yd+c1cIm5qMfpxJmbV4UupmGhZT9gBVaUfkuuyrlJkkT94uMKyrXh/v1hJJa/kIlHqAVT1QvIEKf8ACiAHLMA77D830EiQrCaVUlrkjED4WxHoNFkjn8luXc35CfzPOPnAN64UCAtqwcFJds5WAZxK50ktIZH/Bn25JiF7UeRyeQfK6fbLKUz85tyT9lled/ahz5w58KVtlVFAx+xBU7Uy2slHmzx2YWTxwN7Uj5CGC5g6sgEWO1yDNH3jQ/xLQ20sAa0AEzR24KN43ENUnJ0k5Uj1E1EaxbkeZPzPwubzJw4zaFrnjwlbudR/ZG/q9Ld41o86dCZhsiSwpjh0FaTfirpqKDSxvOkeuLWk7qka1o8dSLGAHFtWx0ZW2OJNxoSnLwYyKDHwh23s+WFcEXacyFSKIxunsdnt53TqFGRQJmBZhXJkL2OCcdE+6pk7JadD3tXdK0nhQrDwL9FTg4SLMq5k5MlHQJ11DH0AM6CWeqjuwrjQ0hRk8FjDFmrcj7hrIDlzP1NA1DNhpGRCj5Cy6lB2LdQqzONChwK+s5ZEdIbii2BjJSOSpfmjlgzadhaQQKdvZs0BPBKYd0beRvAlLcEFj/dBK7yRaqVMP1jis+n/dotgsU1iNQUfw9UDgoB2ZBGtCK8BhnaBg7+K6I33OYlv4gkCBwmoMWpeZ06D5OGz70L8jFqxUIIKKW5tlE5oZX4jACFCINa9aG0KrngEdmoz4aMPKIkLVXMRCVjIXmSYLf1f04eqOLeTAjqdi6hsgmNChyYj7Wicm7KRFwqQn9BjeiTHoBEz81PRAQhWb0TUxGU08dFy/tIgZihPSPTQjANvtozC7lO2JoeVUbAG+zi2eGeEKmqyfhbTX5rrwDwo6VPQFww4V+Tq9jRhdOiOOfPVxYLKnHZr4CJrkBGG1dEFsVEd9ffQJjfthp9lXXN0fKlUynUDX0vUwJwhIRp58O4xNeALRoQpygrC6w/F1VJ/9/XO70xG0woF5qNLTiqWiyFVGkhHM+RJKF9C4FZ7e5ZrZ9gFbT37diVPhkTgMbU1n3R67kK2qfsY89EYw3jAPyJNJ4Z7PAWxgrBk6TrEak7KTQY7/wQs8XRz4Gh/mcsPgF04EC06Z4D2+OzsNmNchsQWLJDX4zmGl5hZgfwFKpyGomp0UxAAAAABJRU5ErkJggg==">\
    //                         </div>\
    //                         <span>Description comes here</span>\
    //                         </div>\
    //                         <div class="desc_text_info">Description comes here, descrip  tion comes here, description comes here, description comes here, description comes here, description comes here, desc....</div>\
    //                     </div>\
    //                 </div>\
    //                 <div class="slide grid-item-col">\
    //                     <div class="content-info-grid">\
    //                         <div class="heading-title">\
    //                         <div class="img_block">\
    //                             <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAnCAYAAAB0Q6rCAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPISURBVHgB1ZhPUhpBFMZf9yCYMmXIDcgJgkvFRLpAq1xFTiCeQHICzQkkJ5CcAHap8k81aoCl5AaTE4RFNpLwOv1GZ2iGYZghiuRbqN12V/+q5/X3XjeDB9WlTK/CUhks6y0skgZ41Yd+c1cIm5qMfpxJmbV4UupmGhZT9gBVaUfkuuyrlJkkT94uMKyrXh/v1hJJa/kIlHqAVT1QvIEKf8ACiAHLMA77D830EiQrCaVUlrkjED4WxHoNFkjn8luXc35CfzPOPnAN64UCAtqwcFJds5WAZxK50ktIZH/Bn25JiF7UeRyeQfK6fbLKUz85tyT9lled/ahz5w58KVtlVFAx+xBU7Uy2slHmzx2YWTxwN7Uj5CGC5g6sgEWO1yDNH3jQ/xLQ20sAa0AEzR24KN43ENUnJ0k5Uj1E1EaxbkeZPzPwubzJw4zaFrnjwlbudR/ZG/q9Ld41o86dCZhsiSwpjh0FaTfirpqKDSxvOkeuLWk7qka1o8dSLGAHFtWx0ZW2OJNxoSnLwYyKDHwh23s+WFcEXacyFSKIxunsdnt53TqFGRQJmBZhXJkL2OCcdE+6pk7JadD3tXdK0nhQrDwL9FTg4SLMq5k5MlHQJ11DH0AM6CWeqjuwrjQ0hRk8FjDFmrcj7hrIDlzP1NA1DNhpGRCj5Cy6lB2LdQqzONChwK+s5ZEdIbii2BjJSOSpfmjlgzadhaQQKdvZs0BPBKYd0beRvAlLcEFj/dBK7yRaqVMP1jis+n/dotgsU1iNQUfw9UDgoB2ZBGtCK8BhnaBg7+K6I33OYlv4gkCBwmoMWpeZ06D5OGz70L8jFqxUIIKKW5tlE5oZX4jACFCINa9aG0KrngEdmoz4aMPKIkLVXMRCVjIXmSYLf1f04eqOLeTAjqdi6hsgmNChyYj7Wicm7KRFwqQn9BjeiTHoBEz81PRAQhWb0TUxGU08dFy/tIgZihPSPTQjANvtozC7lO2JoeVUbAG+zi2eGeEKmqyfhbTX5rrwDwo6VPQFww4V+Tq9jRhdOiOOfPVxYLKnHZr4CJrkBGG1dEFsVEd9ffQJjfthp9lXXN0fKlUynUDX0vUwJwhIRp58O4xNeALRoQpygrC6w/F1VJ/9/XO70xG0woF5qNLTiqWiyFVGkhHM+RJKF9C4FZ7e5ZrZ9gFbT37diVPhkTgMbU1n3R67kK2qfsY89EYw3jAPyJNJ4Z7PAWxgrBk6TrEak7KTQY7/wQs8XRz4Gh/mcsPgF04EC06Z4D2+OzsNmNchsQWLJDX4zmGl5hZgfwFKpyGomp0UxAAAAABJRU5ErkJggg==">\
    //                         </div>\
    //                         <span>Description comes here</span>\
    //                         </div>\
    //                         <div class="desc_text_info">Description comes here, descrip  tion comes here, description comes here, description comes here, description comes here, description comes here, desc....</div>\
    //                     </div>\
    //                 </div>\
    //             </div>\
    //         </div>\
    //     </script>'
    //     if (type === 'searchCarouselTemplate') {
    //         return searchCarouselTemplate;
    //     }
    // }

    // getTemplateString(type: any) {
    //     const searchCarouselTemplate = '<script type="text/x-jqury-tmpl">\
    //         <div class="title-list-heading">Template title comes here</div>\
    //         <div class="search-list-template-carousel-grid-img">\
    //             <div class="carousel">\
    //                 <div class="slide grid-item-col">\
    //                     <div class="content-info-grid">\
    //                         <div class="img-block-data">\
    //                         <img src="data:image/png;base64,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">\
    //                         </div>\
    //                     </div>\
    //                 </div>\
    //                 <div class="slide grid-item-col">\
    //                     <div class="content-info-grid">\
    //                         <div class="img-block-data">\
    //                         <img src="data:image/png;base64,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">\
    //                         </div>\
    //                     </div>\
    //                 </div>\
    //                 <div class="slide grid-item-col">\
    //                     <div class="content-info-grid">\
    //                         <div class="img-block-data">\
    //                         <img src="data:image/png;base64,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">\
    //                         </div>\
    //                     </div>\
    //                 </div>\
    //                 <div class="slide grid-item-col">\
    //                     <div class="content-info-grid">\
    //                         <div class="img-block-data">\
    //                         <img src="data:image/png;base64,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">\
    //                         </div>\
    //                     </div>\
    //                 </div>\
    //             </div>\
    //         </div>\
    //     </script>'
    //     if (type === 'searchCarouselTemplate') {
    //         return searchCarouselTemplate;
    //     }
    // }

    // getTemplateString(type: any) {
    //     const searchCarouselTemplate = '<script type="text/x-jqury-tmpl">\
    //         <div class="title-list-heading">Template title comes here</div>\
    //         <div class="search-list-template-carousel-title-img-desc">\
    //             <div class="carousel">\
    //                 <div class="slide grid-item-col">\
    //                     <div class="content-info-grid">\
    //                         <div class="heading-title">Heading comes here</div>\
    //                         <div class="img-with-desc">\
    //                             <div class="img_info">\
    //                                 <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAbCAYAAABr/T8RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAK8SURBVHgBvZZdctowEMd35RTKS5rcwDlByWNCM0UT0mc4QeAEdU9QOEHoCUhOAG+daUMVyAT6Br0BN6hfOpM0tbZaGfP9WaD/GQ2WWftnaf9aCcHos1JuzEm8B6AD2JnQhyD4cS5T17ZnoSLWMZc7hA4lBBbl2UkJ683vVSCdJYAuaGgQkA87EAK6KODSwvXT4Z6BJrmjNRXeyVQXdqjbRus1AiSfIZYV0U0nlvgJW9AX9ZDkNus/gTiYTQFblLpvf3QEdrjx9aLYrYGVUgcmXcWob649+B/gdbU1sJTSN6MsRX2toQSbgr+q+/QqcRcyVRQ6ccjtQp6WYRMwm0QIR9WbrStYQVIe+9yWxS0E36pWdmAYAm+ZU6vGYFwJYQXNBfMLUFDFMglsYeGPmAfn+H0R78RFvMoOh38Bh/U7rrh+cynNpE+PI+NYeKN9OfnMCwM0P66JT5Lzsgrrgnm6Qii4pvUcjTm+z8Yh0DcWDnQ9ajhl8s+lEGydJ5+I0vXmQ2Ut8L4Tr4RQ8oVGs0pOetF/mbdv8oh4Zx8UTpVLI0+9Nvnne6SxYL7qgw0mzC/yxBjYBhJk7ai0zo1CI2HwmEOwOT9wBKjIfJyKjDyt2f22D1/kiQFYBI/e6Esu5NndrAe4UGA4/b2RPbzMqYhizs0aHvVEXbW8ueBoukLo8CWz4Sc9TkMI570W0pNOtp7Q9KlPuZo05HiOCWrLoNNwY6Y5Ts7IlDdiyLIxnTsL3BOUKMAaYnigQS5ysqOfvcgTEK6UcXCgKbdKqZuUPbUscHLoiadBWqbAm5xAljmZ4VFapsD6968j2EDLnMxpQRTdEBr4+K3ZVpwf4KnoF4eNZE6sg2WGojYcpTmz92uEGf3RHgZQIEF8rnbNbpCHjYUTHzEunhUzOz0bpVTbDYA8Uw5fwQ6l6c9NVJj+AskwkARcpojIAAAAAElFTkSuQmCC">\
    //                             </div>\
    //                             <div class="desc-text">Men wardrobes there most special piecesa...</div>\
    //                         </div>\
    //                         <div class="img-with-desc">\
    //                             <div class="img_info">\
    //                                 <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAbCAYAAABr/T8RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAK8SURBVHgBvZZdctowEMd35RTKS5rcwDlByWNCM0UT0mc4QeAEdU9QOEHoCUhOAG+daUMVyAT6Br0BN6hfOpM0tbZaGfP9WaD/GQ2WWftnaf9aCcHos1JuzEm8B6AD2JnQhyD4cS5T17ZnoSLWMZc7hA4lBBbl2UkJ683vVSCdJYAuaGgQkA87EAK6KODSwvXT4Z6BJrmjNRXeyVQXdqjbRus1AiSfIZYV0U0nlvgJW9AX9ZDkNus/gTiYTQFblLpvf3QEdrjx9aLYrYGVUgcmXcWob649+B/gdbU1sJTSN6MsRX2toQSbgr+q+/QqcRcyVRQ6ccjtQp6WYRMwm0QIR9WbrStYQVIe+9yWxS0E36pWdmAYAm+ZU6vGYFwJYQXNBfMLUFDFMglsYeGPmAfn+H0R78RFvMoOh38Bh/U7rrh+cynNpE+PI+NYeKN9OfnMCwM0P66JT5Lzsgrrgnm6Qii4pvUcjTm+z8Yh0DcWDnQ9ajhl8s+lEGydJ5+I0vXmQ2Ut8L4Tr4RQ8oVGs0pOetF/mbdv8oh4Zx8UTpVLI0+9Nvnne6SxYL7qgw0mzC/yxBjYBhJk7ai0zo1CI2HwmEOwOT9wBKjIfJyKjDyt2f22D1/kiQFYBI/e6Esu5NndrAe4UGA4/b2RPbzMqYhizs0aHvVEXbW8ueBoukLo8CWz4Sc9TkMI570W0pNOtp7Q9KlPuZo05HiOCWrLoNNwY6Y5Ts7IlDdiyLIxnTsL3BOUKMAaYnigQS5ysqOfvcgTEK6UcXCgKbdKqZuUPbUscHLoiadBWqbAm5xAljmZ4VFapsD6968j2EDLnMxpQRTdEBr4+K3ZVpwf4KnoF4eNZE6sg2WGojYcpTmz92uEGf3RHgZQIEF8rnbNbpCHjYUTHzEunhUzOz0bpVTbDYA8Uw5fwQ6l6c9NVJj+AskwkARcpojIAAAAAElFTkSuQmCC">\
    //                             </div>\
    //                             <div class="desc-text">Men wardrobes there most special piecesa...</div>\
    //                         </div>\
    //                         <div class="img-with-desc">\
    //                             <div class="img_info">\
    //                                 <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAbCAYAAABr/T8RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAK8SURBVHgBvZZdctowEMd35RTKS5rcwDlByWNCM0UT0mc4QeAEdU9QOEHoCUhOAG+daUMVyAT6Br0BN6hfOpM0tbZaGfP9WaD/GQ2WWftnaf9aCcHos1JuzEm8B6AD2JnQhyD4cS5T17ZnoSLWMZc7hA4lBBbl2UkJ683vVSCdJYAuaGgQkA87EAK6KODSwvXT4Z6BJrmjNRXeyVQXdqjbRus1AiSfIZYV0U0nlvgJW9AX9ZDkNus/gTiYTQFblLpvf3QEdrjx9aLYrYGVUgcmXcWob649+B/gdbU1sJTSN6MsRX2toQSbgr+q+/QqcRcyVRQ6ccjtQp6WYRMwm0QIR9WbrStYQVIe+9yWxS0E36pWdmAYAm+ZU6vGYFwJYQXNBfMLUFDFMglsYeGPmAfn+H0R78RFvMoOh38Bh/U7rrh+cynNpE+PI+NYeKN9OfnMCwM0P66JT5Lzsgrrgnm6Qii4pvUcjTm+z8Yh0DcWDnQ9ajhl8s+lEGydJ5+I0vXmQ2Ut8L4Tr4RQ8oVGs0pOetF/mbdv8oh4Zx8UTpVLI0+9Nvnne6SxYL7qgw0mzC/yxBjYBhJk7ai0zo1CI2HwmEOwOT9wBKjIfJyKjDyt2f22D1/kiQFYBI/e6Esu5NndrAe4UGA4/b2RPbzMqYhizs0aHvVEXbW8ueBoukLo8CWz4Sc9TkMI570W0pNOtp7Q9KlPuZo05HiOCWrLoNNwY6Y5Ts7IlDdiyLIxnTsL3BOUKMAaYnigQS5ysqOfvcgTEK6UcXCgKbdKqZuUPbUscHLoiadBWqbAm5xAljmZ4VFapsD6968j2EDLnMxpQRTdEBr4+K3ZVpwf4KnoF4eNZE6sg2WGojYcpTmz92uEGf3RHgZQIEF8rnbNbpCHjYUTHzEunhUzOz0bpVTbDYA8Uw5fwQ6l6c9NVJj+AskwkARcpojIAAAAAElFTkSuQmCC">\
    //                             </div>\
    //                             <div class="desc-text">Men wardrobes there most special piecesa...</div>\
    //                         </div>\
    //                     </div>\
    //                 </div>\
    //                 <div class="slide grid-item-col">\
    //                     <div class="content-info-grid">\
    //                         <div class="heading-title">Heading comes here</div>\
    //                         <div class="img-with-desc">\
    //                             <div class="img_info">\
    //                                 <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAbCAYAAABr/T8RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAK8SURBVHgBvZZdctowEMd35RTKS5rcwDlByWNCM0UT0mc4QeAEdU9QOEHoCUhOAG+daUMVyAT6Br0BN6hfOpM0tbZaGfP9WaD/GQ2WWftnaf9aCcHos1JuzEm8B6AD2JnQhyD4cS5T17ZnoSLWMZc7hA4lBBbl2UkJ683vVSCdJYAuaGgQkA87EAK6KODSwvXT4Z6BJrmjNRXeyVQXdqjbRus1AiSfIZYV0U0nlvgJW9AX9ZDkNus/gTiYTQFblLpvf3QEdrjx9aLYrYGVUgcmXcWob649+B/gdbU1sJTSN6MsRX2toQSbgr+q+/QqcRcyVRQ6ccjtQp6WYRMwm0QIR9WbrStYQVIe+9yWxS0E36pWdmAYAm+ZU6vGYFwJYQXNBfMLUFDFMglsYeGPmAfn+H0R78RFvMoOh38Bh/U7rrh+cynNpE+PI+NYeKN9OfnMCwM0P66JT5Lzsgrrgnm6Qii4pvUcjTm+z8Yh0DcWDnQ9ajhl8s+lEGydJ5+I0vXmQ2Ut8L4Tr4RQ8oVGs0pOetF/mbdv8oh4Zx8UTpVLI0+9Nvnne6SxYL7qgw0mzC/yxBjYBhJk7ai0zo1CI2HwmEOwOT9wBKjIfJyKjDyt2f22D1/kiQFYBI/e6Esu5NndrAe4UGA4/b2RPbzMqYhizs0aHvVEXbW8ueBoukLo8CWz4Sc9TkMI570W0pNOtp7Q9KlPuZo05HiOCWrLoNNwY6Y5Ts7IlDdiyLIxnTsL3BOUKMAaYnigQS5ysqOfvcgTEK6UcXCgKbdKqZuUPbUscHLoiadBWqbAm5xAljmZ4VFapsD6968j2EDLnMxpQRTdEBr4+K3ZVpwf4KnoF4eNZE6sg2WGojYcpTmz92uEGf3RHgZQIEF8rnbNbpCHjYUTHzEunhUzOz0bpVTbDYA8Uw5fwQ6l6c9NVJj+AskwkARcpojIAAAAAElFTkSuQmCC">\
    //                             </div>\
    //                             <div class="desc-text">Men wardrobes there most special piecesa...</div>\
    //                         </div>\
    //                         <div class="img-with-desc">\
    //                             <div class="img_info">\
    //                                 <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAbCAYAAABr/T8RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAK8SURBVHgBvZZdctowEMd35RTKS5rcwDlByWNCM0UT0mc4QeAEdU9QOEHoCUhOAG+daUMVyAT6Br0BN6hfOpM0tbZaGfP9WaD/GQ2WWftnaf9aCcHos1JuzEm8B6AD2JnQhyD4cS5T17ZnoSLWMZc7hA4lBBbl2UkJ683vVSCdJYAuaGgQkA87EAK6KODSwvXT4Z6BJrmjNRXeyVQXdqjbRus1AiSfIZYV0U0nlvgJW9AX9ZDkNus/gTiYTQFblLpvf3QEdrjx9aLYrYGVUgcmXcWob649+B/gdbU1sJTSN6MsRX2toQSbgr+q+/QqcRcyVRQ6ccjtQp6WYRMwm0QIR9WbrStYQVIe+9yWxS0E36pWdmAYAm+ZU6vGYFwJYQXNBfMLUFDFMglsYeGPmAfn+H0R78RFvMoOh38Bh/U7rrh+cynNpE+PI+NYeKN9OfnMCwM0P66JT5Lzsgrrgnm6Qii4pvUcjTm+z8Yh0DcWDnQ9ajhl8s+lEGydJ5+I0vXmQ2Ut8L4Tr4RQ8oVGs0pOetF/mbdv8oh4Zx8UTpVLI0+9Nvnne6SxYL7qgw0mzC/yxBjYBhJk7ai0zo1CI2HwmEOwOT9wBKjIfJyKjDyt2f22D1/kiQFYBI/e6Esu5NndrAe4UGA4/b2RPbzMqYhizs0aHvVEXbW8ueBoukLo8CWz4Sc9TkMI570W0pNOtp7Q9KlPuZo05HiOCWrLoNNwY6Y5Ts7IlDdiyLIxnTsL3BOUKMAaYnigQS5ysqOfvcgTEK6UcXCgKbdKqZuUPbUscHLoiadBWqbAm5xAljmZ4VFapsD6968j2EDLnMxpQRTdEBr4+K3ZVpwf4KnoF4eNZE6sg2WGojYcpTmz92uEGf3RHgZQIEF8rnbNbpCHjYUTHzEunhUzOz0bpVTbDYA8Uw5fwQ6l6c9NVJj+AskwkARcpojIAAAAAElFTkSuQmCC">\
    //                             </div>\
    //                             <div class="desc-text">Men wardrobes there most special piecesa...</div>\
    //                         </div>\
    //                         <div class="img-with-desc">\
    //                             <div class="img_info">\
    //                                 <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAbCAYAAABr/T8RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAK8SURBVHgBvZZdctowEMd35RTKS5rcwDlByWNCM0UT0mc4QeAEdU9QOEHoCUhOAG+daUMVyAT6Br0BN6hfOpM0tbZaGfP9WaD/GQ2WWftnaf9aCcHos1JuzEm8B6AD2JnQhyD4cS5T17ZnoSLWMZc7hA4lBBbl2UkJ683vVSCdJYAuaGgQkA87EAK6KODSwvXT4Z6BJrmjNRXeyVQXdqjbRus1AiSfIZYV0U0nlvgJW9AX9ZDkNus/gTiYTQFblLpvf3QEdrjx9aLYrYGVUgcmXcWob649+B/gdbU1sJTSN6MsRX2toQSbgr+q+/QqcRcyVRQ6ccjtQp6WYRMwm0QIR9WbrStYQVIe+9yWxS0E36pWdmAYAm+ZU6vGYFwJYQXNBfMLUFDFMglsYeGPmAfn+H0R78RFvMoOh38Bh/U7rrh+cynNpE+PI+NYeKN9OfnMCwM0P66JT5Lzsgrrgnm6Qii4pvUcjTm+z8Yh0DcWDnQ9ajhl8s+lEGydJ5+I0vXmQ2Ut8L4Tr4RQ8oVGs0pOetF/mbdv8oh4Zx8UTpVLI0+9Nvnne6SxYL7qgw0mzC/yxBjYBhJk7ai0zo1CI2HwmEOwOT9wBKjIfJyKjDyt2f22D1/kiQFYBI/e6Esu5NndrAe4UGA4/b2RPbzMqYhizs0aHvVEXbW8ueBoukLo8CWz4Sc9TkMI570W0pNOtp7Q9KlPuZo05HiOCWrLoNNwY6Y5Ts7IlDdiyLIxnTsL3BOUKMAaYnigQS5ysqOfvcgTEK6UcXCgKbdKqZuUPbUscHLoiadBWqbAm5xAljmZ4VFapsD6968j2EDLnMxpQRTdEBr4+K3ZVpwf4KnoF4eNZE6sg2WGojYcpTmz92uEGf3RHgZQIEF8rnbNbpCHjYUTHzEunhUzOz0bpVTbDYA8Uw5fwQ6l6c9NVJj+AskwkARcpojIAAAAAElFTkSuQmCC">\
    //                             </div>\
    //                             <div class="desc-text">Men wardrobes there most special piecesa...</div>\
    //                         </div>\
    //                     </div>\
    //                 </div>\
    //                 <div class="slide grid-item-col">\
    //                     <div class="content-info-grid">\
    //                         <div class="heading-title">Heading comes here</div>\
    //                         <div class="img-with-desc">\
    //                             <div class="img_info">\
    //                                 <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAbCAYAAABr/T8RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAK8SURBVHgBvZZdctowEMd35RTKS5rcwDlByWNCM0UT0mc4QeAEdU9QOEHoCUhOAG+daUMVyAT6Br0BN6hfOpM0tbZaGfP9WaD/GQ2WWftnaf9aCcHos1JuzEm8B6AD2JnQhyD4cS5T17ZnoSLWMZc7hA4lBBbl2UkJ683vVSCdJYAuaGgQkA87EAK6KODSwvXT4Z6BJrmjNRXeyVQXdqjbRus1AiSfIZYV0U0nlvgJW9AX9ZDkNus/gTiYTQFblLpvf3QEdrjx9aLYrYGVUgcmXcWob649+B/gdbU1sJTSN6MsRX2toQSbgr+q+/QqcRcyVRQ6ccjtQp6WYRMwm0QIR9WbrStYQVIe+9yWxS0E36pWdmAYAm+ZU6vGYFwJYQXNBfMLUFDFMglsYeGPmAfn+H0R78RFvMoOh38Bh/U7rrh+cynNpE+PI+NYeKN9OfnMCwM0P66JT5Lzsgrrgnm6Qii4pvUcjTm+z8Yh0DcWDnQ9ajhl8s+lEGydJ5+I0vXmQ2Ut8L4Tr4RQ8oVGs0pOetF/mbdv8oh4Zx8UTpVLI0+9Nvnne6SxYL7qgw0mzC/yxBjYBhJk7ai0zo1CI2HwmEOwOT9wBKjIfJyKjDyt2f22D1/kiQFYBI/e6Esu5NndrAe4UGA4/b2RPbzMqYhizs0aHvVEXbW8ueBoukLo8CWz4Sc9TkMI570W0pNOtp7Q9KlPuZo05HiOCWrLoNNwY6Y5Ts7IlDdiyLIxnTsL3BOUKMAaYnigQS5ysqOfvcgTEK6UcXCgKbdKqZuUPbUscHLoiadBWqbAm5xAljmZ4VFapsD6968j2EDLnMxpQRTdEBr4+K3ZVpwf4KnoF4eNZE6sg2WGojYcpTmz92uEGf3RHgZQIEF8rnbNbpCHjYUTHzEunhUzOz0bpVTbDYA8Uw5fwQ6l6c9NVJj+AskwkARcpojIAAAAAElFTkSuQmCC">\
    //                             </div>\
    //                             <div class="desc-text">Men wardrobes there most special piecesa...</div>\
    //                         </div>\
    //                         <div class="img-with-desc">\
    //                             <div class="img_info">\
    //                                 <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAbCAYAAABr/T8RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAK8SURBVHgBvZZdctowEMd35RTKS5rcwDlByWNCM0UT0mc4QeAEdU9QOEHoCUhOAG+daUMVyAT6Br0BN6hfOpM0tbZaGfP9WaD/GQ2WWftnaf9aCcHos1JuzEm8B6AD2JnQhyD4cS5T17ZnoSLWMZc7hA4lBBbl2UkJ683vVSCdJYAuaGgQkA87EAK6KODSwvXT4Z6BJrmjNRXeyVQXdqjbRus1AiSfIZYV0U0nlvgJW9AX9ZDkNus/gTiYTQFblLpvf3QEdrjx9aLYrYGVUgcmXcWob649+B/gdbU1sJTSN6MsRX2toQSbgr+q+/QqcRcyVRQ6ccjtQp6WYRMwm0QIR9WbrStYQVIe+9yWxS0E36pWdmAYAm+ZU6vGYFwJYQXNBfMLUFDFMglsYeGPmAfn+H0R78RFvMoOh38Bh/U7rrh+cynNpE+PI+NYeKN9OfnMCwM0P66JT5Lzsgrrgnm6Qii4pvUcjTm+z8Yh0DcWDnQ9ajhl8s+lEGydJ5+I0vXmQ2Ut8L4Tr4RQ8oVGs0pOetF/mbdv8oh4Zx8UTpVLI0+9Nvnne6SxYL7qgw0mzC/yxBjYBhJk7ai0zo1CI2HwmEOwOT9wBKjIfJyKjDyt2f22D1/kiQFYBI/e6Esu5NndrAe4UGA4/b2RPbzMqYhizs0aHvVEXbW8ueBoukLo8CWz4Sc9TkMI570W0pNOtp7Q9KlPuZo05HiOCWrLoNNwY6Y5Ts7IlDdiyLIxnTsL3BOUKMAaYnigQS5ysqOfvcgTEK6UcXCgKbdKqZuUPbUscHLoiadBWqbAm5xAljmZ4VFapsD6968j2EDLnMxpQRTdEBr4+K3ZVpwf4KnoF4eNZE6sg2WGojYcpTmz92uEGf3RHgZQIEF8rnbNbpCHjYUTHzEunhUzOz0bpVTbDYA8Uw5fwQ6l6c9NVJj+AskwkARcpojIAAAAAElFTkSuQmCC">\
    //                             </div>\
    //                             <div class="desc-text">Men wardrobes there most special piecesa...</div>\
    //                         </div>\
    //                         <div class="img-with-desc">\
    //                             <div class="img_info">\
    //                                 <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAbCAYAAABr/T8RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAK8SURBVHgBvZZdctowEMd35RTKS5rcwDlByWNCM0UT0mc4QeAEdU9QOEHoCUhOAG+daUMVyAT6Br0BN6hfOpM0tbZaGfP9WaD/GQ2WWftnaf9aCcHos1JuzEm8B6AD2JnQhyD4cS5T17ZnoSLWMZc7hA4lBBbl2UkJ683vVSCdJYAuaGgQkA87EAK6KODSwvXT4Z6BJrmjNRXeyVQXdqjbRus1AiSfIZYV0U0nlvgJW9AX9ZDkNus/gTiYTQFblLpvf3QEdrjx9aLYrYGVUgcmXcWob649+B/gdbU1sJTSN6MsRX2toQSbgr+q+/QqcRcyVRQ6ccjtQp6WYRMwm0QIR9WbrStYQVIe+9yWxS0E36pWdmAYAm+ZU6vGYFwJYQXNBfMLUFDFMglsYeGPmAfn+H0R78RFvMoOh38Bh/U7rrh+cynNpE+PI+NYeKN9OfnMCwM0P66JT5Lzsgrrgnm6Qii4pvUcjTm+z8Yh0DcWDnQ9ajhl8s+lEGydJ5+I0vXmQ2Ut8L4Tr4RQ8oVGs0pOetF/mbdv8oh4Zx8UTpVLI0+9Nvnne6SxYL7qgw0mzC/yxBjYBhJk7ai0zo1CI2HwmEOwOT9wBKjIfJyKjDyt2f22D1/kiQFYBI/e6Esu5NndrAe4UGA4/b2RPbzMqYhizs0aHvVEXbW8ueBoukLo8CWz4Sc9TkMI570W0pNOtp7Q9KlPuZo05HiOCWrLoNNwY6Y5Ts7IlDdiyLIxnTsL3BOUKMAaYnigQS5ysqOfvcgTEK6UcXCgKbdKqZuUPbUscHLoiadBWqbAm5xAljmZ4VFapsD6968j2EDLnMxpQRTdEBr4+K3ZVpwf4KnoF4eNZE6sg2WGojYcpTmz92uEGf3RHgZQIEF8rnbNbpCHjYUTHzEunhUzOz0bpVTbDYA8Uw5fwQ6l6c9NVJj+AskwkARcpojIAAAAAElFTkSuQmCC">\
    //                             </div>\
    //                             <div class="desc-text">Men wardrobes there most special piecesa...</div>\
    //                         </div>\
    //                     </div>\
    //                 </div>\
    //                 <div class="slide grid-item-col">\
    //                     <div class="content-info-grid">\
    //                         <div class="heading-title">Heading comes here</div>\
    //                         <div class="img-with-desc">\
    //                             <div class="img_info">\
    //                                 <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAbCAYAAABr/T8RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAK8SURBVHgBvZZdctowEMd35RTKS5rcwDlByWNCM0UT0mc4QeAEdU9QOEHoCUhOAG+daUMVyAT6Br0BN6hfOpM0tbZaGfP9WaD/GQ2WWftnaf9aCcHos1JuzEm8B6AD2JnQhyD4cS5T17ZnoSLWMZc7hA4lBBbl2UkJ683vVSCdJYAuaGgQkA87EAK6KODSwvXT4Z6BJrmjNRXeyVQXdqjbRus1AiSfIZYV0U0nlvgJW9AX9ZDkNus/gTiYTQFblLpvf3QEdrjx9aLYrYGVUgcmXcWob649+B/gdbU1sJTSN6MsRX2toQSbgr+q+/QqcRcyVRQ6ccjtQp6WYRMwm0QIR9WbrStYQVIe+9yWxS0E36pWdmAYAm+ZU6vGYFwJYQXNBfMLUFDFMglsYeGPmAfn+H0R78RFvMoOh38Bh/U7rrh+cynNpE+PI+NYeKN9OfnMCwM0P66JT5Lzsgrrgnm6Qii4pvUcjTm+z8Yh0DcWDnQ9ajhl8s+lEGydJ5+I0vXmQ2Ut8L4Tr4RQ8oVGs0pOetF/mbdv8oh4Zx8UTpVLI0+9Nvnne6SxYL7qgw0mzC/yxBjYBhJk7ai0zo1CI2HwmEOwOT9wBKjIfJyKjDyt2f22D1/kiQFYBI/e6Esu5NndrAe4UGA4/b2RPbzMqYhizs0aHvVEXbW8ueBoukLo8CWz4Sc9TkMI570W0pNOtp7Q9KlPuZo05HiOCWrLoNNwY6Y5Ts7IlDdiyLIxnTsL3BOUKMAaYnigQS5ysqOfvcgTEK6UcXCgKbdKqZuUPbUscHLoiadBWqbAm5xAljmZ4VFapsD6968j2EDLnMxpQRTdEBr4+K3ZVpwf4KnoF4eNZE6sg2WGojYcpTmz92uEGf3RHgZQIEF8rnbNbpCHjYUTHzEunhUzOz0bpVTbDYA8Uw5fwQ6l6c9NVJj+AskwkARcpojIAAAAAElFTkSuQmCC">\
    //                             </div>\
    //                             <div class="desc-text">Men wardrobes there most special piecesa...</div>\
    //                         </div>\
    //                         <div class="img-with-desc">\
    //                             <div class="img_info">\
    //                                 <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAbCAYAAABr/T8RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAK8SURBVHgBvZZdctowEMd35RTKS5rcwDlByWNCM0UT0mc4QeAEdU9QOEHoCUhOAG+daUMVyAT6Br0BN6hfOpM0tbZaGfP9WaD/GQ2WWftnaf9aCcHos1JuzEm8B6AD2JnQhyD4cS5T17ZnoSLWMZc7hA4lBBbl2UkJ683vVSCdJYAuaGgQkA87EAK6KODSwvXT4Z6BJrmjNRXeyVQXdqjbRus1AiSfIZYV0U0nlvgJW9AX9ZDkNus/gTiYTQFblLpvf3QEdrjx9aLYrYGVUgcmXcWob649+B/gdbU1sJTSN6MsRX2toQSbgr+q+/QqcRcyVRQ6ccjtQp6WYRMwm0QIR9WbrStYQVIe+9yWxS0E36pWdmAYAm+ZU6vGYFwJYQXNBfMLUFDFMglsYeGPmAfn+H0R78RFvMoOh38Bh/U7rrh+cynNpE+PI+NYeKN9OfnMCwM0P66JT5Lzsgrrgnm6Qii4pvUcjTm+z8Yh0DcWDnQ9ajhl8s+lEGydJ5+I0vXmQ2Ut8L4Tr4RQ8oVGs0pOetF/mbdv8oh4Zx8UTpVLI0+9Nvnne6SxYL7qgw0mzC/yxBjYBhJk7ai0zo1CI2HwmEOwOT9wBKjIfJyKjDyt2f22D1/kiQFYBI/e6Esu5NndrAe4UGA4/b2RPbzMqYhizs0aHvVEXbW8ueBoukLo8CWz4Sc9TkMI570W0pNOtp7Q9KlPuZo05HiOCWrLoNNwY6Y5Ts7IlDdiyLIxnTsL3BOUKMAaYnigQS5ysqOfvcgTEK6UcXCgKbdKqZuUPbUscHLoiadBWqbAm5xAljmZ4VFapsD6968j2EDLnMxpQRTdEBr4+K3ZVpwf4KnoF4eNZE6sg2WGojYcpTmz92uEGf3RHgZQIEF8rnbNbpCHjYUTHzEunhUzOz0bpVTbDYA8Uw5fwQ6l6c9NVJj+AskwkARcpojIAAAAAElFTkSuQmCC">\
    //                             </div>\
    //                             <div class="desc-text">Men wardrobes there most special piecesa...</div>\
    //                         </div>\
    //                         <div class="img-with-desc">\
    //                             <div class="img_info">\
    //                                 <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAbCAYAAABr/T8RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAK8SURBVHgBvZZdctowEMd35RTKS5rcwDlByWNCM0UT0mc4QeAEdU9QOEHoCUhOAG+daUMVyAT6Br0BN6hfOpM0tbZaGfP9WaD/GQ2WWftnaf9aCcHos1JuzEm8B6AD2JnQhyD4cS5T17ZnoSLWMZc7hA4lBBbl2UkJ683vVSCdJYAuaGgQkA87EAK6KODSwvXT4Z6BJrmjNRXeyVQXdqjbRus1AiSfIZYV0U0nlvgJW9AX9ZDkNus/gTiYTQFblLpvf3QEdrjx9aLYrYGVUgcmXcWob649+B/gdbU1sJTSN6MsRX2toQSbgr+q+/QqcRcyVRQ6ccjtQp6WYRMwm0QIR9WbrStYQVIe+9yWxS0E36pWdmAYAm+ZU6vGYFwJYQXNBfMLUFDFMglsYeGPmAfn+H0R78RFvMoOh38Bh/U7rrh+cynNpE+PI+NYeKN9OfnMCwM0P66JT5Lzsgrrgnm6Qii4pvUcjTm+z8Yh0DcWDnQ9ajhl8s+lEGydJ5+I0vXmQ2Ut8L4Tr4RQ8oVGs0pOetF/mbdv8oh4Zx8UTpVLI0+9Nvnne6SxYL7qgw0mzC/yxBjYBhJk7ai0zo1CI2HwmEOwOT9wBKjIfJyKjDyt2f22D1/kiQFYBI/e6Esu5NndrAe4UGA4/b2RPbzMqYhizs0aHvVEXbW8ueBoukLo8CWz4Sc9TkMI570W0pNOtp7Q9KlPuZo05HiOCWrLoNNwY6Y5Ts7IlDdiyLIxnTsL3BOUKMAaYnigQS5ysqOfvcgTEK6UcXCgKbdKqZuUPbUscHLoiadBWqbAm5xAljmZ4VFapsD6968j2EDLnMxpQRTdEBr4+K3ZVpwf4KnoF4eNZE6sg2WGojYcpTmz92uEGf3RHgZQIEF8rnbNbpCHjYUTHzEunhUzOz0bpVTbDYA8Uw5fwQ6l6c9NVJj+AskwkARcpojIAAAAAElFTkSuQmCC">\
    //                             </div>\
    //                             <div class="desc-text">Men wardrobes there most special piecesa...</div>\
    //                         </div>\
    //                     </div>\
    //                 </div>\
    //             </div>\
    //         </div>\
    //     </script>'
    //     if (type === 'searchCarouselTemplate') {
    //         return searchCarouselTemplate;
    //     }
    // }

    // getTemplateString(type: any) {
    //     const searchCarouselTemplate = '<script type="text/x-jqury-tmpl">\
    //         <div class="title-list-heading">Template title comes here</div>\
    //         <div class="search-list-template-carousel-title-img-card">\
    //             <div class="carousel">\
    //                 <div class="slide grid-item-col">\
    //                     <div class="content-info-grid">\
    //                         <div class="main-img-block">\
    //                             <img src="data:image/png;base64,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">\
    //                         </div>\
    //                         <div class="heading-title">Heading comes here</div>\
    //                         <div class="desc-text">Description text comes here, Description text comes here.</div>\
    //                         <div class="price-tag">$156</div>\
    //                     </div>\
    //                 </div>\
    //                 <div class="slide grid-item-col">\
    //                     <div class="content-info-grid">\
    //                         <div class="main-img-block">\
    //                             <img src="data:image/png;base64,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">\
    //                         </div>\
    //                         <div class="heading-title">Heading comes here</div>\
    //                         <div class="desc-text">Description text comes here, Description text comes here.</div>\
    //                         <div class="price-tag">$156</div>\
    //                     </div>\
    //                 </div>\
    //                 <div class="slide grid-item-col">\
    //                     <div class="content-info-grid">\
    //                         <div class="main-img-block">\
    //                             <img src="data:image/png;base64,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">\
    //                         </div>\
    //                         <div class="heading-title">Heading comes here</div>\
    //                         <div class="desc-text">Description text comes here, Description text comes here.</div>\
    //                         <div class="price-tag">$156</div>\
    //                     </div>\
    //                 </div>\
    //                 <div class="slide grid-item-col">\
    //                     <div class="content-info-grid">\
    //                         <div class="main-img-block">\
    //                             <img src="data:image/png;base64,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">\
    //                         </div>\
    //                         <div class="heading-title">Heading comes here</div>\
    //                         <div class="desc-text">Description text comes here, Description text comes here.</div>\
    //                         <div class="price-tag">$156</div>\
    //                     </div>\
    //                 </div>\
    //             </div>\
    //         </div>\
    //     </script>'
    //     if (type === 'searchCarouselTemplate') {
    //         return searchCarouselTemplate;
    //     }
    // }