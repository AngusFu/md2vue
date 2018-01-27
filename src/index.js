import transform from './transform'
import vueCompiler from './compiler'

import {
  camelCase,
  addESLint,
  wrapCSSText,
  wrapScript,
  wrapMarkup,
  wrapVueCompiled,
  wrapModule
} from './util'

const defaults = {
  shadow: false,
  target: 'vue',
  highlight: 'highlight.js'
}

export default function (source, opts = {}) {
  const config = Object.assign({}, defaults, opts)
  const {
    target,
    shadow,
    documentInfo,
    componentName
  } = config

  const { markup, demos } = transform(source, config)
  const tasks = demos.reduce((promise, { tag, raw, vue, shadowCss }, index) => {
    return promise.then((arr) => {
      return vueCompiler.compilePromise(vue, tag)
        .then(({
          script,
          insertCSS
        }) => {
          return {
            script: wrapVueCompiled({
              tagName: tag,
              shadowCss,
              compiled: script
            }),
            insertCSS
          }
        })
        .then(({ script, insertCSS }) => {
          arr.push({ script, shadowCss, insertCSS })
          return arr
        })
    })
  }, Promise.resolve([]))

  return tasks
    .then(rets => {
      const code = rets.map(item => item.script).join('\n')
      const styles = rets.map(item => item.shadowCss)
      const insertStyles = rets.map(item => item.insertCSS).join('\n')
      return {
        styles,
        code: addESLint(code),
        insertStyles
      }
    })
    .then(({ code, styles, insertStyles }) => {
      const names = demos.map(({ tag }) => {
        return `'${tag}': ${camelCase(tag)}`
      }).join(',\n')
      return Promise.all([
        Promise.resolve({ code, styles, names, documentInfo, shadow }),
        Promise.resolve(insertStyles)
      ])
    })
    .then(([obj, css]) => {
      const content = [
        wrapCSSText(css),
        wrapMarkup(markup),
        wrapScript(obj)
      ].join('\n')

      if (!target || target === 'vue') {
        return content
      }

      if (!componentName) {
        throw new Error('[Error] `componentName` must be specified!')
      }

      return vueCompiler
        .compilePromise(content, componentName)
        .then(({ script, insertCSS }) => wrapModule({
          componentName,
          compiled: script,
          css: insertCSS
        }))
    })
}
