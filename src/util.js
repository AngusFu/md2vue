import indent from 'indent'

export function camelCase (str) {
  return str.replace(/[_.-](\w|$)/g, (_, x) => x.toUpperCase())
}

export function kebabCase (name) {
  return name
    .replace(/^[A-Z]/, m => m.toLowerCase())
    .replace(
      /([0-9a-zA-Z])[\b\s]*([0-9A-Z])/g,
      (m, g1, g2) => `${g1}-${g2.toLowerCase()}`
    )
}

export function pascalCase (name) {
  return kebabCase(name)
    .replace(/-([0-9a-zA-Z])/g, (m, g1) => g1.toUpperCase())
    .replace(/^[a-z]/, m => m.toUpperCase())
}

export const addESLint = (code) => `/* eslint-disable */
${code}
`

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

  return `
<script lang="buble">
${code}
var __exports = ${toJSON(documentInfo)};
__exports.components = {
${indent(names, 2)}
}
module.exports = __exports;
</script>`
}

export const wrapMarkup = (markup) => `<template>
<article class="markdown-body">
${markup}
</article >
</template>`

export const wrapVueCompiled = ({ tagName, compiled }) => {
  return `var ${camelCase(tagName)} = (function (module) {
${compiled}
  return module.exports;
})({});
`
}

export const wrapModule = ({ componentName, compiled, css }) => {
  componentName = kebabCase(componentName)

  return `/* eslint-disable */
var moduleExports = (function (module) {
  'use strict';
${indent(compiled.replace(/(\/\/\n\s*)+/g, ''), '  ')}
  var exports = module.exports
  exports.name = "${componentName}"
  exports.created = function () {
    var css = "${escape(css.replace(/\n/g, ' '))}"
    if (css) {
      this.____ = insert(css)
    }
  }
  exports.destroyed = function () {
    this.____ && this.____()
  }
  module.exports.install = function (Vue) {
    Vue.component(exports.name, exports)
  }

  return module.exports;

  function insert(css) {
    if (typeof document === 'undefined') return;
    var elem = document.createElement('style')
    elem.setAttribute('type', 'text/css')

    css = unescape(css)
    if ('textContent' in elem) {
      elem.textContent = css
    } else {
      elem.styleSheet.cssText = css
    }

    var head = document.getElementsByTagName('head')[0]
    head.appendChild(elem)
    return function () {
      head.removeChild(elem)
    }
  }
})({});
typeof exports === 'object' && typeof module !== 'undefined' && (module.exports = moduleExports);
typeof window !== void 0 && window.Vue && Vue.use(moduleExports);
this["${pascalCase(componentName)}"] = moduleExports;
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

function toJSON (obj) {
  if (typeof obj === 'function') {
    obj = obj.toString().replace(/\n\s*/g, ';')
    // short style: `a(){}`
    if (/^function /.test(obj) === false) {
      obj = 'function ' + obj
    }

    return obj
  }

  if (obj && typeof obj === 'object') {
    const arr = Object.keys(obj).map(key => `"${key}": ${toJSON(obj[key])}`)
    return `{${arr.join(',')}}`
  }

  return JSON.stringify(obj)
}
