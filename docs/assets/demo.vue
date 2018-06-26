
<template>
  <article class="markdown-body">
<h1>简介</h1><blockquote>
<p>Markdown is a lightweight markup language with plain text formatting syntax. It is designed so that it can be converted to HTML and many other formats using a tool by the same name. —— <a href="https://en.wikipedia.org/wiki/Markdown" target="_blank">wikipedia</a></p>
</blockquote>
<h2>说明</h2><p>灵感来自  <a href="https://nuxtjs.org">nuxt</a>。</p>
<h2>devDependencies</h2><ul>
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
<h2>使用</h2><p>API 相当简单。直接看代码即可：</p>
<pre v-pre class="lang-javascript"><code><span class="token keyword">import</span> md2vue <span class="token keyword">from</span> <span class="token string">'md2vue'</span>

<span class="token comment">// markdown 文本</span>
<span class="token keyword">const</span> markdownText <span class="token operator">=</span> <span class="token template-string"><span class="token string">`...`</span></span>

<span class="token comment">// 配置</span>
<span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>
  target<span class="token punctuation">:</span> <span class="token string">'js'</span><span class="token punctuation">,</span>
  name<span class="token punctuation">:</span> <span class="token string">'common-comp'</span><span class="token punctuation">,</span>
  highlight<span class="token punctuation">:</span> <span class="token string">'prism'</span><span class="token punctuation">,</span>
  tool<span class="token punctuation">,</span>
  extend
<span class="token punctuation">}</span>

<span class="token comment">// 返回 promise</span>
<span class="token keyword">const</span> content <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">md2vue</span><span class="token punctuation">(</span>markdownText<span class="token punctuation">,</span> config<span class="token punctuation">)</span></code></pre><h2>配置字段</h2><h3>target</h3><p>字符串。可选址值为 <code>vue</code> <code>js</code>。默认为 <code>vue</code>。</p>
<p>使用 <code>vue</code> 时，生成结果是一个 SFC（single file component）。这种情况下，你可以将内容写入到一个 <code>.vue</code> 文件中。</p>
<p>使用 <code>js</code> 时，则会进一步将 SFC 编译为 JavaScript。你可以将结果写到一个 <code>.js</code> 文件中，并像下面这样引用：</p>
<pre v-pre class="lang-js"><code><span class="token keyword">const</span> MyComponent <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'my-component.js'</span><span class="token punctuation">)</span>

Vue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>MyComponent<span class="token punctuation">)</span>

<span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  el<span class="token punctuation">:</span> <span class="token string">'#app'</span><span class="token punctuation">,</span>
  template<span class="token punctuation">:</span> <span class="token string">'&lt;common-comp />'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span></code></pre><h3>name</h3><p>字符串类型。注意，当 target 字段为 <code>js</code> 时，必须配置此字段。</p>
<h3>highlight</h3><p>使用何种工具进行代码高亮处理。</p>
<p>可选值 <code>highlight.js</code> <code>prism</code>。默认为 <code>highlight.js</code>。</p>
<p>当然，也可以传入一个函数，该函数接收两个参数：<code>code</code>, <code>language</code></p>
<h3>inject</h3><p>字符串或函数。将会插入到文档的 demo 与源码之间。</p>
<h3>extend</h3><p>其他可以提供给 Vue 组件的内容，请传入 Plain Object。</p>
<h2>Demo</h2><p>所有语言类型设置为 <code>html</code> 和 <code>vue</code> 的代码块，就被视作 Vue app。</p>
<p>如果你真的只是需要展示代码，请将语言设置为 <code>xml</code>。</p>
<p>The following code in vue can be rendered into an real tiny vue app:</p>
<p>下面的代码将会渲染出真实效果：</p>

<div class="vue-demo-block">
<md2vuedemo0></md2vuedemo0>
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
<p>其实也可以偷懒，不写 <code>&lt;template&gt;</code> 也是可以的。（这时候，template 的内容就是去掉 style 和 script 两部分之后剩余的内容。）示例如下：</p>

<div class="vue-demo-block">
<md2vuedemo1></md2vuedemo1>
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
<p>问题来了，假如我真的只是想在页面中插入一个可交互的 tiny app，而不想展示源码，该怎么办？</p>
<p>这时候，可以像下面一样，为 <code>&lt;template&gt;</code> 添加一个 <code>demo-only</code> 属性。</p>
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
</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span></code></pre><p>效果如下：</p>

<div class="vue-demo-block vue-demo-block-demo-only">
<md2vuedemo2></md2vuedemo2>


</div>

  </article >
</template>

<script lang="buble">
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
__vue__options__._scopeId = "data-v-029571ac"
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
__vue__options__._scopeId = "data-v-029571ad"
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
__vue__options__._scopeId = "data-v-029571ae"
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

module.exports = {"head": function anonymous() {
return { title: 'foo' }
},"layout": "component","directives": {"effect-only": {"inserted": function inserted(el) {
        console.log(el)
      }}}};
module.exports.components = {
  'md2vuedemo0': md2vuedemo0,
  'md2vuedemo1': md2vuedemo1,
  'md2vuedemo2': md2vuedemo2
}
</script>

<style>
.wrapper input[data-v-029571ac] {
    width: 50px;
    text-align: center;
  }
button[data-v-029571ad] {
    font-size: 14px;
  }
button[data-v-029571ae] {
    font-size: 14px;
  }
</style>
