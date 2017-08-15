import {
  compiler as vueCompiler
} from 'vueify'

// Hack: avoid unneccesary vueify code
process.env.__NODE_ENV = process.env.NODE_ENV
process.env.NODE_ENV = 'production'

vueCompiler.applyConfig({
  extractCSS: true,
  customCompilers: {
    buble (content, cb) {
      const { code } = require('buble').transform(content)
      const ret = code
        .replace(/\n{2,}/g, '\n')
        .replace(/^\s+/, '  ')
        .replace(/\s+$/, '')

      cb(null, ret)
    }
  }
})

vueCompiler.compilePromise = (content = '', filePath = '') => {
  return new Promise((resolve, reject) => {
    vueCompiler.compile(content, filePath, (err, result) => {
      process.env.NODE_ENV = process.env.__NODE_ENV

      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

export default vueCompiler
