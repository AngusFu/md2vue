// see https://github.com/egoist/hanabi/blob/master/src/index.js
const defaultColors = ['23AC69', '91C132', 'F19726', 'E8552D', '1AAB8E', 'E1147F', '2980C1', '1BA1E6', '9FA0A0', 'F19726', 'E30B20', 'E30B20', 'A3338B']

export default function (input, {
  colors = defaultColors
} = {}) {
  let index = 0
  const cache = {}
  const wordRe = /[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|\w+/
  const specialChar = /<|>/

  const re = new RegExp(`(${wordRe.source}|${specialChar.source})|(${jsCommentRe().source})`, 'gmi')
  return input
  .replace(re, (m, word, cm) => {
    if (cm) {
      return toComment(cm)
    }

    if (word === '<') {
      return '<span>&lt;</span>'
    }

    if (word === '>') {
      return '<span>&gt;</span>'
    }

    let color
    if (cache[word]) {
      color = cache[word]
    } else {
      color = colors[index]
      cache[word] = color
    }

    const out = `<span style="color: #${color}">${word}</span>`
    index = ++index % colors.length
    return out
  })
}

function toComment (cm) {
  return `<span style="color: slategray">${cm}</span>`
}

function jsCommentRe () {
  return new RegExp('(?:' + jsCommentRe.line().source + ')|(?:' + jsCommentRe.block().source + ')', 'gm')
}

jsCommentRe.line = function () {
  return /(?:^|\s)\/\/(.+?)$/gm
}

jsCommentRe.block = function () {
  return /\/\*([\S\s]*?)\*\//gm
}
