const fs = require('fs-extra')
const path = require('path')
const got = require('got')

/**
 * Download file
 *
 * @param {string} url
 * @param {string} dest
 * @return {Promise<void>}
 */
function download(url, dest) {
  return new Promise((resolve, reject) => {
    const r = got.stream(url, { timeout: 60000 })
      .on('response', res => {
        fs.ensureDir(path.dirname(dest))
          .then(() => {
            r.pipe(fs.createWriteStream(dest))
              .on('close', resolve)
          })
          .catch(reject)
      })
      .on('error', reject)
  })
    .catch(err => {
      if (err instanceof got.HTTPError) {
        console.error(err.statusCode, err.url)
      } else {
        console.error('Problem occurs when downloading', url)
        console.error(err)
      }
    })
}

module.exports = download
