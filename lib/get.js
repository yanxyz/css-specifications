const path = require('path')
const { URL } = require('url')
const pMap = require('p-map')
const config = require('./config')
const which = require('./utils/which')
const get = require('./page/get')

module.exports = async function (name, force) {
  if (name === 'all') {
    const list = []
    Object.keys(config.groups).forEach(key => {
      config.groups[key].specs.forEach(spec => {
        if (spec.name === 'css2') {
          console.log('"css2" is skipped, it should be downloaded alone.')
        } else {
          list.push(spec)
        }
      })
    })
    await pMap(list, spec => get(generateOptions(spec)), { concurrency: 5 })
    return
  }

  const spec = which(name)
  if (!spec) return
  await get(generateOptions(spec))

  function generateOptions(spec) {
    return {
      ...spec,
      dest: spec.dir + '/index.html',
      force
    }
  }
}
