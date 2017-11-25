import Prism from 'prismjs'

/**
 * SEE https://github.com/PrismJS/prism
 * @param {String} code
 * @param {String} lang
 */
export default (code, lang = 'autoit') => {
  if (!Prism.languages[lang]) {
    try {
      require(`prismjs/components/prism-${lang}`)
    } catch (e) {
      lang = 'autoit'
      require('prismjs/components/prism-autoit')
    }
  }
  return Prism.highlight(code, Prism.languages[lang])
}

global.Prism = Prism
