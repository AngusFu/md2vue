const { join } = require('path')
const { readFileSync, writeFileSync } = require('fs')
const source = readFileSync(join(__dirname, './test/common.md')).toString()
const md2vue = require('./')
const dest = './docs'

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

;(async () => {
  /**
   * transform to .vue file
   */
  const vue = await md2vue(source, {
    target: 'vue',
    highlight: 'prism',
    extend,
    inject
  })

  /**
   * transform to js file
   */
  const js = await md2vue(source, {
    name: 'my-comp',
    target: 'js',
    highlight: 'prism',
    extend,
    inject
  })

  if (dest) {
    writeFileSync(join(dest, 'assets/demo.vue'), vue)
    writeFileSync(join(dest, 'assets/common.component.js'), js)
  }
})()
