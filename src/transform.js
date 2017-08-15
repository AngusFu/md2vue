import marked from 'marked'
import indent from 'indent'
import extractMdCode from './extract'
import getRenderer from './renderer'
import hanabi from 'hanabi'

const renderer = getRenderer()
// const renderCode = (function (code) {
//   return function (code, lang) {
//     return code.call(renderer, code, lang)
//   }
// }(renderer.code))

export default (source) => {
  let id = 0
  const demos = []
  renderer.code = function (code, lang) {
    if (lang !== 'vue' && lang !== 'html') {
      // return renderCode.call(renderer, code, lang)
      return `<pre v-pre class="lang-${lang}"><code>
${hanabi(code)}
</code></pre>
`
    }

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
