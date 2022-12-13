
import helpers from '../../../utils/helpers';
import PureJSCarousel from '../../../libs/purejscarousel/purejscarousel';
import './guidedTourTemplate.scss';
class GuidedTourTemplate {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let helpersObj = helpers;
        var extension = '';
        var _extractedFileName = '';
        function strSplit(str:any) {
            return (str.split('.'));
        }
        if (msgData.message && msgData.message[0] && msgData.message[0].cInfo && msgData.message[0].cInfo.attachments) {
            extension = strSplit(msgData.message[0].cInfo.attachments[0].fileName);
        }
        if (msgData.message && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.url) {
            extension = strSplit(msgData.message[0].component.payload.url);
            _extractedFileName = msgData.message[0].component.payload.url.replace(/^.*[\\\/]/, '');
        }
        if (msgData?.message?.[0]?.component?.payload?.template_type === "guided_tour") {
            me.messageHtml = $(me.getTemplateString("guidedTourTemplate")).tmpl({
                'msgData': msgData.payload,
                'helpers': helpersObj.helpers,
                'extension': extension
            });
            me.bindCarouselActions(me.messageHtml);
            me.bindEvents(me.messageHtml, msgData.payload);
            return me.messageHtml;
        }
    }
    bindEvents(messageHtml:any, msgData:any) {
        let me :any = this;
        let chatWindowInstance = me.hostInstance;
        let $ = me.hostInstance.$;
        $(messageHtml).find(".tour-data-content").off('click', '.next-step').on('click', '.next-step', function (e:any) {
            var arraylength = msgData.length;
            var nextDiv = $(messageHtml).find(".tour-step:visible").next(".tour-step");
            if (nextDiv.length == 0) { // wrap around to beginning
                //nextDiv = $(".tour-step:first");
            }
            else {
                $(messageHtml).find(".tour-step").hide();
                nextDiv.show();
            }
            var index = $(messageHtml).find(".tour-step:visible").index();
            $(messageHtml).find('.current-number').text(index + 1);
            if (arraylength == index + 1) {
                $(messageHtml).find(".next-step").css('color', '#BDC1C6');
            }
            else {
                $(messageHtml).find(".next-step").css('color', '#009999');
                $(messageHtml).find(".prevoius-step").css('color', '#009999');
            }
            $(messageHtml).find(".active-step").each(function (this:any, i:any) {
                if (i <= index) {
                    $(this).css('background', '#009999');
                }
            });
        });

        $(messageHtml).find(".tour-data-content").off('click', '.prevoius-step').on('click', '.prevoius-step', function (e:any) {
            var prevDiv = $(messageHtml).find(".tour-step:visible").prev(".tour-step");
            if (prevDiv.length == 0) { // wrap around to end
                //prevDiv = $(".tour-step:last");
            }
            else {
                $(".tour-step").hide();
                prevDiv.show();
            }
            var index = $(messageHtml).find(".tour-step:visible").index();
            $(messageHtml).find('.current-number').text(index + 1);
            if (index == 0) {
                $(messageHtml).find(".prevoius-step").css('color', '#BDC1C6');
            }
            else {
                $(messageHtml).find(".prevoius-step").css('color', '#009999');
                $(messageHtml).find(".next-step").css('color', '#009999');
            }
            $(messageHtml).find(".active-step").each(function (this:any, i:any) {
                if (i > index) {
                    $(this).css('background', '#BDC1C6');
                }
            });
        });
        $(messageHtml).find(".tour-data-content").off('click', '.preview-img').on('click', '.preview-img', function (e:any) {
            var previewPage = '<script>\
                    <div class="full-page-tour-guide">\
                        <div class="dynamic-content">\
                            <div class="close-tour">\
                                <img src="images/siemens/close.svg">\
                            </div>\
                            <div class="carousel carousel-preview">\
                            {{each(key, data) msgData}}\
                                <div class="slide">\
                                    <div class="img-block">\
                                        <img src=${data.image_url}>\
                                    </div>\
                                </div>\
                                {{/each}}\
                            </div>\
                        </div>\
                    </div>\
          </script>';
            var index = $(messageHtml).find(".tour-step:visible").index();
            var show_preview_data:any = [];
            if (index === 1) {
                show_preview_data = msgData[1].elements;
            }
            else {
                for (var i = 0; i < msgData.length; i++) {
                    if (msgData[i].image_url !== undefined) {
                        if (index === i) {
                            show_preview_data.unshift(msgData[i])
                        }
                        else {
                            show_preview_data.push(msgData[i])
                        }
                    }
                }
            }
            $(messageHtml).find('.siemens-tour-guide').css('display', 'block');
            var htmlPreview = $(previewPage).tmpl({
                'msgData': show_preview_data
            });
            $(messageHtml).find('.siemens-tour-guide').append(htmlPreview);
            $(messageHtml).find('.siemens-tour-guide').css('display', 'block');
            setTimeout(() => {
                chatWindowInstance.bindCarouselActions(htmlPreview, 'carousel-preview');
            }, 2000)
        });
        $(messageHtml).find(".siemens-tour-guide").off('click', '.close-tour').on('click', '.close-tour', function (e:any) {
            $(messageHtml).find(".siemens-tour-guide").empty();
            $(messageHtml).find('.siemens-tour-guide').css('display', 'none');
            // $('#searchBox').css({ display: 'block', background: 'white' });
        });
    }
    getTemplateString() {
  
        var guidedTourTemplate = '<script>\
        <div class="messageBubble divider-border">\
         <div class="messageBubble-content">\
            <div class="botImg">\
                <img class="default-bot-icon" src="images/bubbleIcon.svg">\
                    <img class="default-bot-siemens-icon" src="images/siemens/siemens-avatar.svg">\
                    </div>\
                    <div class="botMessage no-border-data mw_100">\
                        <div class="tour-data-content">\
                            <div class="main-heading">Creating RFQ Guided Tour</div>\
                            <div class="steps-info-conut">Step <span class="current-number">1</span> <Span class="total-count">of ${msgData.length}</Span></div>\
                            <div class="steps-dots-container">\
                                {{each(key, guide) msgData }}\
                                <div class="step-dot active-step"></div>\
                                {{/each}}\
                            </div>\
                            <div class="dynamic-steps-data">\
                                {{each(key, guide) msgData }}\
                                <div class="tour-step">\
                                    <div class="info-text">${guide.title}</div>\
                                    <div class="img-block {{if guide.has_subelements}}d-none{{/if}}">\
                                        <img src="images/siemens/enlarge.svg" class="enlarge-icon preview-img">\
                                            <img src=${guide.image_url}>\
                                            </div>\
                                            {{if guide.has_subelements }}\
                                            <div class="inner-data-if-carousel">\
                                                <div class="carousel">\
                                                    {{each(key, sub) guide.elements }}\
                                                    <img src="images/siemens/enlarge.svg" class="enlarge-icon preview-img">\
                                                        <div class="slide">\
                                                            <div class="img_content">\
                                                                <div class="info-text">${sub.title}</div>\
                                                                <img src=${sub.image_url}>\
                                                            </div>\
                                                        </div>\
                                                        {{/each}}\
                                                </div>\
                                            </div>\
                                            {{/if}}\
                                    </div>\
                                    {{/each}}\
                                </div>\
                                <div class="next-step">Next Step</div>\
                                <div class="prevoius-step">Previous Step</div>\
                            </div>\
                        </div>\
                    </div>\
            </div>\
        </script>';

              // Siemens

              var trackShipmentTemplate = '<script>\
              <div class="messageBubble">\
                <div class="messageBubble-content">\
                    <div class="botImg">\
                        <img class="default-bot-icon" src="images/bubbleIcon.svg">\
                        <img class="default-bot-siemens-icon" src="images/siemens/siemens-avatar.svg">\
                    </div>\
                    <div class="botMessage">I can help with questions around SCM STAR. And, Im still learning about others. Here are some popular topics to get you started.</div>\
                    <div class="botMessage">\
                        <div class="text-info">Your request has been accepted successfully. You will recieve your new debit card with in <b>5 business days</b></div>\
                    </div>\
                    <div class="botMessage">\
                        <div class="heilighted-text">Track shipment</div>\
                    </div>\
                </div>\
              </div>\
            </script>';
            
        return guidedTourTemplate;
    }
    bindCarouselActions(messageHtml:any){
        let me :any = this;
        let chatWindowInstance:any = me.hostInstance;
        let $ = me.hostInstance.$;
        let newCarouselTemplateCount = $('.carousel').length;
        newCarouselTemplateCount += 1;
        let newCarouselEles = [];
            messageHtml.find('.carousel:last').addClass("carouselTemplate" + newCarouselTemplateCount);
        var count = 0;
          count = messageHtml.find(".carouselTemplate" + newCarouselTemplateCount).children().length;
        if (count > 1) {
          var carouselOneByOne = new PureJSCarousel({
            carousel: '.carouselTemplate' + newCarouselTemplateCount,
            slide: '.slide',
            oneByOne: true,
            jq: $,
          });
          $('.carousel' + newCarouselTemplateCount).parent().show();
          newCarouselEles.push(carouselOneByOne);
          if ($('.carouselTemplate' + newCarouselTemplateCount).width() >= ($('.carouselTemplate' + newCarouselTemplateCount + ' .purejscarousel-slides-container').children().length * $('.carouselTemplate' + newCarouselTemplateCount + ' .purejscarousel-slides-container .slide:first').width())) {
            $('.carouselTemplate' + newCarouselTemplateCount + ' .purejscarousel-btn-prev').hide();
            $('.carouselTemplate' + newCarouselTemplateCount + ' .purejscarousel-btn-next').hide();
          }
          $('.carouselTemplate' + newCarouselTemplateCount + ' .purejscarousel-btn-prev::after').css('height', $('.carouselTemplate' + newCarouselTemplateCount + '.purejscarousel-slides-container').height() + 'px');
          $('.carouselTemplate' + newCarouselTemplateCount + ' .purejscarousel-btn-next::after').css('height', $('.carouselTemplate' + newCarouselTemplateCount + '.purejscarousel-slides-container').height() + 'px');
          $("body").append("<style>.carouselTemplate" + newCarouselTemplateCount + " .purejscarousel-btn-next::after,.carouselTemplate" + newCarouselTemplateCount + " .purejscarousel-btn-prev::after {height:" + ($('.carouselTemplate' + newCarouselTemplateCount + ' .purejscarousel-slides-container').height() - 8) + "px !important; top:-" + ($('.carouselTemplate' + newCarouselTemplateCount + ' .purejscarousel-btn-next').position().top - 27.5) + "px !important;}</style>");
  
          var evt = document.createEvent("HTMLEvents");
          evt.initEvent('resize', true, false);
          window.dispatchEvent(evt);
        }
  
    }
}

export default GuidedTourTemplate;