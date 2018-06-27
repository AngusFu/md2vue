import indent from 'indent'
import prettier from 'prettier'

import { toJSON } from './util'

export default function (arg) {
  const {
    html,
    style,
    script,
    components,
    docInfo = {}
  } = arg

  const stylePart = style ? `
<style>
${style}
</style>` : ''

  const etended = prettify(`module.exports = ${toJSON(docInfo)};`)

  return `<template>
<article class="markdown-body">
${html}
</article >
</template>

<script lang="buble">
${script}
${etended}
module.exports.components = {
${indent(components, 2)}
}
</script>
${stylePart}
`
}

function prettify (code) {
  return prettier.format(code, {
    singleQuote: true,
    parser: 'babylon'
  })
}
