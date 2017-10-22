const fs = require('fs-extra')
const path = require('path')
const { URL } = require('url')
const pMap = require('p-map')
const download = require('../utils/download')
const getHTML = require('./getHTML')
const getImgs = require('./getImgs')
const modifyHTML = require('./modifyHTML')

/**
 * 下载单个页面
 *
 * @param {object} options
 * @return {Promise<string>}
 */
async function get(options) {
  const { name, dir, url, dest, force } = options

  if (!force && await fs.pathExists(dest)) {
    console.log(`${dest} exists, you could use '--force' to download it again.`)
    return
  }

  // console.log(`Fetching ${url}`)
  const rawHtml = await getHTML(url)
  await fs.outputFile(dest, modifyHTML(rawHtml))

  // 注意 html 是 raw html, modifyHTML() 会修改一些 src
  const imgs = getImgs(rawHtml, name === 'css-fonts')
  if (imgs === 'css-flexbox') {
    // object[data]
    imgs.push('images/flex-item-determination.png')
  }
  // 是否重新下载图片，方便测试
  const checkExists = false
  if (imgs.length) {
    const mapper = src => {
      const imgSrc = new URL(src, url)
      const imgDest = path.resolve(dir, src)
      if (checkExists) {
        return fs.pathExists(imgDest).then(exists => {
          if (!exists) {
            return download(imgSrc, imgDest)
          }
        })
      } else {
        return download(imgSrc, imgDest)
      }
    }

    await pMap(imgs, mapper, { concurrency: 5 })
  }

  return rawHtml
}

module.exports = get
