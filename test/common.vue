module.exports = (function (module) {
;(function(){
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* eslint-disable */
const md2vuedemo0 = (function (module) {
;(function(){
  module.exports = {
  data: function data() {
    return {
      count: 0
    }
  },
  methods: {
    incr: function incr(delta) {
      this.count += delta
    }
  }
}
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vue-demo"},[_c('div',{staticClass:"wrapper"},[_c('button',{on:{"click":function($event){_vm.incr(-1)}}},[_vm._v("-")]),_vm._v(" "),_c('input',{attrs:{"type":"text","readonly":""},domProps:{"value":_vm.count}}),_vm._v(" "),_c('button',{on:{"click":function($event){_vm.incr(+1)}}},[_vm._v("+")])])])}
__vue__options__.staticRenderFns = []
__vue__options__._scopeId = "data-v-bba68bf6"

  return module.exports;
})({});

const md2vuedemo1 = (function (module) {
;(function(){
  module.exports = {
  methods: {
    click: function click() {
      alert('clicked!')
    }
  }
}
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vue-demo"},[_c('button',{on:{"click":_vm.click}},[_vm._v("click")])])}
__vue__options__.staticRenderFns = []

  return module.exports;
})({});

/* eslint-enable */
module.exports = {
  components: {
    'md2vuedemo0': md2vuedemo0,
    'md2vuedemo1': md2vuedemo1
  },

  head () {
    return {
      title: '组件'
    }
  },
  layout: 'component'

}

})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('article',{staticClass:"markdown-body"},[_c('h2',[_vm._v("Introduction to md2vue")]),_vm._m(0),_vm._v(" "),_vm._m(1),_vm._v(" "),_c('h3',[_vm._v("Inspiration")]),_vm._m(2),_vm._v(" "),_c('h3',[_vm._v("Dev Dependencies")]),_vm._m(3),_vm._v(" "),_c('h3',[_vm._v("Typography & UI")]),_vm._m(4),_vm._v(" "),_c('h3',[_vm._v("Demo")]),_c('p',[_vm._v("The following code in vue can be rendered into an real tiny vue app:")]),_vm._v(" "),_c('div',{staticClass:"vue-demo-block"},[_c('md2vuedemo0'),_vm._v(" "),_c('input',{attrs:{"id":"vdMzk4OTYwOTY","type":"checkbox"}}),_c('label',{attrs:{"for":"vdMzk4OTYwOTY"}}),_vm._v(" "),_vm._m(5)],1),_vm._v(" "),_vm._m(6),_vm._v(" "),_c('div',{staticClass:"vue-demo-block"},[_c('md2vuedemo1'),_vm._v(" "),_c('input',{attrs:{"id":"vdNjA2ODYwNTk","type":"checkbox"}}),_c('label',{attrs:{"for":"vdNjA2ODYwNTk"}}),_vm._v(" "),_vm._m(7)],1)])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('p',[_vm._v("You can get raw text of this document "),_c('strong',[_c('a',{attrs:{"href":"/AngusFu/md2vue/blob/master/test/common.md"}},[_vm._v("here")])]),_vm._v(".")])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('blockquote',[_c('p',[_vm._v("Markdown is a lightweight markup language with plain text formatting syntax. It is designed so that it can be converted to HTML and many other formats using a tool by the same name. —— "),_c('a',{attrs:{"href":"https://en.wikipedia.org/wiki/Markdown","target":"blank"}},[_vm._v("wikipedia")])])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('p',[_vm._v("Inspired by "),_c('a',{attrs:{"href":"https://nuxtjs.org"}},[_vm._v("nuxt")]),_vm._v(", "),_c('a',{attrs:{"href":"https://github.com/AngusFu/md2vue","target":"blank"}},[_vm._v("md2vue")]),_vm._v(" was initially aimed at transforming markdown texts in our Vue project, which were used both for documentation and demostration.")])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',[_c('li',[_c('a',{attrs:{"href":"/chjj/marked"}},[_vm._v("marked")]),_vm._v(": A markdown parser and compiler. Built for speed.")]),_vm._v(" "),_c('li',[_c('a',{attrs:{"href":"https://github.com/isagalaev/highlight.js","target":"blank"}},[_vm._v("highlight.js")]),_vm._v(": Javascript syntax highlighter.")]),_vm._v(" "),_c('li',[_c('a',{attrs:{"href":"https://github.com/vuejs/vueify","target":"blank"}},[_vm._v("vueify")]),_vm._v(": Browserify transform for single-file Vue components")]),_vm._v(" "),_c('li',[_c('a',{attrs:{"href":"https://github.com/rollup/rollup","target":"blank"}},[_vm._v("rollup")]),_vm._v(": Next-generation ES6 module bundler.")]),_vm._v(" "),_c('li',[_c('a',{attrs:{"href":"https://buble.surge.sh/","target":"blank"}},[_vm._v("buble")]),_vm._v(": The blazing fast, batteries-included ES2015 compiler.")])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',[_c('li',[_c('a',{attrs:{"href":"https://github.com/sindresorhus/github-markdown-css","target":"blank"}},[_vm._v("github-markdown-css")]),_vm._v(": The minimal amount of CSS to replicate the GitHub Markdown style.")]),_vm._v(" "),_c('li',[_c('a',{attrs:{"href":"https://github.com/isagalaev/highlight.js","target":"blank"}},[_vm._v("highlight.js")]),_vm._v(": Code highlighting.")])])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('pre',{pre:true,attrs:{"class":"lang-html"}},[_c('code',[_c('span',{attrs:{"class":"hljs-tag"}},[_vm._v("<"),_c('span',{attrs:{"class":"hljs-name"}},[_vm._v("style")]),_vm._v(">")]),_c('span',{attrs:{"class":"css"}},[_vm._v("\n"),_c('span',{attrs:{"class":"hljs-selector-class"}},[_vm._v(".wrapper")]),_vm._v(" "),_c('span',{attrs:{"class":"hljs-selector-tag"}},[_vm._v("input")]),_vm._v(" {\n  "),_c('span',{attrs:{"class":"hljs-attribute"}},[_vm._v("width")]),_vm._v(": "),_c('span',{attrs:{"class":"hljs-number"}},[_vm._v("50px")]),_vm._v(";\n  "),_c('span',{attrs:{"class":"hljs-attribute"}},[_vm._v("text-align")]),_vm._v(": center;\n}\n")]),_c('span',{attrs:{"class":"hljs-tag"}},[_c('span',[_vm._v("<")]),_vm._v("/"),_c('span',{attrs:{"class":"hljs-name"}},[_vm._v("style")]),_vm._v(">")]),_vm._v("\n\n"),_c('span',{attrs:{"class":"hljs-tag"}},[_vm._v("<"),_c('span',{attrs:{"class":"hljs-name"}},[_vm._v("template")]),_vm._v(">")]),_vm._v("\n  "),_c('span',{attrs:{"class":"hljs-tag"}},[_vm._v("<"),_c('span',{attrs:{"class":"hljs-name"}},[_vm._v("div")]),_vm._v(" "),_c('span',{attrs:{"class":"hljs-attr"}},[_vm._v("class")]),_vm._v("="),_c('span',{attrs:{"class":"hljs-string"}},[_vm._v("\"wrapper\"")]),_vm._v(">")]),_vm._v("\n    "),_c('span',{attrs:{"class":"hljs-tag"}},[_vm._v("<"),_c('span',{attrs:{"class":"hljs-name"}},[_vm._v("button")]),_vm._v(" @"),_c('span',{attrs:{"class":"hljs-attr"}},[_vm._v("click")]),_vm._v("="),_c('span',{attrs:{"class":"hljs-string"}},[_vm._v("\"incr(-1)\"")]),_vm._v(">")]),_vm._v("-"),_c('span',{attrs:{"class":"hljs-tag"}},[_c('span',[_vm._v("<")]),_vm._v("/"),_c('span',{attrs:{"class":"hljs-name"}},[_vm._v("button")]),_vm._v(">")]),_vm._v("\n    "),_c('span',{attrs:{"class":"hljs-tag"}},[_vm._v("<"),_c('span',{attrs:{"class":"hljs-name"}},[_vm._v("input")]),_vm._v(" "),_c('span',{attrs:{"class":"hljs-attr"}},[_vm._v("type")]),_vm._v("="),_c('span',{attrs:{"class":"hljs-string"}},[_vm._v("\"text\"")]),_vm._v(" "),_c('span',{attrs:{"class":"hljs-attr"}},[_vm._v("readonly")]),_vm._v(" "),_c('span',{attrs:{"class":"hljs-attr"}},[_vm._v(":value")]),_vm._v("="),_c('span',{attrs:{"class":"hljs-string"}},[_vm._v("\"count\"")]),_vm._v(">")]),_vm._v("\n    "),_c('span',{attrs:{"class":"hljs-tag"}},[_vm._v("<"),_c('span',{attrs:{"class":"hljs-name"}},[_vm._v("button")]),_vm._v(" @"),_c('span',{attrs:{"class":"hljs-attr"}},[_vm._v("click")]),_vm._v("="),_c('span',{attrs:{"class":"hljs-string"}},[_vm._v("\"incr(+1)\"")]),_vm._v(">")]),_vm._v("+"),_c('span',{attrs:{"class":"hljs-tag"}},[_c('span',[_vm._v("<")]),_vm._v("/"),_c('span',{attrs:{"class":"hljs-name"}},[_vm._v("button")]),_vm._v(">")]),_vm._v("\n  "),_c('span',{attrs:{"class":"hljs-tag"}},[_c('span',[_vm._v("<")]),_vm._v("/"),_c('span',{attrs:{"class":"hljs-name"}},[_vm._v("div")]),_vm._v(">")]),_vm._v("\n"),_c('span',{attrs:{"class":"hljs-tag"}},[_c('span',[_vm._v("<")]),_vm._v("/"),_c('span',{attrs:{"class":"hljs-name"}},[_vm._v("template")]),_vm._v(">")]),_vm._v("\n\n"),_c('span',{attrs:{"class":"hljs-tag"}},[_vm._v("<"),_c('span',{attrs:{"class":"hljs-name"}},[_vm._v("script")]),_vm._v(">")]),_c('span',{attrs:{"class":"javascript"}},[_vm._v("\n"),_c('span',{attrs:{"class":"hljs-keyword"}},[_vm._v("export")]),_vm._v(" "),_c('span',{attrs:{"class":"hljs-keyword"}},[_vm._v("default")]),_vm._v(" {\n  data() {\n    "),_c('span',{attrs:{"class":"hljs-keyword"}},[_vm._v("return")]),_vm._v(" {\n      "),_c('span',{attrs:{"class":"hljs-attr"}},[_vm._v("count")]),_vm._v(": "),_c('span',{attrs:{"class":"hljs-number"}},[_vm._v("0")]),_vm._v("\n    }\n  },\n  "),_c('span',{attrs:{"class":"hljs-attr"}},[_vm._v("methods")]),_vm._v(": {\n    incr(delta) {\n      "),_c('span',{attrs:{"class":"hljs-keyword"}},[_vm._v("this")]),_vm._v(".count += delta\n    }\n  }\n}\n")]),_c('span',{attrs:{"class":"hljs-tag"}},[_c('span',[_vm._v("<")]),_vm._v("/"),_c('span',{attrs:{"class":"hljs-name"}},[_vm._v("script")]),_vm._v(">")])]),_vm._v("\n")])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('p',[_vm._v("You can also leave out "),_c('code',[_vm._v("<template>")]),_vm._v(" tags, just like this:")])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('pre',{pre:true,attrs:{"class":"lang-html"}},[_c('code',[_c('span',{attrs:{"class":"hljs-tag"}},[_vm._v("<"),_c('span',{attrs:{"class":"hljs-name"}},[_vm._v("button")]),_vm._v(" @"),_c('span',{attrs:{"class":"hljs-attr"}},[_vm._v("click")]),_vm._v("="),_c('span',{attrs:{"class":"hljs-string"}},[_vm._v("\"click\"")]),_vm._v(">")]),_vm._v("click"),_c('span',{attrs:{"class":"hljs-tag"}},[_c('span',[_vm._v("<")]),_vm._v("/"),_c('span',{attrs:{"class":"hljs-name"}},[_vm._v("button")]),_vm._v(">")]),_vm._v("\n\n"),_c('span',{attrs:{"class":"hljs-tag"}},[_vm._v("<"),_c('span',{attrs:{"class":"hljs-name"}},[_vm._v("script")]),_vm._v(">")]),_c('span',{attrs:{"class":"javascript"}},[_vm._v("\n"),_c('span',{attrs:{"class":"hljs-keyword"}},[_vm._v("export")]),_vm._v(" "),_c('span',{attrs:{"class":"hljs-keyword"}},[_vm._v("default")]),_vm._v(" {\n  "),_c('span',{attrs:{"class":"hljs-attr"}},[_vm._v("methods")]),_vm._v(": {\n    click() {\n      alert("),_c('span',{attrs:{"class":"hljs-string"}},[_vm._v("'clicked!'")]),_vm._v(")\n    }\n  }\n}\n")]),_c('span',{attrs:{"class":"hljs-tag"}},[_c('span',[_vm._v("<")]),_vm._v("/"),_c('span',{attrs:{"class":"hljs-name"}},[_vm._v("script")]),_vm._v(">")])]),_vm._v("\n")])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-bba68bf6", __vue__options__)
  } else {
    hotAPI.reload("data-v-bba68bf6", __vue__options__)
  }
})()}
  var exports = module.exports
  exports.name = "xxxxxx"
  exports.methods = {
    beforeCreate: function () {
      this._ic_ = insert(".wrapper input[data-v-bba68bf6]{width:50px;text-align:center} .wrapper input[data-v-bba68bf6]{width:50px;text-align:center}")
    },
    destroyed: function () {
      this._ic_ && this._ic_()
    }
  }
  module.exports.install = function (Vue) {
    Vue.component(exports.name, exports)
  }
  if (typeof window !== void 0 && window.Vue) {
    Vue.use(exports )
  }
  return module.exports;

  function insert(css) {
    var elem = document.createElement('style')
    elem.setAttribute('type', 'text/css')

    if ('textContent' in elem) {
      elem.textContent = css
    } else {
      elem.styleSheet.cssText = css
    }

    document.getElementsByTagName('head')[0].appendChild(elem)
    return function () {
      document.getElementsByTagName('head')[0].removeChild(elem)
    }
  }
  })({});
