import './fullsearchResultsTemplate.scss';
declare class FullSearchResultsTemplate {
    renderMessage(msgData: any): any;
    bindEvents(me: any, messageHtml: any, msgData: any): void;
    getTemplateString(type: any): string | undefined;
    getBottomupTab(): string;
    bindTabsClickEvent(me: any, messageHtml: any, facetSelected: any): void;
    facetReset(me: any, messageHtml: any, msgData: any): void;
    facetFilter(): string;
    facetFilterTop(): string;
    facetTemplateTopIcon(): string;
    bindFacetTriggerEvents(me: any, messageHtml: any): void;
    fullResultTemplateDataBind(me: any, messageHtml: any, result: any): void;
    getFilterCountTemplate(): string;
    applyFiltersFun(me: any, messageHtml: any): void;
    truncateText(val: any): string;
    getBottomUpSortableFacetsTabs(): string;
    getBottomUpSortableFacetsAddedlist(): string;
    bindSortableFacetClickEvent(me: any, messageHtml: any, sortableHtml: any, facets: any, sortableFacetAddedHtml: any): void;
    $: JQueryStatic;
    feedBackResultEvents(me: any, messageHtml: any, feedbackData: any): void;
}
export default FullSearchResultsTemplate;
