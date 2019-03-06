/**
 * 用于从 Vue SFC 代码块中提取出不同部分
 */
module.exports = function normalizeVueDemo(code) {
  const reStyle = /<style(|\s*[^>]+)>([\s\S]+)<\/style>/
  const reScript = /<script(|\s*[^>]+)>([\s\S]+)<\/script>/
  const reTemplate = /<template(|\s*[^>]+)>([\s\S]+)<\/template>/
  const styleMatch = reStyle.exec(code)
  const scriptMatch = reScript.exec(code)
  const templateMatch = reTemplate.exec(code)

  let style = styleMatch ? styleMatch[2] : ''
  let styleAttrs = styleMatch ? styleMatch[1].trim() : ''
  let script = scriptMatch ? scriptMatch[2].trim() : ''
  let scriptAttrs = scriptMatch ? scriptMatch[1].trim() : ''
  let template = templateMatch ? templateMatch[2].trim() : ''
  let templateAttrs = templateMatch ? templateMatch[1].trim() : ''

  // if `<template>` absent
  if (template === '') {
    template = code
      .replace(reStyle, '')
      .replace(reScript, '')
      .trim()
  }

  if (script === '') {
    script = 'export default {}'
  } else {
    script = script.replace(/module\.exports\s*=/, 'export default')
  }

  let sfc = `
<template ${templateAttrs}>
<div class="vue-demo">
${template}
</div>
</template>

<script ${scriptAttrs}>
${script}
</script>`

  if (style !== '') {
    sfc =
      `<style ${styleAttrs ? `${styleAttrs} ` : ''}scoped>${style}</style>\n` +
      sfc
  }

  const demoOnly = templateAttrs.indexOf('demo-only') > -1

  return { sfc, demoOnly }
}
