import $ from '../../../src/libs/korejquery'
import ButtonTemplate from './templates/button/buttonTemplate';
import ListTemplate from './templates/listTemplate/listTemplate';
import QuickReplyTemplate from './templates/quickReplyTemplate/quickReplyTemplate';
import TemplateAttachment from './templates/templateAttachment/templateAttachment';
import TableChartTemplate from './templates/tableTemplate/tableTemplate';
import CheckBoxesTemplate from './templates/checkBoxesTemplate/checkBoxesTemplate';
import DropdownTemplate from './templates/dropdownTemplate/dropdownTemplate';
import LikeDislikeTemplate from './templates/likeDislikeTemplate/likeDislikeTemplate';
import FormTemplate from './templates/formTemplate/formTemplate';
import AdvancedMultiSelectTemplate from './templates/advancedMultiSelect/advancedMultiSelect';
import TableListTemplate from './templates/tableListTemplate/tableListTemplate';
import RatingTemplate from './templates/ratingTemplate/ratingTemplate';
import ListWidgetTemplate from './templates/listWidgetTemplate/listWidgetTemplate';
import MiniTableChartTemplate from './templates/miniTableTemplate/miniTableTemplate';
import CarouselTemplate from './templates/carouselTemplate/carouselTemplate';
import ListViewTemplate from './templates/listViewTemplate/listViewTemplate';
import IframeTemplate from './templates/iframeTemplate/iframeTemplate';
import SystemTemplate from './templates/systemTemplate/systemTemplate';

import './customTemplate.css';
import '../../../libs/purejscarousel.css';

class customTemplate {
	hostInstance: any;
	templates = new Map();
	chatInitialize: any;
	helpers: any;
	constructor(hostInstance: any) {
		this.hostInstance = hostInstance;
		this.installDefaultTemplates();
	}

	installTemplate(templateName: string, template: any) {
		template.hostInstance = this.hostInstance;
		this.templates.set(templateName, template);
	};
	installDefaultTemplates() {

		this.installTemplate('button', new ButtonTemplate());
		this.installTemplate('list', new ListTemplate());
		this.installTemplate('quick_replies', new QuickReplyTemplate());

		this.installTemplate('attachments', new TemplateAttachment());
		this.installTemplate('table', new TableChartTemplate());
		this.installTemplate('checkboxes', new CheckBoxesTemplate());
		this.installTemplate('dropdown', new DropdownTemplate());
		this.installTemplate('like_dislike', new LikeDislikeTemplate());
		this.installTemplate('form_template', new FormTemplate());
		this.installTemplate('multiselect', new AdvancedMultiSelectTemplate());
		this.installTemplate('table_list', new TableListTemplate());
		this.installTemplate('rating', new RatingTemplate());
		this.installTemplate('list_widget', new ListWidgetTemplate());
		this.installTemplate('carousel', new CarouselTemplate());
		this.installTemplate('mini_table', new MiniTableChartTemplate());
		this.installTemplate('list_view', new ListViewTemplate());
		this.installTemplate('system', new SystemTemplate());
		this.installTemplate('iframe', new IframeTemplate());

	}

	/**
 * purpose: Function to render bot message for a given custom template
 * input  : Bot Message
 * output : Custom template HTML
 */
	renderMessage(msgData: any) { 
		var messageHtml = '';
		if(msgData.message && msgData.message[0].type == 'text' && (!msgData.message[0].component || !msgData.message[0].component.type ) ){
			return messageHtml;
		}
		else if (msgData.message && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type) {
			let tempType = msgData.message[0].component.payload && msgData.message[0].component.payload.template_type;
			let templateInstance = this.templates.get(tempType);
			if (!templateInstance) {
				console.warn('Template was not installed!');
				return;
			}
			return templateInstance.renderMessage.call(templateInstance, msgData);
		}// fallback option for attachments 
		// TODO: Generalise message template structure to define the template
		else if (msgData.message && msgData.message[0].component && (msgData.message[0].component.type == 'audio' || msgData.message[0].component.type == 'image' || msgData.message[0].component.type == 'video')) {
			let templateInstance = this.templates.get('attachments');
			return templateInstance.renderMessage.call(templateInstance, msgData);
		}else {
			console.warn('Template type not defined');
		}


		return messageHtml;
	} 


}


export default customTemplate;