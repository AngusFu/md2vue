const { join } = require('path')
const vfile = require('to-vfile')
const unified = require('unified')
const select = require('unist-util-select')

const math = require('remark-math')
const markdown = require('remark-parse')
const remarkAttr = require('remark-attr')
const remark2rehype = require('remark-rehype')
const frontmatter = require('remark-frontmatter')
let externalLinks = require('remark-external-links')
externalLinks = externalLinks.default || externalLinks
const normalizeHeadings = require('remark-normalize-headings')
const autoLinkHeadings = require('remark-autolink-headings')

const raw = require('rehype-raw')
const katex = require('rehype-katex')
const format = require('rehype-format')
const stringify = require('rehype-stringify')
const highlight = require('rehype-highlight')

const processor = unified()
  .use(markdown)
  .use(remarkAttr)
  .use(normalizeHeadings)
  .use(frontmatter, ['yaml'])
  .use(require('./customTOC'))
  .use(require('./parseFront'))
  .use(autoLinkHeadings)
  .use(externalLinks)
  .use(math)
  .use(remark2rehype, { allowDangerousHTML: true })
  // add `v-pre` for code blocks
  .use(
    () =>
      function transformer(tree) {
        const pres = select(tree, 'element[tagName=pre]')
        pres.forEach(pre => {
          const { children, properties } = pre
          if (children.length === 1 && children[0].tagName === 'code') {
            properties['v-pre'] = true
            delete properties['vpre']
          }
        })
      }
  )
  .use(highlight)
  .use(katex)
  .use(require('./vueTransform'))
  .use(raw)
  .use(format)
  .use(stringify)
  .freeze()

const compileTemplate = require('./compileTemplate')
const styleInjectFile = join(__dirname, 'styleInject.js')

module.exports = function process(path, option, callback) {
  if (typeof option === 'function') {
    callback = option
  }

  const file = vfile.readSync(path)
  file.userOption = option
  // 与 vuepress-plugin-playground 整合
  file.contents = file.contents
    .toString()
    .replace(/```(html|vue)\s+@(playground|demo)\s/g, m => {
      return m.replace(/@(playground|demo)/, '')
    })
  processor.process(file, function(err, file) {
    if (err) {
      return callback(err)
    }

    if (file) {
      const { components, styles } = file.data
      const content = `<article class="markdown-body">${
        file.contents
      }</article>`
      const { render, staticRenderFns } = compileTemplate(content)

      file.extname = '.js'
      file.contents = [
        `const styleInject = require('${styleInjectFile}')`,
        `const styles = ${styles ? JSON.stringify(styles) : null};`,
        'module.exports = {',
        `  render: ${render},`,
        `  components: ${components},`,
        `  staticRenderFns: ${staticRenderFns},`,
        `  mounted () {`,
        `   this.cleanup = styles && styleInject(styles) `,
        `  },`,
        `  destroyed () {`,
        `    this.cleanup && this.cleanup()`,
        `  }`,
        '}'
      ].join('\n')

      callback(null, file)
    }
  })
}
