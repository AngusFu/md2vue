exports.wrapESLint = (code) => `/* eslint-disable */
${code}
/* eslint-enable */`
