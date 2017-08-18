'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var marked = _interopDefault(require('marked'));
var indent = _interopDefault(require('indent'));
var hljs = _interopDefault(require('highlight.js'));
var vueify = require('vueify');

var reStyle = /<style>([\s\S]+)<\/style>/;
var reScript = /<script>([\s\S]+)<\/script>/;
var reTemplate = /<template>([\s\S]+)<\/template>/;

var extractMdCode = function (code) {
  var styleMatch = reStyle.exec(code);
  var scriptMatch = reScript.exec(code);
  var templateMatch = reTemplate.exec(code);

  var style = styleMatch ? styleMatch[1].trim() : '';
  var script = scriptMatch ? scriptMatch[1].trim() : '';
  var template = templateMatch ? templateMatch[1].trim() : '';

  // case where `<template>` absent
  if (template === '') {
    template = code.replace(reStyle, '').replace(reScript, '');
  }

  if (script === '') {
    script = 'module.exports = {}';
  } else {
    script = script.replace(/export\s+default/, 'module.exports =');
  }

  return {
    style: style,
    script: script,
    template: template
  }
};

var Renderer = marked.Renderer;

var getRenderer = function () {
  return new Renderer()
};

Renderer.prototype.heading = function (text, l) {
  return ("<h" + l + ">" + text + "</h" + l + ">")
};

Renderer.prototype.link = function (href, title, text) {
  var relative = !/^(https?\:)?\/\//.test(href);
  var out = "<a href=\"" + href + "\"";

  if (relative === false) {
    out += " target=\"blank\"";
  }

  if (title) {
    out += " title=\"" + title + "\"";
  }

  out += ">" + text + "</a>";

  return out;
};

function camelCase (str) {
  return str.replace(/[_.-](\w|$)/g, function (_,x) {
    return x.toUpperCase()
  })
}

var addESLint = function (code) { return code ? ("/* eslint-disable */\n" + code + "\n/* eslint-enable */") : ''; };

var wrapCSSText = function (css) { return css ? ("\n<style>\n" + css + "\n</style>\n") : ''; };

var wrapScript = function (ref) {
  var code = ref.code; if ( code === void 0 ) code = '';
  var names = ref.names; if ( names === void 0 ) names = '';
  var vueInjection = ref.vueInjection; if ( vueInjection === void 0 ) vueInjection = '';

  if (!code) {
    return ''
  }

  if (typeof vueInjection !== 'string') {
    var msg = '`vueInjection` is not a string';
    console.warn(msg);
    throw msg
  }

  var result = indent(code, 2);
  var injection = indent(vueInjection, 4);
  return ("\n<script>\n" + result + "\n  module.exports = {\n    components: {\n" + (indent(names, 6)) + "\n    }" + (vueInjection ? ',' : '') + "\n" + injection + "\n  }\n</script>")
};

var wrapMarkup = function (markup) { return ("<template>\n<article class=\"markdown-body\">\n" + markup + "\n</article >\n</template>"); };

var wrapVueCompiled = function (ref) {
  var tagName = ref.tagName;
  var compiled = ref.compiled;

  return ("const " + (camelCase(tagName)) + " = (function (module) {\n" + compiled + "\n  return module.exports;\n})({});\n")
};

var wrapModule = function (ref) {
  var componentName = ref.componentName;
  var compiled = ref.compiled;
  var css = ref.css;

  return ("module.exports = (function (module) {\n" + compiled + "\n  var exports = module.exports\n  exports.name = \"" + componentName + "\"\n  exports.methods = {\n    beforeCreate: function () {\n      this._ic_ = insert(\"" + (css.replace(/\n/g, ' ')) + "\")\n    },\n    destroyed: function () {\n      this._ic_ && this._ic_()\n    }\n  }\n  module.exports.install = function (Vue) {\n    Vue.component(exports.name, exports)\n  }\n  if (typeof window !== void 0 && window.Vue) {\n    Vue.use(exports )\n  }\n  return module.exports;\n\n  function insert(css) {\n    var elem = document.createElement('style')\n    elem.setAttribute('type', 'text/css')\n\n    if ('textContent' in elem) {\n      elem.textContent = css\n    } else {\n      elem.styleSheet.cssText = css\n    }\n\n    document.getElementsByTagName('head')[0].appendChild(elem)\n    return function () {\n      document.getElementsByTagName('head')[0].removeChild(elem)\n    }\n  }\n  })({});\n")
};

var wrapHljsCode = function (code, lang) { return ("<pre v-pre class=\"lang-" + lang + "\">\n<code>" + code + "</code>\n</pre>"); };

var renderer = getRenderer();
var FIX_VUE = /<span class="hljs-tag">&lt;\/</g;
var FIXTURE = '<span class="hljs-tag"><span>&lt;</span>/<';
var fix = function (code) { return code.replace(FIX_VUE, FIXTURE); };

var tranform = function (source, config) {
  var id = 0;
  var demos = [];

  var toggleCode = config.toggleCode;

  renderer.code = function (code, language) {
    var lang = language === 'vue' ? 'html' : language;
    var markup = hljs.highlight(lang, code).value;
    var result = wrapHljsCode(fix(markup), lang);

    // TODO: 优化判断条件
    if (lang !== 'html') {
      return result
    }

    var tag = "md2vuedemo" + ((id++).toString(36));
    var ref = extractMdCode(code);
    var style = ref.style;
    var script = ref.script;
    var template = ref.template;

    var vueComponent = "<template lang=\"html\">\n  <div class=\"vue-demo\">\n" + (indent(template, '    ')) + "\n  </div>\n</template>\n<script lang=\"buble\">\n" + script + "\n</script>";

    if (style !== '') {
      vueComponent += "\n<style scoped>" + style + "</style>";
    }

    demos.push({
      tag: tag,
      raw: code,
      vue: vueComponent
    });

    var ctrl = '';

    if (toggleCode) {
      var rand = 1e8 * Math.random() | 0;
      var uid = 'vd' + Buffer.from(("" + rand)).toString('base64').replace(/=/g, '');
      ctrl = "<input id=\"" + uid + "\" type=\"checkbox\" /><label for=\"" + uid + "\"></label>";
    }
    return ("\n<div class=\"vue-demo-block\">\n<" + tag + "></" + tag + ">\n" + ctrl + "\n" + result + "\n</div>\n")
  };

  return {
    demos: demos,
    markup: marked(source, { renderer: renderer })
  }
};

// Hack: avoid unneccesary vueify code
process.env.__NODE_ENV = process.env.NODE_ENV;
process.env.NODE_ENV = 'production';

vueify.compiler.applyConfig({
  extractCSS: true,
  customCompilers: {
    buble: function buble (content, cb) {
      var ref = require('buble').transform(content);
      var code = ref.code;
      var ret = code
        .replace(/\n{2,}/g, '\n')
        .replace(/^\s+/, '  ')
        .replace(/\s+$/, '');

      cb(null, ret);
    }
  }
});

vueify.compiler.compilePromise = function (content, filePath) {
  if ( content === void 0 ) content = '';
  if ( filePath === void 0 ) filePath = '';

  return new Promise(function (resolve, reject) {
    vueify.compiler.compile(content, filePath, function (err, result) {
      process.env.NODE_ENV = process.env.__NODE_ENV;

      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  })
};

var TYPE = 'style';

var StyleBundler = function StyleBundler () {
  this._css = '';
  this._handler = this._handler.bind(this);
};

StyleBundler.prototype._handler = function _handler (ref) {
    var style = ref.style;

  this._css += '\n' + style;
};

StyleBundler.prototype.from = function from (emitter) {
    var this$1 = this;

  if (typeof this._remove === 'function') {
    this._remove();
  }

  emitter.on(TYPE, this._handler);

  this._remove = function () {
    emitter.removeListener(TYPE, this$1._handler);
    this$1._css = '';
  };
};

StyleBundler.prototype.pipe = function pipe (fn) {
  var css = this._css.trim();
  if (typeof fn === 'function') {
    fn(css);
  }
  this._remove();
  return Promise.resolve(css)
};

StyleBundler.from = function (emitter) {
  var bundler = new StyleBundler();
  bundler.from(emitter, TYPE);
  return bundler
};

var defaults = {
  toggleCode: true,
  vueInjection: '',
  target: 'vue'
};

var index = function (source, opts) {
  if ( opts === void 0 ) opts = {};

  var config = Object.assign({}, defaults, opts);
  var vueInjection = config.vueInjection;
  var target = config.target;
  var componentName = config.componentName;

  var ref = tranform(source, config);
  var markup = ref.markup;
  var demos = ref.demos;
  var bundler = StyleBundler.from(vueify.compiler);
  var tasks = demos.map(function (ref) {
      var tag = ref.tag;
      var raw = ref.raw;
      var vue = ref.vue;

      return vueify.compiler
      .compilePromise(vue)
      .then(function (compiled) { return wrapVueCompiled({
        tagName: tag,
        compiled: compiled
      }); });
  }
  );

  return Promise.all(tasks)
    .then(function (rets) { return addESLint(rets.join('\n')); })
    .then(function (code) {
      var names = demos.map(function (ref) {
        var tag = ref.tag;

        return ("'" + tag + "': " + (camelCase(tag)))
      }).join(',\n');
      return Promise.all([
        Promise.resolve({ code: code, names: names, vueInjection: vueInjection }),
        bundler.pipe()
      ])
    })
    .then(function (ref) {
      var obj = ref[0];
      var css = ref[1];

      var content = [
        wrapMarkup(markup),
        wrapScript(obj),
        wrapCSSText(css)
      ].join('\n');

      if (!target || target === 'vue') {
        return content
      }

      if (!componentName) {
        throw '[Error] `componentName` must be specified!'
      }
      console.log(target, componentName);

      return vueify.compiler
        .compilePromise(content)
        .then(function (compiled) { return wrapModule({
          componentName: componentName,
          compiled: compiled,
          css: css
        }); })
    })
};

module.exports = index;
