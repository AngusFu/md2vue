import marked from 'marked'
// import hanabi from 'hanabi'

export default (Renderer) => {
  const renderer = new marked.Renderer()
  renderer.heading = heading
  return renderer
}

function heading (text, l) {
  return `<h${l}>${text}</h${l}>`
}

// marked.setOptions({
//   highlight: function (code, lang, callback) {
//     return hanabi(code)
//   }
// })
