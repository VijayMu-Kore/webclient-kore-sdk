
import helpers from '../../../../utils/helpers';
import './fullsearchResultsTemplate.scss';
class FullSearchResultsTemplate {

    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let helpersObj = helpers;
        if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == 'full_search_results_template') {
            me.messageHtml = $(me.getTemplateString(msgData.message[0].component.payload.template_type)).tmpl(msgData.message[0].component.payload);
            me.bindEvents(me.messageHtml);
            return me.messageHtml;
        }
    }
    bindEvents(messageHtml: any) {
        let me: any = this;
        let hostWindowInstance = me.hostInstance;
        let $ = me.hostInstance.$;
        var _innerText;
    // $(".template-3-classic-list-collapse")
    // .off("click",".click-here")
    // .on("click",".click-here", function (event: any) {
    //   console.log("********")
    // });


    }
    getTemplateString(type: any) {
    var fullSearchResultsTemplatel = '<script type="text/x-jqury-tmpl">\
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
            <div id="fullResultAllTypeId" style="height:100%"></div>\
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
        if (type === 'full_search_results_template') {
            return fullSearchResultsTemplatel;
        }

    }

}

export default FullSearchResultsTemplate;