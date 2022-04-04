/*!
 * Uses the jQuery lightweight plugin boilerplate by @ajpiano
 */

;(function ( $, window, document, undefined ) {

    var chatBubble = "chatBubble",

        defaults = {
            typingSpeed: 40, // speed in words per minute
            delay: 1000 // delay between adding messages
        };

    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
        this._defaults = defaults;
        this._name = chatBubble;

        this.init();
    }

    Plugin.prototype = {

        init: function() {
            var self = this;

            $(self.element).addClass('cb__list');
           
            var messages = this.options.messages;
            var cb = this.options.cbFunction;
            var count = messages.length;
            var typingSpeed = this.options.typingSpeed || this.defaults.typingSpeed;
            var delay = this.options.delay || this.defaults.delay;

            var i = 0;

            function addMessage() {
                self.addMessage(self.element, messages[i], typingSpeed).then(function() {
                    window.setTimeout(function() {
                        i++;
                        if (i < count) addMessage();
                        if(cb) cb(i);
                    },delay);
                });
            }

            addMessage();
        },

        addMessage: function(el, message, typingSpeed) {
         
            var $listItem = $('<li></li>');
            var $bubble = $('<div class="bubble typing">...</div>');
            var words = message.split(' ').length; 
            var speed = (words / typingSpeed) * 6000;

            if (speed < 1000) speed = 1000;
            if (speed > 10000) speed = 10000;

            $listItem.html($bubble);
            $(el).append($listItem);
          
            return new Promise(function(resolve, reject) {
                window.setTimeout(function() {
                    $bubble.html(message).removeClass('typing');
                    
                    $bubble.html(message).addClass('textAdded');
                    window.setTimeout(function(){
                        $bubble.html(message).addClass('textAddedAnimate');
                    },100);
                    resolve(true);
                },speed);
            
            });
        }
        // function(e, t) {
        //     var n = this
        //       , s = e.getBoundingClientRect();
        //     window.getComputedStyle(e).opacity,
        //     e.classList.add("cui__bubble--slideIn", "cui__bubble--typing"),
        //     setTimeout(function() {
        //         e.style.minHeight = s.height + "px",
        //         e.style.minWidth = s.width + "px",
        //         e.classList.add("cui__bubble--fade"),
        //         setTimeout(function(t) {
        //             e.classList.remove("cui__bubble--typing"),
        //             e.removeAttribute("style"),
        //             n.scrollIntoView()
        //         }, 350)
        //     }, t)
        // }
    };

    $.fn[chatBubble] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + chatBubble)) {
                $.data(this, "plugin_" + chatBubble,
                new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );