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

export default (source) => {
  let id = 0
  const demos = []
  renderer.code = function (code, language) {
    const lang = language === 'vue' ? 'html' : language
    const markup = hljs.highlight(lang, code).value
    const result = wrapHljsCode(fix(markup), lang)

    if (lang !== 'html') {
      return result
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

    return `\n<${tag}></${tag}>\n${result}\n`
  }

  return {
    demos,
    markup: marked(source, { renderer })
  }
}
