import {
  compiler as vueCompiler
} from 'vueify'
import StyleBundler from './styleBundler'

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
    currentTask = deferred.promise

    const bundler = StyleBundler.from(vueCompiler)
    vueCompiler.compile(content, filePath, function (err, result) {
      if (err) {
        deferred.reject(err)
      } else {
        deferred.resolve({
          script: result,
          insertCSS: bundler.pipe()
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

function defer () {
  const deferred = {}
  const promise = new Promise(function (resolve, reject) {
    deferred.resolve = resolve
    deferred.reject = reject
  })
  deferred.promise = promise
  return deferred
}
