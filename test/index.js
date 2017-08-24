const { join, resolve } = require('path')
const fs = require('fs')
const mdPath = join(__dirname, './common.md')
const source = fs.readFileSync(mdPath).toString()
const md2vue = require('../')

md2vue(source, {
  // target: 'js',
  // componentName: 'xxxxxx',
  toggleCode: true,
  vueInjection: `
head () {
  return {
    title: '组件'
  }
},
layout: 'component'
`
})
.then(content => {
  const output = join(__dirname, './common.vue')
  require('fs').writeFileSync(output, content)

  let dest = process.argv.slice(2)[0]
  if (dest) {
    dest = resolve(dest, 'demo.js')
    require('fs').writeFileSync(dest, content)
  }
})

md2vue(source, {
  toggleCode: true,
  vueInjection: `
head () {
  return {
    title: '组件'
  }
},
layout: 'component'
`
})
.then(content => {
  const output = join(__dirname, './common.vue')
  require('fs').writeFileSync(output, content)

  let dest = process.argv.slice(2)[0]
  if (dest) {
    dest = resolve(dest, 'demo.vue')
    require('fs').writeFileSync(dest, content)
  }
})

