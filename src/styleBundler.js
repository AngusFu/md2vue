class StyleBundler {
  constructor () {
    this._css = ''
    this._handler = this._handler.bind(this)
  }

  _handler ({ style }) {
    this._css += style
  }

  from (emitter, type) {
    if (typeof this._remove === 'function') {
      this._remove()
    }

    emitter.on(type, this._handler)

    this._remove = () => {
      emitter.removeListener(type, this._handler)
      this._css = ''
    }
  }

  pipe (fn) {
    const css = this._css
    fn(css)
    this._remove()
    return Promise.resolve()
  }
}

StyleBundler.from = function (emitter, type) {
  const bundler = new StyleBundler()
  bundler.from(emitter, type)
  return bundler
}

module.exports = StyleBundler
