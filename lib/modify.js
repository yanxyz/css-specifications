const fs = require('fs-extra')
const which = require('./utils/which')
const config = require('./config')
const modifyHTML = require('./page/modifyHTML')

module.exports = function (name) {
  if (name === 'all') {
    const list = []
    Object.keys(config.groups).forEach(key => {
      config.groups[key].specs.forEach(spec => list.push(spec))
    })
    return Promise.all(list.map(wrapper))
  }

  const spec = which(name)
  if (!spec) return
  return wrapper(spec)
}

function wrapper(spec) {
  if (spec.name === 'css2') {
    return fs.readdir(spec.dir)
      .then(files => {
        return files.filter(name => name.endsWith('.html') && name !== 'index.html')
          .map(name => modify(spec.dir + '/' + name))
      })
  }
  return modify(spec.dir + '/index.html')
}

function modify(fileName) {
  return fs.readFile(fileName, 'utf8')
    .then(content => {
      const newContent = modifyHTML(content)
      if (newContent !== content) {
        return fs.writeFile(fileName, newContent)
      }
    })
}
