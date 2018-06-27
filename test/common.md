# 简介

> Markdown is a lightweight markup language with plain text formatting syntax. It is designed so that it can be converted to HTML and many other formats using a tool by the same name. —— [wikipedia](https://en.wikipedia.org/wiki/Markdown)

## 说明

灵感来自  <a href="https://nuxtjs.org">nuxt</a>。


## devDependencies

- [marked](/chjj/marked): A markdown parser and compiler. Built for speed.
- [highlight.js](https://github.com/isagalaev/highlight.js): Javascript syntax highlighter.
- [prism](https://github.com/PrismJS/prism): Javascript syntax highlighter.
- [vueify](https://github.com/vuejs/vueify): Browserify transform for single-file Vue components
- [rollup](https://github.com/rollup/rollup): Next-generation ES6 module bundler.
- [buble](https://buble.surge.sh/): The blazing fast, batteries-included ES2015 compiler.

## Typography & UI

- [github-markdown-css](https://github.com/sindresorhus/github-markdown-css): The minimal amount of CSS to replicate the GitHub Markdown style.
- [highlight.js](https://github.com/isagalaev/highlight.js): Code highlighting.
- [prism](https://github.com/PrismJS/prism): Code highlighting.

## 使用

API 相当简单。直接看代码即可：

```javascript
import md2vue from 'md2vue'

// markdown 文本
const markdownText = `...`

// 配置
const config = {
  target: 'js',
  name: 'common-comp',
  highlight: 'prism',
  tool,
  extend
}

// 返回 promise
const content = await md2vue(markdownText, config)
```


## 配置字段

### target

字符串。可选址值为 `vue` `js`。默认为 `vue`。

使用 `vue` 时，生成结果是一个 SFC（single file component）。这种情况下，你可以将内容写入到一个 `.vue` 文件中。

使用 `js` 时，则会进一步将 SFC 编译为 JavaScript。你可以将结果写到一个 `.js` 文件中，并像下面这样引用：

```javascript
const MyComponent = require('my-component.js')

Vue.use(MyComponent)

new Vue({
  el: '#app',
  template: '<common-comp />'
})
```


### name

字符串类型。注意，当 target 字段为 `js` 时，必须配置此字段。


### highlight

使用何种工具进行代码高亮处理。

可选值 `highlight.js` `prism`。默认为 `highlight.js`。

当然，也可以传入一个函数，该函数接收两个参数：`code`, `language`


### inject

字符串或函数。将会插入到文档的 demo 与源码之间。


### extend

其他可以提供给 Vue 组件的内容，请传入 Plain Object。


## Demo

所有语言类型设置为 `html` 和 `vue` 的代码块，就被视作 Vue app。

如果你真的只是需要展示代码，请将语言设置为 `xml`。

下面的代码将会渲染出可以运行的 demo：（当然，前提是你必须自行安装 stylus 和 pug 依赖）

```html
<style lang="stylus">
.wrapper
  input
    width: 50px;
    text-align: center;
</style>

<template lang="pug">
.wrapper
  button(@click="incr(-1)") -
  input(type="text", readonly, :value="count")
  button(@click="incr(+1)") +
</template>

<!--默认使用 buble 编译 JS-->
<script lang="buble">
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    incr(delta) {
      this.count += delta
    }
  }
}
</script>
```

其实也可以偷懒，不写 `<template>` 也是可以的。（这时候，template 的内容就是去掉 style 和 script 两部分之后剩余的内容。）示例如下：

```html
<style>
  button {
    font-size: 14px;
  }
</style>

<button @click="click">click me!</button>

<script>
  export default {
    methods: {
      click() {
        alert('clicked!')
      }
    }
  }
</script>
```

问题来了，假如我真的只是想在页面中插入一个可交互的 tiny app，而不想展示源码，该怎么办？

这时候，可以像下面一样，为 `<template>` 添加一个 `demo-only` 属性。

```xml
<style>
  button {
    font-size: 14px;
  }
</style>

<template demo-only>
  <button @click="click">click me!</button>
</template>

<script>
  export default {
    methods: {
      click() {
        alert('clicked!')
      }
    }
  }
</script>
```

效果如下：

```html
<style>
  button {
    font-size: 14px;
  }
</style>

<template demo-only>
  <button @click="click">click me!</button>
</template>

<script>
  export default {
    methods: {
      click() {
        alert('clicked!')
      }
    }
  }
</script>
```
