const path = require('path')
const chalk = require('chalk')
const config = require('./config')

module.exports = function () {
  for (const [key, value] of Object.entries(config.groups)) {
    console.log(chalk.whiteBright(key))
    value.specs.forEach(x => {
      console.log(chalk.whiteBright(x.name), chalk.gray(x.url))
    })
    console.log()
  }

  console.log('Saved path:', path.resolve('docs'))
}
