import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import nodent from 'rollup-plugin-nodent'

const pkg = require('./package.json')
const external = Object.keys(pkg.dependencies)

const targets = [
  { dest: `dist/md2vue.common.js`, format: 'cjs' },
  { dest: `dist/md2vue.esm.js`, format: 'es' }
]
export default {
  entry: './src/index.js',
  targets,
  moduleName: 'md2vue',
  plugins: [
    resolve(),
    commonjs(),
    nodent(),
    buble()
  ],
  external (path) {
    if (path.indexOf('lodash/') === 0) {
      return true
    }
    return [...external, 'fs', 'path'].indexOf(path) > -1
  }
}
