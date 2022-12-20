
import helpers from '../../../utils/helpers';
import './trackOrderTemplate.scss';
class TrackOrderTemplate {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let helpersObj = helpers;
        var extension = '';
        var _extractedFileName = '';
        function strSplit(str:any) {
            return (str.split('.'));
        }
        if (msgData.message && msgData.message[0] && msgData.message[0].cInfo && msgData.message[0].cInfo.attachments) {
            extension = strSplit(msgData.message[0].cInfo.attachments[0].fileName);
        }
        if (msgData.message && msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.url) {
            extension = strSplit(msgData.message[0].component.payload.url);
            _extractedFileName = msgData.message[0].component.payload.url.replace(/^.*[\\\/]/, '');
        }
        if (msgData?.message?.[0]?.component?.payload?.template_type === "track_order_template") {
            me.messageHtml = $(me.getTemplateString("trackOrderTemplate")).tmpl({
                'msgData': msgData,
                'helpers': helpersObj.helpers,
                'extension': extension
            });
            setTimeout(() => {
                me.bindEvents(me.messageHtml, msgData);
            }, 200)
            return me.messageHtml;
        }
    }
    bindEvents(messageHtml:any, msgData:any) {
        let me :any = this;
        let chatWindowInstance = me.hostInstance;
        let $ = me.hostInstance.$;
        $(messageHtml).find('.trak-details').off('click', '.track-order').on('click', '.track-order', function (e:any) {
            $(e.currentTarget).closest('.order-info-cards').addClass('track-order-active');
            if ($('body').hasClass('top-down')) {
                // var endTaskMsgTemplate = '<div class="task-ended-message">\
                //                       <div class="end-message-container">\
                //                         <div class="smile-img-icon"><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDIxQzE2Ljk3MDYgMjEgMjEgMTYuOTcwNiAyMSAxMkMyMSA3LjAyOTQ0IDE2Ljk3MDYgMyAxMiAzQzcuMDI5NDQgMyAzIDcuMDI5NDQgMyAxMkMzIDE2Ljk3MDYgNy4wMjk0NCAyMSAxMiAyMVoiIGZpbGw9InVybCgjcGFpbnQwX3JhZGlhbCkiLz4KPHBhdGggZD0iTTE4IDE2QzE5LjM4MDcgMTYgMjAuNSAxNC44ODA3IDIwLjUgMTMuNUMyMC41IDEyLjExOTMgMTkuMzgwNyAxMSAxOCAxMUMxNi42MTkzIDExIDE1LjUgMTIuMTE5MyAxNS41IDEzLjVDMTUuNSAxNC44ODA3IDE2LjYxOTMgMTYgMTggMTZaIiBmaWxsPSJ1cmwoI3BhaW50MV9yYWRpYWwpIi8+CjxwYXRoIGQ9Ik02IDE2QzcuMzgwNzEgMTYgOC41IDE0Ljg4MDcgOC41IDEzLjVDOC41IDEyLjExOTMgNy4zODA3MSAxMSA2IDExQzQuNjE5MjkgMTEgMy41IDEyLjExOTMgMy41IDEzLjVDMy41IDE0Ljg4MDcgNC42MTkyOSAxNiA2IDE2WiIgZmlsbD0idXJsKCNwYWludDJfcmFkaWFsKSIvPgo8cGF0aCBkPSJNMTYuMzE5MiAxNUMxNi4zMTkyIDE1IDE1LjMyMTIgMTcuNSAxMS45OTgyIDE3LjVDOC45MjAxOSAxNy41IDcuNjc5NjkgMTUgNy42Nzk2OSAxNUM3LjY3OTY5IDE1IDguNDkzMTkgMTYuMTUyNSAxMi4wMzk3IDE2LjE1MjVDMTUuNTg2MiAxNi4xNTI1IDE2LjMxOTIgMTUgMTYuMzE5MiAxNVoiIGZpbGw9InVybCgjcGFpbnQzX3JhZGlhbCkiLz4KPHBhdGggZD0iTTEyLjAwMDIgMTcuNDk5OEM4LjU5MjcyIDE3LjQ5OTggNy4zODY3MiAxNC41OTAzIDcuMzg2NzIgMTQuNTkwM0M3LjM4NjcyIDE0LjU5MDMgNy45NjE3MiAxOC40OTk4IDEyLjAwMDIgMTguNDk5OEMxNi4wMzg3IDE4LjQ5OTggMTYuNjEzNyAxNC41OTAzIDE2LjYxMzcgMTQuNTkwM0MxNi42MTM3IDE0LjU5MDMgMTUuNDA3NyAxNy40OTk4IDEyLjAwMDIgMTcuNDk5OFoiIGZpbGw9InVybCgjcGFpbnQ0X3JhZGlhbCkiLz4KPHBhdGggZD0iTTE2LjE4ODUgMTQuMzk0QzE2LjQxNiAxNC4yMDQgMTYuNzI2NSAxNC41MDE1IDE2LjU0NyAxNC43Mzc1QzE1LjcyNiAxNS44MTcgMTQuMzAxIDE3IDExLjk5OTUgMTdDOS42OTggMTcgOC4yNzMgMTUuODE3IDcuNDUyIDE0LjczNzVDNy4yNzI1IDE0LjUwMTUgNy41ODMgMTQuMjA0IDcuODEwNSAxNC4zOTRDOC43NSAxNS4xNzc1IDEwLjE3MTUgMTYgMTEuOTk5NSAxNkMxMy44Mjc1IDE2IDE1LjI0OSAxNS4xNzc1IDE2LjE4ODUgMTQuMzk0WiIgZmlsbD0idXJsKCNwYWludDVfcmFkaWFsKSIvPgo8cGF0aCBkPSJNMTcuMjUgMTEuNUMxNy4zODgxIDExLjUgMTcuNSAxMS4zODgxIDE3LjUgMTEuMjVDMTcuNSAxMS4xMTE5IDE3LjM4ODEgMTEgMTcuMjUgMTFDMTcuMTExOSAxMSAxNyAxMS4xMTE5IDE3IDExLjI1QzE3IDExLjM4ODEgMTcuMTExOSAxMS41IDE3LjI1IDExLjVaIiBmaWxsPSIjMjEyMTIxIi8+CjxwYXRoIGQ9Ik0xMy44NzAyIDExLjQ2OTVDMTMuODcwMiAxMS40Njk1IDE0LjczMzIgMTAuOTk3NSAxNS40OTkyIDEwLjk5NzVDMTYuMjY1MiAxMC45OTc1IDE3LjEyODIgMTEuNDY5NSAxNy4xMjgyIDExLjQ2OTVMMTcuNDQzNyAxMS4wOTI1QzE3LjQ0MzcgMTEuMDkyNSAxNi41NjEyIDEwIDE1LjQ5OTIgMTBDMTQuNDM3MiAxMCAxMy41NTQ3IDExLjA5MjUgMTMuNTU0NyAxMS4wOTI1TDEzLjg3MDIgMTEuNDY5NVoiIGZpbGw9IiMyMTIxMjEiLz4KPHBhdGggZD0iTTEzLjc1IDExLjVDMTMuODg4MSAxMS41IDE0IDExLjM4ODEgMTQgMTEuMjVDMTQgMTEuMTExOSAxMy44ODgxIDExIDEzLjc1IDExQzEzLjYxMTkgMTEgMTMuNSAxMS4xMTE5IDEzLjUgMTEuMjVDMTMuNSAxMS4zODgxIDEzLjYxMTkgMTEuNSAxMy43NSAxMS41WiIgZmlsbD0iIzIxMjEyMSIvPgo8cGF0aCBkPSJNMTAuMjUgMTEuNUMxMC4zODgxIDExLjUgMTAuNSAxMS4zODgxIDEwLjUgMTEuMjVDMTAuNSAxMS4xMTE5IDEwLjM4ODEgMTEgMTAuMjUgMTFDMTAuMTExOSAxMSAxMCAxMS4xMTE5IDEwIDExLjI1QzEwIDExLjM4ODEgMTAuMTExOSAxMS41IDEwLjI1IDExLjVaIiBmaWxsPSIjMjEyMTIxIi8+CjxwYXRoIGQ9Ik02Ljg3MDE5IDExLjQ2OTVDNi44NzAxOSAxMS40Njk1IDcuNzMzMTkgMTAuOTk3NSA4LjQ5OTE5IDEwLjk5NzVDOS4yNjUxOSAxMC45OTc1IDEwLjEyODIgMTEuNDY5NSAxMC4xMjgyIDExLjQ2OTVMMTAuNDQzNyAxMS4wOTI1QzEwLjQ0MzcgMTEuMDkyNSA5LjU2MTE5IDEwIDguNDk5MTkgMTBDNy40MzcxOSAxMCA2LjU1NDY5IDExLjA5MjUgNi41NTQ2OSAxMS4wOTI1TDYuODcwMTkgMTEuNDY5NVoiIGZpbGw9IiMyMTIxMjEiLz4KPHBhdGggZD0iTTYuNzUgMTEuNUM2Ljg4ODA3IDExLjUgNyAxMS4zODgxIDcgMTEuMjVDNyAxMS4xMTE5IDYuODg4MDcgMTEgNi43NSAxMUM2LjYxMTkzIDExIDYuNSAxMS4xMTE5IDYuNSAxMS4yNUM2LjUgMTEuMzg4MSA2LjYxMTkzIDExLjUgNi43NSAxMS41WiIgZmlsbD0iIzIxMjEyMSIvPgo8ZGVmcz4KPHJhZGlhbEdyYWRpZW50IGlkPSJwYWludDBfcmFkaWFsIiBjeD0iMCIgY3k9IjAiIHI9IjEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBncmFkaWVudFRyYW5zZm9ybT0idHJhbnNsYXRlKDEyIDEyKSBzY2FsZSg5KSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGRkUxNkUiLz4KPHN0b3Agb2Zmc2V0PSIwLjYyOSIgc3RvcC1jb2xvcj0iI0ZGRDIyNiIvPgo8c3RvcCBvZmZzZXQ9IjAuNzUiIHN0b3AtY29sb3I9IiNGRENEMjMiLz4KPHN0b3Agb2Zmc2V0PSIwLjg5OSIgc3RvcC1jb2xvcj0iI0Y2QkQxQiIvPgo8c3RvcCBvZmZzZXQ9IjAuOTk5IiBzdG9wLWNvbG9yPSIjRjBBRjEzIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQxX3JhZGlhbCIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgxOCAxMy41KSBzY2FsZSgyLjUpIj4KPHN0b3Agc3RvcC1jb2xvcj0iI0ZGODQwMCIgc3RvcC1vcGFjaXR5PSIwLjYiLz4KPHN0b3Agb2Zmc2V0PSIwLjk5OSIgc3RvcC1jb2xvcj0iI0ZGODQwMCIgc3RvcC1vcGFjaXR5PSIwIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQyX3JhZGlhbCIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSg2IDEzLjUpIHNjYWxlKDIuNSkiPgo8c3RvcCBzdG9wLWNvbG9yPSIjRkY4NDAwIiBzdG9wLW9wYWNpdHk9IjAuNiIvPgo8c3RvcCBvZmZzZXQ9IjAuOTk5IiBzdG9wLWNvbG9yPSIjRkY4NDAwIiBzdG9wLW9wYWNpdHk9IjAiLz4KPC9yYWRpYWxHcmFkaWVudD4KPHJhZGlhbEdyYWRpZW50IGlkPSJwYWludDNfcmFkaWFsIiBjeD0iMCIgY3k9IjAiIHI9IjEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBncmFkaWVudFRyYW5zZm9ybT0idHJhbnNsYXRlKDExLjk5NiAxNS4xNjMpIHNjYWxlKDUuMjI4MjEgMi44MzI0OCkiPgo8c3RvcCBvZmZzZXQ9IjAuOTQ3IiBzdG9wLWNvbG9yPSIjRkZFMTZFIi8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0ZGRTE2RSIgc3RvcC1vcGFjaXR5PSIwIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQ0X3JhZGlhbCIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgxMi4wNTI0IDEzLjc0Nikgc2NhbGUoNC42MzEyMyA0LjczNTEpIj4KPHN0b3Agb2Zmc2V0PSIwLjgxOSIgc3RvcC1jb2xvcj0iI0NDOTAwMCIvPgo8c3RvcCBvZmZzZXQ9IjAuOTg4IiBzdG9wLWNvbG9yPSIjRkJCQzIzIiBzdG9wLW9wYWNpdHk9IjAuMDY5Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0ZGQkYyNiIgc3RvcC1vcGFjaXR5PSIwIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQ1X3JhZGlhbCIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgxMS45OTk1IDE0LjkyMTUpIHNjYWxlKDQuODI2IDEuODExNjgpIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzFDMTkxMSIvPgo8c3RvcCBvZmZzZXQ9IjAuOTk5IiBzdG9wLWNvbG9yPSIjMTcxNzE0Ii8+CjwvcmFkaWFsR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==" /></div>\
                //                         <div class="end-message">Hope that your query has been addressed</div>\
                //                       </div>\
                //                       <div class="back-to-search"><a><img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUuODY4OTQgMy42NDgzMkM1LjY1OTc4IDMuNDQ1OTggNS4zMjYyNCAzLjQ1MTMzIDUuMTIzNjggMy42NjAyOEwxLjA1OTkgNy44NTIyQzAuOTgwMDM1IDcuOTM0NTggMC45ODAwMzUgOC4wNjU1IDEuMDU5OSA4LjE0Nzg3TDUuMTIzNTUgMTIuMzM5N0M1LjMyNjE4IDEyLjU0ODcgNS42NTk4NCAxMi41NTQgNS44NjkwNyAxMi4zNTE2QzYuMDc4NTggMTIuMTQ4OSA2LjA4Mzk4IDExLjgxNDggNS44ODExNCAxMS42MDU0TDIuOTA2NzggOC41MzU3SDE0LjQ3MjZDMTQuNzYzOSA4LjUzNTcgMTUgOC4yOTk1NyAxNSA4LjAwODI4QzE1IDcuNzE2OTkgMTQuNzYzOSA3LjQ4MDg1IDE0LjQ3MjYgNy40ODA4NUgyLjg4NjE4TDUuODgwNzUgNC4zOTQ1M0M2LjA4Mzc3IDQuMTg1MyA2LjA3ODQ4IDMuODUxMDMgNS44Njg5NCAzLjY0ODMyWiIgZmlsbD0iIzBENkVGRCIvPgo8L3N2Zz4K"/><span>Back to Search</span></a></div>\
                //                     </div>';
                // $('#searchChatContainer').append(endTaskMsgTemplate);
                $(messageHtml).find('.task-ended-message').off('click', '.back-to-search').on('click', '.back-to-search', function (e:any) {
                    if (chatWindowInstance.isDev == false) {
                        $("#searchChatContainer .task-ended-message").remove();
                    }
                    $('#conversation-container').hide();
                });
            }
        })
    }
    getTemplateString() {
        var trackOrderTemplate = '<script>\
        <div class="messageBubble">\
            <div class="messageBubble-content">\
                <div class="order-track-container botMessage">\
                    <div class="heading-text">${msgData.message[0].component.payload.text}</div>\
                    {{each(key, data) msgData.message[0].component.payload.data}}\
                    <div class="order-info-cards">\
                        <div class="order-card-data order-track-steps">\
                            <div class="img-block">\
                                <img src="${data.prod_image_url}">\
                            </div>\
                            <div class="content-text">\
                                <div class="time-estimated">Exp. Dt ${data.exp_date}</div>\
                                <div class="name-order">${data.prod_title}</div>\
                                <div class="track-steps">\
                                    <div class="track-title-data left-text track-done">\
                                        <div class="track-dot"></div>\
                                        <div class="text-track">${data.status[0]}</div>\
                                    </div>\
                                    <div class="track-title-data track-done">\
                                        <div class="track-dot"></div>\
                                        <div class="text-track">${data.status[1]}</div>\
                                    </div>\
                                    <div class="track-title-data track-inprogress">\
                                        <div class="track-dot"></div>\
                                        <div class="text-track">${data.status[2]}</div>\
                                    </div>\
                                    <div class="track-title-data right-text">\
                                        <div class="track-dot"></div>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                        <div class="order-card-data">\
                            <div class="img-block">\
                                <img src="${data.prod_image_url}">\
                            </div>\
                            <div class="content-text">\
                                <div class="title">${data.prod_title}</div>\
                                <div class="date-text">Exp. Dt ${data.exp_date}</div>\
                                <div class="order-details">${data.order_id}</div>\
                            </div>\
                            <div class="trak-details">\
                                <div class="button-track track-order">\
                                    <img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Cosmetics_demo/loaction-green.svg">\
                                        <span>Track</span>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                    {{/each}}\
                </div>\
            </div>\
        </div>\
    </script>';
        return trackOrderTemplate;
    }
    
}

export default TrackOrderTemplate;