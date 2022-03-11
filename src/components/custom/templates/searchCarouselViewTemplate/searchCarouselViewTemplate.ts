
import helpers from '../../../../utils/helpers';
import PureJSCarousel from '../../../../../libs/purejscarousel';
class SearchCarouselViewTemplate {

    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        me.helpersObj = helpers;
        if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component?.payload && msgData.message[0].component?.payload?.template_type == 'searchCarouselTemplate') {
            if (!msgData.message[0].component.payload.helpers) {
                msgData.message[0].component.payload['helpers'] = me.helpersObj.helpers;
            }
            msgData.message[0].component.payload['helpers'] = me.helpersObj.helpers;
            me.messageHtml = $(me.getTemplateString(msgData.message[0].component.payload.template_type)).tmpl(msgData.message[0].component.payload);
            setTimeout(() => {
                const me: any = this;
                let newCarouselTemplateCount = 0;
                let newCarouselEles = [];
                newCarouselTemplateCount += 1;
                me.messageHtml
                    .find(".carousel:last")
                    .addClass("carouselTemplate" + newCarouselTemplateCount);
                var count = me.messageHtml
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
            });
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
        const searchCarouselTemplate = '<script type="text/x-jqury-tmpl">\
        {{if structuredData.length}}\
        <div class="title-text-heading {{if renderTitle}}display-block{{else}}display-none{{/if}}">${titleName}</div>\
        {{if gridLayoutType==="img_common"}}\
        <div class="template-4-carousel-list mb-15">\
        <div class="carousel">\
            {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
            {{if isClickable == true}}\
            <div class="slide click-to-navigate-url faqs-shadow isClickable" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">\
                {{else}}\
                <div class="slide click-to-navigate-url faqs-shadow" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">\
                    {{/if}}\
                    <div class="inner-content-list">\
                        <div class="image-with-title">\
                            {{if data.img.length}}\
                            <div class="img-block">\
                                <img src="${data.img}">\
                            </div>\
                            {{/if}}\
                            {{if data.heading.length}}\
                            <div class="info-title two-line-heading" title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                            {{/if}}\
                        </div>\
                        {{if data.description.length}}\
                        <div class="title-item two-line-description" title="${data.description}">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                        {{/if}}\
                    </div>\
                </div>\
                {{/each}}\
            </div>\
        </div>\
    </div>\
        {{/if}}\
        {{if gridLayoutType==="img_large"}}\
        <div class="template-5-carousel-list mb-15">\
        <div class="carousel">\
            {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed) }}\
            {{if isClickable == true }}\
            <div class="slide click-to-navigate-url faqs-shadow isClickable" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">\
                {{else}}\
                <div class="slide click-to-navigate-url faqs-shadow" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">\
                    {{/if}}\
                    <div class="inner-content-list">\
                        <img src="${data.img}">\
                    </div>\
                </div>\
                {{/each}}\
            </div>\
        </div>\
    </div>\
        {{/if}}\
        {{if gridLayoutType==="img_left"}}\
        <div class="template-6-carousel-list mb-15 {{if textAlignment==" center"}}text-center{{/if}}">\
        <div class="carousel">\
            {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
            {{if isClickable == true}}\
            <div class="slide click-to-navigate-url faqs-shadow isClickable" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">\
                {{else}}\
                <div class="slide click-to-navigate-url faqs-shadow" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">\
                    {{/if}}\
                    <div class="inner-content-list {{if textAlignment==" center"}}text-center{{/if}}">\
                        {{if data.heading.length}}\
                        <div class="title-main text-truncate one-line-height" title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                        {{/if}}\
                        {{each(key, res) [0,1,2]}}\
                        <div class="img-with-text">\
                            {{if data.img.length}}\
                            <div class="img-block">\
                                <img src="${data.img}">\
                            </div>\
                            {{/if}}\
                            {{if data.description.length}}\
                            <div class="info-text two-line-description" title="${data.description}">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                            {{/if}}\
                        </div>\
                        {{/each}}\
                    </div>\
                </div>\
                {{/each}}\
            </div>\
        </div>\
        {{/if}}\
        {{if gridLayoutType==="img_top"}}\
        <div class="template-7-carousel-list mb-15 {{if textAlignment==" center"}}text-center{{/if}}">\
        <div class="carousel">\
            {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
            {{if isClickable == true}}\
            <div class="slide click-to-navigate-url faqs-shadow isClickable" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">\
                {{else}}\
                <div class="slide click-to-navigate-url faqs-shadow" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">\
                    {{/if}}\
                    <div class="inner-content-list {{if textAlignment==" center"}}text-center{{/if}}">\
                        {{if data.img.length}}\
                        <div class="main-img-block">\
                            <img src="${data.img}">\
                        </div>\
                        {{/if}}\
                        {{if data.heading.length}}\
                        <div class="heading- text-truncate one-line-height" title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                        {{/if}}\
                        {{if data.description.length}}\
                        <div class="desc-text-info four-line-description" title="${data.description}">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                        {{/if}}\
                    </div>\
                </div>\
                {{/each}}\
            </div>\
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