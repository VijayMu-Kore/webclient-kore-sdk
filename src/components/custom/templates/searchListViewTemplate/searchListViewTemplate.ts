import helpers from '../../../../utils/helpers';
import './searchListViewTemplate.scss';
class SearchListViewTemplate {

  renderMessage(msgData: any) {
    let me: any = this;
    let $ = me.hostInstance.$;
    me.helpersObj = helpers;
    if (msgData?.message[0] && msgData.message[0].component && msgData.message[0].component?.payload && msgData.message[0].component?.payload?.template_type == 'searchListTemplate') {
      if (!msgData.message[0].component.payload.helpers) {
        msgData.message[0].component.payload['helpers'] = me.helpersObj;
      }
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
      const listHTML = $(me.getTemplateString(result?.message[0].component.payload.template_type)).tmpl(result?.message[0].component.payload);
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
    .off("click",".search-task")
    .on("click",".search-task", function (event:any) {
      event.stopPropagation();
      var ele = $(event.target).closest(".search-task");
      hostWindowInstance.botActionTrigger(event);
    });
    $(messageHtml).off("click",".click-log-metrics").on("click",".click-log-metrics", function (e: any) {
      hostWindowInstance?.captureClickAnalytics(e);
    });
    $(messageHtml).off("click",".click-to-navigate-url").on("click",".click-to-navigate-url", function (e: any) {
      hostWindowInstance?.clickNavigateToUrl(e);
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
    {{if structuredData?.length }}\
    {{if renderTitle}}\
    <div class="title-list-heading">${titleName}</div>\
    {{/if}}\
    <div>\
    <div class="search-list-template{{if isClickable == true}}-no{{/if}}-clickble-{{if listType=="classic"}}classic{{else}}plain{{/if}}{{if gridLayoutType==""&&groupResults==true }}-group{{/if}}{{if gridLayoutType=="img_left"}}-if-img{{/if}} parent-list-template">\
        {{if isClickable == true}}\
        {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
        <div class="content-info {{if textAlignment==" center"}}text-center{{/if}} click-to-navigate-url click-log-metrics" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">\
            {{if data.img.length}}\
            <div class="img_block">\
                <img src="${data.img}">\
            </div>\
            {{/if}}\
            {{if data.heading.length}}\
            <div class="heading-title">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
            {{/if}}\
            {{if data.description.length}}\
            <div class="desc_text_info {{if listType==" classic"}}clamp-text{{else}}text_overflow{{/if}}" title="${data.description}">{{html helpers.convertMDtoHTML(data.description)}}</div>\
            {{/if}}\
        </div>\
        {{/each}}\
        {{/if}}\
        {{if isClickable == false}}\
        {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
        <div class="accordion-content-info">\
            <div class="content-info accordion" id="1">\
                {{if data.heading.length}}\
                <div class="heading-title">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                {{/if}}\
                {{if data.description.length}}\
                <div class="desc_text_info clamp-text">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                {{/if}}\
            </div>\
            <div class="panel">\
                {{if data.img.length}}\
                <div class="inner-content-panel-data">\
                    <div class="img_content">\
                        <img src="${data.img}">\
                    </div>\
                    <div class="desc-text-info-img">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                </div>\
                {{/if}}\
            </div>\
        </div>\
        {{/each}}\
        {{/if}}\
        <div class="show-more-data {{if doc_count==0 || doc_count<6 || isLiveSearch || isSearch}}display-none{{/if}} show-more-list" groupName="${groupName}" templateName="${templateName}" pageNumber="${pageNumber}" fieldName="${fieldName}">\
           <span>Show more</span>\
           <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNiIgdmlld0JveD0iMCAwIDEwIDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNS4zNjQzNyA1LjE0OTQ5QzUuMTc0OTcgNS4zMzgzNyA0Ljg3NDgxIDUuMzQ5NDggNC42NzIzOSA1LjE4MjgyTDQuNjM1NjMgNS4xNDk0OUwwLjE1MDkyNyAwLjg3NzI2NUMtMC4wNTAzMDkxIDAuNjc2NTc5IC0wLjA1MDMwOTEgMC4zNTEyMDIgMC4xNTA5MjcgMC4xNTA1MTVDMC4zNDAzMjYgLTAuMDM4MzY2NCAwLjY0MDQ4IC0wLjA0OTQ3NzMgMC44NDI5MDkgMC4xMTcxODNMMC44Nzk2NjggMC4xNTA1MTVMNSA0LjA1OTI4TDkuMTIwMzMgMC4xNTA1MTVDOS4zMDk3MyAtMC4wMzgzNjY0IDkuNjA5ODggLTAuMDQ5NDc3MyA5LjgxMjMxIDAuMTE3MTgzTDkuODQ5MDcgMC4xNTA1MTVDMTAuMDM4NSAwLjMzOTM5NyAxMC4wNDk2IDAuNjM4NzMxIDkuODgyNSAwLjg0MDYwN0w5Ljg0OTA3IDAuODc3MjY1TDUuMzY0MzcgNS4xNDk0OVoiIGZpbGw9IiM1RjYzNjgiLz4KPC9zdmc+Cg==">\
        </div>\
    </div>\
    </div>\
    {{/if}}\
    {{/if}}\
    {{if isButtonTemplate===true}}\
    {{if structuredData?.length}}\
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




// getTemplateString(type: any) {
//   var searchListTemplates = '<script type="text/x-jqury-tmpl">\
//     <div class="title-list-heading">Template title comes here</div>\
//     <div class="search-list-template-no-clickble-classic">\
//       <div class="content-info">\
//         <div class="heading-title">Heading comes here</div>\
//         <div class="desc_text_info clamp-text">Description comes here, description comes here, description comes here, description comes here, description comes here, des...</div>\
//       </div>\
//       <div class="content-info">\
//         <div class="heading-title">Heading comes here</div>\
//         <div class="desc_text_info text_overflow">Description comes here, description comes here, description comes here, description comes here, description comes here, des...</div>\
//       </div>\
//       <div class="content-info">\
//         <div class="heading-title">Heading comes here</div>\
//         <div class="desc_text_info text_overflow">Description comes here, description comes here, description comes here, description comes here, description comes here, des...</div>\
//       </div>\
//     </div>\
//     <div class="search-list-template-no-clickble-plain">\
//       <div class="content-info">\
//         <div class="heading-title">Heading comes here</div>\
//         <div class="desc_text_info text_overflow">Description comes here, description comes here, description comes here, description comes here, description comes here, des...</div>\
//       </div>\
//       <div class="content-info">\
//         <div class="heading-title">Heading comes here</div>\
//         <div class="desc_text_info text_overflow">Description comes here, description comes here, description comes here, description comes here, description comes here, des...</div>\
//       </div>\
//       <div class="content-info">\
//         <div class="heading-title">Heading comes here</div>\
//         <div class="desc_text_info text_overflow">Description comes here, description comes here, description comes here, description comes here, description comes here, des...</div>\
//       </div>\
//     </div>\
//     <div class="search-list-template-no-clickble-classic-group">\
//       <div class="content-info">\
//         <div class="heading-title">Heading comes here</div>\
//         <div class="desc_text_info clamp-text">Description comes here, description comes here, description comes here, description comes here, description comes here, des...</div>\
//       </div>\
//       <div class="content-info">\
//         <div class="heading-title">Heading comes here</div>\
//         <div class="desc_text_info text_overflow">Description comes here, description comes here, description comes here, description comes here, description comes here, des...</div>\
//       </div>\
//       <div class="content-info">\
//         <div class="heading-title">Heading comes here</div>\
//         <div class="desc_text_info text_overflow">Description comes here, description comes here, description comes here, description comes here, description comes here, des...</div>\
//       </div>\
//       <div class="show-more-data">\
//         <span>Show more</span>\
//         <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNiIgdmlld0JveD0iMCAwIDEwIDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNS4zNjQzNyA1LjE0OTQ5QzUuMTc0OTcgNS4zMzgzNyA0Ljg3NDgxIDUuMzQ5NDggNC42NzIzOSA1LjE4MjgyTDQuNjM1NjMgNS4xNDk0OUwwLjE1MDkyNyAwLjg3NzI2NUMtMC4wNTAzMDkxIDAuNjc2NTc5IC0wLjA1MDMwOTEgMC4zNTEyMDIgMC4xNTA5MjcgMC4xNTA1MTVDMC4zNDAzMjYgLTAuMDM4MzY2NCAwLjY0MDQ4IC0wLjA0OTQ3NzMgMC44NDI5MDkgMC4xMTcxODNMMC44Nzk2NjggMC4xNTA1MTVMNSA0LjA1OTI4TDkuMTIwMzMgMC4xNTA1MTVDOS4zMDk3MyAtMC4wMzgzNjY0IDkuNjA5ODggLTAuMDQ5NDc3MyA5LjgxMjMxIDAuMTE3MTgzTDkuODQ5MDcgMC4xNTA1MTVDMTAuMDM4NSAwLjMzOTM5NyAxMC4wNDk2IDAuNjM4NzMxIDkuODgyNSAwLjg0MDYwN0w5Ljg0OTA3IDAuODc3MjY1TDUuMzY0MzcgNS4xNDk0OVoiIGZpbGw9IiM1RjYzNjgiLz4KPC9zdmc+Cg==">\
//       </div>\
//     </div>\
//     <div class="search-list-template-no-clickble-plain-group">\
//       <div class="content-info">\
//         <div class="heading-title">Heading comes here</div>\
//         <div class="desc_text_info clamp-text">Description comes here, description comes here, description comes here, description comes here, description comes here, des...</div>\
//       </div>\
//       <div class="content-info">\
//         <div class="heading-title">Heading comes here</div>\
//         <div class="desc_text_info text_overflow">Description comes here, description comes here, description comes here, description comes here, description comes here, des...</div>\
//       </div>\
//       <div class="content-info">\
//         <div class="heading-title">Heading comes here</div>\
//         <div class="desc_text_info text_overflow">Description comes here, description comes here, description comes here, description comes here, description comes here, des...</div>\
//       </div>\
//       <div class="show-more-data">\
//         <span>Show more</span>\
//         <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNiIgdmlld0JveD0iMCAwIDEwIDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNS4zNjQzNyA1LjE0OTQ5QzUuMTc0OTcgNS4zMzgzNyA0Ljg3NDgxIDUuMzQ5NDggNC42NzIzOSA1LjE4MjgyTDQuNjM1NjMgNS4xNDk0OUwwLjE1MDkyNyAwLjg3NzI2NUMtMC4wNTAzMDkxIDAuNjc2NTc5IC0wLjA1MDMwOTEgMC4zNTEyMDIgMC4xNTA5MjcgMC4xNTA1MTVDMC4zNDAzMjYgLTAuMDM4MzY2NCAwLjY0MDQ4IC0wLjA0OTQ3NzMgMC44NDI5MDkgMC4xMTcxODNMMC44Nzk2NjggMC4xNTA1MTVMNSA0LjA1OTI4TDkuMTIwMzMgMC4xNTA1MTVDOS4zMDk3MyAtMC4wMzgzNjY0IDkuNjA5ODggLTAuMDQ5NDc3MyA5LjgxMjMxIDAuMTE3MTgzTDkuODQ5MDcgMC4xNTA1MTVDMTAuMDM4NSAwLjMzOTM5NyAxMC4wNDk2IDAuNjM4NzMxIDkuODgyNSAwLjg0MDYwN0w5Ljg0OTA3IDAuODc3MjY1TDUuMzY0MzcgNS4xNDk0OVoiIGZpbGw9IiM1RjYzNjgiLz4KPC9zdmc+Cg==">\
//       </div>\
//     </div>\
//     <div class="search-list-template-no-clickble-classic-if-img">\
//       <div class="content-info">\
//         <div class="img_block">\
//           <img src="data:image/png;base64,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">\
//         </div>\
//         <div class="heading-title">Heading comes here</div>\
//         <div class="desc_text_info clamp-text">Description comes here, description comes here, description comes here, description comes here, description comes here, des...</div>\
//       </div>\
//       <div class="content-info">\
//         <div class="img_block">\
//           <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAz8SURBVHgBTVhpbFzlFT3vzZt9PB4v42W8xFmczdmdPSgNDUlD1FIaCJAQEcTS0iIB7c9KVZH6E1VVf7UsQvxgCUEgpVARqCCEgtJmgcRkIV5jvMXLjMfj2ectPfd7BnWs0YznLd+9555z7v2eBr6eeafvj/x4Do4Te2x9AF7TREuiHkG/DyPjExgauoV8Lo+VK1fD5/Vi4tt+XPviSzgGsG7fnXjllVcxPz2AziWLsO+eI/BrBgLxOHSDJ0Djn45CoYBrH72BixdP48jv/g7L0ZGZyyAUDqdbEs2vrVy99LfGs+/2/QUOntM0G80hH6I+D7LlIuPSYFk2xsZGUamY8BgeeL0G+np68O1Lr2FiZgJFTcP48E3c+4uH8MILf0KiVIFploFSCZHmJpiOzWB0lIp5VMomRke/g6bz/tl5BIJRRKNRhEKhmGU7z731xqk53avrj3J98BNBrwMbJhgcrEoFlm3Bth1Eq6p4swrkQMhiYPUBWLEwGjqacOPWIGzLwo/u+hm+GZmFNxyDQfSYB8yKxUQYII+fP3cWvUNjuNF3G2UmxwAYSBg2A9aYVEtb4lnDZyAmMBJLHuCHrYGgoMhSDfQOE2ovkqkUotXV6pzesXF8kkkiX8xCH06hZ/gWjgU07Nq5E30DQ3AsB3o4xAAZDRcZ+W4UJ955D9VMOFnSsWdDEFfOn8KG7YeYnIm6ujgMos6EY/xgTTWH8BEdLmYxi0KxhNlMDtduDqBr1QrkRkaQaG5mnYELg/2YSmXw+327Uc7M4wZ50hpvIn9CaG9rxczkGDpXb8RMKolPzpzBhx99jLHxcTQ2NuDAnq0ozlsI5y9h4vZ2NDclEI8zeYcJMHCjNWAj6wgyNhbXGDBtEwWzgquXLxMdmyQOwO/343zPFVz4+grOX7iIeSJ18otLuHPFImgkaSo9j6I1j+a2FkT8YVy5fh0vvvwSxiZvo0jih4jUju07cebcORTyDnYtB6o7bYTDVSiz/IbHy9ISljf+8ZnTGG8AuYnaqoCQBSmicvnqNdTF69HR0ID52Vn8+aW/YWRkgjcrIpWcgmPbqAn40FxbBz+v3759B5a0t+HsB6fw72s31CJerw9h8iIzl4ZVLmFRayM8vjDuv+9e8jOIJcuWskx1DCrMUhkw6qJhxKr8SKYzsAOugiwSTGTXVN9AVHwo+HzoXLwMk+MzmCukKW8/z6tgtlhGanQMGsvQc/UqDNZaUMwWcoqAlVIZJoPKUT0+Ztu1fgt27tyBKiKyfFkn0rNJ6BSOkNxmckYwFFQwB7igRVKwepicnEILObJuTRfsShGVcAkej4F8oShCgyIYWW5QpnKNxu8a625SfSb9pMS3x+PhcQPFfB4RZv7g4cPoWreJqM6go20Jeaqjnshns1mFjDr/2uAIAiRt94bVjFJDmR7R39+Pjo521jujMtU8OkZTM2hdsRSZ2TTymQzKxSLJmGPWWQZmk4RQpXOUt6iQlWSXL+/Eb55+mgJI4PzFK6iuiqC+rpaEdVQgs7xfI6mgSzD1fgcb125UiirTF1IzSXQuXYrFHa2UZwXFooPBoRGFiixcrJQRiFYhWl+LfL6AeqrR4m8mjyenp+lHJRiw0MASH77vfhy8+6BaqK9vCLWxatTX18DRbXjoRbXBWkyxCraoicEb69eu4cmOIpzDOqfSs2ike3pIPj+5kUqlVZDzggAzFQ7lsjnMzuRQSM8h2hhX7hyujmJJRwd2kxMN/K010YLamhplljmWKp+fR0tLq9yC/9OjyBtd8yLeEFclkrUNMTKBWHQubjiXTitPMTw+olFSQfUODMDDGpdMC+nULMuXRY4El/YgpZpnAg8/9CCefvIp8m0SkUhEeYdJIejklRhgIxf1iauRsIV8iSSOYGp6iohomJubYxsxKQAJwnJtf2R0lOVZrEpukuHlchlvnnoPA8PDmCac+UJeWb0Q2KB3NCWakZ/PIlpbQ2n6VFI+n19JWq71+wIokoOCunBRUOogeiGKxjB0um5UBVPisWKpSGTINwlEXhMTE+js7CRKOlViIhQMISL9g8fDoRBqSbwCiSsNrkBukK+oEK1gIIQalkSyqKoKs5Q0Sp9XJVkhn4LBIJvkCNJEfdWqVer+ck8fSx4KBBUqIm8REBPVkJpN0Z6bEAgEECbjA7yBcOFHd9yBAG9eKBaQoYokC/EEP7MvkMCChsmAVpL0xJjI+HjcUm/pOTmWdI7camhsRFfXamVugvDg4MBCKSvqs7e3V0jsqJrKBfX1cQWxh3XWBUDWd2wshZpQAO2JZaiONnBlG7dZstvjo4o7DhdtrKdf9F1DcmyYfqOgVgEXqLBMJosSUUw0NauyCTpiF21t7aoN+PhdzpUk9UrFVpnJRZn5eRWlHFSN03Bw4dsJNHFQKpgGZuYdRchoVRwVuq8Qt0hl3bFtG3b9/D5yqIOOW2ZyJrK8V5ElFUEIWjq9SpCdZV+TccvgNCDICWfFhTdt3ARDFh8aHMKi9nbWNqQOyAkyL1z+phfTE9fRMz6kprb6Gp2yJoF509r6OhRyOYR5zU/3H4AIsyLmxys9dF5x2BQDKZEbbeSa/C+ljzMxUa3f8Cv/KTIpAdMX8EKXmt+mHOWEMsnmkkjobJPQt9i5M/AF/TD8PnWxHBTbh4waVJJ4xE3WO02pl4mwvKW8tDUGk6NyqlgOQ5FbEvYTJUFKkJFp8tLFS8oOJAvtxMn3HUFnKQko8628RHbXL13EyY9Po8SLpHkWOePMkeSz0zOcCg3E2a0v91zmjOOwnIYifksiQTdfg0OHDimPmpmZRbymFnUxjpgxNWIqleoejdd4FSJpTgQyQzVx3jFGx8ewe/duRu/W7/sSxbyDlB0DSBYwMTaBqakp1c0ly8eOPYJe9q+qSBWDsSnviiJgH38bGBrE+6c/wvYdO7B/7z7V10q8TtCQW4uDS/8SRCsMTIRTQ58Si2A7WMca626kMo8SOo/mQTo/gnEngXTyMo0tgyDNTPMHFYEb6xr5e5ojpqWILgOYRdKL4wpp8+Uczn35JRKNTajZVctgKkg4Tepc9WYJK2wxgnhrWxsDdtuAIR1U6iclEvNRxXNMDtFz6IrOYd3jT3B8/BwZZiC7BOFVlr0mQKMr0i90KqJsy2ihKbhllBC5FynrFFtHll7k1V0vEwvxeHSXknz5/JwsTXcg9/C44aOviPtZDFk1LOU7FpYFeqEtasea7q04+9nnGLs9TgNjw6OCNI6pWzdvpRO5plUdi9Gf/KpcOc7FpZKJGBvn0iWd5NkcNq5ZoXqbjBiyZRHiyqfBKD0EQqSuOrcsbCiVOCorncB4PX7M+R5HbeNehdq2rVs5rBvkUERNeF6fjnsP3YPXX38T3Zu6iRItXXlLVkEfiUTx5GNPIhoJYdvmtejgOKpJmpS5IKGmOq8rf2nQAoClmjXcP8//EVi8JtKwFpZXZhoHmzZswpbN3cyI8w6n/oMH76YyAvjn6Q8xyK2KjBeCmnBGrn/qV79m52/BssWLlAnOUoVyT3F2aQdKtaxVuVRxm6hqpBV3hPAs+Mf3wci7KhZHuK5JNcMid5gfnv4AU8kUR8gItnR348SJt3CawQjPZOsqjc9DIj76yHEVeJblWrl8uWqs0qVFIC4noeZjCUy2x2IrjtunBS2vitpWinYDkRP8HBFMomIS9hFu3ObYh0Sahx94AJ+ePYuT771LgzMVGrJIgGo7/vBR/GT/XTTRGdWPvD7XKAPcRYiZ2qa7P3JnHKIonHDcNYUqap4RphsKId2tq7XQnxhfhRz57/nzaqsq29xFiVq8fuKEQkxMS5phkJI/fuwY7tqzB9P0I0Fj/br16h7u203dLZWukuI3V+cL2pJjhrihpv5xITNlqBYyLyD09Vdf4cynZ9De0oKVrT7sTlzEy+kkCpaGnNoF6Hj80ePYt3cvJqk4keiqzhXKENUCXlccajaWvRHdXe7rWQjDWaCH4wZE2Aw3QlGCA9cTvueODEYqAT4dOHxgCd7+1yQHKMrR4V6HTxyOHTmCgwcOIJlM8mlDGRs3dKOJM7R0ZAlUaAC4i2ma+02ZKz/93Ogbqo/JurYQWE/zKUHMWZjQPaodMHrNhXbl8hU4evQo+vm0IZcqYzAdwdG7Y8hPDWM+F8bmLnfCF8lu2bpFpSs7DQlGX3BcPhtR91rYwCjEJHGpnjzpcDuQlvb88qlnmLq2R0jllsvtTeopgpo7POqimzevI2hzmme2qUADju3fgKpgFv/5uodn+bF994/V+Kkr2HX8YLNicJXKD0EIUd0xRVeOLQapHsFYzotG16pFz/f3j8TI7OOUVEwpj9GKmzq2SpP7pgFkOERtOvIEYvSX4f4B/OHVt+kxE9w9FnEwVlQzsvS1shruCbvpuJ7ic51dBjhRnjwH0pXTQ40bDCLNTv7X9euXPv8/MSW7iZrRLrAAAAAASUVORK5CYII=">\
//         </div>\
//         <div class="heading-title">Heading comes here</div>\
//         <div class="desc_text_info text_overflow">Description comes here, description comes here, description comes here, description comes here, description comes here, des...</div>\
//       </div>\
//       <div class="content-info">\
//         <div class="img_block">\
//           <img src="data:image/png;base64,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">\
//         </div>\
//         <div class="heading-title">Heading comes here</div>\
//         <div class="desc_text_info text_overflow">Description comes here, description comes here, description comes here, description comes here, description comes here, des...</div>\
//       </div>\
//     </div>\
//     <div class="search-list-template-no-clickble-plain-if-img">\
//       <div class="content-info">\
//         <div class="img_block">\
//           <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAz8SURBVHgBTVhpbFzlFT3vzZt9PB4v42W8xFmczdmdPSgNDUlD1FIaCJAQEcTS0iIB7c9KVZH6E1VVf7UsQvxgCUEgpVARqCCEgtJmgcRkIV5jvMXLjMfj2ectPfd7BnWs0YznLd+9555z7v2eBr6eeafvj/x4Do4Te2x9AF7TREuiHkG/DyPjExgauoV8Lo+VK1fD5/Vi4tt+XPviSzgGsG7fnXjllVcxPz2AziWLsO+eI/BrBgLxOHSDJ0Djn45CoYBrH72BixdP48jv/g7L0ZGZyyAUDqdbEs2vrVy99LfGs+/2/QUOntM0G80hH6I+D7LlIuPSYFk2xsZGUamY8BgeeL0G+np68O1Lr2FiZgJFTcP48E3c+4uH8MILf0KiVIFploFSCZHmJpiOzWB0lIp5VMomRke/g6bz/tl5BIJRRKNRhEKhmGU7z731xqk53avrj3J98BNBrwMbJhgcrEoFlm3Bth1Eq6p4swrkQMhiYPUBWLEwGjqacOPWIGzLwo/u+hm+GZmFNxyDQfSYB8yKxUQYII+fP3cWvUNjuNF3G2UmxwAYSBg2A9aYVEtb4lnDZyAmMBJLHuCHrYGgoMhSDfQOE2ovkqkUotXV6pzesXF8kkkiX8xCH06hZ/gWjgU07Nq5E30DQ3AsB3o4xAAZDRcZ+W4UJ955D9VMOFnSsWdDEFfOn8KG7YeYnIm6ujgMos6EY/xgTTWH8BEdLmYxi0KxhNlMDtduDqBr1QrkRkaQaG5mnYELg/2YSmXw+327Uc7M4wZ50hpvIn9CaG9rxczkGDpXb8RMKolPzpzBhx99jLHxcTQ2NuDAnq0ozlsI5y9h4vZ2NDclEI8zeYcJMHCjNWAj6wgyNhbXGDBtEwWzgquXLxMdmyQOwO/343zPFVz4+grOX7iIeSJ18otLuHPFImgkaSo9j6I1j+a2FkT8YVy5fh0vvvwSxiZvo0jih4jUju07cebcORTyDnYtB6o7bYTDVSiz/IbHy9ISljf+8ZnTGG8AuYnaqoCQBSmicvnqNdTF69HR0ID52Vn8+aW/YWRkgjcrIpWcgmPbqAn40FxbBz+v3759B5a0t+HsB6fw72s31CJerw9h8iIzl4ZVLmFRayM8vjDuv+9e8jOIJcuWskx1DCrMUhkw6qJhxKr8SKYzsAOugiwSTGTXVN9AVHwo+HzoXLwMk+MzmCukKW8/z6tgtlhGanQMGsvQc/UqDNZaUMwWcoqAlVIZJoPKUT0+Ztu1fgt27tyBKiKyfFkn0rNJ6BSOkNxmckYwFFQwB7igRVKwepicnEILObJuTRfsShGVcAkej4F8oShCgyIYWW5QpnKNxu8a625SfSb9pMS3x+PhcQPFfB4RZv7g4cPoWreJqM6go20Jeaqjnshns1mFjDr/2uAIAiRt94bVjFJDmR7R39+Pjo521jujMtU8OkZTM2hdsRSZ2TTymQzKxSLJmGPWWQZmk4RQpXOUt6iQlWSXL+/Eb55+mgJI4PzFK6iuiqC+rpaEdVQgs7xfI6mgSzD1fgcb125UiirTF1IzSXQuXYrFHa2UZwXFooPBoRGFiixcrJQRiFYhWl+LfL6AeqrR4m8mjyenp+lHJRiw0MASH77vfhy8+6BaqK9vCLWxatTX18DRbXjoRbXBWkyxCraoicEb69eu4cmOIpzDOqfSs2ike3pIPj+5kUqlVZDzggAzFQ7lsjnMzuRQSM8h2hhX7hyujmJJRwd2kxMN/K010YLamhplljmWKp+fR0tLq9yC/9OjyBtd8yLeEFclkrUNMTKBWHQubjiXTitPMTw+olFSQfUODMDDGpdMC+nULMuXRY4El/YgpZpnAg8/9CCefvIp8m0SkUhEeYdJIejklRhgIxf1iauRsIV8iSSOYGp6iohomJubYxsxKQAJwnJtf2R0lOVZrEpukuHlchlvnnoPA8PDmCac+UJeWb0Q2KB3NCWakZ/PIlpbQ2n6VFI+n19JWq71+wIokoOCunBRUOogeiGKxjB0um5UBVPisWKpSGTINwlEXhMTE+js7CRKOlViIhQMISL9g8fDoRBqSbwCiSsNrkBukK+oEK1gIIQalkSyqKoKs5Q0Sp9XJVkhn4LBIJvkCNJEfdWqVer+ck8fSx4KBBUqIm8REBPVkJpN0Z6bEAgEECbjA7yBcOFHd9yBAG9eKBaQoYokC/EEP7MvkMCChsmAVpL0xJjI+HjcUm/pOTmWdI7camhsRFfXamVugvDg4MBCKSvqs7e3V0jsqJrKBfX1cQWxh3XWBUDWd2wshZpQAO2JZaiONnBlG7dZstvjo4o7DhdtrKdf9F1DcmyYfqOgVgEXqLBMJosSUUw0NauyCTpiF21t7aoN+PhdzpUk9UrFVpnJRZn5eRWlHFSN03Bw4dsJNHFQKpgGZuYdRchoVRwVuq8Qt0hl3bFtG3b9/D5yqIOOW2ZyJrK8V5ElFUEIWjq9SpCdZV+TccvgNCDICWfFhTdt3ARDFh8aHMKi9nbWNqQOyAkyL1z+phfTE9fRMz6kprb6Gp2yJoF509r6OhRyOYR5zU/3H4AIsyLmxys9dF5x2BQDKZEbbeSa/C+ljzMxUa3f8Cv/KTIpAdMX8EKXmt+mHOWEMsnmkkjobJPQt9i5M/AF/TD8PnWxHBTbh4waVJJ4xE3WO02pl4mwvKW8tDUGk6NyqlgOQ5FbEvYTJUFKkJFp8tLFS8oOJAvtxMn3HUFnKQko8628RHbXL13EyY9Po8SLpHkWOePMkeSz0zOcCg3E2a0v91zmjOOwnIYifksiQTdfg0OHDimPmpmZRbymFnUxjpgxNWIqleoejdd4FSJpTgQyQzVx3jFGx8ewe/duRu/W7/sSxbyDlB0DSBYwMTaBqakp1c0ly8eOPYJe9q+qSBWDsSnviiJgH38bGBrE+6c/wvYdO7B/7z7V10q8TtCQW4uDS/8SRCsMTIRTQ58Si2A7WMca626kMo8SOo/mQTo/gnEngXTyMo0tgyDNTPMHFYEb6xr5e5ojpqWILgOYRdKL4wpp8+Uczn35JRKNTajZVctgKkg4Tepc9WYJK2wxgnhrWxsDdtuAIR1U6iclEvNRxXNMDtFz6IrOYd3jT3B8/BwZZiC7BOFVlr0mQKMr0i90KqJsy2ihKbhllBC5FynrFFtHll7k1V0vEwvxeHSXknz5/JwsTXcg9/C44aOviPtZDFk1LOU7FpYFeqEtasea7q04+9nnGLs9TgNjw6OCNI6pWzdvpRO5plUdi9Gf/KpcOc7FpZKJGBvn0iWd5NkcNq5ZoXqbjBiyZRHiyqfBKD0EQqSuOrcsbCiVOCorncB4PX7M+R5HbeNehdq2rVs5rBvkUERNeF6fjnsP3YPXX38T3Zu6iRItXXlLVkEfiUTx5GNPIhoJYdvmtejgOKpJmpS5IKGmOq8rf2nQAoClmjXcP8//EVi8JtKwFpZXZhoHmzZswpbN3cyI8w6n/oMH76YyAvjn6Q8xyK2KjBeCmnBGrn/qV79m52/BssWLlAnOUoVyT3F2aQdKtaxVuVRxm6hqpBV3hPAs+Mf3wci7KhZHuK5JNcMid5gfnv4AU8kUR8gItnR348SJt3CawQjPZOsqjc9DIj76yHEVeJblWrl8uWqs0qVFIC4noeZjCUy2x2IrjtunBS2vitpWinYDkRP8HBFMomIS9hFu3ObYh0Sahx94AJ+ePYuT771LgzMVGrJIgGo7/vBR/GT/XTTRGdWPvD7XKAPcRYiZ2qa7P3JnHKIonHDcNYUqap4RphsKId2tq7XQnxhfhRz57/nzaqsq29xFiVq8fuKEQkxMS5phkJI/fuwY7tqzB9P0I0Fj/br16h7u203dLZWukuI3V+cL2pJjhrihpv5xITNlqBYyLyD09Vdf4cynZ9De0oKVrT7sTlzEy+kkCpaGnNoF6Hj80ePYt3cvJqk4keiqzhXKENUCXlccajaWvRHdXe7rWQjDWaCH4wZE2Aw3QlGCA9cTvueODEYqAT4dOHxgCd7+1yQHKMrR4V6HTxyOHTmCgwcOIJlM8mlDGRs3dKOJM7R0ZAlUaAC4i2ma+02ZKz/93Ogbqo/JurYQWE/zKUHMWZjQPaodMHrNhXbl8hU4evQo+vm0IZcqYzAdwdG7Y8hPDWM+F8bmLnfCF8lu2bpFpSs7DQlGX3BcPhtR91rYwCjEJHGpnjzpcDuQlvb88qlnmLq2R0jllsvtTeopgpo7POqimzevI2hzmme2qUADju3fgKpgFv/5uodn+bF994/V+Kkr2HX8YLNicJXKD0EIUd0xRVeOLQapHsFYzotG16pFz/f3j8TI7OOUVEwpj9GKmzq2SpP7pgFkOERtOvIEYvSX4f4B/OHVt+kxE9w9FnEwVlQzsvS1shruCbvpuJ7ic51dBjhRnjwH0pXTQ40bDCLNTv7X9euXPv8/MSW7iZrRLrAAAAAASUVORK5CYII=">\
//         </div>\
//         <div class="heading-title">Heading comes here</div>\
//         <div class="desc_text_info clamp-text">Description comes here, description comes here, description comes here, description comes here, description comes here, des...</div>\
//       </div>\
//       <div class="content-info">\
//         <div class="img_block">\
//           <img src="data:image/png;base64,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">\
//         </div>\
//         <div class="heading-title">Heading comes here</div>\
//         <div class="desc_text_info text_overflow">Description comes here, description comes here, description comes here, description comes here, description comes here, des...</div>\
//       </div>\
//       <div class="content-info">\
//         <div class="img_block">\
//           <img src="data:image/png;base64,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">\
//         </div>\
//         <div class="heading-title">Heading comes here</div>\
//         <div class="desc_text_info text_overflow">Description comes here, description comes here, description comes here, description comes here, description comes here, des...</div>\
//       </div>\
//     </div>\
//   </script>';


//   var searchListTemplates = '<script type="text/x-jqury-tmpl">\
//         <div class="title-list-heading">Template title comes here</div>\
//         <div class="search-list-template-clickble-classic">\
//           <div class="accordion-content-info">\
//             <div class="content-info accordion" id="1">\
//               <div class="heading-title">Heading comes here</div>\
//               <div class="desc_text_info clamp-text">Description comes here, description comes here, description comes here, description comes here, description comes here, des...Description comes here, description comes here, description comes here, description comes here, description comes here, des...Description comes here, description comes here, description comes here, description comes here, description comes here, des...</div>\
//             </div>\
//             <div class="panel"></div>\
//           </div>\
//         </div>\
//         <div class="search-list-template-clickble-plain">\
//           <div class="accordion-content-info">\
//             <div class="content-info accordion" id="1">\
//               <div class="heading-title">Heading comes here</div>\
//               <div class="desc_text_info clamp-text">Description comes here, description comes here, description comes here, description comes here, description comes here, des...Description comes here, description comes here, description comes here, description comes here, description comes here, des...Description comes here, description comes here, description comes here, description comes here, description comes here, des...</div>\
//             </div>\
//             <div class="panel"></div>\
//           </div>\
//         </div>\
//         <div class="search-list-template-clickble-classic-group">\
//           <div class="accordion-content-info">\
//             <div class="content-info accordion" id="1">\
//               <div class="heading-title">Heading comes here</div>\
//               <div class="desc_text_info clamp-text">Description comes here, description comes here, description comes here, description comes here, description comes here, des...Description comes here, description comes here, description comes here, description comes here, description comes here, des...Description comes here, description comes here, description comes here, description comes here, description comes here, des...</div>\
//             </div>\
//             <div class="panel"></div>\
//           </div>\
//           <div class="show-more-data">\
//             <span>Show more</span>\
//             <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNiIgdmlld0JveD0iMCAwIDEwIDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNS4zNjQzNyA1LjE0OTQ5QzUuMTc0OTcgNS4zMzgzNyA0Ljg3NDgxIDUuMzQ5NDggNC42NzIzOSA1LjE4MjgyTDQuNjM1NjMgNS4xNDk0OUwwLjE1MDkyNyAwLjg3NzI2NUMtMC4wNTAzMDkxIDAuNjc2NTc5IC0wLjA1MDMwOTEgMC4zNTEyMDIgMC4xNTA5MjcgMC4xNTA1MTVDMC4zNDAzMjYgLTAuMDM4MzY2NCAwLjY0MDQ4IC0wLjA0OTQ3NzMgMC44NDI5MDkgMC4xMTcxODNMMC44Nzk2NjggMC4xNTA1MTVMNSA0LjA1OTI4TDkuMTIwMzMgMC4xNTA1MTVDOS4zMDk3MyAtMC4wMzgzNjY0IDkuNjA5ODggLTAuMDQ5NDc3MyA5LjgxMjMxIDAuMTE3MTgzTDkuODQ5MDcgMC4xNTA1MTVDMTAuMDM4NSAwLjMzOTM5NyAxMC4wNDk2IDAuNjM4NzMxIDkuODgyNSAwLjg0MDYwN0w5Ljg0OTA3IDAuODc3MjY1TDUuMzY0MzcgNS4xNDk0OVoiIGZpbGw9IiM1RjYzNjgiLz4KPC9zdmc+Cg==">\
//           </div>\
//         </div>\
//         <div class="search-list-template-clickble-plain-group">\
//           <div class="accordion-content-info">\
//             <div class="content-info accordion" id="1">\
//               <div class="heading-title">Heading comes here</div>\
//               <div class="desc_text_info clamp-text">Description comes here, description comes here, description comes here, description comes here, description comes here, des...Description comes here, description comes here, description comes here, description comes here, description comes here, des...Description comes here, description comes here, description comes here, description comes here, description comes here, des...</div>\
//             </div>\
//             <div class="panel"></div>\
//           </div>\
//           <div class="show-more-data">\
//             <span>Show more</span>\
//             <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNiIgdmlld0JveD0iMCAwIDEwIDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNS4zNjQzNyA1LjE0OTQ5QzUuMTc0OTcgNS4zMzgzNyA0Ljg3NDgxIDUuMzQ5NDggNC42NzIzOSA1LjE4MjgyTDQuNjM1NjMgNS4xNDk0OUwwLjE1MDkyNyAwLjg3NzI2NUMtMC4wNTAzMDkxIDAuNjc2NTc5IC0wLjA1MDMwOTEgMC4zNTEyMDIgMC4xNTA5MjcgMC4xNTA1MTVDMC4zNDAzMjYgLTAuMDM4MzY2NCAwLjY0MDQ4IC0wLjA0OTQ3NzMgMC44NDI5MDkgMC4xMTcxODNMMC44Nzk2NjggMC4xNTA1MTVMNSA0LjA1OTI4TDkuMTIwMzMgMC4xNTA1MTVDOS4zMDk3MyAtMC4wMzgzNjY0IDkuNjA5ODggLTAuMDQ5NDc3MyA5LjgxMjMxIDAuMTE3MTgzTDkuODQ5MDcgMC4xNTA1MTVDMTAuMDM4NSAwLjMzOTM5NyAxMC4wNDk2IDAuNjM4NzMxIDkuODgyNSAwLjg0MDYwN0w5Ljg0OTA3IDAuODc3MjY1TDUuMzY0MzcgNS4xNDk0OVoiIGZpbGw9IiM1RjYzNjgiLz4KPC9zdmc+Cg==">\
//           </div>\
//         </div>\
//         <div class="search-list-template-clickble-classic-if-img">\
//           <div class="accordion-content-info">\
//             <div class="content-info accordion" id="1">\
//               <div class="heading-title">Heading comes here</div>\
//               <div class="desc_text_info clamp-text">Description comes here, description comes here, description comes here, description comes here, description comes here, des...Description comes here, description comes here, description comes here, description comes here, description comes here, des...Description comes here, description comes here, description comes here, description comes here, description comes here, des...</div>\
//             </div>\
//             <div class="panel">\
//               <div class="inner-content-panel-data">\
//                 <div class="img_content">\
//                   <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAEZWSURBVHgB5b1pkGTHcR/+q9d3z72zsycWiwVAgABPUOIhURJp/SVZ0l+2LFu2w5d8fPClD7YjHLLDEQ77k0Nh2VbYDocizLDlE5RpiaQkUiLNA7wEggBxLo49sNh7Zuc+e3qmj1fOzKqsV6+nZ3Z2dwZYwAX0zkz36/fqVWVl/vKXWfkMqE1NTd1XMKXfRIIPWpuOApbeNe5l+Sf/yu/pK3Hv8WfyPv0w/ri7qFlrcadNznEbp6Fx3PazNOrXTn3s/Sz+26a957AyHbb3uN7fbfYe/0ypnwb28800/QePPfLIJSPCUCg+T5+NRl2OuuEFw50CeYFI3N8sF3efPPw/JxDw/6a4NYFw37NLm2n6WJIkxV/PtII2E/00Pe9Hf5u7Vxh21Uz02mbWRfPljtvjLtD5b9KFXZ3DTYLZXRf7HUQKoWIKv2mmp2dtbuVb7OrG70YTsftm0dzYQKFQwPpmA7VKDZViBXYX9x6vzB2P26WGyH/H7vrvfv2w/r+dNJB+j9/PaQh33FIxOzQaiQgbvHOau5/pmSl89vO/jdnpGUxNTuHQwaMYGR3BqVMn8JM/9TMYHBgiIdnA7OwsOq0Wjhw9hoFaHW/GaPAiuxMzlxmO2z7BqBeIfmbhnSIQ7l4Mab9Ll8/i1//Nv8QrL76KYiERjbB4Y1oU44vPlnH+/FkMDg3ixeeex/zMPJLEYGB4CD/6yU/iT/38L2LswEHsRWPFbu90fPdiiozvSySE3mR4eKqCYVLczHbc7SaDu9dpd7BJq/369av42lf/D75Kr83GOmy3i1a7LQPR7aYYHBxEi7RBu9NGuVxCt9P15zCCr9m0nLz/OH71138Dw0PD4RoOy/Ufh51MRv64vGjYmwFOiy3CFMAinBnQLqlZyB2rpiY6Ht7M8GdOIHI3ZSMXc3skdVcLBN2PSSy+9c2v44mvfZVW/DNorDexsbEpk5t2OtT/RISAW7lSRq1aFSlaXVlByoNGn/OxpVKZR5G0iMVP/szP4e/9/X+AarnqXLx9Foh+x+4oEDq5dyAQzmQYGymEmwvDXd/IBFy7dhFf+N3P4cUXX5IbTdMU7W6HtEBHTEGlVMJAeQCtzU0R7g5pjWKxKELRaZO26Lphb3dXUKZjK9UKvvylP8Tw8AD+5t/8ZSQkLG/b8dmhFcNKlx8q1QnuppuVnpjtVmJufbl/adI/81ufxuXLF9FubaBNpoMFgj9P2M1jc9JpoUCrf6g2gIrpYLBcxnC9huVagoXlVSyvrmO9a0iLdLHuzQt/9zOP/xbe+54P4OM/9knpk9mmL6yBtjPyO2mBWPP2Pa6P3d/6Xbv780E1nfs98jJS5PiHt62nwaqvg8ZaA9M3ZrC0vISB+iAJQJfwQkduvlIqYpzA4r3DJbzr6ATe/657cfK+ezA0PEoYYwPz8wt4/coVPHP2Gs5eX8KFmVkxH7R60CKz8y9/9V/gn9bLeOyDP0hahUyKjtuW4TLb9nH/2u4hayCoYgGamV5w9sJEAmE9E2l2Zwf3u92KhuDDFufm8Bf+3C9iYXGeNESbhIG4O/qgQKZiqFLBI0dG8OF3ncCj9x7BqXtP4OCRIxg4eAgFdi/bFq2lBTRmJ3FtchLPnruAz37/HKYbbVTKFaytrpG5SPDwux/Cx37o4/gbv/zLKMCZj9vhKHoxxPb3tj3gjHkHXsOp5yr7fT/GEMpByE+PQdzMm/DP3dnM7r2ds2fP4p/8yj8iT6FDApAQNiRwSNigVqthaKCOh4+M4WPvOorH3nUPHn7gOA4cGKPjCnR8i0xNl8xIEaXBAdTGh3H48DB+gI758KljqJGGSDxPwIJx5dIVnDt7Dk//0bexsd4IAHUv723Hr2H7MbjpF/1LvxezscW+WmAPNcOb4Y1kOMjg5IkTfoLa9OqQdiAQSfa8lHZxfLCKh4+N49CBEWImLRFPm2g1V9FtE87YJPA4MIoSCY7t8grroFIpYXxiFD/ynhN45dokZpuEwosFmUPmMc6feQ2fffzTmLx+DX/mz/8VWfnBissQ3vzeDfJjlO4WX/jvsoDqOXo1Qu97vd9n+ynvhZOFKNU7pNENtVpMSRs0m00Z3C6BSUMaoFoyuP/IKGGHugxSY6OFlaVlNFYW0NkgAWrSa30ZrcYK/VxBt9EQwSgXSzh1dBx/7IMPkxZpk5cxRAIG4jc2sbAwj9dfv4Dl5WWsra14dPb2bu8ogVhrLOGlF5/Hq6+dFRjEtpHBIAPkibEh0QylYuJcS8IVHdIaGzSxbTYVpkRvOyyQ0H+GuKn2Zgtd2xXM8L5T9+DQ6CBxGRvkglaJtTyAg+MHkRJQ/d53/gjzU9ffvkG+qBWxR+2tJqrYvj/+X/8bvvHE12kSU/IoutKnMrmWBCcxPjSEQTIHMuGkMfhVrw+gTpNbLJbETWQskZgikhIJDZFV5bSKTRIA/s6R0ToeIk1xeXYJS6srGBscxtjoKFLiLKauXsWrr76GEw88SN8vuPFIMh6nN4Qeu6ROqewQaY3azeIcARP4db4tOeYQZ/RFhC68YzTEH/zBH+C3Hn+cwN5lWvEtwQ4SWqZXkSZneKCGcqEoALNMrmKJ2MYuzxN/TiAxoc/a7I2AhYKEqDyIyuABJOU6jVJCmMHgg6cmxFNpNjeIq1jGtekbmF5cJPIqxde//lWKf8zcgkNpogyGPWwm92OXX/H/GfPOEYiPfPij+Jk//vOOdqb/GTtIeLu5jsEK6FUUf3uY/jC0+hu0QuYbHSyutbBGtHabVhNzFUtrqzh3fQqnL13Dy9dmcX2V6O6BEXSTEu49PIbj44NsUOi8m1heWcMqYY1N0hJXLr2BxYXZW+oz7N6Ig41ed9r2zGS8lY1973PnX8Uzzzzp3D/xAtgsJBKoqhILyXT1OmGJycl5zC2vkyA0USOP4QMP3oP3nziEw+SRMF44e+0GnnvjGi7OrGCkXsfIELmqxw/iQ/cfIyazjgePjOOVyzfIJDlCp03CQJfBEmmKs2fO4eFHP7DrELaJVPW+jIu/yJb+BC2y9bOi+87N6c27tbmkLYvDBycwfnAcV65cQltY6tRFLel+CsYFda5NzpJWWEeNcMWxsUHCB5u4cn0SdUKQQxSrKBN2SNg9HRnAocERHJuYwCp5HFWa8MnpGZw8NEbM5lE6+RnSRC3UiOQyhDkGCIvcSwTXKmGLW+y9/5mNedIzFzebDec2bodBEveZyeY173puVVHvCA3Bd7W2uiwqO6HZZ4q527FCVbOPWCgXhInnINXEwBCW2l3cWGninuPHsbGwgOmFNfI+iqjXyiQ4CQmBxemZSVRnGrj3YA332SLGSOAYJx4jT2WABOHwBHEZpQImF1axTrwH51E8cP8DeLu3d4RAdIgf+Fe/9mv4+I/+CGY+9zlxDSW2z8JAwjFUqmBidIjUu8X1yRWcPHoYi6vzuO/wKJbSNgnPBnkcNQzUKhgfG0arU8DY0AAmaPIHyR7UKwajNOHVagkjtQ4+8uAh/NCjj+Kbzz6HSdshDJHi3LnXhQ295bbPZiO7zDYRjp7rbxGIt1+uJPHvtLo/+rEfImaxKDfeaXflffYIBqsDFNGsY7hSR2mAVnq1Jiv7oQMnZMVTmBMl4iCqtUGZ+EMDFTD8LBUOYJRMR5k8kHKtStqjhE5zhc7VxAdOjOND5HEknUcoEnoOz7xxFYuLy0Jlf/AHPyp9yOWtKzWsPY5iHqYnS3mnPAqdG6sMY5/fe4+LLrQ1O8qzlNZk8Y13gIZwdvDSxcuYmrwudLX1DGWVVvfgALmX3TZ5HBaHhqsoj/Ikk4tJ4HONNEkNbdIYx4RoqpDwjC2uYYhiGd20IC7qCMU6ioQ5UjrHJrml6/TzfaceoIjoHB46eRj/+/uvCoaokhlhzfSmrPY7zL3ccr5Ie7wj3E4enD/9p/40Hn7kUbLn6xgYHJR4H9/ienMNw0Q+tUlrsBAktAJLpBpqFMQqCEGU4PDYKIW112l5WNTJVDBjOTRYI2Gqo0ts5frKMppLS9hotsg8dDF8kAgt8lzWmh0srDZJuxA2mTiEY/feu10C1dumFd9sE7Hn16NJ5VN+7BM/SnGGEXzvySfRaLk4BifF1CtMOtHK3uwSoUQBK3JHK2mZM+Iwu7RGX6/g0vUbJBYdNDebuDE5hTHCEuy+Hhg7IOanTfR2iwJhGymH0i0Fz9aR1Cu4dvm6eAW1coJHHn0IH//4j0Bz+aPdFkCP9Y6HYAeiclfe3820RThHT+pdL6aQ/ibvCA1haOV3xEQ8+J6H8Hf+7t+mYK3L7eiSC3n04AFs0uSurm9giQJaqzSx60REddttXJqawWsXr+Pz33sV33/jBp5+7hyef/kKfd7F6vKa5D6wuenQq9XZJO3QBsczWahIpDC3REJEruvx4yfwS7/01whU1mFiqjB+5bpsstdN724vRsj0e7Nve9tiiCzZo4O1pUlMXz2PhbUNXLjwMoHBOq5P0eekBkaZpqSB32ivk0DQZBYpvpESRUtq/tTxY3j56jRGqmWcn5rFceIZJg4fQJFMRdUMYJ3MSJWwREosFAOvJoXU1zbaMmqVrsE3Tp8jIFtDicwPcxiskVLyWNKkLLhDPB0Bcl2vye5+e/KmCsReDggPdnNlHt3mAlpLUzj70h/h8c9+kziFVbTaHUmMaZOZuETBKJgORofvldT7JpmA9XIXy2ttzBMIPHZoGAMU3BomIRgiU1EZrGNufVUioIdHBmkyO2J+ODLK5qFFcYt/8h9/lzwbAqtpB0ePTGCGqO5JEsR2Y5qCZWUcOHIKXYqqFhMSEFJWbTJRJGUoV+u70gpbxs0N3q6CW9ses417G3+Hhfe2BeKtknbue0q2vN1YRGf1GgnFNFYWbuBzX3gSC4QJVlZpMltWaGu+0dOXJymYRRT1AycpCNXFCq16UzJotDex0GiiRIt3NWXquUmuZYW8kUUMjVUwR3GK9vFx3Ech7w67kZyCR15Hg4Qo9el4G2u8w2seJ44cwWunn8Ps9QqOHjuElblLhGeGMTg8RB4NCUHxAEokXC5Hdedxc5FQvddbj1DkJrhnsvnvFLmte0FQ9Ni3mcmw4qe3GgvYmL2A9eUpCipdxCtnLwouaKytUdS6TKt7k8beiAoXV5vGYGOzQza+jHXCE/W0RnGMMi5fvYSCLeHB8cOoJBzuLmF5YRmzc/O4l+IXGxQYawzVCD90xSNhA/A6RTiTQomwxSa5myXSMAfwnkdOYOrGDFrrBaxSHzjVf2J8HBMHx0iDHMHEIRpsEkokx+m71dyeqLuqmbcJhlBtR34DWmuzaM5fwebKLOZmFjAz3xAQ+PAD9yMp1XD9xiyZhlUJbqnUk9KX1Prh8igBRCtp+RMjw/ipxx4h15GAImdGEQs5Rmbjve+eIJayiC4JwCJFMleaTRKGAprdFlNgOHuR6HEStgMkCCcJgxwaGcLB0bK8V0yKmCNNM3ljHhukdlLCHOPkqXB+Z4nMFjoNWBIm0Plurivemvb2EAgJ0NDEbtLkL1xDY4FA5BQRUTcWSGWvYHZ+FRfIS1gmz2C9uSHJMcXECQRrCUv2/9rcAg4SwCyWS5gns1IhkzLMOZNEVrU5pY4mvloeJIqajkncNkBLRNQmeTAFclub9Pe1uQYuXJ+VHIqFeRLOzTbWD44S9jhC2mYOK+sdEbj7jo3j2BFyWVsb1M8pHBw/hHSjLILF2wWLAwdJJgqixYDbI5l2MtnB2d0l5ohNy9tCIHhlNslMzF86jebiJSzOz+Pq1RnML61jenYN58/fwMXJSTku7aQO7TMIJKHggBZzChem5kkrjOLICGjFppgxqygdGKQoZ5liHSV6n1Y6fV4lHMFgkbVIi4Z2EwVsrrdxfXoaHDxtbLidXrwLbJkEq0QT+63nGyi1q3jg1GECr3Vs0GdXF+fxiR94GOucb7E4B87kq9Gr3biGln0EteEjmk+Ft7y9XTKmGNVzrsHm5hpmr55Fd40AYkKs4IGDeOiBUzh+5DC5eEQ4ddYl3sBahJNi+P7YM2i1W7JFD36r3vlrk7ixtIpVIqhmlpqYWe6Ip9Gkzzp0oRVS8fOrbUwTv3B1aQNX51fwBqn/51+/gCphgArvB+36WAOtbqInJFn36uQcKBBO2mASxw938eCJOjYX1/HKK5cxMlwhL4PMDvWzQ0JdTTpYev27BEDPyEbju0Ee4nbXagjWiJOTV3D62e+gsz6F5sIc2rQ6D47WaHAh4ephUu/3U6CphIdw4QqZjJV1WskL9P4gVlZWlTR0fAVnSnc4Q4rMCq3+OkUmDZcEADGR3RLWiKeoVVpEayfEWXRxfYmE4fo1sv0GD5O3cZQ0yKtXnbk4cvgwGsRWNjdXSHts4r333Sth8g7xHl1iSWuVNj706ATdQxmNBmkRCr+vL5PQ1AZke2CBBHfp2hvo2AqOHL/Xm46bjAd2Jzt3GuK4awViaWkZX/i938by1ddp8mgyCfHzZNUoSDUxPkKDTNwBhaoHiTcYo4jlyGgdFy/SoJereOH8OcEQwkeYJPjwlgZe8iZTYh0pRsFZ1Rzgmm5skOZxfJ4lc9Mk28+m4dDoMI4SxjhKP9ttZisJfJY5H5PoahLDH77vETZSeOT+EQyUGHgSfCXsWGccYluEMdYxP93A1elFGOI6wEQV4YjUlok2X8eJdy8LgXVo4tiucEQSRTH7HZ25mD3v9zl2O87irhQI7miZVlWtmOIK2d+56TaOHBolD+AEDpA/X6WQNIO3RXIRU1ugCSKBGOIA0yCm5hbx7lMnKfpYxhIJ0cUr0+QKNlz5HDo3q2lOs2c3crmxhpnVFUmoKRWKGKxQoOvACIZpJY+OELYgz+Po8CiFuWkC6HobJGB8bQaHH3r0FD7w4DHZp/HKmQtkFjjvn0yTrZEmSjBaqJCmKGCBiLIbc00sENjdbJFQkGYjeEOuKAXUiFhr0/vxLqpdbQfcIUvqTttdKRDspl174wwKRD7dT4j9wNggxkgQeLdUt0OeA03K5Mw0gboG5mnA2RNYpwBUhXDEIw+fwDCFry9dm8LC+VXhIBhPSMUD/p0GvGPInpO22NhMxZVtk3C0aT6rtIoPDA6RB1KQCObJiSHUCw5msRvLezh4X8d7HjyJn/7kB0gblSTR9vDhY8SQLpGpGsLY4XGMjw9jaKhOg0seRW0VSWUB95EQlUnVMYdhSFjKFGqvHTyMgaFbT6rZrfm4nXYXCkQiuQcVS3iBGMNkZBz1esXtvqbBrA8MSQh6aOQAVmlx0diS6l8m8wAJfbNafe75M5iZWyezkKJK39mg1S9FQkgIyIkEY7lWp0U3XxZtwQAxJds+v5LiGy9MiuCNDdfwSn0Zxw/UyAMZpphFgaKoxGFQcGxyZh7ffe41EtK6CBifj4XYFMjD2LSYnF7F9MwK0diGMM8Qjt53H5Fmq5LKz+cZJjwyPnEStjaOAnk4HOtwDGVe2d/uvox++ZMQk9n/O3K81zp3nUBw8ura2hwWKT4xOlpFZ8MKj0BaG0srmxShXCSSaQUzC2skJFUJKq2RSSgRRTy/uIDXL16hyVgg7V2UFTwyMIjBep08gpbkKrCJYXPDiTTVellS6jXXNAl+eSKxjrWNLqYWGmRSyDuoVJlPwpGhcUxdmydSbAkf/aFHiY2so7m8gSNHDsn2wVkyWWNj4wQ2G6gfHSHegxjQUgVjJw5Q2Jy0WXONBKNIQk1M51BhF37e1kTcW223olHuOoHgyaiWBggsjmJljcLJzCtQgGm92cU0uYGNZltcyANDRAjRyk1pcsfHxjA5tUAmo4LZlSY4g84U3D4L3rLHtsKtBEhInN9nroI3AYspMVkAKc5g4OP48w1iKWcJa7B54X2jFZ5Q0ghPPv0KfvB978L7HjqOtFgnKrsmrm59IMGRo/fg9OnXMEmxjg88ej8J8zKB4TG6rxE010k7DdD5LbuyRSBXtefWW+yk7FjSYxeSUdwNIo3Pt5tmbvPGpJEnUa7WcPjEw+486yuYun4Zlyju0GXqiczJPcQOcmkf1gLrrS6eP32BhGVZchNY3W9wAKzTkQ00gxSeHqkPhglnQeiQx9Bot/Jb6hFR5AxASei6qSO5uHwQlyDiT/n8rEnWCLAWyKPhSjP3k9t55tJ1KV94+NCI0OTXbtzA+9/3AG5MLuGZl17D8YMHhP08MkEglcLlxKWiVD9I9zocTajND/Iul/WuRttvAlEXt9dPcdZFo509tmbnk+7y2rfZWAg4TFwo13By9CjW5m+Qt9DG4Owc+fgbuOfEhLiatHaxsLqJp154Dc++/LrUbCgVEskDKtHkcUT0wMCIT3h1NoGFxG30TyUjO9Xt+/Lx1k6zaocuYEA2+/C2QL7KEFelIR+T6et2uymFSVpmAzc2V/HIux/Ck08+jWnSQJw0c2NqDjfSBgnWIAZGyG0eJExSHiMAxHEN9n3Ubth8tFNt2c3argXHqcKdznt3up2yIde4PZX1EaKQCwIk+YamFogMmpxGldy916+s4OXXrlAsY43MTBP33nNU8iY5NF2gQFPHxzQk6umzmyUBF04DMOfgzEUSqqcolhDzwZPvN+ZayZWykujid75wbg6RU22cPn+d+jAvybnMV6ytvYCHHnoATz17BvfdewgPvfskCV8J9zz0Xhw8eIhWaQeV0QkktVGkDsXcNa24+1W/y+P24Pb0DDz0XLTjgYceI5BGLOPsDTIfkxgYOITBiYcx0Z4kt+8piioS20jHbm60ZXiLgtytTBpPPNeHYCFhIbOcLWXcRlsXHjewvr6W/CvA0/WBPYhCyQmFgM3EeK/E2XzmDJaWGnj2pTdoxRexuNyUuAmXP+wSS1liTDNPjCbR2+9/7MM4+sCj5JoeEA3GKXmJj8jeDmDcLu9h61i63Ml+V+lbZGRubuG24GvyZiXIkFrnTq8TBby+vIxVQu+nX3oeX/vyV3Du1dcJxG0Kdlgnypiru9DyJ21RljIA3EcObbe6rpKM4yPIdbRO29QJXxiTCbEOhN+uQCaGNAynxxE/wRlTSoFzvsMGYRAuGsKezOjoiNvJVa1KLkWLIpr3HJnAxOEJMh+P4MS99+CjP/pTKJC3UyyU/X6Irp+m3nHsSZDpmZ1+STO7KX6qZtMdm9Wv1GukfgHd/dFO9gQSzo9M8JUnnsCXf/eLmKEgUieUGmRCqUymIaFJSwlvrGFtc4Po7joGCfSxcJQ4FE4YI/VeBmdL8UpmYeItPYkUKU08de1XXeIimk06hgeK917wnlCuPZHSsQViIzmSyql6XEh9YYmIpyIBWUK0TItPknu8strCuXNv4IEH70dSPYgf/mOfcKZQPJvC7bGNd8BK2e2+G71/d2sIusTs9A38/md+B5/59KeRpCLKMimukrtnII2jlsVVpAFfXFuRwuXceHVz6hsDyCJN/Di5ffy9dQKonDXVFje0HWpJ6IoVYSMXk89fI6+H75fzLKzH5/x7i8ko+p13l/N7JbkWMZob6xKjSPwWAcEhdL6RQxP4i3/1l/BjP/7jxEEMhtvMq+2baAi3zPPv7VJDyG9pHw0B+DIK9u4VCO70Fz7/OTz+n/4zGhyz8DfC/3d1u5veuFeFiZ/UFt0+23FORmFg2RH17CZsmMwEm5NNYirrpL65Up31HEAo55c64Kk7qxmYcuNzsWCxALIWYKFh70YxCY+IK2EkAxRwl2wHYne65JjRRx59FH/yL/95vPcHPihxmPykJ70Dkf0aJtrma0z2yE022eGIIMhIs+/FpY/197tSILjmwmf/12fw6U/9JxRSvyI9J4Bg71OYPgid/+5yfKLT8RNoZZoZ/fMEVUpOCDjhdohWfiFy87pWHzlkXE1sxg02c6P5O1IimQSN+1OpVPz3HS0sAhmSWW2ET5w7WRQ+oyyTwSbo/R/7MP7sX/srOHLsWOiD3S4UbntXvtaY3Dp9uUn274Wn7ASBcOfoFYi7j7qmTv7mpz6Fr33u9yjSUHDmgAfWZ1EHSTaeQuF/wph4+2/p2KK7yYL3vZlT6HoB4Wr47S4LSD0zFX7mE0QrO0nC5yJQ3jXlWlSDA4PRPhz6HoFLriLC4JNxSi0pSSCLB53/5q4l4k4nsnGIAyAvf/cZTF2+ir/1j/8hTp66D3vR9Llb8rvN4EEvfOglxIM3cldpCDrlb3/mf+E3/91/wEDJ5SBKOpyfLNEQ3lXczg3mSev6zb6sIVgInD5xwqY8BH82Vh8SMCoTj2y1Kc3NMRTmQrQksvalQqH1KmkXrqAvtawIZP7C3/hL5Alt4PjEPXj95fP40Ec+hC9/8Yt48bnvycww58F94U09LTI3rClqFB/hyvWHT92Hf/avf1WKr1vcXEM4S5Cl09v8YWoc8s/l6jEZ7rtRxVvrxueu0RCsCS5fvIj/8RufkvhFN0k9/5PtseC8Bcv2XMQ9G5zEq31n340nltxhiaTPdZwdl+QUKwxjjDm4SRU6Y8NqYgygjxmAxwUtXvkkBDy5D37gPfiJ/++PEzcyT8zqIEUwKbhm5mEqFoOHBvChj38IH/nEx/CNL30dv/Fv/pXwo9xPFiqulss4qMMv8pYunH4FX/m9L+Bnf+Hnpf9hTHYBKlW76cSGZ2Ug0wz6xm4clLsmp5LjC//h1/41DA0Q97zrV3fibzjxZYqVPTThFSIQMBEtxsfwd7S8sfGCwq8KgcuKlCLMRk+GNBIO99NdW8/Kz8kw/v2zz72AT/27f4uvfOnLRLMnUmPq6qVrmJ9fxHB9lCKf61hbX8OP//8/iZ/82Z8TTWQ8QGWT0/F4ZJPj9nS9J37vS/LYpztu6j5i97GnuBV+5Vf+0T/HbbS93LnFNvZ//Jf/hqe/+g1R7sovlP2k8YSquGvxDWOy6U/9ChFNYbb205pI3Rqn+llYKokrVOpqSiKkpOvfiV7bn0ewAEwAi6bLOZSbeP3SOXlyzyBxH83FBpmEpgDSUrVC2GNT6mi/8sxzXpBdr5njYKaSsQmn5bkd5i188CMfxp20WxOEHvcVrIVVt/Y7/HaIk1ts3Ikzr72Kr3zxD/zfbvDbNGklVq/eLdRaioIJPKa4mVDq57wqrbf/8rAUMRcOaPYF9QrIpSyyo6qlEGriPArVIDw+HDvB7CLOzi2Lzbb+3P/nc5/jC2Ds0LgwolJzWzK+UjFtymu40sss1F08+dUn8OM/97O456SrM6ERyFzVFw1QxR6HaklPsSqGMMjMyU2b8aDX/9739WY0pn8/Ty5mg1St9S4f8wVrzYYDhZFrJGRQy6XWp96kdL3q1f46EJk1xQp8TtnNxednIUvzfnjv/bIA8QBzJpSGwNkVdVoko7v5ekydM8G1QZqgSa91fiJP2hUTsTRNkc6r18RV5b6767nZ5nuQ+Ip1ZBtjmy/99mfpe/rMM2wzEVvftP0+uuVJNG8tqOSbePq7T+H733lKBk9RPqtzTk6xUkwUEqNgN5FXGb84A0oxgt6zUMjNpkPqqvqN4xO6khDjVqNcVzBJXjPaPn1jYRD8UvDElP4Nh01kMnk/BzGTvLGXaXLXF0dUMaXNl2iSV8H9YsHkn5xEw/2V4qrFQtBkbJJefPo5TF67jiMU/9htMxEzFYNK/yF2pyJc29F7jJ86u9fag/u43mjgv/z732AKUFYhD5BqQvUseJB4G79OBiehJP4ZGCYATfbtN0VVymfybAuXyCIPUiOOgCeCTUSSuFrXCtZjLZG7d09OaT+0TwWNUPIKt24C+DrLqytOixTdd/jFHgn/rA8MSJDMBcba8mA3ydOQh7s5sCn3T+OwvtHE7zz+W72duflg6qHbTH5f86ogOrrAjl6GIup+rzttPIh/+Pu/j/mZWaGlxR30JgKykgoUb9iUe2X1yxFE2calJFXuP8ieTuPduhCe9v6/uJ9+kmTHVaejPmnfe1GyN8Yq4b49C2mzo4RPWCSBYKAozGgkbB1PgrFQd8UtNFIxlwWd/+bd4vqQOBEKOva155/HlUuXELyn2xjzfgu3d/76pSq8NW4n9eP65DV89r8/LkSTqweVkUmiamXbXEeYv9TXrWYt4P721WM8DmDtwSuTm1agU8+DV6HmPYjGSFzASYJivY86CrERD9D6LIDAlvr7UC+IcxxWyc3kvshkd12ZI2VSWQi5ThW71/Akl+R3+uMkWYfHgbQEE1df/fwX3jQcF7fkTXAktja66P/+9ONYXVoOMQpNQBHwRa8GPxWHBcI/WnGD3DqpCkM8RbvbCSuMX0wFy2MQjMnR24KwrY+D+MclKCAMRI61W8yGfhZWlO9z1n3rd5Vn1+HczTXCMOxGqvfggK+7v2qtJjUvFUzyPXAAjjcIceylqwJBQsrpeE9949tYnFvYfgxjjbGHFMD+awgZVEciiX9Fk8qPEfj2l7/mJpb/47I9SKM4hQkDyepZnn+hrJ1RLeAGL1XUn8eIOUpXgk16buUVojiFHhO+F4TJnSGNmEA9xtHY3XB8QTySrrCZqv5TL+Ty1GDmG8jTYQGwXpCZxq4TBd77gHYJs9Mi+J3/+WlxYY0U9M6vXBdEc9sUlZFNonu5mXnf7v031WSIXaP7eurJ72JtaUU2y6Tebex1/3gzLj+8RFa4TSV+kPp0ene8W1Wcy9Drq2uz0Xm5saaRrXyFJASaCskOxcD6aI/sI/eYaBYC5TgqBFzX1hui1az3aNQTYqFYIZPSIE3HHMsGmQ/1iHLn99iDF8vp731fSh/44AW2H9W9a28BhrB48pvfdjkEHkwGFexXMP+skXpt6aSzivVuaDcSBv6O5C+mjo/YTvWHLCjjsqA0AKTAb/ueoq9JiZtqKWE+CVy2xRuSq4XvuAQdK0LRIBeVTSHzFS7g5jRgGAf/NCDGIjOkSb/z9W86ELtL256YO8tqfdNSI7nxJDDH/xKhaGEgfQTQ9giF3jwXHXU1Hlxug64GBZSsHbqepHLo3kbqXIGlDYW2xOUEAkHkQKfdpq8ZQFVvIvYupJleU5PKhG8wZ+IzELRPfG0Gxsyv8H6RDRYOGguNOOosqqstbCa9+W1iL9l8uGN2ryUUzIq12cZ0ZJ5T5nG8uRqCeveVL38J6WbLETtwgE9WCGzuxa1GwSQGjDop3OIV64qBwNd5QP7lKdz4PSm7VyiGyUMMHPu6n/6nccIQsATsFspbhDh1G2Fa4taa4PuF6xvhh4mo2hChcPtHrC9OZzxe0oQgfqh7iqsX38CLLzyXAeLevsasZtxxHQTszB/16pM3HUM89e0nKbQNIXHKrAGkqHg7S4uLGttkGSQxG+3AK7gBc9ij6FlE5NeuvrXlj4JPZYsFDNHvCmp11bqEExu0Q3xOEbo0D4YHGPsQHa/aTn76/9h74rtk/OCqbGsMAhFeSTPMYF2Cz4vfey7Xp72CDf3M0L4LROTBY2FuHhfPnAOnOvBKqPh0eQcOuyHKqZ3VgJYSPjk30TjCqtflUtMRTIhyFhErWZZteRA6W68Vru2FLqOn1OtADnO4nzZj+/xPyddk4Y1czrTrUv86HnzyVgJhTZFpLj9Ecg0RIvpOQdjWBC99/zl5dpi5yQjvaj62MR0qaLctECaXk7D9K+uwwQvPvyCeA2+ccTiPgFixKjE2N3iZxIYsYVhHS6v6S5Lwmapw6IT16WcsHOE9v9HXfdXmJjkAeq9y1eMz/vf4Gr2AU4Alh+x5l1niVr9NM6JMACRHPbleVbnsv+PC7bG7KzEPfoKg32DEwbHrl66i/zxkKsP23Gfv5Pe62PF9yPt4M5/KR6N5+sWX0Gm53VWpT2kvFQsSFOJVxNXf8sDSFRHrapwj6jzjB+18Gg3mdi1jGN0kOb890WUv75skAlkaSt4mKure67lFzwVw2j5HQLs+x1KTWYMZAQKRBh/S18k0PgDGL+M9MR6fZ7/zJPbaxezX3qRop5VHMF84+yojAgKBRvZFskZg4Rgg8CjkjeQMFF2qnNUNdsbHIBDsLA+LJrkIfW1MUO3bcwrORUSUMBObH+uzuyVCanwOhjJeFgHQ9bBfW2EKPwOWOBNmVCV9P2g9K7wLm5NaoYQy52hY93goF7ktBGFIPL3e9bvNODB29pXXRJuke/dY9r7tFjXETnh153bl4iVMXrnm8JPaaM/0JQLGXK6icwndFZjXd8kkPmdSvRDr2LwkKYTz6+rvbzgQrXorybNicnTFdtMQ81CXNT6fahO9awnGpXaLF6OPKuLk4E7azQ2TxGjIu+IQfb1Slc+cgGZh/ELEnvL9sSfijrM4e+aseB7x/Wy9x1vjIPqZkFsQiDuLdr70wotorq5Blr2scg/ZrDD5knPIDzETJB6DSyBMlLXxBNitJIq1HofYnrez99zq03yGxNfCTNzzvv0FrTcVet8xcHUmxJFjynMEUwR1L93ekCBcxoHoNlH03Hg/RzaqmUuqApvKwsh2k3F/ivR66Zlnd5x0A9x0bvov6dsSiNtvHPl76tvfcRwA8kBOPQEGlczzc34hu6Lql6u6SL3v7wYwA6BhQgJGSL1XkYN/PkKqKf2uD7xLnF1fBnglyZcoeA3WDS6mQaZ91M67viuQy99rAKhdZ3JSj1mkaDvFMzifo+AlJ3c+b46EXxEiSllb9xEbsdPPfB87l4i58/amCERjrYHLb1wMAE4XsI0GXAp4kJrkDbWMJRQkOpYvIp5UgDhFDcjO5c/n5jFv29X262OXHJ7wQSTvcbBAcC0oXr3ycHivGbIIqu7rSCMBzN9nzLg6nqTr4if8HRKQMmMHOne2KBDMkabSqTYMoDY672uvvooC9rdtEYjtXcjbQ7j8tTMEiNYWV4KtzlZ1FnxihS2hYMINNalDmXEEgfXTVeVPbPuYL5noNKOrfS8CeOT308jNdOnwymfYkGUlbmPQDGmur65tXalBWNn+ywbiRIqV8d4L3l1erVZD5RrrYzJqtkKCjC9ikgHlLCy+eGMOF4jHYS2h2eEmuT0T/pZFO/lmvvXEExIeDtFHC/TN1uFEk0K2WytsS7Nw34/ct21jEEFN2NwE6kpPU81lSENE0hFjLkKpq9tfNridac/5+l039Z4Kr3gpus5eE12XI7cadLIWOV4k9cE7SayRmIz2N74f17js4vkzZwI/sh9tfwXCpPLo5bMvn85AWJoRTnFTE8HZ0czScVBL1aXneFxWVbS6enV2AHZeHfcYjnBVFag0xh9pPslXBctmHcz3FflVpiF5fo9jFPVyTdxMDsxpVpXzkJyW7P1e1tJtcQlP1vmXz0D3muxHS3K40+zxVajX58+exbUrV7NB8IY/TXvBYBZ5rHNWNR0ou5rkaJcMItlEpH43faJq5nEg53AG3r+PlnDb9/yxxoTvsaCxvZed3R01V/7q6okkjkpmjMF8QcEn26Q+OdhpCeducgE0foofYxNYpzVaFONwOZZp2EgczBcigfTz4Mxf5mHx7xfOnsfiwmIQ1ez+Mt8h9iK2Mw1hVEzmnch9qn8e74Tas0an+9IX/zDkPuhKzDKE8hPp3nMBHbG3GS3oQtfevrMLV/Z1pGwkzwpS9TuxJjJZl7zAWMlvbPsQOn/g9l04r0gfz5S520lI/U8iRhPI8x/cJxbaUlL0m4q8q+tT81v+evG3XBkCD66RAWAxZakPl/udXYsLcwLQs/v09xVNfC81sIWqzk1RllbIbd9Mhqanv/bCaQFVHevC3Dc3fb5GA7uFPuVd/XOldFkNyya8LdLfY+8jDQQ/qSFeAafGuwIsOwHZs5dRIlCbcS75K8Tb/pyQ591o95kDhsx4KmjlY1mIRaCKPRuFrN/zraQU8xCsrdKO1yhd0TYsTPxg2QuvnkFcvvBW207Lfl+p65mZWdyYmpTJjXkH7tB2mTk6wIIL08x2hqqzqeMgsgih3SJkQbEgQw7WexohacY6P1824cIBzc3uprxXUAzh7EoG8BBNfgYuoLUVem+EcyadADpArOxm3Pd4drSulSb3aBO3mM7Fwsrff+P8BcnR5MWx5cZ3CTa3O7S452ZCL0hXu3b5smyIlTI7nWxFOA8i27Yf+/RqAuSpetDsIRv4Cn6PXTidpbDCNN4RtRCn0CnzxUesJy2EgFL071kofk8ikmFPqReswCLa4I6qKXFa3mbbAzxI4aBUS2IVWfY2P6wtNl9yTvqRclZY22lGTQR22wYKMvH8WAa+BueFvPzyS2g21jA0MhoipcFz896Yft/2WTC9zQbuxu6jyaDX8soKugQMmV/QXVDG+16BNfSA0fR8VyehE5Jw4Wxrmvrg0y76IBPIv2RIPnYP+QErXU+CMYvKEUjOi+SVaALyzHrl5Qgx7gI8TeLJpQCafQyG2cmCL54qXxWN5DSKdI2O5z2drBnCyWwmDExkVUuuSLu4yfwAWyL6FhfmsWt1cAttX93OFRYI79PHKN2YLDrZz7e3PsUekY0NQMs6yvlmLXgeon4RziWTYbt+97dGHLuyi1t2dKWZV6GOZxAi6aq6hR6EBTBuvVAkAaDz76whqhXHgHJfdE+opIXChuQf47ceihejgkDfkdKHxoSAm2jDTirJRtgH7b5vAsF7CRbmZgMBJANkfOKHLyBuDHKgj1sgj/z7iVLIcIJi/ESawAVE4FK9Df+S87mTepkykoIvcRJW6aQNajxZNOiFpBBIr8wdTqP74X/T8H4aFTINLlviVXyhGCKYAlo5jE2uZjGKzhqv7Yx3SUUjeAqdw+ccX9FHTSLqFzfe5njx/Hn4SCGyfMud5mNrcDIeN81O2zdQKTfMpAwiLeBnicPDQuEG3zuCf+FY5G5G3T9xQXMussktlOxM+fcCgPN2n/dXci4CT2CpWAzmQCda7XK63XY/OBqc/1etBwtkzm4GNq3fCyKBO18Nz/j7KbMp9dpEHhLjSyZZn2SbRPtY3aJy11rzD5kzJtgw7SRutcUAc98Egi/QXF+PvIsUqgg0LIxoO78NKh1hjoO7CBO0iuYa5tD6zfoSCaROGF9ZdoTxZKV5DCNA0WY45qaUtYIxgygNMONO9J6lHCJjCtYGZefNhKWduFrbXa8VGQAXfK9ChRzlP/jJwhOHALP3Cn7/NAS95hcWkA2P+5fHlldL2k6dBkkK0RF5ykRNtbEZiylUsBxut2qDbV3Z1IlPKss5et9jA5PxAFp9NvZ+gnCiH/fh+i5ykGoanH9XiLSiS633ap9D+92WlQewcIZ2OcnOq0SYi3xCKvcO1geCMCRJVlzNuZx99KF0NnK8+bzbeBp6PXdr3hxhnxp3njUEjK60xNG63u7ybm0pr9PtZpHF1K22jDvwHfdlfazJ3KsMbMb2Itv55U+hZ5B/hfBKsxUrZYLAqzKzqdyXrgd6qktj29sXBHuzp5/pIaoVpE+SX0naiCaSWUyXcEsurmPYIntuuEPy3TILkz+HmFlkCTPDI8N9NWSc5pdpXBMWUHycLlIF+fz/vgmE1mnIr/nswtwYQctjkEJ0MXPthAKWPZLWo3JmOhNX0wG314xb9jJA/DwNLkvMret3RjnSqyvBKd4W3/H1rCx0I21sbfNn7vc+3wMXXu/64qX81D/2OsQE+knoeq2l8gfvXvL3qj7VjrO0LbIJZq02PjGB/Wj7JhCNRgMLi0vBEliP0POrzMi+R3SNzxLyapwHENkOLs6dZFtfSGxQm7fT9LquHgOdy7oNQ/zkXYts84/L18z4AniCbLv0wQz0WkTyLt/WKv18n+U09e9ah4NY6Jw9DBiKgeUAxXHKxWIIbEn9C+/SiuchwlLBfrQ9E4jegeIaB83Vhi/epccgv5C8xMtqYVdSXCsXENJd4V1fXVVqQ3ih4ZVb8IklO7WQghcu56a340sNS2lAmwbSzKH8okwYB73ybudWYQi8hgeQCkblM7m2chEdVCiCy1yHcAq85YA8CCmM6utWsCvNof8BOo4/XyNzqzUwgmrn2lakLeqlKq5cuYKT73oQwA4PTzFZGH83TfqBfWrLS4torK46uw0Fanl1H99I4pE2J7u6bX2ZmymdZZ6fo4hkVzt+tTpm0MCY3RsRlUm1oDz4ujJdp1RL+Uiqdz/ja8TjH+hta3JgNPXkGmsiftgKGll8U8kycXk5RsF1Izx/wY+fZkEo+PiFCmq2AAzFXLp46unv4cd+4id29IBup+2bQPCzuxvLKzIwrOpj8JcfXG8WxKZmJJRStwoSdasfFzXPUtwLUnVYMqZ3IRQKnpIAW5FzcR12SRHnUfpDeryMPpNg4YNu8KUUU9lq2PUZWEmhKlqTj3MT7NQ+bzWQjUt0fqlOZ9xjqGUM6FgGlly8rFapyS4uqYRLAvTQA+/C3oqCa3siEP0mY+bGDUklD8+j8N6B/0YPj5JZXbHciT7APd7Y68sc88pL3F4K54Aa545vgy16IagCOt05rru3rNLHSfQYvjTtO/cmPBJBvQq+uTQQRyyiHR93EA3kM8B4l3ritaAwmnxsKQmMrAbL+NmgrC2YMCtJOcPE1+MENtJNfOJP/Cz+5C/+QuZF7Kbt4H7quNxRcKuXBu25NqauT/maCInHBGmOfg2Y2mhn4Cham9+ToUKh4Wr9DnMZem39rnNds9Q6zZDqfRU896EJsYGy9l5GoHaRxw6BPIuZU0QLwudrFhOXU8nBMgaHXKWO79FlimeFz0K5xdQF1zgpiLmJgWpdvsPCYLzfzv2S3W20yJ584ltYmF+4JW/L9Juz2NyYfcYQK6srLos6rixrNQ/BFf9U91L+65s46x9ToASL5/tZbfK5NeUrHpgkSQK7qSxhrORdAQ0febQINRlcnmIq4Wm3GrPJ3woms8c+bsn6hhWTxgBRd3vp/ozFxooA44I8hccH+2Bkf6vgIZ8vIZS1J8lgsvA2U998rvbaOq5dvoKDhw5HfdobA7IvAsEuInPtvZ6Am4Q4HhCrXKMGIAfiXIaS25Us9jOKKPY2TWaFP49oEo/CxX+PGENVnqKdjGdCu56j8Bt2QmqD3W7PqMl7OgbBM+FrlPyGXakcw8QUgeIWhbopwB7MFIy/jgRSuv56xlf9Lzjd6cdHtJ93Paenp3fo1+23WxKI3V6cmb6FmVlHv5osEKW8v/6u58yr6ERqPYs7mrhyAol/JAIDrLByevqlVeUcVslcXM2sVmYuxFG4b0VX7juseCDgHRa6NMqh8K6JMzdh1bqn8mryi1NHWURTa08VEwcaWWs0N3zhE+O2MzIPUtRXUghbCwVIdzuZ+fP9K3pzMz87GwRFx8BGHpn0O7U7zmUwtVHbew3h5sRVZ7OO43f9235vg/Hqkps8wsh40FVwZX8TMRGuXHEhyjeQ/9XvDwPnsYe/sPGgNd7drWbF77UNeRrasqhmfrAz4GUQfExkGg6xu4ysmj7jHQ5nDw0MYpUfncD35K/B2rSVOiEplBzNLVV9CV/E2wK0f6J1SbCWJmdCzsZetj0XCKVBONVLTUInTXOumzS/hLcQ0dZNskskcatNtIU81cY/Jzubi+xrqW71j1artTnKV+2+TGia5TYAJmiDXDKKVwsqgKphpAthR7prCZDThKF5oeC3pDh65JmkAiYz4WGAyeAy7XYUUctnUgjVcEUa5x0NDhA2K2wfW7mTVtwtVN1tBIEnkyvNzc/PQZ9w5xJDXGxA2UK+2SRGfH4irX9fsgT8nCgw0+JfxdwD05ENMpBzrWQibdYvr1QCbQxE2kCPi7bGxf6Q8domFEBFpq4RHQcTVYPx5+/4HVyaNaaixl6HbVsByKzNJNua3FP2MCoDLm3OPR+0HQSG/+aSRKsrK+j1ifsJSGYakDs+2+hjwviwGduXJNuUOr64tOArrKXywBKWfA7Z6v7FeCubdNB32CgASBGYPWlKDe+EYyKbisi9VYDpZ0w+C8mxHnekyiL6pGCJn1ibP2fgLYDefAyLrRkaNrpH1lxFX7zdJfs67MJjxEUM+f0yxVTYvDDFzdFRxhycXFvze0LDtkL2WGZm/GLKHl0pXewnFMhnhcdP7usdrn3AEFnKmNtf4VQed1t2OzHy1v2TCnqsT6BB5F1EYLBaKAlrZ3YRv+htNsylVqVxDz9zsCbzKoreVCgv0bfcH7ypMDYIMLxAyWSpgPUCtgD2CqhRHMJtVkYO6DIn4SK7BQwyB5E4rcEJuJw7ImmD3oNioovrhO9H2we3k6R3cQHrFNhir8B4W6gqz/gHiSTyeKNMtRpf1UUHSPxxb38r3v9W07H7nsBrA601kQYqOe2p++Se/10Qz8OVDehuBazGBMyh/Ui8HUrja0a/5zQGXatarWBtoym/l33NzMR7UxxsW202XF0pumeXei9fRMsfxzu4+EnFQ7XSbbucpk9fte0LDzE0OEiIeoBMR4rED4soVL+SJAlG3U0P/jQJJlSL8WHoathFlZE0ux0I3d2tmkcnVrbs6THee5D8yC5CeL1fvEUpa28ztpgvJ/vehY1wTUYxWxECxgkc0CorE+nxBd8vp9g1sSFehiQkc3FT6/IyJSzPiUWbbRw4cuimgDLes6FNH0u9HYm9LwIhT5AhCU/TVuAhuv6JtxmoRI4CVnSvA8mhYVnNUhGmmksfjAeiFwNtN0gK9DRm4bbuJY5aj5rupzB+L0X+nDYSCjf5Mv1R/QztjUyw2xTiNxq5heHS66uoS1Z10ZN3fmsCC0mhGIqrMp/TSZSxdAJuiOfgBTc8OIT9aPsiEJLtJBihC51J4eyjpjY9KFYTrUrjNInkK6gnsrcdFEJoW+GB81Z6AZoTJgQXNLznXaFe4Sz6WhdSqRUI2wgZNJZqA+654dZVzyl4LVipFIN5FFqdg2Pe0xas1XYPhL1y/g2sN5u3lShj1bPr0/ZGIOLJVEQvnL4DigX/xJmQB+k7oyvI0bi+s6zmuvCJqZy+Xs5iAtEkbWc2eic5AFXV4gHMZTR2fK6Q7Kou7za+vlR98dfTZJi4S0pLCwWdJkH7sRDI80iBEIZ39DqQMWUIzCvjLFeC0Qfl/PpotTouLuP99luIe4YCrMG9jsD9PgW3PHrmlSgFwtxjlrWWkru4DY89FHQv+yJdzSd5ZKGUBraEypNsoJUriOjaXknvnbrACSQ+tmGycJja99STWurB+LkMmimPJ3wGN/KaQ0wDemI3NnowbNf3JXXZWHx/xaLnJSJSDF5TKNDU6XYJNQhxnNHxAxio19x44dab4x30D4SB2zeTYUPkzsjVXSpcFvtHWLVa01pLEGtxjK7LsvaqOExK4hJi9Dra0j6aAYob/GMRZGd3jpRiYTWZYHiuQFe3yFHiepfmqrxEGq3HA7GxwAVuxQfdrKt7rQ+V4ywpKeKaUSb+XJl54jdDfqfnM/jEpx58INpeeOdNQea+JciEz3TgjJu0QpIEd0xXb1wsVAtntPzDysJjgxRnRCRLL1LO2XsTMYw+IFaIkKnUkZaU+IJcu+MBb9eDzUBmwWBLkevoer3mJK6j7frox8HfgxJb8iwxX24oK4rq9UE/k2hcTol6JPfcf9LR74nZlVA4OdoePOi43rZAmGRnm2V0nVjNd2DPwQergPAsrdxeSuUKrFOruo0+8w4y4QgsoM3sH1SZm2wUEmPCA+R7GwtCuViR6xXSQni4m6hwU3BEURG5csImUJ6qZXpMBwM/k2a4ykZRSP9iZ1Mez+RNIz9QUCntELgDIoyT5HAYn26j0XRJush1Z+cZMX3629P2wWQkPsCUQlk8h7k8/+BtsIo1T5SnofzkIzzVLomjhsaBMx9FCqAwG+zIheVLetNSUHWNrepdq8GJb86gzbpoo/HInzf1iPUwioVtZL4cd7EleQZZbMQEgXafyLUtfKKwkzK3J4W37bkHvTraPNaK3uOwUf1KOn6NYxmFuLDJ3rR9wxDc7UKkAgWSJzLtSILKd81lCzESdxtjtJZUSGIxJocjcqo6nCR/nDHxau6/GrppeCyK50F8VNRsVcOqqVKv4VTVu0026Zb773dNMUnWLZTUF0Ipes2QejpdXG3OoSgUskIjKuRplr7nngZg0N1LacA+CYRgwWQrYWQ0P7LXRfL3xEJQRoniCiV5SNla0xXnit1EOb8SWbpijE6QCcmqMHkB6tf4ibsZ45hVqXHXsJna39LZ7D3nfibhO7EwxN5QqL3ptU+uLBIi4MxAUbY3upyQYDJ7xkrGcVemYpfNj8G+CASveK4h3VlveV86S2sPJI4OtL8hR0BJopyryuZzMd3uJSvJMnq8Dk/iJ17T1o1GRH3bbqXqZbv+4W2JEFWJf0haJxv01JmyWFNxUy3h3ozrZRlfsijFlvA6oknUc3t320R5H3oN4WhSVwE30b2tepDrDPZSHrTt+X5yHkC+icHBYZFwLckX1F6EHbIyf1klem6sF3hTjtMMxnkAiAbXZsfqY4iyJ/j0TIKNMrGjlyTDeoHQ4/SZFTroyiz2vcuoop6NjjN6b3qurV/NAmmhzqXP/oZ/RELwP7N7SfxYOgH018Het53PaXZ47dD4kcbj4wc91xDZ8eiYfoyiRSwwDpC6VYPAKbhj/TFekMJLq+ArkE2zJ+/13pCDvdafTUEg8gm8dqufv8XV1Mv1kZvce0GzuaJpDFxdmqG/o8jT0kIqTiO4/uYwk0e5dq/VA26CIW43vMrp4mNjY+4PvWHk3R2XZNqL0OFv1m+j9xXvC7lSPD7pFibHOkaXirRqTzJudBx/0rHZBGt/ctS4ynPcb2sD6HSV7fqPkdMURhK50yhdz3k1LsTO+zS1nFCobOtjF66PWqkvm3zFTwMUQIz3ze5V2xcMwQh6cXEx5BToClQXbqcmC8A6gNklYFk22VNmlAZ2riEfvfPJ+gl0eHCq1yDiWWhOBKN7n9Ulj3/qsxssi9Biy+X1UdSZytdIqOIKzRBzu915e2JRvM0kbBeQ7cwkFIbjOVxNn/dwSD6pDa4st4OHD2U8xB62PRcI8ZnT7PHFiVXfHLuSZklNh5t0rVmpq2frfoxdnrTnCu5fE8yUnlMyvZRptBn4VSo+xCVgthHszCNQzJQkqvIjoWZOht5u8vO/06Ikw/Cec1dj2yfrsFYsOPxkOp2gcaRv1JdKrXqb979z25+NOlyfudMKFhrbaAYlheKm2DlJeus+RS5aandE1+px5JrNGS14hBu+4XafO7OghFNvDGXrVba7OnKeRWzmuCArE158f5zK12lvCitbHh6VrGzJDvM8BA9aRwJhHRf/4RT9Qho4nnyIbeemAbhtP1NvD/vQuK5SiRNkbhP4BNhnnaqVZ3xHfnzvwdnK4zdspKpNYPbilmEVONCJzGWNSSl97qgxWRKLnsHa/GMN+omHjT41SRJMED9lj+9Nion4h62tNtddpRnWEqkLgnHWFP+t7mggx+jzwZFh7FmLhoc1xBK9RrGHTSTYazNrtxksu3MqXEGJJp/9bITFNEHh979unqbOexd+xZoMy4THOLtAS9w79OY3mCSKMbgLRNd1n2t+JWzei9JYjggWeRgd/1Qfnlh+RCU/h6tScI9RYK0h8WyOcXABU18wnU/Hd1YjMMnCMzi+p1MWGgvEC/T6JPasuWGr0k16HJ6fPo8L3KCGgn5upcMnnSCbAN1Psa1uVBTa6xIAeS5CgS0yTFMwMUXtzuG0RMyKqlBHzKf/10bXUXY25tvygmND4XYWhuGBQZpsVyykgKxwqWooV8/bRThj72doeBjv++gP4OiRo76Ppmds+g+Untcqut/ymbz/u4T5un8dTkvsUXOrusBPuuNyvqaXf/ATpYANYSpyNK1S0S4XM9sGqOYuNgfBPvaQT3pBBXjxMZmm8a6kxxGi3Qqu4LgXSajbnAWubPh2MCLerdTsI+1/7p7hPJG2bFNwVWLUfU78vk4TvhvlWlobamXPTE7h6W89idnpmWDykOsDdm62D/5y3VxKu52/nxBfcImE4jF64/PYo8bj8FM//dP44R/+eG7Qoj5F9SLS/AfGF+UqZDy+ZCN3OiF9Po1Wp+IFIMsmzk2enxR9XmcGFv2xIbjkczPivRm+87q6Uv80QH2FB85b1yMV3Ex447LDJvAfbf98L0jhM5e8k4Tbccenue9n2kkY0G4aBOem7eYYbomO+Qa5+I+dOnXq0v8Fk2ibZPK3NgAAAAAASUVORK5CYII=">\
//                 </div>\
//                 <div class="desc-text-info-img">Men wardrobes the most special pieces of cloths are there jackets, same as women love to have small trench coats or cardigans s in there wardrobes, and Jacket is for the mens. Collection of good jacket always help you in stepping forward to dress up in the best possible way. Jackets are the best addition for means clothing whether the climate is warm in summer.</div>\
//               </div>\
//             </div>\
//           </div>\
//         </div>\
//         <div class="search-list-template-clickble-plain-if-img">\
//           <div class="accordion-content-info">\
//             <div class="content-info accordion" id="1">\
//               <div class="heading-title">Heading comes here</div>\
//               <div class="desc_text_info clamp-text">Description comes here, description comes here, description comes here, description comes here, description comes here, des...Description comes here, description comes here, description comes here, description comes here, description comes here, des...Description comes here, description comes here, description comes here, description comes here, description comes here, des...</div>\
//             </div>\
//             <div class="panel">\
//               <div class="inner-content-panel-data">\
//                 <div class="img_content">\
//                   <img src="data:image/png;base64,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">\
//                 </div>\
//                 <div class="desc-text-info-img">Men wardrobes the most special pieces of cloths are there jackets, same as women love to have small trench coats or cardigans s in there wardrobes, and Jacket is for the mens. Collection of good jacket always help you in stepping forward to dress up in the best possible way. Jackets are the best addition for means clothing whether the climate is warm in summer.</div>\
//               </div>\
//             </div>\
//           </div>\
//         </div>\
//   </script>';
  

//   if (type === 'searchListTemplate') {
//     return searchListTemplates;
//   }

// }