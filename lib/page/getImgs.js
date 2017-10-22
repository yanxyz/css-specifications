/**
 * 从 HTML 中收集 <img> src
 *
 * 只收集相对地址
 * src 通常有引号，css-fonts 等没有
 *
 * @param {string} html
 * @param {boolean} noQuotes
 * @return {string[]}
 */

function getImgs(html, noQuotes) {
  const imgs = []
  const re = noQuotes
    ? /<img[^>]+?src=([^>" ]+)/g
    : /<img[^>]+?src="([^"]+?)"/g

  let match
  while ((match = re.exec(html))) {
    const src = match[1]
    if (/^(?:http|\/\/)/.test(src)) {
      if (!src.endsWith('/W3C')) {
        console.warn('src is a absolute url', src)
      }
    } else {
      if (src !== '..') {
        imgs.push(src)
      }
    }
  }
  return imgs
}

module.exports = getImgs
