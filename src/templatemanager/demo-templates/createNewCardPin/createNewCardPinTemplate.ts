
import helpers from '../../../utils/helpers';
import './createNewCardPinTemplate.scss';
class CreateNewCardPinTemplate {
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
        if (msgData?.message?.[0]?.component?.payload?.template_type === "create_new_card_pin_template") {
            me.messageHtml = $(me.getTemplateString("createNewCardPinTemplate")).tmpl({
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
        $(messageHtml).find('.otp-based-input-data').off('click', '.next-btn').on('click', '.next-btn', function (e:any) {
            if ($(messageHtml).find('#currentPin').val()) {
                $(messageHtml).find('.otp-block.round-mark.active-next').last().next().addClass('active-next')
                $(messageHtml).find('#otpReceived').prop("disabled", false);
            }
            if ($(messageHtml).find('#otpReceived').val()) {
                $(messageHtml).find('.otp-block.round-mark.active-next').last().next().addClass('active-next')
                $(messageHtml).find('#newPin').prop("disabled", false);
                $(messageHtml).find('#confirmNewPin').prop("disabled", false);
            }
            if ($(messageHtml).find('#newPin').val() && $(messageHtml).find('#confirmNewPin').val() && $(messageHtml).find('#newPin').val() == $(messageHtml).find('#confirmNewPin').val()) {
                // var payload = {
                //     "currentPin" : $('#currentPin').val(),
                //     "otp" : $('#otpReceived').val(),
                //     "newPin" : $('#newPin').val(),
                //     "confirmNewPin" : $('#confirmNewPin').val()
                // }
                $(messageHtml).find('.confirm-new-pin-block').last().removeClass('error_input');
                chatWindowInstance.sendMessage($(messageHtml).find('#otpReceived').val(), msgData);
            } else {
                $(messageHtml).find('.confirm-new-pin-block').last().addClass('error_input');
            }


        })
        $(messageHtml).find('.otp-based-input-data').off('keydown', '#currentPin, #otpReceived').on('keydown', '#currentPin, #otpReceived', function (e:any) {
            var keycode = e.keyCode || e.which;
            if (keycode === 13) {
                if ($(messageHtml).find('#currentPin').val()) {
                    $(messageHtml).find('.otp-block.round-mark.active-next').last().next().addClass('active-next')
                    $(messageHtml).find('#otpReceived').prop("disabled", false);
                    $(messageHtml).find('#otpReceived').focus();
                }
                if ($(messageHtml).find('#otpReceived').val()) {
                    $(messageHtml).find('.otp-block.round-mark.active-next').last().next().addClass('active-next')
                    $(messageHtml).find('#newPin').prop("disabled", false);
                    $(messageHtml).find('#confirmNewPin').prop("disabled", false);
                    $(messageHtml).find('#newPin').focus();
                }
                if ($(messageHtml).find('#newPin').val() && $(messageHtml).find('#confirmNewPin').val() && $(messageHtml).find('#newPin').val() == $(messageHtml).find('#confirmNewPin').val()) {
                    chatWindowInstance.sendMessage($(messageHtml).find('#otpReceived').val(), msgData);
                }
            }
        })
    }
    getTemplateString() {
        var createNewCardPinTemplate = '<script id="create_new_pin_tmpl" type="text/x-jqury-tmpl">\
        <div class="messageBubble">\
        <div class="messageBubble-content">\
            <div class="botImg">\
                <img class="default-bot-icon" src="images/bubbleIcon.svg">\
                <img class="default-bot-banking-icon" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Banking_demo/bankingavatar.svg">\
            </div>\
            <div class="botMessage no-border-data">\
                <div class="otp-based-input-data">\
                <div class="info-text">${msgData.message[0].component.payload.text}</div>\
                <div class="debit-card-details">\
                    <div class="label-text">Debit card details</div>\
                    <div class="details-of-account">\
                    <div class="left-title">Card Holder Name</div>\
                    <div class="right-title">${msgData.message[0].component.payload.data.card_holder_name}</div>\
                    </div>\
                    <div class="details-of-account">\
                    <div class="left-title">Card Number</div>\
                    <div class="right-title">${msgData.message[0].component.payload.data.card_number}</div>\
                    </div>\
                    <div class="details-of-account">\
                    <div class="left-title">Card Type</div>\
                    <div class="right-title">${msgData.message[0].component.payload.data.card_type}</div>\
                    </div>\
                </div>\
                <div class="otp-input-sections">\
                    <div class="otp-block round-mark active-next">\
                        <div class="label-text">Please Enter Current PIN</div>\
                        <input type="password" autocomplete="off" id="currentPin" maxlength="4" placeholder="0000" class="input_form autocomplete-input">\
                    </div>\
                    <div class="otp-block round-mark">\
                        <div class="label-text">Enter OTP recieved in Mobile</div>\
                        <input type="password" autocomplete="off" id="otpReceived" maxlength="4" placeholder="0000" class="input_form autocomplete-input" disabled>\
                    </div>\
                    <div class="new-pin-confirm-pin-block round-mark">\
                        <div class="otp-block">\
                        <div class="label-text">New PIN</div>\
                        <input type="password" autocomplete="off" id="newPin" maxlength="4" placeholder="0000" class="input_form autocomplete-input" disabled>\
                        </div>\
                        <div class="otp-block confirm-new-pin-block">\
                        <div class="label-text">Confirm New PIN</div>\
                        <input type="password" autocomplete="off" id="confirmNewPin" maxlength="4" placeholder="0000" class="input_form autocomplete-input" disabled>\
                        <img class="error-text-img" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Banking_demo/Error-text.svg">\
                        </div>\
                    </div>\
                </div>\
                <button class="next-btn">Next <img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Banking_demo/carrotright.svg"></button>\
                </div>\
            </div>\
        </div>\
        </div>\
    </script>';
        return createNewCardPinTemplate;
    }
    
}

export default CreateNewCardPinTemplate;