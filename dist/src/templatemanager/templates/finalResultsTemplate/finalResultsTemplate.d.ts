import './finalResultsTemplate.scss';
declare class FinalResultsTemplate {
    renderMessage(msgData: any): any;
    bindEvents(me: any, messageHtml: any, msgData: any): void;
    getTemplateString(type: any): string | undefined;
    botActionTrigger(event: any): void;
    $: JQueryStatic;
}
export default FinalResultsTemplate;
