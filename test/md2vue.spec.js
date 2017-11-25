const { join } = require('path')
const { readFileSync } = require('fs')
const source = readFileSync(join(__dirname, './common.md')).toString()
const md2vue = require('../')

let id = 1333
let title = 'foo'

const customMarkups = () => {
  const uid = `vue-demo-${id++}`
  return `<input id="${uid}" type="checkbox" /><label for="${uid}"></label>`
}

const documentInfo = {
  // eslint-disable-next-line
  head: new Function(`return { title: '${title}' }`),
  layout: 'component',
  directives: {
    'effect-only': {
      inserted (el) {
        console.log(el)
      }
    }
  }
}

it('transform markdown file to vue file correctly', async () => {
  const vue = await md2vue(source, {
    target: 'vue',
    highlight: 'prism',
    customMarkups,
    documentInfo
  })
  expect(vue).toMatchSnapshot()
})

it('transform markdown file to javascript correctly', async () => {
  const js = await md2vue(source, {
    target: 'js',
    componentName: 'common-comp',
    highlight: 'prism',
    customMarkups,
    documentInfo
  })
  expect(js).toMatchSnapshot()
})
