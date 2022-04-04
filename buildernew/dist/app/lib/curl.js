//
//
//
//CHECK IN IE 11 BEFORE UNCOMMNETING THIS
//
//
//
//
////(function() {
//  var exports={};
//  window.shellwords=exports;
//  var scan;
//
//  scan = function(string, pattern, callback) {
//    var match, result;
//    result = "";
//    while (string.length > 0) {
//      match = string.match(pattern);
//      if (match) {
//        result += string.slice(0, match.index);
//        result += callback(match);
//        string = string.slice(match.index + match[0].length);
//      } else {
//        result += string;
//        string = "";
//      }
//    }
//    return result;
//  };
//
//  exports.split = function(line) {
//    var field, words;
//    if (line == null) {
//      line = "";
//    }
//    words = [];
//    field = "";
//    scan(line, /\s*(?:([^\s\\\'\"]+)|'((?:[^\'\\]|\\.)*)'|"((?:[^\"\\]|\\.)*)"|(\\.?)|(\S))(\s|$)?/, function(match) {
//      var dq, escape, garbage, raw, seperator, sq, word;
//      raw = match[0], word = match[1], sq = match[2], dq = match[3], escape = match[4], garbage = match[5], seperator = match[6];
//      if (garbage != null) {
//        throw new Error("Unmatched quote");
//      }
//      field += word || (sq || dq || escape).replace(/\\(?=.)/, "");
//      if (seperator != null) {
//        words.push(field);
//        return field = "";
//      }
//    });
//    if (field) {
//      words.push(field);
//    }
//    return words;
//  };
//
//  exports.escape = function(str) {
//    if (str == null) {
//      str = "";
//    }
//    if (str == null) {
//      return "''";
//    }
//    return str.replace(/([^A-Za-z0-9_\-.,:\/@\n])/g, "\\$1").replace(/\n/g, "'\n'");
//  };
//
//}).call(this);
//
//
//
//
//(function(){
//
////var words = require('shellwords')
//var words = window.shellwords;
//
//var exports={};
//window.curl=exports;
//// TODO -F, --form
//// TODO --data-binary
//// TODO --data-urlencode
//// TODO -r, --range
//
///**
// * Attempt to parse the given curl string.
// */
//
//exports.parse = function(s) {
//  if (0 != s.indexOf('curl ')) return
//  var args = rewrite(words.split(s))
//  var out = { method: 'GET', header: {} }
//  
//  if (args.indexOf('--data-binary') > 0 || args.indexOf('--data') > 0) {
//    out.method = "POST";
//  }
//  var state = ''
//
//  args.forEach(function(arg){
//    switch (true) {
//      case isURL(arg):
//        out.url = arg
//        break;
//
//      case arg == '-A' || arg == '--user-agent':
//        state = 'user-agent'
//        break;
//
//      case arg == '-H' || arg == '--header':
//        state = 'header'
//        break;
//
//      case arg == '-d' || arg == '--data' || arg == '--data-ascii':
//        state = 'data'
//        break;
//
//      case arg == '-u' || arg == '--user':
//        state = 'user'
//        break;
//
//      case arg == '-I' || arg == '--head':
//        out.method = 'HEAD'
//        break;
//
//      case arg == '-X' || arg == '--request':
//        state = 'method'
//        break;
//
//      case arg == '-b' || arg =='--cookie':
//        state = 'cookie'
//        break;
//
//      case arg == '--compressed':
//        out.header['Accept-Encoding'] = out.header['Accept-Encoding'] || 'deflate, gzip'
//        break;
//      case arg == '--data-binary' || '--data':
//        state = 'body'
//        break;
//
//      case !!arg:
//        switch (state) {
//          case 'header':
//            var field = parseField(arg)
//            out.header[field[0]] = field[1]
//            state = ''
//            break;
//          case 'body':
//            var _payload = JSON.parse(arg);
//            out.payload= _payload
//            state = ''
//            break;  
//          case 'user-agent':
//            out.header['User-Agent'] = arg
//            state = ''
//            break;
//          case 'data':
//            if (out.method == 'GET' || out.method == 'HEAD') out.method = 'POST'
//            out.header['Content-Type'] = out.header['Content-Type'] || 'application/x-www-form-urlencoded'
//            out.body = out.body
//              ? out.body + '&' + arg
//              : arg
//            state = ''
//            break;
//          case 'user':
//            out.header['Authorization'] = 'Basic ' + btoa(arg)
//            state = ''
//            break;
//          case 'method':
//            out.method = arg
//            state = ''
//            break;
//          case 'cookie':
//            out.header['Set-Cookie'] = arg
//            state = ''
//            break;
//        }
//        break;
//    }
//  })
//
//  return out
//}
//
//exports.toCurlString=function (request,platform) {
//        platform = platform || "win";// (os.platform().startsWith('win') ? 'win' : 'posix');
//
//        var command = ['curl'],
//        ignoredHeaders = ['host', 'method', 'path', 'scheme', 'version'],
//        escapeString = platform === 'win' ? escapeStringWindows : escapeStringPosix,
//        requestMethod = 'GET',
//        data = [],
//        requestHeaders = request.headers,
//        requestBody = request.payload||'',//parseRequestBody(request.body||{}).toString(),
//        contentType = requestHeaders['content-type'];
//
////    command.push(escapeString(request.url.format({
////            protocol: this.agent.protocol,
////            port: this.agent.port,
////            host: requestHeaders.host
////        }) + this.path).replace(/[[{}\]]/g, "\\$&")
////    );
//        if (request.url) {
//            command.push(''+request.url+'');
//        }
//
//    if (requestBody !== '') {
//        ignoredHeaders.push('content-length');
//        requestMethod = 'POST';
//
//        if (contentType && contentType.startsWith('application/x-www-form-urlencoded')) {
//            data.push('--data');
//        } else {
//            data.push('--data-binary');
//        }
//
//        //data.push(escapeString(requestBody));
//        //requestBody
//        data.push('\''+JSON.stringify(requestBody)+'\'');
//        
//    }
//
//    if (request.method !== requestMethod) {
//        command.push('-X');
//        command.push(request.method);
//    }
//
//    Object.keys(requestHeaders)
//          .filter(name => ignoredHeaders.indexOf(name) === -1)
//          .forEach(function (name) {
//               command.push('-H');
//               command.push(escapeString(name.replace(/^:/, '') + ': ' + requestHeaders[name]));
//           });
//
//    command = command.concat(data);
//    command.push('--compressed');
//
////    if (process.env.NODE_TLS_REJECT_UNAUTHORIZED == '0') {
////        command.push('--insecure');
////    }
//
//    return command.join(' ');
//}
//
//
//function parseRequestBody(request) {
//    
//    var parser = new HTTPParser(HTTPParser.REQUEST);
//
//    parser.body = '';
//    parser.bodyStart = 0;
//
//    parser[HTTPParser.kOnBody | 0] = function (b, start) {
//        if (!parser.bodyStart) {
//            parser.bodyStart = start;
//        }
//
//        parser.body = b;
//    };
//
//    if (typeof request === 'string') {
//        request = Buffer(request);
//    }
//
//    parser.execute(request, 0, request.length);
//
//    return parser.body.slice(parser.bodyStart);
//}
//
//function escapeStringWindows(str) {
//    return "\"" + str.replace(/"/g, "\"\"")
//                     .replace(/%/g, "\"%\"")
//                     .replace(/\\/g, "\\\\")
//                     .replace(/[\r\n]+/g, "\"^$&\"") + "\"";
//}
//
//function escapeStringPosix(str) {
//    function escapeCharacter(x) {
//        var code = x.charCodeAt(0);
//        if (code < 256) {
//            // Add leading zero when needed to not care about the next character.
//            return code < 16 ? "\\x0" + code.toString(16) : "\\x" + code.toString(16);
//        }
//        code = code.toString(16);
//        return "\\u" + ("0000" + code).substr(code.length, 4);
//    }
//
//    if (/[^\x20-\x7E]|\'/.test(str)) {
//        // Use ANSI-C quoting syntax.
//        return "$\'" + str.replace(/\\/g, "\\\\")
//                          .replace(/\'/g, "\\\'")
//                          .replace(/\n/g, "\\n")
//                          .replace(/\r/g, "\\r")
//                          .replace(/[^\x20-\x7E]/g, escapeCharacter) + "'";
//    } else {
//        // Use single quote syntax.
//        return "'" + str + "'";
//    }
//}
///**
// * Rewrite args for special cases such as -XPUT.
// */
//
//function rewrite(args) {
//  return args.reduce(function(args, a){
//    if (0 == a.indexOf('-X')) {
//      args.push('-X')
//      args.push(a.slice(2))
//    } else {
//      args.push(a)
//    }
//
//    return args
//  }, [])
//}
//
///**
// * Parse header field.
// */
//
//function parseField(s) {
//  return s.split(/: */)
//}
//
///**
// * Check if `s` looks like a url.
// */
//
//function isURL(s) {
//  // TODO: others at some point
//  return /^https?:\/\//.test(s)
//}
//
//})();