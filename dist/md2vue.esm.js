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

var getRenderer = function (Renderer) {
  var renderer = new marked.Renderer();
  renderer.heading = heading;
  return renderer
};

function heading (text, l) {
  return ("<h" + l + ">" + text + "</h" + l + ">")
}

marked.setOptions({
  highlight: function (code, lang, callback) {
    console.log(hljs);
    // return hanabi(code)
  }
});

var addESLint = function (code) { return code ? ("/* eslint-disable */\n" + code + "\n/* eslint-enable */") : ''; };

var wrapCSSText = function (css) { return css ? ("\n<style>\n" + css + "\n</style>\n") : ''; };

var wrapScript = function (ref) {
  var code = ref.code;
  var names = ref.names;

  return code ? ("\n<script>\n" + (indent(code, '  ')) + "\n  export default {\n    components: { " + names + " }\n  }\n</script>") : '';
};

var wrapMarkup = function (markup) { return ("<template>\n  <article class=\"markdown-body\">\n" + (indent(markup, '    ')) + "\n  </article >\n</template>"); };

var wrapVueCompiled = function (ref) {
  var tagName = ref.tagName;
  var compiled = ref.compiled;

  return ("const " + tagName + " = (function (module) {\n" + (indent(compiled, '  ')) + "\n  return module.exports;\n})({});\n")
};

var wrapHljsCode = function (code, lang) { return ("\n<pre v-pre class=\"lang-" + lang + "\"><code>\n" + (indent(code, '  ')) + "\n</code></pre>\n"); };

var renderer = getRenderer();
var FIX_VUE = /<span class="hljs-tag">&lt;\/</g;
var FIXTURE = '<span class="hljs-tag"><span>&lt;</span>/<';
var fix = function (code) { return code.replace(FIX_VUE, FIXTURE); };

var tranform = function (source) {
  var id = 0;
  var demos = [];
  renderer.code = function (code, language) {
    var lang = language === 'vue' ? 'html' : language;
    var markup = hljs.highlight(lang, code).value;
    var result = wrapHljsCode(fix(markup), lang);

    if (lang !== 'html') {
      return result
    }

    var tag = "VueDemo" + (id++);
    var ref = extractMdCode(code);
    var style = ref.style;
    var script = ref.script;
    var template = ref.template;

    var vueComponent = "<template lang=\"html\">\n  <div class=\"code\">\n" + (indent(template, '    ')) + "\n  </div>\n</template>\n<script lang=\"buble\">\n" + script + "\n</script>";

    if (style !== '') {
      vueComponent += "\n<style scoped>" + style + "</style>";
    }

    demos.push({
      tag: tag,
      raw: code,
      vue: vueComponent
    });

    return ("\n<" + tag + "></" + tag + ">\n" + result + "\n")
  };

  return {
    demos: demos,
    markup: marked(source, { renderer: renderer })
  }
};

// Hack: avoid unneccesary vueify code
process.env.__NODE_ENV = process.env.NODE_ENV;
process.env.NODE_ENV = 'production';

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

var index = function (source) {
  // todo
  var ref = tranform(source);
  var markup = ref.markup;
  var demos = ref.demos;
  var bundler = StyleBundler.from(compiler);

  var tasks = demos.map(function (ref) {
      var tag = ref.tag;
      var raw = ref.raw;
      var vue = ref.vue;

      return compiler
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

        return tag;
      }).join(', ');
      return Promise.all([
        Promise.resolve({ code: code, names: names }),
        bundler.pipe()
      ])
    })
    .then(function (ref) {
      var ref_0 = ref[0];
      var code = ref_0.code;
      var names = ref_0.names;
      var css = ref[1];

      var content = [
        wrapMarkup(markup),
        wrapScript({ code: code, names: names }),
        wrapCSSText(css)
      ].join('\n');

      return content
    })
};

export default index;
