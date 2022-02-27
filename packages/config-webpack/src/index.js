const merge = require('webpack-merge')

const webpackConfigDev = require('./webpack.dev')
const webpackConfigProd = require('./webpack.prod')
const { buildFolder } = require('./constants')

module.exports = {
    webpackMerge: merge,
    webpackConfigDev,
    webpackConfigProd,
    buildFolder,
}
