import nodent from 'nodent'
import map from 'lodash/map'

import prepack from './prepack'
import transform from './transform'
import vueCompiler from './compiler'

import md2sfc from './md2sfc'
import compileMdSFC from './compile-md-sfc'

// inject nodent support
nodent()

const defaults = {
  target: 'vue',
  highlight: 'highlight.js'
}

export default async function (source, config = {}) {
  checkDeprecation(config)
  config = Object.assign({}, defaults, config)

  const { name, target, extend } = config
  const { html, appComponents } = await transform(source, config)

  const vueApps = []
  for (let { vue, tag } of appComponents) {
    const { script, style } = await compileVue(vue, tag)

    vueApps.push({
      style,
      script: wrapVueCompiled({
        tagName: tag,
        compiled: script
      })
    })
  }

  const content = md2sfc({
    html,
    docInfo: extend,
    style: map(vueApps, 'style').join('\n'),
    script: map(vueApps, 'script').join('\n'),
    components: map(appComponents, ({tag}) => `'${tag}': ${tag}`).join(',\n')
  })

  if (!target || target === 'vue') {
    return content
  }

  if (!name) {
    throw new Error('[Error] `name` must be specified!')
  }

  const { script, style } = await compileVue(content, name)
  return compileMdSFC({ script, style, name })
}

function checkDeprecation (config) {
  if (config.componentName) {
    console.warn('`componentName` is deprecated, use `name` instead.')
  }

  if (config.documentInfo) {
    console.warn('`documentInfo` is deprecated, use `extend` instead.')
  }

  if (config.customMarkups) {
    console.warn('`customMarkups` is deprecated, use `inject` instead.')
  }

  config.name = config.name || config.componentName
  config.extend = config.extend || config.documentInfo
  config.inject = config.inject || config.customMarkups
}

function compileVue (content, path) {
  return vueCompiler.compilePromise(content, path)
}

function wrapVueCompiled ({ tagName, compiled }) {
  const code = `${tagName} = (function (module) {
${compiled}
return module.exports
})({});
`
  return prepack({
    content: code,
    prefix: `var ${tagName} = {};`,
    suffix: `${tagName} = ${tagName}.${tagName};\n`,
    globalName: tagName
  })
}
