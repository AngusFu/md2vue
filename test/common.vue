<template>
  <article class="markdown-body">
    <h2>Markdown简介</h2><blockquote>
    <p>Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档，然后转换成格式丰富的HTML页面。    —— <a href="https://zh.wikipedia.org/wiki/Markdown">维基百科</a></p>
    </blockquote>
    <h3>笔记标题</h3><p><strong>马克飞象</strong>会自动使用文档内出现的第一个标题作为笔记标题。例如本文，就是第一行的 <code>欢迎使用马克飞象</code>。</p>
    <h3>快捷编辑</h3><p>保存在印象笔记中的笔记，右上角会有一个红色的编辑按钮，点击后会回到<strong>马克飞象</strong>中打开并编辑该笔记。</p>
    <blockquote>
    <p><strong>注意：</strong>目前用户在印象笔记中单方面做的任何修改，马克飞象是无法自动感知和更新的。所以请务必回到马克飞象编辑。</p>
    </blockquote>
    <h3>数据同步</h3><p><strong>马克飞象</strong>通过<strong>将Markdown原文以隐藏内容保存在笔记中</strong>的精妙设计，实现了对Markdown的存储和再次编辑。既解决了其他产品只是单向导出HTML的单薄，又规避了服务端存储Markdown带来的隐私安全问题。这样，服务端仅作为对印象笔记 API调用和数据转换之用。</p>
    <blockquote>
    <p><strong>隐私声明：用户所有的笔记数据，均保存在印象笔记中。马克飞象不存储用户的任何笔记数据。</strong></p>
    </blockquote>
    <h3>表格</h3><table>
    <thead>
    <tr>
    <th style="text-align:left">Item</th>
    <th style="text-align:right">Value</th>
    <th style="text-align:center">Qty</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td style="text-align:left">Computer</td>
    <td style="text-align:right">1600 USD</td>
    <td style="text-align:center">5</td>
    </tr>
    <tr>
    <td style="text-align:left">Phone</td>
    <td style="text-align:right">12 USD</td>
    <td style="text-align:center">12</td>
    </tr>
    <tr>
    <td style="text-align:left">Pipe</td>
    <td style="text-align:right">1 USD</td>
    <td style="text-align:center">234</td>
    </tr>
    </tbody>
    </table>
    <h3>Demo</h3>
    <VueDemo0></VueDemo0><h3>Demo 2</h3><pre v-pre class="lang-javascript"><code>
    <span style="color: #23AC69">export</span> <span style="color: #91C132">default</span> {
      <span style="color: #F19726">data</span>() {
        <span style="color: #E8552D">return</span> {
          <span style="color: #1AAB8E">count</span>: <span style="color: #E1147F">0</span>
        }
      },
      <span style="color: #2980C1">methods</span>: {
        <span style="color: #1BA1E6">incr</span>(<span style="color: #9FA0A0">delta</span>) {
          <span style="color: #F19726">this</span>.<span style="color: #1AAB8E">count</span> += <span style="color: #9FA0A0">delta</span>
        }
      }
    }
    </code></pre>

  </article >
</template>

<script>
  /* eslint-disable */
  const VueDemo0 = (function (module) {
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
    __vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"code"},[_c('div',{staticClass:"wrapper"},[_c('button',{on:{"click":function($event){_vm.incr(-1)}}},[_vm._v("decrease")]),_vm._v(" "),_c('input',{attrs:{"type":"text","readonly":""},domProps:{"value":_vm.count}}),_vm._v(" "),_c('button',{on:{"click":function($event){_vm.incr(+1)}}},[_vm._v("increase")])])])}
    __vue__options__.staticRenderFns = []
    __vue__options__._scopeId = "data-v-bba68bf6"

    return module.exports;
  })({});

  /* eslint-enable */
  export default {
    components: { VueDemo0 }
  }
</script>

<style>
.wrapper[data-v-bba68bf6]{backgroun:red}
</style>
