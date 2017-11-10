import marked from 'marked';
import indent from 'indent';
import hljs from 'highlight.js';
import { compiler } from 'vueify';

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
  var relative = !/^(https?:)?\/\//.test(href);
  var out = "<a href=\"" + href + "\"";

  if (relative === false) {
    out += " target=\"blank\"";
  }

  if (title) {
    out += " title=\"" + title + "\"";
  }

  out += ">" + text + "</a>";

  return out
};

function camelCase (str) {
  return str.replace(/[_.-](\w|$)/g, function (_, x) { return x.toUpperCase(); })
}

var addESLint = function (code) { return ("/* eslint-disable */\n" + code + "\n"); };

var wrapCSSText = function (css) { return css ? ("\n<style>\n" + css + "\n</style>\n") : ''; };

var wrapScript = function (ref) {
  var code = ref.code; if ( code === void 0 ) code = '';
  var names = ref.names; if ( names === void 0 ) names = '';
  var documentInfo = ref.documentInfo; if ( documentInfo === void 0 ) documentInfo = {};

  if (typeof documentInfo !== 'object') {
    var msg = '`documentInfo` is not an object';
    console.warn(msg);
    throw msg
  }

  var injection = Object.keys(documentInfo).map(function (key) {
    var val = documentInfo[key];

    if (typeof val === 'function') {
      val = val.toString();
      // short style: `a(){}`
      if (/^function /.test(val) === false) {
        val = 'function ' + val;
      }
    } else {
      val = JSON.stringify(val);
    }

    return ("  " + key + ": " + val)
  });

  return ("\n<script>\n" + code + "\nmodule.exports = {\n" + (injection.join(',\n')) + "\n}\nmodule.exports.components = {\n" + (indent(names, 2)) + "\n}\n</script>")
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

  return ("module.exports = (function (module) {\n" + compiled + "\n  var exports = module.exports\n  exports.name = \"" + componentName + "\"\n  exports.methods = {\n    beforeCreate: function () {\n      const css = \"" + (css.replace(/\n/g, ' ')) + "\"\n      if (css) {\n        this._ic_ = insert(css)\n      }\n    },\n    destroyed: function () {\n      this._ic_ && this._ic_()\n    }\n  }\n  module.exports.install = function (Vue) {\n    Vue.component(exports.name, exports)\n  }\n  if (typeof window !== void 0 && window.Vue) {\n    Vue.use(exports )\n  }\n  return module.exports;\n\n  function insert(css) {\n    var elem = document.createElement('style')\n    elem.setAttribute('type', 'text/css')\n\n    if ('textContent' in elem) {\n      elem.textContent = css\n    } else {\n      elem.styleSheet.cssText = css\n    }\n\n    document.getElementsByTagName('head')[0].appendChild(elem)\n    return function () {\n      document.getElementsByTagName('head')[0].removeChild(elem)\n    }\n  }\n  })({});\n")
};

var wrapHljsCode = function (code, lang) { return ("<pre v-pre class=\"lang-" + lang + "\"><code>" + code + "</code></pre>"); };

var renderer = getRenderer();
var FIX_VUE = /<span class="hljs-tag">&lt;\/</g;
var FIXTURE = '<span class="hljs-tag"><span>&lt;</span>/<';
var fix = function (code) { return code.replace(FIX_VUE, FIXTURE); };

var transform = function (source, config) {
  var id = 0;
  var demos = [];
  renderer.code = code;

  var markup = marked(source, { renderer: renderer });

  return { demos: demos, markup: markup }

  function code (raw, language) {
    var lang = language === 'vue' ? 'html' : language;
    var markup = hljs.highlight(lang, raw).value;
    var result = wrapHljsCode(fix(markup), lang);

    // TODO: 优化判断条件
    if (lang !== 'html') {
      return result
    }

    var tag = "md2vuedemo" + ((id++).toString(36));
    var ref = extractMdCode(raw);
    var style = ref.style;
    var script = ref.script;
    var template = ref.template;

    var vue = "<template lang=\"html\">\n  <div class=\"vue-demo\">\n" + (indent(template, '    ')) + "\n  </div>\n</template>\n<script lang=\"buble\">\n" + script + "\n</script>";

    if (style !== '') {
      vue = "<style scoped>" + style + "</style>\n" + vue;
    }

    demos.push({ tag: tag, raw: raw, vue: vue });

    var customMarkups = '';

    if (typeof config.customMarkups === 'function') {
      customMarkups = config.customMarkups() || '';
    } else if (config.customMarkups === 'string') {
      customMarkups = config.customMarkups || '';
    }

    return ("\n<div class=\"vue-demo-block\">\n<" + tag + "></" + tag + ">\n" + customMarkups + "\n" + result + "\n</div>\n")
  }
};

compiler.applyConfig({
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

compiler.compilePromise = function (content, filePath) {
  if ( content === void 0 ) content = '';
  if ( filePath === void 0 ) filePath = '';

  return new Promise(function (resolve, reject) {
    compiler.compile(content, filePath, function (err, result) {
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
  target: 'vue'
};

var index = function (source, opts) {
  if ( opts === void 0 ) opts = {};

  var config = Object.assign({}, defaults, opts);
  var documentInfo = config.documentInfo;
  var target = config.target;
  var componentName = config.componentName;

  var ref = transform(source, config);
  var markup = ref.markup;
  var demos = ref.demos;
  var bundler = StyleBundler.from(compiler);
  var tasks = demos.map(function (ref, index) {
      var tag = ref.tag;
      var raw = ref.raw;
      var vue = ref.vue;

      return compiler
      .compilePromise(vue, tag)
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
        Promise.resolve({ code: code, names: names, documentInfo: documentInfo }),
        bundler.pipe()
      ])
    })
    .then(function (ref) {
      var obj = ref[0];
      var css = ref[1];

      var content = [
        wrapCSSText(css),
        wrapMarkup(markup),
        wrapScript(obj)
      ].join('\n');

      if (!target || target === 'vue') {
        return content
      }

      if (!componentName) {
        throw new Error('[Error] `componentName` must be specified!')
      }

      return compiler
        .compilePromise(content, componentName)
        .then(function (compiled) { return wrapModule({
          componentName: componentName,
          compiled: compiled,
          css: css
        }); })
    })
};

export default index;
