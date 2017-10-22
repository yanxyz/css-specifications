const fs = require('fs')
const config = require('../config')

const template = fs.readFileSync(__dirname + '/index.html', 'utf8')

module.exports = function () {
  const arr = []
  for (const [key, value] of Object.entries(config.groups)) {
    arr.push(`<h3><a href="${value.root}">${key.toUpperCase()}</a></h3>`)
    arr.push('<ul>')
    value.specs.forEach(spec => {
      arr.push(`<li><a href="${spec.name}/index.html">${spec.name}</a></li>`)
    })
    arr.push('</ul>')
  }

  fs.writeFileSync('docs/index.html', render({ content: arr.join('\n') }))
}

function render(data) {
  return template.replace(/{{(.+?)}}/g, (m, p) => data[p])
}
