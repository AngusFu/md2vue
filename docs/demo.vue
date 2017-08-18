<template>
<article class="markdown-body">
<h2>Introduction to md2vue</h2><p>You can get raw text of this document <strong><a href="/AngusFu/md2vue/blob/master/test/common.md">here</a></strong>.</p>
<blockquote>
<p>Markdown is a lightweight markup language with plain text formatting syntax. It is designed so that it can be converted to HTML and many other formats using a tool by the same name. —— <a href="https://en.wikipedia.org/wiki/Markdown" target="blank">wikipedia</a></p>
</blockquote>
<h3>Inspiration</h3><p>Inspired by <a href="https://nuxtjs.org">nuxt</a>, <a href="https://github.com/AngusFu/md2vue" target="blank">md2vue</a> was initially aimed at transforming markdown texts in our Vue project, which were used both for documentation and demostration.</p>
<h3>Dev Dependencies</h3><ul>
<li><a href="/chjj/marked">marked</a>: A markdown parser and compiler. Built for speed.</li>
<li><a href="https://github.com/isagalaev/highlight.js" target="blank">highlight.js</a>: Javascript syntax highlighter.</li>
<li><a href="https://github.com/vuejs/vueify" target="blank">vueify</a>: Browserify transform for single-file Vue components</li>
<li><a href="https://github.com/rollup/rollup" target="blank">rollup</a>: Next-generation ES6 module bundler.</li>
<li><a href="https://buble.surge.sh/" target="blank">buble</a>: The blazing fast, batteries-included ES2015 compiler.</li>
</ul>
<h3>Typography &amp; UI</h3><ul>
<li><a href="https://github.com/sindresorhus/github-markdown-css" target="blank">github-markdown-css</a>: The minimal amount of CSS to replicate the GitHub Markdown style.</li>
<li><a href="https://github.com/isagalaev/highlight.js" target="blank">highlight.js</a>: Code highlighting.</li>
</ul>
<h3>Demo</h3><p>The following code in vue can be rendered into an real tiny vue app:</p>

<div class="vue-demo-block">
<md2vuedemo0></md2vuedemo0>
<input id="vdMTQyMjU5NDY" type="checkbox" /><label for="vdMTQyMjU5NDY"></label>
<pre v-pre class="lang-html">
<code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.wrapper</span> <span class="hljs-selector-tag">input</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">50px</span>;
  <span class="hljs-attribute">text-align</span>: center;
}
</span><span class="hljs-tag"><span>&lt;</span>/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrapper"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"incr(-1)"</span>&gt;</span>-<span class="hljs-tag"><span>&lt;</span>/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">readonly</span> <span class="hljs-attr">:value</span>=<span class="hljs-string">"count"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"incr(+1)"</span>&gt;</span>+<span class="hljs-tag"><span>&lt;</span>/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag"><span>&lt;</span>/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag"><span>&lt;</span>/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>
    }
  },
  <span class="hljs-attr">methods</span>: {
    incr(delta) {
      <span class="hljs-keyword">this</span>.count += delta
    }
  }
}
</span><span class="hljs-tag"><span>&lt;</span>/<span class="hljs-name">script</span>&gt;</span></code>
</pre>
</div>
<p>You can also leave out <code>&lt;template&gt;</code> tags, just like this:</p>

<div class="vue-demo-block">
<md2vuedemo1></md2vuedemo1>
<input id="vdMTQyNzIyMTM" type="checkbox" /><label for="vdMTQyNzIyMTM"></label>
<pre v-pre class="lang-html">
<code><span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"click"</span>&gt;</span>click<span class="hljs-tag"><span>&lt;</span>/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">methods</span>: {
    click() {
      alert(<span class="hljs-string">'clicked!'</span>)
    }
  }
}
</span><span class="hljs-tag"><span>&lt;</span>/<span class="hljs-name">script</span>&gt;</span></code>
</pre>
</div>

</article >
</template>

<script>
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
</script>

<style>
.wrapper input[data-v-bba68bf6]{width:50px;text-align:center}
.wrapper input[data-v-bba68bf6]{width:50px;text-align:center}
</style>
