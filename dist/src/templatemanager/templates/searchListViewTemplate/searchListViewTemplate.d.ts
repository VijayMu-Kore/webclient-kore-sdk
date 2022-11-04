import './searchListViewTemplate.scss';
declare class SearchListViewTemplate {
    renderMessage(msgData: any): any;
    bindEvents(me: any, messageHtml: any): void;
    getTemplateString(type: any): string | undefined;
}
export default SearchListViewTemplate;
