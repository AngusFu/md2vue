const { join } = require('path')
const fs = require('fs')
const mdPath = join(__dirname, './common.md')
const source = fs.readFileSync(mdPath).toString()
const md2vue = require('../')

md2vue(source, {
  vueInjection: `
head() {
  return '测试'
},
layout: "component"
`
})
.then(content => {
  require('fs').writeFileSync(join(__dirname, './common.vue'), content)
})