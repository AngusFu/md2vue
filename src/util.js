import inspectf from 'inspect-f'

import kebabCase from 'lodash-es/kebabCase'
import camelCase from 'lodash-es/camelCase'
import upperFirst from 'lodash-es/upperFirst'
import flowRight from 'lodash-es/flowRight'

const pascalCase = flowRight(upperFirst, camelCase)

export {
  kebabCase,
  camelCase,
  pascalCase
}

export function toJSON (obj) {
  if (typeof obj === 'function') {
    let str = inspectf(2, obj)

    // prepend `function ` for short style like `a(){}`
    if (/^function /.test(str) === false) {
      str = 'function ' + str
    }

    return str
  }

  if (obj && typeof obj === 'object') {
    const arr = Object.keys(obj).map(key => `"${key}": ${toJSON(obj[key])}`)
    return `{${arr.join(',')}}`
  }

  return JSON.stringify(obj)
}
