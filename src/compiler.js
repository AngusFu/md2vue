import { compiler as vueCompiler } from 'vueify'
import StyleBundler from './style-bundler'
import { defer } from './util'

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

const queue = []
let currentTask = null

vueCompiler.compilePromise = (content = '', filePath = '') => {
  const deferred = defer()

  const task = function () {
    const bundler = StyleBundler.from(vueCompiler)
    currentTask = deferred.promise

    vueCompiler.compile(content, filePath, (err, result) => {
      if (err) {
        deferred.reject(err)
      } else {
        deferred.resolve({
          script: result,
          style: bundler.readOnce()
        })
      }

      process.nextTick(() => {
        currentTask = null
        if (queue.length) {
          queue.shift()()
        }
      })
    })
  }

  if (currentTask) {
    queue.push(task)
  } else {
    task()
  }

  return deferred.promise
}

export default vueCompiler
