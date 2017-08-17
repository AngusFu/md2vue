import indent from 'indent'

export function camelCase (str) {
  return str.replace(/[_.-](\w|$)/g, (_,x) => {
    return x.toUpperCase()
  })
}

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

  const result = indent(code, 2)
  const injection = indent(vueInjection, 4)
  return `
<script>
${result}
  export default {
    components: {
${indent(names, 6)}
    }${vueInjection ? ',' : ''}
${injection}
  }
</script>`
}

export const wrapMarkup = (markup) => `<template>
<article class="markdown-body">
${markup}
</article >
</template>`

export const wrapVueCompiled = ({ tagName, compiled }) => {
  return `const ${camelCase(tagName)} = (function (module) {
${compiled}
  return module.exports;
})({});
`
}

export const wrapHljsCode = (code, lang) => `<pre v-pre class="lang-${lang}">
<code>${code}</code>
</pre>`

export function escape (html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
