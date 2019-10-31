const { selectAll } = require('unist-util-select')
const { slugify } = require('transliteration')
const toString = require('mdast-util-to-string')

module.exports = function yaml() {
  return function transformer(tree, file) {
    let lastH2 = null
    const level2 = []

    selectAll('heading:not([depth=1])', tree).forEach(heading => {
      const { depth } = heading
      if (depth > 3) return

      const text = toString(heading)
      const id = slugify(text)
      const node = { text, id, depth, children: [] }
      // slugify
      attchSlug(heading, id)

      // TOC
      if (depth === 2) {
        level2.push((lastH2 = node))
      } else if (depth === 3) {
        if (lastH2) lastH2.children.push(node)
      }
    })

    file.data.toc = level2
  }
}

function attchSlug(node, id) {
  if (!node.data) {
    node.data = {}
  }

  if (!node.data.hProperties) {
    node.data.hProperties = {}
  }

  node.data.id = id
  node.data.hProperties.id = id
}
