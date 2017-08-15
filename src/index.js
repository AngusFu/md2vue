const fs = require('fs')
const indent = require('indent')

const vueCompiler = require('./compiler')
const toVue = require('./toVue')
const { wrapESLint } = require('./util')
const StyleBundler = require('./styleBundler')

const source = fs.readFileSync('./test/test.md').toString()
const bundler = StyleBundler.from(vueCompiler, 'style')
const { result, demos } = toVue(source)
let vueOutput = `<template>
  <div class="doc-wrapper">
${indent(result, '    ')}
  </div>
</template>`

const tasks = demos.map(({ tag, raw, vue }) =>
  vueCompiler
    .compilePromise(vue)
    .then(res => `const ${tag} = (function (module) {
${indent(res, '  ')}
  return module.exports;
})({});\n`)
)

Promise.all(tasks)
  .then(rets => wrapESLint(rets.join('\n')))
  .then(code => {
    const comps = demos.map(({tag}) => tag).join(', ')
    vueOutput += `
<script>
${indent(code, '  ')}
  export default {
    components: { ${comps} }
  }
</script>`
  })
  .then(() => {
    return bundler.pipe(css => {
      vueOutput += `\n<style>\n${css}\n</style>`
    })
  })
  .then(() => {
    fs.writeFileSync('./test.vue', vueOutput, 'utf-8')
  })
