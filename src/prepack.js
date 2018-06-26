// SEE https://unpkg.com/@std/esm@0.1.0/index.js

const Module = require('module')

const gunzipSync = require('zlib').gunzipSync
const join = require('path').join
const readFileSync = require('fs').readFileSync

// from https://github.com/facebook/prepack/blob/gh-pages/js/prepack.min.js
const filename = join(__dirname, '../assets/prepack.min.js.gz')
const content = gunzipSync(readFileSync(filename)).toString()
const code = `
${content}
module.exports = Prepack
`

const mod = new Module(filename, module.parent)
mod._compile(code, filename)

export default mod.exports
