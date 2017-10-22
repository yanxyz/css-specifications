const fs = require('fs-extra')
const download = require('../utils/download')
const modify = require('./modify')

const dir = 'docs/assets/'
const list = [
  ['base.css', 'https://www.w3.org/StyleSheets/TR/2016/base.css'],
  ['default.css', 'https://drafts.csswg.org/default.css'],
  ['logo-ED.png', 'https://www.w3.org/StyleSheets/TR/logo-ED'],
  ['W3C.svg', 'https://www.w3.org/StyleSheets/TR/2016/logos/W3C'],
  ['csslogo.ico', 'https://drafts.csswg.org/csslogo.ico'],
  ['W3C-ED.css', 'https://www.w3.org/StyleSheets/TR/W3C-ED.css'],
  ['fixup.js', 'https://www.w3.org/scripts/TR/2016/fixup.js'],
]

module.exports = async function (force) {
  await Promise.all(list.map(x => {
    const name = x[0]
    const dest = dir + name
    if (force) {
      return download(x[1], dest)
    }
    return fs.pathExists(dest).then(exists => {
      if (exists) {
        console.log(`${dest} exists`)
      } else {
        return download(x[1], dest)
      }
    })
  }))

  await modify()
}
