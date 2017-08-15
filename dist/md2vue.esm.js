import fs from 'fs';
import vueify from 'vueify';
import buble from 'buble';
import marked from 'marked';

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var compiler = createCommonjsModule(function (module) {
var vueCompiler = vueify.compiler;

// Hack: avoid unneccesary vueify code
process.env.NODE_ENV = 'production';

vueCompiler.applyConfig({
  extractCSS: true,
  customCompilers: {
    buble: function buble$$1 (content, cb) {
      var ref = buble.transform(content);
      var code = ref.code;
      cb(null, code.trim());
    }
  }
});

vueCompiler.compilePromise = function (content, filePath) {
  return new Promise(function (resolve, reject) {
    vueCompiler.compile(content, filePath, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  })
};

module.exports = vueCompiler;
});

var extract = createCommonjsModule(function (module) {
var reStyle = /<style>([\s\S]+)<\/style>/;
var reScript = /<script>([\s\S]+)<\/script>/;
var reTemplate = /<template>([\s\S]+)<\/template>/;

module.exports = function (code) {
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
});

var toVue = createCommonjsModule(function (module) {
var renderer = new marked.Renderer();

module.exports = function (source) {
  var id = 0;
  var demos = [];

  renderer.code = function (code) {
    var tag = "VueDemo" + (id++);
    var ref = extract(code);
    var style = ref.style;
    var script = ref.script;
    var template = ref.template;

    var vueComponent = "<template lang=\"html\">\n  <div class=\"code\">\n    " + template + "\n  </div>\n</template>\n<script lang=\"buble\">\n" + script + "\n</script>";

    if (style !== '') {
      vueComponent += "<style scoped>" + style + "</style>";
    }

    demos.push({
      tag: tag,
      raw: code,
      vue: vueComponent
    });

    return ("<" + tag + "></" + tag + ">")
  };

  return {
    demos: demos,
    result: marked(source, { renderer: renderer })
  }
};
});

var wrapESLint = function (code) { return ("/* eslint-disable */\n" + code + "\n/* eslint-enable */"); };

var util = {
	wrapESLint: wrapESLint
};

var StyleBundler = function StyleBundler () {
  this._css = '';
  this._handler = this._handler.bind(this);
};

StyleBundler.prototype._handler = function _handler (ref) {
    var style = ref.style;

  this._css += style;
};

StyleBundler.prototype.from = function from (emitter, type) {
    var this$1 = this;

  if (typeof this._remove === 'function') {
    this._remove();
  }

  emitter.on(type, this._handler);

  this._remove = function () {
    emitter.removeListener(type, this$1._handler);
    this$1._css = '';
  };
};

StyleBundler.prototype.pipe = function pipe (fn) {
  var css = this._css;
  fn(css);
  this._remove();
  return Promise.resolve()
};

StyleBundler.from = function (emitter, type) {
  var bundler = new StyleBundler();
  bundler.from(emitter, type);
  return bundler
};

var styleBundler = StyleBundler;

var index = createCommonjsModule(function (module) {
var wrapESLint = util.wrapESLint;


var source = fs.readFileSync('./test/test.md').toString();
var bundler = styleBundler.from(compiler, 'style');
var ref = toVue(source);
var result = ref.result;
var demos = ref.demos;
var vueOutput = "<template>\n  <div class=\"doc-wrapper\">\n    " + result + "\n  </div>\n</template>";

var tasks = demos.map(function (ref) {
    var tag = ref.tag;
    var raw = ref.raw;
    var vue = ref.vue;

    return compiler
    .compilePromise(vue)
    .then(function (res) { return ("const " + tag + " = (function (module) {" + res + ";return module.exports;})({ });"); });
}
);

Promise.all(tasks)
  .then(function (rets) { return wrapESLint(rets.join('\n')); })
  .then(function (code) {
    var comps = demos.map(function (ref) {
      var tag = ref.tag;

      return tag;
    }).join(', ');
    vueOutput += "<script>" + code + "; export default { components: { " + comps + " } }</script>";
  })
  .then(function () {
    return bundler.pipe(function (css) {
      vueOutput += "<style>" + css + "</style>";
    })
  })
  .then(function () {
    fs.writeFileSync('./test.vue', vueOutput, 'utf-8');
  });
});

export default index;
