
import helpers from '../../../utils/helpers';
import './otpTemplate.scss';
class OtpTemplate {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let helpersObj = helpers;
        var extension = '';
        var _extractedFileName = '';
        function strSplit(str) {
            return (str.split('.'));
        }
        if (msgData.message && msgData.message[0] && msgData.message[0].cInfo && msgData.message[0].cInfo.attachments) {
            extension = strSplit(msgData.message[0].cInfo.attachments[0].fileName);
        }
        if (msgData.message && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.url) {
            extension = strSplit(msgData.message[0].component.payload.url);
            _extractedFileName = msgData.message[0].component.payload.url.replace(/^.*[\\\/]/, '');
        }
        if (msgData?.message?.[0]?.component?.payload?.template_type === "otp_template") {
            me.messageHtml = $(me.getTemplateString("otpTemplate")).tmpl({
                'msgData': msgData,
                'helpers': helpersObj.helpers,
                'extension': extension
            });
            setTimeout(() => {
                me.bindEvents(me.messageHtml, msgData);
                $(me.messageHtml).find('.autocomplete-input').each(function () {
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
        $(messageHtml).find('.otp-container').off('keydown', '#otpSubmit').on('keydown', '#otpSubmit', function (e) {
            var keyCode = e.keyCode || e.which;
            keyCode = Number(keyCode);
            if (keyCode == 13) {
                if (e.target.value.length && e.target.value.length == 6) {
                    $(e.currentTarget).prop("disabled", true);
                    chatWindowInstance.sendMessage(e.target.value, msgData)
                }
            }
        })
        $(messageHtml).find('.otp-container').off('keyup', '#otpSubmit').on('keyup', '#otpSubmit', function (e) {
            var keyCode = e.keyCode || e.which;
            keyCode = Number(keyCode);
            if (e.target.value.length && e.target.value.length) {
                $(messageHtml).find('.resend-otp-btn').last().hide();
                $(messageHtml).find('.submit-otp-btn').last().show();
            } else {
                $(messageHtml).find('.resend-otp-btn').last().show();
                $(messageHtml).find('.submit-otp-btn').last().hide();
            }
        })
        $(messageHtml).find('.otp-container').off('click', '.resend-otp-btn').on('click', '.resend-otp-btn', function (e) {
            var title = $(e.target).attr('title');
            $(e.currentTarget).parent().find('#otpSubmit').prop("disabled", true);
            chatWindowInstance.sendMessage(title, msgData);
        })
        $(messageHtml).find('.otp-container').off('click', '.submit-otp-btn').on('click', '.submit-otp-btn', function (e) {
            var title = $(e.currentTarget).parent().find('#otpSubmit').val();
            $(e.currentTarget).parent().find('#otpSubmit').prop("disabled", true);
            chatWindowInstance.sendMessage(title, msgData);
        })
    }
    getTemplateString() {
        var otpTemplate = '<script id="otp_message_tmpl" type="text/x-jqury-tmpl"> \
        {{if msgData.message}} \
          <div class="messageBubble">\
            <div class="messageBubble-content">\
                <div class="botImg">\
                    <img class="default-bot-icon" src="images/bubbleIcon.svg">\
                    <img class="default-bot-banking-icon" src="images/banking/bankingavatar.svg">\
                </div>\
                <div class="botMessage">\
                    <div class="otp-container">\
                        <div class="text-info">${msgData.message[0].component.payload.text}</div>\
                        <div class="input-otp-box">\
                            <input type="password" autocomplete="off" id="otpSubmit" class="input-box autocomplete-input" maxlength="6" placeholder="Ex: 123456">\
                            <div class="resend-btn-otp resend-otp-btn">\
                            <img src="images/banking/resend.svg">\
                            <div class="resend-text" title="Resend">Resend</div>\
                            </div>\
                            <div class="resend-btn-otp submit-otp-btn" style="display:none">\
                            <img src="images/banking/external.svg">\
                            <div class="resend-text" title="Submit">Submit</div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
                <!--<div class="botMessage">\
                    <div class="text-info">Your request has been accepted successfully. You will recieve your new debit card with in <b>5 business days</b></div>\
                </div>\
                <div class="botMessage">\
                    <div class="heilighted-text">Track shipment</div>\
                </div>-->\
            </div>\
            </div>\
        {{/if}}\
     </script>';
        return otpTemplate;
    }
    
}

export default OtpTemplate;