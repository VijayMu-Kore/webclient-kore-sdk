import './fullsearchResultTopdownTemplate.scss';
declare class FullSearchResultTopdownTemplate {
    renderMessage(msgData: any): any;
    bindEvents(me: any, messageHtml: any, msgData: any): void;
    getTemplateString(type: any): string | undefined;
    getTopDownFacetsTabs(): string;
    bindTabsClickEvent(me: any, messageHtml: any, tabsHtml: any, facets: any, facetSelected: any): void;
    facetReset(me: any, messageHtml: any, msgData: any): void;
    bindFacetTriggerEvents(me: any, messageHtml: any, msgData: any): void;
    fullResultTemplateDataBind(me: any, messageHtml: any, result: any): void;
    applyFiltersFun(me: any, messageHtml: any): void;
    getSearchFacetsTopDownTemplate(type: any): string | undefined;
    facetsAlignTopdownClass(type: any, messageHtml: any): void;
    searchFacetsList(me: any, messageHtml: any, selectedFacetsList: any, isTopFacet: any): void;
    getSelectedFactedListTopDownTemplate(): string;
    bindRemoveFilterClickEvent(me: any, messageHtml: any): void;
    truncateText(val: any): string;
    getTopDownSortableFacetsTabs(): string;
    bindSortableFacetClickEvent(me: any, messageHtml: any, sortableHtml: any, facets: any): void;
    bindBackToSearchClickEvent(me: any, messageHtml: any): void;
    feedBackResultEvents(me: any, messageHtml: any): void;
    bindCustomizePreviewClickEvent(me: any, messageHtml: any): void;
}
export default FullSearchResultTopdownTemplate;
