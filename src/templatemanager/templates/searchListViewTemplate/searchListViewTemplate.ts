import helpers from '../../../utils/helpers';
import './searchListViewTemplate.scss';
class SearchListViewTemplate {

  renderMessage(msgData: any) {
    let me: any = this;
    let $ = me.hostInstance.$;
    me.helpersObj = helpers?.helpers;
    if (msgData?.message[0] && msgData?.message[0].component && msgData?.message[0].component?.payload && msgData?.message[0].component?.payload?.template_type == 'searchListTemplate') {
      if (!msgData?.message[0].component?.payload?.helpers) {
        msgData.message[0].component.payload['helpers'] = me.helpersObj;
      }
      const isSearchSDK = document.body.className.match('sdk-body');
      if(isSearchSDK!==null){
        msgData.message[0].component.payload.isSearchSDK = true;
      }
      else{
        msgData.message[0].component.payload.isSearchSDK = false;
      }
      me.messageListHtml = $(SearchListViewTemplate.prototype.getTemplateString(msgData?.message[0].component?.payload?.template_type)).tmpl(msgData?.message[0].component?.payload);
      SearchListViewTemplate.prototype.bindEvents(me, me.messageListHtml);
      return me.messageListHtml;
    }
  }
  bindEvents(me:any, messageHtml: any) {
    let hostWindowInstance = me.hostInstance;
    let $ = me.hostInstance.$;
    var _innerText;
    hostWindowInstance.getProductPreview(messageHtml);

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
    $(messageHtml)
    .off("click", ".show-more-list")
    .on("click", ".show-more-list", function (e: any) {
    const showMoreData = {
      groupName: $(e.currentTarget).attr("groupName"),
      templateName: $(e.currentTarget).attr("templateName"),
      pageNumber: Number($(e.currentTarget).attr("pageNumber")) + 1,
      fieldName: $(e.currentTarget).attr("fieldName"),
    };
    hostWindowInstance.showMoreClick(showMoreData).then((result: any) => {
      const isSearchSDK = document.body.className.match('sdk-body');
      if(result?.message[0].component.payload){
        if(isSearchSDK!==null){
          result.message[0].component.payload.isSearchSDK = true;
        }
        else{
          result.message[0].component.payload.isSearchSDK = false;
        }
      }
      
      const listHTML = $(SearchListViewTemplate.prototype.getTemplateString(result?.message[0].component.payload.template_type)).tmpl(result?.message[0].component.payload);
      $(listHTML).find(".show-more-list").remove();
      $(
        ".full-search-data-container [templateName=" +
        showMoreData.templateName +
        "]"
      ).before($(listHTML).find(".parent-list-template").children());
      if ((Number($(".full-search-data-container [templateName=" + showMoreData.templateName + "]").attr('pageNumber')) + 1) * result?.message[0].component.payload.maxSearchResultsAllowed >= result?.message[0].component.payload.doc_count) {
        $(".full-search-data-container [templateName=" + showMoreData.templateName + "]").hide();
      }
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
    $(messageHtml).off("click",".click-to-navigate-url").on("click",".click-to-navigate-url", function (e: any) {
      hostWindowInstance?.clickNavigateToUrl(e);
    });
    $(messageHtml).off("click",".click-log-metrics").on("click",".click-log-metrics", function (e: any) {
      hostWindowInstance?.captureClickAnalytics(e,
        $(e.currentTarget).closest(".click-log-metrics").attr("contentType"),
        "click",
        $(e.currentTarget).closest(".click-log-metrics").attr("contentId"),
        $(e.currentTarget).closest(".click-log-metrics").attr("id"),
        $(e.currentTarget).closest(".click-log-metrics").attr("data-title") || $(e.currentTarget).attr("title"));
    });
    $(messageHtml)
    .off("click", ".accordion")
    .on("click", ".accordion", function (evet:any) {
      $(evet.target).closest(".accordion").toggleClass("acc-active");
      var panel = $(evet.target).closest(".accordion").next();
        if ($(evet.target)
      .closest(".accordion")
      .children(".desc_text_info").length &&
      $(evet.target)
      .closest(".accordion")
      .children(".desc_text_info")[0].scrollHeight == "18" &&
        $(evet.target).closest(".accordion").hasClass("best-match") && !panel.find('.img_content').length
      ) {
        if($(evet.target)
        .closest(".accordion").height() !== $(evet.target)
        .closest(".accordion").next().children('.inner-content-panel-data').height()){
        $(evet.target)
          .closest(".accordion")
          .children(".desc_text_info")
          .hide();
        panel[0].style.dispaly = "block";
        if (!panel[0].classList.contains("carousel")) {
          panel[0].style.overflow = "initial";
        }
        }
        
        hostWindowInstance.captureClickAnalytics(
          evet,
          $(evet.currentTarget).closest(".accordion").attr("contenttype"),
          "click",
          $(evet.currentTarget).closest(".accordion").attr("contentId"),
          $(evet.currentTarget).closest(".accordion").attr("id"),
          $(evet.currentTarget).closest(".accordion").attr("data-title") || $(evet.currentTarget).closest(".accordion").text()
        );
        return;
      }
      if ($(evet.target)
      .closest(".accordion")
      .children(".desc_text_info").length &&
      $(evet.target)
      .closest(".accordion")
      .children(".desc_text_info")[0].scrollHeight == "18" &&
        !$(evet.target).closest(".accordion").hasClass("best-match")  && !panel.find('.img_content').length
      ) {
        if($(evet.target)
        .closest(".accordion").height() !== $(evet.target)
        .closest(".accordion").next().children('.inner-content-panel-data').height()){
          $(evet.target)
          .closest(".accordion")
          .children(".desc_text_info")
          .show();
        $(evet.target)
          .closest(".accordion").next()
          .hide();
        }
          hostWindowInstance.captureClickAnalytics(
            evet,
            $(evet.currentTarget).closest(".accordion").attr("contenttype"),
            "click",
            $(evet.currentTarget).closest(".accordion").attr("contentId"),
            $(evet.currentTarget).closest(".accordion").attr("id"),
            $(evet.currentTarget).closest(".accordion").attr("data-title") || $(evet.currentTarget).closest(".accordion").text()
          );
        return;
      }

      //if($(evet.target).next().length){
      if (panel.length && panel[0].style.maxHeight || $(evet.target).hasClass("best-match")) {
        if (
          panel[0].style.maxHeight &&
          panel[0].style.maxHeight.toString().split("px")[0] == "18"
        ) {
          hostWindowInstance.captureClickAnalytics(
            evet,
            $(evet.currentTarget).closest(".accordion").attr("contenttype"),
            "click",
            $(evet.currentTarget).closest(".accordion").attr("contentId"),
            $(evet.currentTarget).closest(".accordion").attr("id"),
            $(evet.currentTarget).closest(".accordion").attr("data-title") || $(evet.currentTarget).closest(".accordion").text()
          );
          return;
        }
        if ($(evet.target).hasClass("best-match")) {
          $(evet.target).removeClass("best-match");
        }
        panel[0].style.dispaly = "none";

        panel[0].style.overflow = "hidden";
        setTimeout(() => {
          $(evet.target)
          .closest(".accordion")
          .children(".desc_text_info")
          .show();
          panel[0].style.maxHeight = null;
        }, 150);
      } else if (panel.length) {
        if($(evet.target)
        .closest(".accordion").height() !== $(evet.target)
        .closest(".accordion").next().children('.inner-content-panel-data').height()){
        $(evet.target)
          .closest(".accordion")
          .children(".desc_text_info")
          .hide();
        panel[0].style.dispaly = "block";
        panel[0].style.maxHeight = panel[0].scrollHeight + "px";
        if (!panel[0].classList.contains("carousel")) {
          panel[0].style.overflow = "initial";
        }
        }
       
        hostWindowInstance.captureClickAnalytics(
          evet,
          $(evet.currentTarget).closest(".accordion").attr("contenttype"),
          "click",
          $(evet.currentTarget).closest(".accordion").attr("contentId"),
          $(evet.currentTarget).closest(".accordion").attr("id"),
          $(evet.currentTarget).closest(".accordion").attr("data-title") || $(evet.currentTarget).closest(".accordion").text()
        );
      }
      // if ($(evet.target).hasClass("acc-active")) {
      //   $(evet.target).next().hide();
      //   hostWindowInstance.captureClickAnalytics(
      //     evet,
      //     $(evet.currentTarget).closest(".accordion").attr("contenttype"),
      //     "click",
      //     $(evet.currentTarget).closest(".accordion").attr("contentId"),
      //     $(evet.currentTarget).closest(".accordion").attr("id"),
      //     $(evet.currentTarget).closest(".accordion").attr("data-title") || $(evet.currentTarget).closest(".accordion").text()
      //   );
      //   // }
      // } else {
      //   $(evet.target).next().show();
      // }
      setTimeout(() => {
        if (
          $(evet.target).closest("#searchChatContainer") &&
          $(
            ".finalResults .resultsOfSearch .bottom-search-show-all-results"
          ).last().length
        ) {
          if (
            $("#searchChatContainer").prop("offsetHeight") >=
            $(".finalResults .resultsOfSearch .bottom-search-show-all-results")
              .last()
              .position().top
          ) {
            $(".more-results").css("display", "none");
            $('.feedback-template-positions.if-live-search-top-down.bottom-up-show-all').css('display', 'flex');
          }
        }
      }, 500);
    });
  }
  getTemplateString(type: any) {
   
    var searchListTemplates = '<script type="text/x-jqury-tmpl">\
    {{if isButtonTemplate == false}}\
    <div>\
    {{if structuredData?.length }}\
    {{if !isDemoTemplate}}\
    {{if renderTitle}}\
    <div class="title-list-heading">${titleName}</div>\
    {{/if}}\
    <div class="parent-list-template search-list-template{{if isClickable == true}}-no{{/if}}-clickble-{{if listType=="classic"}}classic{{else}}plain{{/if}}-group{{if gridLayoutType=="img_left"}}-if-img{{/if}}">\
        {{if isClickable == true}}\
        {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
        <div class="content-info {{if isSearchSDK&&textAlignment==" center"}}text-center{{/if}} click-to-navigate-url click-log-metrics" data-title="${data.heading}" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">\
            {{if data.img.length}}\
            <div class="img_block">\
                <img src="${data.img}">\
            </div>\
            {{/if}}\
            {{if data.heading.length}}\
            <div class="heading-title" title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
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
            <div class="content-info accordion" data-title="${data.heading}" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">\
                {{if data.heading.length}}\
                <div class="heading-title">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                {{/if}}\
                {{if data.description.length}}\
                <div class="desc_text_info {{if !data.heading || !data.heading.length}}two-line-desc{{else}}text-truncate{{/if}}">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                {{/if}}\
            </div>\
            <div class="panel">\
                <div class="inner-content-panel-data">\
                {{if data.img.length}}\
                    <div class="img_content">\
                        <img src="${data.img}">\
                    </div>\
                    {{/if}}\
                    <div class="desc-text-info-img">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                </div>\
            </div>\
        </div>\
        {{/each}}\
        {{/if}}\
        {{if isSearchSDK}}\
        <div class="show-more-data {{if doc_count==0 || doc_count<6 || isLiveSearch || isSearch}}display-none{{/if}} show-more-list" groupName="${groupName}" templateName="${templateName}" pageNumber="${pageNumber}" fieldName="${fieldName}">\
           <div class="searchassist-show-more-button">Show more\
           <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNiIgdmlld0JveD0iMCAwIDEwIDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNS4zNjQzNyA1LjE0OTQ5QzUuMTc0OTcgNS4zMzgzNyA0Ljg3NDgxIDUuMzQ5NDggNC42NzIzOSA1LjE4MjgyTDQuNjM1NjMgNS4xNDk0OUwwLjE1MDkyNyAwLjg3NzI2NUMtMC4wNTAzMDkxIDAuNjc2NTc5IC0wLjA1MDMwOTEgMC4zNTEyMDIgMC4xNTA5MjcgMC4xNTA1MTVDMC4zNDAzMjYgLTAuMDM4MzY2NCAwLjY0MDQ4IC0wLjA0OTQ3NzMgMC44NDI5MDkgMC4xMTcxODNMMC44Nzk2NjggMC4xNTA1MTVMNSA0LjA1OTI4TDkuMTIwMzMgMC4xNTA1MTVDOS4zMDk3MyAtMC4wMzgzNjY0IDkuNjA5ODggLTAuMDQ5NDc3MyA5LjgxMjMxIDAuMTE3MTgzTDkuODQ5MDcgMC4xNTA1MTVDMTAuMDM4NSAwLjMzOTM5NyAxMC4wNDk2IDAuNjM4NzMxIDkuODgyNSAwLjg0MDYwN0w5Ljg0OTA3IDAuODc3MjY1TDUuMzY0MzcgNS4xNDk0OVoiIGZpbGw9IiM1RjYzNjgiLz4KPC9zdmc+Cg==">\
           </div>\
        </div>\
        {{/if}}\
    </div>\
    {{/if}}\
    </div>\
    {{/if}}\
    {{if isDemoTemplate == "serviceNowTemplate"}}\
<div class="siemens-template">\
<div class="title-text-heading {{if renderTitle}}display-block{{else}}display-none{{/if}}">${titleName}</div>\
<div class="parent-list-template">\
{{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
  <div class="siemens-list-template">\
    <div class="icon-with-title">\
    {{if data.icon}}\
      <img src="${data.icon}" class="siemens-icon-blue">\
    {{/if}}\
      <span class="name-title">{{html helpers.convertMDtoHTML(data.heading)}}</span>\
      <span class="redirecting-link click-to-navigate-url click-log-metrics isClickable" data-title="${data.heading}" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">\
        <img class="siemens-link-icon" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik01LjYzNTAyIDEyQzUuMzQ0ODcgMTIgNS4xMDk2NiAxMS43NjQ4IDUuMTA5NjYgMTEuNDc0NkM1LjEwOTY2IDExLjIwMDYgNS4zMTk0NyAxMC45NzU2IDUuNTg3MjEgMTAuOTUxNEw1LjYzNTAyIDEwLjk0OTNIMTAuMDE0N0MxMC41MTI0IDEwLjk0OTMgMTAuOTE5MyAxMC41NjAyIDEwLjk0NzcgMTAuMDY5NkwxMC45NDkzIDEwLjAxNDdWMS45ODUyN0MxMC45NDkzIDEuNDg3NTcgMTAuNTYwMiAxLjA4MDc0IDEwLjA2OTYgMS4wNTIzMUwxMC4wMTQ3IDEuMDUwNzNIMS45ODUyN0MxLjQ4NzU3IDEuMDUwNzMgMS4wODA3NCAxLjQzOTc4IDEuMDUyMzEgMS45MzAzNkwxLjA1MDczIDEuOTg1MjdWNi4zNjQ5OEMxLjA1MDczIDYuNjU1MTMgMC44MTU1MTMgNi44OTAzNCAwLjUyNTM2MyA2Ljg5MDM0QzAuMjUxMzMyIDYuODkwMzQgMC4wMjYzMDQxIDYuNjgwNTMgMC4wMDIxNDY3MiA2LjQxMjc5TDAgNi4zNjQ5OFYxLjk4NTI3QzAgMC45MTM3NTMgMC44NDg4OTEgMC4wNDA1MDg5IDEuOTEwODQgMC4wMDEzNjk0OEwxLjk4NTI3IDBIMTAuMDE0N0MxMS4wODYyIDAgMTEuOTU5NSAwLjg0ODg5MSAxMS45OTg2IDEuOTEwODRMMTIgMS45ODUyN1YxMC4wMTQ3QzEyIDExLjA4NjIgMTEuMTUxMSAxMS45NTk1IDEwLjA4OTIgMTEuOTk4NkwxMC4wMTQ3IDEySDUuNjM1MDJaIiBmaWxsPSIjQkRDMUM2Ii8+DQo8cGF0aCBkPSJNOC4wMDI5IDMuNjAzOThDOC4yNzY5MyAzLjYwMzk4IDguNTAxOTYgMy44MTM3OSA4LjUyNjEyIDQuMDgxNTNMOC41MjgyNiA0LjEyOTM0TDguNTI4MjYgNy4wNDkxNUM4LjUyODI2IDcuMzM5MyA4LjI5MzA1IDcuNTc0NTEgOC4wMDI5IDcuNTc0NTFDNy43Mjg4NyA3LjU3NDUxIDcuNTAzODQgNy4zNjQ3MSA3LjQ3OTY4IDcuMDk2OTdMNy40Nzc1NCA3LjA0OTE1TDcuNDc3MzMgNS40MDM5TDIuMzgwMzggMTAuNTAwOEMyLjE3NTIxIDEwLjcwNiAxLjg0MjU3IDEwLjcwNiAxLjYzNzQgMTAuNTAwOEMxLjQ0NDMgMTAuMzA3NyAxLjQzMjk0IDEwLjAwMTcgMS42MDMzMyA5Ljc5NTM1TDEuNjM3NCA5Ljc1Nzg3TDYuNzQwNzkgNC42NTQ0OUw1LjA4MzA5IDQuNjU0NzFDNC44MDkwNiA0LjY1NDcxIDQuNTg0MDMgNC40NDQ5IDQuNTU5ODggNC4xNzcxNkw0LjU1NzczIDQuMTI5MzRDNC41NTc3MyAzLjg1NTMxIDQuNzY3NTMgMy42MzAyOSA1LjAzNTI3IDMuNjA2MTNMNS4wODMwOSAzLjYwMzk4SDguMDAyOVoiIGZpbGw9IiNCREMxQzYiLz4NCjwvc3ZnPg0K">\
      </span>\
    </div>\
    <div class="info-test-content four-line-description">{{html helpers.convertMDtoHTML(data.description)}}</div>\
    <div class="author-updates-sec">\
      <div class="author-names">\
        <span class="author-title">Author:</span>\
        <span class="author_name">{{html helpers.convertMDtoHTML(data.scm_author)}}</span>\
      </div>\
      <div class="updates-on">\
        <span class="title">Updated on:</span>\
        <span class="time-updates">{{html helpers.convertMDtoHTML(data.scm_createdAt)}}</span>\
      </div>\
    </div>\
    <div class="button-chips">\
    {{each(key, chip) data.chips}}\
    <button class="btn-chip" style="color:${chip.color};background:${chip.background};border:1px solid ${chip.color}">{{html helpers.convertMDtoHTML(chip.name)}}</button>\
    {{/each}}\
    </div>\
    </div>\
    {{/each}}\
    {{if isSearchSDK}}\
    <div class="show-more-data {{if doc_count==0 || doc_count<6 || isLiveSearch || isSearch}}display-none{{/if}} show-more-list" groupName="${groupName}" templateName="${templateName}" pageNumber="${pageNumber}" fieldName="${fieldName}">\
    <div class="searchassist-show-more-button">Show more\
    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNiIgdmlld0JveD0iMCAwIDEwIDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNS4zNjQzNyA1LjE0OTQ5QzUuMTc0OTcgNS4zMzgzNyA0Ljg3NDgxIDUuMzQ5NDggNC42NzIzOSA1LjE4MjgyTDQuNjM1NjMgNS4xNDk0OUwwLjE1MDkyNyAwLjg3NzI2NUMtMC4wNTAzMDkxIDAuNjc2NTc5IC0wLjA1MDMwOTEgMC4zNTEyMDIgMC4xNTA5MjcgMC4xNTA1MTVDMC4zNDAzMjYgLTAuMDM4MzY2NCAwLjY0MDQ4IC0wLjA0OTQ3NzMgMC44NDI5MDkgMC4xMTcxODNMMC44Nzk2NjggMC4xNTA1MTVMNSA0LjA1OTI4TDkuMTIwMzMgMC4xNTA1MTVDOS4zMDk3MyAtMC4wMzgzNjY0IDkuNjA5ODggLTAuMDQ5NDc3MyA5LjgxMjMxIDAuMTE3MTgzTDkuODQ5MDcgMC4xNTA1MTVDMTAuMDM4NSAwLjMzOTM5NyAxMC4wNDk2IDAuNjM4NzMxIDkuODgyNSAwLjg0MDYwN0w5Ljg0OTA3IDAuODc3MjY1TDUuMzY0MzcgNS4xNDk0OVoiIGZpbGw9IiM1RjYzNjgiLz4KPC9zdmc+Cg==">\
    </div>\
 </div>\
        {{/if}}\
     </div>\
    </div>\
    {{/if}}\
    {{if isDemoTemplate == "cosmeticsTemplate"}}\
    <div class="cosmetics-grid-template2">\
                <div class="arrivals-grids-template">\
                {{each(key, data) structuredData.slice(0, maxSearchResultsAllowed)}}\
                  <div class="slide-gride cosmetics-product-view" style="width:100%">\
                    <div class="inner-content-data">\
                      <div class="img-block">\
                        <img class="banner-img" src="${data.ecommerce_image}">\
                      </div>\
                      <div class="content-block">\
                        <div class="type-tag {{if data.ecommerce_bestseller == true}} display-inline-block{{else}}display-none{{/if}}">Best Seller</div>\
                        <div class="type-tag offer">${data.ecommerce_percentage_offer}</div>\
                        <div class="title">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                        <div class="text-desc">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                        <div class="price-and-rating">\
                        <div>\
                        <div class="amount-info">${data.ecommerce_price}</div>\
                        <div class="amount-info strike-text">${data.ecommerce_original_price}</div>\
                        </div>\
                        <div class="rating-flex">{{each(key, review) data.ecommerce_ratingArr}}\{{if review == "fill"}}\
                        <div class="rating-star-pd"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTEiIHZpZXdCb3g9IjAgMCAxMCAxMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAuMzUwMjc4IDMuNTI0TDMuMzk1ODkgMy4xOTMwNkw0LjYzOTgyIDAuMjM5OTE0QzQuNzc0NTYgLTAuMDc5OTcxNCA1LjIyNzg1IC0wLjA3OTk3MTQgNS4zNjI1OSAwLjIzOTkxNEw2LjYwNjUyIDMuMTkzMDZMOS42NDk3NiAzLjUyNEM5Ljk4MjMgMy41NjAxNiAxMC4xMTk4IDMuOTY5MzMgOS44NzY1NyA0LjE5ODk3TDcuNTg2ODcgNi4zNjA4TDguMjMxNzkgOS41MzAyNkM4LjMwMDA0IDkuODY1NjkgNy45MzU4NSAxMC4xMjE0IDcuNjQzNTIgOS45NDMzNUw1LjAwMTIxIDguMzMzNzRMMi4zNTYzNiA5Ljk0MzQ0QzIuMDYzOSAxMC4xMjE0IDEuNjk5NzcgOS44NjU0NCAxLjc2ODI4IDkuNTNMMi40MTU1NSA2LjM2MDhMMC4xMjM1ODIgNC4xOTkxMUMtMC4xMTk4NDQgMy45Njk1MyAwLjAxNzYyMDkgMy41NjAxNCAwLjM1MDI3OCAzLjUyNFoiIGZpbGw9IiNGNUIyNEQiLz4KPC9zdmc+Cg==" /></div>\
                        {{else}}\
                        <div class="rating-star-pd"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUuMzYyNTkgMC4yMzk5MjNDNS4yMjc4MiAtMC4wNzk5NDAzIDQuNzc0NDggLTAuMDc5OTg3MiA0LjYzOTY3IDAuMjM5ODU5QzQuMTUzNjkgMS4zOTI5MyAzLjM5NTc2IDMuMTkyNzEgMy4zOTU3NiAzLjE5MjcxTDAuMzUwNjAxIDMuNTIzNTJDMC4wMTc2Mzc5IDMuNTU5NjkgLTAuMTE5OTU0IDMuOTY5MzUgMC4xMjM2OTYgNC4xOTkxTDIuNDE1MzMgNi4zNTk5N0wxLjc2ODE2IDkuNTI3OTZDMS42OTk1OSA5Ljg2MzYzIDIuMDY0MDUgMTAuMTE5OCAyLjM1Njc4IDkuOTQxNjhMNS4wMDEyIDguMzMyNjJMNy42NDMwOSA5Ljk0MTU5QzcuOTM1NyAxMC4xMTk4IDguMzAwMjIgOS44NjM4OCA4LjIzMTkgOS41MjgyMkw3LjU4NzA4IDYuMzU5OTdMOS44NzY0NSA0LjE5ODk2QzEwLjExOTkgMy45NjkxNiA5Ljk4MjI4IDMuNTU5NzEgOS42NDk0MyAzLjUyMzUyTDYuNjA2NjUgMy4xOTI3MUw1LjM2MjU5IDAuMjM5OTIzWk01LjAwMTIgMS40MDA3OEw2LjA2NDM1IDMuOTIxNzNMOC43MjM3NiA0LjIwOTY2TDYuNzMyMjcgNi4wOTA0Mkw3LjI4Mzc2IDguODA0MzRMNS4wMDEyIDcuNDEzNjhMMi43MTU1OSA4LjgwNDM0TDMuMjcwMTQgNi4wOTA0MkwxLjI4MTcxIDQuMjA5NjZMMy45MzgwNiAzLjkyMTczTDUuMDAxMiAxLjQwMDc4WiIgZmlsbD0iI0Y1QjI0RCIvPgo8L3N2Zz4K" /></div>\
                        {{/if}}\
                        {{/each}}\</div>\
                        </div>\
                      </div>\
                    </div>\
                  </div>\
                {{/each}}\
                </div>\
                </div>\
    {{/if}}\
    {{if isDemoTemplate == "bankingTemplate"}}\
    <div class="banking-demo-list">\
              <div class="banking-list-template">\
                <div class="title-heading-banking {{if data.subtitle}}display-block{{else}}display-none{{/if}}">${data.subtitle}</div>\
                <div class="banking-carousel-template-data">\
                  <div class="carousel bankCarouselId${key+1}">\
                      <div class="slide">\
                        <div class="inner-content-list">\
                          <div class="img-block-with-text">\
                              <div class="img-block">\
                                  <img src="">\
                              </div>\
                              <div class="text-content">\
                                  <div class="main-heading text-truncate">Luxor Hotel & Casino</div>\
                                  <div class="stars">\
                                    <span>4.5</span>\
                                    <img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Banking_demo/star-fill.svg">\
                                    <img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Banking_demo/star-fill.svg">\
                                    <img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Banking_demo/star-fill.svg">\
                                    <img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Banking_demo/star-fill.svg">\
                                    <img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Banking_demo/star-unfil.svg">\
                                  </div>\
                                  <div class="info-content two-line-description">Significant reduce time and costs with the U.S Bank purchasing card, a fast, flexible purchasing tool, which offers you an.</div>\
                              </div>\
                          </div>\
                          <div class="chips-data">\
                            <div class="chip-name">25% off</div>\
                            <div class="chip-name">Complimentary meals</div>\
                            <div class="chip-name">No chargeable Reschedule</div>\
                            <div class="chip-name">3x Reward points</div>\
                          </div>\
                        </div>\
                    </div>\
                </div>\
              </div>\
              </div>\
            </div>\
    {{/if}}\
    {{/if}}\
    {{if isButtonTemplate}}\
    {{if structuredData?.length}}\
        {{if devMode == true && viewType == "Customize" && selectedFacet == appearanceType}}\
          <div class="bot-actions-customize-info ">\
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFnSURBVHgBpVNNSsNQEH4zabXLuFXEHsGCqLjQ9gTqCWJP0AsUk0j26tJdegLrCczKnyL0CDbgAbKzhvjGmZBIfIQScODxHt/8fzNPqRXSOfS6clbZgAm09sZ9tCxHkToDULZgRCphyykC+MsXb1G1x78ZfRfRumfDGBF6X68+yJG3YET0uLZ/6dZWIM5E+gIABmaWaksShE+Yzq783wClwnRmvK91ZqezYFoNojXNtf4+z96CKG9BE3F2mpiZAWgXsWVXMbHhlm5znoSzHGXCELFnlvz57N+oegm59DnfQyjKfxeyTCsmzJOb+/VM3fqBS2C1u6j+KSg9yZw7R8FOU6diuZLl0zguKqAHnaVD1VjAIaXyyeQBmMCQRzgy15bxhRwzu+yLbGUeqqLwmEyn4SJNSmKtUpl9RFF7e7DBymtr68Tmd8xYUjri5vGIuQq53bvqVKAui9aaDeC05jPJskWqqTT5zj8FOrqqP5/xLgAAAABJRU5ErkJggg==" alt="actions-info">\
            <span class="info-text">Bot Actions cannot be customized</span>\
          </div>\
        {{/if}}\
        {{if selectedFacet !== appearanceType && selectedFacet == "all results"}}\
          <div class="heading-and-show-all" appearanceType="task">\
            <div class="text-heading-main">ACTIONS</div>\
            <div class="show-al-text show-all-blue display-none">Show all Actions</div>\
          </div>\
        {{/if}}\
        {{if selectedFacet == appearanceType || selectedFacet == "all results"}}\
          <div class="new-grid-search-data list-view-data-search">\
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
    </script>';
  

    if (type === 'searchListTemplate') {
      return searchListTemplates;
    }

  }

}

export default SearchListViewTemplate;


