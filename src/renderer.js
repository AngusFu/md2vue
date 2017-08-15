import marked from 'marked'
import hljs from 'highlight.js'

export default (Renderer) => {
  const renderer = new marked.Renderer()
  renderer.heading = heading
  return renderer
}

function heading (text, l) {
  return `<h${l}>${text}</h${l}>`
}

marked.setOptions({
  highlight: function (code, lang, callback) {
    console.log(hljs)
    // return hanabi(code)
  }
})
