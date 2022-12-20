
import helpers from '../../../utils/helpers';
import './cancelOrderTemplate.scss';
class CancelOrderTemplate {
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
        if (msgData?.message?.[0]?.component?.payload?.template_type === "cancel_order_template") {
            me.messageHtml = $(me.getTemplateString("cancelOrderTemplate")).tmpl({
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
        $(messageHtml).find('.trak-details').off('click', '.cancel-order').on('click', '.cancel-order', function (e:any) {
            var payload = $(e.currentTarget).closest('.cancel-order').attr('id');
            $(e.currentTarget).closest('.order-card-data').addClass('pointers-none');
            chatWindowInstance.sendMessage(payload, msgData);
        })
    }
    getTemplateString() {
        var cancelOrderTemplate = '<script>\
        <div class="messageBubble">\
            <div class="messageBubble-content">\
                <div class="order-track-container botMessage cancel-order-details">\
                    <div class="heading-text">${msgData.message[0].component.payload.text}</div>\
                    <div class="order-info-cards">\
                    {{each(key, data) msgData.message[0].component.payload.data}}\
                        <div class="order-card-data">\
                            <div class="img-block">\
                                <img src="${data.prod_image_url}">\
                            </div>\
                            <div class="content-text">\
                                <div class="title">${data.prod_title}</div>\
                                <div class="date-text">Exp. Dt ${data.exp_date}</div>\
                                <div class="order-details">${data.order_id}</div>\
                            </div>\
                            <div class="trak-details">\
                                <div class="button-track cancel-order" id="${data.prod_title}">\
                                    <img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Cosmetics_demo/cancel-order.svg">\
                                        <span>Cancel Order</span>\
                                </div>\
                            </div>\
                        </div>\
                        {{/each}}\
                    </div>\
                </div>\
            </div>\
        </div>\
        </script>';
        return cancelOrderTemplate;
    }
    
}

export default CancelOrderTemplate;