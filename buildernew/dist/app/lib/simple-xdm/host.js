(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.host = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _xdmrpc = _dereq_('./xdmrpc');

var _xdmrpc2 = _interopRequireDefault(_xdmrpc);

var _commonUtil = _dereq_('../common/util');

var _commonUtil2 = _interopRequireDefault(_commonUtil);

var Connect = (function () {
  function Connect() {
    _classCallCheck(this, Connect);

    this._xdm = new _xdmrpc2['default']();
  }

  _createClass(Connect, [{
    key: 'dispatch',
    value: function dispatch(type, targetSpec, event, callback) {
      this._xdm.queueEvent(type, targetSpec, event, callback);
      return this.getExtensions(targetSpec);
    }
  }, {
    key: '_createId',
    value: function _createId(extension) {
      if (!extension.addon_key || !extension.key) {
        throw Error('Extensions require addon_key and key');
      }
      return extension.addon_key + '__' + extension.key + '__' + _commonUtil2['default'].randomString();
    }

    /**
    * Creates a new iframed module, without actually creating the DOM element.
    * The iframe attributes are passed to the 'setupCallback', which is responsible for creating
    * the DOM element and returning the window reference.
    *
    * @param extension The extension definition. Example:
    *   {
    *     addon_key: 'my-addon',
    *     key: 'my-module',
    *     url: 'https://example.com/my-module'
    *   }
    *
    * @param initCallback The optional initCallback is called when the bridge between host and iframe is established.
    **/
  }, {
    key: 'create',
    value: function create(extension, initCallback) {
      var extension_id = this.registerExtension(extension, initCallback);

      var data = {
        extension_id: extension_id,
        api: this._xdm.getApiSpec(),
        origin: window.location.origin
      };

      return {
        id: extension_id,
        name: JSON.stringify(data),
        src: extension.url
      };
    }
  }, {
    key: 'registerExtension',
    value: function registerExtension(extension, initCallback) {
      var extension_id = this._createId(extension);
      this._xdm.registerExtension(extension_id, {
        extension: extension,
        initCallback: initCallback
      });
      return extension_id;
    }
  }, {
    key: 'defineModule',
    value: function defineModule(moduleName, module) {
      this._xdm.defineAPIModule(module, moduleName);
    }
  }, {
    key: 'defineGlobals',
    value: function defineGlobals(module) {
      this._xdm.defineAPIModule(module);
    }
  }, {
    key: 'getExtensions',
    value: function getExtensions(filter) {
      return this._xdm.getRegisteredExtensions(filter);
    }
  }, {
    key: 'unregisterExtension',
    value: function unregisterExtension(filter) {
      return this._xdm.unregisterExtension(filter);
    }
  }]);

  return Connect;
})();

module.exports = new Connect();

},{"../common/util":3,"./xdmrpc":4}],2:[function(_dereq_,module,exports){
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
/**
* Postmessage format:
*
* Initialization
* --------------
* {
*   type: 'init',
*   eid: 'my-addon__my-module-xyz'  // the extension identifier, unique across iframes
* }
*
* Request
* -------
* {
*   type: 'req',
*   eid: 'my-addon__my-module-xyz',  // the extension identifier, unique for iframe
*   mid: 'xyz',  // a unique message identifier, required for callbacks
*   mod: 'cookie',  // the module name
*   fn: 'read',  // the method name
*   args: [arguments]  // the method arguments
* }
*
* Response
* --------
* {
*   type: 'resp'
*   eid: 'my-addon__my-module-xyz',  // the extension identifier, unique for iframe
*   mid: 'xyz',  // a unique message identifier, obtained from the request
*   args: [arguments]  // the callback arguments
* }
*
* Event
* -----
* {
*   type: 'evt',
*   etyp: 'some-event',
*   evnt: { ... }  // the event data
*   mid: 'xyz', // a unique message identifier for the event
* }
**/

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

var VALID_EVENT_TIME_MS = 30000; //30 seconds

var XDMRPC = (function (_PostMessage) {
  _inherits(XDMRPC, _PostMessage);

  function XDMRPC(config) {
    _classCallCheck(this, XDMRPC);

    config = config || {};
    _get(Object.getPrototypeOf(XDMRPC.prototype), 'constructor', this).call(this, config);
    this._registeredExtensions = config.extensions || {};
    this._registeredAPIModules = {};
    this._pendingCallbacks = {};
    this._pendingEvents = {};
    this._messageHandlers = {
      init: this._handleInit,
      req: this._handleRequest,
      resp: this._handleResponse,
      event_query: this._handleEventQuery,
      broadcast: this._handleBroadcast
    };
  }

  _createClass(XDMRPC, [{
    key: '_handleInit',
    value: function _handleInit(event, reg) {
      this._registeredExtensions[reg.extension_id].source = event.source;
      if (reg.initCallback) {
        reg.initCallback(event.data.eid);
        delete reg.initCallback;
      }
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
    key: '_handleRequest',
    value: function _handleRequest(event, reg) {
      function sendResponse() {
        var args = _commonUtil2['default'].argumentsToArray(arguments);
        event.source.postMessage({
          mid: event.data.mid,
          type: 'resp',
          args: args
        }, reg.extension.url);
      }

      var data = event.data;
      var module = this._registeredAPIModules[data.mod];
      if (module) {
        var method = module[data.fn];
        if (method) {
          var methodArgs = data.args;
          sendResponse._context = this.getRegisteredExtensions(reg.extension)[0];
          methodArgs.push(sendResponse);
          method.apply(module, methodArgs);
        }
      }
    }
  }, {
    key: '_handleBroadcast',
    value: function _handleBroadcast(event, reg) {
      var event_data = event.data;
      var targetSpec = function targetSpec(r) {
        return r.extension.addon_key === reg.extension.addon_key && r.extension_id !== reg.extension_id;
      };
      this.dispatch(event_data.etyp, targetSpec, event_data.evnt, null, null);
    }
  }, {
    key: 'defineAPIModule',
    value: function defineAPIModule(module, moduleName) {
      if (!moduleName) {
        this._registeredAPIModules._globals = module;
      }
      this._registeredAPIModules[moduleName] = module;
      return this._registeredAPIModules;
    }
  }, {
    key: '_fullKey',
    value: function _fullKey(targetSpec) {
      var key = targetSpec.addon_key || 'global';
      if (targetSpec.key) {
        key = key + '@@' + targetSpec.key;
      }

      return key;
    }
  }, {
    key: 'queueEvent',
    value: function queueEvent(type, targetSpec, event, callback) {
      var loaded_frame,
          targets = this._findRegistrations(targetSpec);

      loaded_frame = targets.some(function (target) {
        return target.registered_events !== undefined;
      }, this);

      if (loaded_frame) {
        this.dispatch(type, targetSpec, event, callback);
      } else {
        this._pendingEvents[this._fullKey(targetSpec)] = {
          type: type,
          targetSpec: targetSpec,
          event: event,
          callback: callback,
          time: new Date().getTime(),
          uid: _commonUtil2['default'].randomString()
        };
      }
    }
  }, {
    key: '_handleEventQuery',
    value: function _handleEventQuery(message, extension) {
      var _this = this;

      var executed = {};
      var now = new Date().getTime();
      var keys = Object.keys(this._pendingEvents);
      keys.forEach(function (index) {
        var element = _this._pendingEvents[index];
        if (now - element.time <= VALID_EVENT_TIME_MS) {
          executed[index] = element;
          element.targetSpec.addon_key = extension.extension.addon_key;
          element.targetSpec.key = extension.extension.key;
          _this.dispatch(element.type, element.targetSpec, element.event, element.callback, message.source);
        }
        delete _this._pendingEvents[index];
      });

      this._registeredExtensions[extension.extension_id].registered_events = message.data.args;

      return executed;
    }
  }, {
    key: 'dispatch',
    value: function dispatch(type, targetSpec, event, callback, source) {
      function sendEvent(reg, evnt) {
        if (reg.source) {
          var mid;
          if (callback) {
            mid = _commonUtil2['default'].randomString();
            this._pendingCallbacks[mid] = callback;
          }

          reg.source.postMessage({
            type: 'evt',
            mid: mid,
            etyp: type,
            evnt: evnt
          }, reg.extension.url);
        } else {
          throw "Cannot send post message without a source";
        }
      }

      var registrations = this._findRegistrations(targetSpec || {});
      registrations.forEach(function (reg) {
        if (source) {
          reg.source = source;
        }
        _commonUtil2['default']._bind(this, sendEvent)(reg, event);
      }, this);
    }
  }, {
    key: '_findRegistrations',
    value: function _findRegistrations(targetSpec) {
      var _this2 = this;

      if (this._registeredExtensions.length === 0) {
        _commonUtil2['default'].error('no registered extensions', this._registeredExtensions);
        return [];
      }
      var keys = Object.getOwnPropertyNames(targetSpec);
      var registrations = Object.getOwnPropertyNames(this._registeredExtensions).map(function (key) {
        return _this2._registeredExtensions[key];
      });

      if (targetSpec instanceof Function) {
        return registrations.filter(targetSpec);
      } else {
        return registrations.filter(function (reg) {
          return keys.every(function (key) {
            return reg.extension[key] === targetSpec[key];
          });
        });
      }
    }
  }, {
    key: 'registerExtension',
    value: function registerExtension(extension_id, data) {
      // delete duplicate registrations
      if (data.extension.addon_key && data.extension.key) {
        var existingView = this._findRegistrations({
          addon_key: data.extension.addon_key,
          key: data.extension.key
        });
        if (existingView.length !== 0) {
          delete this._registeredExtensions[existingView[0].extension_id];
        }
      }
      data.extension_id = extension_id;
      this._registeredExtensions[extension_id] = data;
    }
  }, {
    key: 'getApiSpec',
    value: function getApiSpec() {
      var that = this;
      function createModule(moduleName) {
        var module = that._registeredAPIModules[moduleName];
        if (!module) {
          throw new Error("unregistered API module: " + moduleName);
        }
        return Object.getOwnPropertyNames(module).reduce(function (accumulator, functionName) {
          if (typeof module[functionName] === 'function') {
            accumulator[functionName] = {}; // could hold function metadata, empty for now
          }
          return accumulator;
        }, {});
      }

      return Object.getOwnPropertyNames(this._registeredAPIModules).reduce(function (accumulator, moduleName) {
        accumulator[moduleName] = createModule(moduleName);
        return accumulator;
      }, {});
    }

    // validate origin of postMessage
  }, {
    key: '_checkOrigin',
    value: function _checkOrigin(event, reg) {
      var no_source_types = ['init', 'event_query'];
      var isNoSourceType = reg && !reg.source && no_source_types.indexOf(event.data.type) > -1;
      var sourceTypeMatches = reg && event.source === reg.source;
      var hasExtensionUrl = reg && reg.extension.url.indexOf(event.origin) === 0;
      var isValidOrigin = hasExtensionUrl && (isNoSourceType || sourceTypeMatches);
      if (!isValidOrigin) {
        _commonUtil2['default'].warn("Failed to validate origin: " + event.origin);
      }
      return isValidOrigin;
    }
  }, {
    key: 'getRegisteredExtensions',
    value: function getRegisteredExtensions(filter) {
      if (filter) {
        return this._findRegistrations(filter);
      }
      return this._registeredExtensions;
    }
  }, {
    key: 'unregisterExtension',
    value: function unregisterExtension(filter) {
      var registrations = this._findRegistrations(filter);
      if (registrations.length !== 0) {
        registrations.forEach(function (registration) {
          delete this._registeredExtensions[registration.extension_id];
        }, this);
      }
    }
  }]);

  return XDMRPC;
})(_commonPostmessage2['default']);

module.exports = XDMRPC;

},{"../common/postmessage":2,"../common/util":3}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbW9hdGVzL2hpcGNoYXQvY3JhcHBpZS9ub2RlX21vZHVsZXMvc2ltcGxlLXhkbS9zcmMvaG9zdC9pbmRleC5qcyIsIi9Vc2Vycy9tb2F0ZXMvaGlwY2hhdC9jcmFwcGllL25vZGVfbW9kdWxlcy9zaW1wbGUteGRtL3NyYy9jb21tb24vcG9zdG1lc3NhZ2UuanMiLCIvVXNlcnMvbW9hdGVzL2hpcGNoYXQvY3JhcHBpZS9ub2RlX21vZHVsZXMvc2ltcGxlLXhkbS9zcmMvY29tbW9uL3V0aWwuanMiLCIvVXNlcnMvbW9hdGVzL2hpcGNoYXQvY3JhcHBpZS9ub2RlX21vZHVsZXMvc2ltcGxlLXhkbS9zcmMvaG9zdC94ZG1ycGMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztzQkNBbUIsVUFBVTs7OzswQkFDWCxnQkFBZ0I7Ozs7SUFFNUIsT0FBTztBQUVBLFdBRlAsT0FBTyxHQUVHOzBCQUZWLE9BQU87O0FBR1QsUUFBSSxDQUFDLElBQUksR0FBRyx5QkFBWSxDQUFDO0dBQzFCOztlQUpHLE9BQU87O1dBTUgsa0JBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO0FBQzFDLFVBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3hELGFBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUN2Qzs7O1dBRVEsbUJBQUMsU0FBUyxFQUFFO0FBQ25CLFVBQUcsQ0FBQyxTQUFTLENBQUMsU0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBQztBQUN4QyxjQUFNLEtBQUssQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO09BQ3JEO0FBQ0QsYUFBTyxTQUFTLENBQUMsU0FBUyxHQUFH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O1NBOU9HLE1BQU07OztBQWtQWixNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgWERNUlBDIGZyb20gJy4veGRtcnBjJztcbmltcG9ydCBVdGlscyBmcm9tICcuLi9jb21tb24vdXRpbCc7XG5cbmNsYXNzIENvbm5lY3Qge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX3hkbSA9IG5ldyBYRE1SUEMoKTtcbiAgfVxuXG4gIGRpc3BhdGNoKHR5cGUsIHRhcmdldFNwZWMsIGV2ZW50LCBjYWxsYmFjaykge1xuICAgIHRoaXMuX3hkbS5xdWV1ZUV2ZW50KHR5cGUsIHRhcmdldFNwZWMsIGV2ZW50LCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RXh0ZW5zaW9ucyh0YXJnZXRTcGVjKTtcbiAgfVxuXG4gIF9jcmVhdGVJZChleHRlbnNpb24pIHtcbiAgICBpZighZXh0ZW5zaW9uLmFkZG9uX2tleSB8fCAhZXh0ZW5zaW9uLmtleSl7XG4gICAgICB0aHJvdyBFcnJvcignRXh0ZW5zaW9ucyByZXF1aXJlIGFkZG9uX2tleSBhbmQga2V5Jyk7XG4gICAgfVxuICAgIHJldHVybiBleHRlbnNpb24uYWRkb25fa2V5ICsgJ19fJyArIGV4dGVuc2lvbi5rZXkgKyAnX18nICsgVXRpbHMucmFuZG9tU3RyaW5nKCk7XG4gIH1cbiAgLyoqXG4gICogQ3JlYXRlcyBhIG5ldyBpZnJhbWVkIG1vZHVsZSwgd2l0aG91dCBhY3R1YWxseSBjcmVhdGluZyB0aGUgRE9NIGVsZW1lbnQuXG4gICogVGhlIGlmcmFtZSBhdHRyaWJ1dGVzIGFyZSBwYXNzZWQgdG8gdGhlICdzZXR1cENhbGxiYWNrJywgd2hpY2ggaXMgcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nXG4gICogdGhlIERPTSBlbGVtZW50IGFuZCByZXR1cm5pbmcgdGhlIHdpbmRvdyByZWZlcmVuY2UuXG4gICpcbiAgKiBAcGFyYW0gZXh0ZW5zaW9uIFRoZSBleHRlbnNpb24gZGVmaW5pdGlvbi4gRXhhbXBsZTpcbiAgKiAgIHtcbiAgKiAgICAgYWRkb25fa2V5OiAnbXktYWRkb24nLFxuICAqICAgICBrZXk6ICdteS1tb2R1bGUnLFxuICAqICAgICB1cmw6ICdodHRwczovL2V4YW1wbGUuY29tL215LW1vZHVsZSdcbiAgKiAgIH1cbiAgKlxuICAqIEBwYXJhbSBpbml0Q2FsbGJhY2sgVGhlIG9wdGlvbmFsIGluaXRDYWxsYmFjayBpcyBjYWxsZWQgd2hlbiB0aGUgYnJpZGdlIGJldHdlZW4gaG9zdCBhbmQgaWZyYW1lIGlzIGVzdGFibGlzaGVkLlxuICAqKi9cbiAgY3JlYXRlKGV4dGVuc2lvbiwgaW5pdENhbGxiYWNrKSB7XG4gICAgbGV0IGV4dGVuc2lvbl9pZCA9IHRoaXMucmVnaXN0ZXJFeHRlbnNpb24oZXh0ZW5zaW9uLCBpbml0Q2FsbGJhY2spO1xuXG4gICAgbGV0IGRhdGEgPSB7XG4gICAgICBleHRlbnNpb25faWQ6IGV4dGVuc2lvbl9pZCxcbiAgICAgIGFwaTogdGhpcy5feGRtLmdldEFwaVNwZWMoKSxcbiAgICAgIG9yaWdpbjogd2luZG93LmxvY2F0aW9uLm9yaWdpblxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IGV4dGVuc2lvbl9pZCxcbiAgICAgIG5hbWU6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgc3JjOiBleHRlbnNpb24udXJsXG4gICAgfTtcbiAgfVxuXG4gIHJlZ2lzdGVyRXh0ZW5zaW9uKGV4dGVuc2lvbiwgaW5pdENhbGxiYWNrKSB7XG4gICAgbGV0IGV4dGVuc2lvbl9pZCA9IHRoaXMuX2NyZWF0ZUlkKGV4dGVuc2lvbik7XG4gICAgdGhpcy5feGRtLnJlZ2lzdGVyRXh0ZW5zaW9uKGV4dGVuc2lvbl9pZCwge1xuICAgICAgZXh0ZW5zaW9uOiBleHRlbnNpb24sXG4gICAgICBpbml0Q2FsbGJhY2s6IGluaXRDYWxsYmFja1xuICAgIH0pO1xuICAgIHJldHVybiBleHRlbnNpb25faWQ7XG4gIH1cblxuICBkZWZpbmVNb2R1bGUobW9kdWxlTmFtZSwgbW9kdWxlKSB7XG4gICAgdGhpcy5feGRtLmRlZmluZUFQSU1vZHVsZShtb2R1bGUsIG1vZHVsZU5hbWUpO1xuICB9XG5cbiAgZGVmaW5lR2xvYmFscyhtb2R1bGUpIHtcbiAgICB0aGlzLl94ZG0uZGVmaW5lQVBJTW9kdWxlKG1vZHVsZSk7XG4gIH1cblxuICBnZXRFeHRlbnNpb25zKGZpbHRlcikge1xuICAgIHJldHVybiB0aGlzLl94ZG0uZ2V0UmVnaXN0ZXJlZEV4dGVuc2lvbnMoZmlsdGVyKTtcbiAgfVxuXG4gIHVucmVnaXN0ZXJFeHRlbnNpb24oZmlsdGVyKSB7XG4gICAgcmV0dXJuIHRoaXMuX3hkbS51bnJlZ2lzdGVyRXh0ZW5zaW9uKGZpbHRlcik7XG4gIH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBDb25uZWN0KCk7IiwiaW1wb3J0IFV0aWwgZnJvbSAnLi91dGlsJztcbmNsYXNzIFBvc3RNZXNzYWdlIHtcblxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgbGV0IGQgPSBkYXRhIHx8IHt9O1xuICAgIHRoaXMuX3JlZ2lzdGVyTGlzdGVuZXIoZC5saXN0ZW5Pbik7XG4gIH1cblxuIC8vIGxpc3RlbiBmb3IgcG9zdE1lc3NhZ2UgZXZlbnRzIChkZWZhdWx0cyB0byB3aW5kb3cpLlxuICBfcmVnaXN0ZXJMaXN0ZW5lcihsaXN0ZW5Pbikge1xuICAgIGlmKCFsaXN0ZW5PbiB8fCAhbGlzdGVuT24uYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgbGlzdGVuT24gPSB3aW5kb3c7XG4gICAgfVxuICAgIGxpc3Rlbk9uLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIFV0aWwuX2JpbmQodGhpcywgdGhpcy5fcmVjZWl2ZU1lc3NhZ2UpLCBmYWxzZSk7XG4gIH1cblxuICBfcmVjZWl2ZU1lc3NhZ2UgKGV2ZW50KSB7XG4gICAgbGV0IGV4dGVuc2lvbklkID0gZXZlbnQuZGF0YS5laWQsXG4gICAgcmVnO1xuXG4gICAgaWYoZXh0ZW5zaW9uSWQgJiYgdGhpcy5fcmVnaXN0ZXJlZEV4dGVuc2lvbnMpe1xuICAgICAgcmVnID0gdGhpcy5fcmVnaXN0ZXJlZEV4dGVuc2lvbnNbZXh0ZW5zaW9uSWRdO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fY2hlY2tPcmlnaW4oZXZlbnQsIHJlZykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgaGFuZGxlciA9IHRoaXMuX21lc3NhZ2VIYW5kbGVyc1tldmVudC5kYXRhLnR5cGVdO1xuICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICBoYW5kbGVyLmNhbGwodGhpcywgZXZlbnQsIHJlZyk7XG4gICAgfVxuICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQb3N0TWVzc2FnZTsiLCJjb25zdCBMT0dfUFJFRklYID0gXCJbU2ltcGxlLVhETV0gXCI7XG5cbmNsYXNzIFV0aWwge1xuICByYW5kb21TdHJpbmcoKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDAwMDAwMDApLnRvU3RyaW5nKDE2KTtcbiAgfVxuXG4gIGlzU3RyaW5nKHN0cikge1xuICAgIHJldHVybiB0eXBlb2Ygc3RyID09PSBcInN0cmluZ1wiIHx8IHN0ciBpbnN0YW5jZW9mIFN0cmluZztcbiAgfVxuXG4gIC8vIG1pZ2h0IGJlIHVuLW5lZWRlZFxuICBhcmd1bWVudHNUb0FycmF5KGFycmF5TGlrZSkge1xuICAgIHZhciBhcnJheSA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlMaWtlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcnJheS5wdXNoKGFycmF5TGlrZVtpXSk7XG4gICAgfVxuICAgIHJldHVybiBhcnJheTtcbiAgfVxuXG4gIGhhc0NhbGxiYWNrKGFyZ3MpIHtcbiAgICB2YXIgbGVuZ3RoID0gYXJncy5sZW5ndGg7XG4gICAgcmV0dXJuIGxlbmd0aCA+IDAgJiYgdHlwZW9mIGFyZ3NbbGVuZ3RoIC0gMV0gPT09ICdmdW5jdGlvbic7XG4gIH1cblxuICBlcnJvcihtc2cpIHtcbiAgICAgIGlmICh3aW5kb3cuY29uc29sZSkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoTE9HX1BSRUZJWCArIG1zZyk7XG4gICAgICB9XG4gIH1cblxuICB3YXJuKG1zZykge1xuICAgICAgaWYgKHdpbmRvdy5jb25zb2xlKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKExPR19QUkVGSVggKyBtc2cpO1xuICAgICAgfVxuICB9XG5cbiAgX2JpbmQodGhpc3AsIGZuKXtcbiAgICBpZihGdW5jdGlvbi5wcm90b3R5cGUuYmluZCkge1xuICAgICAgcmV0dXJuIGZuLmJpbmQodGhpc3ApO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNwLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cblxuICBlYWNoKG8sIGl0KSB7XG4gICAgdmFyIGw7XG4gICAgdmFyIGs7XG4gICAgaWYgKG8pIHtcbiAgICAgIGwgPSBvLmxlbmd0aDtcbiAgICAgIGlmIChsICE9IG51bGwgJiYgdHlwZW9mIG8gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgayA9IDA7XG4gICAgICAgIHdoaWxlIChrIDwgbCkge1xuICAgICAgICAgIGlmIChpdC5jYWxsKG9ba10sIGssIG9ba10pID09PSBmYWxzZSl7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgayArPSAxO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGsgaW4gbykge1xuICAgICAgICAgIGlmIChvLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgICAgICBpZiAoaXQuY2FsbChvW2tdLCBrLCBvW2tdKSA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBleHRlbmQoZGVzdCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgIHZhciBzcmNzID0gW10uc2xpY2UuY2FsbChhcmdzLCAxLCBhcmdzLmxlbmd0aCk7XG4gICAgc3Jjcy5mb3JFYWNoKGZ1bmN0aW9uKHNvdXJjZSkge1xuICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIGRlc3RbbmFtZV0gPSBzb3VyY2VbbmFtZV07XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gZGVzdDtcbiAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFV0aWwoKTsiLCIvKipcbiogUG9zdG1lc3NhZ2UgZm9ybWF0OlxuKlxuKiBJbml0aWFsaXphdGlvblxuKiAtLS0tLS0tLS0tLS0tLVxuKiB7XG4qICAgdHlwZTogJ2luaXQnLFxuKiAgIGVpZDogJ215LWFkZG9uX19teS1tb2R1bGUteHl6JyAgLy8gdGhlIGV4dGVuc2lvbiBpZGVudGlmaWVyLCB1bmlxdWUgYWNyb3NzIGlmcmFtZXNcbiogfVxuKlxuKiBSZXF1ZXN0XG4qIC0tLS0tLS1cbioge1xuKiAgIHR5cGU6ICdyZXEnLFxuKiAgIGVpZDogJ215LWFkZG9uX19teS1tb2R1bGUteHl6JywgIC8vIHRoZSBleHRlbnNpb24gaWRlbnRpZmllciwgdW5pcXVlIGZvciBpZnJhbWVcbiogICBtaWQ6ICd4eXonLCAgLy8gYSB1bmlxdWUgbWVzc2FnZSBpZGVudGlmaWVyLCByZXF1aXJlZCBmb3IgY2FsbGJhY2tzXG4qICAgbW9kOiAnY29va2llJywgIC8vIHRoZSBtb2R1bGUgbmFtZVxuKiAgIGZuOiAncmVhZCcsICAvLyB0aGUgbWV0aG9kIG5hbWVcbiogICBhcmdzOiBbYXJndW1lbnRzXSAgLy8gdGhlIG1ldGhvZCBhcmd1bWVudHNcbiogfVxuKlxuKiBSZXNwb25zZVxuKiAtLS0tLS0tLVxuKiB7XG4qICAgdHlwZTogJ3Jlc3AnXG4qICAgZWlkOiAnbXktYWRkb25fX215LW1vZHVsZS14eXonLCAgLy8gdGhlIGV4dGVuc2lvbiBpZGVudGlmaWVyLCB1bmlxdWUgZm9yIGlmcmFtZVxuKiAgIG1pZDogJ3h5eicsICAvLyBhIHVuaXF1ZSBtZXNzYWdlIGlkZW50aWZpZXIsIG9idGFpbmVkIGZyb20gdGhlIHJlcXVlc3RcbiogICBhcmdzOiBbYXJndW1lbnRzXSAgLy8gdGhlIGNhbGxiYWNrIGFyZ3VtZW50c1xuKiB9XG4qXG4qIEV2ZW50XG4qIC0tLS0tXG4qIHtcbiogICB0eXBlOiAnZXZ0JyxcbiogICBldHlwOiAnc29tZS1ldmVudCcsXG4qICAgZXZudDogeyAuLi4gfSAgLy8gdGhlIGV2ZW50IGRhdGFcbiogICBtaWQ6ICd4eXonLCAvLyBhIHVuaXF1ZSBtZXNzYWdlIGlkZW50aWZpZXIgZm9yIHRoZSBldmVudFxuKiB9XG4qKi9cblxuaW1wb3J0IFV0aWxzIGZyb20gJy4uL2NvbW1vbi91dGlsJztcbmltcG9ydCBQb3N0TWVzc2FnZSBmcm9tICcuLi9jb21tb24vcG9zdG1lc3NhZ2UnO1xuXG5sZXQgVkFMSURfRVZFTlRfVElNRV9NUyA9IDMwMDAwOyAvLzMwIHNlY29uZHNcblxuY2xhc3MgWERNUlBDIGV4dGVuZHMgUG9zdE1lc3NhZ2Uge1xuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICBzdXBlcihjb25maWcpO1xuICAgIHRoaXMuX3JlZ2lzdGVyZWRFeHRlbnNpb25zID0gY29uZmlnLmV4dGVuc2lvbnMgfHwge307XG4gICAgdGhpcy5fcmVnaXN0ZXJlZEFQSU1vZHVsZXMgPSB7fTtcbiAgICB0aGlzLl9wZW5kaW5nQ2FsbGJhY2tzID0ge307XG4gICAgdGhpcy5fcGVuZGluZ0V2ZW50cyA9IHt9O1xuICAgIHRoaXMuX21lc3NhZ2VIYW5kbGVycyA9IHtcbiAgICAgIGluaXQ6IHRoaXMuX2hhbmRsZUluaXQsXG4gICAgICByZXE6IHRoaXMuX2hhbmRsZVJlcXVlc3QsXG4gICAgICByZXNwOiB0aGlzLl9oYW5kbGVSZXNwb25zZSxcbiAgICAgIGV2ZW50X3F1ZXJ5OiB0aGlzLl9oYW5kbGVFdmVudFF1ZXJ5LFxuICAgICAgYnJvYWRjYXN0OiB0aGlzLl9oYW5kbGVCcm9hZGNhc3RcbiAgICB9O1xuICB9XG5cbiAgX2hhbmRsZUluaXQoZXZlbnQsIHJlZykge1xuICAgIHRoaXMuX3JlZ2lzdGVyZWRFeHRlbnNpb25zW3JlZy5leHRlbnNpb25faWRdLnNvdXJjZSA9IGV2ZW50LnNvdXJjZTtcbiAgICBpZiAocmVnLmluaXRDYWxsYmFjaykge1xuICAgICAgcmVnLmluaXRDYWxsYmFjayhldmVudC5kYXRhLmVpZCk7XG4gICAgICBkZWxldGUgcmVnLmluaXRDYWxsYmFjaztcbiAgICB9XG4gIH1cblxuICBfaGFuZGxlUmVzcG9uc2UoZXZlbnQpIHtcbiAgICB2YXIgZGF0YSA9IGV2ZW50LmRhdGE7XG4gICAgdmFyIHBlbmRpbmdDYWxsYmFjayA9IHRoaXMuX3BlbmRpbmdDYWxsYmFja3NbZGF0YS5taWRdO1xuICAgIGlmIChwZW5kaW5nQ2FsbGJhY2spIHtcbiAgICAgIGRlbGV0ZSB0aGlzLl9wZW5kaW5nQ2FsbGJhY2tzW2RhdGEubWlkXTtcbiAgICAgIHBlbmRpbmdDYWxsYmFjay5hcHBseSh3aW5kb3csIGRhdGEuYXJncyk7XG4gICAgfVxuICB9XG5cbiAgX2hhbmRsZVJlcXVlc3QoZXZlbnQsIHJlZykge1xuICAgIGZ1bmN0aW9uIHNlbmRSZXNwb25zZSgpIHtcbiAgICAgIHZhciBhcmdzID0gVXRpbHMuYXJndW1lbnRzVG9BcnJheShhcmd1bWVudHMpO1xuICAgICAgZXZlbnQuc291cmNlLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgbWlkOiBldmVudC5kYXRhLm1pZCxcbiAgICAgICAgdHlwZTogJ3Jlc3AnLFxuICAgICAgICBhcmdzOiBhcmdzXG4gICAgICB9LCByZWcuZXh0ZW5zaW9uLnVybCk7XG4gICAgfVxuXG4gICAgdmFyIGRhdGEgPSBldmVudC5kYXRhO1xuICAgIHZhciBtb2R1bGUgPSB0aGlzLl9yZWdpc3RlcmVkQVBJTW9kdWxlc1tkYXRhLm1vZF07XG4gICAgaWYgKG1vZHVsZSkge1xuICAgICAgdmFyIG1ldGhvZCA9IG1vZHVsZVtkYXRhLmZuXTtcbiAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgdmFyIG1ldGhvZEFyZ3MgPSBkYXRhLmFyZ3M7XG4gICAgICAgIHNlbmRSZXNwb25zZS5fY29udGV4dCA9IHRoaXMuZ2V0UmVnaXN0ZXJlZEV4dGVuc2lvbnMocmVnLmV4dGVuc2lvbilbMF07XG4gICAgICAgIG1ldGhvZEFyZ3MucHVzaChzZW5kUmVzcG9uc2UpO1xuICAgICAgICBtZXRob2QuYXBwbHkobW9kdWxlLCBtZXRob2RBcmdzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfaGFuZGxlQnJvYWRjYXN0KGV2ZW50LCByZWcpIHtcbiAgICB2YXIgZXZlbnRfZGF0YSA9IGV2ZW50LmRhdGE7XG4gICAgdmFyIHRhcmdldFNwZWMgPSByID0+IHIuZXh0ZW5zaW9uLmFkZG9uX2tleSA9PT0gcmVnLmV4dGVuc2lvbi5hZGRvbl9rZXkgJiYgci5leHRlbnNpb25faWQgIT09IHJlZy5leHRlbnNpb25faWQ7XG4gICAgdGhpcy5kaXNwYXRjaChldmVudF9kYXRhLmV0eXAsIHRhcmdldFNwZWMsIGV2ZW50X2RhdGEuZXZudCwgbnVsbCwgbnVsbCk7XG4gIH1cblxuXG4gIGRlZmluZUFQSU1vZHVsZShtb2R1bGUsIG1vZHVsZU5hbWUpe1xuICAgIGlmKCFtb2R1bGVOYW1lKXtcbiAgICAgIHRoaXMuX3JlZ2lzdGVyZWRBUElNb2R1bGVzLl9nbG9iYWxzID0gbW9kdWxlO1xuICAgIH1cbiAgICB0aGlzLl9yZWdpc3RlcmVkQVBJTW9kdWxlc1ttb2R1bGVOYW1lXSA9IG1vZHVsZTtcbiAgICByZXR1cm4gdGhpcy5fcmVnaXN0ZXJlZEFQSU1vZHVsZXM7XG4gIH1cblxuICBfZnVsbEtleSh0YXJnZXRTcGVjKXtcbiAgICB2YXIga2V5ID0gdGFyZ2V0U3BlYy5hZGRvbl9rZXkgfHwgJ2dsb2JhbCc7XG4gICAgaWYodGFyZ2V0U3BlYy5rZXkpe1xuICAgICAga2V5ID0gYCR7a2V5fUBAJHt0YXJnZXRTcGVjLmtleX1gO1xuICAgIH1cblxuICAgIHJldHVybiBrZXk7XG4gIH1cblxuICBxdWV1ZUV2ZW50KHR5cGUsIHRhcmdldFNwZWMsIGV2ZW50LCBjYWxsYmFjaykge1xuICAgIHZhciBsb2FkZWRfZnJhbWUsXG4gICAgdGFyZ2V0cyA9IHRoaXMuX2ZpbmRSZWdpc3RyYXRpb25zKHRhcmdldFNwZWMpO1xuXG4gICAgbG9hZGVkX2ZyYW1lID0gdGFyZ2V0cy5zb21lKCh0YXJnZXQpID0+IHtcbiAgICAgIHJldHVybiB0YXJnZXQucmVnaXN0ZXJlZF9ldmVudHMgIT09IHVuZGVmaW5lZDtcbiAgICB9LCB0aGlzKTtcblxuICAgIGlmKGxvYWRlZF9mcmFtZSl7XG4gICAgICB0aGlzLmRpc3BhdGNoKHR5cGUsIHRhcmdldFNwZWMsIGV2ZW50LCBjYWxsYmFjayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3BlbmRpbmdFdmVudHNbdGhpcy5fZnVsbEtleSh0YXJnZXRTcGVjKV0gPSB7XG4gICAgICAgIHR5cGUsXG4gICAgICAgIHRhcmdldFNwZWMsXG4gICAgICAgIGV2ZW50LFxuICAgICAgICBjYWxsYmFjayxcbiAgICAgICAgdGltZTogbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gICAgICAgIHVpZDogVXRpbHMucmFuZG9tU3RyaW5nKClcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgX2hhbmRsZUV2ZW50UXVlcnkobWVzc2FnZSwgZXh0ZW5zaW9uKSB7XG4gICAgbGV0IGV4ZWN1dGVkID0ge307XG4gICAgbGV0IG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXModGhpcy5fcGVuZGluZ0V2ZW50cyk7XG4gICAga2V5cy5mb3JFYWNoKChpbmRleCkgPT4ge1xuICAgICAgbGV0IGVsZW1lbnQgPSB0aGlzLl9wZW5kaW5nRXZlbnRzW2luZGV4XTtcbiAgICAgIGlmKCAobm93IC0gZWxlbWVudC50aW1lKSA8PSBWQUxJRF9FVkVOVF9USU1FX01TKSB7XG4gICAgICAgIGV4ZWN1dGVkW2luZGV4XSA9IGVsZW1lbnQ7XG4gICAgICAgIGVsZW1lbnQudGFyZ2V0U3BlYy5hZGRvbl9rZXkgPSBleHRlbnNpb24uZXh0ZW5zaW9uLmFkZG9uX2tleTtcbiAgICAgICAgZWxlbWVudC50YXJnZXRTcGVjLmtleSA9IGV4dGVuc2lvbi5leHRlbnNpb24ua2V5O1xuICAgICAgICB0aGlzLmRpc3BhdGNoKGVsZW1lbnQudHlwZSwgZWxlbWVudC50YXJnZXRTcGVjLCBlbGVtZW50LmV2ZW50LCBlbGVtZW50LmNhbGxiYWNrLCBtZXNzYWdlLnNvdXJjZSk7XG4gICAgICB9XG4gICAgICBkZWxldGUgdGhpcy5fcGVuZGluZ0V2ZW50c1tpbmRleF07XG4gICAgfSk7XG5cbiAgICB0aGlzLl9yZWdpc3RlcmVkRXh0ZW5zaW9uc1tleHRlbnNpb24uZXh0ZW5zaW9uX2lkXS5yZWdpc3RlcmVkX2V2ZW50cyA9IG1lc3NhZ2UuZGF0YS5hcmdzO1xuXG4gICAgcmV0dXJuIGV4ZWN1dGVkO1xuICB9XG5cbiAgZGlzcGF0Y2godHlwZSwgdGFyZ2V0U3BlYywgZXZlbnQsIGNhbGxiYWNrLCBzb3VyY2UpIHtcbiAgICBmdW5jdGlvbiBzZW5kRXZlbnQocmVnLCBldm50KSB7XG4gICAgICBpZiAocmVnLnNvdXJjZSkge1xuICAgICAgICB2YXIgbWlkO1xuICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICBtaWQgPSBVdGlscy5yYW5kb21TdHJpbmcoKTtcbiAgICAgICAgICB0aGlzLl9wZW5kaW5nQ2FsbGJhY2tzW21pZF0gPSBjYWxsYmFjaztcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZy5zb3VyY2UucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgIHR5cGU6ICdldnQnLFxuICAgICAgICAgIG1pZDogbWlkLFxuICAgICAgICAgIGV0eXA6IHR5cGUsXG4gICAgICAgICAgZXZudDogZXZudFxuICAgICAgICB9LCByZWcuZXh0ZW5zaW9uLnVybCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBcIkNhbm5vdCBzZW5kIHBvc3QgbWVzc2FnZSB3aXRob3V0IGEgc291cmNlXCI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHJlZ2lzdHJhdGlvbnMgPSB0aGlzLl9maW5kUmVnaXN0cmF0aW9ucyh0YXJnZXRTcGVjIHx8IHt9KTtcbiAgICByZWdpc3RyYXRpb25zLmZvckVhY2goZnVuY3Rpb24gKHJlZykge1xuICAgICAgaWYoc291cmNlKXtcbiAgICAgICAgcmVnLnNvdXJjZSA9IHNvdXJjZTtcbiAgICAgIH1cbiAgICAgIFV0aWxzLl9iaW5kKHRoaXMsIHNlbmRFdmVudCkocmVnLCBldmVudCk7XG4gICAgfSwgdGhpcyk7XG4gIH1cblxuICBfZmluZFJlZ2lzdHJhdGlvbnModGFyZ2V0U3BlYykge1xuICAgIGlmKHRoaXMuX3JlZ2lzdGVyZWRFeHRlbnNpb25zLmxlbmd0aCA9PT0gMCl7XG4gICAgICBVdGlscy5lcnJvcignbm8gcmVnaXN0ZXJlZCBleHRlbnNpb25zJywgdGhpcy5fcmVnaXN0ZXJlZEV4dGVuc2lvbnMpO1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICB2YXIga2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldFNwZWMpO1xuICAgIHZhciByZWdpc3RyYXRpb25zID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcy5fcmVnaXN0ZXJlZEV4dGVuc2lvbnMpLm1hcCgoa2V5KSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVnaXN0ZXJlZEV4dGVuc2lvbnNba2V5XTtcbiAgICB9KTtcblxuICAgIGlmICh0YXJnZXRTcGVjIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgIHJldHVybiByZWdpc3RyYXRpb25zLmZpbHRlcih0YXJnZXRTcGVjKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlZ2lzdHJhdGlvbnMuZmlsdGVyKGZ1bmN0aW9uIChyZWcpIHtcbiAgICAgICAgcmV0dXJuIGtleXMuZXZlcnkoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgIHJldHVybiByZWcuZXh0ZW5zaW9uW2tleV0gPT09IHRhcmdldFNwZWNba2V5XTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZWdpc3RlckV4dGVuc2lvbihleHRlbnNpb25faWQsIGRhdGEpIHtcbiAgICAvLyBkZWxldGUgZHVwbGljYXRlIHJlZ2lzdHJhdGlvbnNcbiAgICBpZihkYXRhLmV4dGVuc2lvbi5hZGRvbl9rZXkgJiYgZGF0YS5leHRlbnNpb24ua2V5KXtcbiAgICAgIGxldCBleGlzdGluZ1ZpZXcgPSB0aGlzLl9maW5kUmVnaXN0cmF0aW9ucyh7XG4gICAgICAgIGFkZG9uX2tleTogZGF0YS5leHRlbnNpb24uYWRkb25fa2V5LFxuICAgICAgICBrZXk6IGRhdGEuZXh0ZW5zaW9uLmtleVxuICAgICAgfSk7XG4gICAgICBpZihleGlzdGluZ1ZpZXcubGVuZ3RoICE9PSAwKXtcbiAgICAgICAgZGVsZXRlIHRoaXMuX3JlZ2lzdGVyZWRFeHRlbnNpb25zW2V4aXN0aW5nVmlld1swXS5leHRlbnNpb25faWRdO1xuICAgICAgfVxuICAgIH1cbiAgICBkYXRhLmV4dGVuc2lvbl9pZCA9IGV4dGVuc2lvbl9pZDtcbiAgICB0aGlzLl9yZWdpc3RlcmVkRXh0ZW5zaW9uc1tleHRlbnNpb25faWRdID0gZGF0YTtcbiAgfVxuXG4gIGdldEFwaVNwZWMoKSB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIGZ1bmN0aW9uIGNyZWF0ZU1vZHVsZShtb2R1bGVOYW1lKSB7XG4gICAgICB2YXIgbW9kdWxlID0gdGhhdC5fcmVnaXN0ZXJlZEFQSU1vZHVsZXNbbW9kdWxlTmFtZV07XG4gICAgICBpZighbW9kdWxlKXtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidW5yZWdpc3RlcmVkIEFQSSBtb2R1bGU6IFwiICsgbW9kdWxlTmFtZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMobW9kdWxlKS5yZWR1Y2UoKGFjY3VtdWxhdG9yLCBmdW5jdGlvbk5hbWUpID0+IHtcbiAgICAgICAgICBpZiAodHlwZW9mIG1vZHVsZVtmdW5jdGlvbk5hbWVdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgIGFjY3VtdWxhdG9yW2Z1bmN0aW9uTmFtZV0gPSB7fTsgLy8gY291bGQgaG9sZCBmdW5jdGlvbiBtZXRhZGF0YSwgZW1wdHkgZm9yIG5vd1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gYWNjdW11bGF0b3I7XG4gICAgICB9LCB7fSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMuX3JlZ2lzdGVyZWRBUElNb2R1bGVzKS5yZWR1Y2UoKGFjY3VtdWxhdG9yLCBtb2R1bGVOYW1lKSA9PiB7XG4gICAgICAgIGFjY3VtdWxhdG9yW21vZHVsZU5hbWVdID0gY3JlYXRlTW9kdWxlKG1vZHVsZU5hbWUpO1xuICAgICAgICByZXR1cm4gYWNjdW11bGF0b3I7XG4gICAgfSwge30pO1xuICB9XG5cblxuICAvLyB2YWxpZGF0ZSBvcmlnaW4gb2YgcG9zdE1lc3NhZ2VcbiAgX2NoZWNrT3JpZ2luKGV2ZW50LCByZWcpIHtcbiAgICBsZXQgbm9fc291cmNlX3R5cGVzID0gWydpbml0JywgJ2V2ZW50X3F1ZXJ5J107XG4gICAgbGV0IGlzTm9Tb3VyY2VUeXBlID0gcmVnICYmICFyZWcuc291cmNlICYmIG5vX3NvdXJjZV90eXBlcy5pbmRleE9mKGV2ZW50LmRhdGEudHlwZSkgPiAtMTtcbiAgICBsZXQgc291cmNlVHlwZU1hdGNoZXMgPSByZWcgJiYgZXZlbnQuc291cmNlID09PSByZWcuc291cmNlO1xuICAgIGxldCBoYXNFeHRlbnNpb25VcmwgPSByZWcgJiYgcmVnLmV4dGVuc2lvbi51cmwuaW5kZXhPZihldmVudC5vcmlnaW4pID09PSAwO1xuICAgIGxldCBpc1ZhbGlkT3JpZ2luID0gaGFzRXh0ZW5zaW9uVXJsICYmIChpc05vU291cmNlVHlwZSB8fCBzb3VyY2VUeXBlTWF0Y2hlcyk7XG4gICAgaWYoIWlzVmFsaWRPcmlnaW4pIHtcbiAgICAgICAgVXRpbHMud2FybihcIkZhaWxlZCB0byB2YWxpZGF0ZSBvcmlnaW46IFwiICsgZXZlbnQub3JpZ2luKTtcbiAgICB9XG4gICAgcmV0dXJuIGlzVmFsaWRPcmlnaW47XG4gIH1cblxuICBnZXRSZWdpc3RlcmVkRXh0ZW5zaW9ucyhmaWx0ZXIpIHtcbiAgICBpZihmaWx0ZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLl9maW5kUmVnaXN0cmF0aW9ucyhmaWx0ZXIpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fcmVnaXN0ZXJlZEV4dGVuc2lvbnM7XG4gIH1cblxuICB1bnJlZ2lzdGVyRXh0ZW5zaW9uKGZpbHRlcikge1xuICAgIGxldCByZWdpc3RyYXRpb25zID0gdGhpcy5fZmluZFJlZ2lzdHJhdGlvbnMoZmlsdGVyKTtcbiAgICBpZihyZWdpc3RyYXRpb25zLmxlbmd0aCAhPT0gMCl7XG4gICAgICByZWdpc3RyYXRpb25zLmZvckVhY2goZnVuY3Rpb24ocmVnaXN0cmF0aW9uKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLl9yZWdpc3RlcmVkRXh0ZW5zaW9uc1tyZWdpc3RyYXRpb24uZXh0ZW5zaW9uX2lkXTtcbiAgICAgIH0sIHRoaXMpO1xuICAgIH1cbiAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gWERNUlBDOyJdfQ==
