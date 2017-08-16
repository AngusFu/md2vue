# md2vue

Transform markdown document to vue component.

Highlighting code support from [highlight.js](https://github.com/isagalaev/highlight.js).

## API

```javascript
const md2vue = require('md2vue')

// `vueInjection` is those stuff you want to add to
// the Vue component's `export default {}` block
const vueInjection = `
head() {
  return '测试'
},
layout: 'component'
`
md2vue(markdown, {
  vueInjection,
  // this would insert a pair of lable and checkbox
  // which could be used for controlling visibility of
  // source code and demo block
  // default: `true`
  toggleCode: true
}).then(content => {
  require('fs').writeFileSync('./dest.vue', content)
})
```

The output could be like this:

```html
<template>
  <article class="markdown-body">
    // ...
    <VueDemo0></VueDemo0>
    // ...
  </article>
</template>
<script>
const VueDemo0 = .... 
// ...
export default {
  components: { VueDemo0 },
+ head() {
+   return '测试'
+ },
+ layout: 'component'
}
</script>
```
