
import helpers from '../../../utils/helpers';
import './cardPaymentTemplate.scss';
class CardPaymentTemplate {
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
        if (msgData?.message?.[0]?.component?.payload?.template_type === "card_payment_template") {
            var dateObj = new Date();
            var month = dateObj.getUTCMonth() + 1;
            var day = dateObj.getUTCDate();
            var year = dateObj.getUTCFullYear();
            var seconds = dateObj.getSeconds();
            var minutes = dateObj.getMinutes();
            var hour = dateObj.getHours();
            var generatedRadioButtonName = 'radio-card-amount-' + (year * month * day) * (hour + (minutes * seconds));


            me.messageHtml = $(me.getTemplateString("cardPaymentTemplate")).tmpl({
                'msgData': msgData,
                'helpers': helpersObj.helpers,
                'extension': extension,
                'radioButtonName': generatedRadioButtonName
            });
            setTimeout(() => {
            me.bindEvents(me.messageHtml, msgData, generatedRadioButtonName);
            }, 2000)
            return me.messageHtml;
        }
    }
    bindEvents(messageHtml:any, msgData:any, radioButtonName:string) {
        let me :any = this;
        let chatWindowInstance = me.hostInstance;
        let $ = me.hostInstance.$;
        $(messageHtml).find('.select-bank-accont-dropdown').off('click', '.selected-item').on('click', '.selected-item', function (e:any) {
            if (!$(messageHtml).find('.select-bank-accont-dropdown').find('.dropdowns-item-container').is(':visible')) {
                $(messageHtml).find('.select-bank-accont-dropdown .dropdowns-item-container').show();
                $(messageHtml).find('.list-item').off('click').on('click', function (e:any) {
                    $(messageHtml).find('.list-item.selected').removeClass('selected');
                    $(e.target).addClass('selected');
                    $(messageHtml).find('.select-bank-accont-dropdown').find('.selected-item').html($(e.target).attr('accountNumber')).append(`<img src="images/banking/carrotup.svg">`);
                    $(messageHtml).find('.select-bank-accont-dropdown .dropdowns-item-container').hide();
                    $(messageHtml).find('.radio-button-section-info .current-oustanding').html($(e.target).attr('currentOutStanding'));
                    $(messageHtml).find('.radio-button-section-info .minimum-due').html($(e.target).attr('minDue'));
                    $(messageHtml).find('.radio-button-section-info .last-bill-due').html($(e.target).attr('lastBillDue'));
                    $(messageHtml).find('.details-of-account .card_holder_name').html($(e.target).attr('cardHolderName'));
                    $(messageHtml).find('.details-of-account .card_number').html($(e.target).attr('cardNumber'));
                    $(messageHtml).find('.bank-kr-sg-radiobutton .cur-outStanding').attr('value', $(e.target).attr('currentOutStanding'));
                    $(messageHtml).find('.bank-kr-sg-radiobutton .min-due').attr('value', $(e.target).attr('minDue'));
                    $(messageHtml).find('.bank-kr-sg-radiobutton .last-billed-due').attr('value', $(e.target).attr('lastBillDue'));
                    $(messageHtml).find('.view-statement-btn').attr('href', $(e.target).attr('url'));
                })
            } else {
                $(messageHtml).find('.select-bank-accont-dropdown .dropdowns-item-container').hide();
            }
        })
        $(messageHtml).find('.actions-paynow-statement').off('click', '.paynow-btn').on('click', '.paynow-btn', function (e:any) {
            var accountNumber = $(messageHtml).find('.list-item.selected').attr('accountNumber');
            var payload = $(e.target).attr('payload');
            var amount = $(messageHtml).find("input[name='" + radioButtonName + "']:checked").val();
            var cardNumber = $(messageHtml).find('.details-of-account .card_number').html();
            cardNumber = cardNumber.substring(cardNumber.length - 4, cardNumber.length);
            chatWindowInstance.appendTextToSearchContainer('user', 'Pay Now');
            chatWindowInstance.sendMessage((accountNumber + ' ' + amount + ' ' + cardNumber), msgData);
            $(messageHtml).find('.selected-click').removeClass('selected-click');
            $(e.currentTarget).closest('.paynow-btn').addClass('selected-click');
        })
        $(messageHtml).find('.actions-paynow-statement , .select-bank-details').off('click', '.dummy-btn').on('click', '.dummy-btn', function (e:any) {
            $(messageHtml).find('.selected-click').removeClass('selected-click');
            $(e.currentTarget).closest('.dummy-btn').addClass('selected-click');
        })
        $(document).off('click').on('click', function (e:any) {
            if (!($(e.target).closest('.select-bank-accont-dropdown').length)) {
                $('.select-bank-accont-dropdown .dropdowns-item-container').hide();
            }
        })
    }
    getTemplateString() {
        var cardPaymentTemplate = '<script>\
        <div class="messageBubble">\
        <div class="messageBubble-content">\
            <div class="botImg">\
                <img class="default-bot-icon" src="images/bubbleIcon.svg">\
                <img class="default-bot-banking-icon" src="images/banking/bankingavatar.svg">\
            </div>\
            <div class="botMessage no-border-data">\
                <div class="select-bank-details">\
                    <div class="label-text">${msgData.message[0].component.payload.text}</div>\
                    <div class="select-bank-accont-dropdown">\
                    <div class="selected-item">${msgData.message[0].component.payload.data[0].account_number}<img src="images/banking/carrotup.svg"></div>\
                    <div class="dropdowns-item-container">\
                    {{each(key, cardData) msgData.message[0].component.payload.data}}\
                        <div class="list-item {{if key==0 }}selected{{/if}}" accountNumber = ${cardData.account_number} cardHolderName = ${cardData.card_holder_name} cardNumber ="${cardData.card_number}" minDue = ${cardData.minimum_due} lastBillDue = ${cardData.last_billed_due} currentOutStanding = ${cardData.current_oustanding}>${cardData.account_number}</div>\
                    {{/each}}\
                    </div>\
                    </div>\
                    <div class="details-of-account">\
                    <div class="left-title">Card Holder Name</div>\
                    <div class="right-title card_holder_name">${msgData.message[0].component.payload.data[0].card_holder_name}</div>\
                    </div>\
                    <div class="details-of-account">\
                    <div class="left-title">Card Number</div>\
                    <div class="right-title card_number">${msgData.message[0].component.payload.data[0].card_number}</div>\
                    </div>\
                    <div class="radio-button-section-info">\
                    <div class="heding-text">how much do you want to pay?</div>\
                    <div class="radio-block-data">\
                        <div class="bank-kr-sg-radiobutton">\
                        <input id="checkbox-1${radioButtonName}" name="${radioButtonName}" checked class="radio-custom cur-outStanding" type="radio" value="${msgData.message[0].component.payload.data[0].current_oustanding}">\
                        <label for="checkbox-1${radioButtonName}" class="radio-custom-label">Current Outstanding</label>\
                        </div>\
                        <div class="balance-info current-oustanding">${msgData.message[0].component.payload.data[0].current_oustanding}</div>\
                    </div>\
                    <div class="radio-block-data">\
                        <div class="bank-kr-sg-radiobutton">\
                        <input id="checkbox-11${radioButtonName}" name="${radioButtonName}" class="radio-custom last-billed-due" type="radio" value="${msgData.message[0].component.payload.data[0].last_billed_due}">\
                        <label for="checkbox-11${radioButtonName}" class="radio-custom-label">Last Billed Due</label>\
                        </div>\
                        <div class="balance-info last-bill-due">${msgData.message[0].component.payload.data[0].last_billed_due}</div>\
                    </div>\
                    <div class="radio-block-data">\
                        <div class="bank-kr-sg-radiobutton">\
                        <input id="checkbox-12${radioButtonName}" name="${radioButtonName}" class="radio-custom min-due" type="radio" value="${msgData.message[0].component.payload.data[0].minimum_due}">\
                        <label for="checkbox-12${radioButtonName}" class="radio-custom-label">Minimum Due</label>\
                        </div>\
                        <div class="balance-info minimum-due">${msgData.message[0].component.payload.data[0].minimum_due}</div>\
                    </div>\
                    </div>\
                    <div class="actions-paynow-statement">\
                    <div class="paynow paynow-btn selected-click" payload="${msgData.message[0].component.payload.buttons[0].payload}">\
                        <span class="action-title " >${msgData.message[0].component.payload.buttons[0].title}</span>\
                        <img src="images/banking/external.svg" class="unactive-img">\
                        <img src="images/banking/external-white.svg" class="active-img">\
                    </div>\
                    <div class="paynow dummy-btn "><a class="view-statement-btn" href="${msgData.message[0].component.payload.buttons[1].url}">\
                        <span class="action-title">View Statement</span>\
                        <img src="images/banking/download.svg" class="unactive-img">\
                        <img src="images/banking/download-white.svg" class="active-img">\
                        </a>\
                    </div>\
                    </div>\
                    <div class="schedule-date dummy-btn">\
                    <img src="images/banking/calendar.svg" class="unactive-img">\
                    <img src="images/banking/Calendar-white.svg" class="active-img">\
                    <span class="title">Schedule automated payment</span>\
                    </div>\
                </div>\
            </div>\
        </div>\
        </div>\
    </script>';
        return cardPaymentTemplate;
    }
    
}

export default CardPaymentTemplate;