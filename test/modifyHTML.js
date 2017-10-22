const assert = require('assert')
const { modifyHTML } = require('../lib/page')

const raw = `
<meta content="https://dev.w3.org/csswg/css-fonts-3/"
name=dcterms.identifier><!--
   FIXME when publishing: copy the current default.css and link to
   "default.css" rather than "../default.css"
-->

<link href="../default.css" rel=stylesheet type="text/css">
<link href="../csslogo.ico" rel="shortcut icon" type="image/x-icon">
<link href="https://www.w3.org/StyleSheets/TR/W3C-ED.css" rel=stylesheet
type="text/css">
<script defer=defer
src="https://test.csswg.org/harness/annotate.js#CSS3-FONTS_DEV"
type="text/javascript"></script>

<script nonce='a990Ii949JkUAuoA9VoSOwwl3Wqjxrk31L3JIhMeoGQ=' type='text/javascript'><!--
// --></script>
<script nonce="" type="text/javascript"><!--
// --></script>
<link rel="stylesheet" type="text/css" href="https://test.csswg.org/harness/stylesheets/annotate.css">
`

const str1 = modifyHTML(raw)
validate(str1)

// 重复运行
const str2 = modifyHTML(str1)
validate(str2)

function validate(str) {
  assert.equal(str.includes('href="../default.css'), false)
  assert.equal(str.includes('href="../assets/W3C-ED.css'), true)
  // script
  assert.equal(str.includes('src2="https'), true)
  assert.equal(str.includes('nonce'), false)
}
