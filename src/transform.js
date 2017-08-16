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

    // TODO: 优化判断条件
    if (lang !== 'html') {
      return result
    }

    const tag = `VueDemo${id++}`
    const { style, script, template } = extractMdCode(code)

    let vueComponent = `<template lang="html">
  <div class="vue-demo">
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

    const rand = 1e8 * Math.random() | 0
    const uid = 'vd' + Buffer.from(`${rand}`).toString('base64').replace(/=/g, '')
    return `
<div class="vue-demo-block">
<${tag}/>
<input id="${uid}" type="checkbox" />
<label for="${uid}"></label>
${result}
</div>
`
  }

  return {
    demos,
    markup: marked(source, { renderer })
  }
}
