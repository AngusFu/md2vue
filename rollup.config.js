import docVue from './index'
import buble from 'rollup-plugin-buble'

export default {
  entry: './test/index.js',
  dest: './test/generated.js',
  format: 'iife',
  moduleName: 'docVue',
  plugins: [
    docVue(),
    buble()
  ]
}