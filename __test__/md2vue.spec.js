const Module = require('module')
const { resolve } = require('path')
const { promisify } = require('util')
const { mount } = require('@vue/test-utils')
const md2vue = promisify(require('../lib'))

const mountVfile = vfile => {
  const mod = new Module(vfile.path, module.parent)
  mod._compile(vfile.contents, vfile.path)
  return mount(mod.exports)
}

describe('md2vue', () => {
  it('works', async () => {
    const path = resolve(__dirname, './fixtures/test.md')
    const file = await md2vue(path)

    expect(file.contents.indexOf('@demo')).toBe(-1)
    expect(file.extname).toEqual('.js')
    expect(file.data.toc.length).toEqual(3)
    expect(file.data.frontmatter).toEqual({
      heading: 'Test',
      pageClass: 'my-custom-class'
    })

    expect(file.data.styles).toContain('button')

    const app = mountVfile(file)
    expect(app.classes()).toContain('markdown-body')
    expect(app.classes()).toContain('my-custom-class')
    expect(app.contains('pre.vue-demo-source-code > code.language-html')).toBe(
      true
    )
    expect(app.find('.vue-demo > button').text()).toBe('Test Button')
  })
})
