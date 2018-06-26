import indent from 'indent'
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

  return `
<template>
  <article class="markdown-body">
${html}
  </article >
</template>

<script lang="buble">
${script}
module.exports = ${toJSON(docInfo)};
module.exports.components = {
${indent(components, 2)}
}
</script>
${stylePart}
`
}