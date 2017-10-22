const got = require('got')

module.exports = function (url) {
  return got(url, { timeout: 300000 })
    .then(res => res.body)
}
