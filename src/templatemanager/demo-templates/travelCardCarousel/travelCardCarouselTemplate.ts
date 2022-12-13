
import helpers from '../../../utils/helpers';
import PureJSCarousel from '../../../libs/purejscarousel/purejscarousel';
import './travelCardCarouselTemplate.scss';
class TravelCardCarouselTemplate {
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
        if (msgData?.message?.[0]?.component?.payload?.template_type === "travel_card_carousel_template") {
            me.messageHtml = $(me.getTemplateString("travelCardCarouselTemplate")).tmpl({
                'msgData': msgData,
                'helpers': helpersObj.helpers,
                'extension': extension
            });
            setTimeout(() => {
                me.bindCarouselActions( me.messageHtml);
                me.bindEvents(me.messageHtml,msgData);
            }, 200)
            
            return me.messageHtml;
        }
    }
    bindEvents(messageHtml:any, msgData:any) {
        let me :any = this;
        let chatWindowInstance = me.hostInstance;
        let $ = me.hostInstance.$;
        $(messageHtml).find('.bottom-content').off('click', '.apply-card').on('click', '.apply-card', function (e:any) {
            var payload = $(e.currentTarget).closest('.apply-card').attr("payload");
            chatWindowInstance.appendTextToSearchContainer('user', 'Apply Now');
            chatWindowInstance.sendMessage(payload, msgData);
            $(messageHtml).find('.selected-click').removeClass('selected-click');
            $(e.currentTarget).closest('.apply-card').addClass('selected-click');
        })
    }
    getTemplateString() {
        var travelCardCarouselTemplate = '<script>\
        <div class="prelogin-carousel-content">\
        <div class="heading-title">Travel Cards</div>\
        <div class="carousel">\
            {{each(key, element) msgData.message[0].component.payload.elements}}\
            <div class="slide">\
            <div class="inner-slide-content">\
                <div class="img-block">\
                <img src="${element.image_url}">\
                </div>\
                <div class="bottom-content">\
                <div class="apply-now-btn apply-card" payload="${element.buttons[0].payload}">\
                    <span class="text" >Apply Now</span>\
                    <img src="images/banking/arrow.svg" class="unactive-img">\
                    <img src="images/banking/arrow-white.svg" class="active-img">\
                </div>\
                <a class="apply-now-btn" href="${element.buttons[1].url}" target="_blank">\
                    <span class="text">Know more</span>\
                    <img src="images/banking/external-link.svg" class="unactive-img">\
                    <img src="images/banking/external-white-link.svg" class="active-img">\
                </a>\
                </div>\
            </div>\
            </div>\
            {{/each}}\
        </div>\
        </div>\
    </script>';
        return travelCardCarouselTemplate;
    }
    bindCarouselActions(messageHtml:any, carouselId:string){
        let me :any = this;
        let chatWindowInstance:any = me.hostInstance;
        let $ = me.hostInstance.$;
        let newCarouselTemplateCount = $('.carousel').length;
        newCarouselTemplateCount += 1;
        let newCarouselEles = [];
        // if (carouselId) {
        //   if (messageHtml.find('.' + carouselId + ':last').length) {
        //     messageHtml.find('.' + carouselId + ':last').addClass("carouselTemplate" + newCarouselTemplateCount);
        //   } else {
        //     $('.' + carouselId).last().addClass("carouselTemplate" + newCarouselTemplateCount);
        //   }
        // } else {
            messageHtml.find('.carousel:last').addClass("carouselTemplate" + newCarouselTemplateCount);
        // }
        var count = 0;
        // if (carouselId) {
        //   if (messageHtml.find(".carouselTemplate" + newCarouselTemplateCount).length) {
        //     count = messageHtml.find(".carouselTemplate" + newCarouselTemplateCount).children().length;
        //   } else {
        //     count = $(".carouselTemplate" + newCarouselTemplateCount).children().length;
        //   }
        //   if (count == 0) {
        //     count = messageHtml.find(".carouselTemplate" + newCarouselTemplateCount).children().length;
        //   }
        // } else {
          count = messageHtml.find(".carouselTemplate" + newCarouselTemplateCount).children().length;
        // }
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
  
        // if (carouselId == 'filterCarouselCard') {
        //   $('.carouselTemplate' + newCarouselTemplateCount + ' .purejscarousel-btn-prev').addClass('filterCard-prev');
        //   $('.carouselTemplate' + newCarouselTemplateCount + ' .purejscarousel-btn-next').addClass('filterCard-next')
  
        //   var initialCard = 0;
        //   $('.carouselTemplate' + newCarouselTemplateCount).off('click', '.filterCard-next').on('click', '.filterCard-next', function (e:any) {
        //     initialCard = initialCard + 1;
        //     chatWindowInstance.filterCardSelected = initialCard;
        //     // chatWindowInstance.userContextBankCard = JSON.parse(window.localStorage.getItem('cards'))[initialCard];
        //     // chatWindowInstance.invokeSpecificSearch(chatWindowInstance.selectedFacetFromSearch);
        //   })
        //   $('.carouselTemplate' + newCarouselTemplateCount).off('click', '.filterCard-prev').on('click', '.filterCard-prev', function (e:any) {
        //     initialCard = initialCard - 1;
        //     chatWindowInstance.filterCardSelected = initialCard;
        //     // chatWindowInstance.userContextBankCard = JSON.parse(window.localStorage.getItem('cards'))[initialCard];
        //     // chatWindowInstance.invokeSpecificSearch(chatWindowInstance.selectedFacetFromSearch);
        //   })
        // }
    }
}

export default TravelCardCarouselTemplate;