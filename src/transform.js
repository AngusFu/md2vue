import indent from 'indent'
import isFunction from 'lodash/isFunction'

import { defer } from './util'
import extractSFC from './extract-sfc'

import highlightJs from './highlight/hljs'
import prism from './highlight/prism'

const remark = require('remark')
const html = require('remark-html')
const visit = require('unist-util-visit')

const highlightMap = {
  prism,
  'highlight.js': highlightJs
}

const wrapCode = (code, lang) => {
  return `<pre v-pre class="lang-${lang}"><code>${code}</code></pre>`
}

const highlight = hl => node => {
  let fn = null
  if (isFunction(hl)) {
    fn = hl
  } else if (highlightMap[hl]) {
    fn = highlightMap[hl]
  } else {
    throw new Error('Invalid highlight option!')
  }

  return fn(node.value, node.lang)
}

export default (source, config) => {
  let id = 0
  const appComponents = []
  const hl = highlight(config.highlight)
  const { inject, remarkPlugins } = config

  const codeVisitor = node => {
    const { lang, value } = node

    // for inline html
    // FIXME: look for better condition
    if (lang === null) {
      node.type = 'html'
      return
    }

    const highlighted = hl(node)
    if (lang !== 'html') {
      node.type = 'html'
      node.value = wrapCode(highlighted, lang)
      return
    }

    let {
      style, styleAttrs,
      script, scriptAttrs,
      template, templateAttrs, demoOnly
    } = extractSFC(value)

    scriptAttrs = scriptAttrs || 'lang="buble"'
    templateAttrs = templateAttrs || 'lang="html"'

    let sfc = `
<template ${templateAttrs}>
<div class="vue-demo">
${indent(template)}
</div>
</template>

<script ${scriptAttrs}>
${script}
</script>`

    if (style !== '') {
      styleAttrs = styleAttrs ? `${styleAttrs} ` : ''
      sfc = `<style ${styleAttrs}scoped>${style}</style>\n` + sfc
    }

    const tag = `md2vuedemo${(id++).toString(36)}`
    let className = 'vue-demo-block'

    if (demoOnly) {
      className += ' vue-demo-block-demo-only'
    }

    node.type = 'html'
    node.value = `
<div class="${className}">
<${tag}></${tag}>
${demoOnly ? '' : (isFunction(inject) ? inject() : inject)}
${demoOnly ? '' : wrapCode(highlighted, lang)}
</div>
`
    appComponents.push({
      tag,
      vue: sfc
    })
  }

  const deferred = defer()
  let transform = remark()
    .use(html)
    .use(remarkPlugins)
    .use(() => ast => visit(ast, 'code', codeVisitor))

  transform.process(source, (err, file) => {
    if (err) {
      deferred.reject(err)
    } else {
      deferred.resolve({
        appComponents,
        html: String(file)
      })
    }
  })

  return deferred.promise
}
