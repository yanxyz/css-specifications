/**
 * 修改 HTML
 *
 * 为了修改本地文件，此方法可以重复运行
 * 注意 re 不要匹配修改过的
 *
 * @param {string} html
 * @return {string}
 */

function modifyHTML(html) {
  return html
    // css-fonts 有多个 "../default.css"，不能省略 href
    .replace('href="../default.css"', 'href="../assets/default.css"')
    .replace('https://www.w3.org/StyleSheets/TR/W3C-ED.css', '../assets/W3C-ED.css')
    // IndexedDB
    .replace('https://www.w3.org/StyleSheets/TR/W3C-ED', '../assets/W3C-ED.css')
    // css2
    .replace('https://www.w3.org/StyleSheets/TR/2016/W3C-ED.css', '../assets/W3C-ED-2016.css')
    .replace('../csslogo.ico', '../assets/csslogo.ico')
    // css-text
    .replace(/href=(?=.+?W3C-WD)/, 'href2=')
    // css-backgrounds
    .replace(/href=(?=.+?W3C-CR)/, 'href2=')
    .replace(/url\(".*?logo-ED"\)/, 'url("../assets/logo-ED.png")')
    .replace(/src=".*?W3C"/, 'src="../assets/W3C.svg"')
    .replace(/src=(?=.+?annotate.js)/, 'src2=')
    .replace(/href=(?=.+?annotate.css)/, 'href2=')
    // cssom-view
    .replace(/src=(?=.+?file-issue.js)/, 'src2=')
    .replace('https://www.w3.org/scripts/TR/2016/fixup.js', '../assets/fixup.js')
    // .replace(/src=(?=.+?fixup.js)/, 'src2=')
    // mediaqueries
    .replace(/<aside class="caniuse-status" (?!hidden)/g, '$&hidden')
    .replace(/<script nonce=[\s\S]+?<\/script>/g, '')
}

module.exports = modifyHTML
