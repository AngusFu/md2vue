import transform from './transform'
import vueCompiler from './compiler'
import StyleBundler from './StyleBundler'

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
  const bundler = StyleBundler.from(vueCompiler)
  const tasks = demos.map(({ tag, raw, vue, shadowCss }, index) =>
    vueCompiler
      .compilePromise(vue, tag)
      .then(compiled => wrapVueCompiled({
        tagName: tag,
        shadowCss,
        compiled
      }))
      .then(compiled => ({ compiled, shadowCss }))
  )

  return Promise.all(tasks)
    .then(rets => {
      const code = rets.map(item => item.compiled).join('\n')
      const styles = rets.map(item => item.shadowCss)

      return {
        styles,
        code: addESLint(code)
      }
    })
    .then(({ code, styles }) => {
      const names = demos.map(({ tag }) => {
        return `'${tag}': ${camelCase(tag)}`
      }).join(',\n')
      return Promise.all([
        Promise.resolve({ code, styles, names, documentInfo, shadow }),
        bundler.pipe()
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
        .then(compiled => wrapModule({
          componentName,
          compiled,
          css
        }))
    })
}
