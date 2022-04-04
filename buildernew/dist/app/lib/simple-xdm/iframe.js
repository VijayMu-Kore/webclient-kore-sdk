(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.AP = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _commonUtil = _dereq_('../common/util');

var _commonUtil2 = _interopRequireDefault(_commonUtil);

var _commonPostmessage = _dereq_('../common/postmessage');

var _commonPostmessage2 = _interopRequireDefault(_commonPostmessage);

var _dollar = _dereq_('./dollar');

var _dollar2 = _interopRequireDefault(_dollar);

var _size = _dereq_('./size');

var _size2 = _interopRequireDefault(_size);

var AP = (function (_PostMessage) {
  _inherits(AP, _PostMessage);

  function AP() {
    _classCallCheck(this, AP);

    _get(Object.getPrototypeOf(AP.prototype), 'constructor', this).call(this);
    this._data = this._parseInitData();
    this._host = window.parent;
    this._hostModules = {};
    this._eventHandlers = {};
    this._pendingCallbacks = {};
    this._setupAPI(this._data.api);
    this._setupAPIWithoutRequire(this._data.api);
    this._messageHandlers = {
      resp: this._handleResponse,
      evt: this._handleEvent
    };
    this._initResize();
    this._sendInit();
  }

  /**
  * The initialization data is passed in when the iframe is created as its 'name' attribute.
  * Example:
  * {
  *   extension_id: The ID of this iframe as defined by the host
  *   origin: 'https://example.org'  // The parent's window origin
  *   api: {
  *     _globals: { ... },
  *     messages = {
  *       clear: {},
  *       ...
  *     },
  *     ...
  *   }
  * }
  **/

  _createClass(AP, [{
    key: '_parseInitData',
    value: function _parseInitData(data) {
      try {
        return JSON.parse(data || window.name);
      } catch (e) {
        return {};
      }
    }
  }, {
    key: '_createModule',
    value: function _createModule(moduleName, api) {
      var _this = this;

      return Object.getOwnPropertyNames(api).reduce(function (accumulator, functionName) {
        accumulator[functionName] = _this._createMethodHandler({
          mod: moduleName,
          fn: functionName
        });
        return accumulator;
      }, {});
    }
  }, {
    key: '_setupAPI',
    value: function _setupAPI(api) {
      var _this2 = this;

      this._hostModules = Object.getOwnPropertyNames(api).reduce(function (accumulator, moduleName) {
        accumulator[moduleName] = _this2._createModule(moduleName, api[moduleName]);
        return accumulator;
      }, {});

      Object.getOwnPropertyNames(this._hostModules._globals || {}).forEach(function (global) {
        _this2[global] = _this2._hostModules._globals[global];
      });
    }
  }, {
    key: '_setupAPIWithoutRequire',
    value: function _setupAPIWithoutRequire(api) {
      var _this3 = this;

      Object.getOwnPropertyNames(api).forEach(function (moduleName) {
        if (typeof _this3[moduleName] !== "undefined") {
          throw new Error('XDM module: ' + moduleName + ' will collide with existing variable');
        }
        _this3[moduleName] = _this3._createModule(moduleName, api[moduleName]);
      }, this);
    }
  }, {
    key: '_pendingCallback',
    value: function _pendingCallback(mid, fn) {
      this._pendingCallbacks[mid] = fn;
    }
  }, {
    key: '_createMethodHandler',
    value: function _createMethodHandler(methodData) {
      var methodHandler = function methodHandler() {
        var mid = undefined,
            args = _commonUtil2['default'].argumentsToArray(arguments);
        if (_commonUtil2['default'].hasCallback(args)) {
          mid = _commonUtil2['default'].randomString();
          this._pendingCallback(mid, args.pop());
        }
        this._host.postMessage({
          eid: this._data.extension_id,
          type: 'req',
          mid: mid,
          mod: methodData.mod,
          fn: methodData.fn,
          args: args
        }, this._data.origin);
      };

      return _commonUtil2['default']._bind(this, methodHandler);
    }
  }, {
    key: '_handleResponse',
    value: function _handleResponse(event) {
      var data = event.data;
      var pendingCallback = this._pendingCallbacks[data.mid];
      if (pendingCallback) {
        delete this._pendingCallbacks[data.mid];
        pendingCallback.apply(window, data.args);
      }
    }
  }, {
    key: '_handleEvent',
    value: function _handleEvent(event) {
      var sendResponse = function sendResponse() {
        var args = _commonUtil2['default'].argumentsToArray(arguments);
        event.source.postMessage({
          eid: this._data.extension_id,
          mid: event.data.mid,
          type: 'resp',
          args: args
        }, this._data.origin);
      };
      sendResponse = _commonUtil2['default']._bind(this, sendResponse);
      var data = event.data;
      var handler = this._eventHandlers[data.etyp];
      if (handler) {
        handler(data.evnt, sendResponse);
      } else if (data.mid) {
        sendResponse();
      }
    }
  }, {
    key: '_checkOrigin',
    value: function _checkOrigin(event) {
      return event.origin === this._data.origin && event.source === this._host;
    }
  }, {
    key: '_sendInit',
    value: function _sendInit() {
      this._host.postMessage({
        eid: this._data.extension_id,
        type: 'init'
      }, this._data.origin);
    }
  }, {
    key: 'broadcast',
    value: function broadcast(event, evnt) {
      if (!_commonUtil2['default'].isString(event)) {
        throw new Error("Event type must be string");
      }

      this._host.postMessage({
        eid: this._data.extension_id,
        type: 'broadcast',
        etyp: event,
        evnt: evnt
      }, this._data.origin);
    }
  }, {
    key: 'require',
    value: function _dereq_(modules, callback) {
      var _this4 = this;

      var requiredModules = Array.isArray(modules) ? modules : [modules],
          args = requiredModules.map(function (module) {
        return _this4._hostModules[module];
      });
      callback.apply(window, args);
    }
  }, {
    key: 'register',
    value: function register(handlers) {
      this._eventHandlers = handlers || {};
      this._host.postMessage({
        eid: this._data.extension_id,
        type: 'event_query',
        args: Object.getOwnPropertyNames(handlers)
      }, this._data.origin);
    }
  }, {
    key: '_initResize',
    value: function _initResize() {
      var w = window,
          resize = _commonUtil2['default']._bind(this, function () {
        var dimensions = (0, _size2['default'])();
        this.require('env', function (env) {
          if (env && env.resize) {
            env.resize(dimensions.w, dimensions.h);
          }
        });
      });

      if (w.readyState === "interactive") {
        resize();
      } else {
        _dollar2['default'].bind(w, "load", resize);
      }
    }
  }]);

  return AP;
})(_commonPostmessage2['default']);

module.exports = new AP();

},{"../common/postmessage":2,"../common/util":3,"./dollar":4,"./size":5}],2:[function(_dereq_,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _util = _dereq_('./util');

var _util2 = _interopRequireDefault(_util);

var PostMessage = (function () {
  function PostMessage(data) {
    _classCallCheck(this, PostMessage);

    var d = data || {};
    this._registerListener(d.listenOn);
  }

  // listen for postMessage events (defaults to window).

  _createClass(PostMessage, [{
    key: "_registerListener",
    value: function _registerListener(listenOn) {
      if (!listenOn || !listenOn.addEventListener) {
        listenOn = window;
      }
      listenOn.addEventListener("message", _util2["default"]._bind(this, this._receiveMessage), false);
    }
  }, {
    key: "_receiveMessage",
    value: function _receiveMessage(event) {
      var extensionId = event.data.eid,
          reg = undefined;

      if (extensionId && this._registeredExtensions) {
        reg = this._registeredExtensions[extensionId];
      }

      if (!this._checkOrigin(event, reg)) {
        return false;
      }

      var handler = this._messageHandlers[event.data.type];
      if (handler) {
        handler.call(this, event, reg);
      }
    }
  }]);

  return PostMessage;
})();

module.exports = PostMessage;

},{"./util":3}],3:[function(_dereq_,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LOG_PREFIX = "[Simple-XDM] ";

var Util = (function () {
  function Util() {
    _classCallCheck(this, Util);
  }

  _createClass(Util, [{
    key: "randomString",
    value: function randomString() {
      return Math.floor(Math.random() * 1000000000).toString(16);
    }
  }, {
    key: "isString",
    value: function isString(str) {
      return typeof str === "string" || str instanceof String;
    }

    // might be un-needed
  }, {
    key: "argumentsToArray",
    value: function argumentsToArray(arrayLike) {
      var array = [];
      for (var i = 0; i < arrayLike.length; i++) {
        array.push(arrayLike[i]);
      }
      return array;
    }
  }, {
    key: "hasCallback",
    value: function hasCallback(args) {
      var length = args.length;
      return length > 0 && typeof args[length - 1] === 'function';
    }
  }, {
    key: "error",
    value: function error(msg) {
      if (window.console) {
        console.error(LOG_PREFIX + msg);
      }
    }
  }, {
    key: "warn",
    value: function warn(msg) {
      if (window.console) {
        console.warn(LOG_PREFIX + msg);
      }
    }
  }, {
    key: "_bind",
    value: function _bind(thisp, fn) {
      if (Function.prototype.bind) {
        return fn.bind(thisp);
      }
      return function () {
        return fn.apply(thisp, arguments);
      };
    }
  }, {
    key: "each",
    value: function each(o, it) {
      var l;
      var k;
      if (o) {
        l = o.length;
        if (l != null && typeof o !== 'function') {
          k = 0;
          while (k < l) {
            if (it.call(o[k], k, o[k]) === false) {
              break;
            }
            k += 1;
          }
        } else {
          for (k in o) {
            if (o.hasOwnProperty(k)) {
              if (it.call(o[k], k, o[k]) === false) {
                break;
              }
            }
          }
        }
      }
    }
  }, {
    key: "extend",
    value: function extend(dest) {
      var args = arguments;
      var srcs = [].slice.call(args, 1, args.length);
      srcs.forEach(function (source) {
        Object.getOwnPropertyNames(source).forEach(function (name) {
          dest[name] = source[name];
        });
      });
      return dest;
    }
  }]);

  return Util;
})();

module.exports = new Util();

},{}],4:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _commonUtil = _dereq_('../common/util');

var _commonUtil2 = _interopRequireDefault(_commonUtil);

var _each = _commonUtil2['default'].each,
    document = window.document;

function $(sel, context) {

  context = context || document;

  var els = [];
  if (sel) {
    if (typeof sel === 'string') {
      var results = context.querySelectorAll(sel),
          arr_results = Array.prototype.slice.call(results);
      Array.prototype.push.apply(els, arr_results);
    } else if (sel.nodeType === 1) {
      els.push(sel);
    } else if (sel === window) {
      els.push(sel);
    }
  }

  _commonUtil2['default'].extend(els, {
    each: function each(it) {
      _each(this, it);
      return this;
    },
    bind: function bind(name, callback) {
      this.each(function (i, el) {
        this.bind(el, name, callback);
      });
    },
    attr: function attr(k) {
      var v;
      this.each(function (i, el) {
        v = el[k] || el.getAttribute && el.getAttribute(k);
        return !v;
      });
      return v;
    },
    removeClass: function removeClass(className) {
      return this.each(function (i, el) {
        if (el.className) {
          el.className = el.className.replace(new RegExp('(^|\\s)' + className + '(\\s|$)'), ' ');
        }
      });
    },
    html: function html(_html) {
      return this.each(function (i, el) {
        el.innerHTML = _html;
      });
    },
    append: function append(spec) {
      return this.each(function (i, to) {
        var el = context.createElement(spec.tag);
        _each(spec, function (k, v) {
          if (k === '$text') {
            if (el.styleSheet) {
              // style tags in ie
              el.styleSheet.cssText = v;
            } else {
              el.appendChild(context.createTextNode(v));
            }
          } else if (k !== 'tag') {
            el[k] = v;
          }
        });
        to.appendChild(el);
      });
    }
  });

  return els;
}

function binder(std, odd) {
  std += 'EventListener';
  odd += 'Event';
  return function (el, e, fn) {
    if (el[std]) {
      el[std](e, fn, false);
    } else if (el[odd]) {
      el[odd]('on' + e, fn);
    }
  };
}

$.bind = binder('add', 'attach');
$.unbind = binder('remove', 'detach');

exports['default'] = $;
module.exports = exports['default'];

},{"../common/util":3}],5:[function(_dereq_,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dollar = _dereq_('./dollar');

var _dollar2 = _interopRequireDefault(_dollar);

function getContainer() {
  // Look for these two selectors first... you need these to allow for the auto-shrink to work
  // Otherwise, it'll default to document.body which can't auto-grow or auto-shrink
  var container = (0, _dollar2['default'])('.ac-content, #content');
  return container.length > 0 ? container[0] : document.body;
}

var size = function size(width, height, container) {
  var w = width == null ? '100%' : width,
      h,
      docHeight;

  if (!container) {
    container = getContainer();
  }

  if (height) {
    h = height;
  } else {
    // Determine height
    docHeight = Math.max(container.scrollHeight, document.documentElement.scrollHeight, container.offsetHeight, document.documentElement.offsetHeight, container.clientHeight, document.documentElement.clientHeight);

    if (container === document.body) {
      h = docHeight;
    } else {
      // Started with http://james.padolsey.com/javascript/get-document-height-cross-browser/
      // to determine page height across browsers. Turns out that in our case, we can get by with
      // document.body.offsetHeight and document.body.clientHeight. Those two return the proper
      // height even when the dom shrinks. Tested on Chrome, Safari, IE8/9/10, and Firefox
      h = Math.max(container.offsetHeight, container.clientHeight);
      if (h === 0) {
        h = docHeight;
      }
    }
  }
  return { w: w, h: h };
};

module.exports = size;

},{"./dollar":4}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbW9hdGVzL2hpcGNoYXQvY3JhcHBpZS9ub2RlX21vZHVsZXMvc2ltcGxlLXhkbS9zcmMvcGx1Z2luL2luZGV4LmpzIiwiL1VzZXJzL21vYXRlcy9oaXBjaGF0L2NyYXBwaWUvbm9kZV9tb2R1bGVzL3NpbXBsZS14ZG0vc3JjL2NvbW1vbi9wb3N0bWVzc2FnZS5qcyIsIi9Vc2Vycy9tb2F0ZXMvaGlwY2hhdC9jcmFwcGllL25vZGVfbW9kdWxlcy9zaW1wbGUteGRtL3NyYy9jb21tb24vdXRpbC5qcyIsIi9Vc2Vycy9tb2F0ZXMvaGlwY2hhdC9jcmFwcGllL25vZGVfbW9kdWxlcy9zaW1wbGUteGRtL3NyYy9wbHVnaW4vZG9sbGFyLmpzIiwiL1VzZXJzL21vYXRlcy9oaXBjaGF0L2NyYXBwaWUvbm9kZV9tb2R1bGVzL3NpbXBsZS14ZG0vc3JjL3BsdWdpbi9zaXplLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OzBCQ0FpQixnQkFBZ0I7Ozs7aUNBQ1QsdUJBQXVCOzs7O3NCQUNqQyxVQUFVOzs7O29CQUNQLFFBQVE7Ozs7SUFFbkIsRUFBRTtZQUFGLEVBQUU7O0FBRUssV0FGUCxFQUFFLEdBRVE7MEJBRlYsRUFBRTs7QUFHSiwrQkFIRSxFQUFFLDZDQUdJO0FBQ1IsUUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDbkMsUUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0FBQzNCLFFBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO0FBQ3ZCLFFBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO0FBQ3pCLFFBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7QUFDNUIsUUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxD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LEdBQUcsS0FBSztNQUFFLENBQUM7TUFBRSxTQUFTLENBQUM7O0FBRXJELE1BQUcsQ0FBQyxTQUFTLEVBQUM7QUFDWixhQUFTLEdBQUcsWUFBWSxFQUFFLENBQUM7R0FDNUI7O0FBRUQsTUFBSSxNQUFNLEVBQUU7QUFDVixLQUFDLEdBQUcsTUFBTSxDQUFDO0dBQ1osTUFBTTs7QUFFTCxhQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FDbEIsU0FBUyxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsZUFBZSxDQUFDLFlBQVksRUFDN0QsU0FBUyxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsZUFBZSxDQUFDLFlBQVksRUFDN0QsU0FBUyxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FDOUQsQ0FBQzs7QUFFRixRQUFHLFNBQVMsS0FBSyxRQUFRLENBQUMsSUFBSSxFQUFDO0FBQzdCLE9BQUMsR0FBRyxTQUFTLENBQUM7S0FDZixNQUFNOzs7OztBQUtMLE9BQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQzdELFVBQUcsQ0FBQyxLQUFLLENBQUMsRUFBQztBQUNULFNBQUMsR0FBRyxTQUFTLENBQUM7T0FDZjtLQUNGO0dBQ0Y7QUFDRCxTQUFPLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUM7Q0FDckIsQ0FBQzs7QUFFRixNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgVXRpbCBmcm9tICcuLi9jb21tb24vdXRpbCc7XG5pbXBvcnQgUG9zdE1lc3NhZ2UgZnJvbSAnLi4vY29tbW9uL3Bvc3RtZXNzYWdlJztcbmltcG9ydCAkIGZyb20gJy4vZG9sbGFyJztcbmltcG9ydCBzaXplIGZyb20gJy4vc2l6ZSc7XG5cbmNsYXNzIEFQIGV4dGVuZHMgUG9zdE1lc3NhZ2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fZGF0YSA9IHRoaXMuX3BhcnNlSW5pdERhdGEoKTtcbiAgICB0aGlzLl9ob3N0ID0gd2luZG93LnBhcmVudDtcbiAgICB0aGlzLl9ob3N0TW9kdWxlcyA9IHt9O1xuICAgIHRoaXMuX2V2ZW50SGFuZGxlcnMgPSB7fTtcbiAgICB0aGlzLl9wZW5kaW5nQ2FsbGJhY2tzID0ge307XG4gICAgdGhpcy5fc2V0dXBBUEkodGhpcy5fZGF0YS5hcGkpO1xuICAgIHRoaXMuX3NldHVwQVBJV2l0aG91dFJlcXVpcmUodGhpcy5fZGF0YS5hcGkpO1xuICAgIHRoaXMuX21lc3NhZ2VIYW5kbGVycyA9IHtcbiAgICAgICAgcmVzcDogdGhpcy5faGFuZGxlUmVzcG9uc2UsXG4gICAgICAgIGV2dDogdGhpcy5faGFuZGxlRXZlbnRcbiAgICB9O1xuICAgIHRoaXMuX2luaXRSZXNpemUoKTtcbiAgICB0aGlzLl9zZW5kSW5pdCgpO1xuICB9XG4gIC8qKlxuICAqIFRoZSBpbml0aWFsaXphdGlvbiBkYXRhIGlzIHBhc3NlZCBpbiB3aGVuIHRoZSBpZnJhbWUgaXMgY3JlYXRlZCBhcyBpdHMgJ25hbWUnIGF0dHJpYnV0ZS5cbiAgKiBFeGFtcGxlOlxuICAqIHtcbiAgKiAgIGV4dGVuc2lvbl9pZDogVGhlIElEIG9mIHRoaXMgaWZyYW1lIGFzIGRlZmluZWQgYnkgdGhlIGhvc3RcbiAgKiAgIG9yaWdpbjogJ2h0dHBzOi8vZXhhbXBsZS5vcmcnICAvLyBUaGUgcGFyZW50J3Mgd2luZG93IG9yaWdpblxuICAqICAgYXBpOiB7XG4gICogICAgIF9nbG9iYWxzOiB7IC4uLiB9LFxuICAqICAgICBtZXNzYWdlcyA9IHtcbiAgKiAgICAgICBjbGVhcjoge30sXG4gICogICAgICAgLi4uXG4gICogICAgIH0sXG4gICogICAgIC4uLlxuICAqICAgfVxuICAqIH1cbiAgKiovXG4gIF9wYXJzZUluaXREYXRhKGRhdGEpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGF0YSB8fCB3aW5kb3cubmFtZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgfVxuXG4gIF9jcmVhdGVNb2R1bGUobW9kdWxlTmFtZSwgYXBpKSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGFwaSkucmVkdWNlKChhY2N1bXVsYXRvciwgZnVuY3Rpb25OYW1lKSA9PiB7XG4gICAgICBhY2N1bXVsYXRvcltmdW5jdGlvbk5hbWVdID0gdGhpcy5fY3JlYXRlTWV0aG9kSGFuZGxlcih7XG4gICAgICAgICAgbW9kOiBtb2R1bGVOYW1lLFxuICAgICAgICAgIGZuOiBmdW5jdGlvbk5hbWVcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGFjY3VtdWxhdG9yO1xuICAgIH0sIHt9KTtcbiAgfVxuXG4gIF9zZXR1cEFQSShhcGkpIHtcbiAgICB0aGlzLl9ob3N0TW9kdWxlcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGFwaSkucmVkdWNlKChhY2N1bXVsYXRvciwgbW9kdWxlTmFtZSkgPT4ge1xuICAgICAgICBhY2N1bXVsYXRvclttb2R1bGVOYW1lXSA9IHRoaXMuX2NyZWF0ZU1vZHVsZShtb2R1bGVOYW1lLCBhcGlbbW9kdWxlTmFtZV0pO1xuICAgICAgICByZXR1cm4gYWNjdW11bGF0b3I7XG4gICAgfSwge30pO1xuXG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcy5faG9zdE1vZHVsZXMuX2dsb2JhbHMgfHwge30pLmZvckVhY2goKGdsb2JhbCkgPT4ge1xuICAgICAgICB0aGlzW2dsb2JhbF0gPSB0aGlzLl9ob3N0TW9kdWxlcy5fZ2xvYmFsc1tnbG9iYWxdO1xuICAgIH0pO1xuICB9XG5cbiAgX3NldHVwQVBJV2l0aG91dFJlcXVpcmUoYXBpKSB7XG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoYXBpKS5mb3JFYWNoKChtb2R1bGVOYW1lKSA9PiB7XG4gICAgICBpZih0eXBlb2YgdGhpc1ttb2R1bGVOYW1lXSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1hETSBtb2R1bGU6ICcgKyBtb2R1bGVOYW1lICsgJyB3aWxsIGNvbGxpZGUgd2l0aCBleGlzdGluZyB2YXJpYWJsZScpO1xuICAgICAgfVxuICAgICAgdGhpc1ttb2R1bGVOYW1lXSA9IHRoaXMuX2NyZWF0ZU1vZHVsZShtb2R1bGVOYW1lLCBhcGlbbW9kdWxlTmFtZV0pO1xuICAgIH0sIHRoaXMpO1xuICB9XG5cbiAgX3BlbmRpbmdDYWxsYmFjayhtaWQsIGZuKXtcbiAgICB0aGlzLl9wZW5kaW5nQ2FsbGJhY2tzW21pZF0gPSBmbjtcbiAgfVxuXG4gIF9jcmVhdGVNZXRob2RIYW5kbGVyKG1ldGhvZERhdGEpIHtcbiAgICBsZXQgbWV0aG9kSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBtaWQsXG4gICAgICAgICAgYXJncyA9IFV0aWwuYXJndW1lbnRzVG9BcnJheShhcmd1bWVudHMpO1xuICAgICAgaWYgKFV0aWwuaGFzQ2FsbGJhY2soYXJncykpIHtcbiAgICAgICAgbWlkID0gVXRpbC5yYW5kb21TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5fcGVuZGluZ0NhbGxiYWNrKG1pZCwgYXJncy5wb3AoKSk7XG4gICAgICB9XG4gICAgICB0aGlzLl9ob3N0LnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICBlaWQ6IHRoaXMuX2RhdGEuZXh0ZW5zaW9uX2lkLFxuICAgICAgICAgIHR5cGU6ICdyZXEnLFxuICAgICAgICAgIG1pZDogbWlkLFxuICAgICAgICAgIG1vZDogbWV0aG9kRGF0YS5tb2QsXG4gICAgICAgICAgZm46IG1ldGhvZERhdGEuZm4sXG4gICAgICAgICAgYXJnczogYXJnc1xuICAgICAgfSwgdGhpcy5fZGF0YS5vcmlnaW4pO1xuICAgIH07XG5cbiAgICByZXR1cm4gVXRpbC5fYmluZCh0aGlzLCBtZXRob2RIYW5kbGVyKTtcbiAgfVxuXG4gIF9oYW5kbGVSZXNwb25zZShldmVudCkge1xuICAgIHZhciBkYXRhID0gZXZlbnQuZGF0YTtcbiAgICB2YXIgcGVuZGluZ0NhbGxiYWNrID0gdGhpcy5fcGVuZGluZ0NhbGxiYWNrc1tkYXRhLm1pZF07XG4gICAgaWYgKHBlbmRpbmdDYWxsYmFjaykge1xuICAgICAgZGVsZXRlIHRoaXMuX3BlbmRpbmdDYWxsYmFja3NbZGF0YS5taWRdO1xuICAgICAgcGVuZGluZ0NhbGxiYWNrLmFwcGx5KHdpbmRvdywgZGF0YS5hcmdzKTtcbiAgICB9XG4gIH1cblxuICBfaGFuZGxlRXZlbnQoZXZlbnQpIHtcbiAgICB2YXIgc2VuZFJlc3BvbnNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGFyZ3MgPSBVdGlsLmFyZ3VtZW50c1RvQXJyYXkoYXJndW1lbnRzKTtcbiAgICAgIGV2ZW50LnNvdXJjZS5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgZWlkOiB0aGlzLl9kYXRhLmV4dGVuc2lvbl9pZCxcbiAgICAgICAgICBtaWQ6IGV2ZW50LmRhdGEubWlkLFxuICAgICAgICAgIHR5cGU6ICdyZXNwJyxcbiAgICAgICAgICBhcmdzOiBhcmdzXG4gICAgICB9LCB0aGlzLl9kYXRhLm9yaWdpbik7XG4gICAgfTtcbiAgICBzZW5kUmVzcG9uc2UgPSBVdGlsLl9iaW5kKHRoaXMsIHNlbmRSZXNwb25zZSk7XG4gICAgdmFyIGRhdGEgPSBldmVudC5kYXRhO1xuICAgIHZhciBoYW5kbGVyID0gdGhpcy5fZXZlbnRIYW5kbGVyc1tkYXRhLmV0eXBdO1xuICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICAgIGhhbmRsZXIoZGF0YS5ldm50LCBzZW5kUmVzcG9uc2UpO1xuICAgIH0gZWxzZSBpZiAoZGF0YS5taWQpIHtcbiAgICAgICAgc2VuZFJlc3BvbnNlKCk7XG4gICAgfVxuICB9XG5cbiAgX2NoZWNrT3JpZ2luKGV2ZW50KSB7XG4gICAgICByZXR1cm4gZXZlbnQub3JpZ2luID09PSB0aGlzLl9kYXRhLm9yaWdpbiAmJiBldmVudC5zb3VyY2UgPT09IHRoaXMuX2hvc3Q7XG4gIH1cblxuICBfc2VuZEluaXQoKSB7XG4gICAgdGhpcy5faG9zdC5wb3N0TWVzc2FnZSh7XG4gICAgICAgIGVpZDogdGhpcy5fZGF0YS5leHRlbnNpb25faWQsXG4gICAgICAgIHR5cGU6ICdpbml0J1xuICAgIH0sIHRoaXMuX2RhdGEub3JpZ2luKTtcbiAgfVxuXG4gIGJyb2FkY2FzdChldmVudCwgZXZudCkge1xuICAgIGlmICghIFV0aWwuaXNTdHJpbmcoZXZlbnQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFdmVudCB0eXBlIG11c3QgYmUgc3RyaW5nXCIpO1xuICAgIH1cblxuICAgIHRoaXMuX2hvc3QucG9zdE1lc3NhZ2Uoe1xuICAgICAgZWlkOiB0aGlzLl9kYXRhLmV4dGVuc2lvbl9pZCxcbiAgICAgIHR5cGU6ICdicm9hZGNhc3QnLFxuICAgICAgZXR5cDogZXZlbnQsXG4gICAgICBldm50OiBldm50XG4gICAgfSwgdGhpcy5fZGF0YS5vcmlnaW4pO1xuICB9XG5cbiAgcmVxdWlyZShtb2R1bGVzLCBjYWxsYmFjaykge1xuICAgIGxldCByZXF1aXJlZE1vZHVsZXMgPSBBcnJheS5pc0FycmF5KG1vZHVsZXMpID8gbW9kdWxlcyA6IFttb2R1bGVzXSxcbiAgICAgICAgYXJncyA9IHJlcXVpcmVkTW9kdWxlcy5tYXAoKG1vZHVsZSkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9ob3N0TW9kdWxlc1ttb2R1bGVdO1xuICAgICAgICB9KTtcbiAgICBjYWxsYmFjay5hcHBseSh3aW5kb3csIGFyZ3MpO1xuICB9XG5cbiAgcmVnaXN0ZXIoaGFuZGxlcnMpIHtcbiAgICB0aGlzLl9ldmVudEhhbmRsZXJzID0gaGFuZGxlcnMgfHwge307XG4gICAgdGhpcy5faG9zdC5wb3N0TWVzc2FnZSh7XG4gICAgICBlaWQ6IHRoaXMuX2RhdGEuZXh0ZW5zaW9uX2lkLFxuICAgICAgdHlwZTogJ2V2ZW50X3F1ZXJ5JyxcbiAgICAgIGFyZ3M6IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGhhbmRsZXJzKVxuICAgIH0sIHRoaXMuX2RhdGEub3JpZ2luKTtcbiAgfVxuXG4gIF9pbml0UmVzaXplKCkge1xuICAgIHZhciB3ID0gd2luZG93LFxuICAgIHJlc2l6ZSA9IFV0aWwuX2JpbmQodGhpcywgZnVuY3Rpb24oKXtcbiAgICAgIHZhciBkaW1lbnNpb25zID0gc2l6ZSgpO1xuICAgICAgdGhpcy5yZXF1aXJlKCdlbnYnLCAoZW52KSA9PiB7XG4gICAgICAgIGlmKGVudiAmJiBlbnYucmVzaXplKSB7XG4gICAgICAgICAgZW52LnJlc2l6ZShkaW1lbnNpb25zLncsIGRpbWVuc2lvbnMuaCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaWYody5yZWFkeVN0YXRlID09PSBcImludGVyYWN0aXZlXCIpe1xuICAgICAgcmVzaXplKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQuYmluZCh3LCBcImxvYWRcIiwgcmVzaXplKTtcbiAgICB9XG4gIH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBBUCgpO1xuIiwiaW1wb3J0IFV0aWwgZnJvbSAnLi91dGlsJztcbmNsYXNzIFBvc3RNZXNzYWdlIHtcblxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgbGV0IGQgPSBkYXRhIHx8IHt9O1xuICAgIHRoaXMuX3JlZ2lzdGVyTGlzdGVuZXIoZC5saXN0ZW5Pbik7XG4gIH1cblxuIC8vIGxpc3RlbiBmb3IgcG9zdE1lc3NhZ2UgZXZlbnRzIChkZWZhdWx0cyB0byB3aW5kb3cpLlxuICBfcmVnaXN0ZXJMaXN0ZW5lcihsaXN0ZW5Pbikge1xuICAgIGlmKCFsaXN0ZW5PbiB8fCAhbGlzdGVuT24uYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgbGlzdGVuT24gPSB3aW5kb3c7XG4gICAgfVxuICAgIGxpc3Rlbk9uLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIFV0aWwuX2JpbmQodGhpcywgdGhpcy5fcmVjZWl2ZU1lc3NhZ2UpLCBmYWxzZSk7XG4gIH1cblxuICBfcmVjZWl2ZU1lc3NhZ2UgKGV2ZW50KSB7XG4gICAgbGV0IGV4dGVuc2lvbklkID0gZXZlbnQuZGF0YS5laWQsXG4gICAgcmVnO1xuXG4gICAgaWYoZXh0ZW5zaW9uSWQgJiYgdGhpcy5fcmVnaXN0ZXJlZEV4dGVuc2lvbnMpe1xuICAgICAgcmVnID0gdGhpcy5fcmVnaXN0ZXJlZEV4dGVuc2lvbnNbZXh0ZW5zaW9uSWRdO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fY2hlY2tPcmlnaW4oZXZlbnQsIHJlZykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgaGFuZGxlciA9IHRoaXMuX21lc3NhZ2VIYW5kbGVyc1tldmVudC5kYXRhLnR5cGVdO1xuICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICBoYW5kbGVyLmNhbGwodGhpcywgZXZlbnQsIHJlZyk7XG4gICAgfVxuICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQb3N0TWVzc2FnZTsiLCJjb25zdCBMT0dfUFJFRklYID0gXCJbU2ltcGxlLVhETV0gXCI7XG5cbmNsYXNzIFV0aWwge1xuICByYW5kb21TdHJpbmcoKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwMDAwMDApLnRvU3RyaW5nKDE2KTtcbiAgfVxuXG4gIGlzU3RyaW5nKHN0cikge1xuICAgIHJldHVybiB0eXBlb2Ygc3RyID09PSBcInN0cmluZ1wiIHx8IHN0ciBpbnN0YW5jZW9mIFN0cmluZztcbiAgfVxuXG4gIC8vIG1pZ2h0IGJlIHVuLW5lZWRlZFxuICBhcmd1bWVudHNUb0FycmF5KGFycmF5TGlrZSkge1xuICAgIHZhciBhcnJheSA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlMaWtlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcnJheS5wdXNoKGFycmF5TGlrZVtpXSk7XG4gICAgfVxuICAgIHJldHVybiBhcnJheTtcbiAgfVxuXG4gIGhhc0NhbGxiYWNrKGFyZ3MpIHtcbiAgICB2YXIgbGVuZ3RoID0gYXJncy5sZW5ndGg7XG4gICAgcmV0dXJuIGxlbmd0aCA+IDAgJiYgdHlwZW9mIGFyZ3NbbGVuZ3RoIC0gMV0gPT09ICdmdW5jdGlvbic7XG4gIH1cblxuICBlcnJvcihtc2cpIHtcbiAgICAgIGlmICh3aW5kb3cuY29uc29sZSkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoTE9HX1BSRUZJWCArIG1zZyk7XG4gICAgICB9XG4gIH1cblxuICB3YXJuKG1zZykge1xuICAgICAgaWYgKHdpbmRvdy5jb25zb2xlKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKExPR19QUkVGSVggKyBtc2cpO1xuICAgICAgfVxuICB9XG5cbiAgX2JpbmQodGhpc3AsIGZuKXtcbiAgICBpZihGdW5jdGlvbi5wcm90b3R5cGUuYmluZCkge1xuICAgICAgcmV0dXJuIGZuLmJpbmQodGhpc3ApO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNwLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cblxuICBlYWNoKG8sIGl0KSB7XG4gICAgdmFyIGw7XG4gICAgdmFyIGs7XG4gICAgaWYgKG8pIHtcbiAgICAgIGwgPSBvLmxlbmd0aDtcbiAgICAgIGlmIChsICE9IG51bGwgJiYgdHlwZW9mIG8gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgayA9IDA7XG4gICAgICAgIHdoaWxlIChrIDwgbCkge1xuICAgICAgICAgIGlmIChpdC5jYWxsKG9ba10sIGssIG9ba10pID09PSBmYWxzZSl7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgayArPSAxO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGsgaW4gbykge1xuICAgICAgICAgIGlmIChvLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgICAgICBpZiAoaXQuY2FsbChvW2tdLCBrLCBvW2tdKSA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBleHRlbmQoZGVzdCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgIHZhciBzcmNzID0gW10uc2xpY2UuY2FsbChhcmdzLCAxLCBhcmdzLmxlbmd0aCk7XG4gICAgc3Jjcy5mb3JFYWNoKGZ1bmN0aW9uKHNvdXJjZSkge1xuICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIGRlc3RbbmFtZV0gPSBzb3VyY2VbbmFtZV07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gZGVzdDtcbiAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFV0aWwoKTsiLCJpbXBvcnQgVXRpbCBmcm9tICcuLi9jb21tb24vdXRpbCc7XG5cbnZhciBlYWNoID0gVXRpbC5lYWNoLFxuICAgIGRvY3VtZW50ID0gd2luZG93LmRvY3VtZW50O1xuXG5mdW5jdGlvbiAkKHNlbCwgY29udGV4dCkge1xuXG4gIGNvbnRleHQgPSBjb250ZXh0IHx8IGRvY3VtZW50O1xuXG4gIHZhciBlbHMgPSBbXTtcbiAgaWYgKHNlbCkge1xuICAgIGlmICh0eXBlb2Ygc2VsID09PSAnc3RyaW5nJykge1xuICAgICAgdmFyIHJlc3VsdHMgPSBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsKSxcbiAgICAgICAgYXJyX3Jlc3VsdHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChyZXN1bHRzKTtcbiAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KGVscywgYXJyX3Jlc3VsdHMpO1xuICAgIH1cbiAgICBlbHNlIGlmIChzZWwubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgIGVscy5wdXNoKHNlbCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHNlbCA9PT0gd2luZG93KSB7XG4gICAgICBlbHMucHVzaChzZWwpO1xuICAgIH1cbiAgfVxuXG4gIFV0aWwuZXh0ZW5kKGVscywge1xuICAgIGVhY2g6IGZ1bmN0aW9uIChpdCkge1xuICAgICAgZWFjaCh0aGlzLCBpdCk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIGJpbmQ6IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaykge1xuICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbCkge1xuICAgICAgICB0aGlzLmJpbmQoZWwsIG5hbWUsIGNhbGxiYWNrKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgYXR0cjogZnVuY3Rpb24gKGspIHtcbiAgICAgIHZhciB2O1xuICAgICAgdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbCkge1xuICAgICAgICB2ID0gZWxba10gfHwgKGVsLmdldEF0dHJpYnV0ZSAmJiBlbC5nZXRBdHRyaWJ1dGUoaykpO1xuICAgICAgICByZXR1cm4gIXY7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB2O1xuICAgIH0sXG4gICAgcmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsKSB7XG4gICAgICAgIGlmIChlbC5jbGFzc05hbWUpIHtcbiAgICAgICAgICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZShuZXcgUmVnRXhwKCcoXnxcXFxccyknICsgY2xhc3NOYW1lICsgJyhcXFxcc3wkKScpLCAnICcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGh0bWw6IGZ1bmN0aW9uIChodG1sKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbCkge1xuICAgICAgICBlbC5pbm5lckhUTUwgPSBodG1sO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBhcHBlbmQ6IGZ1bmN0aW9uIChzcGVjKSB7XG4gICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCB0bykge1xuICAgICAgICB2YXIgZWwgPSBjb250ZXh0LmNyZWF0ZUVsZW1lbnQoc3BlYy50YWcpO1xuICAgICAgICBlYWNoKHNwZWMsIGZ1bmN0aW9uIChrLCB2KSB7XG4gICAgICAgICAgaWYgKGsgPT09ICckdGV4dCcpIHtcbiAgICAgICAgICAgIGlmIChlbC5zdHlsZVNoZWV0KSB7IC8vIHN0eWxlIHRhZ3MgaW4gaWVcbiAgICAgICAgICAgICAgZWwuc3R5bGVTaGVldC5jc3NUZXh0ID0gdjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBlbC5hcHBlbmRDaGlsZChjb250ZXh0LmNyZWF0ZVRleHROb2RlKHYpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoayAhPT0gJ3RhZycpIHtcbiAgICAgICAgICAgIGVsW2tdID0gdjtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0by5hcHBlbmRDaGlsZChlbCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBlbHM7XG59XG5cbmZ1bmN0aW9uIGJpbmRlcihzdGQsIG9kZCkge1xuICBzdGQgKz0gJ0V2ZW50TGlzdGVuZXInO1xuICBvZGQgKz0gJ0V2ZW50JztcbiAgcmV0dXJuIGZ1bmN0aW9uIChlbCwgZSwgZm4pIHtcbiAgICBpZiAoZWxbc3RkXSkge1xuICAgICAgZWxbc3RkXShlLCBmbiwgZmFsc2UpO1xuICAgIH0gZWxzZSBpZiAoZWxbb2RkXSkge1xuICAgICAgZWxbb2RkXSgnb24nICsgZSwgZm4pO1xuICAgIH1cbiAgfTtcbn1cblxuJC5iaW5kID0gYmluZGVyKCdhZGQnLCAnYXR0YWNoJyk7XG4kLnVuYmluZCA9IGJpbmRlcigncmVtb3ZlJywgJ2RldGFjaCcpO1xuXG5leHBvcnQgZGVmYXVsdCAkO1xuIiwiaW1wb3J0ICQgZnJvbSAnLi9kb2xsYXInO1xuXG5mdW5jdGlvbiBnZXRDb250YWluZXIoKXtcbiAgLy8gTG9vayBmb3IgdGhlc2UgdHdvIHNlbGVjdG9ycyBmaXJzdC4uLiB5b3UgbmVlZCB0aGVzZSB0byBhbGxvdyBmb3IgdGhlIGF1dG8tc2hyaW5rIHRvIHdvcmtcbiAgLy8gT3RoZXJ3aXNlLCBpdCdsbCBkZWZhdWx0IHRvIGRvY3VtZW50LmJvZHkgd2hpY2ggY2FuJ3QgYXV0by1ncm93IG9yIGF1dG8tc2hyaW5rXG4gIHZhciBjb250YWluZXIgPSAkKCcuYWMtY29udGVudCwgI2NvbnRlbnQnKTtcbiAgcmV0dXJuIChjb250YWluZXIubGVuZ3RoID4gMCkgPyBjb250YWluZXJbMF0gOiBkb2N1bWVudC5ib2R5O1xufVxuXG52YXIgc2l6ZSA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0LCBjb250YWluZXIpIHtcbiAgdmFyIHcgPSB3aWR0aCA9PSBudWxsID8gJzEwMCUnIDogd2lkdGgsIGgsIGRvY0hlaWdodDtcblxuICBpZighY29udGFpbmVyKXtcbiAgICBjb250YWluZXIgPSBnZXRDb250YWluZXIoKTtcbiAgfVxuXG4gIGlmIChoZWlnaHQpIHtcbiAgICBoID0gaGVpZ2h0O1xuICB9IGVsc2Uge1xuICAgIC8vIERldGVybWluZSBoZWlnaHRcbiAgICBkb2NIZWlnaHQgPSBNYXRoLm1heChcbiAgICAgIGNvbnRhaW5lci5zY3JvbGxIZWlnaHQsIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQsXG4gICAgICBjb250YWluZXIub2Zmc2V0SGVpZ2h0LCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0LFxuICAgICAgY29udGFpbmVyLmNsaWVudEhlaWdodCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodFxuICAgICk7XG5cbiAgICBpZihjb250YWluZXIgPT09IGRvY3VtZW50LmJvZHkpe1xuICAgICAgaCA9IGRvY0hlaWdodDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU3RhcnRlZCB3aXRoIGh0dHA6Ly9qYW1lcy5wYWRvbHNleS5jb20vamF2YXNjcmlwdC9nZXQtZG9jdW1lbnQtaGVpZ2h0LWNyb3NzLWJyb3dzZXIvXG4gICAgICAvLyB0byBkZXRlcm1pbmUgcGFnZSBoZWlnaHQgYWNyb3NzIGJyb3dzZXJzLiBUdXJucyBvdXQgdGhhdCBpbiBvdXIgY2FzZSwgd2UgY2FuIGdldCBieSB3aXRoXG4gICAgICAvLyBkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCBhbmQgZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQuIFRob3NlIHR3byByZXR1cm4gdGhlIHByb3BlclxuICAgICAgLy8gaGVpZ2h0IGV2ZW4gd2hlbiB0aGUgZG9tIHNocmlua3MuIFRlc3RlZCBvbiBDaHJvbWUsIFNhZmFyaSwgSUU4LzkvMTAsIGFuZCBGaXJlZm94XG4gICAgICBoID0gTWF0aC5tYXgoY29udGFpbmVyLm9mZnNldEhlaWdodCwgY29udGFpbmVyLmNsaWVudEhlaWdodCk7XG4gICAgICBpZihoID09PSAwKXtcbiAgICAgICAgaCA9IGRvY0hlaWdodDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHt3OiB3LCBoOiBofTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2l6ZTsiXX0=
