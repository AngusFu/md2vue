import marked from 'marked'
import indent from 'indent'
import hljs from 'highlight.js'
import extractMdCode from './extract'
import getRenderer from './renderer'
import { wrapHljsCode } from './util'

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
    const lang = language === 'vue' ? 'html' : language
    const markup = hljs.highlight(lang, raw).value
    const result = wrapHljsCode(fix(markup), lang)

    // TODO: 优化判断条件
    if (lang !== 'html') {
      return result
    }

    const tag = `md2vuedemo${(id++).toString(36)}`
    const { style, script, template } = extractMdCode(raw)

    let vue = `<template lang="html">
  <div class="vue-demo">
${indent(template, '    ')}
  </div>
</template>
<script lang="buble">
${script}
</script>`

    if (style !== '') {
      vue = `<style scoped>${style}</style>\n` + vue
    }

    demos.push({ tag, raw, vue })

    let customMarkups = ''

    if (typeof config.customMarkups === 'function') {
      customMarkups = config.customMarkups() || ''
    } else if (config.customMarkups === 'string') {
      customMarkups = config.customMarkups || ''
    }

    return `
<div class="vue-demo-block">
<${tag}></${tag}>
${customMarkups}
${result}
</div>
`
  }
}
