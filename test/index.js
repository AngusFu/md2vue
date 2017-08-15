const { join } = require('path')
const fs = require('fs')
const mdPath = join(__dirname, './common.md')
const source = fs.readFileSync(mdPath).toString()
const transform = require('../')

transform(source)
.then(content => {
  require('fs').writeFileSync('./test.vue', content)
})
