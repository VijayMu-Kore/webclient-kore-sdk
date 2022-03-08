
import helpers from '../../../../utils/helpers';
import './fullsearchResultsTemplate.scss';
import customTemplate from '../../customTemplate';
import korejquery from "../../../../libs/korejquery";
const $ = korejquery;
class FullSearchResultsTemplate {

    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        me.helpersObj = helpers;
        if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == 'fullSearchResultsTemplate') {
          if(msgData.message[0].component.payload.helpers){
            me.helpersObj = msgData.message[0].component.payload.helpers
          }
          me.messageHtml = $(me.getTemplateString(msgData.message[0].component.payload.template_type)).tmpl(msgData.message[0].component.payload);
            me.bindEvents(me.messageHtml,msgData);
            me.customTemplateObj = new customTemplate(me);
            return me.messageHtml;
        }
    }
    bindEvents(messageHtml: any, msgData:any) {
        let me: any = this;
        let hostWindowInstance = me.hostInstance;
        let $ = me.hostInstance.$;
        var _innerText;
        me.searchConfigurationCopy = msgData.message[0].component.payload.payload.searchConfigurationCopy;
        let formatedTemplatesData:any = me.getMergedData(msgData.message[0].component.payload.payload.resultSettings,msgData.message[0].component.payload.payload.responseData,'isFullResults');
        
       setTimeout(()=>{
        $(messageHtml).find('.full-search-data-container').empty();
        if(formatedTemplatesData && formatedTemplatesData.length){
          formatedTemplatesData.forEach((d:any)=>{
            var groupsName:any = Object.keys(d)
            var showAllHTML = me.customTemplateObj.renderMessage(d[groupsName[0]]);
            $(messageHtml).find('.full-search-data-container').append(showAllHTML);
          })
        }
       },300);
    }
    getTemplateString(type: any) {
    var fullSearchResultsTemplate = '<script type="text/x-jqury-tmpl">\
    <div>\
      <div class="show-all-results-outer-wrap" id="">\
        <div class="s-r-header">\
          <div class="title">Search Results</div>\
          <div class="close-btn" id="btn-close-show-all"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABiSURBVHgBjZDJDYBQCESBSjDq3VYswQotRe8e/JW4QEyEvyTMiQxvIADcDRvzOEFD0hOG4MYF8FprsHpvT5k/1Z8Wzj0s0zSr8dUpHbsDHSwykIggqPDq+DF2kkvnW6IPfwCV+T2+mOJOJAAAAABJRU5ErkJggg=="></div>\
          {{if isDev == true}}\
            <div class="custom-header-container-center">\
              <ul class="custom-header-nav">\
                <li id="viewTypePreview" class="custom-header-nav-link-item sdk-customize-nav"><a class="custom-header-nav-link">Preview</a></li>\
                <li id="viewTypeCustomize" class="custom-header-nav-link-item sdk-customize-nav"><a class="custom-header-nav-link">Customize</a></li>\
              </ul>\
            </div>\
          {{/if}}\
        </div>\
           <!-- <button id="btn-close-show-all" class="btn-close-show-all">close</button> -->\
        <div class="filter-sec-tab">\
                    <!-- Facet left-->\
                    <div id="leftFacetFilterId" class="{{if isFilterEnabled == false}}display-none{{/if}}"> </div>\
                    <!-- Facet left-->\
                    {{each(key,facet) facets}}\
                    <div class="tab-name see-all-result-nav  {{= facet.className}}"  title="{{= facet.name}}" id="{{= facet.key}}" classification="{{= facet.key}}">{{= facet.name}} <span class="count sdk-facet-count">({{= facet.doc_count}})</span></div>\
                    {{/each}}\
                    <!-- Facet right-->\
                    <div  id="rightFacetFilterId" class="{{if isFilterEnabled == false}}display-none{{/if}}"> </div>\
                    <!-- Facet right Icon -->\
                    <!-- Facet top-->\
                    <div  id="topFacetIcon" class="{{if isFilterEnabled == false}}display-none{{/if}}"> </div>\
                    <!-- Facet top Icon-->\
                    {{if count > 0 }}\
                    <div class="filter-updated-count">\
                      <span class="length-count">${count}</span>\
                      <span class="title"> {{if count && (count == 1)}}Filter{{else}}Filters{{/if}} applied</span>\
                      <span class="clsoe-filter"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACdSURBVHgBbZHRDcIwDERju+zTSizSCWgl8sFM+Ug26AwsUDIGO9A05AChprV/osjPd2eZLtfbg2gZg3PRKDUMts3SeAaUV5kGa1sVYpkoLaPEeX525+4OGC/+FbSmPgQX6T9dFAETp968jNlC6FNl9YNNLo0NhOIqVFEC9Bk/1Xn5ELwowX6/oGjBtQVpD2mZ4cBZ2GsQCkf4xmj8GzsLeh0gnVcbAAAAAElFTkSuQmCC"></span>\
                    </div>\
                    {{/if}}\
          </div>\
          <!-- Facet top-->\
          <div  id="topFacetFilterId"> </div>\
          <!-- Facet top-->\
          <div class="horizantal-filter-sec hide">\
          </div>\
          <!-- All type -->\
          {{if view == "preview"}}\
            <div id="fullResultAllTypeId" style="height:100%">\
            <div style="height:100%">\
      <!--<div id="loaderDIV" class="loader-container">Loading...</div>-->\
        <div class="data-body-sec {{if facetPosition == `top`}}iffilteristop{{/if}}">\
        <div class="no-templates-defined-full-results-container">\
        <div class="img-block"><img class="no-data-mapped">\
          <div class="title">Result templates are not mapped with a proper field value</div>\
        </div>\
      </div>\
        <div class="scroll-top-container">\
         <div class="title-scroll-top">\
           <img>Scroll to top\
          </div>\
        </div>\
        <div class="empty-full-results-container hide" id="top-down-all-tab-empty-state">\
        <div class="img-block">\
        <img src="data:image/png;base64,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">\
        </div>\
        <div class="title">Sorry, we could not find any results for that</div>\
        <div class="title-info">Please try searching with another term</div>\
        </div>\
        <div class="full-search-data-container matched-structured-data-contaniers">\
        </div>\
        <div class="kore-sdk-pagination-div">\
          <div class="kore-sdk-custom-pagination">\
            <div class="kore-sdk-bottom-up-first pagination-tootlip-buttons">\
              <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAgEASABIAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAQABADAREAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD+zn9pz9o/XPhre6B8H/gxpfhzxb+0d8Q9H1XxB4esPF8t9B8MfhH8OtBmjh8WfH74+6vpdzZXXh34V+Et722l6XFqWk+IPin4vFt4F8I3th/xUvirwe0r77fi/JeYiT9mv49eP/2j9X8SfEbRPCulaJ+y3/ZVjpXwe8b61p+taZ49+POsxXLtrnxc8OaBd33keEPgTfQKlj8NW1221DxV8RoXm8cW0ujeDG8M3PjAat69fLy9e4LX0Iv2m/2bda+JWoaD8Yvg1q2g+Ef2jvh9oupeHdAvvFYvZfhj8Xfh1rU4uPFPwB+PujafZ6nL4g+FXi9g89jqtvpOp+Jvhj4qa38beD7e7ceIfDPisT6Pb8vNef5g/wAST9mv4C/ED9nDV/Enw50XxVpWufst/wBlWOq/B7wRrWo61qfj74DazLcuuufCLw5r93YeR4v+BNjAyXvw0Gu3On+KvhzAk3ge3i1nwYnhm38IDaevXr2fn5PuMP/Z">\
              <span class="tooltip_text"> First</span>\
              </div>\
            <div class="kore-sdk-bottom-up-previous pagination-tootlip-buttons">\
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACuSURBVHgB3VKxDcIwEDwTD2AEA3xk0zMCbMAGrMAIGYWSjhFQJgipEcIlnTMAknloaPImSZecZMnS3+nuTw+MAkRk+FHbbNZBTFBZBegd+uLrnLuKyBUSR6XEUPqCGEvv7weJJ6+g9JnFdUoM2d0Vn+hduEKC1xGI3Lzr7/5Lwcjtg6zdp3iZNGgYxixL/p7MYv5sQqgxLMlqzX0EXmfTNv97SN7frohqy50Qpok3s14tS5MeJgUAAAAASUVORK5CYII=">\
              <span class="tooltip_text"> Previous</span>\
              </div>\
            <div class="input-text-data">\
              <div class="title">Page</div>\
              <div>\
                <input id="kore-current-page-number" class="kore-current-page-number" type="text" value="1">\
              </div>\
              <div class="title">of</div>\
              <div id="kore-total-page-number" class="kore-total-page-number">15</div>\
            </div>\
            <div class="kore-sdk-bottom-up-next pagination-tootlip-buttons">\
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAALCAYAAABcUvyWAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACdSURBVHgBXY+xDQIxEAT3bAIiZEQD99gf4xKgEuiEkDY+JUJUQEoGxAjhCsAhwUvmEHqw/8LZW2lWM9femNEwyiE7BaQ5SB+Y2eSBjvFxNGYyBqmNNLdSfH0C6j6YbQOiGVK7CCFE1QUh3FZI6QIa7IrGr1m5ExL2qoBTtxYZkWibP7R2yZW9ix33oHuWUAZ+Ye17A+GRSBSv5zx4A80eMIB299aVAAAAAElFTkSuQmCC">\
              <span class="tooltip_text">Next</span>\
              </div>\
            <div class="kore-sdk-bottom-up-last pagination-tootlip-buttons">\
              <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAC8SURBVHgB3ZKxEcIwDEUVZwAEWUCJnJ5R2AA2YAQYIRswAkdJyQRQ0kEJTewFOBBxjos5QkI68htbOn//d7YA+iWK9Z4oHb9q4owSvfjmCasF4vAKAawRo621+QVxcAQIMhxFaE2+g1YUxDMhMSRytSjmUx1J+N6w1hwciVoJweYseq4dSPSySCZCj4R5Wj2nam9QcC936PVv8kqN6Uk6L9PJSxeqZrMgdjcTT9wPuFn4yVwYPg1SW/P/6gGaqz4/5BlCXQAAAABJRU5ErkJggg==">\
              <span class="tooltip_text">Last </span>\
              </div>\
          </div>\
        </div>\
        <div class="custom-add-result-container {{if devMode== false || viewType != "Customize"}}display-none{{/if}}">\
          <div class="custom-add-new-result-content">\
            <div class="bold-text">Not finding the result?</div>\
            <div class="link-text"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABrSURBVHgBzVHBCYAwEMuV/lRwBDdykoojuIoTiBs5Qt8KjVZfLdeHD8FAyJEQOO4ABZXbx0gts5opIi0KMHiJ7wvSuLBcmu4s7G6lbHnBgmGGZAWa/hnCmvrw0FAPxxSpZT+8kvppkr5UOAH/GRicle7qIwAAAABJRU5ErkJggg==">Add from repository</div>\
          </div>\
        </div>\
            </div>\
          {{/if}}\
          <!-- All type -->\
          <!-- Result Ranking -->\
          {{if view == "customization"}}\
            <div id="resultRankingId"></div>\
            {{/if}}\
          <!-- Result Ranking -->\
      </div>\
    </div>\
    </script>';
        if (type === 'fullSearchResultsTemplate') {
            return fullSearchResultsTemplate;
        }

    }

    getMergedData(settingData:any,responseData:any,searchType:any){
      let response = Object.assign({},responseData.template);
      let me:any =this;
      settingData = settingData.settings || [];
      var configurationSettings:any = {};
     var isFullResults = false;
     var isSearch=false;
     var isLiveSearch = false;
     me.mergedData = [];
     if (searchType == 'isFullResults') {
       isFullResults = true;
       searchType = 'fullSearch';
     } else if (searchType == 'isSearch') {
       isSearch = true;
       searchType = "conversationalSearch";
     } else if (searchType == 'isLiveSearch') {
       isLiveSearch = true;
       searchType = "liveSearch";
     }
     var selected:any = {};
     if (settingData && settingData.length) {
       settingData.forEach((config:any) => {
         var availableGroupNames:any = [];
         if (config.interface === searchType) {
           if (config.groupResults) {
             availableGroupNames = config.groupSetting.conditions.map(function (group:any) {
               return group.fieldValue;
             })
           }
         
         availableGroupNames.push('defaultTemplate');
         availableGroupNames.forEach((group:any) => {
           if (!configurationSettings[group + 'Config']) {
             configurationSettings[group + 'Config'] = {
               liveSearchInterface: {
                 layout: {}
               },
               conversationalSearchInterface: {
                 layout: {}
               },
               fullSearchInterface: {
                 layout: {}
               }
             };
           }
         })
         //design template config start//
         var conditions = [];
         if (config.groupResults) {
           conditions = config.groupSetting.conditions;
         }
         conditions.push({ "fieldValue": 'defaultTemplate', "template": config.defaultTemplate });
         conditions.forEach((condition:any) => {
           var template = condition.template || {};
           // writing conditions only for StructuredData
           if (template && template.layout) {
             configurationSettings[condition.fieldValue + 'Config'][config.interface + 'Interface'] = template;
             if (template.layout && template.layout.layoutType) {
               configurationSettings[condition.fieldValue + 'Config'][config.interface + 'Interface'].layout.templateType = template.type;
               configurationSettings[condition.fieldValue + 'Config'][config.interface + 'Interface'].layout.template = '';
               configurationSettings[condition.fieldValue + 'Config'][config.interface + 'Interface'].layout.maxSearchResultsAllowed = 5;
               configurationSettings[condition.fieldValue + 'Config'][config.interface + 'Interface'].layout.layoutType = template.layout.layoutType;
               configurationSettings[condition.fieldValue + 'Config'][config.interface + 'Interface'].layout.textAlignment = template.layout.textAlignment;
               configurationSettings[condition.fieldValue + 'Config'][config.interface + 'Interface'].layout.listType = template.layout.listType;
               configurationSettings[condition.fieldValue + 'Config'][config.interface + 'Interface'].layout.isClickable = template.layout.isClickable;
               configurationSettings[condition.fieldValue + 'Config'][config.interface + 'Interface'].layout.behaviour = template.layout.behaviour;
               configurationSettings[condition.fieldValue + 'Config'][config.interface + 'Interface'].layout.renderTitle = template.layout.renderTitle;
               configurationSettings[condition.fieldValue + 'Config'][config.interface + 'Interface'].layout.title = template.layout.title;
               configurationSettings[condition.fieldValue + 'Config'][config.interface + 'Interface'].mapping = template.mapping;
               configurationSettings[condition.fieldValue + 'Config'][config.interface + 'Interface'].groupResults = (condition.fieldValue == 'defaultTemplate') ? false : config.groupResults;
               configurationSettings[condition.fieldValue + 'Config'][config.interface + 'Interface'].fieldName = (condition.fieldValue == 'defaultTemplate') ? '' : config.groupSetting.fieldName;
             }
           }
         });
         //design template config end//
         setTimeout(function () {
           availableGroupNames.forEach((group:any) => {
             //initialize template config start//
             var templateInterface  = config.interface;
             var templateConfig = configurationSettings[group + 'Config'];
             var groupName = group;
             var customTemplateConfig = [];
               if (!selected[groupName + templateInterface + 'TemplateType']) {
                 selected[groupName + templateInterface + 'TemplateType'] = '';
                 selected[groupName + templateInterface + 'LayoutType'] = '';
               }
               var searchTemplate = '';
               var fullSearchTemplate = '';
               var liveSearchTemplate = '';
               if (templateConfig && templateConfig[templateInterface + 'Interface'] && templateConfig[templateInterface + 'Interface'].layout) {
                 // will take the templateType and layoutType from AJAX config
                 if (templateConfig[templateInterface + 'Interface'].layout.templateType && templateConfig[templateInterface + 'Interface'].layout.templateType.length) {
                   selected[groupName + templateInterface + 'TemplateType'] = templateConfig[templateInterface + 'Interface'].layout.templateType;
                   selected[groupName + templateInterface + 'LayoutType'] = templateConfig[templateInterface + 'Interface'].layout.layoutType;
                 }
               }
               if (!selected[groupName + templateInterface + 'TemplateType'] || !selected[groupName + templateInterface + 'TemplateType'].length) {
                 // default case
                 selected[groupName + templateInterface + 'TemplateType'] = 'list';
                 selected[groupName + templateInterface + 'LayoutType'] = 'l1'
               }
           });
            // Search call back
            me.getConfigData = function(data:any){
              var structuredData:any = [];
              var templateConfiguration:any = {};
              var templateInterfaceType = '';
              var groupName = data.dataObj.groupName;
              var doc_count = data.dataObj.doc_count;
              if (isLiveSearch) {
                templateInterfaceType = 'liveSearch';
                templateConfiguration = configurationSettings[groupName + 'Config'][templateInterfaceType + 'Interface'];
              } else if (isSearch) {
                templateInterfaceType = 'conversationalSearch';
                templateConfiguration = configurationSettings[groupName + 'Config'][templateInterfaceType + 'Interface'];
              } else {
                templateInterfaceType = 'fullSearch';
                templateConfiguration = configurationSettings[groupName + 'Config'][templateInterfaceType + 'Interface'];
              }
              structuredData = me.designDataWithMappings(data.dataObj.data, templateConfiguration.mapping);
              if (templateConfiguration && templateConfiguration.layout) {
                data['isClickable'] = templateConfiguration.layout.isClickable;
                data['behaviour'] = templateConfiguration.layout.behaviour;
                data['listType'] = templateConfiguration.layout.listType;
                data['titleName'] = templateConfiguration.layout.title;
                data['textAlignment'] = templateConfiguration.layout.textAlignment;
                data['renderTitle'] = templateConfiguration.layout.renderTitle;
                data['groupResults'] = templateConfiguration.groupResults;
                data['fieldName'] = templateConfiguration.fieldName;
                config = templateConfiguration;
              }
             
              // this should only be applied for 'search' interface
              data['structuredData'] = [];
              data['structuredData'] = structuredData;
              var viewType = 'Preview';
              var devMode = this.isDev ? true : false;
              if (!data.selectedFacet) {
                viewType = 'Preview';
              }
              if (!structuredData || !structuredData.length) {
                structuredData = [];
              }
              var maxSearchResultsAllowed = 2;
              if (data.isLiveSearch) {
                maxSearchResultsAllowed = (me.searchConfigurationCopy.liveSearchResultsLimit || (me.searchConfigurationCopy.liveSearchResultsLimit == 0)) ? me.searchConfigurationCopy.liveSearchResultsLimit : 2;
              }
              else if (isSearch) {
                if (selected[groupName + templateInterfaceType + 'TemplateType'] === 'grid') {
                  maxSearchResultsAllowed = 4;
                }
                else if (selected[groupName + templateInterfaceType + 'TemplateType'] === 'carousel') {
                  maxSearchResultsAllowed = (structuredData.length) ? structuredData.length : 1;
                }
                else {
                  maxSearchResultsAllowed = 2;
                }
              }
              else if (isFullResults) {
                maxSearchResultsAllowed = 5;
              }
              else {
                maxSearchResultsAllowed = (structuredData.length) ? structuredData.length : 1;
              }
      
              var isDropdownEnabled = true;
              var messageData = {
                "message": [
                {
                    "component": {
                        "type":'template',
                        "payload": {
                         "template_type": "search_"+selected[groupName + templateInterfaceType + 'TemplateType']+"_template",
                         'isClickable': data.isClickable,
                         'structuredData': structuredData,
                         'viewType': viewType,
                         'isFullResults': data.isFullResults,
                         'isSearch': isSearch,
                         'devMode': devMode,
                         'isLiveSearch': isLiveSearch,
                         'appearanceType': 'data',
                         'maxSearchResultsAllowed': maxSearchResultsAllowed,
                         'isDropdownEnabled': isDropdownEnabled,
                         'tour': false,
                         'helpers': me.helpersObj,
                         'renderTitle': data.renderTitle,
                         'titleName': data.titleName,
                         'listType': data.listType,
                         'textAlignment': data.textAlignment,
                         'behaviour': data.behaviour,
                         'groupResults': data.groupResults,
                         'groupName': groupName,
                         'doc_count': doc_count || 0,
                         'pageNumber': 0,
                         'templateName': groupName.replaceAll(' ', ''),
                         'fieldName': data.fieldName
                      }
                    }
                }
            ]
        }
              if(structuredData && structuredData.length){
                me.mergedData.push({[groupName]:messageData});
              }
            }
           me.designDataWithMappings=function (data:any, mapping:any) {
              var dataArr:any = [];
              if (data && data.length && mapping && Object.values(mapping).length) {
                data.forEach((obj:any) => {
                  var item:any = {};
                  if (obj[mapping.heading]) {
                    item.heading = obj[mapping.heading];
                  }
                  if (obj[mapping.description]) {
                    item.description = obj[mapping.description];
                  }
                  if (obj[mapping.img]) {
                    item.img = obj[mapping.img];
                  }
                  if (obj[mapping.url]) {
                    item.url = obj[mapping.url];
                  }
                  if (!item.heading || !item.heading.toString().length) {
                    item.heading = '';
                  }
                  if (!item.description || !item.description.toString().length) {
                    item.description = '';
                  }
                  if (!item.img || !item.img.length) {
                    item.img = '';
                  }
                  if (!item.url || !item.url.length) {
                    item.url = '';
                  }
                  item.config = obj.config;
                  item.feedback = obj.feedback;
                  item.customization = null;
                  item.sys_content_type = obj.sys_content_type;
                  item.contentId = obj.contentId;
                  item.addedResult = (obj.addedResult || (obj.addedResult == false)) ? obj.addedResult : false;
                  item.bestMatch = (obj.bestMatch || (obj.bestMatch == false)) ? obj.bestMatch : false;
                  if (item.heading || item.description || item.img || item.url) {
                    dataArr.push(item);
                  }
                });
                return dataArr;
              }
            }
           //response modification start //
           if (((response.results || {}).data || []).length || (response.results && response.resultType == "grouped" && Object.keys(response.results).length)) {
             if (response && response.results && response.resultType == "grouped") {
               var resAvailableGroups = Object.keys(response.results);
               if (resAvailableGroups && resAvailableGroups.length) {
                 resAvailableGroups.forEach((group) => {
                   var results = response.results[group].data;
                   var groupName = group == 'default_group' ? 'defaultTemplate' : group;
                   var dataObj = {
                     data: results,
                     groupName: groupName,
                     doc_count: response.results[group].doc_count
                   }
                   me.getConfigData({ isFullResults: isFullResults, selectedFacet: 'all results', isLiveSearch: isLiveSearch, isSearch: isSearch, dataObj });
                 });
               } 
             } else {
               var results = response.results.data;
               var dataObj = {
                 data: results,
                 groupName: 'defaultTemplate',
                 doc_count: response.results.doc_count
               }
               if (results && results.length) {
                 me.getConfigData({ isFullResults: isFullResults, selectedFacet: 'all results', isLiveSearch: isLiveSearch, isSearch: isSearch, dataObj });
               }
             }
           }
           //response modification end //
              console.log("mergedeata", me.mergedData);
               return me.mergedData;
         }, 200);
       }
       });
      
     }
   }
   $=$;
   
}
FullSearchResultsTemplate.prototype.$ = $;

export default FullSearchResultsTemplate;