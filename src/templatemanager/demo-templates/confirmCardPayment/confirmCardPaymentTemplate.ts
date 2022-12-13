
import helpers from '../../../utils/helpers';
import './confirmCardPaymentTemplate.scss';
class ConfirmCardPaymentTemplate {
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
        if (msgData?.message?.[0]?.component?.payload?.template_type === "confirm_card_payment_template") {
            me.messageHtml = $(me.getTemplateString("confirmCardPaymentTemplate")).tmpl({
                'msgData': msgData,
                'helpers': helpersObj.helpers,
                'extension': extension
            });
            setTimeout(() => {
                me.bindEvents(me.messageHtml, msgData);
            }, 2000)
            return me.messageHtml;
        }
    }
    bindEvents(messageHtml:any, msgData:any) {
        let me :any = this;
        let chatWindowInstance = me.hostInstance;
        let $ = me.hostInstance.$;
        $(messageHtml).find('.actions-btn').off('click', '.confirm-cancel-btn').on('click', '.confirm-cancel-btn', function (e:any) {
            var payload = $(e.target).attr("payload");
            var title = $(e.target).attr("title");
            chatWindowInstance.appendTextToSearchContainer('user', title);
            chatWindowInstance.sendMessage(payload, msgData);
            $(messageHtml).find('.selected-click').removeClass('selected-click');
            $(messageHtml).find('.confirm-cancel-btn').addClass('selected-click');
        })
    }
    getTemplateString() {
        var confirmCardPaymentTemplate = '<script>\
        <div class="messageBubble">\
        <div class="messageBubble-content">\
            <div class="botImg">\
                <img class="default-bot-icon" src="images/bubbleIcon.svg">\
                <img class="default-bot-banking-icon" src="images/banking/bankingavatar.svg">\
            </div>\
            <div class="botMessage no-border-data">\
                <div class="select-bank-details">\
                    <div class="label-text">${msgData.message[0].component.payload.text}:</div>\
                    <div class="select-bank-accont-dropdown">\
                    <input type="text" disabled value="${msgData.message[0].component.payload.data.account_number}">\
                    </div>\
                    <div class="details-of-account">\
                    <div class="left-title">Card Holder Name</div>\
                    <div class="right-title">${msgData.message[0].component.payload.data.card_holder_name}</div>\
                    </div>\
                    <div class="details-of-account">\
                    <div class="left-title">Card Number</div>\
                    <div class="right-title">${msgData.message[0].component.payload.data.card_number}</div>\
                    </div>\
                    <div class="account-debited-table">\
                    <div class="title">Amount to be debited</div>\
                    <div class="price-debited">${msgData.message[0].component.payload.data.amount}</div>\
                    </div>\
                    <div class="actions-btn">\
                    <button class="confirm-btn confirm-cancel-btn" payload="${msgData.message[0].component.payload.buttons[0].payload}" title="${msgData.message[0].component.payload.buttons[0].title}">${msgData.message[0].component.payload.buttons[0].title}<img title="${msgData.message[0].component.payload.buttons[0].title}" payload="${msgData.message[0].component.payload.buttons[0].payload}"  class="unactive-img" src="images/banking/external.svg"><img title="${msgData.message[0].component.payload.buttons[0].title}" payload="${msgData.message[0].component.payload.buttons[0].payload}" class="active-img" src="images/banking/external-white.svg"></button>\
                    <button class="cancel-btn confirm-cancel-btn" payload="${msgData.message[0].component.payload.buttons[1].payload}" title="${msgData.message[0].component.payload.buttons[1].title}">${msgData.message[0].component.payload.buttons[1].title}</button>\
                    </div>\
                </div>\
            </div>\
        </div>\
        </div>\
    </script>';
        return confirmCardPaymentTemplate;
    }
    
}

export default ConfirmCardPaymentTemplate;