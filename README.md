# md2vue

Transform markdown document to vue component, with code highlighting support from [highlight.js](https://github.com/isagalaev/highlight.js).

Have a look at the generated [code](https://angusfu.github.io/md2vue/) ~

## API

### markdown text to `.vue` 

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
    <md2vuedemo0></md2vuedemo0>
    // ...
  </article>
</template>
<script>
const md2vuedemo0 = .... 
// ...
module.exports = {
  components: { md2vuedemo0 },
+ head() {
+   return '测试'
+ },
+ layout: 'component'
}
</script>
```

### markdown text to javascript

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
  toggleCode: true,
  // this indicates that js code expected
  // default to vue (see above section)
  target: 'js',
  // name of the component
  componentName: 'docPageA',
}).then(content => {
  require('fs').writeFileSync('./docPageA.js', content)
})
```

## TODO

- loader
- command line
- sourceMap
- consider using [remark](http://remark.js.org/), which allows for custom plugin  
