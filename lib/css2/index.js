const fs = require('fs-extra')
const pMap = require('p-map')
const get = require('../page/get')
const download = require('../utils/download')

module.exports = async function (force) {
  const name = 'css2'
  const dir = 'docs/' + name
  const baseUrl = 'https://drafts.csswg.org/css2'

  // 获取 cover.html
  const html = await get(generateOptions('cover.html'))
  if (!html) return

  // 从 cover.html 中提取 TOC
  const toc = getToc(html)
  toc.push('Overview.html')

  await Promise.all([
    fs.writeJSON(dir + 'files.json', toc, { spaces: 2 }),
    download(baseUrl + '/style/default.css', dir + '/style/default.css'),
    fs.copyFile(__dirname + '/index.html', dir + '/index.html')
  ])

  // 下载全部页面
  const mapper = href => get(generateOptions(href))
  await pMap(toc, mapper, { concurrency: 5 })

  function generateOptions(pageName) {
    return {
      name,
      dir,
      pageName,
      url: baseUrl + '/' + pageName,
      dest: dir + '/' + pageName,
      force
    }
  }
}

function getToc(html) {
  const ul = html.match(/<ul class="toc">[\s\S]+?<\/ul>/)[0]
  let hrefs = []
  const re = /href="([^"]+?)"/g
  let match
  while ((match = re.exec(ul))) {
    hrefs.push(match[1])
  }
  return hrefs
}
