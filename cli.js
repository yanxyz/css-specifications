#!/usr/bin/env node

const argv = require('yargs-parser')(process.argv.slice(2), {
  alias: {
    help: ['h'],
    force: ['f'],
  },
  boolean: ['help', 'force', 'online', 'm']
})

const firstArg = argv._[0]
if (argv.help || !firstArg) {
  showHelp()
}
main(firstArg)

function main(item) {
  if (item === 'get') {
    const name = argv._[1]
    if (name === 'css2') {
      require('./lib/css2')(argv.force).catch(console.error)
    } else {
      require('./lib/get')(name, argv.force).catch(console.error)
    }
    return
  }

  if (item === 'help') {
    require('./lib/help')(argv._[1], argv.online)
    return
  }

  if (item === 'list') {
    require('./lib/list')()
    return
  }

  if (item === 'index') {
    require('./lib/create-index')()
    return
  }

  if (item === 'modify') {
    require('./lib/modify')(argv._[1])
    return
  }

  if (item === 'assets') {
    const mod = require('./lib/assets')
    if (argv.m) {
      mod.modify()
    } else {
      mod(argv.force)
    }
    return
  }

  console.error('Unknown argument')
}

function showHelp() {
  const cmd = 'css'
  console.log(`
${cmd} get <name>|all [--force]
Download the specification.

${cmd} modify <name>|all
Modify the local html file.

${cmd} assets
Download the common assets.

${cmd} list
List all the specifications.

${cmd} index
Create index.html

${cmd} help <name> [--online]
Open the specification. Part of name is OK.
`)
  process.exit()
}
