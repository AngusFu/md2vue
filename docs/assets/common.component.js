var __proxy = {};
(function () {
  var _$1 = this;

  var _S = function () {
    return {
      count: 0
    };
  };

  var _T = function (delta) {
    this.count += delta;
  };

  var _U = function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "vue-demo"
    }, [_c('div', {
      staticClass: "wrapper"
    }, [_c('button', {
      on: {
        "click": function ($event) {
          _vm.incr(-1);
        }
      }
    }, [_vm._v("-")]), _c('input', {
      attrs: {
        "type": "text",
        "readonly": "readonly"
      },
      domProps: {
        "value": _vm.count
      }
    }), _c('button', {
      on: {
        "click": function ($event) {
          _vm.incr(+1);
        }
      }
    }, [_vm._v("+")])])]);
  };

  var _V = function () {
    alert('clicked!');
  };

  var _W = function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "vue-demo"
    }, [_c('button', {
      on: {
        "click": _vm.click
      }
    }, [_vm._v("click me!")])]);
  };

  var _X = function () {
    alert('clicked!');
  };

  var _Y = function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "vue-demo"
    }, [_c('button', {
      on: {
        "click": _vm.click
      }
    }, [_vm._v("click me!")])]);
  };

  var _P = function () {
    return {
      title: 'foo'
    };
  };

  var _Q = function (el) {
    console.log(el);
  };

  var _Z = function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('article', {
      staticClass: "markdown-body"
    }, [_vm._m(0), _vm._v(" "), _c('h2', [_vm._v("说明")]), _vm._v(" "), _vm._m(1), _vm._v(" "), _vm._m(2), _vm._v(" "), _c('h2', [_vm._v("devDependencies")]), _vm._v(" "), _vm._m(3), _vm._v(" "), _c('h2', [_vm._v("Typography & UI")]), _vm._v(" "), _vm._m(4), _vm._v(" "), _c('h2', [_vm._v("使用")]), _vm._v(" "), _c('p', [_vm._v("API 相当简单。直接看代码即可：")]), _vm._v(" "), _vm._m(5), _vm._v(" "), _c('h2', [_vm._v("配置字段")]), _vm._v(" "), _vm._m(6), _vm._v(" "), _vm._m(7), _vm._v(" "), _vm._m(8), _vm._v(" "), _vm._m(9), _vm._v(" "), _vm._m(10), _vm._v(" "), _vm._m(11), _vm._v(" "), _vm._m(12), _vm._v(" "), _vm._m(13), _vm._v(" "), _c('p', [_vm._v("使用何种工具进行代码高亮处理。")]), _vm._v(" "), _vm._m(14), _vm._v(" "), _vm._m(15), _vm._v(" "), _vm._m(16), _vm._v(" "), _c('p', [_vm._v("字符串或函数。将会插入到文档的可运行 demo 与源码之间。")]), _vm._v(" "), _vm._m(17), _vm._v(" "), _c('p', [_vm._v("其他可以提供给 Vue 文档的内容，请传入 Plain Object。 下面的例子就插入了一个生命周期函数：")]), _vm._v(" "), _vm._m(18), _vm._v(" "), _vm._m(19), _vm._v(" "), _c('p', [_vm._v("从 v4.0 开始，md2vue 采用 remark 作为 markdown 转换工具。")]), _vm._v(" "), _vm._m(20), _vm._v(" "), _c('h2', [_vm._v("说明")]), _vm._v(" "), _vm._m(21), _vm._v(" "), _c('h2', [_vm._v("演示")]), _vm._v(" "), _c('p', [_vm._v("下面的代码将会渲染出可以运行的 demo：（当然，前提是你必须自行安装 stylus 和 pug 依赖）")]), _vm._v(" "), _c('div', {
      staticClass: "vue-demo-block"
    }, [_c('md2vuedemo0'), _vm._v(" "), _c('input', {
      attrs: {
        "id": "vue-demo-1335",
        "type": "checkbox"
      }
    }), _c('label', {
      attrs: {
        "for": "vue-demo-1335"
      }
    }), _vm._v(" "), _vm._m(22)], 1), _vm._v(" "), _vm._m(23), _vm._v(" "), _c('div', {
      staticClass: "vue-demo-block"
    }, [_c('md2vuedemo1'), _vm._v(" "), _c('input', {
      attrs: {
        "id": "vue-demo-1336",
        "type": "checkbox"
      }
    }), _c('label', {
      attrs: {
        "for": "vue-demo-1336"
      }
    }), _vm._v(" "), _vm._m(24)], 1), _vm._v(" "), _c('p', [_vm._v("问题来了，假如我真的只是想在页面中插入一个可交互的 tiny app，而不想展示源码，该怎么办？")]), _vm._v(" "), _vm._m(25), _vm._v(" "), _vm._m(26), _vm._v(" "), _c('p', [_vm._v("效果如下：")]), _vm._v(" "), _c('div', {
      staticClass: "vue-demo-block vue-demo-block-demo-only"
    }, [_c('md2vuedemo2')], 1)]);
  };

  var _a = function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('h1', [_c('a', {
      attrs: {
        "href": "https://github.com/AngusFu/md2vue",
        "target": "_blank"
      }
    }, [_vm._v("md2vue")])]);
  };

  var _b = function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('p', [_vm._v("最初灵感来自 "), _c('a', {
      attrs: {
        "href": "https://nuxtjs.org"
      }
    }, [_vm._v("nuxt")]), _vm._v("。")]);
  };

  var _d = function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('blockquote', [_c('p', [_vm._v("Markdown is a lightweight markup language with plain text formatting syntax. It is designed so that it can be converted to HTML and many other formats using a tool by the same name. —— "), _c('a', {
      attrs: {
        "href": "https://en.wikipedia.org/wiki/Markdown",
        "target": "_blank"
      }
    }, [_vm._v("wikipedia")])])]);
  };

  var _e = function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('ul', [_c('li', [_c('a', {
      attrs: {
        "href": "/remarkjs/remark"
      }
    }, [_vm._v("remark")]), _vm._v(": Remark is an ecosystem of plugins for processing markdown.")]), _vm._v(" "), _c('li', [_c('a', {
      attrs: {
        "href": "https://github.com/isagalaev/highlight.js",
        "target": "_blank"
      }
    }, [_vm._v("highlight.js")]), _vm._v(": Javascript syntax highlighter.")]), _vm._v(" "), _c('li', [_c('a', {
      attrs: {
        "href": "https://github.com/PrismJS/prism",
        "target": "_blank"
      }
    }, [_vm._v("prism")]), _vm._v(": Javascript syntax highlighter.")]), _vm._v(" "), _c('li', [_c('a', {
      attrs: {
        "href": "https://github.com/vuejs/vueify",
        "target": "_blank"
      }
    }, [_vm._v("vueify")]), _vm._v(": Browserify transform for single-file Vue components")]), _vm._v(" "), _c('li', [_c('a', {
      attrs: {
        "href": "https://github.com/rollup/rollup",
        "target": "_blank"
      }
    }, [_vm._v("rollup")]), _vm._v(": Next-generation ES6 module bundler.")]), _vm._v(" "), _c('li', [_c('a', {
      attrs: {
        "href": "https://buble.surge.sh/",
        "target": "_blank"
      }
    }, [_vm._v("buble")]), _vm._v(": The blazing fast, batteries-included ES2015 compiler.")])]);
  };

  var _f = function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('ul', [_c('li', [_c('a', {
      attrs: {
        "href": "https://github.com/sindresorhus/github-markdown-css",
        "target": "_blank"
      }
    }, [_vm._v("github-markdown-css")]), _vm._v(": The minimal amount of CSS to replicate the GitHub Markdown style.")]), _vm._v(" "), _c('li', [_c('a', {
      attrs: {
        "href": "https://github.com/isagalaev/highlight.js",
        "target": "_blank"
      }
    }, [_vm._v("highlight.js")]), _vm._v(": Code highlighting.")]), _vm._v(" "), _c('li', [_c('a', {
      attrs: {
        "href": "https://github.com/PrismJS/prism",
        "target": "_blank"
      }
    }, [_vm._v("prism")]), _vm._v(": Code highlighting.")])]);
  };

  var _g = function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('pre', {
      pre: true,
      attrs: {
        "class": "lang-javascript"
      }
    }, [_c('code', [_c('span', {
      attrs: {
        "class": "token keyword"
      }
    }, [_vm._v("import")]), _vm._v(" md2vue "), _c('span', {
      attrs: {
        "class": "token keyword"
      }
    }, [_vm._v("from")]), _vm._v(" "), _c('span', {
      attrs: {
        "class": "token string"
      }
    }, [_vm._v("'md2vue'")]), _vm._v("\n\n"), _c('span', {
      attrs: {
        "class": "token comment"
      }
    }, [_vm._v("// markdown 文本")]), _vm._v("\n"), _c('span', {
      attrs: {
        "class": "token keyword"
      }
    }, [_vm._v("const")]), _vm._v(" markdownText "), _c('span', {
      attrs: {
        "class": "token operator"
      }
    }, [_vm._v("=")]), _vm._v(" "), _c('span', {
      attrs: {
        "class": "token template-string"
      }
    }, [_c('span', {
      attrs: {
        "class": "token string"
      }
    }, [_vm._v("`...`")])]), _vm._v("\n\n"), _c('span', {
      attrs: {
        "class": "token comment"
      }
    }, [_vm._v("// 配置")]), _vm._v("\n"), _c('span', {
      attrs: {
        "class": "token keyword"
      }
    }, [_vm._v("const")]), _vm._v(" config "), _c('span', {
      attrs: {
        "class": "token operator"
      }
    }, [_vm._v("=")]), _vm._v(" "), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("{")]), _vm._v("\n  target"), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(":")]), _vm._v(" "), _c('span', {
      attrs: {
        "class": "token string"
      }
    }, [_vm._v("'js'")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(",")]), _vm._v("\n  name"), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(":")]), _vm._v(" "), _c('span', {
      attrs: {
        "class": "token string"
      }
    }, [_vm._v("'common-comp'")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(",")]), _vm._v("\n  highlight"), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(":")]), _vm._v(" "), _c('span', {
      attrs: {
        "class": "token string"
      }
    }, [_vm._v("'prism'")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(",")]), _vm._v("\n  inject"), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(",")]), _vm._v("\n  extend\n"), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("}")]), _vm._v("\n\n"), _c('span', {
      attrs: {
        "class": "token comment"
      }
    }, [_vm._v("// 返回 promise")]), _vm._v("\n"), _c('span', {
      attrs: {
        "class": "token keyword"
      }
    }, [_vm._v("const")]), _vm._v(" content "), _c('span', {
      attrs: {
        "class": "token operator"
      }
    }, [_vm._v("=")]), _vm._v(" "), _c('span', {
      attrs: {
        "class": "token keyword"
      }
    }, [_vm._v("await")]), _vm._v(" "), _c('span', {
      attrs: {
        "class": "token function"
      }
    }, [_vm._v("md2vue")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("(")]), _vm._v("markdownText"), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(",")]), _vm._v(" config"), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(")")])])]);
  };

  var _i = function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('h4', [_c('code', [_vm._v("config.target")])]);
  };

  var _j = function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('p', [_vm._v("字符串。可选址值为 "), _c('code', [_vm._v("vue")]), _vm._v(" "), _c('code', [_vm._v("js")]), _vm._v("。默认为 "), _c('code', [_vm._v("vue")]), _vm._v("。")]);
  };

  var _k = function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('p', [_vm._v("使用 "), _c('code', [_vm._v("vue")]), _vm._v(" 时，生成结果是一个 SFC（single file component）。这种情况下，你可以将内容写入到一个 "), _c('code', [_vm._v(".vue")]), _vm._v(" 文件中。")]);
  };

  var _l = function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('p', [_vm._v("使用 "), _c('code', [_vm._v("js")]), _vm._v(" 时，则会进一步将 SFC 编译为 JavaScript。你可以将结果写到一个 "), _c('code', [_vm._v(".js")]), _vm._v(" 文件中，并像下面这样引用：")]);
  };

  var _n = function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('pre', {
      pre: true,
      attrs: {
        "class": "lang-javascript"
      }
    }, [_c('code', [_c('span', {
      attrs: {
        "class": "token keyword"
      }
    }, [_vm._v("const")]), _vm._v(" MyComponent "), _c('span', {
      attrs: {
        "class": "token operator"
      }
    }, [_vm._v("=")]), _vm._v(" "), _c('span', {
      attrs: {
        "class": "token function"
      }
    }, [_vm._v("require")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("(")]), _c('span', {
      attrs: {
        "class": "token string"
      }
    }, [_vm._v("'my-component.js'")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(")")]), _vm._v("\n\nVue"), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(".")]), _c('span', {
      attrs: {
        "class": "token function"
      }
    }, [_vm._v("use")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("(")]), _vm._v("MyComponent"), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(")")]), _vm._v("\n\n"), _c('span', {
      attrs: {
        "class": "token keyword"
      }
    }, [_vm._v("new")]), _vm._v(" "), _c('span', {
      attrs: {
        "class": "token class-name"
      }
    }, [_vm._v("Vue")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("(")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("{")]), _vm._v("\n  el"), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(":")]), _vm._v(" "), _c('span', {
      attrs: {
        "class": "token string"
      }
    }, [_vm._v("'#app'")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(",")]), _vm._v("\n  template"), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(":")]), _vm._v(" "), _c('span', {
      attrs: {
        "class": "token string"
      }
    }, [_vm._v("'<common-comp />'")]), _vm._v("\n"), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("}")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(")")])])]);
  };

  var _o = function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('h4', [_c('code', [_vm._v("config.name")])]);
  };

  var _p = function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('p', [_vm._v("字符串类型。注意，当 target 字段为 "), _c('code', [_vm._v("js")]), _vm._v(" 时，必须配置此字段，表示 Vue 组件名称。")]);
  };

  var _q = function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('h4', [_c('code', [_vm._v("config.highlight")])]);
  };

  var _r = function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('p', [_vm._v("可选值 "), _c('code', [_vm._v("highlight.js")]), _vm._v(" "), _c('code', [_vm._v("prism")]), _vm._v("。默认为 "), _c('code', [_vm._v("highlight.js")]), _vm._v("。")]);
  };

  var _s = function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('p', [_vm._v("当然，也可以传入一个函数，该函数接收两个参数："), _c('code', [_vm._v("code")]), _vm._v(", "), _c('code', [_vm._v("language")])]);
  };

  var _t = function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('h4', [_c('code', [_vm._v("config.inject")])]);
  };

  var _u = function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('h4', [_c('code', [_vm._v("config.extend")])]);
  };

  var _w = function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('pre', {
      pre: true,
      attrs: {
        "class": "lang-javascript"
      }
    }, [_c('code', [_vm._v("extend"), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(":")]), _vm._v(" "), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("{")]), _vm._v("\n  "), _c('span', {
      attrs: {
        "class": "token function"
      }
    }, [_vm._v("created")]), _vm._v(" "), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("(")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(")")]), _vm._v(" "), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("{")]), _vm._v("\n    console"), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(".")]), _c('span', {
      attrs: {
        "class": "token function"
      }
    }, [_vm._v("log")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("(")]), _c('span', {
      attrs: {
        "class": "token string"
      }
    }, [_vm._v("'created...'")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(")")]), _vm._v("\n  "), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("}")]), _vm._v("\n"), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("}")])])]);
  };

  var _x = function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('h4', [_c('code', [_vm._v("config.remarkPlugins")])]);
  };

  var _y = function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('p', [_c('code', [_vm._v("config.remarkPlugins")]), _vm._v(" 为数组，其中每个元素都是一个 remark 插件函数。")]);
  };

  var _z = function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('ol', [_c('li', [_c('p', [_vm._v("所有语言类型设置为 "), _c('code', [_vm._v("html")]), _vm._v(" 的代码块将会被视为可运行的 Vue demo")])]), _vm._v(" "), _c('li', [_c('p', [_vm._v("如果你真的只是需要展示代码，请将语言设置为 "), _c('code', [_vm._v("xml")])])])]);
  };

  var _10 = function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('pre', {
      pre: true,
      attrs: {
        "class": "lang-html"
      }
    }, [_c('code', [_c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("<")]), _vm._v("style")]), _vm._v(" "), _c('span', {
      attrs: {
        "class": "token attr-name"
      }
    }, [_vm._v("lang")]), _c('span', {
      attrs: {
        "class": "token attr-value"
      }
    }, [_c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("=")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("\"")]), _vm._v("stylus"), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("\"")])]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(">")])]), _c('span', {
      attrs: {
        "class": "token style language-css"
      }
    }, [_vm._v("\n.wrapper\n  input\n    "), _c('span', {
      attrs: {
        "class": "token property"
      }
    }, [_vm._v("width")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(":")]), _vm._v(" 50px"), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(";")]), _vm._v("\n    "), _c('span', {
      attrs: {
        "class": "token property"
      }
    }, [_vm._v("text-align")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(":")]), _vm._v(" center"), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(";")]), _vm._v("\n")]), _c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("</")]), _vm._v("style")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(">")])]), _vm._v("\n\n"), _c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("<")]), _vm._v("template")]), _vm._v(" "), _c('span', {
      attrs: {
        "class": "token attr-name"
      }
    }, [_vm._v("lang")]), _c('span', {
      attrs: {
        "class": "token attr-value"
      }
    }, [_c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("=")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("\"")]), _vm._v("pug"), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("\"")])]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(">")])]), _vm._v("\n.wrapper\n  button(@click=\"incr(-1)\") -\n  input(type=\"text\", readonly, :value=\"count\")\n  button(@click=\"incr(+1)\") +\n"), _c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("</")]), _vm._v("template")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(">")])]), _vm._v("\n\n"), _c('span', {
      attrs: {
        "class": "token comment"
      }
    }, [_vm._v("<!--默认使用 buble 编译 JS-->")]), _vm._v("\n"), _c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("<")]), _vm._v("script")]), _vm._v(" "), _c('span', {
      attrs: {
        "class": "token attr-name"
      }
    }, [_vm._v("lang")]), _c('span', {
      attrs: {
        "class": "token attr-value"
      }
    }, [_c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("=")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("\"")]), _vm._v("buble"), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("\"")])]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(">")])]), _c('span', {
      attrs: {
        "class": "token script language-javascript"
      }
    }, [_vm._v("\n"), _c('span', {
      attrs: {
        "class": "token keyword"
      }
    }, [_vm._v("export")]), _vm._v(" "), _c('span', {
      attrs: {
        "class": "token keyword"
      }
    }, [_vm._v("default")]), _vm._v(" "), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("{")]), _vm._v("\n  "), _c('span', {
      attrs: {
        "class": "token function"
      }
    }, [_vm._v("data")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("(")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(")")]), _vm._v(" "), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("{")]), _vm._v("\n    "), _c('span', {
      attrs: {
        "class": "token keyword"
      }
    }, [_vm._v("return")]), _vm._v(" "), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("{")]), _vm._v("\n      count"), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(":")]), _vm._v(" "), _c('span', {
      attrs: {
        "class": "token number"
      }
    }, [_vm._v("0")]), _vm._v("\n    "), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("}")]), _vm._v("\n  "), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("}")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(",")]), _vm._v("\n  methods"), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(":")]), _vm._v(" "), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("{")]), _vm._v("\n    "), _c('span', {
      attrs: {
        "class": "token function"
      }
    }, [_vm._v("incr")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("(")]), _vm._v("delta"), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(")")]), _vm._v(" "), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("{")]), _vm._v("\n      "), _c('span', {
      attrs: {
        "class": "token keyword"
      }
    }, [_vm._v("this")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(".")]), _vm._v("count "), _c('span', {
      attrs: {
        "class": "token operator"
      }
    }, [_vm._v("+=")]), _vm._v(" delta\n    "), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("}")]), _vm._v("\n  "), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("}")]), _vm._v("\n"), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("}")]), _vm._v("\n")]), _c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("</")]), _vm._v("script")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(">")])])])]);
  };

  var _11 = function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('p', [_vm._v("其实也可以偷懒，不写 "), _c('code', [_vm._v("<template>")]), _vm._v(" 也是可以的。（这时候，template 的内容就是去掉 style 和 script 两部分之后剩余的内容。）示例如下：")]);
  };

  var _12 = function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('pre', {
      pre: true,
      attrs: {
        "class": "lang-html"
      }
    }, [_c('code', [_c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("<")]), _vm._v("style")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(">")])]), _c('span', {
      attrs: {
        "class": "token style language-css"
      }
    }, [_vm._v("\n  "), _c('span', {
      attrs: {
        "class": "token selector"
      }
    }, [_vm._v("button")]), _vm._v(" "), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("{")]), _vm._v("\n    "), _c('span', {
      attrs: {
        "class": "token property"
      }
    }, [_vm._v("font-size")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(":")]), _vm._v(" 14px"), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(";")]), _vm._v("\n  "), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("}")]), _vm._v("\n")]), _c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("</")]), _vm._v("style")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(">")])]), _vm._v("\n\n"), _c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("<")]), _vm._v("button")]), _vm._v(" "), _c('span', {
      attrs: {
        "class": "token attr-name"
      }
    }, [_vm._v("@click")]), _c('span', {
      attrs: {
        "class": "token attr-value"
      }
    }, [_c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("=")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("\"")]), _vm._v("click"), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("\"")])]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(">")])]), _vm._v("click me!"), _c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("</")]), _vm._v("button")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(">")])]), _vm._v("\n\n"), _c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("<")]), _vm._v("script")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(">")])]), _c('span', {
      attrs: {
        "class": "token script language-javascript"
      }
    }, [_vm._v("\n  "), _c('span', {
      attrs: {
        "class": "token keyword"
      }
    }, [_vm._v("export")]), _vm._v(" "), _c('span', {
      attrs: {
        "class": "token keyword"
      }
    }, [_vm._v("default")]), _vm._v(" "), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("{")]), _vm._v("\n    methods"), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(":")]), _vm._v(" "), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("{")]), _vm._v("\n      "), _c('span', {
      attrs: {
        "class": "token function"
      }
    }, [_vm._v("click")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("(")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(")")]), _vm._v(" "), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("{")]), _vm._v("\n        "), _c('span', {
      attrs: {
        "class": "token function"
      }
    }, [_vm._v("alert")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("(")]), _c('span', {
      attrs: {
        "class": "token string"
      }
    }, [_vm._v("'clicked!'")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(")")]), _vm._v("\n      "), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("}")]), _vm._v("\n    "), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("}")]), _vm._v("\n  "), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("}")]), _vm._v("\n")]), _c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("</")]), _vm._v("script")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(">")])])])]);
  };

  var _13 = function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('p', [_vm._v("这时候，可以像下面一样，为 "), _c('code', [_vm._v("<template>")]), _vm._v(" 添加一个 "), _c('code', [_vm._v("demo-only")]), _vm._v(" 属性。")]);
  };

  var _14 = function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('pre', {
      pre: true,
      attrs: {
        "class": "lang-xml"
      }
    }, [_c('code', [_c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("<")]), _vm._v("style")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(">")])]), _c('span', {
      attrs: {
        "class": "token style language-css"
      }
    }, [_vm._v("\n  "), _c('span', {
      attrs: {
        "class": "token selector"
      }
    }, [_vm._v("button")]), _vm._v(" "), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("{")]), _vm._v("\n    "), _c('span', {
      attrs: {
        "class": "token property"
      }
    }, [_vm._v("font-size")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(":")]), _vm._v(" 14px"), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(";")]), _vm._v("\n  "), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("}")]), _vm._v("\n")]), _c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("</")]), _vm._v("style")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(">")])]), _vm._v("\n\n"), _c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("<")]), _vm._v("template")]), _vm._v(" "), _c('span', {
      attrs: {
        "class": "token attr-name"
      }
    }, [_vm._v("demo-only")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(">")])]), _vm._v("\n  "), _c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("<")]), _vm._v("button")]), _vm._v(" "), _c('span', {
      attrs: {
        "class": "token attr-name"
      }
    }, [_vm._v("@click")]), _c('span', {
      attrs: {
        "class": "token attr-value"
      }
    }, [_c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("=")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("\"")]), _vm._v("click"), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("\"")])]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(">")])]), _vm._v("click me!"), _c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("</")]), _vm._v("button")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(">")])]), _vm._v("\n"), _c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("</")]), _vm._v("template")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(">")])]), _vm._v("\n\n"), _c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("<")]), _vm._v("script")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(">")])]), _c('span', {
      attrs: {
        "class": "token script language-javascript"
      }
    }, [_vm._v("\n  "), _c('span', {
      attrs: {
        "class": "token keyword"
      }
    }, [_vm._v("export")]), _vm._v(" "), _c('span', {
      attrs: {
        "class": "token keyword"
      }
    }, [_vm._v("default")]), _vm._v(" "), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("{")]), _vm._v("\n    methods"), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(":")]), _vm._v(" "), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("{")]), _vm._v("\n      "), _c('span', {
      attrs: {
        "class": "token function"
      }
    }, [_vm._v("click")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("(")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(")")]), _vm._v(" "), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("{")]), _vm._v("\n        "), _c('span', {
      attrs: {
        "class": "token function"
      }
    }, [_vm._v("alert")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("(")]), _c('span', {
      attrs: {
        "class": "token string"
      }
    }, [_vm._v("'clicked!'")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(")")]), _vm._v("\n      "), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("}")]), _vm._v("\n    "), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("}")]), _vm._v("\n  "), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("}")]), _vm._v("\n")]), _c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token tag"
      }
    }, [_c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v("</")]), _vm._v("script")]), _c('span', {
      attrs: {
        "class": "token punctuation"
      }
    }, [_vm._v(">")])])])]);
  };

  var _17 = function (css) {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    var elem = document.createElement('style');
    elem.setAttribute('type', 'text/css');
    elem.innerHTML = css;
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(elem);
    return function () {
      head.removeChild(elem);
    };
  };

  var _R = function () {
    var css = ".wrapper input[data-v-029571ac] {\n  width: 50px;\n  text-align: center;\n}\nbutton[data-v-029571ad] {\n  font-size: 14px;\n}\nbutton[data-v-029571ae] {\n  font-size: 14px;\n}";
    this.__clean = _17(css);
  };

  var _15 = function () {
    this.__clean();
  };

  var _16 = function (Vue) {
    Vue.component(_3.name, _3);
  };

  var _9 = {
    inserted: _Q
  };
  var _8 = {
    "effect-only": _9
  };
  var _C = {
    incr: _T
  };
  var _D = [];
  var _B = {
    data: _S,
    methods: _C,
    render: _U,
    staticRenderFns: _D,
    _scopeId: "data-v-029571ac"
  };
  var _G = {
    click: _V
  };
  var _H = [];
  var _F = {
    methods: _G,
    render: _W,
    staticRenderFns: _H,
    _scopeId: "data-v-029571ad"
  };
  var _K = {
    click: _X
  };
  var _L = [];
  var _J = {
    methods: _K,
    render: _Y,
    staticRenderFns: _L,
    _scopeId: "data-v-029571ae"
  };
  var _A = {
    md2vuedemo0: _B,
    md2vuedemo1: _F,
    md2vuedemo2: _J
  };
  var _N = [_a, _b, _d, _e, _f, _g, _i, _j, _k, _l, _n, _o, _p, _q, _r, _s, _t, _u, _w, _x, _y, _z, _10, _11, _12, _13, _14];
  var _3 = {
    head: _P,
    layout: "component",
    directives: _8,
    created: _R,
    components: _A,
    render: _Z,
    staticRenderFns: _N,
    name: "my-comp",
    destroyed: _15,
    install: _16
  };
  _$1.MyComp = _3;

}).call(__proxy);

var component = __proxy.MyComp;
typeof exports === 'object' && typeof module !== 'undefined' && (module.exports = component);
typeof window !== void 0 && window.Vue && Vue.use(component);
