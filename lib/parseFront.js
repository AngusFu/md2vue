const is = require('unist-util-is')
const { selectAll } = require('unist-util-select')
const toString = require('mdast-util-to-string')
const ofType = (node, type) => is({ type }, node)

module.exports = function yaml() {
  return function transformer(tree, file) {
    const headings = selectAll('heading[depth=1]', tree)
    const h1 = headings.length && headings[0]
    const heading = h1 ? toString(h1) : 'Not Found'

    const node = tree.children[0]
    const data = file.data || {}

    if (ofType(node, 'yaml')) {
      data.frontmatter = require('js-yaml').safeLoad(node.value)
    } else if (ofType(node, 'toml')) {
      data.frontmatter = require('toml').parse(node.value)
    } else {
      data.frontmatter = {}
    }

    data.frontmatter.heading = heading
  }
}
