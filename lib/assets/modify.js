const fs = require('fs-extra')

const dir = 'docs/assets/'
module.exports = async function modify() {
  return Promise.all([
    defaultcss(),
    edcss(),
    edcss2016(),
  ])
}

/**
 * Modify default.css
 */

function defaultcss() {
  const file = dir + 'default.css'
  return fs.readFile(file, 'utf8').then(content => {
    const newContent = content
      .replace('https://www.w3.org/StyleSheets/TR/2016/base.css', 'base.css')
    if (newContent !== content) {
      return fs.writeFile(file, newContent)
    }
  })
}

/**
 * Modify W3C-ED.css
 */

function edcss() {
  const file = dir + 'W3C-ED.css'
  return fs.readFile(file, 'utf8').then(content => {
    const newContent = content
      .replace(/url\(.+?logo-ED\)/, 'url(logo-ED.png)')
    if (newContent !== content) {
      return fs.writeFile(file, newContent)
    }
  })
}

/**
 * Write W3C-ED-2016.css
 */

function edcss2016() {
  const file = dir + 'W3C-ED-2016.css'
  return fs.writeFile(file, `
/* Style for a Working Group Editors' Draft */

@import "base.css";

body {
  background-image: url(logo-ED.png);
}
  `)
}
