import marked from 'marked'

export default (Renderer) => {
  const renderer = new marked.Renderer()
  renderer.heading = heading
  return renderer
}

function heading (text, l) {
  return `<h${l}>${text}</h${l}>`
}
