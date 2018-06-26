import { kebabCase, pascalCase } from './util'
import Prepack from './prepack'

const { prepackSources } = Prepack
const suffix = `
typeof exports === 'object' && typeof module !== 'undefined' && (module.exports = component);
typeof window !== void 0 && window.Vue && Vue.use(component);
`

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
module.exports.install = function (Vue) {
  Vue.component(exports.name, exports)
}
return module.exports;
})({});
`
  const sources = [{
    filePath: '',
    sourceMapContents: '',
    fileContents: raw
  }]

  const { code } = prepackSources(sources)
  const str = '}).call(this);'
  const start = code.lastIndexOf('}).call(this);')
  const end = start + str.length

  return [
    'var __proxy = {};\n',
    code.slice(0, start),
    '}).call(__proxy);',
    code.slice(end, -1),
    `var component = __proxy.${varName};`,
    suffix
  ].join('\n')
}
