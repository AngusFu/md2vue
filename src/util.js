import indent from 'indent'

export function camelCase (str) {
  return str.replace(/[_.-](\w|$)/g, (_, x) => x.toUpperCase())
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
  documentInfo = {}
}) => {
  if (typeof documentInfo !== 'object') {
    const msg = '`documentInfo` is not an object'
    console.warn(msg)
    throw msg
  }

  const result = indent(code, 2)
  const injection = Object.keys(documentInfo).map((key) => {
    let val = documentInfo[key]

    if (typeof val === 'function') {
      val = val.toString()
      // short style: `a(){}`
      if (/^function /.test(val) === false) {
        val = 'function ' + val
      }
    } else {
      val = JSON.stringify(val)
    }

    return `  ${key}: ${val}`
  })

  return `
<script>
${result}
module.exports = {
${injection.join(',\n')}
}
module.exports.components = {
${indent(names, 2)}
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

export const wrapModule = ({ componentName, compiled, css }) => {
  return `module.exports = (function (module) {
${compiled}
  var exports = module.exports
  exports.name = "${componentName}"
  exports.methods = {
    beforeCreate: function () {
      const css = "${css.replace(/\n/g, ' ')}"
      if (css) {
        this._ic_ = insert(css)
      }
    },
    destroyed: function () {
      this._ic_ && this._ic_()
    }
  }
  module.exports.install = function (Vue) {
    Vue.component(exports.name, exports)
  }
  if (typeof window !== void 0 && window.Vue) {
    Vue.use(exports )
  }
  return module.exports;

  function insert(css) {
    var elem = document.createElement('style')
    elem.setAttribute('type', 'text/css')

    if ('textContent' in elem) {
      elem.textContent = css
    } else {
      elem.styleSheet.cssText = css
    }

    document.getElementsByTagName('head')[0].appendChild(elem)
    return function () {
      document.getElementsByTagName('head')[0].removeChild(elem)
    }
  }
  })({});
`
}

export const wrapHljsCode = (code, lang) => `<pre v-pre class="lang-${lang}"><code>${code}</code></pre>`

export function escape (html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
