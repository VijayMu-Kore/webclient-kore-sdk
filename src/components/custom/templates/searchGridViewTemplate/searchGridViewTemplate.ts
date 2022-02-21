
import helpers from '../../../../utils/helpers';
import './searchListViewTemplate.scss';
class SearchListViewTemplate {

    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.cwInstance.$;
        let helpersObj = helpers;
        if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload) {
            me.messageHtml = $(me.getTemplateString(msgData.message[0].component.payload.template_type)).tmpl(msgData.message[0].component.payload);
            me.bindEvents(me.messageHtml);
            return me.messageHtml;
        }
    }
    bindEvents(messageHtml: any) {
        let me: any = this;
        let chatWindowInstance = me.cwInstance;
        let $ = me.cwInstance.$;
        var _innerText;
        


    }
    getTemplateString(type: any) {
    }

}

export default SearchListViewTemplate;