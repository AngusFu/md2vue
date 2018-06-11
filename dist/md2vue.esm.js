import marked from 'marked';
import indent from 'indent';
import hljs from 'highlight.js';
import Prism from 'prismjs';
import { compiler } from 'vueify';

var reStyle = /<style>([\s\S]+)<\/style>/;
var reScript = /<script>([\s\S]+)<\/script>/;
var reTemplate = /<template(|\s*[^>]+)>([\s\S]+)<\/template>/;

var extractMdCode = function (code) {
  var styleMatch = reStyle.exec(code);
  var scriptMatch = reScript.exec(code);
  var templateMatch = reTemplate.exec(code);

  var style = styleMatch ? styleMatch[1].trim() : '';
  var script = scriptMatch ? scriptMatch[1].trim() : '';
  var template = templateMatch ? templateMatch[2].trim() : '';
  var templateAttr = templateMatch ? templateMatch[1].trim() : '';

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
    template: template,
    effectOnly: templateAttr.indexOf('demo-only') > -1
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
    out += " target=\"_blank\"";
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

function kebabCase (name) {
  return name
    .replace(/^[A-Z]/, function (m) { return m.toLowerCase(); })
    .replace(
      /([0-9a-zA-Z])[\b\s]*([0-9A-Z])/g,
      function (m, g1, g2) { return (g1 + "-" + (g2.toLowerCase())); }
    )
}

function pascalCase (name) {
  return kebabCase(name)
    .replace(/-([0-9a-zA-Z])/g, function (m, g1) { return g1.toUpperCase(); })
    .replace(/^[a-z]/, function (m) { return m.toUpperCase(); })
}

var addESLint = function (code) { return ("/* eslint-disable */\n" + code + "\n"); };

var wrapCSSText = function (css) { return css.trim() ? ("\n<style>\n" + (css.trim()) + "\n</style>\n") : ''; };

var wrapScript = function (ref) {
  var code = ref.code; if ( code === void 0 ) code = '';
  var names = ref.names; if ( names === void 0 ) names = '';
  var shadow = ref.shadow; if ( shadow === void 0 ) shadow = false;
  var styles = ref.styles; if ( styles === void 0 ) styles = [];
  var documentInfo = ref.documentInfo; if ( documentInfo === void 0 ) documentInfo = {};

  if (typeof documentInfo !== 'object') {
    var msg = '`documentInfo` is not an object';
    console.warn(msg);
    throw msg
  }

  styles = styles
    .map(function (style) { return ("decodeURIComponent(\"" + (encodeURIComponent(style.replace(/\n/g, ' '))) + "\")"); })
    .join('\n, ');

  var shadowComponent = !shadow ? '' : (",\n  'shadow-demo': {\n    props: { name: String, index: Number },\n    render: function (h) { return h('div', { class: 'vue-shadow-demo' }); },\n    mounted: function () {\n      var el = this.$el\n      var name = this.name;\n      var index = this.index;\n      var style = ___styles[index]\n\n      var objectProto = ({}).__proto__;\n      var vueProto = this.__proto__;\n      while (vueProto) {\n        if (vueProto.__proto__ === objectProto) {\n          break\n        }\n        vueProto = vueProto.__proto__;\n      }\n      var Vue = vueProto.constructor;\n      var shadowRoot = el.attachShadow\n        ? el.attachShadow({ mode: 'closed' })\n        : el.createShadowRoot()\n      var styleElem = document.createElement('style');\n      styleElem.setAttribute('type', 'text/css');\n      styleElem.innerHTML = cssReset + style\n\n      shadowRoot.appendChild(styleElem);\n\n      var div = document.createElement('div');\n      shadowRoot.appendChild(div);\n\n      new Vue({\n        components: {\n" + (indent(names, 8)) + "\n        }, \n        render (h) {\n          return h(name)\n        }\n      }).$mount(div)\n    }\n  }\n");
  var cssReset = "\n    .vue-demo {\n      color: initial;\n      margin: initial;\n      padding: initial;\n      box-sizing: initial;\n      border: initial;\n      background: initial;\n      font: initial;\n      word-wrap: initial;\n      word-spacing: initial;\n      word-break: initial;\n      white-space: initial;\n      text-align: initial;\n      text-indent: inherit;\n    }\n";

  return ("\n<script lang=\"buble\">\nvar ___styles = [\n" + styles + "\n];\nvar cssReset = \"" + (cssReset.replace(/\n\s*/g, '')) + "\";\n" + code + "\nvar __exports = " + (toJSON(documentInfo)) + ";\n__exports.components = {\n" + (indent(names, 2)) + shadowComponent + "\n}\nmodule.exports = __exports;\n</script>")
};

var wrapMarkup = function (markup) { return ("<template>\n<article class=\"markdown-body\">\n" + markup + "\n</article >\n</template>"); };

var wrapVueCompiled = function (ref) {
  var tagName = ref.tagName;
  var compiled = ref.compiled;

  return ("var " + (camelCase(tagName)) + " = (function (module) {\n" + compiled + "\n  return module.exports;\n})({});\n")
};

var wrapModule = function (ref) {
  var componentName = ref.componentName;
  var compiled = ref.compiled;
  var css = ref.css;

  componentName = kebabCase(componentName);
  css = encodeURIComponent(css.replace(/\n/g, ' '));
  var cssCode = css.trim() === '' ? '' : ("\n  var insert = function (css) {\n    if (typeof window === 'undefined' || typeof document === 'undefined') return;\n    var elem = document.createElement('style')\n    elem.setAttribute('type', 'text/css')\n    elem.innerHTML = decodeURIComponent(css)\n\n    var head = document.getElementsByTagName('head')[0]\n    head.appendChild(elem)\n    return function () {\n      head.removeChild(elem)\n    }\n  }\n  exports.created = function () {\n    var css = \"" + css + "\"\n    if (css) {\n      this._insertcss = insert(css)\n    }\n  }\n  exports.destroyed = function () {\n    this._insertcss && this._insertcss()\n  }\n");

  return ("/* eslint-disable */\nvar moduleExports = (function (module) {\n  'use strict';\n" + (indent(compiled.replace(/(\/\/\n\s*)+/g, ''), '  ')) + "\n  var exports = module.exports\n  exports.name = \"" + componentName + "\"\n" + cssCode + "\n  module.exports.install = function (Vue) {\n    Vue.component(exports.name, exports)\n  }\n\n  return module.exports;\n})({});\ntypeof exports === 'object' && typeof module !== 'undefined' && (module.exports = moduleExports);\ntypeof window !== void 0 && window.Vue && Vue.use(moduleExports);\nthis[\"" + (pascalCase(componentName)) + "\"] = moduleExports;\n")
};

var wrapHljsCode = function (code, lang) { return ("<pre v-pre class=\"lang-" + lang + "\"><code>" + code + "</code></pre>"); };

function toJSON (obj) {
  if (typeof obj === 'function') {
    // obj = obj.toString().replace(/\n\s*/g, ';')
    // short style: `a(){}`
    if (/^function /.test(obj) === false) {
      obj = 'function ' + obj;
    }

    return obj
  }

  if (obj && typeof obj === 'object') {
    var arr = Object.keys(obj).map(function (key) { return ("\"" + key + "\": " + (toJSON(obj[key]))); });
    return ("{" + (arr.join(',')) + "}")
  }

  return JSON.stringify(obj)
}

/**
 * SEE https://github.com/PrismJS/prism
 * @param {String} code
 * @param {String} lang
 */
var highlightJs = function (code, lang) {
  return hljs.highlight(lang, code).value
};

/**
 * SEE https://github.com/PrismJS/prism
 * @param {String} code
 * @param {String} lang
 */
var prismJs = function (code, lang) {
  if ( lang === void 0 ) lang = 'autoit';

  if (!Prism.languages[lang]) {
    try {
      require(("prismjs/components/prism-" + lang));
    } catch (e) {
      lang = 'autoit';
      require('prismjs/components/prism-autoit');
    }
  }
  return Prism.highlight(code, Prism.languages[lang])
};

global.Prism = Prism;

var highlightMap = {
  'highlight.js': highlightJs,
  prism: prismJs
};

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
    var highlight = config.highlight;
    var shadow = config.shadow;

    var fn = null;

    if (typeof highlight === 'function') {
      fn = highlight;
    } else if (highlightMap[highlight]) {
      fn = highlightMap[highlight];
    } else {
      throw new Error('Invalid highlight option!')
    }

    var lang = language === 'vue' ? 'html' : language;
    var markup = fn(raw, lang);

    // TODO: 优化判断条件
    if (lang !== 'html') {
      return wrapHljsCode(fix(markup), lang)
    }

    var tag = "md2vuedemo" + (id.toString(36));
    var ref = extractMdCode(raw);
    var style = ref.style;
    var script = ref.script;
    var template = ref.template;
    var effectOnly = ref.effectOnly;

    var vue = "<template lang=\"html\">\n  <div class=\"vue-demo\">\n" + (indent(template, '    ')) + "\n  </div>\n</template>\n<script lang=\"buble\">\n" + script + "\n</script>";

    var shadowCss = '';
    if (style !== '') {
      if (shadow === false) {
        vue = "<style scoped>" + style + "</style>\n" + vue;
      } else {
        shadowCss = style;
      }
    }

    demos.push({ tag: tag, raw: raw, vue: vue, shadowCss: shadowCss });

    var customMarkups = '';
    if (typeof config.customMarkups === 'function') {
      customMarkups = config.customMarkups() || '';
    } else if (config.customMarkups === 'string') {
      customMarkups = config.customMarkups || '';
    }

    var demoApp = "<" + tag + " />";

    if (shadow === true) {
      demoApp = "<shadow-demo name=\"" + tag + "\" :index=\"" + id + "\"></shadow-demo>";
    }

    id += 1;

    return ("\n<div class=\"vue-demo-block" + (effectOnly ? ' vue-demo-block-demo-only' : '') + "\">\n" + demoApp + "\n" + (effectOnly ? '' : customMarkups) + "\n" + (effectOnly ? '' : wrapHljsCode(fix(markup), lang)) + "\n</div>\n")
  }
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
  return css
};

StyleBundler.from = function (emitter) {
  var bundler = new StyleBundler();
  bundler.from(emitter, TYPE);
  return bundler
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

var queue = [];
var currentTask = null;

compiler.compilePromise = function (content, filePath) {
  if ( content === void 0 ) content = '';
  if ( filePath === void 0 ) filePath = '';

  var deferred = defer();
  var task = function () {
    currentTask = deferred.promise;

    var bundler = StyleBundler.from(compiler);
    compiler.compile(content, filePath, function (err, result) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve({
          script: result,
          insertCSS: bundler.pipe()
        });
      }
      process.nextTick(function () {
        currentTask = null;
        if (queue.length) {
          queue.shift()();
        }
      });
    });
  };

  if (currentTask) {
    queue.push(task);
  } else {
    task();
  }

  return deferred.promise
};

function defer () {
  var deferred = {};
  var promise = new Promise(function (resolve, reject) {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  deferred.promise = promise;
  return deferred
}

var defaults = {
  shadow: false,
  target: 'vue',
  highlight: 'highlight.js'
};

var index = function (source, opts) {
  if ( opts === void 0 ) opts = {};

  var config = Object.assign({}, defaults, opts);
  var target = config.target;
  var shadow = config.shadow;
  var documentInfo = config.documentInfo;
  var componentName = config.componentName;

  var ref = transform(source, config);
  var markup = ref.markup;
  var demos = ref.demos;
  var tasks = demos.reduce(function (promise, ref, index) {
    var tag = ref.tag;
    var raw = ref.raw;
    var vue = ref.vue;
    var shadowCss = ref.shadowCss;

    return promise.then(function (arr) {
      return compiler.compilePromise(vue, tag)
        .then(function (ref) {
          var script = ref.script;
          var insertCSS = ref.insertCSS;

          return {
            script: wrapVueCompiled({
              tagName: tag,
              shadowCss: shadowCss,
              compiled: script
            }),
            insertCSS: insertCSS
          }
        })
        .then(function (ref) {
          var script = ref.script;
          var insertCSS = ref.insertCSS;

          arr.push({ script: script, shadowCss: shadowCss, insertCSS: insertCSS });
          return arr
        })
    })
  }, Promise.resolve([]));

  return tasks
    .then(function (rets) {
      var code = rets.map(function (item) { return item.script; }).join('\n');
      var styles = rets.map(function (item) { return item.shadowCss; });
      var insertStyles = rets.map(function (item) { return item.insertCSS; }).join('\n');
      return {
        styles: styles,
        code: addESLint(code),
        insertStyles: insertStyles
      }
    })
    .then(function (ref) {
      var code = ref.code;
      var styles = ref.styles;
      var insertStyles = ref.insertStyles;

      var names = demos.map(function (ref) {
        var tag = ref.tag;

        return ("'" + tag + "': " + (camelCase(tag)))
      }).join(',\n');
      return Promise.all([
        Promise.resolve({ code: code, styles: styles, names: names, documentInfo: documentInfo, shadow: shadow }),
        Promise.resolve(insertStyles)
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
        .then(function (ref) {
          var script = ref.script;
          var insertCSS = ref.insertCSS;

          return wrapModule({
          componentName: componentName,
          compiled: script,
          css: insertCSS
        });
      })
    })
};

export default index;
