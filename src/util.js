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
  <div class="doc-wrapper">
${indent(markup, '    ')}
  </div>
</template>`

export const wrapVueCompiled = ({ tagName, compiled }) => {
  return `const ${tagName} = (function (module) {
${indent(compiled, '  ')}
  return module.exports;
})({});
`
}
