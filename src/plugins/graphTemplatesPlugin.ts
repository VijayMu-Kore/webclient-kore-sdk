import LineChartTemplate from '../components/custom/templates/lineChartTemplate/lineChartTemplate';
import BarChartTemplate from '../components/custom/templates/barChartTemplate/barChartTemplate';
import PieChartTemplate from '../components/custom/templates/pieChartTemplate/pieChartTemplate';

class GraphTemplatesPlugin {
    name = 'GraphTemplatesPlugin';
    config = {
    };
    hostInstance: any;
    constructor(config:any) {
        config=config ||{};
        this.config = {
            ...this.config,
            ...config
        }
    }
    onHostCreate() {
        let me = this;
        let cwInstance=me.hostInstance;
        cwInstance.on("viewInit", (chatWindowEle:any) => {
            me.onInit();
        });
       
    }
    onInit() {
        let me = this;
        me.installPickerTemplates();
    }
    installPickerTemplates(){
        let me=this;
        let templateManager = me.hostInstance.customTemplateObj;
        templateManager.installTemplate('linechart',new LineChartTemplate());
		templateManager.installTemplate('barchart',new BarChartTemplate());
		templateManager.installTemplate('piechart',new PieChartTemplate());
    }
    
}
export default GraphTemplatesPlugin;
