import tranform from './transform'
import vueCompiler from './compiler'
import StyleBundler from './styleBundler'

import {
  addESLint,
  wrapCSSText,
  wrapScript,
  wrapMarkup,
  wrapVueCompiled
} from './util'

const defaults = {}
export default (source, opts = defaults) => {
  const { markup, demos } = tranform(source)
  const bundler = StyleBundler.from(vueCompiler)

  const tasks = demos.map(({ tag, raw, vue }) =>
    vueCompiler
      .compilePromise(vue)
      .then(compiled => wrapVueCompiled({
        tagName: tag,
        compiled
      }))
  )

  const { vueInjection } = opts

  return Promise.all(tasks)
    .then(rets => addESLint(rets.join('\n')))
    .then(code => {
      const names = demos.map(({tag}) => tag).join(', ')
      return Promise.all([
        Promise.resolve({ code, names, vueInjection }),
        bundler.pipe()
      ])
    })
    .then(([obj, css]) => {
      const content = [
        wrapMarkup(markup),
        wrapScript(obj),
        wrapCSSText(css)
      ].join('\n')

      return content
    })
}
