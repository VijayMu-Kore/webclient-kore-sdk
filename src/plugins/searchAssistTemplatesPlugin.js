import SearchListViewTemplate from '../templatemanager/templates/searchListViewTemplate/searchListViewTemplate';
import SearchGridViewTemplate from '../templatemanager/templates/searchGridViewTemplate/searchGridViewTemplate';
import SearchCarouselViewTemplate from '../templatemanager/templates/searchCarouselViewTemplate/searchCarouselViewTemplate';
import FinalResultsTemplate from '../templatemanager/templates/finalResultsTemplate/finalResultsTemplate';
import FullSearchResultTopdownTemplate from '../templatemanager/templates/fullsearchResultsTemplate/fullsearchResultsTemplate';
import FullSearchResultsTemplate from '../templatemanager/templates/fullsearchResultTopdownTemplate/fullsearchResultTopdownTemplate';

class SearchAssistTemplatesPlugin {
    name = 'SearchAssistTemplatesPlugin';
    config = {
    };
    constructor(config) {
        config=config ||{};
        this.config = {
            ...this.config,
            ...config
        }
    }
    onHostCreate() {
        let me = this;
        let cwInstance=me.hostInstance;
        cwInstance.on("viewInit", (chatWindowEle) => {
            me.onInit();
        });
       
    }
    onInit() {
        let me = this;
        me.installPickerTemplates();
    }
    installPickerTemplates(){
        let me=this;
        let templateManager = me.hostInstance.templateManager;
        templateManager.installTemplate(new SearchListViewTemplate());
        templateManager.installTemplate(new SearchGridViewTemplate());
        templateManager.installTemplate(new SearchCarouselViewTemplate());
        templateManager.installTemplate(new FinalResultsTemplate());
		templateManager.installTemplate(new FullSearchResultTopdownTemplate());
		templateManager.installTemplate(new FullSearchResultsTemplate());
    }
    
}
export default SearchAssistTemplatesPlugin;
