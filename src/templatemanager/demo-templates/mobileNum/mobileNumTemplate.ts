
import helpers from '../../../utils/helpers';
import './mobileNumTemplate.scss';
class MobileNumTemplate {
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
        if (msgData?.message?.[0]?.component?.payload?.template_type === "mobile_num_template") {
            me.messageHtml = $(me.getTemplateString("mobileNumTemplate")).tmpl({
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
        $(messageHtml).find('.email-id-enter-container').off('click', '#sendMobile').on('click', '#sendMobile', function (e) {
            var mobile = $(e.currentTarget).parent().find('#mobileValue').val();
            if (mobile.length > 9) {
                $(e.currentTarget).prop("disabled", true);
                $(e.currentTarget).parent().find('#mobileValue').prop("disabled", true);
                chatWindowInstance.sendMessage('+91' + mobile, msgData)
            }
        })
        $(messageHtml).find('.email-id-enter-container').off('keydown', '#mobileValue').on('keydown', '#mobileValue', function (e) {
            var mobile = $(e.currentTarget).parent().find('#mobileValue').val();
            var keyCode = e.keyCode || e.which;
            keyCode = Number(keyCode);
            if (keyCode == 13) {
                if (mobile.length > 9) {
                    $(e.currentTarget).prop("disabled", true);
                    $(e.currentTarget).parent().find('#mobileValue').prop("disabled", true);
                    chatWindowInstance.sendMessage('+91' + mobile, msgData)
                }
            }
        })
    }
    getTemplateString() {
        var mobileNumTemplate = '<script>\
        <div class="messageBubble">\
            <div class="messageBubble-content">\
                <div class="botMessage">\
                    <div class="email-id-enter-container phone-number-width">\
                        <div class="title">${msgData.message[0].component.payload.text}</div>\
                        <div class="input-box">\
                            <input type="number" maxlength="10" class="width170" id="mobileValue">\
                                <button class="send-email" id="sendMobile">\
                                    <img src="images/cosmetics/arrow-green.svg" class="arrow-green">\
                                    <img src="images/cosmetics/arrow-white.svg" class="arrow-white">\
                                </button>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </script>';
        return mobileNumTemplate;
    }
    
}

export default MobileNumTemplate;