
import helpers from '../../../utils/helpers';
import './enterOtpTemplate.scss';
class EnterOTPTemplate {
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
        if (msgData?.message?.[0]?.component?.payload?.template_type === "enter_otp_template") {
            me.messageHtml = $(me.getTemplateString("enterOTPTemplate")).tmpl({
                'msgData': msgData,
                'helpers': helpersObj.helpers,
                'extension': extension
            });
            setTimeout(() => {
                me.bindEvents(me.messageHtml, msgData);
            }, 200)
            return me.messageHtml;
        }
    }
    bindEvents(messageHtml:any, msgData:any) {
        let me :any = this;
        let chatWindowInstance = me.hostInstance;
        let $ = me.hostInstance.$;
        $(messageHtml).find('.email-id-enter-container').off('click', '.sendOTP').on('click', '.sendOTP', function (e:any) {
            var otp = $(e.currentTarget).parent().find('#otpValue').val();
            if (otp.length > 1) {
                $(e.currentTarget).prop("disabled", true);
                $(e.currentTarget).parent().find('#otpValue').prop("disabled", true);
                chatWindowInstance.sendMessage(otp, msgData)
            }
        })
        $(messageHtml).find('.email-id-enter-container').off('keydown', '#otpValue').on('keydown', '#otpValue', function (e:any) {
            var otp = $(e.currentTarget).parent().find('#otpValue').val();
            var keyCode = e.keyCode || e.which;
            keyCode = Number(keyCode);
            if (keyCode == 13) {
                if (otp.length > 1) {
                    $(e.currentTarget).prop("disabled", true);
                    $(e.currentTarget).parent().find('#otpValue').prop("disabled", true);
                    chatWindowInstance.sendMessage(otp, msgData)
                }
            }
        })
        $(messageHtml).find('.email-id-enter-container').off('keypress', '#otpValue').on('keypress', '#otpValue', function (e:any) {
            if ($(e.currentTarget).val().length == $(e.currentTarget).attr("maxlength")) {
                return false;
            }
        })
        $(messageHtml).find('.email-id-enter-container').off('click', '.refresh-otp').on('click', '.refresh-otp', function (e:any) {
            $(e.currentTarget).prop("disabled", true);
            $(e.currentTarget).parent().find('#otpValue').prop("disabled", true);
            chatWindowInstance.sendMessage('Resend', msgData)
        })
    }
    getTemplateString() {
        var enterOTPTemplate = '<script>\
        <div class="messageBubble">\
            <div class="messageBubble-content">\
                <div class="botMessage">\
                    <div class="email-id-enter-container phone-number-width">\
                        <div class="title">${msgData.message[0].component.payload.text}</div>\
                        <div class="input-box">\
                            <input type="number" maxlength="4" class="width90" id="otpValue">\
                                <button class="send-email sendOTP">\
                                    <img src="images/cosmetics/arrow-green.svg" class="arrow-green">\
                                    <img src="images/cosmetics/arrow-white.svg" class="arrow-white">\
                                </button>\
                                <button class="send-email refresh-otp">\
                                    <img src="images/cosmetics/refresh.svg">\
                                </button>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </script>';
        return enterOTPTemplate;
    }
    
}

export default EnterOTPTemplate;