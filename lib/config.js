process.chdir(__dirname + '/..')

const csswg = {
  root: 'https://drafts.csswg.org',
  specs: [
    'css-animations',
    'css-backgrounds',
    'css-cascade',
    'css-color',
    // @media, @support
    'css-conditional',
    'css-contain',
    'css-content',
    'css-counter-styles',
    'css-device-adapt',
    'css-display',
    'css-flexbox',
    'css-fonts',
    'css-font-loading',
    'css-grid',
    'css-images',
    'css-lists',
    // @namespace
    'css-namespaces',
    'css-multicol',
    'css-overflow',
    'css-shapes',
    'css-sizing',
    'css-text',
    'css-text-decor',
    'css-timing',
    'css-transforms',
    'css-transitions',
    'css-ui',
    'css-values',
    'css-variables',
    'css-will-change',
    // css2 没有index.html
    ['css2', 'https://drafts.csswg.org/css2/cover.html'],
    'cssom',
    'cssom-view',
    'mediaqueries',
    'selectors',
  ]
}

const w3c = {
  root: 'https://w3c.github.io/',
  specs: [
    'IndexedDB',
    'uievents',
    'uievents-code',
    'uievents-key',
  ]
}

module.exports = {
  groups: {
    csswg: transform(csswg),
    w3c: transform(w3c)
  }
}

function transform(group) {
  group.specs = group.specs.map(item => {
    let name, url
    if (Array.isArray(item)) {
      [name, url] = item
    } else {
      name = item
      url = group.root + '/' + item + '/'
    }
    return {
      name,
      url,
      dir: 'docs/' + name,
    }
  })
  return group
}
