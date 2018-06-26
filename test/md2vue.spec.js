const { join } = require('path')
const { readFileSync } = require('fs')
const source = readFileSync(join(__dirname, './common.md')).toString()
const md2vue = require('../')

let id = 1333
let title = 'foo'

const inject = () => {
  const uid = `vue-demo-${id++}`
  return `<input id="${uid}" type="checkbox" /><label for="${uid}"></label>`
}

const extend = {
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

it('transforms markdown file correctly', async () => {
  const vue = await md2vue(source, {
    target: 'vue',
    highlight: 'prism',
    inject,
    extend
  })

  const js = await md2vue(source, {
    target: 'js',
    name: 'my-comp',
    highlight: 'prism',
    inject,
    extend
  })

  expect(vue).toMatchSnapshot()
  expect(js).toMatchSnapshot()
})

