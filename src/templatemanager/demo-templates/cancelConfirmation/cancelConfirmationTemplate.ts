
import helpers from '../../../utils/helpers';
import './cancelConfirmationTemplate.scss';
class cancelConfirmationTemplate {
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
        if (msgData?.message?.[0]?.component?.payload?.template_type === "cancel_confirmation_template") {
            me.messageHtml = $(me.getTemplateString("cancelConfimationTemplate")).tmpl({
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
        $(messageHtml).find('.yes-no-button-block').off('click', '.cancel-confirm-btn').on('click', '.cancel-confirm-btn', function (e:any) {
            var payload = $(e.currentTarget).closest('.cancel-confirm-btn').attr('id');
            $(e.currentTarget).closest('.cancel-confirm-btn').parent().find('.active-button').removeClass('active-button');
            $(e.currentTarget).closest('.cancel-confirm-btn').addClass('active-button');
            chatWindowInstance.appendTextToSearchContainer('user', payload);
            chatWindowInstance.sendMessage(payload, msgData);
        })

    }
    getTemplateString() {
        var cancelConfirmationTemplate = '<script>\
        <div class="messageBubble">\
            <div class="messageBubble-content">\
                <div class="botMessage yes-no-button-block">\
                    <button class="no-btn cancel-confirm-btn active-button" id="Yes">\
                        <span>Yes</span>\
                        <img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Cosmetics_demo/arrow-black.svg">\
                    </button>\
                    <button class="no-btn cancel-confirm-btn" id="No">\
                    <span>No</span>\
                    <img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Cosmetics_demo/arrow-black.svg">\
                    </button>\
                    </div>\
            </div>\
        </div>\
    </script>';
        return cancelConfirmationTemplate;
    }
    
}

export default cancelConfirmationTemplate;