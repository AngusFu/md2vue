/**
 * 用于从 Vue SFC 代码块中提取出不同部分
 */
const reStyle = /<style(|\s*[^>]+)>([\s\S]+)<\/style>/
const reScript = /<script(|\s*[^>]+)>([\s\S]+)<\/script>/
const reTemplate = /<template(|\s*[^>]+)>([\s\S]+)<\/template>/

export default (code) => {
  const styleMatch = reStyle.exec(code)
  const scriptMatch = reScript.exec(code)
  const templateMatch = reTemplate.exec(code)

  const style = styleMatch ? styleMatch[2] : ''
  const styleAttrs = styleMatch ? styleMatch[1].trim() : ''

  let script = scriptMatch ? scriptMatch[2].trim() : ''
  const scriptAttrs = scriptMatch ? scriptMatch[1].trim() : ''

  let template = templateMatch ? templateMatch[2].trim() : ''
  const templateAttrs = templateMatch ? templateMatch[1].trim() : ''

  // if `<template>` absent
  if (template === '') {
    template = code.replace(reStyle, '').replace(reScript, '')
  }

  if (script === '') {
    script = 'module.exports = {}'
  } else {
    script = script.replace(/export\s+default/, 'module.exports =')
  }

  return {
    style,
    styleAttrs,

    script,
    scriptAttrs,

    template,
    templateAttrs,
    demoOnly: templateAttrs.indexOf('demo-only') > -1
  }
}
