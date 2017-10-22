const opn = require('opn')
const which = require('./utils/which')

module.exports = function (name, online) {
  // 没有 name 时打开 index.html
  if (!name) {
    opn('docs/index.html')
    return
  }

  const spec = which(name)
  if (!spec) return
  if (online) {
    opn(spec.url)
  } else {
    opn(spec.dir + '/index.html')
  }
}
