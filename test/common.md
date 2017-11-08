## Introduction to md2vue

You can get raw text of this document **[here](/AngusFu/md2vue/blob/master/test/common.md)**.

> Markdown is a lightweight markup language with plain text formatting syntax. It is designed so that it can be converted to HTML and many other formats using a tool by the same name. —— [wikipedia](https://en.wikipedia.org/wiki/Markdown)

### Inspiration

Inspired by <a href="https://nuxtjs.org">nuxt</a>, [md2vue](https://github.com/AngusFu/md2vue) was initially aimed at transforming markdown texts in our Vue project, which were used both for documentation and demostration.

### Dev Dependencies

- [marked](/chjj/marked): A markdown parser and compiler. Built for speed.
- [highlight.js](https://github.com/isagalaev/highlight.js): Javascript syntax highlighter.
- [vueify](https://github.com/vuejs/vueify): Browserify transform for single-file Vue components
- [rollup](https://github.com/rollup/rollup): Next-generation ES6 module bundler.
- [buble](https://buble.surge.sh/): The blazing fast, batteries-included ES2015 compiler.

### Typography & UI

- [github-markdown-css](https://github.com/sindresorhus/github-markdown-css): The minimal amount of CSS to replicate the GitHub Markdown style.
- [highlight.js](https://github.com/isagalaev/highlight.js): Code highlighting.


### Demo

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
  font-size: 20px;
}
</style>
<button @click="click">click</button>

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
