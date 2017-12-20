import marked from 'marked'
import indent from 'indent'
import extractMdCode from './extract'
import getRenderer from './renderer'
import { wrapHljsCode } from './util'

import highlightJs from './highlight/hljs'
import prismJs from './highlight/prism'

const highlightMap = {
  'highlight.js': highlightJs,
  prism: prismJs
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
    const { highlight, shadow } = config

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

    const tag = `md2vuedemo${id.toString(36)}`
    const { style, script, template, effectOnly } = extractMdCode(raw)

    let vue = `<template lang="html">
  <div class="vue-demo">
${indent(template, '    ')}
  </div>
</template>
<script lang="buble">
${script}
</script>`

    let shadowCss = ''
    if (style !== '') {
      if (shadow === false) {
        vue = `<style scoped>${style}</style>\n` + vue
      } else {
        shadowCss = style
      }
    }

    demos.push({ tag, raw, vue, shadowCss })

    let customMarkups = ''
    if (typeof config.customMarkups === 'function') {
      customMarkups = config.customMarkups() || ''
    } else if (config.customMarkups === 'string') {
      customMarkups = config.customMarkups || ''
    }

    let demoApp = `<${tag} />`

    if (shadow === true) {
      demoApp = `<shadow-demo name="${tag}" :index="${id}"/>`
    }

    id += 1

    return `
<div class="vue-demo-block${effectOnly ? ' vue-demo-block-demo-only' : ''}">
${demoApp}
${effectOnly ? '' : customMarkups}
${effectOnly ? '' : wrapHljsCode(fix(markup), lang)}
</div>
`
  }
}
