const { resolve } = require('path')
const { rollup } = require('rollup')
const vue = require('rollup-plugin-vue').default
const memory = require('../rollup/pluginMemory')

module.exports = function compile (sfc, name) {
  const file = resolve(process.cwd(), './virtual.vue')
  const config = {
    input: file,
    plugins: [
      memory({
        path: file,
        contents: sfc
      }),
      // TODO
      // customize compiler
      vue()
    ]
  }
  const output = {
    name,
    format: 'iife'
  }
  return rollup(config)
    .then(bundle => bundle.generate(output))
    .then(ret => ret.code)
}
