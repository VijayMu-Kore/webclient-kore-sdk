
import helpers from '../../../utils/helpers';
import './enterEmailTemplate.scss';
class EnterEmailTemplate {
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
        if (msgData?.message?.[0]?.component?.payload?.template_type === "enterEmailTemplate") {
            me.messageHtml = $(me.getTemplateString("enterEmailTemplate")).tmpl({
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
        $(messageHtml).find('.email-id-enter-container').off('click', '#sendEmail').on('click', '#sendEmail', function (e) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            var email = $('#emailValue').val();
            if (regex.test(email)) {
                $(e.currentTarget).prop("disabled", true);
                chatWindowInstance.sendMessage(email, msgData)
            }
        })
    }
    getTemplateString() {
        var enterEmailTemplate = '<script>\
        <div class="messageBubble">\
            <div class="messageBubble-content">\
                <div class="botImg">\
                    <img class="default-bot-banking-icon" src="images/cosmetics/cosmoticavatar.svg">\
                </div>\
                <div class="botMessage">\
                 <div>Sure, I can help you with it.</div>\
                </div>\
                <div class="botMessage">\
                    <div class="email-id-enter-container">\
                        <div class="title">Please enter your email ID</div>\
                        <div class="input-box">\
                            <input type="email" id="emailValue">\
                                <button class="send-email" id="sendEmail>\
                                    <img src="images/cosmetics/arrow-green.svg">\
                                </button>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </script>';
        return enterEmailTemplate;
    }
    
}

export default EnterEmailTemplate;