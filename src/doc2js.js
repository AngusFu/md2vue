import { kebabCase, pascalCase } from './util'

export default function ({ name, script, style }) {
  const componentName = kebabCase(name)

  const injectCSS = style && `
  var insert = function (css) {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    var elem = document.createElement('style')
    elem.setAttribute('type', 'text/css')
    elem.innerHTML = css

    var head = document.getElementsByTagName('head')[0]
    head.appendChild(elem)
    return function () {
      head.removeChild(elem)
    }
  }
  exports.created = function () {
    var css = '${JSON.stringify(style)}'
    this.__clean = insert(css)
  }
  exports.destroyed = function () {
    this.__clean()
  }
`

  return `/* eslint-disable */
var moduleExports = (function (module) {
  'use strict';
${script}
  var exports = module.exports
  exports.name = "${componentName}"
${injectCSS || ''}
  module.exports.install = function (Vue) {
    Vue.component(exports.name, exports)
  }
  return module.exports;
})({});
typeof exports === 'object' && typeof module !== 'undefined' && (module.exports = moduleExports);
typeof window !== void 0 && window.Vue && Vue.use(moduleExports);
this["${pascalCase(componentName)}"] = moduleExports;
`
}
