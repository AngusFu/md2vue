const { resolve } = require('path')
const { rollup } = require('rollup')
const vue = require('rollup-plugin-vue')
const postcss = require('rollup-plugin-postcss')
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
      vue({
        styleToImports: true
      }),
      postcss({
        extract: false
      })
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
