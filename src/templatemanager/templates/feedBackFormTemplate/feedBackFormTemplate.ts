import helpers from '../../../utils/helpers';
import './feedBackFormTemplate.scss';

class FeedBackFormTemplate {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let helpersObj = helpers;
        if(msgData?.message?.[0]?.component?.payload?.template_type === "feedbackFormTemplate"){
          me.messageHtml = $(FeedBackFormTemplate.prototype.getTemplateString()).tmpl({
            'feedbackData': msgData?.message?.[0]?.component?.payload?.query,
            'feedBackType':msgData?.message?.[0]?.component?.payload?.feedBackType,
            'helpers': helpersObj.helpers
        });
        }
        setTimeout(()=>{
          FeedBackFormTemplate.prototype.bindFeedbackEvents(me,me.messageHtml,msgData.message[0].component.payload);
        },500)
            return me.messageHtml;
    }
    getTemplateString() {
      var feedBackFormTemplate  = '<script type="text/x-jqury-tmpl">\
      <div class="temp-feed-back-form">\
      <div class="temp-feed-back-header-block">\
          <div class="temp-feed-back-header">\
              <div class="temp-feed-back-header-samll">Feedback for</div>\
              <div class="temp-feed-back-header-large">${feedbackData}</div>\
          </div>\
          <div class="close-feedback"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABxSURBVHgBhZDBDYAgDEV/xAXcoKs4iW7gCqzgRLiGJ7160hH8ak1IAW3yGiiPUOoADGQjB/IhpKuYGhK0kJOCOnd4shhZtObt7VguSlb+lN7ndkXigxpp46Pur3VLVvw07mE+mJMS2TH1ZC6IE54ZyglkyhuCR14v1QAAAABJRU5ErkJggg=="/></div>\
          <div class="temp-right-indicator-block"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAnCAYAAAAPZ2gOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAC5SURBVHgBrdfdDcMgDARgsDpIR+smTTdrJiMhiqL8APbZdxLC2NInXp1KKe9EjKzns6LfRIrs98RC5VRTULm9w6g0eiFUOn03KoOZCxVlDqMaCKMWEEKtoBlFQBOKgirqAYeoF+yiEbCJRsEHygAv6CvxUtGZ9cOaX875zwIrNtWCAR4YA7xgUfCBRcAm5gW7mAccYiioYghowqygGbOAEKaBMDYCXVgPdGMtMITdwTB2BinYFvYWsAC972TlmZX3fgAAAABJRU5ErkJggg=="/></div>\
      </div>\
      <div class="temp-break-line"></div>\
      <div class="temp-feed-back-qns">What seems to be the issue?</div>\
      <div class="temp-feed-back-ans-tags">\
          <button class="temp-feed-back-ans-tag-btn">Incorrect</button>\
          <button class="temp-feed-back-ans-tag-btn">Outdated</button>\
          <button class="temp-feed-back-ans-tag-btn">Few Results</button>\
      </div>\
      <div class="temp-feed-back-opt-qns">Please help us with more details (Optional)</div>\
      <div class="temp-feed-back-opt-ans">\
          <textarea id="feedback-input-text" placeholder="I dont think these results are of any use for this month" class="input-text"></textarea>\
      </div>\
      <div class="temp-feed-back-footer-block">\
          <button class="temp-feed-back-footer-btn-secondary close-feedback">Close</button>\
          <button class="temp-feed-back-footer-btn-primary submit-feedback">Submit</button>\
      </div>\
  </div>\
      </script>';
        return feedBackFormTemplate;
    }

    bindFeedbackEvents(me:any,messageHtml:any,payload:any){
      let hostWindowInstance = me.hostInstance;
      let $ = me.hostInstance.$;
      $(messageHtml).find('.temp-feed-back-form').off('click', '.snippet-feedback').on('click', '.snippet-feedback', function (event:any) {
        $(messageHtml).find('.snippet-feedback').removeClass('active');
        $(event.currentTarget).addClass('active');
      });
      $(messageHtml).find('.temp-feed-back-form').off('click', '.close-feedback').on('click', '.close-feedback', function (event:any) {
        event.stopPropagation();
        $(messageHtml).find('.temp-feed-back-form').parent().hide();
      });
      $(messageHtml).find('.temp-feed-back-form').off('click', '.temp-feed-back-ans-tag-btn').on('click', '.temp-feed-back-ans-tag-btn', function (event:any) {
        event.stopPropagation();
        $(messageHtml).find('.temp-feed-back-ans-tag-btn.active').removeClass('active');
        $(event.currentTarget).addClass('active');
      });
      $(messageHtml).find('.temp-feed-back-form').off('click', '.submit-feedback').on('click', '.submit-feedback', function (event:any) {
        event.stopPropagation();
        var feedbackInputText = $(messageHtml).find('#feedback-input-text').val() ||'';
        var feedbackButton = $(messageHtml).find('.temp-feed-back-ans-tag-btn.active').html() || '';
        if(feedbackInputText || feedbackButton){
          hostWindowInstance.updateFeedBackResult('thumbsDown', payload?.query,payload?.feedBackType,feedbackButton,feedbackInputText)
          payload?.feedBackType=='smartAnswer'? $(messageHtml).parent().closest('#snippet-feedback-template').empty(): $(messageHtml).parent().closest('#query-feedback-template').empty()
        }
      });
    }

}

export default FeedBackFormTemplate;
