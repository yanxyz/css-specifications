const assert = require('assert')
const { getImgs } = require('../lib/page')

let str = '<img alt="You get" src="images/computer.jpg">'
assert.deepEqual(getImgs(str), ['images/computer.jpg'])

// css-fonts
str = `<div class=figure><img alt="regular face display"
src=fiddlesticks-regular.png width=373></div>`
assert.deepEqual(getImgs(str, true), ['fiddlesticks-regular.png'])
