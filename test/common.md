# Introduction to md2vue

You can get raw text of this document **[here](/AngusFu/md2vue/blob/master/test/common.md)**.

> Markdown is a lightweight markup language with plain text formatting syntax. It is designed so that it can be converted to HTML and many other formats using a tool by the same name. —— [wikipedia](https://en.wikipedia.org/wiki/Markdown)

## Inspiration

Inspired by <a href="https://nuxtjs.org">nuxt</a>, [md2vue](https://github.com/AngusFu/md2vue) was initially aimed at transforming markdown texts in our Vue project, which were used both for documentation and demostration.

## Dev Dependencies

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

## How to use

API is simple, so just see the code below: 

```js
import md2vue from 'md2vue'

// your markdown text
const sourceCode = `...`

// configuration object
const config = {
  target: 'js',
  componentName: 'common-comp',
  highlight: 'prism',
  customMarkups,
  documentInfo
}

// returns a promise
// the resolved value would be a string
const content = await md2vue(sourceCode, config)
```


## Explaination on config object

Referring to [build-doc.js](./build-doc.js) or [spec file](./test/md2vue.spec.js) is suggested.

### `.target`: String

Unless you specify this property to `js`, any other value will be treated as `vue`.

With this property beening `vue`, it means you will get .vue styled result. You can write the result to a single file with ".vue" extension for later use.

With this property beening `js`, you'll get a precompiled JavaScript result. You can write it to a ".js" file, and then do something like this:

```js
const MyComponent = require('common-comp.js')
Vue.use(MyComponent)
new Vue({
  el: '#app',
  template: '<common-comp />'
})
```

### `.componentName`: String

This property is required when the target is "js".

### `.highlight`: String | Function

You can specify this property to 'highlight.js' or 'prism'.

A function which accepts 2 arguments `code` and `language` is also accepted.

### `.customMarkups`: String | Function

Some custom markups you want to inject between the App block and source code block.

### `.documentInfo`: Object

Any stuff you want to provide for your vue component.



## Demo

All code blocks with language specified to `html` or `vue` are treated as Vue apps.

But What if you want to demonstrate that code block just for its sake? Simply specify the language to `xml`.

The following code in vue can be rendered into an real tiny vue app:

```html
<style>
  .wrapper input {
    width: 50px;
    text-align: center;
  }
</style>

<template>
  <div class="wrapper">
    <button @click="incr(-1)">-</button>
    <input type="text" readonly :value="count">
    <button @click="incr(+1)">+</button>
  </div>
</template>

<script>
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

You can also leave out `<template>` tags, just like this:

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

What if you only want the app without source code? Follow the code:

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

Noticed the difference? Hmm, just wrap your template, append a `demo-only` attribute to it. So let's take a look:


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

## Test

```html
<template>
  <p>lorem
    xxxxx
  </p>
  <input value="22222">
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