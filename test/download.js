const assert = require('assert')
const { download } = require('../lib/utils')

const url = 'https://drafts.csswg.org/css-fonts/fiddlesticks-synitalics.png%20width=373'
download(url, __dirname + '/_temp/b.png')
