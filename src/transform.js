import marked from 'marked'
import indent from 'indent'
import extractMdCode from './extract'

const renderer = new marked.Renderer()

export default (source) => {
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
    markup: marked(source, { renderer })
  }
}
