import hljs from 'highlight.js'

/**
 * SEE https://github.com/PrismJS/prism
 * @param {String} code
 * @param {String} lang
 */
export default (code, lang) => {
  return hljs.highlight(lang, code).value
}
