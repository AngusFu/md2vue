const is = require('unist-util-is')
const visit = require('unist-util-visit')
const source = require('unist-util-source')
const { select, matches } = require('hast-util-select')

const classnames = require('classnames')
const compileInlineDemo = require('./inline/compile')
const normalizeInlineDemo = require('./inline/normalize')

module.exports = function vueTransform () {
  return transformer
}

function transformer (tree, file, next) {
  let uid = 0
  const promises = []
  visit(tree, 'element', visitor)

  Promise.all(promises).then(results => {
    const components = results
      .map(({ name, code }) => `${name}: (function(){${code}return ${name}}())`)
    file.data.components = '{\n' + components.join(',\n') + '\n}'
    next(null, tree, file)
  }).catch(e => {
    next(e, tree, file)
  })

  function visitor (node) {
    if (!is({ tagName: 'pre' }, node)) {
      return
    }

    const codeNode = select('pre>code:only-child', node)
    if (!codeNode || !matches('.language-html', codeNode)) {
      return
    }

    const raw = source(codeNode, file)
      .trim()
      .split(/\n/)
      .slice(1, -1)
      .join('\n')

    const name = `VueApp${uid++}`
    const { sfc, demoOnly } = normalizeInlineDemo(raw)
    const className = classnames({
      'vue-demo-block': true,
      'vue-demo-block-demo-only': demoOnly
    })

    const promise = compileInlineDemo(sfc, name).then(code => {
      const siblings = tree.children
      const index = siblings.indexOf(node)

      const replaceNode = {
        type: 'element',
        tagName: 'div',
        children: [],
        properties: { className }
      }

      replaceNode.children.push({
        tagName: name,
        type: 'element'
      })

      if (demoOnly === false) {
        replaceNode.children.push(node)
      }

      siblings[index] = replaceNode
      return { name, code }
    })
    promises.push(promise)
  }
}