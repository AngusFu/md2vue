const { resolve } = require('path')
const { rollup } = require('rollup')
const vue = require('rollup-plugin-vue')
const commonjs = require('rollup-plugin-commonjs')
const memory = require('../rollup/pluginMemory')

module.exports = function compile (sfc, name) {
  let style = ''
  const file = resolve(process.cwd(), './virtual.vue')
  const config = {
    input: file,
    plugins: [
      memory({
        path: file,
        contents: sfc
      }),
      commonjs(),
      vue({
        css (content) {
          style = content
        },
        vue: {
          // fix: vue buble issue
          transforms: null
        }
      })
    ]
  }
  const output = {
    name,
    format: 'iife'
  }
  return rollup(config).then(bundle => bundle.generate(output)).then(ret => {
    return {
      style,
      script: ret.code
    }
  })
}
