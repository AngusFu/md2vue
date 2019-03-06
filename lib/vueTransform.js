const is = require('unist-util-is')
const visit = require('unist-util-visit')
const source = require('unist-util-source')
const { select, matches } = require('hast-util-select')

const classnames = require('classnames')
const compileInlineDemo = require('./inline/compile')
const normalizeInlineDemo = require('./inline/normalize')

module.exports = function vueTransform() {
  return transformer
}

function transformer(tree, file, next) {
  let uid = 0
  const promises = []
  visit(tree, 'element', visitor)

  Promise.all(promises)
    .then(results => {
      const components = results.map(
        ({ name, script }) => `${name}: (function(){${script}return ${name}}())`
      )
      file.data.styles = results.map(({ style }) => style).join('')
      file.data.components = '{\n' + components.join(',\n') + '\n}'
      next(null, tree, file)
    })
    .catch(e => {
      next(e, tree, file)
    })

  function visitor(node) {
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

    const promise = compileInlineDemo(sfc, name).then(result => {
      result.name = name

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
        const { userOption } = file
        if (userOption && userOption.gistInjection) {
          replaceNode.children.push({
            type: 'raw',
            tagName: name,
            value: userOption.gistInjection
          })
        }
        replaceNode.children.push(node)
        node.properties.className = 'vue-demo-source-code'
      }

      siblings[index] = replaceNode

      return result
    })
    promises.push(promise)
  }
}
