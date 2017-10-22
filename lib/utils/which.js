const config = require('../config')

module.exports = function (input) {
  if (!input) {
    console.error('Please specify the name of a specification.')
    return
  }

  const list = []
  for (const group of Object.values(config.groups)) {
    for (let spec of group.specs) {
      if (spec.name === input) return spec
      if (spec.name.toLowerCase().includes(input)) list.push(spec)
    }
  }

  if (list.length === 0) {
    console.log(`"${input}" is not found in config.`)
    return
  }
  if (list.length > 1) {
    console.log('Which?')
    console.log(list.map(x => x.name).join('\n'))
    return
  }
  console.log(`"${input}" matches "${list[0].name}"`)
  return list[0]
}
