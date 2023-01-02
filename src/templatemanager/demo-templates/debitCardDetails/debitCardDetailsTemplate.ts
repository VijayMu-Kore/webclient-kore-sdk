
import helpers from '../../../utils/helpers';
import './debitCardDetailsTemplate.scss';
class debitCardDetailsTemplate {
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
        if (msgData?.message?.[0]?.component?.payload?.template_type === "button") {
            me.messageHtml = $(me.getTemplateString("debitCardDetailsTemplate")).tmpl({
                'msgData': msgData,
                'helpers': helpersObj.helpers,
                'extension': extension
            });
            setTimeout(() => {
                me.bindEvents(me.messageHtml, msgData);
                $(me.messageHtml).find('.autocomplete-input').each(function (this:any) {
                    $(this).attr('autocomplete', 'off');
                });
            }, 2000)
            
            return me.messageHtml;
        }
    }
    bindEvents(messageHtml:any, msgData:any) {
        let me :any = this;
        let chatWindowInstance = me.hostInstance;
        let $ = me.hostInstance.$;
        $(messageHtml).find('.verify-details').off('keyup', '#debitCardId').on('keyup', '#debitCardId', function (e:any) {
            var keyCode = e.keyCode || e.which;
            keyCode = Number(keyCode);
            if (keyCode !== 8) {
                if (e.target.value.length && (e.target.value.length == 4 || e.target.value.length == 9 || e.target.value.length == 14)) {
                    e.target.value = e.target.value + '-';
                }
            }
        })
        $(messageHtml).find('.verify-details').off('click', '.verify-btn').on('click', '.verify-btn', function (e:any) {
            if ( $(messageHtml).find('#debitCardId').val() &&  $(messageHtml).find('#cvvId').val()) {
                var cardNo =  $(messageHtml).find('#debitCardId').val().replaceAll('-', '');
                var cvvNo =  $(messageHtml).find('#cvvId').val();
                chatWindowInstance.sendMessage(cardNo, msgData);
            }
        })
    }
    getTemplateString() {
        var debitCardDetailsTemplate = '<script id="debit_card_details_tmpl" type="text/x-jqury-tmpl">\
        <div class="messageBubble divider-border">\
        <div class="messageBubble-content">\
            <div class="botImg">\
                <img class="default-bot-icon" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Icons/bubble_icon.svg">\
                <img class="default-bot-banking-icon" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Banking_demo/bankingavatar.svg">\
            </div>\
            <div class="botMessage no-border-data">\
                <div class="verify-card-details">\
                <div class="heading-text">Please follow the Guided Tour</div>\
                <div class="verify-details">\
                    <div class="info-text">${msgData.message[0].component.payload.text}</div>\
                    <div class="card-info-details">\
                        <div class="card-number">\
                            <div class="label-text">Please Enter Debit Card Number</div>\
                            <input type="text" autocomplete="off" class="autocomplete-input" id="debitCardId" maxlength="19" placeholder="0000 - 0000 - 0000 - 0000">\
                        </div>\
                        <div class="cvv-details">\
                            <div class="label-text">CVV</div>\
                            <input type="password" autocomplete="off" class="autocomplete-input" id="cvvId" maxlength="3" placeholder="000">\
                        </div>\
                    </div>\
                    <button class="verify-btn">Verify <img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Banking_demo/carrotright.svg"></button>\
                </div>\
                </div>\
            </div>\
        </div>\
        </div>\
    </script>';
        return debitCardDetailsTemplate;
    }
    
}

export default debitCardDetailsTemplate;