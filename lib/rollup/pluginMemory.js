/**
 * https://github.com/TrySound/rollup-plugin-memory/blob/master/src/index.js
 */
function isPath(path) {
  return typeof path === 'string'
}

function isContents(contents) {
  return typeof contents === 'string' || Buffer.isBuffer(contents)
}

module.exports = function memory(config = {}) {
  let path = isPath(config.path) ? config.path : null
  let contents = isContents(config.contents) ? String(config.contents) : null

  return {
    // do not use `options` as name for 1st argument
    options(rollupOptions) {
      const { input } = rollupOptions
      if (input && typeof input === 'object') {
        if (isPath(input.path)) {
          path = input.path
        }
        if (isContents(input.contents)) {
          contents = String(input.contents)
        }
      }
      rollupOptions.input = path
    },

    resolveId(id) {
      if (path === null || contents === null) {
        throw Error(
          "'path' should be a string and 'contents' should be a string of Buffer"
        )
      }
      if (id === path) {
        return path
      }
    },

    load(id) {
      if (id === path) {
        return contents
      }
    }
  }
}
