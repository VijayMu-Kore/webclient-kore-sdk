
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
          const listHTML = $(me.getTemplateString(result.message[0].component.payload.template_type)).tmpl(result.message[0].component.payload);
          $(listHTML).find(".show-more-list").remove();
          $(
            ".full-search-data-container [templateName=" +
            showMoreData.templateName +
            "]"
          ).before($(listHTML).find(".parent-list-template").children());
        })
        $(e.currentTarget).attr("pageNumber", Number($(e.currentTarget).attr("pageNumber")) + 1);
      });


    //tasks click events//
    $(messageHtml)
      .off("click", ".search-task")
      .on("click", ".search-task", function (event: any) {
        event.stopPropagation();
        var ele = $(event.target).closest(".search-task");
        hostWindowInstance.botActionTrigger(event);
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
    {{if isButtonTemplate == false}}\
    {{if structuredData.length}}\
        <div>\
        <div class="title-text-heading {{if renderTitle}}display-block{{else}}display-none{{/if}}">${titleName}</div>\
        <div class="template-4-{{if listType=="classic"}}classic{{else}}plain{{/if}}-list{{if isClickable==false}}-collapse{{/if}} {{if isClickable==false}}template-4-{{if listType=="classic"}}classic{{else}}plain{{/if}}-list-collapse-result{{/if}} mb-15 parent-list-template">\
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
        </div>\
    {{/if}}\
        {{/if}}\
        {{/if}}\
        {{if isButtonTemplate}}\
        {{if structuredData && structuredData.length}}\
        {{if devMode == true && viewType == "Customize" && selectedFacet == appearanceType}}\
          <div class="bot-actions-customize-info ">\
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFnSURBVHgBpVNNSsNQEH4zabXLuFXEHsGCqLjQ9gTqCWJP0AsUk0j26tJdegLrCczKnyL0CDbgAbKzhvjGmZBIfIQScODxHt/8fzNPqRXSOfS6clbZgAm09sZ9tCxHkToDULZgRCphyykC+MsXb1G1x78ZfRfRumfDGBF6X68+yJG3YET0uLZ/6dZWIM5E+gIABmaWaksShE+Yzq783wClwnRmvK91ZqezYFoNojXNtf4+z96CKG9BE3F2mpiZAWgXsWVXMbHhlm5znoSzHGXCELFnlvz57N+oegm59DnfQyjKfxeyTCsmzJOb+/VM3fqBS2C1u6j+KSg9yZw7R8FOU6diuZLl0zguKqAHnaVD1VjAIaXyyeQBmMCQRzgy15bxhRwzu+yLbGUeqqLwmEyn4SJNSmKtUpl9RFF7e7DBymtr68Tmd8xYUjri5vGIuQq53bvqVKAui9aaDeC05jPJskWqqTT5zj8FOrqqP5/xLgAAAABJRU5ErkJggg==" alt="actions-info">\
            <span class="info-text">Bot Actions cannot be customized</span>\
          </div>\
        {{/if}}\
        {{if selectedFacet !== appearanceType && selectedFacet == "all results"}}\
          <div class="structured-data-header total-structured-data-wrap list-view-action-header" appearanceType="task">\
            ACTIONS\
            <div class="search-heads show-all sdk-show-classification display-none">\
              Show all Actions\
            </div>\
          </div>\
        {{/if}}\
        {{if selectedFacet == appearanceType || selectedFacet == "all results"}}\
          <div class="action-results-container btn_block_actions main-content-title-grid-data new-grid-search-data list-view-data-search">\
            {{each(key, task) structuredData}}\
              <div class="title-box-data">\
                  <div id="${key}" class="search-task search-grid-item text-truncate one-line-height" title="${task.name}" contentId="${task.taskId}" contentType="${task.contentType}" childBotId="${task.childBotId}" childBotName="${task.childBotName}" payload="${task.payload}" seqLogId="${task.seqLogId}">\
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJ1BMVEUAAAAAVaoEbq4DbK8GbK4Gbq8Gba0Fba8Fba4Fbq4Eba4Fba7////SVqJwAAAAC3RSTlMAA0hJVYKDqKmq4875bAAAAAABYktHRAyBs1FjAAAAP0lEQVQI12NgwACMJi5A4CzAwLobDBIYOCaAxDknMLCvnAkEsyYwcECkkBicMDV4GGwQxQEMjCogK5wEMC0HALyTIMofpWLWAAAAAElFTkSuQmCC" class="credit-card display-none">\
                  <div class="name-title">${task.titleText}</div>\
                  {{if task.childBotName !=="" && task.childBotName !== undefined}}\
                      <span class="child-bot">${task.childBotName}</span>\
                  {{/if}}\
                  </div>\
              </div>\
            {{/each}}\
          </div>\
        {{/if}}\
      {{/if}}\
      {{if !structuredData || structuredData.length === 0 }}\
        {{if selectedFacet != "all results"}}\
          {{if selectedFacet == appearanceType}}\
            {{if isFullResults == true}}\
              <div class="empty-full-results-container">\
                <div class="img-block"><img src="data:image/png;base64,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"></div>\
                <div class="title">Sorry, we could not find any results for that</div>\
                <div class="title-info">Please try searching with another term</div>\
              </div>\
            {{/if}}\
          {{/if}}\
        {{/if}}\
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