const path = require('path')
const {
    webpackMerge, webpackConfigDev, webpackConfigProd, buildFolder,
} = require('@packages/config-webpack')

const buildPath = path.resolve(__dirname, `../${buildFolder}`)

const webpackConfigLocal = {
    entry: {
        app: path.resolve(__dirname, './src/index.tsx'),
    },
    output: {
        path: buildPath,
        globalObject: 'self',
        filename: 'assets/js/[name].js',
        chunkFilename: 'assets/js/[name].js',
    },
    devServer: {
        contentBase: buildPath,
    },
}

const sassResources = [
    path.resolve(__dirname, '../packages/core/src/styles/_variables.scss'),
]

if (process.env.NODE_ENV === 'production') {
    module.exports = webpackMerge(webpackConfigProd({ sassResources }), webpackConfigLocal)
} else {
    module.exports = webpackMerge(webpackConfigDev({ sassResources }), webpackConfigLocal)
}
