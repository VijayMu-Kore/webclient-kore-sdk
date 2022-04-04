/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */
define("ace/theme/clouds_white",["require","exports","module","ace/lib/dom"], function(require, exports, module) {

exports.isDark = true;
exports.cssClass = "ace-clouds-midnight";
exports.cssText = ".ace-clouds-midnight .ace_gutter {\
background: #eee;\
color: #929292\
}\
.ace-clouds-midnight .ace_print-margin {\
width: 1px;\
background: #232323\
}\
.ace-clouds-midnight {\
background-color: #fff;\
color: #929292\
}\
.ace-clouds-midnight .ace_cursor {\
color: #7DA5DC\
}\
.ace-clouds-midnight .ace_marker-layer .ace_selection {\
background: #000000\
}\
.ace-clouds-midnight.ace_multiselect .ace_selection.ace_start {\
box-shadow: 0 0 3px 0px #fff;\
}\
.ace-clouds-midnight .ace_marker-layer .ace_step {\
background: rgb(102, 82, 0)\
}\
.ace-clouds-midnight .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid #BFBFBF\
}\
.ace-clouds-midnight .ace_marker-layer .ace_active-line {\
background: rgba(215, 215, 215, 0.031)\
}\
.ace-clouds-midnight .ace_gutter-active-line {\
background-color: rgba(215, 215, 215, 0.031)\
}\
.ace-clouds-midnight .ace_marker-layer .ace_selected-word {\
border: 1px solid #000000\
}\
.ace-clouds-midnight .ace_invisible {\
color: #666\
}\
.ace-clouds-midnight .ace_keyword,\
.ace-clouds-midnight .ace_meta,\
.ace-clouds-midnight .ace_support.ace_constant.ace_property-value {\
color: #927C5D\
}\
.ace-clouds-midnight .ace_keyword.ace_operator {\
color: #4B4B4B\
}\
.ace-clouds-midnight .ace_keyword.ace_other.ace_unit {\
color: #366F1A\
}\
.ace-clouds-midnight .ace_constant.ace_language {\
color: #39946A\
}\
.ace-clouds-midnight .ace_constant.ace_numeric {\
color: #46A609\
}\
.ace-clouds-midnight .ace_constant.ace_character.ace_entity {\
color: #A165AC\
}\
.ace-clouds-midnight .ace_invalid {\
color: #FFFFFF;\
background-color: #E92E2E\
}\
.ace-clouds-midnight .ace_fold {\
background-color: #927C5D;\
border-color: #929292\
}\
.ace-clouds-midnight .ace_storage,\
.ace-clouds-midnight .ace_support.ace_class,\
.ace-clouds-midnight .ace_support.ace_function,\
.ace-clouds-midnight .ace_support.ace_other,\
.ace-clouds-midnight .ace_support.ace_type {\
color: #E92E2E\
}\
.ace-clouds-midnight .ace_string {\
color: #589b49\
}\
.ace-clouds-midnight .ace_variable {\
color: #222\
}\
.ace-clouds-midnight .ace_comment {\
color: #3C403B\
}\
.ace-clouds-midnight .ace_entity.ace_name.ace_tag,\
.ace-clouds-midnight .ace_entity.ace_other.ace_attribute-name {\
color: #606060\
}";

// \
// .ace-clouds-midnight .ace_indent-guide {\
// background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWNgYGBgYHB3d/8PAAOIAdULw8qMAAAAAElFTkSuQmCC) right repeat-y\
// }";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
});


ace.define('ace/theme/jsoneditor', ['require', 'exports', 'module', 'ace/lib/dom'], function(acequire, exports, module) {

exports.isDark = false;
exports.cssClass = "ace-jsoneditor";
exports.cssText = ".ace-jsoneditor .ace_gutter {\
background: #ebebeb;\
color: #333\
}\
\
.ace-jsoneditor.ace_editor {\
font-family: droid sans mono, consolas, monospace, courier new, courier, sans-serif;\
line-height: 1.3;\
}\
.ace-jsoneditor .ace_print-margin {\
width: 1px;\
background: #e8e8e8\
}\
.ace-jsoneditor .ace_scroller {\
background-color: #FFFFFF\
}\
.ace-jsoneditor .ace_text-layer {\
color: gray\
}\
.ace-jsoneditor .ace_variable {\
color: #1a1a1a\
}\
.ace-jsoneditor .ace_cursor {\
border-left: 2px solid #000000\
}\
.ace-jsoneditor .ace_overwrite-cursors .ace_cursor {\
border-left: 0px;\
border-bottom: 1px solid #000000\
}\
.ace-jsoneditor .ace_marker-layer .ace_selection {\
background: #D5DDF6\
}\
.ace-jsoneditor.ace_multiselect .ace_selection.ace_start {\
box-shadow: 0 0 3px 0px #FFFFFF;\
border-radius: 2px\
}\
.ace-jsoneditor .ace_marker-layer .ace_step {\
background: rgb(255, 255, 0)\
}\
.ace-jsoneditor .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid #BFBFBF\
}\
.ace-jsoneditor .ace_marker-layer .ace_active-line {\
background: #FFFBD1\
}\
.ace-jsoneditor .ace_gutter-active-line {\
background-color : #dcdcdc\
}\
.ace-jsoneditor .ace_marker-layer .ace_selected-word {\
border: 1px solid #D5DDF6\
}\
.ace-jsoneditor .ace_invisible {\
color: #BFBFBF\
}\
.ace-jsoneditor .ace_keyword,\
.ace-jsoneditor .ace_meta,\
.ace-jsoneditor .ace_support.ace_constant.ace_property-value {\
color: #AF956F\
}\
.ace-jsoneditor .ace_keyword.ace_operator {\
color: #484848\
}\
.ace-jsoneditor .ace_keyword.ace_other.ace_unit {\
color: #96DC5F\
}\
.ace-jsoneditor .ace_constant.ace_language {\
color: darkorange\
}\
.ace-jsoneditor .ace_constant.ace_numeric {\
color: red\
}\
.ace-jsoneditor .ace_constant.ace_character.ace_entity {\
color: #BF78CC\
}\
.ace-jsoneditor .ace_invalid {\
color: #FFFFFF;\
background-color: #FF002A;\
}\
.ace-jsoneditor .ace_fold {\
background-color: #AF956F;\
border-color: #000000\
}\
.ace-jsoneditor .ace_storage,\
.ace-jsoneditor .ace_support.ace_class,\
.ace-jsoneditor .ace_support.ace_function,\
.ace-jsoneditor .ace_support.ace_other,\
.ace-jsoneditor .ace_support.ace_type {\
color: #C52727\
}\
.ace-jsoneditor .ace_string {\
color: green\
}\
.ace-jsoneditor .ace_comment {\
color: #BCC8BA\
}\
.ace-jsoneditor .ace_entity.ace_name.ace_tag,\
.ace-jsoneditor .ace_entity.ace_other.ace_attribute-name {\
color: #606060\
}\
.ace-jsoneditor .ace_markup.ace_underline {\
text-decoration: underline\
}\
.ace-jsoneditor .ace_indent-guide {\
background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==\") right repeat-y\
}";

var dom = acequire("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
});
