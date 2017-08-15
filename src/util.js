import indent from 'indent'

export const addESLint = (code) => code ? `/* eslint-disable */
${code}
/* eslint-enable */` : ''

export const wrapCSSText = (css) => css ? `
<style>
${css}
</style>
` : ''

export const wrapScript = ({
  code,
  names
}) => code ? `
<script>
${indent(code, '  ')}
  export default {
    components: { ${names} }
  }
</script>` : ''

export const wrapMarkup = (markup) => `<template>
  <article class="markdown-body">
${indent(markup, '    ')}
  </article >
</template>`

export const wrapVueCompiled = ({ tagName, compiled }) => {
  return `const ${tagName} = (function (module) {
${indent(compiled, '  ')}
  return module.exports;
})({});
`
}

export const wrapHljsCode = (code, lang) => `
<pre v-pre class="lang-${lang}"><code>
${indent(code, '  ')}
</code></pre>
`

export function escape (html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
