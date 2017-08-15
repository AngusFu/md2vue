const marked = require('marked')
const indent = require('indent')
const extractMdCode = require('./extract')

const renderer = new marked.Renderer()

module.exports = (source) => {
  let id = 0
  const demos = []

  renderer.code = function (code) {
    const tag = `VueDemo${id++}`
    const { style, script, template } = extractMdCode(code)

    let vueComponent = `<template lang="html">
  <div class="code">
${indent(template, '    ')}
  </div>
</template>
<script lang="buble">
${script}
</script>`

    if (style !== '') {
      vueComponent += `\n<style scoped>${style}</style>`
    }

    demos.push({
      tag,
      raw: code,
      vue: vueComponent
    })

    return `\n<${tag}></${tag}>`
  }

  return {
    demos,
    result: marked(source, { renderer })
  }
}
