const { resolve } = require('path')
const { rollup } = require('rollup')
const vue = require('rollup-plugin-vue')
const commonjs = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')
const css = require('rollup-plugin-css-only')
const memory = require('../rollup/pluginMemory')

const runtimeHelper = require.resolve('vue-runtime-helpers')

module.exports = function compile(sfc, name) {
  let style = ''
  const file = resolve(process.cwd(), './virtual.vue')
  const config = {
    input: file,
    plugins: [
      memory({
        path: file,
        contents: sfc
      }),
      nodeResolve(),
      commonjs(),
      css({
        output(styleText) {
          style = styleText
        }
      }),
      vue({
        css: false,
        vue: {
          // fix: vue buble issue
          transforms: null
        },
        normalizer: `require("${runtimeHelper}").normalizeComponent`
      })
    ]
  }
  const output = {
    name,
    format: 'iife'
  }
  return rollup(config)
    .then(bundle => bundle.generate(output))
    .then(ret => {
      return {
        style,
        script: ret.output[0].code
      }
    })
}
