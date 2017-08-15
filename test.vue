<template>
  <div class="doc-wrapper">
    <h1 id="-modal">模态框 - Modal</h1>
    <p>模态框（Modal）是覆盖在父窗体上的子窗体。通常，目的是显示来自一个单独的源的内容，可以在不离开父窗体的情况下有一些互动。子窗体可提供信息、交互等。</p>
    <ul>
    <li><strong>title</strong>：模态框的标题。</li>
    <li><strong>subTitle</strong>：模态框的副标题。</li>
    <li><strong>visible</strong>：控制模态框的显隐，<code>true</code>或者<code>false</code>。</li>
    </ul>

    <VueDemo0></VueDemo0><h2 id="-">第二段</h2>
    <p>模态框（Modal）是覆盖在父窗体上的子窗体。通常，目的是显示来自一个单独的源的内容，可以在不离开父窗体的情况下有一些互动。子窗体可提供信息、交互等。</p>
    <ul>
    <li><strong>title</strong>：模态框的标题。</li>
    <li><strong>subTitle</strong>：模态框的副标题。</li>
    <li><strong>visible</strong>：控制模态框的显隐，<code>true</code>或者<code>false</code>。</li>
    </ul>

    <VueDemo1></VueDemo1>
  </div>
</template>
<script>
  /* eslint-disable */
  const VueDemo0 = (function (module) {
    ;(function(){
      module.exports = {
        data: function data() {
          return {
            modalVisible: false
          }
        },
        methods: {
          shutModal: function shutModal () {
            this.modalVisible = false;
          }
        }
      }
    })()
    if (module.exports.__esModule) module.exports = module.exports.default
    var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
    __vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)}
    __vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"code"},[_c('div',[_vm._v("xxx")])])}]

    return module.exports;
  })({});

  const VueDemo1 = (function (module) {
    ;(function(){
      module.exports = {
        data: function data() {
          return {
            modalVisible: false
          }
        },
        methods: {
          shutModal: function shutModal () {
            this.modalVisible = false;
          }
        }
      }
    })()
    if (module.exports.__esModule) module.exports = module.exports.default
    var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
    __vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)}
    __vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"code"},[_c('div',[_vm._v("12222222222")])])}]

    return module.exports;
  })({});

  /* eslint-enable */
  export default {
    components: { VueDemo0, VueDemo1 }
  }
</script>
<style>

</style>