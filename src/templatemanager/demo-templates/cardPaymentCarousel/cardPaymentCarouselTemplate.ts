
import helpers from '../../../utils/helpers';
import PureJSCarousel from '../../../libs/purejscarousel/purejscarousel';
import './cardPaymentCarouselTemplate.scss';
class CardPaymentCarouselTemplate {
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
        if (msgData?.message?.[0]?.component?.payload?.template_type === "card_payment_carousel_template") {
            me.messageHtml = $(me.getTemplateString("cardPaymentCarouselTemplate")).tmpl({
                'msgData': msgData,
                'helpers': helpersObj.helpers,
                'extension': extension
            });
            setTimeout(() => {
                me.bindCarouselActions(me.messageHtml);
                me.bindEvents(me.messageHtml, msgData);
            }, 200)
           
            return me.messageHtml;
        }
    }
    bindEvents(messageHtml:any, msgData:any) {
        let me :any = this;
        let chatWindowInstance = me.hostInstance;
        let $ = me.hostInstance.$;
        $(messageHtml).find('.bottom-content').off('click', '.play-now-btn').on('click', '.play-now-btn', function (e:any) {
            var payload = $(e.currentTarget).closest('.play-now-btn').attr('payload');
            chatWindowInstance.sendMessage(payload, msgData);
        })
    }
    getTemplateString() {
        var cardPaymentCarouselTemplate = '<script>\
        {{if msgData.message}} \
            <div class="postlogin-carousel-content">\
                <div class="carousel">\
                {{each(key, msgItem) msgData.message[0].component.payload.elements}} \
                <div class="slide">\
                    <div class="inner-slide-content">\
                    <div class="img-block">\
                        <img alt="image" src="${msgItem.image_url}" onerror="this.onerror=null;this.src=\'../libs/img/no_image.png\';"/> \
                    </div>\
                    <div class="bottom-content">\
                        <div class="info-text-details">\
                        <div class="left-title">Available limit</div>\
                        <div class="right-title">${msgItem.available_limit}</div>\
                        </div>\
                        <div class="info-text-details">\
                        <div class="left-title">Outstanding</div>\
                        <div class="right-title">${msgItem.outstanding}</div>\
                        </div>\
                        <div class="info-text-details">\
                        <div class="left-title">Due date</div>\
                        <div class="right-title date">${msgItem.due_date}</div>\
                        </div>\
                        <a class="view-stamnet-btn" href="${msgItem.buttons[0].url}">${msgItem.buttons[0].title} <img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Banking_demo/download.svg"></a>\
                        <button class="play-now-btn" payload="${msgItem.buttons[1].payload}">${msgItem.buttons[1].title}</button>\
                    </div>\
                    </div>\
                </div>\
                {{/each}} \
                </div>\
            </div>\
            {{/if}}\
            </script>';
        return cardPaymentCarouselTemplate;
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

export default CardPaymentCarouselTemplate;