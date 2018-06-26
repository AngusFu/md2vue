const kEvent = 'style'

export default class StyleBundler {
  constructor () {
    this.CSSText = ''
    this.onStyleReceived = this.onStyleReceived.bind(this)
  }

  onStyleReceived ({ style }) {
    this.CSSText += '\n' + style
  }

  reset () {
    this.CSSText = ''

    if (this.source) {
      this.source.removeListener(kEvent, this.onStyleReceived)
    }
  }

  setSource (source) {
    this.reset()
    this.source = source
    source.on(kEvent, this.onStyleReceived)
    return this
  }

  readOnce (fn) {
    const CSSText = this.CSSText.trim()

    if (typeof fn === 'function') {
      fn(CSSText)
    }

    this.reset()
    return CSSText
  }
}

StyleBundler.from = source => (new StyleBundler()).setSource(source)
