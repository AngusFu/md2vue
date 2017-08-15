const vueCompiler = require('vueify').compiler

// Hack: avoid unneccesary vueify code
process.env.NODE_ENV = 'production'

vueCompiler.applyConfig({
  extractCSS: true,
  customCompilers: {
    buble (content, cb) {
      const { code } = require('buble').transform(content)
      cb(null, code.trim())
    }
  }
})

vueCompiler.compilePromise = (content, filePath) => {
  return new Promise((resolve, reject) => {
    vueCompiler.compile(content, filePath, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

module.exports = vueCompiler
