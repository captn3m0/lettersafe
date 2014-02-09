
jade = (function(exports){
/*!
 * Jade - runtime
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Lame Array.isArray() polyfill for now.
 */

if (!Array.isArray) {
  Array.isArray = function(arr){
    return '[object Array]' == Object.prototype.toString.call(arr);
  };
}

/**
 * Lame Object.keys() polyfill for now.
 */

if (!Object.keys) {
  Object.keys = function(obj){
    var arr = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        arr.push(key);
      }
    }
    return arr;
  }
}

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = function merge(a, b) {
  var ac = a['class'];
  var bc = b['class'];

  if (ac || bc) {
    ac = ac || [];
    bc = bc || [];
    if (!Array.isArray(ac)) ac = [ac];
    if (!Array.isArray(bc)) bc = [bc];
    ac = ac.filter(nulls);
    bc = bc.filter(nulls);
    a['class'] = ac.concat(bc).join(' ');
  }

  for (var key in b) {
    if (key != 'class') {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Filter null `val`s.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function nulls(val) {
  return val != null;
}

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} escaped
 * @return {String}
 * @api private
 */

exports.attrs = function attrs(obj, escaped){
  var buf = []
    , terse = obj.terse;

  delete obj.terse;
  var keys = Object.keys(obj)
    , len = keys.length;

  if (len) {
    buf.push('');
    for (var i = 0; i < len; ++i) {
      var key = keys[i]
        , val = obj[key];

      if ('boolean' == typeof val || null == val) {
        if (val) {
          terse
            ? buf.push(key)
            : buf.push(key + '="' + key + '"');
        }
      } else if (0 == key.indexOf('data') && 'string' != typeof val) {
        buf.push(key + "='" + JSON.stringify(val) + "'");
      } else if ('class' == key && Array.isArray(val)) {
        buf.push(key + '="' + exports.escape(val.join(' ')) + '"');
      } else if (escaped && escaped[key]) {
        buf.push(key + '="' + exports.escape(val) + '"');
      } else {
        buf.push(key + '="' + val + '"');
      }
    }
  }

  return buf.join(' ');
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function escape(html){
  return String(html)
    .replace(/&(?!(\w+|\#\d+);)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

/**
 * Re-throw the given `err` in context to the
 * the jade in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

exports.rethrow = function rethrow(err, filename, lineno){
  if (!filename) throw err;

  var context = 3
    , str = require('fs').readFileSync(filename, 'utf8')
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Jade') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};

  return exports;

})({});

jade.templates = {};
jade.render = function(node, template, data) {
  var tmp = jade.templates[template](data);
  node.innerHTML = tmp;
};

jade.templates["compose"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="row row-padded"><div role="form" class="form"><div class="form-group"><label for="toaddress">To: </label><input id="toaddress" type="email" name="toaddress" placeholder="Reciepient\'s Email" class="form-control"/></div><div class="form-group"><label for="tosubject">Subject:  </label><input id="tosubject" type="text" name="tosubject" placeholder="Subject" class="form-control"/></div><br/><div class="form-group"><textarea id="text" placeholder="Enter your message here" class="form-control"></textarea></div><br/><br/><div class="form-group"><button class="btn btn-info do-sendmail">Send</button></div></div></div>');
}
return buf.join("");
}
jade.templates["email-item"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="email-inner clearfix"><div class="user-picture"><img');
buf.push(attrs({ 'src':('' + (picture) + ''), 'title':('' + (name) + '') }, {"src":true,"title":true}));
buf.push('/></div><div class="user-info"><span class="sender">' + escape((interp = name) == null ? '' : interp) + '</span>');
 var shortMessage = message.substr(0, 100)
buf.push('<p class="short-message">' + escape((interp = shortMessage) == null ? '' : interp) + '</p><p class="message hidden">' + escape((interp = message) == null ? '' : interp) + '</p></div></div>');
}
return buf.join("");
}
jade.templates["header"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="mainLogo do-showMenu"><div class="brand"><i class="fa fa-envelope fa-fw"></i></div><span class="name panel-name">Inbox</span></div><ul class="settings-menu list-unstyled list-inline"><li class="do-renderInbox"><i class="fa fa-fw fa-arrow-left"></i></li></ul>');
}
return buf.join("");
}
jade.templates["home"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="row loginbox"><div class="col-md-6 col-md-offset-3"><div class="row"><h1 class="text-center">LetterSafe.in</h1></div><div class="row"><div role="form" class="form"><div class="form-group"><label for="username">Username</label><input id="username" type="text" name="username" placeholder="Enter username" class="form-control"/></div><div class="form-group"><label for="password">Password</label><input id="password" type="password" autocomplete="off" name="password" placeholder="Password" class="form-control"/></div><div class="form-group"><button role="button" class="btn btn-default login-button">Log In</button></div></div></div></div></div>');
}
return buf.join("");
}
jade.templates["inbox"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<ul class="list-unstyled emails-list">	</ul>');
}
return buf.join("");
}
jade.templates["menu-item"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
var _menuItem_mixin = function(_hasDropDown){
var block = this.block, attributes = this.attributes || {}, escaped = this.escaped || {};
if ( _hasDropDown)
{
var className = ('menu-item');
buf.push('<div');
buf.push(attrs({ 'data-toggle':('elium-collapse'), "class": ('' + (className) + '') }, {"class":true,"data-toggle":true}));
buf.push('><span class="icon"><i');
buf.push(attrs({ "class": ('' + (iconClass) + '') }, {"class":true}));
buf.push('></i></span><span class="text">' + escape((interp = name) == null ? '' : interp) + '</span><span class="caret"></span></div>');
}
else
{
var className = ('menu-item');
buf.push('<div');
buf.push(attrs({ "class": ('' + (className) + '') }, {"class":true}));
buf.push('><span class="icon"><i');
buf.push(attrs({ "class": ('' + (iconClass) + '') }, {"class":true}));
buf.push('></i></span><span class="text">' + escape((interp = name) == null ? '' : interp) + '</span></div>');
}
};
if ( hasSubMenu === false)
{
_menuItem_mixin(false);
}
if ( hasSubMenu)
{
_menuItem_mixin(true);
buf.push('<ul class="collapse list-unstyled">');
// iterate subMenuList
;(function(){
  if ('number' == typeof subMenuList.length) {
    for (var $index = 0, $$l = subMenuList.length; $index < $$l; $index++) {
      var menu = subMenuList[$index];

buf.push('<li class="submenu-item"><span class="icon"><i');
buf.push(attrs({ "class": ('' + (menu.iconClass) + '') }, {"class":true}));
buf.push('></i></span><span class="text">' + escape((interp = menu.name) == null ? '' : interp) + '</span></li>');
    }
  } else {
    for (var $index in subMenuList) {
      var menu = subMenuList[$index];

buf.push('<li class="submenu-item"><span class="icon"><i');
buf.push(attrs({ "class": ('' + (menu.iconClass) + '') }, {"class":true}));
buf.push('></i></span><span class="text">' + escape((interp = menu.name) == null ? '' : interp) + '</span></li>');
   }
  }
}).call(this);

buf.push('</ul>');
}
}
return buf.join("");
}
jade.templates["menu"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="menu-header"><div class="do-hideMenu"><i class="fa fa-fw fa-chevron-left"></i></div><span class="menu-title">' + escape((interp = headerTitle) == null ? '' : interp) + '</span></div><ul class="menu-items-list list-unstyled"></ul>');
}
return buf.join("");
}