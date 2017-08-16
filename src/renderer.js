import marked from 'marked'
const { Renderer } = marked

export default () => {
  return new Renderer()
}

Renderer.prototype.heading = function (text, l) {
  return `<h${l}>${text}</h${l}>`
}

Renderer.prototype.link = function (href, title, text) {
  let relative = !/^(https?\:)?\/\//.test(href)
  let out = `<a href="${href}"`

  if (relative === false) {
    out += ` target="blank"`
  }

  if (title) {
    out += ` title="${title}"`
  }

  out += `>${text}</a>`

  return out;
}
