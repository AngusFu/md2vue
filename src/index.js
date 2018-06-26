import nodent from 'nodent'
import map from 'lodash-es/map'

import doc2js from './doc2js'
import doc2sfc from './doc2sfc'
import transform from './transform'
import vueCompiler from './compiler'

// inject nodent support
nodent()

const defaults = {
  target: 'vue',
  highlight: 'highlight.js'
}

export default async function (source, config = {}) {
  config.name = config.name || config.componentName
  config.extend = config.extend || config.documentInfo
  config.inject = config.inject || config.customMarkups

  if (config.componentName) {
    console.warn('`componentName` is deprecated, use `name` instead.')
  }

  if (config.documentInfo) {
    console.warn('`documentInfo` is deprecated, use `extend` instead.')
  }

  if (config.customMarkups) {
    console.warn('`customMarkups` is deprecated, use `inject` instead.')
  }

  config = Object.assign({}, defaults, config)
  const { name, target, extend } = config
  const { markup, demos } = transform(source, config)

  const demoApps = []
  for (let demo of demos) {
    const { vue, tag } = demo
    const { script, style } = await compileVue(vue, tag)

    demoApps.push({
      style,
      script: wrapVueCompiled({
        tagName: tag,
        compiled: script
      })
    })
  }

  const content = doc2sfc({
    docInfo: extend,
    html: markup,
    style: map(demoApps, 'style').join('\n'),
    script: map(demoApps, 'script').join('\n'),
    components: map(demos, ({tag}) => `'${tag}': ${tag}`).join(',\n')
  })

  if (!target || target === 'vue') {
    return content
  }

  if (!name) {
    throw new Error('[Error] `name` must be specified!')
  }

  const { script, style } = await compileVue(content, name)
  return doc2js({
    script,
    style,
    name
  })
}

function compileVue (content, path) {
  return vueCompiler.compilePromise(content, path)
}

function wrapVueCompiled ({ tagName, compiled }) {
  return `var ${tagName} = (function (module) {
${compiled}
return module.exports;
})({});
`
}
