import marked from 'marked'
import indent from 'indent'
import extractSFC from './extract-sfc'
import getRenderer from './renderer'

import highlightJs from './highlight/hljs'
import prism from './highlight/prism'

const highlightMap = {
  prism,
  'highlight.js': highlightJs
}

const renderer = getRenderer()
const FIX_VUE = /<span class="hljs-tag">&lt;\/</g
const FIXTURE = '<span class="hljs-tag"><span>&lt;</span>/<'
const fix = code => code.replace(FIX_VUE, FIXTURE)

export default (source, config) => {
  let id = 0
  const demos = []
  renderer.code = code
  const markup = marked(source, { renderer })
  return { demos, markup }

  function code (raw, language) {
    const { highlight } = config

    let fn = null

    if (typeof highlight === 'function') {
      fn = highlight
    } else if (highlightMap[highlight]) {
      fn = highlightMap[highlight]
    } else {
      throw new Error('Invalid highlight option!')
    }

    const lang = language === 'vue' ? 'html' : language
    const markup = fn(raw, lang)

    // TODO: 优化判断条件
    if (lang !== 'html') {
      return wrapHljsCode(fix(markup), lang)
    }

    const tag = `md2vuedemo${(id++).toString(36)}`
    const { style, script, template, demoOnly } = extractSFC(raw)

    let vue = `<template lang="html">
  <div class="vue-demo">
${indent(template, )}
  </div>
</template>

<script lang="buble">
${script}
</script>`

    if (style !== '') {
      vue = `<style scoped>${style}</style>\n` + vue
    }

    demos.push({ tag, raw, vue })

    const { inject } = config
    let injection = ''
    let sourceCode = ''

    if (!demoOnly) {
      if (typeof inject === 'function') {
        injection = inject()
      } else if (typeof inject === 'string') {
        injection = inject
      }

      sourceCode = wrapHljsCode(fix(markup), lang)
    }

    const demoApp = `<${tag}></${tag}>`
    const klass = demoOnly ? 'vue-demo-block vue-demo-block-demo-only' : 'vue-demo-block'

    return `
<div class="${klass}">
${demoApp}
${injection}
${sourceCode}
</div>
`
  }
}

function wrapHljsCode (code, lang) {
  return `<pre v-pre class="lang-${lang}"><code>${code}</code></pre>`
}
