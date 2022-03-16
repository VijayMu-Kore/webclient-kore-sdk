import helpers from '../../../../utils/helpers';
import './searchGridViewTemplate.scss';
class SearchGridViewTemplate {

    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        me.helpersObj = helpers;
        if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component?.payload && msgData.message[0].component?.payload?.template_type == 'searchGridTemplate') {
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
        // let chatWindowInstance = me.cwInstance;
        // let $ = me.cwInstance.$;
        let $ = me.hostInstance.$;
        $(messageHtml)
            .off("click", ".search-task")
            .on("click", ".search-task", function (event: any) {
                event.stopPropagation();
                var ele = $(event.target).closest(".search-task");
                hostWindowInstance.botActionTrigger(event);
            });
    }
    getTemplateString(type: any) {
        const searchGridTemplate = '<script type="text/x-jqury-tmpl">\
        {{if isButtonTemplate == false}}\
        {{if structuredData.length}}\
<div class="title-text-heading {{if renderTitle}}display-block{{else}}display-none{{/if}}">${titleName}</div>\
{{if gridLayoutType==="img_common"}}\
<div class="template-4-grid-list mb-15">\
    {{each(key, data) structuredData.slice(0, 5)}}\
    {{if isClickable == true}}\
    <div class="grid-data-item click-to-navigate-url faqs-shadow isClickable" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">\
        <div class="inner-content-list">\
            <div class="image-with-title">\
                {{if data?.img?.length}}\
                <div class="img-block">\
                    <img src="${data.img}">\
                </div>\
                {{/if}}\
                {{if data?.heading?.length}}\
                <div class="info-title two-line-heading" title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                {{/if}}\
            </div>\
            {{if data?.description?.length}}\
            <div class="title-item two-line-description" title="${data.description}">{{html helpers.convertMDtoHTML(data.description)}}</div>\
            {{/if}}\
        </div>\
    </div>\
    {{/if}}\
    {{if isClickable == false}}\
    <div class="grid-data-item click-to-navigate-url faqs-shadow" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">\
        <div class="inner-content-list">\
            <div class="image-with-title">\
                <div class="img-block">\
                    <img src=${data.img}>\
                </div>\
                <div class="info-title two-line-heading" title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
            </div>\
            <div class="title-item two-line-description" title="${data.description}">{{html helpers.convertMDtoHTML(data.description)}}</div>\
        </div>\
    </div>\
    {{/if}}\
    {{/each}}\
    <div class="show-more-list {{if doc_count==0 || doc_count<6 || isLiveSearch || isSearch}}display-none{{/if}}" groupName="${groupName}" templateName="${templateName}" pageNumber="${pageNumber}" fieldName="${fieldName}">\
        <div>Show more <img src="{{if devMode}}assets/web-kore-sdk/demo/{{/if}}images/show_more.png" height="6" width="10" /></div>\
        {{/if}}\
        {{if gridLayoutType==="img_large"}}\
        <div class="template-5-grid-list mb-15">\
            {{each(key, data) structuredData.slice(0, 5)}}\
            {{if isClickable == true}}\
            <div class="grid-data-item click-to-navigate-url faqs-shadow isClickable" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">\
                <div class="inner-content-list ">\
                    <img src="${data.img}">\
                </div>\
            </div>\
            {{/if}}\
            {{if isClickable == false}}\
            <div class="grid-data-item click-to-navigate-url faqs-shadow" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">\
                <div class="inner-content-list">\
                    <img src="${data.img}">\
                </div>\
            </div>\
            {{/if}}\
            {{/each}}\
        </div>\
        {{/if}}\
        {{if gridLayoutType==="img_left"}}\
        <div class="template-6-grid-list">\
            {{each(key, data) structuredData.slice(0, 5)}}\
            <div class="grid-data-item faqs-shadow isClickable" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">\
                <div class="inner-content-list {{if textAlignment==" center"}}text-center{{/if}}">\
                    <div class="heading-main text-truncate one-line-height" title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                    {{each(key, res) [0,1,2]}}\
                    <div class="image-with-text">\
                        <div class="img-block">\
                            <img src="${data.img}" />\
                        </div>\
                        <div class="image-info two-line-description" title="${data.description}">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                    </div>\
                    {{/each}}\
                </div>\
            </div>\
            {{/each}}\
        </div>\
        {{/if}}\
        {{if gridLayoutType==="img_top"}}\
        <div class="template-7-grid-list mb-15">\
            {{each(key, data) structuredData.slice(0, 5)}}\
            {{if isClickable == true}}\
            <div class="grid-data-item  click-to-navigate-url faqs-shadow isClickable" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}" href="${data.url}" target="_blank">\
                {{else}}\
                <div class="grid-data-item  click-to-navigate-url faqs-shadow" contentId="${data.contentId}" contentType="${data.sys_content_type}" id="${key}">\
                    {{/if}}\
                    <div class="inner-content-list {{if textAlignment==" center"}}text-center{{/if}}">\
                        <div class="main-img-block">\
                            <img src="${data.img}">\
                        </div>\
                        {{if data?.heading?.length}}\
                        <div class="heading- text-truncate one-line-height" title="${data.heading}">{{html helpers.convertMDtoHTML(data.heading)}}</div>\
                        {{/if}}\
                        {{if data?.description?.length}}\
                        <div class="desc-text-info two-line-description" title="${data.description}">{{html helpers.convertMDtoHTML(data.description)}}</div>\
                        {{/if}}\
                    </div>\
                </div>\
                {{/each}}\
                {{/if}}\
            </div>\
            {{/if}}\
            {{/if}}\
            {{if isButtonTemplate}}\
            {{if structuredData && structuredData.length > 0 }}\
            {{if devMode == true && viewType == "Customize" && selectedFacet == appearanceType}}\
              <div class="bot-actions-customize-info ">\
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFnSURBVHgBpVNNSsNQEH4zabXLuFXEHsGCqLjQ9gTqCWJP0AsUk0j26tJdegLrCczKnyL0CDbgAbKzhvjGmZBIfIQScODxHt/8fzNPqRXSOfS6clbZgAm09sZ9tCxHkToDULZgRCphyykC+MsXb1G1x78ZfRfRumfDGBF6X68+yJG3YET0uLZ/6dZWIM5E+gIABmaWaksShE+Yzq783wClwnRmvK91ZqezYFoNojXNtf4+z96CKG9BE3F2mpiZAWgXsWVXMbHhlm5znoSzHGXCELFnlvz57N+oegm59DnfQyjKfxeyTCsmzJOb+/VM3fqBS2C1u6j+KSg9yZw7R8FOU6diuZLl0zguKqAHnaVD1VjAIaXyyeQBmMCQRzgy15bxhRwzu+yLbGUeqqLwmEyn4SJNSmKtUpl9RFF7e7DBymtr68Tmd8xYUjri5vGIuQq53bvqVKAui9aaDeC05jPJskWqqTT5zj8FOrqqP5/xLgAAAABJRU5ErkJggg==" alt="actions-info">\
                <span class="info-text">Bot Actions cannot be customized</span>\
              </div>\
            {{/if}}\
            {{if selectedFacet !== appearanceType && selectedFacet == "all results"}}\
              <div class="structured-data-header total-structured-data-wrap" appearanceType="task">\
                ACTIONS\
                <div class="search-heads show-all sdk-show-classification display-none">\
                  Show all Actions\
                </div>\
              </div>\
            {{/if}}\
            {{if selectedFacet == appearanceType || selectedFacet == "all results"}}\
              <div class="action-results-container btn_block_actions main-content-title-grid-data new-grid-search-data">\
                {{each(key, task) structuredData}}\
                  <div class="title-box-data">\
                      <div id="${key}" class="search-task search-grid-item text-truncate one-line-height" title="${task.name}" contentId="${task.taskId}" contentType="${task.contentType}" childBotId="${task.childBotId}" childBotName="${task.childBotName}" payload="${task.payload}" seqLogId="${task.seqLogId}">\
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJ1BMVEUAAAAAVaoEbq4DbK8GbK4Gbq8Gba0Fba8Fba4Fbq4Eba4Fba7////SVqJwAAAAC3RSTlMAA0hJVYKDqKmq4875bAAAAAABYktHRAyBs1FjAAAAP0lEQVQI12NgwACMJi5A4CzAwLobDBIYOCaAxDknMLCvnAkEsyYwcECkkBicMDV4GGwQxQEMjCogK5wEMC0HALyTIMofpWLWAAAAAElFTkSuQmCC" class="credit-card display-none">\
                      <div class="name-title">${task.titleText}</div>\
                      {{if task.childBotName !=="" && task.childBotName !== undefined}}\
                        <div class="child-bot">${task.childBotName}</div>\
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
                    <div class="img-block"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGgAAABjCAYAAAB320ViAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAABUaSURBVHgB7V1rcNzGff8vgHtR5PH4EHWiXpSi2HRtyfQr1tidiHZtS649tjud1JpJW8kznfpDGsuepo7aNInSTjtu4o4du52x2w+W2ya1+8VJJoqk2rVOTjqhTFllWssmVT1OIikdJZG8Oz7uwAN2swsc7gAcgAN45N3R1G9mCRywu1jsb/+P/S8IIFhEkENvdIHf3wuAbgUCXYCgRz1BuugfuoPYjyQgLkl/xukPusXH6LEB9OAfxOzqPfjdK1GfzxeVASJE4COIQAQBiahVQ8ScHyFWL8kSxGXZFjBOcAKfkDLZ5CPPdySgjoFggUHe/dde4PjH6d4eYJ1Fe4f1WplSNk1BMUDkzfjVzw1+MnZThEMoymEcxQgFYSGBUBwTkqB1Dz78XEsc6ggLQhB5540IhP17KRHP0iojpR1ekBZ1ayDNjhxjmWSmbWBo7KZjkzORJCwiOCphmBFGybqSSg4+tX9jFmqIighSiQnuBcDPQolqMXW80tcmokq25ZHMtFCibl50ohgYWTLPDSJJHqiVZM2bIPLeD/ZS9bMfCHImRrmKGzVXpg4TqkkUKK0hCRmTvkeeaxmAKsIzQYrh9wXeoHu9+SNQoSC6uarFNQhIOJAcmVwfG0x0/wqqBOZwyDKOVYsoTz2rOAAIvaPYGU0zOZeYz2XK1Fdq2xLpztjA8O3HoIpQiMqKby22F+i651SVhl6mbjBYOwCWpfLqrXhEwj4wEkdA4HLOdbho5lQ2PPjRxbt+nM2FqmrUCYcGREmO/c5zLYuial0RRP7r379NidmvlihnT4odigkH02ITzEl+yORCkMN+OgXhLFqBIMBnKVEShPyz0OifAoGnpCHOdC1nskQpkBgYuevtatklDYup9soSVCSnnDtcRCbXABMzbQop80VAECESmoSmYBrs3fbStohSKPHLc/e+WW1JYqC6pa9hciJ23wK65o4EGSTHhapRiWlVtt5bYi2ZTJLCgTS0rhgvX0e+jaIUTBwdeuB1qAGYNGVkfGChVJ5tj5P3fvgEm+mACzC7MpaOlkqMZ/faviwjalVTAkK+jGM+FQTGZzr6+uN3H4FagM6fOJ770Y6vhgehQlgSlI+hHVXiZ6VnDUWnxDBcnepQ7E010Now7lKaAEZS6w9/PLL1ONQKHBd7+KtNMagA1r0a8LF5ThediEJpAnXU0v2J2TYYm4pS3cvljy9+msi0wWhqLR0QCKzbV0ydzSO9LSuSEagVMO499OpUL1SAEoLI0R/soTfXq5wxJGLYZx3FUpE0p0TK/HaTr7ifkRpgNL2ODgwEpe3U2kpozFYObll38nGoJSokyUAQOUpVG0e+rb/JYioeY5LDUrHTSJkEZX67yWc8J8oBKkkaSVZtZQlDQ3C6a9Oq091QS1RAklGCBGE3vamuwo0irHZI4TdhMbA8OVDzJMpBuDbTYUGQcVBtip7dAbUGJelnr6S2gUcUCFKkB1GXWj9aNanJj1qJCMr8Jl/CIoGLff1vcChvV78xTzoTVgaNtQSqA0wQxEj32lO3Qo1Bm7Lz0EuTXV7KFCUoAE8U1Ri2HJGjE+tVb82VDbHbB1NngkM+q/pL80xMtyuDp7TdUNiubhv2PHoXBQjteuelSdeOC6fb22tHDEvpbDPkiM9BndQuMTs0llpdYiv1KRCcja7pONcFtQZdDQ7x3J6j+8+7WhVWCCL9/9xLR2aXvZHHMDnVDuXD18Tjcbs8xMU5Y57MXEidKGt200LVdbZdvhHqAOy5idmW1l43eVUJQtzu4mjTS5G6n85EaKBTAO/eWrnjdnnAxbnSPBNsEBkkBxu2Lc1XeqBOQDt+25FX090u8gEo8x69x4byN8U6gW5TNL6mghST1jFW+2qdxasUzpnqAF05Q/368qZrIF09SFc3TRmxQXW7lXvBRelhd0m3HC8F10TrQM3lgWX8RDlVx5EP/6mHNr6rMNKQcSvmAkoqMc4aSvZNJBX2tXNQWo+yj8HgDBTK68oWQIzHdPUlp1tLbRAqStLK1rENUC+g9qicquPAJ/eYdbV+PzPXAOXVk506Wshy7upV24st74Vtw43jXVBHYKrOyfWmhgV6FIlhYANSG70sQkxjbjPZJqO6UoDA2fDbnS9XrnKoao6jcUoZrJyLYGAmCvUGnu+lfw9YneKAJ7cWRlwhelDcL6o3/SjGZUYythn9GOYvYe6lUG0zhlJJovE5QQoGA9ML++BjpSCky85h4OgNRIo3IhtuRswF80vU2kjEYC0BRLclNsfMx835reoCh/rsz5USZEzNjeO1i3DbgBCy0+o4pzgIJaNfTUpIv1iFab9cx+u32KZcORKxxW/zfml9kuyzvB9tEArBbH1JEKhzIytbJCgSVMwGoHPLCmsu7i5hKGt93u1xfV2kTJnSASLjvKttmR+gqSHdDPUIC1vElerq4m+ZaOrNTQIPeedbF3ZX3lJydKk6i7/eQW2RWYoE40gzQSPNujYtE3hoga6Mk8QRizz6Y3b5teoJON4XuNUK1QfiOOYsxLXf1B/FSSvpYYnn5sDaPhU9Ju/eHOi8OWyTz+4YsWkPgPXcxzpNzTamoE5BnYUefXSBCrtGkFxqTH0iqGpFS0oVYFQ3VltzfmyRz8nY66GvC5vq0qvD4rV87MkfJ5LqGSy60BwpuNyCIkGGPimqIZ8/Y1Jx5g5xOq6pI6vyTnXYwc01VQQCM+qAs1Gj01MtVX3y1Cs4nmdBXeUpVY5G7H6lSo+WSEGCOD4HPoE9JEnmkcwjvXpJUCRIhqJmkA2aIZVcXdcE0clnVFNz1AZJA8XOlPOp+DvUwNQ1WTKJ43JUgqbAeE/Fe5udCceh3kHVXLY5ooSk2CLPgKqXi6qtCAJ+P7vZdhe1WquT+efzmldFKJQC4/0YkcmE6/qfhjVo3hxHKWIEJY1GVS54ROHIGCgjsMSz0qkvvVcHmiHW5QUMth4amI6D3Tnz9fP1mq7X2HStmE/vVOTvbXyi8wIsARCEFAni0Mb91Elgas6oCtQkUZUhUjWXhFIvTUeooSN0HWs4ZrZJps4t1GlXzsJLNBHJbE9T+HKx/foBly8zPrFuSUgQs0Nsk19RlX/MyFBvSkcUUm+0tS0OldkGKxe7XF7vKRRKmhwDliS1Tro/m2mOpybW1LeDoIHaIfY+CJUgbu6Aqua0kacjit5wqGGC3vwklHaejVTYdjjY5NeXA3CUGsvrY8U5aGs7B5rkGzRB/r7GLn+uav/LuiDw+VSC0MaX6ahiUqRXb8bUqty8XWfZ/bbLY9XZbgi2JyvScpGquNl8e4mu7eq+lPMnL5y/q+J/B6kmKDmRYtgQkQOlc4diCjWMQ6T1otEAm4212aibDHSp06DrZKdQj20etS5GTGvbWVWdFdSaTsXR7fRMazybidT0pRReQfQEUSmK0ZuNFdWDyWFATIrO0IlrBsBswM1eGFgYcTDld3I0zJJmm0eta+36EwU1ZlZrWvr01I5jsMSAeD5iCrxL3ymSY9LjNHE0eLpm3YfK1t7AO6kuKzVnPuZkc0pVX/vKQRCEGTBOso3tTly+JZaaWL80nAMd2AuiDAShja/FAOe+b0WOZnwF3wysWauRZNXJxOG4sXOtjznZHGOdrW2nqe05X9JGI1Gz4EOf1t0KqluUTNPJ+T2RObHxgj8wG3YqKGabYHTkC9RdF3RVEV2VpMxlnc6XB1O3it0pB5kSiK/B1NTnBz/5+GtHJpM3LylJKllbRBsPJAc+fPSIOhK10Vi6HwgmYf2GD6hNYp6TlXoiUE49Oe/bl21feYqSM6Rrl03CVxRyGJqa/r/7jju/trslcqruHhhxAm918KGtr25raRsONDUnVjt1JsfPQWPjZcixl1TkVkD5zrVKYLNfmpi3trqzn0YLLrmol65lyXHQSyptb7Bz7fs9BKPxycmt12AJwJKgL/Xu2zF8/o74+o3H1wWC02EnI8+WJJrCo4ptmsuG8yqPLHiKtJyF6OqPaPB2GpzsUoEcKU53pZJ7QygntLWfuKWRBrUTl++r+7icJUFP3vf1Bwm9ldHhnjPrNvZ3+XyzK5xVFKYh/kkqTZcUwqRcAyXKl6/NTlLMMOdTt03hi9C55kMaBB2hLZKgvGeXo+SM0J8iOKGx8XxXS+snwUujD7kwZLWDJUG7Hvj6HRijFVIuJF9LfD6+dkP/Zp7PBgpzGoLBuE8TIYpnFwpdpaP9DAj+GboW6FPIUmHqfFae6DsWCudDK65BOHyBqrM+ajuGlYCtYd5ESiW5MDWQR8uSo6GhYWTtuvU/6U5NbjmbzXbU3SSWvbXEcrHlpy+m/3R2Su7UftM4XOC3Hv3Ol2hMrqOYS++xGaoFvZQwlSdmI3QdZiXdNiuSpSa/ko2pRsE/qzyg4g+kVSlU3n7lDbLkF+W5SdHvvxr2WlbKNSU/OvHim/Xm4bGXCFoSdOiV9J65GbhBzMoB/fF773+xt3Pd/9wOZV1kJ1fbjYutke/mIX2AOXFF+ufv/vl/MMm5Z/tfPhZquNIBHoFxIHvp0o7Yx//3fO3eTGIGQnFLFfflh57vEvxoJSIcHZlEm+jA8Pl74sGGVLa5Od7JUWNrHXrRq6Ay5xGxyUvsy5vquDZ206lj733jJ1OpztlMpl08Pfh7/9vSOhRoCg+vBk99IQvh8NDmOnMeEpYE/f7OfVHa4i7eBzLHcUTKFUm6PHJbYuzSrUMt7WfDodC1VvcdS1wec5dHlgTx44EvHzzxy6f7ma3Ut3/4wgPxSOSiHG4+vx48gjkPq6I/j169uu2sJDVKUEtg/LElQbt37ovQJVfl2SxeACz4kCTPYYEoL+lh6/qt4rnTDw7xvJQKN8c7VAfCRnLKSlSeAGJx3KKcLPvE4fi9/f8d+8bBxGjPVXPbaQNJMMSL1yZ7z6SnNg+tbO/fzPGip1BPIDDRvnbNoVsmJ24bqqXzkJOkPmsv7rFv0n4ld2q/OQ4IH6B9IxGeTvIK0Ycrl7deHTr1uyd5PkeJOt/BC5SoshIxvyRLlJgLv0mJ+dbBC2fvj5ulRmknQjgU4TKCXwl5wMzMhunxiZ6h1dEPur2SxCa10eixbjEXHptK31gT5wFJ0i9sH5k59HJyH1i84X1uFvnNzoOGDRuPrOva/N5vtLV/St1yMQAen8ixwlRq3chY4rYzg5/sOpWZabf1n/0Bfs7fQOaojJd4FcFQInjHHfseb2o6M6939iTG7o8NnPyrqi9XPLy3eb89QdSTU7+xUAoZYy47TYJYQrxdeUbWqtUfrW1tPb2uofHySiplAdvn4fP7TH2J2ZZ0MrV5ODm+6eq5s4+dcSKFwccjyd+A5jgfyFAGPT3f7I2uProd5oHx8W19/R++WL0XBFIP7uFnwgdsCTr8/dRO2meOr0/JicQ3N4v9mKCy/9BBHYpApPVM2O+fDAaDab/gm1Kkk85Bsun0hrSYbRUnxm9Ig0swWxNYgURfAHmaNN188wvb1qz9z+10Uu15CUIU2xMDJ//m7WrMl+j99e3c23zYXoLY/6lw3B5wAS9EVQpGjD/Iz/lCJGelztygmUa077rzz3YLvrTnyHbVJrUYH2CfI7BVUX+064WslM3eSUVNKFcXLyDsD3E5gUeYOW0yBh4WGEyVhRq5bKARicz9RxWYN5F6Zsx5WNnR1yUIs41eyioR8TXv9hDCL15EnJAsJeenyvXs8tz3FMpSCfL0kB/vBykQRtmGCMwEV6CsX0A5BPMb5awcIyW4gs82tnDTwWaUcWNn3CJFJSD2/o9eH796dx94BI0NBm+48bUne27/1rzsWVlQ+6PtOo703Q89D9p8yAuou0uYVAkBasBDaM5P51F0LkUnvYB5OsFRznMI6xOVPplGLyRqU6RgiBOZfRGCSGLzMFS5M2gLGt45SyenqLEp3gUeoUXEJya2ji7kpBZj/IsfHvk7RTgcb/3oGySYTaWehYX+oFIdYtOmf+netOmtHTW3S1S9BZOTL2svR3c06kzNIYSq+jmWWuHcuT8c7D/xvTelXNhzJ1OPNMKW01et+qDit5gQQgb1b64v63URjJfU05iVgNklRtLU1GbP98xIuu32v3j6li3fvRsqAMr/Z53ud3k4TVo/q6hkUjvfyANb/9m5N/Ka/pi7eYssx2CZYWDgr2PDFx+dV+Qguur93i9u3+X5CSL2hS/zMdf+0c9eST2LLD6B+VlHB7UrW7e88ORiOw+ELm//9jPNL5uPu5758wgdhmWIK2NfTFTiPNx19zNPb9r0b2WnKkRmz8WXwtMMYznaIg0sIr7l5u9tb1t5fF6vd3ayS3bSw+AtdrYMbZGGbCaa7T/x90focvi8lh2YXbLz8EhWfMuunCeCWPCORVlhGYM5D6eH/vhtjP2eV1o7O4/0mo/RacyA04cKPUefA+FwTPke9jIGm9QeP/7q617tEovh6SezTLXRxa6YYxnwCBZdYF+XgmUObVKbpWtEXsoJ/mQhbMYcg3KfUpvX+g379NdyV3UMWkTci10av/YFLQjq6qvG815gY6qOiShch+tJbXJyywBzNli/XZ6ciIELzJsgpupEGR9Y7vZIw6lT+/pOnvxbW7vEjn86+CfHWH+xfnvK5ac8K15p8bI0vhzAltNv6v6H7eHm093MKWCPFF8Zu+f44NBX+pj05Dj01mMevg65IEth7MtSNAy0E67DGRjH6FQl5qXIgjzkQWfBfezicB32mAc5DAu6mEzVXS9Vd71wHUbMkxyGBV/tv06SCRWQw7Aoj2NcJ0kFdacPK+q/Aiza8zLsYxHsA0bL4YGTErCpByFvsdglVIhFfKAJgH3tMMBze5bTQp8SX6PznHIhHLdYVIIY2KNbYjrdW+45788CWPiGRQjcTkJd1lkdHHxpsgfxXO9nUpqoSsvRALKXCahbVI0gBkXlAfQijqubrzFWisWQGlP91cfBf5yOIlnetaSliT0/TVeYF8IRcLwM1BBLUe0xJ0BC6PBiqDMr1JQgDYwonkPbCKD6+wCghipJTMlloY7AIuPU2+tB7D8q6mH+RI0/RmiAw3iw2sRoqCuCNLyx/3ywozlCw/Vct/KYVzXJYpNMjkvwsjwwmkoOLpbxd4u6JMgMJlmYksWx1+Uv9HN5eUIwIQkmKYlUMlFrUvRYEgSZwbxAAeMIluQo7Vz2VpQgIjjItsTC4UD5pXlq45LMyCNJTvJ0BTrn9yUe+UpjXX8q4NcbOPrpl/D5vwAAAABJRU5ErkJggg=="></div>\
                    <div class="title">Sorry, we could not find any results for that</div>\
                    <div class="title-info">Please try searching with another term</div>\
                  </div>\
                {{/if}}\
              {{/if}}\
            {{/if}}\
          {{/if}}\
            {{/if}}\
        </script>'
        if (type === 'searchGridTemplate') {
            return searchGridTemplate;
        }
    }

}

export default SearchGridViewTemplate;



// getTemplateString(type: any) {
//   const searchGridTemplate = '<script type="text/x-jqury-tmpl">\
//     <div class="title-list-heading">Template title comes here</div>\
//     <div class="search-list-template-grid">\
//       <div class="grid-item-col">\
//         <div class="content-info-grid">\
//           <div class="heading-title">\
//             <span>Description comes here</span>\
//           </div>\
//           <div class="desc_text_info">Description comes here, descrip  tion comes here, description comes here, description comes here, description comes here, description comes here, desc....</div>\
//         </div>\
//       </div>\
//       <div class="grid-item-col">\
//         <div class="content-info-grid">\
//           <div class="heading-title">\
//             <span>Description comes here</span>\
//           </div>\
//           <div class="desc_text_info">Description comes here, descrip  tion comes here, description comes here, description comes here, description comes here, description comes here, desc....</div>\
//         </div>\
//       </div>\
//       <div class="grid-item-col">\
//         <div class="content-info-grid">\
//           <div class="heading-title">\
//             <span>Description comes here</span>\
//           </div>\
//           <div class="desc_text_info">Description comes here, descrip  tion comes here, description comes here, description comes here, description comes here, description comes here, desc....</div>\
//         </div>\
//       </div>\
//       <div class="grid-item-col">\
//         <div class="content-info-grid">\
//           <div class="heading-title">\
//             <span>Description comes here</span>\
//           </div>\
//           <div class="desc_text_info">Description comes here, descrip  tion comes here, description comes here, description comes here, description comes here, description comes here, desc....</div>\
//         </div>\
//       </div>\
//     </div>\
//     <div class="search-list-template-grid-img-title">\
//       <div class="grid-item-col">\
//         <div class="content-info-grid">\
//           <div class="heading-title">\
//             <div class="img_block">\
//               <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAnCAYAAAB0Q6rCAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPISURBVHgB1ZhPUhpBFMZf9yCYMmXIDcgJgkvFRLpAq1xFTiCeQHICzQkkJ5CcAHap8k81aoCl5AaTE4RFNpLwOv1GZ2iGYZghiuRbqN12V/+q5/X3XjeDB9WlTK/CUhks6y0skgZ41Yd+c1cIm5qMfpxJmbV4UupmGhZT9gBVaUfkuuyrlJkkT94uMKyrXh/v1hJJa/kIlHqAVT1QvIEKf8ACiAHLMA77D830EiQrCaVUlrkjED4WxHoNFkjn8luXc35CfzPOPnAN64UCAtqwcFJds5WAZxK50ktIZH/Bn25JiF7UeRyeQfK6fbLKUz85tyT9lled/ahz5w58KVtlVFAx+xBU7Uy2slHmzx2YWTxwN7Uj5CGC5g6sgEWO1yDNH3jQ/xLQ20sAa0AEzR24KN43ENUnJ0k5Uj1E1EaxbkeZPzPwubzJw4zaFrnjwlbudR/ZG/q9Ld41o86dCZhsiSwpjh0FaTfirpqKDSxvOkeuLWk7qka1o8dSLGAHFtWx0ZW2OJNxoSnLwYyKDHwh23s+WFcEXacyFSKIxunsdnt53TqFGRQJmBZhXJkL2OCcdE+6pk7JadD3tXdK0nhQrDwL9FTg4SLMq5k5MlHQJ11DH0AM6CWeqjuwrjQ0hRk8FjDFmrcj7hrIDlzP1NA1DNhpGRCj5Cy6lB2LdQqzONChwK+s5ZEdIbii2BjJSOSpfmjlgzadhaQQKdvZs0BPBKYd0beRvAlLcEFj/dBK7yRaqVMP1jis+n/dotgsU1iNQUfw9UDgoB2ZBGtCK8BhnaBg7+K6I33OYlv4gkCBwmoMWpeZ06D5OGz70L8jFqxUIIKKW5tlE5oZX4jACFCINa9aG0KrngEdmoz4aMPKIkLVXMRCVjIXmSYLf1f04eqOLeTAjqdi6hsgmNChyYj7Wicm7KRFwqQn9BjeiTHoBEz81PRAQhWb0TUxGU08dFy/tIgZihPSPTQjANvtozC7lO2JoeVUbAG+zi2eGeEKmqyfhbTX5rrwDwo6VPQFww4V+Tq9jRhdOiOOfPVxYLKnHZr4CJrkBGG1dEFsVEd9ffQJjfthp9lXXN0fKlUynUDX0vUwJwhIRp58O4xNeALRoQpygrC6w/F1VJ/9/XO70xG0woF5qNLTiqWiyFVGkhHM+RJKF9C4FZ7e5ZrZ9gFbT37diVPhkTgMbU1n3R67kK2qfsY89EYw3jAPyJNJ4Z7PAWxgrBk6TrEak7KTQY7/wQs8XRz4Gh/mcsPgF04EC06Z4D2+OzsNmNchsQWLJDX4zmGl5hZgfwFKpyGomp0UxAAAAABJRU5ErkJggg==">\
//             </div>\
//             <span>Description comes here</span>\
//           </div>\
//           <div class="desc_text_info">Description comes here, descrip  tion comes here, description comes here, description comes here, description comes here, description comes here, desc....</div>\
//         </div>\
//       </div>\
//       <div class="grid-item-col">\
//         <div class="content-info-grid">\
//           <div class="heading-title">\
//             <div class="img_block">\
//               <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAnCAYAAAB0Q6rCAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPISURBVHgB1ZhPUhpBFMZf9yCYMmXIDcgJgkvFRLpAq1xFTiCeQHICzQkkJ5CcAHap8k81aoCl5AaTE4RFNpLwOv1GZ2iGYZghiuRbqN12V/+q5/X3XjeDB9WlTK/CUhks6y0skgZ41Yd+c1cIm5qMfpxJmbV4UupmGhZT9gBVaUfkuuyrlJkkT94uMKyrXh/v1hJJa/kIlHqAVT1QvIEKf8ACiAHLMA77D830EiQrCaVUlrkjED4WxHoNFkjn8luXc35CfzPOPnAN64UCAtqwcFJds5WAZxK50ktIZH/Bn25JiF7UeRyeQfK6fbLKUz85tyT9lled/ahz5w58KVtlVFAx+xBU7Uy2slHmzx2YWTxwN7Uj5CGC5g6sgEWO1yDNH3jQ/xLQ20sAa0AEzR24KN43ENUnJ0k5Uj1E1EaxbkeZPzPwubzJw4zaFrnjwlbudR/ZG/q9Ld41o86dCZhsiSwpjh0FaTfirpqKDSxvOkeuLWk7qka1o8dSLGAHFtWx0ZW2OJNxoSnLwYyKDHwh23s+WFcEXacyFSKIxunsdnt53TqFGRQJmBZhXJkL2OCcdE+6pk7JadD3tXdK0nhQrDwL9FTg4SLMq5k5MlHQJ11DH0AM6CWeqjuwrjQ0hRk8FjDFmrcj7hrIDlzP1NA1DNhpGRCj5Cy6lB2LdQqzONChwK+s5ZEdIbii2BjJSOSpfmjlgzadhaQQKdvZs0BPBKYd0beRvAlLcEFj/dBK7yRaqVMP1jis+n/dotgsU1iNQUfw9UDgoB2ZBGtCK8BhnaBg7+K6I33OYlv4gkCBwmoMWpeZ06D5OGz70L8jFqxUIIKKW5tlE5oZX4jACFCINa9aG0KrngEdmoz4aMPKIkLVXMRCVjIXmSYLf1f04eqOLeTAjqdi6hsgmNChyYj7Wicm7KRFwqQn9BjeiTHoBEz81PRAQhWb0TUxGU08dFy/tIgZihPSPTQjANvtozC7lO2JoeVUbAG+zi2eGeEKmqyfhbTX5rrwDwo6VPQFww4V+Tq9jRhdOiOOfPVxYLKnHZr4CJrkBGG1dEFsVEd9ffQJjfthp9lXXN0fKlUynUDX0vUwJwhIRp58O4xNeALRoQpygrC6w/F1VJ/9/XO70xG0woF5qNLTiqWiyFVGkhHM+RJKF9C4FZ7e5ZrZ9gFbT37diVPhkTgMbU1n3R67kK2qfsY89EYw3jAPyJNJ4Z7PAWxgrBk6TrEak7KTQY7/wQs8XRz4Gh/mcsPgF04EC06Z4D2+OzsNmNchsQWLJDX4zmGl5hZgfwFKpyGomp0UxAAAAABJRU5ErkJggg==">\
//             </div>\
//             <span>Description comes here</span>\
//           </div>\
//           <div class="desc_text_info">Description comes here, descrip  tion comes here, description comes here, description comes here, description comes here, description comes here, desc....</div>\
//         </div>\
//       </div>\
//       <div class="grid-item-col">\
//         <div class="content-info-grid">\
//           <div class="heading-title">\
//             <div class="img_block">\
//               <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAnCAYAAAB0Q6rCAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPISURBVHgB1ZhPUhpBFMZf9yCYMmXIDcgJgkvFRLpAq1xFTiCeQHICzQkkJ5CcAHap8k81aoCl5AaTE4RFNpLwOv1GZ2iGYZghiuRbqN12V/+q5/X3XjeDB9WlTK/CUhks6y0skgZ41Yd+c1cIm5qMfpxJmbV4UupmGhZT9gBVaUfkuuyrlJkkT94uMKyrXh/v1hJJa/kIlHqAVT1QvIEKf8ACiAHLMA77D830EiQrCaVUlrkjED4WxHoNFkjn8luXc35CfzPOPnAN64UCAtqwcFJds5WAZxK50ktIZH/Bn25JiF7UeRyeQfK6fbLKUz85tyT9lled/ahz5w58KVtlVFAx+xBU7Uy2slHmzx2YWTxwN7Uj5CGC5g6sgEWO1yDNH3jQ/xLQ20sAa0AEzR24KN43ENUnJ0k5Uj1E1EaxbkeZPzPwubzJw4zaFrnjwlbudR/ZG/q9Ld41o86dCZhsiSwpjh0FaTfirpqKDSxvOkeuLWk7qka1o8dSLGAHFtWx0ZW2OJNxoSnLwYyKDHwh23s+WFcEXacyFSKIxunsdnt53TqFGRQJmBZhXJkL2OCcdE+6pk7JadD3tXdK0nhQrDwL9FTg4SLMq5k5MlHQJ11DH0AM6CWeqjuwrjQ0hRk8FjDFmrcj7hrIDlzP1NA1DNhpGRCj5Cy6lB2LdQqzONChwK+s5ZEdIbii2BjJSOSpfmjlgzadhaQQKdvZs0BPBKYd0beRvAlLcEFj/dBK7yRaqVMP1jis+n/dotgsU1iNQUfw9UDgoB2ZBGtCK8BhnaBg7+K6I33OYlv4gkCBwmoMWpeZ06D5OGz70L8jFqxUIIKKW5tlE5oZX4jACFCINa9aG0KrngEdmoz4aMPKIkLVXMRCVjIXmSYLf1f04eqOLeTAjqdi6hsgmNChyYj7Wicm7KRFwqQn9BjeiTHoBEz81PRAQhWb0TUxGU08dFy/tIgZihPSPTQjANvtozC7lO2JoeVUbAG+zi2eGeEKmqyfhbTX5rrwDwo6VPQFww4V+Tq9jRhdOiOOfPVxYLKnHZr4CJrkBGG1dEFsVEd9ffQJjfthp9lXXN0fKlUynUDX0vUwJwhIRp58O4xNeALRoQpygrC6w/F1VJ/9/XO70xG0woF5qNLTiqWiyFVGkhHM+RJKF9C4FZ7e5ZrZ9gFbT37diVPhkTgMbU1n3R67kK2qfsY89EYw3jAPyJNJ4Z7PAWxgrBk6TrEak7KTQY7/wQs8XRz4Gh/mcsPgF04EC06Z4D2+OzsNmNchsQWLJDX4zmGl5hZgfwFKpyGomp0UxAAAAABJRU5ErkJggg==">\
//             </div>\
//             <span>Description comes here</span>\
//           </div>\
//           <div class="desc_text_info">Description comes here, descrip  tion comes here, description comes here, description comes here, description comes here, description comes here, desc....</div>\
//         </div>\
//       </div>\
//       <div class="grid-item-col">\
//         <div class="content-info-grid">\
//           <div class="heading-title">\
//             <div class="img_block">\
//               <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAnCAYAAAB0Q6rCAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPISURBVHgB1ZhPUhpBFMZf9yCYMmXIDcgJgkvFRLpAq1xFTiCeQHICzQkkJ5CcAHap8k81aoCl5AaTE4RFNpLwOv1GZ2iGYZghiuRbqN12V/+q5/X3XjeDB9WlTK/CUhks6y0skgZ41Yd+c1cIm5qMfpxJmbV4UupmGhZT9gBVaUfkuuyrlJkkT94uMKyrXh/v1hJJa/kIlHqAVT1QvIEKf8ACiAHLMA77D830EiQrCaVUlrkjED4WxHoNFkjn8luXc35CfzPOPnAN64UCAtqwcFJds5WAZxK50ktIZH/Bn25JiF7UeRyeQfK6fbLKUz85tyT9lled/ahz5w58KVtlVFAx+xBU7Uy2slHmzx2YWTxwN7Uj5CGC5g6sgEWO1yDNH3jQ/xLQ20sAa0AEzR24KN43ENUnJ0k5Uj1E1EaxbkeZPzPwubzJw4zaFrnjwlbudR/ZG/q9Ld41o86dCZhsiSwpjh0FaTfirpqKDSxvOkeuLWk7qka1o8dSLGAHFtWx0ZW2OJNxoSnLwYyKDHwh23s+WFcEXacyFSKIxunsdnt53TqFGRQJmBZhXJkL2OCcdE+6pk7JadD3tXdK0nhQrDwL9FTg4SLMq5k5MlHQJ11DH0AM6CWeqjuwrjQ0hRk8FjDFmrcj7hrIDlzP1NA1DNhpGRCj5Cy6lB2LdQqzONChwK+s5ZEdIbii2BjJSOSpfmjlgzadhaQQKdvZs0BPBKYd0beRvAlLcEFj/dBK7yRaqVMP1jis+n/dotgsU1iNQUfw9UDgoB2ZBGtCK8BhnaBg7+K6I33OYlv4gkCBwmoMWpeZ06D5OGz70L8jFqxUIIKKW5tlE5oZX4jACFCINa9aG0KrngEdmoz4aMPKIkLVXMRCVjIXmSYLf1f04eqOLeTAjqdi6hsgmNChyYj7Wicm7KRFwqQn9BjeiTHoBEz81PRAQhWb0TUxGU08dFy/tIgZihPSPTQjANvtozC7lO2JoeVUbAG+zi2eGeEKmqyfhbTX5rrwDwo6VPQFww4V+Tq9jRhdOiOOfPVxYLKnHZr4CJrkBGG1dEFsVEd9ffQJjfthp9lXXN0fKlUynUDX0vUwJwhIRp58O4xNeALRoQpygrC6w/F1VJ/9/XO70xG0woF5qNLTiqWiyFVGkhHM+RJKF9C4FZ7e5ZrZ9gFbT37diVPhkTgMbU1n3R67kK2qfsY89EYw3jAPyJNJ4Z7PAWxgrBk6TrEak7KTQY7/wQs8XRz4Gh/mcsPgF04EC06Z4D2+OzsNmNchsQWLJDX4zmGl5hZgfwFKpyGomp0UxAAAAABJRU5ErkJggg==">\
//             </div>\
//             <span>Description comes here</span>\
//           </div>\
//           <div class="desc_text_info">Description comes here, descrip  tion comes here, description comes here, description comes here, description comes here, description comes here, desc....</div>\
//         </div>\
//       </div>\
//     </div>\
//     <div class="search-list-template-grid-img">\
//       <div class="grid-item-col">\
//         <div class="content-info-grid">\
//           <div class="img-block-data">\
//             <img src="data:image/png;base64,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">\
//           </div>\
//         </div>\
//       </div>\
//       <div class="grid-item-col">\
//         <div class="content-info-grid">\
//           <div class="img-block-data">\
//             <img src="data:image/png;base64,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">\
//           </div>\
//         </div>\
//       </div>\
//     </div>\
//     <div class="search-list-template-grid-title-img-desc">\
//       <div class="grid-item-col">\
//         <div class="content-info-grid">\
//           <div class="heading-title">Heading comes here</div>\
//           <div class="img-with-desc">\
//             <div class="img_info">\
//               <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAbCAYAAABr/T8RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAK8SURBVHgBvZZdctowEMd35RTKS5rcwDlByWNCM0UT0mc4QeAEdU9QOEHoCUhOAG+daUMVyAT6Br0BN6hfOpM0tbZaGfP9WaD/GQ2WWftnaf9aCcHos1JuzEm8B6AD2JnQhyD4cS5T17ZnoSLWMZc7hA4lBBbl2UkJ683vVSCdJYAuaGgQkA87EAK6KODSwvXT4Z6BJrmjNRXeyVQXdqjbRus1AiSfIZYV0U0nlvgJW9AX9ZDkNus/gTiYTQFblLpvf3QEdrjx9aLYrYGVUgcmXcWob649+B/gdbU1sJTSN6MsRX2toQSbgr+q+/QqcRcyVRQ6ccjtQp6WYRMwm0QIR9WbrStYQVIe+9yWxS0E36pWdmAYAm+ZU6vGYFwJYQXNBfMLUFDFMglsYeGPmAfn+H0R78RFvMoOh38Bh/U7rrh+cynNpE+PI+NYeKN9OfnMCwM0P66JT5Lzsgrrgnm6Qii4pvUcjTm+z8Yh0DcWDnQ9ajhl8s+lEGydJ5+I0vXmQ2Ut8L4Tr4RQ8oVGs0pOetF/mbdv8oh4Zx8UTpVLI0+9Nvnne6SxYL7qgw0mzC/yxBjYBhJk7ai0zo1CI2HwmEOwOT9wBKjIfJyKjDyt2f22D1/kiQFYBI/e6Esu5NndrAe4UGA4/b2RPbzMqYhizs0aHvVEXbW8ueBoukLo8CWz4Sc9TkMI570W0pNOtp7Q9KlPuZo05HiOCWrLoNNwY6Y5Ts7IlDdiyLIxnTsL3BOUKMAaYnigQS5ysqOfvcgTEK6UcXCgKbdKqZuUPbUscHLoiadBWqbAm5xAljmZ4VFapsD6968j2EDLnMxpQRTdEBr4+K3ZVpwf4KnoF4eNZE6sg2WGojYcpTmz92uEGf3RHgZQIEF8rnbNbpCHjYUTHzEunhUzOz0bpVTbDYA8Uw5fwQ6l6c9NVJj+AskwkARcpojIAAAAAElFTkSuQmCC">\
//             </div>\
//             <div class="desc-text">Men wardrobes there most special piecesa...</div>\
//           </div>\
//           <div class="img-with-desc">\
//             <div class="img_info">\
//               <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAbCAYAAABr/T8RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAK8SURBVHgBvZZdctowEMd35RTKS5rcwDlByWNCM0UT0mc4QeAEdU9QOEHoCUhOAG+daUMVyAT6Br0BN6hfOpM0tbZaGfP9WaD/GQ2WWftnaf9aCcHos1JuzEm8B6AD2JnQhyD4cS5T17ZnoSLWMZc7hA4lBBbl2UkJ683vVSCdJYAuaGgQkA87EAK6KODSwvXT4Z6BJrmjNRXeyVQXdqjbRus1AiSfIZYV0U0nlvgJW9AX9ZDkNus/gTiYTQFblLpvf3QEdrjx9aLYrYGVUgcmXcWob649+B/gdbU1sJTSN6MsRX2toQSbgr+q+/QqcRcyVRQ6ccjtQp6WYRMwm0QIR9WbrStYQVIe+9yWxS0E36pWdmAYAm+ZU6vGYFwJYQXNBfMLUFDFMglsYeGPmAfn+H0R78RFvMoOh38Bh/U7rrh+cynNpE+PI+NYeKN9OfnMCwM0P66JT5Lzsgrrgnm6Qii4pvUcjTm+z8Yh0DcWDnQ9ajhl8s+lEGydJ5+I0vXmQ2Ut8L4Tr4RQ8oVGs0pOetF/mbdv8oh4Zx8UTpVLI0+9Nvnne6SxYL7qgw0mzC/yxBjYBhJk7ai0zo1CI2HwmEOwOT9wBKjIfJyKjDyt2f22D1/kiQFYBI/e6Esu5NndrAe4UGA4/b2RPbzMqYhizs0aHvVEXbW8ueBoukLo8CWz4Sc9TkMI570W0pNOtp7Q9KlPuZo05HiOCWrLoNNwY6Y5Ts7IlDdiyLIxnTsL3BOUKMAaYnigQS5ysqOfvcgTEK6UcXCgKbdKqZuUPbUscHLoiadBWqbAm5xAljmZ4VFapsD6968j2EDLnMxpQRTdEBr4+K3ZVpwf4KnoF4eNZE6sg2WGojYcpTmz92uEGf3RHgZQIEF8rnbNbpCHjYUTHzEunhUzOz0bpVTbDYA8Uw5fwQ6l6c9NVJj+AskwkARcpojIAAAAAElFTkSuQmCC">\
//             </div>\
//             <div class="desc-text">Men wardrobes there most special piecesa...</div>\
//           </div>\
//           <div class="img-with-desc">\
//             <div class="img_info">\
//               <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAbCAYAAABr/T8RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAK8SURBVHgBvZZdctowEMd35RTKS5rcwDlByWNCM0UT0mc4QeAEdU9QOEHoCUhOAG+daUMVyAT6Br0BN6hfOpM0tbZaGfP9WaD/GQ2WWftnaf9aCcHos1JuzEm8B6AD2JnQhyD4cS5T17ZnoSLWMZc7hA4lBBbl2UkJ683vVSCdJYAuaGgQkA87EAK6KODSwvXT4Z6BJrmjNRXeyVQXdqjbRus1AiSfIZYV0U0nlvgJW9AX9ZDkNus/gTiYTQFblLpvf3QEdrjx9aLYrYGVUgcmXcWob649+B/gdbU1sJTSN6MsRX2toQSbgr+q+/QqcRcyVRQ6ccjtQp6WYRMwm0QIR9WbrStYQVIe+9yWxS0E36pWdmAYAm+ZU6vGYFwJYQXNBfMLUFDFMglsYeGPmAfn+H0R78RFvMoOh38Bh/U7rrh+cynNpE+PI+NYeKN9OfnMCwM0P66JT5Lzsgrrgnm6Qii4pvUcjTm+z8Yh0DcWDnQ9ajhl8s+lEGydJ5+I0vXmQ2Ut8L4Tr4RQ8oVGs0pOetF/mbdv8oh4Zx8UTpVLI0+9Nvnne6SxYL7qgw0mzC/yxBjYBhJk7ai0zo1CI2HwmEOwOT9wBKjIfJyKjDyt2f22D1/kiQFYBI/e6Esu5NndrAe4UGA4/b2RPbzMqYhizs0aHvVEXbW8ueBoukLo8CWz4Sc9TkMI570W0pNOtp7Q9KlPuZo05HiOCWrLoNNwY6Y5Ts7IlDdiyLIxnTsL3BOUKMAaYnigQS5ysqOfvcgTEK6UcXCgKbdKqZuUPbUscHLoiadBWqbAm5xAljmZ4VFapsD6968j2EDLnMxpQRTdEBr4+K3ZVpwf4KnoF4eNZE6sg2WGojYcpTmz92uEGf3RHgZQIEF8rnbNbpCHjYUTHzEunhUzOz0bpVTbDYA8Uw5fwQ6l6c9NVJj+AskwkARcpojIAAAAAElFTkSuQmCC">\
//             </div>\
//             <div class="desc-text">Men wardrobes there most special piecesa...</div>\
//           </div>\
//         </div>\
//       </div>\
//       <div class="grid-item-col">\
//         <div class="content-info-grid">\
//           <div class="heading-title">Heading comes here</div>\
//           <div class="img-with-desc">\
//             <div class="img_info">\
//               <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAbCAYAAABr/T8RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAK8SURBVHgBvZZdctowEMd35RTKS5rcwDlByWNCM0UT0mc4QeAEdU9QOEHoCUhOAG+daUMVyAT6Br0BN6hfOpM0tbZaGfP9WaD/GQ2WWftnaf9aCcHos1JuzEm8B6AD2JnQhyD4cS5T17ZnoSLWMZc7hA4lBBbl2UkJ683vVSCdJYAuaGgQkA87EAK6KODSwvXT4Z6BJrmjNRXeyVQXdqjbRus1AiSfIZYV0U0nlvgJW9AX9ZDkNus/gTiYTQFblLpvf3QEdrjx9aLYrYGVUgcmXcWob649+B/gdbU1sJTSN6MsRX2toQSbgr+q+/QqcRcyVRQ6ccjtQp6WYRMwm0QIR9WbrStYQVIe+9yWxS0E36pWdmAYAm+ZU6vGYFwJYQXNBfMLUFDFMglsYeGPmAfn+H0R78RFvMoOh38Bh/U7rrh+cynNpE+PI+NYeKN9OfnMCwM0P66JT5Lzsgrrgnm6Qii4pvUcjTm+z8Yh0DcWDnQ9ajhl8s+lEGydJ5+I0vXmQ2Ut8L4Tr4RQ8oVGs0pOetF/mbdv8oh4Zx8UTpVLI0+9Nvnne6SxYL7qgw0mzC/yxBjYBhJk7ai0zo1CI2HwmEOwOT9wBKjIfJyKjDyt2f22D1/kiQFYBI/e6Esu5NndrAe4UGA4/b2RPbzMqYhizs0aHvVEXbW8ueBoukLo8CWz4Sc9TkMI570W0pNOtp7Q9KlPuZo05HiOCWrLoNNwY6Y5Ts7IlDdiyLIxnTsL3BOUKMAaYnigQS5ysqOfvcgTEK6UcXCgKbdKqZuUPbUscHLoiadBWqbAm5xAljmZ4VFapsD6968j2EDLnMxpQRTdEBr4+K3ZVpwf4KnoF4eNZE6sg2WGojYcpTmz92uEGf3RHgZQIEF8rnbNbpCHjYUTHzEunhUzOz0bpVTbDYA8Uw5fwQ6l6c9NVJj+AskwkARcpojIAAAAAElFTkSuQmCC">\
//             </div>\
//             <div class="desc-text">Men wardrobes there most special piecesa...</div>\
//           </div>\
//           <div class="img-with-desc">\
//             <div class="img_info">\
//               <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAbCAYAAABr/T8RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAK8SURBVHgBvZZdctowEMd35RTKS5rcwDlByWNCM0UT0mc4QeAEdU9QOEHoCUhOAG+daUMVyAT6Br0BN6hfOpM0tbZaGfP9WaD/GQ2WWftnaf9aCcHos1JuzEm8B6AD2JnQhyD4cS5T17ZnoSLWMZc7hA4lBBbl2UkJ683vVSCdJYAuaGgQkA87EAK6KODSwvXT4Z6BJrmjNRXeyVQXdqjbRus1AiSfIZYV0U0nlvgJW9AX9ZDkNus/gTiYTQFblLpvf3QEdrjx9aLYrYGVUgcmXcWob649+B/gdbU1sJTSN6MsRX2toQSbgr+q+/QqcRcyVRQ6ccjtQp6WYRMwm0QIR9WbrStYQVIe+9yWxS0E36pWdmAYAm+ZU6vGYFwJYQXNBfMLUFDFMglsYeGPmAfn+H0R78RFvMoOh38Bh/U7rrh+cynNpE+PI+NYeKN9OfnMCwM0P66JT5Lzsgrrgnm6Qii4pvUcjTm+z8Yh0DcWDnQ9ajhl8s+lEGydJ5+I0vXmQ2Ut8L4Tr4RQ8oVGs0pOetF/mbdv8oh4Zx8UTpVLI0+9Nvnne6SxYL7qgw0mzC/yxBjYBhJk7ai0zo1CI2HwmEOwOT9wBKjIfJyKjDyt2f22D1/kiQFYBI/e6Esu5NndrAe4UGA4/b2RPbzMqYhizs0aHvVEXbW8ueBoukLo8CWz4Sc9TkMI570W0pNOtp7Q9KlPuZo05HiOCWrLoNNwY6Y5Ts7IlDdiyLIxnTsL3BOUKMAaYnigQS5ysqOfvcgTEK6UcXCgKbdKqZuUPbUscHLoiadBWqbAm5xAljmZ4VFapsD6968j2EDLnMxpQRTdEBr4+K3ZVpwf4KnoF4eNZE6sg2WGojYcpTmz92uEGf3RHgZQIEF8rnbNbpCHjYUTHzEunhUzOz0bpVTbDYA8Uw5fwQ6l6c9NVJj+AskwkARcpojIAAAAAElFTkSuQmCC">\
//             </div>\
//             <div class="desc-text">Men wardrobes there most special piecesa...</div>\
//           </div>\
//           <div class="img-with-desc">\
//             <div class="img_info">\
//               <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAbCAYAAABr/T8RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAK8SURBVHgBvZZdctowEMd35RTKS5rcwDlByWNCM0UT0mc4QeAEdU9QOEHoCUhOAG+daUMVyAT6Br0BN6hfOpM0tbZaGfP9WaD/GQ2WWftnaf9aCcHos1JuzEm8B6AD2JnQhyD4cS5T17ZnoSLWMZc7hA4lBBbl2UkJ683vVSCdJYAuaGgQkA87EAK6KODSwvXT4Z6BJrmjNRXeyVQXdqjbRus1AiSfIZYV0U0nlvgJW9AX9ZDkNus/gTiYTQFblLpvf3QEdrjx9aLYrYGVUgcmXcWob649+B/gdbU1sJTSN6MsRX2toQSbgr+q+/QqcRcyVRQ6ccjtQp6WYRMwm0QIR9WbrStYQVIe+9yWxS0E36pWdmAYAm+ZU6vGYFwJYQXNBfMLUFDFMglsYeGPmAfn+H0R78RFvMoOh38Bh/U7rrh+cynNpE+PI+NYeKN9OfnMCwM0P66JT5Lzsgrrgnm6Qii4pvUcjTm+z8Yh0DcWDnQ9ajhl8s+lEGydJ5+I0vXmQ2Ut8L4Tr4RQ8oVGs0pOetF/mbdv8oh4Zx8UTpVLI0+9Nvnne6SxYL7qgw0mzC/yxBjYBhJk7ai0zo1CI2HwmEOwOT9wBKjIfJyKjDyt2f22D1/kiQFYBI/e6Esu5NndrAe4UGA4/b2RPbzMqYhizs0aHvVEXbW8ueBoukLo8CWz4Sc9TkMI570W0pNOtp7Q9KlPuZo05HiOCWrLoNNwY6Y5Ts7IlDdiyLIxnTsL3BOUKMAaYnigQS5ysqOfvcgTEK6UcXCgKbdKqZuUPbUscHLoiadBWqbAm5xAljmZ4VFapsD6968j2EDLnMxpQRTdEBr4+K3ZVpwf4KnoF4eNZE6sg2WGojYcpTmz92uEGf3RHgZQIEF8rnbNbpCHjYUTHzEunhUzOz0bpVTbDYA8Uw5fwQ6l6c9NVJj+AskwkARcpojIAAAAAElFTkSuQmCC">\
//             </div>\
//             <div class="desc-text">Men wardrobes there most special piecesa...</div>\
//           </div>\
//         </div>\
//       </div>\
//     </div>\
//     <div class="search-list-template-grid-title-img-card">\
//       <div class="grid-item-col">\
//         <div class="content-info-grid">\
//           <div class="main-img-block">\
//             <img src="data:image/png;base64,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">\
//           </div>\
//           <div class="heading-title">Heading comes here</div>\
//           <div class="desc-text">Description text comes here, Description text comes here.</div>\
//           <div class="price-tag">$156</div>\
//         </div>\
//       </div>\
//       <div class="grid-item-col">\
//         <div class="content-info-grid">\
//           <div class="main-img-block">\
//             <img src="data:image/png;base64,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">\
//           </div>\
//           <div class="heading-title">Heading comes here</div>\
//           <div class="desc-text">Description text comes here, Description text comes here.</div>\
//           <div class="price-tag">$156</div>\
//         </div>\
//       </div>\
//     </div>\
//   </script>'
//   if (type === 'searchGridTemplate') {
//       return searchGridTemplate;
//   }
// }