const { join } = require('path')
const VFile = require('vfile')
const toVFile = require('to-vfile')
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
const rehypeHighlight = require('rehype-highlight')
const rehypePrism = require('@mapbox/rehype-prism')

const compileTemplate = require('./compileTemplate')
const styleInjectFile = join(__dirname, 'styleInject.js').replace(/\\/g, '/')

module.exports = function process(path, option, callback) {
  if (typeof option === 'function') {
    callback = option
    option = {}
  }

  let file = null
  // 如果是字符串 则直接加载
  if (typeof path === 'string') {
    file = toVFile.readSync(path)
  } else {
    if (typeof path === 'function') {
      // 视为 VFile 构建函数
      file = path(VFile)
    } else {
      // 否则视为 vfile options 对象
      file = VFile(path)
    }
  }

  file.userOption = option

  // vfile 支持预处理
  option.preprocess = option.preprocess || (f => f)
  file = option.preprocess(file) || file

  // 与 vuepress-plugin-playground 整合
  file.contents = file.contents
    .toString()
    .replace(/(```[a-z]*\s+)({([\d,-]+)})?/g, (_, g1) => g1)
    .replace(/```(html|vue)\s+@(playground|demo)\s/g, m => {
      return m.replace(/@(playground|demo)/, '')
    })

  let highlight = null
  const hlOpt = option.highlight
  if (!hlOpt || hlOpt === 'highlight') {
    highlight = rehypeHighlight
  } else if (hlOpt === 'prism') {
    highlight = rehypePrism
  } else {
    if (typeof hlOpt === 'function') {
      highlight = hlOpt
    } else {
      highlight = require(hlOpt)
    }
  }

  const processor = getProcessor({ highlight })
  // 支持插件拓展
  option.extendProcessor = option.extendProcessor || (p => p)
  const newProcessor = option.extendProcessor(processor)

  newProcessor.process(file, function(err, file) {
    if (err) {
      return callback(err)
    }

    if (file) {
      const { components, styles, frontmatter } = file.data
      const className = ['markdown-body', frontmatter.pageClass || ''].join(' ')
      const content = `<article class="${className}">${file.contents}</article>`
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

function getProcessor({ highlight }) {
  return (
    unified()
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
  )
}
