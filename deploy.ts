const ghpages = require('gh-pages')

// eslint-disable-next-line promise/prefer-await-to-callbacks
ghpages.publish('dist')
