const { join } = require('path')
const fs = require('fs')
const mdPath = join(__dirname, './common.md')
const source = fs.readFileSync(mdPath).toString()
const md2vue = require('../')

md2vue(source, {
  toggleCode: false,
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
  require('fs').writeFileSync(join(__dirname, './common.vue'), content)
})
