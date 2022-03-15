
import helpers from '../../../../utils/helpers';
import './searchListViewTemplate.scss';
class SearchListViewTemplate {

  renderMessage(msgData: any) {
    let me: any = this;
    let $ = me.hostInstance.$;
    me.helpersObj = helpers;
    if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == 'searchListTemplate') {
      if (!msgData.message[0].component.payload.helpers) {
        msgData.message[0].component.payload['helpers'] = me.helpersObj;
      }
      msgData.message[0].component.payload['helpers'] = me.helpersObj.helpers;
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
    //if(me.hostInstance.hasOwnProperty('FindlySDK')){
    if (!hostWindowInstance.vars || !hostWindowInstance.vars.customizeView) {
      setTimeout(function () {
        // $(".results-wrap").sortable({
        //   items: "li:not(.ui-state-disabled)",
        //   cancel: ".ui-state-disabled",
        //   stop: function (event : any, ui: any) {
        //     var element = ui.item[0];
        //     if ($(element).find(".pinning").length) {
        //       var pinningElement = $(element).find(".pinning")[0];
        //       if (pinningElement) {
        //         $(pinningElement).closest(".pinning").attr("type", "Pin");
        //         $(pinningElement).trigger("click");
        //       }
        //     } else if ($(element).attr("manuallyadded") == "true") {
        //       var pinIndex = 0;
        //       var _selectedElement = ui.item[0];
        //       var _parentElement = $(event.target).closest(".results-wrap");
        //       var childNodes = Array.prototype.slice.call(
        //         _parentElement[0].children
        //       );
        //       pinIndex = childNodes.indexOf(_selectedElement);
        //       if (pinIndex >= 0) {
        //           hostWindowInstance.performRankActionsOnFullPage(
        //           ui.item,
        //           { pinIndex: pinIndex },
        //           hostWindowInstance.vars.searchObject.searchText,
        //           "pinning",
        //           true
        //         );
        //         //
        //       }
        //     }
        //   },
        // });
      }, 200);
    }
    // Boost / Pin
    $(".template-3-classic-list-collapse")
      .off("click", ".click-here")
      .on("click", ".click-here", function (event: any) {
        console.log("********")
      });
    $(".customization")
      .off("click", ".visibility")
      .on("click", ".visibility", function (event: any) {
        // if (parseInt($(event.target).closest('.data-wrap').attr('pinindex')) == -1) {
        if ($(event.target).closest(".data-wrap").attr("visible") == "true") {
          hostWindowInstance.performRankActionsOnFullPage(
            event,
            { visible: false },
            hostWindowInstance.vars.searchObject.searchText,
            "visibility"
          );
        } else {
          hostWindowInstance.performRankActionsOnFullPage(
            event,
            { visible: true },
            hostWindowInstance.vars.searchObject.searchText,
            "visibility"
          );
        }
        // }
      });

    $(".customization")
      .off("click", ".unpin_added_result")
      .on("click", ".unpin_added_result", function (event: any) {
        hostWindowInstance.performRankActionsOnFullPage(
          event,
          { pinIndex: -1 },
          hostWindowInstance.vars.searchObject.searchText,
          "unpin_added_result"
        );
      });

    $(".customization")
      .off("click", ".pinning")
      .on("click", ".pinning", function (event: any) {
        if ($(event.target).closest(".data-wrap").attr("visible") == "true") {
          var _selectedElement = $(event.target).closest(".structure-data-wrp");
          var _parentElement = $(event.target).closest(".results-wrap");
          var childNodes = Array.prototype.slice.call(_parentElement[0].children);
          var pinIndex = 0;
          if ($(event.target).closest(".pinning").attr("type") == "UnPin") {
            pinIndex = -1;
          } else {
            pinIndex = childNodes.indexOf(_selectedElement[0]);
          }
          hostWindowInstance.performRankActionsOnFullPage(
            event,
            { pinIndex: pinIndex },
            hostWindowInstance.vars.searchObject.searchText,
            "pinning"
          );
        }
      });
    $(".customization")
      .off("click", ".boosting")
      .on("click", ".boosting", function (event: any) {
        if (
          $(event.target).closest(".data-wrap").attr("visible") == "true" &&
          parseInt($(event.target).closest(".data-wrap").attr("pinindex")) == -1
        ) {
          var boostByValue = parseFloat(
            $(event.target).closest(".data-wrap").attr("boost")
          );
          boostByValue = boostByValue + 0.25;
          let messageText = "customizationOnResults";
          let option = null;
          let serverMessageObject = null;
          let clientMessageObject = {
            event: event,
            boost: boostByValue,
            searchText: hostWindowInstance.vars.searchObject.searchText,
            action: "boosting"
          }
          /**  Emitting the Data to Host Instance */
          hostWindowInstance.sendMessage(messageText, option, serverMessageObject, clientMessageObject)
          // hostWindowInstance.performRankActionsOnFullPage(
          //   event,
          //   { boost: boostByValue },
          //   hostWindowInstance.vars.searchObject.searchText,
          //   "boosting"
          // );
        }
      });
    $(".customization")
      .off("click", ".burying")
      .on("click", ".burying", function (event: any) {
        if (
          $(event.target).closest(".data-wrap").attr("visible") == "true" &&
          parseInt($(event.target).closest(".data-wrap").attr("pinindex")) == -1
        ) {
          var buryByValue = parseFloat(
            $(event.target).closest(".data-wrap").attr("boost")
          );
          if (buryByValue > 0.25) {
            buryByValue = buryByValue - 0.25;
            hostWindowInstance.performRankActionsOnFullPage(
              event,
              { boost: buryByValue },
              hostWindowInstance.vars.searchObject.searchText,
              "burying"
            );
          } else if (buryByValue != 0) {
            buryByValue = 0.25 - buryByValue;
            hostWindowInstance.performRankActionsOnFullPage(
              event,
              { boost: buryByValue },
              hostWindowInstance.vars.searchObject.searchText,
              "burying"
            );
          } else {
            buryByValue = 0;
            hostWindowInstance.performRankActionsOnFullPage(
              event,
              { boost: buryByValue },
              hostWindowInstance.vars.searchObject.searchText,
              "burying"
            );
          }
        }
      });

    $(".custom-add-result-container")
      .off("click", ".link-text")
      .on("click", ".link-text", function (event: any) {
        var structure = "bottom";
        if ($("body").hasClass("top-down")) {
          structure = "top";
          if (
            $("body").hasClass("top-down")
              ? $(".search-top-down").val()
              : $(".bottom-up-search").val()
          ) {
            hostWindowInstance.vars.searchObject.searchText = $("body").hasClass("top-down")
              ? $(".search-top-down").val()
              : $(".bottom-up-search").val();
          }
        } else {
          structure = "bottom";
        }
        if (hostWindowInstance.vars.searchObject && hostWindowInstance.vars.searchObject.searchText) {
          var responseObject = {
            type: "addNew",
            data: true,
            query: hostWindowInstance.vars.searchObject.searchText,
            structure: structure,
          };
          hostWindowInstance.parentEvent(responseObject);
        }
      });
    //Tour RR
    $(".sdk-tours-info-nxt")
      .off("click")
      .on("click", function (e: any) {
        $(".sdk-tours-info-start").hide();
        $(".sdk-tours-info-end").removeClass("hide");
        $(".sdk-tours-info-end").show();
      });
    $(".sdk-tours-info-pre")
      .off("click")
      .on("click", function (e: any) {
        $(".sdk-tours-info-start").show();
        //$("sdk-tours-info-end").removeClass("hide");
        $(".sdk-tours-info-end").hide();
      });

    $(".sdk-tours-info-close")
      .off("click")
      .on("click", function (e: any) {
        $(".tours-information").hide();
        hostWindowInstance.vars.customTourResultRank = false;
      });
    //Tour RR 
    //}
    //me.hostWindowInstance.sendMessage() //bindAllResultRankingOperations
    $(".full-search-data-container")
      .off("click", ".show-more-list")
      .on("click", ".show-more-list", function (e: any) {
        const showMoreData = {
          groupName: $(e.currentTarget).attr("groupName"),
          templateName: $(e.currentTarget).attr("templateName"),
          pageNumber: Number($(e.currentTarget).attr("pageNumber")) + 1,
          fieldName: $(e.currentTarget).attr("fieldName"),
        };
        hostWindowInstance.showMoreClick(showMoreData).then((result: any) => {
          console.log("list result", result);
        })
      });
  }
  getTemplateString(type: any) {
    var listTemplatel1 = '<script type="text/x-jqury-tmpl">\
        {{if structuredData.length}}\
            <div class="title-text-heading {{if renderTitle}}display-block{{else}}display-none{{/if}}">${titleName}</div>\
            <div class="template-1-{{if listType=="classic"}}classic{{else}}plain{{/if}}-list{{if renderTitle}}-result-group{{/if}} mb-15 {{if textAlignment=="center"}}text-center{{/if}}">\
                    {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
                        {{if isClickable == true}}\
                            <div class="{{if listType=="classic"}}classic{{else}}plain{{/if}}-list{{if renderTitle}}-result{{/if}}-item {{if textAlignment=="center"}}text-center{{/if}} click-to-navigate-url faqs-shadow isClickable" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                        {{/if}}\
                        {{if isClickable == false}}\
                            <div class="{{if listType=="classic"}}classic{{else}}plain{{/if}}-list{{if renderTitle}}-result{{/if}}-item {{if textAlignment=="center"}}text-center{{/if}} click-to-navigate-url faqs-shadow" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                        {{/if}}\
                    {{/each}}\
                <div class="show-more-list {{if doc_count==0 || doc_count<6 || isLiveSearch || isSearch}}display-none{{/if}}" groupName="${groupName}" templateName="${templateName}" pageNumber="${pageNumber}" fieldName="${fieldName}">\
                    <div class="searchassist-show-more-button">Show more <img src="{{if devMode}}assets/web-kore-sdk/demo/{{/if}}images/show_more.png" height="6" width="10" /></div>\
                </div>\
            </div>\
        {{/if}}\
    </script>'

    var listTemplatel2 = '<script type="text/x-jqury-tmpl">\
        {{if structuredData.length}}\
            <div class="title-text-heading {{if renderTitle}}display-block{{else}}display-none{{/if}}">${titleName}</div>\
            <div class="template-2-{{if listType=="classic"}}classic{{else}}plain{{/if}}-list{{if isClickable}}-collapse{{/if}}{{if renderTitle}}-result{{/if}} mb-15">\
                {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
                    {{if isClickable == true}}\
                        <div class="{{if listType=="classic"}}classic{{else}}plain{{/if}}-list-item{{if renderTitle}}-result{{/if}} click-to-navigate-url faqs-shadow isClickable" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">\
                            <span>{{html helpers.convertMDtoHTML(data.description)}}</span>\
                        </div>\
                    {{/if}}\
                    {{if isClickable == false}}\
                        <div class="template-2-{{if listType=="classic"}}classic{{else}}plain{{/if}}-list-collapse mb-15 click-to-navigate-url faqs-shadow" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">\
                            <div class="collapse-item-list accordion" id="1">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                        </div>\
                    {{/if}}\
                {{/each}}\
                <div class="show-more-list {{if doc_count==0 || doc_count<6 || isLiveSearch || isSearch}}display-none{{/if}}" groupName="${groupName}" templateName="${templateName}" pageNumber="${pageNumber}" fieldName="${fieldName}">\
                    <div class="searchassist-show-more-button">Show more <img src="{{if devMode}}assets/web-kore-sdk/demo/{{/if}}images/show_more.png" height="6" width="10" /></div>\
                </div>\
            </div>\
        {{/if}}\
    </script>'

    var listTemplatel3 = '<script type="text/x-jqury-tmpl">\
    {{if structuredData.length}}\
        <div class="title-text-heading {{if renderTitle}}display-block{{else}}display-none{{/if}}">${titleName}</div>\
        <div class="template-3-{{{if listType=="classic"}}classic{{else}}plain{{/if}}-list{{if renderTitle}}-result{{/if}} mb-15">\
            {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
                {{if isClickable == true}}\
                    <div class="{{if listType=="classic"}}classic{{else}}plain{{/if}}-list-item{{if renderTitle}}-result{{/if}} click-to-navigate-url faqs-shadow isClickable" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">\
                        <div class="heading-text" title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                        <div class="text-desc two-line-description" title="${data.description}">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                    </div>\
                {{/if}}\
                {{if isClickable == false}}\
                    <div class="template-3-{{if listType=="classic"}}classic{{else}}plain{{/if}}-list-collapse mb-15 click-to-navigate-url faqs-shadow" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">\
                        <div class="collapse-item-list accordion" id="1">\
                            <div class="text-truncate one-line-height" title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div><span class="click-here">Click</span><div class="text-desc-">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                        </div>\
                    </div>\
                {{/if}}\
            {{/each}}\
            <div class="show-more-list {{if doc_count==0 || doc_count<6 || isLiveSearch || isSearch}}display-none{{/if}}" groupName="${groupName}" templateName="${templateName}" pageNumber="${pageNumber}" fieldName="${fieldName}">\
                <div class="searchassist-show-more-button">Show more <img src="{{if devMode}}assets/web-kore-sdk/demo/{{/if}}images/show_more.png" height="6" width="10" /></div>\
            </div>\
        </div>\
    {{/if}}\
    </script>'

    var listTemplatel4 = '<script type="text/x-jqury-tmpl">\
    {{if structuredData.length}}\
        <div class="title-text-heading {{if renderTitle}}display-block{{else}}display-none{{/if}}">${titleName}</div>\
        <div class="template-4-{{if listType=="classic"}}classic{{else}}plain{{/if}}-list{{if isClickable==false}}-collapse{{/if}} {{if isClickable==false}}template-4-{{if listType=="classic"}}classic{{else}}plain{{/if}}-list-collapse-result{{/if}} mb-15">\
            {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
                {{if isClickable == true}}\
                    <div class="{{if listType=="classic"}}classic{{else}}plain{{/if}}-list-item click-to-navigate-url faqs-shadow isClickable" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">\
                        <div class="img-block">\
                            <img src="${data.img}">\
                        </div>\
                        <div class="content_sec">\
                            <div class="heading text-truncate one-line-height" title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                            <div class="text_desc single-line-description" title="${data.description}">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                        </div>\
                    </div>\
                {{/if}}\
                {{if isClickable == false}}\
                        <div class="collapse-item-list-parent click-to-navigate-url faqs-shadow" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">\
                            <div class="collapse-item-list accordion" id="1">\
                                <div class="text-truncate one-line-height" title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div><div class="text-description defalut-show text-truncate one-line-height">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                            </div>\
                            <div class="panel">\
                                <div class="content_sec">\
                                    <div class="img-block">\
                                        <img src="${data.img}">\
                                    </div>\
                                    <div class="text-desc four-line-description">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                                </div>\
                            </div>\
                        </div>\
                {{/if}}\
            {{/each}}\
                    <div class="show-more-list {{if doc_count==0 || doc_count<6 || isLiveSearch || isSearch}}display-none{{/if}}" groupName="${groupName}" templateName="${templateName}" pageNumber="${pageNumber}" fieldName="${fieldName}">\
                        <div class="searchassist-show-more-button">Show more <img src="{{if devMode}}assets/web-kore-sdk/demo/{{/if}}images/show_more.png" height="6" width="10" /></div>\
                    </div>\
        <div>\
    {{/if}}\
    </script>';

    var listTemplate = '<script type="text/x-jqury-tmpl">\
    {{if structuredData.length}}\
        <div class="title-text-heading {{if renderTitle}}display-block{{else}}display-none{{/if}}">${titleName}</div>\
        <div class="template-4-{{if listType=="classic"}}classic{{else}}plain{{/if}}-list{{if isClickable==false}}-collapse{{/if}} {{if isClickable==false}}template-4-{{if listType=="classic"}}classic{{else}}plain{{/if}}-list-collapse-result{{/if}} mb-15">\
            {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
                {{if isClickable == true}}\
                    {{if template_type="listTemplatel1"}}\
                        <div class="{{if listType=="classic"}}classic{{else}}plain{{/if}}-list{{if renderTitle}}-result{{/if}}-item {{if textAlignment=="center"}}text-center{{/if}} click-to-navigate-url faqs-shadow isClickable" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                    {{/if}}\
                    {{if template_type="listTemplatel2"}}\
                        <div class="{{if listType=="classic"}}classic{{else}}plain{{/if}}-list-item{{if renderTitle}}-result{{/if}} click-to-navigate-url faqs-shadow isClickable" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">\
                            <span>{{html helpers.convertMDtoHTML(data.description)}}</span>\
                        </div>\
                    {{/if}}\
                    {{if template_type="listTemplatel3"}}\
                        <div class="{{if listType=="classic"}}classic{{else}}plain{{/if}}-list-item{{if renderTitle}}-result{{/if}} click-to-navigate-url faqs-shadow isClickable" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">\
                            <div class="heading-text " title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                            <div class="text-desc two-line-description" title="${data.description}">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                        </div>\
                    {{/if}}\
                    {{if template_type="listTemplatel4"}}\
                        <div class="{{if listType=="classic"}}classic{{else}}plain{{/if}}-list-item click-to-navigate-url faqs-shadow isClickable" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">\
                            <div class="img-block">\
                                <img src="${data.img}">\
                            </div>\
                            <div class="content_sec">\
                                <div class="heading text-truncate one-line-height" title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                                <div class="text_desc single-line-description" title="${data.description}">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                            </div>\
                        </div>\
                    {{/if}}\
                {{/if}}\
                {{if isClickable == false}}\
                    {{if template_type="listTemplatel1"}}\
                    <div class="{{if listType=="classic"}}classic{{else}}plain{{/if}}-list{{if renderTitle}}-result{{/if}}-item {{if textAlignment=="center"}}text-center{{/if}} click-to-navigate-url faqs-shadow" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                    {{/if}}\
                    {{if template_type="listTemplatel2"}}\
                        <div class="template-2-{{if listType=="classic"}}classic{{else}}plain{{/if}}-list-collapse mb-15 click-to-navigate-url faqs-shadow" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">\
                            <div class="collapse-item-list accordion" id="1">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                        </div>\
                    {{/if}}\
                    {{if template_type="listTemplatel3"}}\
                        <div class="{{if template_type=="listTemplatel3"}}template-3-{{/if}}{{if listType=="classic"}}classic{{else}}plain{{/if}}-list-collapse mb-15 click-to-navigate-url faqs-shadow" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">\
                            <div class="collapse-item-list accordion" id="1">\
                                <div class="text-truncate one-line-height" title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div><div class="text-desc-">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                            </div>\
                        </div>\
                    {{/if}}\
                    {{if template_type="listTemplatel4"}}\
                            <div class="collapse-item-list-parent click-to-navigate-url faqs-shadow" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">\
                                <div class="collapse-item-list accordion" id="1">\
                                    <div class="text-truncate one-line-height" title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div><div class="text-description defalut-show text-truncate one-line-height">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                                </div>\
                                <div class="panel">\
                                    <div class="content_sec">\
                                        <div class="img-block">\
                                            <img src="${data.img}">\
                                        </div>\
                                        <div class="text-desc four-line-description">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                                    </div>\
                                </div>\
                            </div>\
                    {{/if}}\
                {{/if}}\
            {{/each}}\
                    <div class="show-more-list {{if doc_count==0 || doc_count<6 || isLiveSearch || isSearch}}display-none{{/if}}" groupName="${groupName}" templateName="${templateName}" pageNumber="${pageNumber}" fieldName="${fieldName}">\
                        <div class="searchassist-show-more-button">Show more <img src="{{if devMode}}assets/web-kore-sdk/demo/{{/if}}images/show_more.png" height="6" width="10" /></div>\
                    </div>\
        <div>\
    {{/if}}\
    </script>';
    var searchListTemplates = '<script type="text/x-jqury-tmpl">\
    {{if structuredData.length}}\
        <div class="title-text-heading {{if renderTitle}}display-block{{else}}display-none{{/if}}">${titleName}</div>\
        <div class="template-4-{{if listType=="classic"}}classic{{else}}plain{{/if}}-list{{if isClickable==false}}-collapse{{/if}} {{if isClickable==false}}template-4-{{if listType=="classic"}}classic{{else}}plain{{/if}}-list-collapse-result{{/if}} mb-15">\
            {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
                {{if isClickable == true}}\
                        <div class="{{if listType=="classic"}}classic{{else}}plain{{/if}}-list-item click-to-navigate-url faqs-shadow isClickable {{if (!data.description || !data.description.length) && textAlignment=="center"}}text-center{{/if}}" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">\
                        {{if data.img && data.img.length}}\
                        <div class="img-block">\
                                <img src="${data.img}">\
                            </div>\
                            {{/if}}\
                            <div class="content_sec {{if (!data.description || !data.description.length) && textAlignment=="center"}}text-center{{/if}}">\
                            {{if data.heading && data.heading.length}}\
                                <div class="heading text-truncate one-line-height" title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                            {{/if}}\
                            {{if data.description && data.description.length}}\
                                <div class="text_desc single-line-description" title="${data.description}">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                                {{/if}}\
                            </div>\
                        </div>\
                {{/if}}\
                {{if isClickable == false}}\
                            <div class="collapse-item-list-parent click-to-navigate-url faqs-shadow" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">\
                                <div class="collapse-item-list accordion {{if (!data.description || !data.description.length) && textAlignment=="center"}}text-center{{/if}}" id="1">\
                                {{if data.heading && data.heading.length}}\
                                    <div class="text-truncate one-line-height" title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                                    {{if data.description && data.description.length}}\
                                       <div class="text-description defalut-show text-truncate one-line-height">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                                    {{/if}}\
                                    {{else}}\
                                    {{html helpers.convertMDtoHTML(data.description)}}\
                                    {{/if}}\
                                </div>\
                                <div class="panel">\
                                    <div class="content_sec {{if (!data.description || !data.description.length) && textAlignment=="center"}}text-center{{/if}}">\
                                    {{if data.img && data.img.length}}\
                                        <div class="img-block">\
                                            <img src="${data.img}">\
                                        </div>\
                                        {{/if}}\
                                        {{if data.description && data.description.length}}\
                                        <div class="{{if !data.img || !data.img.length}}pl-0 {{/if}}text-desc four-line-description">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                                        {{/if}}\
                                    </div>\
                                </div>\
                            </div>\
                            {{/if}}\
            {{/each}}\
        <div>\
        {{if groupName.length}}\
        <div class="show-more-list {{if doc_count==0 || doc_count<6 || isLiveSearch || isSearch}}display-none{{/if}}" groupName="${groupName}" templateName="${templateName}" pageNumber="${pageNumber}" fieldName="${fieldName}">\
               <div>Show more <img src="{{if devMode}}assets/web-kore-sdk/demo/{{/if}}images/show_more.png" height="6" width="10" /></div>\
            </div>\
        {{/if}}\
    {{/if}}\
    </script>';
    var customizeList = '<script type="text/x-jqury-tmpl">\
    {{if structuredData.length}}\
    <div class="title-text-heading {{if renderTitle}}display-block{{else}}display-none{{/if}}">${titleName}</div>\
    <div class="tpt-1-tle-wt-txt {{if devMode== false || viewType != "Customize"}}display-none{{/if}}">\
      <div class="total-structured-data-wrap {{if viewType=="Customize"&&devMode==true}}{{if isFullResults == true}}customization{{/if}}{{/if}} {{if maxSearchResultsAllowed ==0}}display-none{{/if}}">\
        {{if tour && isFullResults == true && viewType=="Customize"&&devMode==true}}\
          <div class="tours-information sdk-tours-info-start">\
            <div class="tourtitle">Customize</div>\
            <div class="tour-info">Start Customizing your search results by hovering on the matched content and performing below actions:</div>\
            <div class="tour-action-info"><b>HIDE</b> - Hide the search result</div>\
            <div class="tour-action-info"><b>PIN</b> - Pin results in a specific position</div>\
            <div class="tour-action-info"><b>BOOST</b> - Boost the relevance score</div>\
            <div class="tour-action-info"><b>LOWER</b> - Lower the relevance score</div>\
            <div class="footer-tour">\
              <div class="tour-length">1 of 2</div>\
              <div class="tour-btns">\
                  <button class="next-btn sdk-tours-info-nxt">Next</button>\
                  <button class="close-btn sdk-tours-info-close">Close</button>\
              </div>\
            </div>\
          </div>\
          <div class="tours-information tour-customization-info sdk-tours-info-end hide">\
            <div class="tourtitle">Customize</div>\
            <div class="tour-info mb-2 pb-1">You can order the results by clicking on this icon and dragging up and down.</div>\
            <div class="footer-tour">\
              <div class="tour-length">2 of 2</div>\
              <div class="tour-btns">\
                  <button class="next-btn sdk-tours-info-close">Got it</button>\
                  <button class="close-btn sdk-tours-info-pre">Previous</button>\
              </div>\
            </div>\
          </div>\
          {{/if}}\
          {{if isFullResults == true || isSearch == true || isLiveSearch == true}}\
            <ul class="tile-with-text-parent tasks-wrp structured-data-outer-wrap {{if isDropdownEnabled == true && isFullResults == false}}panel p-0{{/if}} {{if isClickable == false}}with-accordion{{/if}} {{if isFullResults == true}}results-wrap{{/if}}" style="{{if isDropdownEnabled == true && isFullResults == false}}max-height: 100% !important; overflow : initial !important;{{/if}}">\
              {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
                <li class="task-wrp faqs-shadow structure-data-wrp {{if viewType=="Customize" && isFullResults == true}}{{if data.config.visible == false || (data.config.visible == true && !data.addedResult && (data.config.pinIndex < 0))}}ui-state-disabled{{/if}}{{/if}} {{if viewType != "Customize" && config.visible == false}}display-none{{/if}}" boost="${data.config.boost}" pinIndex="${data.config.pinIndex}" visible="${data.config.visible}" contentId="${data.contentId}" contentType="${data.sys_content_type}" manuallyAdded="${data.addedResult}" id="${key}">\
                    {{if isClickable == true}}\
                      {{if viewType!="Customize" && (isFullResults == true ||  isSearch == true || isLiveSearch == true)}}\
                        <div class="click-to-navigate-url tile-with-text structured-data-wrp-content" href="${data.url}" target="_blank">\
                          <div class="tile-heading text-truncate one-line-height"  title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                          <div class="tile-description text-truncate one-line-height">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                        </div>\
                      {{/if}}\
                      {{if viewType=="Customize" && (isFullResults != true &&  (isSearch == true || isLiveSearch == true))}}\
                        <div class="click-to-navigate-url tile-with-text structured-data-wrp-content"  href="${data.url}" target="_blank">\
                          <div class="tile-heading text-truncate one-line-height"  title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                          <div class="tile-description text-truncate one-line-height">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                        </div>\
                      {{/if}}\
                      {{if viewType=="Customize" && isFullResults == true}}\
                        <div class="data-wrap" index="${i}" contentType="${data.sys_content_type}" contentId="${data.contentId}" score="${data.score}" boost="${data.config.boost}" pinIndex="${data.config.pinIndex}" visible="${data.config.visible}">\
                          <div class="customization-tile{{if data.config.visible == false}} disable_hidden{{/if}}{{if data.config.pinIndex >= 0}} disable_pinned{{/if}}">\
                              <div class="drag-content {{if data.config.visible == false || (data.config.visible == true && !data.addedResult && (data.config.pinIndex < 0))}}display-none{{/if}}"></div>\
                              {{if !data.addedResult || data.addedResult == false}}\
                                <div class="actions-content">\
                                  <span class="action-item visibility" type="{{if data.config.visible == true}}Hide{{/if}}{{if data.config.visible == false}}UnHide{{/if}}">\
                                    <span class="tooltiptext">\
                                      <span class="_hide {{if data.config.visible == true}}display-block{{else}}display-none{{/if}}">\
                                          Hide\
                                      </span>\
                                      <span class="unhide {{if data.config.visible == false}}display-block{{else}}display-none{{/if}}">\
                                          UnHide\
                                      </span>\
                                    </span>\
                                    <span class="img_hide {{if data.config.visible == true}}display-block{{else}}display-none{{/if}}">\
                                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEgSURBVHgB3VLRTcNADLUv4VREI90IYQPYACagnaDwh1ALHaGZAFQkxF9H6AjABGSEbEBQQaDcnc25JSgqCPWvVS1Z8vme37MtA6zbcDnR7tsjiNQJMnTCM12AMGfm3Noq+7zfLZp49YtSqWtgerVVdTwbRyjunTsD4KdY66kZsoHNM5l776I6WBUfxkiTvpMdLXYQlmSiOJ6sSuCZHkKR+SEgooIhsA7o3yXJX3LlJ8BgyFM+F5ekJ3om57sYYwdB9YA5E8D7nZ6DWucfqdatHgMNiX0GHh5VHE0jpQ6xZi5vsJRYFJg4BUSD33fAAEUgLQN5ObtV3WYNLrcYunkJN7AvB9O+tCPJv413RnWnolqL/WnSbh0nA3cq3hSA7bMvciOL7FwWG34AAAAASUVORK5CYII=">\
                                    </span>\
                                    <span class="img_unhide {{if data.config.visible == false}}display-block{{else}}display-none{{/if}}">\
                                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGDSURBVHgB1VLLUQJBEO2e2bW0SixDWCNQM8AIwAjg6EH5RCBEwM+DNzUDiECMAMxgQ6AUS4WZeXavLoUl5Vmnqg/T816/191D9O8Pb0ruN7DvnS8GDkkGAk+jKJrOujz7tYASQ6A6KDRAlDJoqnkQEmYuMpmWMdRbL2TWyIlHmAT44nKxOJ737bG1pqkxH0Qn1pgDkD/wIUy2z16Tbw4yy0IGwt28H7c0t1dHR+5VfWY23aceNzW/W1u2DNmSMXyiTjIHAXRJgac5uXDhqkIuq6oGAcXCuSvrm2IAmmUcbUHVBdwAfC+3BUYicxipgkQayD/A4Ch/D941laNcoyABt42xHU18ImgsA6uoqoa0UILDMG/XxtGNcpS72kKh5m6FdLhYvJ++Xe+kWRvMdbGvAqOXwVY32xJwL+qPz/2o+mONMqCuFCkJqW2tHebrUuLSL6visi7kkcyhsfEfrAZIVNG9yzX9SicAxlp4fhWP1/Ebf2Ku6pw7QsAs3orTTb/wb5wP48rkd2sW1IgAAAAASUVORK5CYII=">\
                                    </span>\
                                  </span>\
                                  <span class="action-item pinning" type="{{if data.config.pinIndex >= 0}}UnPin{{/if}}{{if data.config.pinIndex < 0}}Pin{{/if}}">\
                                    <span class="tooltiptext">\
                                      <span class="unpin {{if data.config.pinIndex >= 0}}display-block{{else}}display-none{{/if}}">\
                                        UnPin\
                                      </span>\
                                      <span class="pin {{if data.config.pinIndex < 0}}display-block{{else}}display-none{{/if}}">\
                                        Pin\
                                      </span>\
                                    </span>\
                                    <span class="img_unpin {{if data.config.pinIndex >= 0}}display-block{{else}}display-none{{/if}}">\
                                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGFSURBVHgBxVK/S8NAFH53SaugKQHpntp/oBlcBAdxcmsXKS5aJxX7Y3Jw0U6OFaluIl1EBUk3x4KTuLTgKNouQrGINyjV9HJnHxiN/YW6+EFI7uW9777vuwP4gJZ2DoeXmwb8EtT9UAjN+nxDfyL5hJ6RhpYUJS9Ju6ZrKafaj5h6F2yH1BSFJFDJ9b20pJQ4pLcfw+f3l3qR0M4CklxtEFg/E9G7BpQmw7BACKmAlNl+JF3AnW8fZHV215EXN0JmTmQU61qSL3baUeF7BrojRDmQFmCMgb43T2D7XEI+TnL8iEPhkmxiGyp5BQj1yoBJEAVsqjZErP7MzXyc1taOhTE3Qa2pMBRatm0qlJoDLYymWluu1NOyHUEbaAdtte3p3l61ZwZcFokKaZS6dCASoaBkxRXKZnKS1Z/ekIC5vV2nMLJqR6iqWII702iHUGrVHoGNB8FkTRIbeNlwGKXju9MOfAXdddn6Dnv/eddeEuIWAylRdjhPvOz7K/ADIAl4svg/vANVesefO32vSgAAAABJRU5ErkJggg==">\
                                    </span>\
                                    <span class="img_pin {{if data.config.pinIndex < 0}}display-block{{else}}display-none{{/if}}">\
                                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAD7SURBVHgBhZB/asJQDMeTZy0dW0eP0N1Aj9ATjJ1A9p8MVnYEvcFgMPxTT6A38Aj2BnqEgojSviYm/oAnvmLg8SD5fpNPgtASyQ8nDdGqrqrsMHnaXPMG2iORl3bDcBkN9+lDAxG8I2IBzGPXFPjEcc4DBhpR3WS7/7CIvy2oCYb7DF1eF4fsWfz8VfVM0JlfEMsTUvmLpXScaZKJPjvGvKlYGqWmK2LBkuX7ku+ji/KS1yMEM9DLRFFUNixTicfbv2DqXZotL3SK8lpre8AArvjGcGVVdsVDY+aee5yv5Ig/lF1SheCB4t05VBznzVp/X+3O8JrTyltoiSM5w31qLIEkiwAAAABJRU5ErkJggg==">\
                                    </span>\
                                  </span>\
                                  <span class="action-item boosting">\
                                    <span class="tooltiptext">Boost</span>\
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADCSURBVHgBfY/BCcJAEEVnNiKKrGgHKSElmA7swBxFJEkHYgfRg3jTTtKCHSQdKIIoMTtjNhgI65o5fh5//gMwbhxyJNfl3MyFAW0YKAaBJxnywgp+oeBdFD6VygegxIRrSIYqGyyfbpONVoVXZdcGxnbT6zjM2wUaFj0nrR7Hglh5Nkjf49C/1DOYZmCz1l/MHC3WgU6Rxfm+x22ntYPCZ6Tgp9lmPYnZlZHKGrjTWsOKKUWCnSAop/+sbwnmeoYCBR8N24MPhSbzYAAAAABJRU5ErkJggg==">\
                                  </span>\
                                  <span class="action-item burying {{if data.config.boost == 0}}disabled{{/if}} {{if data.score <= 0}}disabled{{/if}}">\
                                    <span class="tooltiptext">Lower</span>\
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADJSURBVHgBdZDRDYIwEIZbEFKDTRiBEVzBSfDRmBRxA11BX3xTJ3AE4ghOgE7ggyaalvbskZCUWP633n253neUC31USm6/h/GdeJKWkDXG5AFQ84jiuGKLT+aDNJiKEEPbwqRQG17o2oUR4itdYw/ftGtggZIgV1LOGGMEJwGY83sX9UEXxqoLeYNwImT51+DCXHwiXZKlnOJlrLW+DVkjFIxCaw3XQet2UqGfXDTzQeswCNN2EsD6tR+demDP2p7RhfzLW+PuOzc/5PRxOXt0QzUAAAAASUVORK5CYII=">\
                                  </span>\
                                </div>\
                              {{/if}}\
                              {{if data.addedResult && data.addedResult == true}}\
                                <div class="actions-content manually_added_pin">\
                                  <span class="action-item unpin_added_result">\
                                    <span class="tooltiptext">Unpinning will remove the result</span>\
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGFSURBVHgBxVK/S8NAFH53SaugKQHpntp/oBlcBAdxcmsXKS5aJxX7Y3Jw0U6OFaluIl1EBUk3x4KTuLTgKNouQrGINyjV9HJnHxiN/YW6+EFI7uW9777vuwP4gJZ2DoeXmwb8EtT9UAjN+nxDfyL5hJ6RhpYUJS9Ju6ZrKafaj5h6F2yH1BSFJFDJ9b20pJQ4pLcfw+f3l3qR0M4CklxtEFg/E9G7BpQmw7BACKmAlNl+JF3AnW8fZHV215EXN0JmTmQU61qSL3baUeF7BrojRDmQFmCMgb43T2D7XEI+TnL8iEPhkmxiGyp5BQj1yoBJEAVsqjZErP7MzXyc1taOhTE3Qa2pMBRatm0qlJoDLYymWluu1NOyHUEbaAdtte3p3l61ZwZcFokKaZS6dCASoaBkxRXKZnKS1Z/ekIC5vV2nMLJqR6iqWII702iHUGrVHoGNB8FkTRIbeNlwGKXju9MOfAXdddn6Dnv/eddeEuIWAylRdjhPvOz7K/ADIAl4svg/vANVesefO32vSgAAAABJRU5ErkJggg==">\
                                  </span>\
                                </div>\
                              {{/if}}\
                              <div class="title text-truncate one-line-height">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                              <div class="desc_text text-truncate one-line-height">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                              <div class="appearences-count count">\
                                <span class="tooltip-appearnces">\
                                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADqSURBVHgBTU/BTcNAEJzxnRDiAyVQAukASuALj+APPG0qcFIB+BVFPI4IIp4pAVMBLbgE54eSnIc9FKPs47Q7M7czS+xrFt4uPV0l6ALgGYFG0uI+v31NfJael8VH5ZiteukrajPaSqOdiUBWiUsazsLyzhkQxStgd24fxmljVKwB3zr231H9debJMaTpXrSCuJawdnSfCbO+tr7yKdMWeDyiezLr+iG/mSSreVi2hC97oHRQYRnZnGDTCujsgBb/pc5Rp8f46WxoOMDz8F6SWWHZ8jSbXUiRhquJgzK7CYnib584tRjPA/cLSnRp8KbGJuoAAAAASUVORK5CYII=">\
                                <span class="tooltip_text">Appearances</span>\
                                </span>\
                                <span class="count">${data.feedback?.appearances}</span>\
                              </div>\
                              <div class="appearences-count count">\
                              <span class="tooltip-appearnces-clicks">\
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAOCAYAAAD0f5bSAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEMSURBVHgBnZK/bcJQEMbvniFJmRGSDZINnA2SEijgioConA1iNkgqlKS4IASUwAaMABPgEWgBoeMOyQiZh0F8hU86v9/9+d5DyOivM/gUkRgR4/dqqQUeuWzCgI3go0U4IedLNqmUQI4cXKFC3s/f/74gwEQAwsMdcyHbLUCZ7yLIXIvsDHLmllW0mIXS3dKYGoQGrEWei4isVUaWrNfKmDeyU4+/DdAqbwq8wgVydap8iMBMZx8aqLnpWcg+DSrXtMv4APSPxvykIdnfU4MqcQoy872XwrtIz3SOFv7hntla1V1bG1hNmkRJm/mhgLeR3VdRli9el9rcDQMMIn2JoZa3rol1uIHVFxEttjVMjEnBcNKUAAAAAElFTkSuQmCC">\
                                <span class="tooltip_text">Clicks</span>\
                              </span>\
                              <span class="count">${data.feedback?.clicks}</span>\
                              </div>\
                              {{if !data.addedResult || data.addedResult == false}}\
                                <div class="appearences-count customize-chips bg-data record-status-pinned" style="display : {{if data.config.pinIndex >= 0}}block{{else}}none{{/if}}">\
                                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAD7SURBVHgBhZB/asJQDMeTZy0dW0eP0N1Aj9ATjJ1A9p8MVnYEvcFgMPxTT6A38Aj2BnqEgojSviYm/oAnvmLg8SD5fpNPgtASyQ8nDdGqrqrsMHnaXPMG2iORl3bDcBkN9+lDAxG8I2IBzGPXFPjEcc4DBhpR3WS7/7CIvy2oCYb7DF1eF4fsWfz8VfVM0JlfEMsTUvmLpXScaZKJPjvGvKlYGqWmK2LBkuX7ku+ji/KS1yMEM9DLRFFUNixTicfbv2DqXZotL3SK8lpre8AArvjGcGVVdsVDY+aee5yv5Ig/lF1SheCB4t05VBznzVp/X+3O8JrTyltoiSM5w31qLIEkiwAAAABJRU5ErkJggg==">\
                                  <span class="count">PINNED</span>\
                                </div>\
                                <div class="appearences-count customize-chips bg-data record-status-hidden" style="display : {{if data.config.visible == false}}block{{else}}none{{/if}}">\
                                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEgSURBVHgB3VLRTcNADLUv4VREI90IYQPYACagnaDwh1ALHaGZAFQkxF9H6AjABGSEbEBQQaDcnc25JSgqCPWvVS1Z8vme37MtA6zbcDnR7tsjiNQJMnTCM12AMGfm3Noq+7zfLZp49YtSqWtgerVVdTwbRyjunTsD4KdY66kZsoHNM5l776I6WBUfxkiTvpMdLXYQlmSiOJ6sSuCZHkKR+SEgooIhsA7o3yXJX3LlJ8BgyFM+F5ekJ3om57sYYwdB9YA5E8D7nZ6DWucfqdatHgMNiX0GHh5VHE0jpQ6xZi5vsJRYFJg4BUSD33fAAEUgLQN5ObtV3WYNLrcYunkJN7AvB9O+tCPJv413RnWnolqL/WnSbh0nA3cq3hSA7bMvciOL7FwWG34AAAAASUVORK5CYII=">\
                                  <span class="count">HIDDEN</span>\
                                </div>\
                                <div class="appearences-count customize-chips bg-data record-status-boosted {{if data.config.boost > 1}}display-block{{/if}}">\
                                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADCSURBVHgBfY/BCcJAEEVnNiKKrGgHKSElmA7swBxFJEkHYgfRg3jTTtKCHSQdKIIoMTtjNhgI65o5fh5//gMwbhxyJNfl3MyFAW0YKAaBJxnywgp+oeBdFD6VygegxIRrSIYqGyyfbpONVoVXZdcGxnbT6zjM2wUaFj0nrR7Hglh5Nkjf49C/1DOYZmCz1l/MHC3WgU6Rxfm+x22ntYPCZ6Tgp9lmPYnZlZHKGrjTWsOKKUWCnSAop/+sbwnmeoYCBR8N24MPhSbzYAAAAABJRU5ErkJggg==">\
                                  <span class="count boosted">${data.config.boost}X BOOSTED</span>\
                                </div>\
                                <div class="appearences-count customize-chips bg-data record-status-lowered {{if data.config.boost < 1}}display-block{{/if}}">\
                                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADJSURBVHgBdZDRDYIwEIZbEFKDTRiBEVzBSfDRmBRxA11BX3xTJ3AE4ghOgE7ggyaalvbskZCUWP633n253neUC31USm6/h/GdeJKWkDXG5AFQ84jiuGKLT+aDNJiKEEPbwqRQG17o2oUR4itdYw/ftGtggZIgV1LOGGMEJwGY83sX9UEXxqoLeYNwImT51+DCXHwiXZKlnOJlrLW+DVkjFIxCaw3XQet2UqGfXDTzQeswCNN2EsD6tR+demDP2p7RhfzLW+PuOzc/5PRxOXt0QzUAAAAASUVORK5CYII=">\
                                  <span class="count lowered">${data.config.boost}X LOWERED</span>\
                                </div>\
                              {{/if}}\
                              {{if data.addedResult && data.addedResult == true}}\
                                <div class="appearences-count bg-data">\
                                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAD5SURBVHgBhZAxTgMxEEX/rBeJcnuE2NwgdAhSTBR6lBOsuAl03AI4QaCjIlOt6JIbkCMkXaSs15mJtJKjeBVL1kie9+3nIfQsZi52cAsPP/4TWXXnWV9gCxQElA5ufsdcng3kcE9algHhNQ65FPzAk4oQ3lq001rmP9flYJMhe78qb74p9u0CChcKj2uR5T3zkOBmChYBWB+URGRNoE86ePvnHO3AYNMw2LQa+NsL3RSrjPjxRZuVTeZSb7NXDa7l9yP56RbNl+nYJxvkQ2vG8FGgczV30wPCDMnpRXCAn5q7jVP1tITqJGGwjvHfaqp3EhjxZJFs9Kw9ezRmCkd+ZkUAAAAASUVORK5CYII=">\
                                  <span class="count">PINNED</span>\
                                </div>\
                                <div class="appearences-count bg-data">\
                                  <span class="count">MANUALLY ADDED</span>\
                                </div>\
                              {{/if}}\
                              {{if data.sys_content_type === "faq"}}\
                                <div class="tag-ref">FAQ Response</div>\
                              {{/if}}\
                              {{if data.sys_content_type === "web"}}\
                                <div class="tag-ref">WEB Response</div>\
                              {{/if}}\
                              {{if data.sys_content_type === "file"}}\
                                <div class="tag-ref">FILE Response</div>\
                              {{/if}}\
                              {{if data.sys_content_type === "data"}}\
                                <div class="tag-ref">DATA Response</div>\
                              {{/if}}\
                          </div>\
                        </div>\
                      {{/if}}\
                    {{/if}}\
                    {{if isClickable == false}}\
                      <div class="tile-with-text faqs-wrp-content structured-data-wrp-content">\
                      <div class="tile-heading accordion p-0  {{if data.bestMatch && data.bestMatch == true}} acc-active best-match{{/if}}\" id="1">\
                         <div title="${data.heading}" class="text-truncate one-line-height" >{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                            <div class="tile-description defalut-show text-truncate one-line-height">{{html helpers.convertMDtoHTML(data.description, null,null,true)}}</div>\
                        </div>\
                        <div class="panel">\
                            <div class="tile-description">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                            <div class="divfeedback d-none">\
                              <span class="yesLike"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUzLjIgKDcyNjQzKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT50aHVtYnMtdXAtZ3JheTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJ0aHVtYnMtdXAtZ3JheSIgZmlsbD0iIzRENTc1QyIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPHBhdGggZD0iTTEuMTY0LDEzLjMzMyBDMC44ODksMTMuMzMzIDAuNjY3LDEzLjExNSAwLjY2NywxMi44NDYgTDAuNjY3LDcgQzAuNjY3LDYuNzMgMC44ODksNi41MTMgMS4xNjQsNi41MTMgTDMuNDk4LDYuNTEzIEw1LjAyNiwxLjAyNiBDNS4wODYsMC44MTQgNS4yODIsMC42NjYgNS41MDYsMC42NjYgQzYuNjgsMC42NjYgNy42MzIsMS41OTkgNy42MzIsMi43NDggTDcuNjMyLDUuNDUgTDExLjIwNyw1LjQ1IEMxMi41MSw1LjQ1IDEzLjUwNyw2LjU4NyAxMy4zMDgsNy44NDggTDEyLjcyNCwxMS41NjggQzEyLjU2NCwxMi41ODQgMTEuNjcyLDEzLjMzMyAxMC42MjMsMTMuMzMzIEwxLjE2NCwxMy4zMzMgWiBNMy4zOCwxMi4zNTkgTDMuMzgsNy40ODcgTDEuNjYyLDcuNDg3IEwxLjY2MiwxMi4zNTkgTDMuMzgsMTIuMzU5IEwzLjM4LDEyLjM1OSBaIE01Ljg3LDEuNjk5IEw0LjM3Niw3LjA2NiBMNC4zNzYsMTIuMzYgTDEwLjYyMywxMi4zNiBDMTEuMTgxLDEyLjM2IDExLjY1NSwxMS45NjEgMTEuNzQsMTEuNDIxIEwxMi4zMjUsNy43MDEgQzEyLjQzLDcuMDMgMTEuOSw2LjQyNSAxMS4yMDcsNi40MjUgTDcuMTM1LDYuNDI1IEM2Ljg2LDYuNDI1IDYuNjM3LDYuMjA3IDYuNjM3LDUuOTM4IEw2LjYzNywyLjc0OCBDNi42MzcsMi4yNjEgNi4zMTcsMS44NDggNS44NywxLjcgTDUuODcsMS42OTkgWiIgaWQ9IlNoYXBlIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=" class="thumbs-up"></span>\
                              <span class="noDislike"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUzLjIgKDcyNjQzKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT50aHVtYnMtZG93bi1ncmF5PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9InRodW1icy1kb3duLWdyYXkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDcuMDAwMDAwLCA3LjAwMDAwMCkgc2NhbGUoLTEsIC0xKSB0cmFuc2xhdGUoLTcuMDAwMDAwLCAtNy4wMDAwMDApICIgZmlsbD0iIzRENTc1QyIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPHBhdGggZD0iTTEuMTY0LDEzLjMzMyBDMC44ODksMTMuMzMzIDAuNjY3LDEzLjExNSAwLjY2NywxMi44NDYgTDAuNjY3LDcgQzAuNjY3LDYuNzMgMC44ODksNi41MTMgMS4xNjQsNi41MTMgTDMuNDk4LDYuNTEzIEw1LjAyNiwxLjAyNiBDNS4wODYsMC44MTQgNS4yODIsMC42NjYgNS41MDYsMC42NjYgQzYuNjgsMC42NjYgNy42MzIsMS41OTkgNy42MzIsMi43NDggTDcuNjMyLDUuNDUgTDExLjIwNyw1LjQ1IEMxMi41MSw1LjQ1IDEzLjUwNyw2LjU4NyAxMy4zMDgsNy44NDggTDEyLjcyNCwxMS41NjggQzEyLjU2NCwxMi41ODQgMTEuNjcyLDEzLjMzMyAxMC42MjMsMTMuMzMzIEwxLjE2NCwxMy4zMzMgWiBNMy4zOCwxMi4zNTkgTDMuMzgsNy40ODcgTDEuNjYyLDcuNDg3IEwxLjY2MiwxMi4zNTkgTDMuMzgsMTIuMzU5IEwzLjM4LDEyLjM1OSBaIE01Ljg3LDEuNjk5IEw0LjM3Niw3LjA2NiBMNC4zNzYsMTIuMzYgTDEwLjYyMywxMi4zNiBDMTEuMTgxLDEyLjM2IDExLjY1NSwxMS45NjEgMTEuNzQsMTEuNDIxIEwxMi4zMjUsNy43MDEgQzEyLjQzLDcuMDMgMTEuOSw2LjQyNSAxMS4yMDcsNi40MjUgTDcuMTM1LDYuNDI1IEM2Ljg2LDYuNDI1IDYuNjM3LDYuMjA3IDYuNjM3LDUuOTM4IEw2LjYzNywyLjc0OCBDNi42MzcsMi4yNjEgNi4zMTcsMS44NDggNS44NywxLjcgTDUuODcsMS42OTkgWiIgaWQ9IlNoYXBlIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=" class="thumbs-down"></span>\
                            </div>\
                        </div>\
                      </div>\
                    {{/if}}\
                </li>\
              {{/each}}\
              <div class="show-more-list {{if doc_count==0 || doc_count<6 || isLiveSearch || isSearch}}display-none{{/if}}" groupName="${groupName}" templateName="${templateName}" pageNumber="${pageNumber}" fieldName="${fieldName}">\
                  // <div>Show more <img src="{{if devMode}}assets/web-kore-sdk/demo/{{/if}}images/show_more.png" height="6" width="10" /></div>\
            </div>\
            </ul>\
            <!-- <div class="moreStructredData custom-show-more-container {{if isFullResults == true}} {{if selectedFacet != appearanceType}} display-block{{/if}}{{/if}}">Show All</div> -->\
          {{/if}}\
      </div>\
    </div>\
    {{/if}}\
  </script>';

    if (type === 'searchListTemplate') {
      return searchListTemplates;
    }

  }

}

export default SearchListViewTemplate;