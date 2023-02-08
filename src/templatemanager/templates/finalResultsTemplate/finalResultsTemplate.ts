import helpers from '../../../utils/helpers';
import './finalResultsTemplate.scss';
import customTemplate from '../../templateManager';
import searchListViewTemplate from '../../templates/searchListViewTemplate/searchListViewTemplate';
import searchGridViewTemplate from '../../templates/searchGridViewTemplate/searchGridViewTemplate';
import searchCarouselViewTemplate from '../../templates/searchCarouselViewTemplate/searchCarouselViewTemplate';
import FullSearchResultsTemplate from '../../templates/fullsearchResultsTemplate/fullsearchResultsTemplate';
import korejquery from "../../../libs/korejquery";
const $ = korejquery;

class FinalResultsTemplate {

  renderMessage(msgData: any) {
    let me: any = this;
    let $ = me.hostInstance.$;
    me.helpersObj = helpers?.helpers;
    if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == 'finalResultsTemplate') {
      if (msgData?.message[0].component?.payload?.helpers) {
        me.helpersObj = msgData.message[0].component.payload.helpers
      }
      else {
        msgData.message[0].component.payload['helpers'] = me.helpersObj;
      }
      me.messageResultHtml = $(FinalResultsTemplate.prototype.getTemplateString(msgData.message[0].component.payload.template_type)).tmpl(msgData.message[0].component.payload);
      me.customTemplateObj = new customTemplate(me);
      me.listTemplateObj = new searchListViewTemplate();
      me.gridTemplateObj = new searchGridViewTemplate();
      me.carouselTemplateObj = new searchCarouselViewTemplate();
      me.fullSearchTemplateObj = new FullSearchResultsTemplate();
      FinalResultsTemplate.prototype.bindEvents(me, me.messageResultHtml, msgData);
      return me.messageResultHtml;
    }
  }
  bindEvents(me: any, messageHtml: any, msgData: any) {
    let hostWindowInstance = me.hostInstance;
    let $ = me?.hostInstance?.$;
    // if(msgData.message[0].component.payload.searchConfigurationCopy){
    //   me.searchConfigurationCopy = msgData.message[0].component.payload.searchConfigurationCopy;
    // }
    me.groupData = msgData.message[0].component.payload.groupData;
    let container = '.search-data-container';
    if (msgData.message[0].component.payload.searchType == 'isSearch') {
      container = '.search-data-container'
    } else if (msgData.message[0].component.payload.searchType == 'isLiveSearch') {
      container = '.live-search-data-container'
    }
    if (me.groupData && me.groupData.length) {
      me.groupData.forEach((d: any) => {
        var showAllHTML;
        if (d.message[0].component.payload.template_type == 'searchListTemplate') {
          showAllHTML = me.listTemplateObj.renderMessage.bind(me, d);
        } else if (d.message[0].component.payload.template_type == 'searchGridTemplate') {
          showAllHTML = me.gridTemplateObj.renderMessage.bind(me, d);
        } else if (d.message[0].component.payload.template_type == 'searchCarouselTemplate') {
          showAllHTML = me.carouselTemplateObj.renderMessage.bind(me, d);
        }
        // var showAllHTML = me.customTemplateObj.renderMessage.bind(me.hostInstance,d);
        $(messageHtml).find(container).append(showAllHTML);

      })
    }
    $(messageHtml).off("click", ".show-all-results").on("click", ".show-all-results", function (e: any) {
      const isSearchSDK = document.body.className.match('sdk-body');
      if (isSearchSDK !== null) {
        hostWindowInstance.seeAllBtnClickEvent(e);
      }
      else {
        let modifyGroupData = msgData.message[0].component.payload.groupData;
        modifyGroupData.forEach((d: any) => {
          d.message[0].component.payload.isSearch = false;
          d.message[0].component.payload.isFullResults = true;
          d.message[0].component.payload.isSearchSDK = true;
          d.message[0].component.payload.maxSearchResultsAllowed = 10;
        })
        let fullSearchMsgData = {
          message: [{
            component: {
              type: 'template',
              payload: {
                template_type: "fullSearchResultsTemplate",
                facets: [],
                count: msgData.message[0].component.payload.totalSearchResults,
                view: "preview",
                isDev: msgData.message[0].component.payload.isDev,
                isFilterEnabled: false,
                devMode: msgData.message[0].component.payload.devMode,
                viewType: msgData.message[0].component.payload.viewType,
                facetPosition: 'left',
                filterFacetData: [],
                groupData: modifyGroupData,
                displayFeedback:null,
                feedbackData: null
              }
            }
          }]
        };
        // let fullSearchHtml = me.fullSearchTemplateObj.renderMessage.bind(me, fullSearchMsgData);
        // setTimeout(fullSearchHtml, 500)
        setTimeout(() => {
          $('body').find('.full-search-results-container').remove();
          $('body').append(`<div class="full-search-results-container"></div>`);
          $('.full-search-results-container').append(me.fullSearchTemplateObj.renderMessage.bind(me, fullSearchMsgData));
        }, 1000);


      }
    });
    $(messageHtml).off("click", ".know-more-snippet").on("click", ".know-more-snippet", function (e: any) {
      var url = $(e.target).attr("snippetURL");
      window.open(url, '_blank','noopener');
    })

  }
  getTemplateString(type: any) {
    var finalResultsTemplate = '<script type="text/x-jqury-tmpl">\
    <div class="final-results-container">\
        {{if infoText && infoText.length}}\
          <div class="messageBubble">\
            <div class="messageBubble-content">\
                <div class="botMessage">\
                <span class="bot_Img">\
                    <img class="default-bot-icon" src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Icons/bubble_icon.svg">\
                </span>\
                <span>{{html helpers.convertMDtoHTML(infoText)}}</span>\
                </div>\
          </div>\
            <div class="sdk-results-customize-icon"><img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Icons/rangeslider.svg"><span class="tooltiptext-top sdk-i18n-lang" sdk-i18n-key="sa_sdk_customize_results">Customize Results</span></div>\
          </div>\
        {{/if}}\
        {{if snippetData && snippetData?.title}}\
      <div class="snippet-template snippet-margin">\
        <div class="title position-relative"><div class="title-text">{{html snippetData?.title}}</div></div>\
        <div class="desc-text">{{html snippetData?.answer}}</div>\
        <div class="quick-links">\
          <div>\
          <span class="quick-source">Source:</span>\
          <span><img class="know-more-snippet" snippetURL="${snippetData?.page_url}" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADnSURBVHgBbVBRSgNBDE1mMkoRYY/Qo+gRegJ3fgXRK3gCBUX8W3sCewM9gkfwCANtod2ZJJ2ULmxL85U8Xt7LC8KZap60yZxb6znzYvM5+XdnSFMR/bHegUshXHa2SKfEUspUReP64+LP5uuHApmlpbGdCDwKSgPC8/GyKeNgx6ydKj9XteSJOnYlBgjJ8Jy30Q8kGxAQ9qRSIio2qvhiuIUhZr6ponMbTP3qvo9I2NY2eYez5dskGU4C9aYKHiUSWKzew+8YouDDV7X+tnS25JHu+n47O/2GS6+YvMd4UAbn8HY4Y1w7HnB+uw0SNsYAAAAASUVORK5CYII="/><span class="quick-sourcename know-more-snippet" snippetURL="${snippetData?.page_url}">${snippetData?.source}</span></span>\
          </div>\
          <div class="quick-item display-none more-results-btn">\
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02LjI5ODM4IDAuNzk2ODc1QzMuMjYyMTQgMC43OTY4NzUgMC44MDA3ODEgMy4yNjQ4MSAwLjgwMDc4MSA2LjMwOTE2QzAuODAwNzgxIDkuMzUzNTEgMy4yNjIxNCAxMS44MjE0IDYuMjk4MzggMTEuODIxNEM3LjYyNjE1IDExLjgyMTQgOC44NDM5OSAxMS4zNDk1IDkuNzk0MTIgMTAuNTYzN0wxMi4zNDMgMTMuMDg4TDEyLjM4MSAxMy4xMjIyQzEyLjU5MDIgMTMuMjkzMyAxMi44OTg4IDEzLjI3OTkgMTMuMDkyMyAxMy4wODM0QzEzLjI5OCAxMi44NzQ2IDEzLjI5NTkgMTIuNTM4MiAxMy4wODc3IDEyLjMzMkwxMC41NDMzIDkuODEyMTZDMTEuMzI2IDguODU5OCAxMS43OTYgNy42Mzk1MSAxMS43OTYgNi4zMDkxNkMxMS43OTYgMy4yNjQ4MSA5LjMzNDYyIDAuNzk2ODc1IDYuMjk4MzggMC43OTY4NzVaTTYuMjk4MzggMS44NTk0OEM4Ljc0OTMyIDEuODU5NDggMTAuNzM2MiAzLjg1MTY3IDEwLjczNjIgNi4zMDkxNkMxMC43MzYyIDguNzY2NjQgOC43NDkzMiAxMC43NTg4IDYuMjk4MzggMTAuNzU4OEMzLjg0NzQ0IDEwLjc1ODggMS44NjA1NiA4Ljc2NjY0IDEuODYwNTYgNi4zMDkxNkMxLjg2MDU2IDMuODUxNjcgMy44NDc0NCAxLjg1OTQ4IDYuMjk4MzggMS44NTk0OFoiIGZpbGw9IiMwMDc3RDIiLz4KPC9zdmc+Cg==">More Results</div>\
          </div>\
      </div>\
      {{/if}}\
      <div class="finalResults {{if snippetData && snippetData?.title}}snippet-margin{{/if}}">\
        {{if taskPrefix === "SUGGESTED"}}\
        <span class="live-search-close-icon show-all-results">See All Results</span>\
        {{/if}}\
        <div class="resultsOfSearch">\
            {{if taskPrefix !== "SUGGESTED"}}\
                <div class="search-data-container"></div>\
            {{/if}}\
            {{if taskPrefix === "SUGGESTED"}}\
                <div class="live-search-data-container"></div>\
            {{/if}}\
            <!--{{if noResults}} <span class="text-center">No results found</span> {{/if}}-->\
            {{if showAllResults && !customSearchResult}}\
                {{if taskPrefix !== "SUGGESTED"}}\
                    <div class="bottom-search-show-all-results">\
                        <span class="pointer show-all-results" >See all <span class="search-results-count">(${totalSearchResults} results)</span><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAYAAACALL/6AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACHSURBVHgBlZDBDYUwDEOdin/+sEGkMhBMACOwCSuwASMwAwMglQ3YICTAAQ6lwpdUkV9lB4iImXPmsrd537sYEELYAClA2XiHosAJLS1EVrhfjy9i9gN739ibNGenM09SJA3E1RqJNqT1t7+1U0Up51GYskm7zNaJvpht595zP83JKNdBHtoBNXcrtgi1OOQAAAAASUVORK5CYII="></span>\
                    </div>\
                {{/if}}\
            {{/if}}\
        </div>\
        </div>\
    </div>\
</script>';
    if (type === 'finalResultsTemplate') {
      return finalResultsTemplate;
    }

  }
  botActionTrigger(event: any) {
    let me: any = this;
    me.hostInstance.botActionTrigger(event);
  };
  $ = $;

}
FinalResultsTemplate.prototype.$ = $;
export default FinalResultsTemplate;