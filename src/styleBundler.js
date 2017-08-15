const TYPE = 'style'

class StyleBundler {
  constructor () {
    this._css = ''
    this._handler = this._handler.bind(this)
  }

  _handler ({ style }) {
    this._css += '\n' + style
  }

  from (emitter) {
    if (typeof this._remove === 'function') {
      this._remove()
    }

    emitter.on(TYPE, this._handler)

    this._remove = () => {
      emitter.removeListener(TYPE, this._handler)
      this._css = ''
    }
  }

  pipe (fn) {
    const css = this._css.trim()
    if (typeof fn === 'function') {
      fn(css)
    }
    this._remove()
    return Promise.resolve(css)
  }
}

StyleBundler.from = function (emitter) {
  const bundler = new StyleBundler()
  bundler.from(emitter, TYPE)
  return bundler
}

export default StyleBundler
