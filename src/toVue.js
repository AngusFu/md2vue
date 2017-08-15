const marked = require('marked')
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
    ${template}
  </div>
</template>
<script lang="buble">
${script}
</script>`

    if (style !== '') {
      vueComponent += `<style scoped>${style}</style>`
    }

    demos.push({
      tag,
      raw: code,
      vue: vueComponent
    })

    return `<${tag}></${tag}>`
  }

  return {
    demos,
    result: marked(source, { renderer })
  }
}
