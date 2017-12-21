
<template>
<article class="markdown-body">
<h1>Introduction to md2vue</h1><p>You can get raw text of this document <strong><a href="/AngusFu/md2vue/blob/master/test/common.md">here</a></strong>.</p>
<blockquote>
<p>Markdown is a lightweight markup language with plain text formatting syntax. It is designed so that it can be converted to HTML and many other formats using a tool by the same name. —— <a href="https://en.wikipedia.org/wiki/Markdown" target="_blank">wikipedia</a></p>
</blockquote>
<h2>Inspiration</h2><p>Inspired by <a href="https://nuxtjs.org">nuxt</a>, <a href="https://github.com/AngusFu/md2vue" target="_blank">md2vue</a> was initially aimed at transforming markdown texts in our Vue project, which were used both for documentation and demostration.</p>
<h2>Dev Dependencies</h2><ul>
<li><a href="/chjj/marked">marked</a>: A markdown parser and compiler. Built for speed.</li>
<li><a href="https://github.com/isagalaev/highlight.js" target="_blank">highlight.js</a>: Javascript syntax highlighter.</li>
<li><a href="https://github.com/PrismJS/prism" target="_blank">prism</a>: Javascript syntax highlighter.</li>
<li><a href="https://github.com/vuejs/vueify" target="_blank">vueify</a>: Browserify transform for single-file Vue components</li>
<li><a href="https://github.com/rollup/rollup" target="_blank">rollup</a>: Next-generation ES6 module bundler.</li>
<li><a href="https://buble.surge.sh/" target="_blank">buble</a>: The blazing fast, batteries-included ES2015 compiler.</li>
</ul>
<h2>Typography &amp; UI</h2><ul>
<li><a href="https://github.com/sindresorhus/github-markdown-css" target="_blank">github-markdown-css</a>: The minimal amount of CSS to replicate the GitHub Markdown style.</li>
<li><a href="https://github.com/isagalaev/highlight.js" target="_blank">highlight.js</a>: Code highlighting.</li>
<li><a href="https://github.com/PrismJS/prism" target="_blank">prism</a>: Code highlighting.</li>
</ul>
<h2>How to use</h2><p>API is simple, so just see the code below: </p>
<pre v-pre class="lang-js"><code><span class="token keyword">import</span> md2vue <span class="token keyword">from</span> <span class="token string">'md2vue'</span>

<span class="token comment">// your markdown text</span>
<span class="token keyword">const</span> sourceCode <span class="token operator">=</span> <span class="token template-string"><span class="token string">`...`</span></span>

<span class="token comment">// configuration object</span>
<span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
  target<span class="token punctuation">:</span> <span class="token string">'js'</span><span class="token punctuation">,</span>
  componentName<span class="token punctuation">:</span> <span class="token string">'common-comp'</span><span class="token punctuation">,</span>
  highlight<span class="token punctuation">:</span> <span class="token string">'prism'</span><span class="token punctuation">,</span>
  customMarkups<span class="token punctuation">,</span>
  documentInfo
<span class="token punctuation">}</span>

<span class="token comment">// returns a promise</span>
<span class="token comment">// the resolved value would be a string</span>
<span class="token keyword">const</span> content <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">md2vue</span><span class="token punctuation">(</span>sourceCode<span class="token punctuation">,</span> config<span class="token punctuation">)</span></code></pre><h2>Explaination on config object</h2><p>Referring to <a href="./build-doc.js">build-doc.js</a> or <a href="./test/md2vue.spec.js">spec file</a> is suggested.</p>
<h3><code>.target</code>: String</h3><p>Unless you specify this property to <code>js</code>, any other value will be treated as <code>vue</code>.</p>
<p>With this property beening <code>vue</code>, it means you will get .vue styled result. You can write the result to a single file with &quot;.vue&quot; extension for later use.</p>
<p>With this property beening <code>js</code>, you&#39;ll get a precompiled JavaScript result. You can write it to a &quot;.js&quot; file, and then do something like this:</p>
<pre v-pre class="lang-js"><code><span class="token keyword">const</span> MyComponent <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'common-comp.js'</span><span class="token punctuation">)</span>
Vue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>MyComponent<span class="token punctuation">)</span>
<span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  el<span class="token punctuation">:</span> <span class="token string">'#app'</span><span class="token punctuation">,</span>
  template<span class="token punctuation">:</span> <span class="token string">'&lt;common-comp />'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span></code></pre><h3><code>.componentName</code>: String</h3><p>This property is required when the target is &quot;js&quot;.</p>
<h3><code>.highlight</code>: String | Function</h3><p>You can specify this property to &#39;highlight.js&#39; or &#39;prism&#39;.</p>
<p>A function which accepts 2 arguments <code>code</code> and <code>language</code> is also accepted.</p>
<h3><code>.customMarkups</code>: String | Function</h3><p>Some custom markups you want to inject between the App block and source code block.</p>
<h3><code>.documentInfo</code>: Object</h3><p>Any stuff you want to provide for your vue component.</p>
<h2>Demo</h2><p>All code blocks with language specified to <code>html</code> or <code>vue</code> are treated as Vue apps.</p>
<p>But What if you want to demonstrate that code block just for its sake? Simply specify the language to <code>xml</code>.</p>
<p>The following code in vue can be rendered into an real tiny vue app:</p>

<div class="vue-demo-block">
<shadow-demo name="md2vuedemo0" :index="0"></shadow-demo>
<input id="vue-demo-1333" type="checkbox" /><label for="vue-demo-1333"></label>
<pre v-pre class="lang-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style language-css">
  <span class="token selector">.wrapper input</span> <span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 50px<span class="token punctuation">;</span>
    <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>wrapper<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>incr(-1)<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>-<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">readonly</span> <span class="token attr-name">:value</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>count<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>incr(+1)<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>+<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script language-javascript">
  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        count<span class="token punctuation">:</span> <span class="token number">0</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    methods<span class="token punctuation">:</span> <span class="token punctuation">{</span>
      <span class="token function">incr</span><span class="token punctuation">(</span>delta<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>count <span class="token operator">+=</span> delta
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></code></pre>
</div>
<p>You can also leave out <code>&lt;template&gt;</code> tags, just like this:</p>

<div class="vue-demo-block">
<shadow-demo name="md2vuedemo1" :index="1"></shadow-demo>
<input id="vue-demo-1334" type="checkbox" /><label for="vue-demo-1334"></label>
<pre v-pre class="lang-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style language-css">
  <span class="token selector">button</span> <span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>click<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>click me!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script language-javascript">
  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    methods<span class="token punctuation">:</span> <span class="token punctuation">{</span>
      <span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">'clicked!'</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></code></pre>
</div>
<p>What if you only want the app without source code? Follow the code:</p>
<pre v-pre class="lang-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style language-css">
  <span class="token selector">button</span> <span class="token punctuation">{</span>
    <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name">demo-only</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>click<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>click me!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script language-javascript">
  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    methods<span class="token punctuation">:</span> <span class="token punctuation">{</span>
      <span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">'clicked!'</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></code></pre><p>Noticed the difference? Hmm, just wrap your template, append a <code>demo-only</code> attribute to it. So let&#39;s take a look:</p>

<div class="vue-demo-block vue-demo-block-demo-only">
<shadow-demo name="md2vuedemo2" :index="2"></shadow-demo>


</div>
<h2>Test</h2>
<div class="vue-demo-block">
<shadow-demo name="md2vuedemo3" :index="3"></shadow-demo>
<input id="vue-demo-1336" type="checkbox" /><label for="vue-demo-1336"></label>
<pre v-pre class="lang-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>lorem
    xxxxx
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>22222<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script language-javascript">
  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    methods<span class="token punctuation">:</span> <span class="token punctuation">{</span>
      <span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">'clicked!'</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></code></pre>
</div>

</article >
</template>

<script lang="buble">
var ___styles = [
decodeURIComponent(".wrapper%20input%20%7B%20%20%20%20%20width%3A%2050px%3B%20%20%20%20%20text-align%3A%20center%3B%20%20%20%7D")
, decodeURIComponent("button%20%7B%20%20%20%20%20font-size%3A%2014px%3B%20%20%20%7D")
, decodeURIComponent("button%20%7B%20%20%20%20%20font-size%3A%2014px%3B%20%20%20%7D")
, decodeURIComponent("")
];
var cssReset = ".vue-demo {color: initial;margin: initial;padding: initial;box-sizing: initial;border: initial;background: initial;font: initial;word-wrap: initial;word-spacing: initial;word-break: initial;white-space: initial;text-align: initial;text-indent: inherit;}";
/* eslint-disable */
var md2vuedemo0 = (function (module) {
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
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vue-demo"},[_c('div',{staticClass:"wrapper"},[_c('button',{on:{"click":function($event){_vm.incr(-1)}}},[_vm._v("-")]),_vm._v(" "),_c('input',{attrs:{"type":"text","readonly":""},domProps:{"value":_vm.count}}),_vm._v(" "),_c('button',{on:{"click":function($event){_vm.incr(+1)}}},[_vm._v("+")])])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-029571ac", __vue__options__)
  } else {
    hotAPI.reload("data-v-029571ac", __vue__options__)
  }
})()}
  return module.exports;
})({});

var md2vuedemo1 = (function (module) {
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
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vue-demo"},[_c('button',{on:{"click":_vm.click}},[_vm._v("click me!")])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-029571ad", __vue__options__)
  } else {
    hotAPI.reload("data-v-029571ad", __vue__options__)
  }
})()}
  return module.exports;
})({});

var md2vuedemo2 = (function (module) {
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
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vue-demo"},[_c('button',{on:{"click":_vm.click}},[_vm._v("click me!")])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-029571ae", __vue__options__)
  } else {
    hotAPI.reload("data-v-029571ae", __vue__options__)
  }
})()}
  return module.exports;
})({});

var md2vuedemo3 = (function (module) {
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
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vue-demo"},[_c('p',[_vm._v("lorem\n      xxxxx\n    ")]),_vm._v(" "),_c('input',{attrs:{"value":"22222"}})])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-029571af", __vue__options__)
  } else {
    hotAPI.reload("data-v-029571af", __vue__options__)
  }
})()}
  return module.exports;
})({});


var __exports = {"head": function anonymous() {;return { title: 'foo' };},"layout": "component","directives": {"effect-only": {"inserted": function inserted(el) {;console.log(el);}}}};
__exports.components = {
  'md2vuedemo0': md2vuedemo0,
  'md2vuedemo1': md2vuedemo1,
  'md2vuedemo2': md2vuedemo2,
  'md2vuedemo3': md2vuedemo3,
  'shadow-demo': {
    props: { name: String, index: Number },
    render: function (h) { return h('div', { class: 'vue-shadow-demo' }); },
    mounted: function () {
      var el = this.$el
      var name = this.name;
      var index = this.index;
      var style = ___styles[index]

      var objectProto = ({}).__proto__;
      var vueProto = this.__proto__;
      while (vueProto) {
        if (vueProto.__proto__ === objectProto) {
          break
        }
        vueProto = vueProto.__proto__;
      }
      var Vue = vueProto.constructor;
      var shadowRoot = el.attachShadow
        ? el.attachShadow({ mode: 'closed' })
        : el.createShadowRoot()
      var styleElem = document.createElement('style');
      styleElem.setAttribute('type', 'text/css');
      styleElem.innerHTML = cssReset + style

      shadowRoot.appendChild(styleElem);

      var div = document.createElement('div');
      shadowRoot.appendChild(div);

      new Vue({
        components: {
        'md2vuedemo0': md2vuedemo0,
        'md2vuedemo1': md2vuedemo1,
        'md2vuedemo2': md2vuedemo2,
        'md2vuedemo3': md2vuedemo3
        }, 
        render (h) {
          return h(name)
        }
      }).$mount(div)
    }
  }

}
module.exports = __exports;
</script>