import { kebabCase, pascalCase } from './util'
import prepack from './prepack'

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
  var css = ${JSON.stringify(style)}
  this.__clean = insert(css)
}
exports.destroyed = function () {
  this.__clean()
}
`
  const varName = pascalCase(componentName)
  const raw = `
${varName} = (function (module) {
${script}
var exports = module.exports
exports.name = "${componentName}"
${injectCSS || ''}
exports.install = function (Vue) {
  Vue.component(exports.name, exports)
}
return module.exports;
})({});
`

  return prepack({
    content: raw,
    prefix: 'var __proxy = {};',
    suffix: `var component = __proxy.${varName};
typeof exports === 'object' && typeof module !== 'undefined' && (module.exports = component);
typeof window !== void 0 && window.Vue && Vue.use(component);
`,
    globalName: '__proxy'
  })
}
