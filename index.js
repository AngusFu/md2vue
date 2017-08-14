const fs = require('fs')
const marked = require('marked')
const buble = require('buble')
const vueCompile = require('vue-component-compiler')

vueCompile.register({
  lang: 'es',
  type: 'script',
  compile: function (content, cb) {
    const { code } = buble.transform(content)
    cb(null, code)
  }
})
vueCompile.register({
  lang: 'html',
  type: 'template',
  compile: function (content, cb) {
    cb(null, '`' + content + '`')
  }
})

const reStyle = /<style>([\s\S]+)<\/style>/
const reScript = /<script>([\s\S]+)<\/script>/
const reTemplate = /<template>([\s\S]+)<\/template>/
const parseVueDemo = (code) => {
  const styleMatch = reStyle.exec(code)
  const scriptMatch = reScript.exec(code)
  const templateMatch = reTemplate.exec(code)
  
  const style = styleMatch ? styleMatch[1] : ''

  let script = scriptMatch ? scriptMatch[1] : ''
  script = script.replace(/export default/, 'module.exports =')

  let template = templateMatch ? templateMatch[0] : ''
  // case where `<template>` absent
  if (template === '') {
    template = code.replace(reStyle, '').replace(reScript, '')
  }
  return {
    style,
    script,
    template
  }
}
const toVue = (source, path) => {
  let id = 0
  const codeMap = {}
  const identity = Buffer.from(path).toString('base64').replace(/=/g, '')
  const prefix = 'VueDemoAs' + identity
  const renderer = new marked.Renderer()
  renderer.code = function (code, lang) {
    const { style, script, template } = parseVueDemo(code)
    const vueComponent = `<style scoped>${style}</style>
    <template lang="html">${template}</template>
    <script lang="es">${script}</script>`
    const tag = prefix + (id++)
    codeMap[tag] = vueComponent
    return  `<${tag}></${tag}>`
  }
  const result = marked(source, { renderer })
  return {
    codeMap,
    result
  }
}
export default function (opt = {}) {
  return {
    name: 'doc-vue',
    resolevId (id) {
      console.log('resolevId: ', id)
    },
    load (id) {
      if (!/\.md$/.test(id)) return null
    },
    transform (source, id) {
      if (!/\.md$/.test(id)) return null

      const { result, codeMap }  = toVue(source, id)
      const imported = Object.keys(codeMap).map((key, vue) => {
        vueCompile.compile(codeMap[key], (err, result) => {
          if (!err) {
            fs.writeFileSync(`./${key}`, `const ${key} = (function (module) {${result};return module.exports;})({ exports: {}})`)
          }
        })
        return `import ${key} from '${key}';`
      }).join('\n')

      const vue = `<template><div class="doc-wrapper">
        ${result}
      </div></template><script>
      ${imported}
      </script>`
      return {
        code: 'export default ' + JSON.stringify(result)
      }
    },
    ongenerate () {

    }
  }
}