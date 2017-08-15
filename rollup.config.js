import buble from 'rollup-plugin-buble'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

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
    buble()
  ],
  external: [...external, 'fs']
}
