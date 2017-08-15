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
  code = '',
  names = '',
  vueInjection = ''
}) => {
  if (!code) {
    return ''
  }

  if (typeof vueInjection !== 'string') {
    const msg = '`vueInjection` is not a string'
    console.warn(msg)
    throw msg
  }

  const result = indent(code, '  ')
  return `
<script>
${result}
  export default {
    components: {
      ${names}
    }${vueInjection ? ',' : ''}
    ${vueInjection}
  }
</script>`
}

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
