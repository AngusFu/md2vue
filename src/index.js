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

export default (source) => {
  // todo
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

  return Promise.all(tasks)
    .then(rets => addESLint(rets.join('\n')))
    .then(code => {
      const names = demos.map(({tag}) => tag).join(', ')
      return Promise.all([
        Promise.resolve({ code, names }),
        bundler.pipe()
      ])
    })
    .then(([{ code, names }, css]) => {
      const content = [
        wrapMarkup(markup),
        wrapScript({ code, names }),
        wrapCSSText(css)
      ].join('\n')

      return content
    })
}
