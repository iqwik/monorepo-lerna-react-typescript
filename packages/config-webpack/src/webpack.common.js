const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { aliasesWebpack } = require('@packages/config-aliases')
const { moduleRules, buildFolder } = require('./constants')

const webpackCommon = (props) => ({
    output: {
        path: path.resolve(__dirname, `../${buildFolder}`),
        globalObject: 'self',
        filename: 'assets/js/[name].js',
        chunkFilename: 'assets/js/[name].js',
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendors',
                    enforce: true,
                },
            },
        },
    },
    stats: {
        children: false,
    },
    module: moduleRules(props),
    resolve: {
        alias: aliasesWebpack,
        extensions: ['.wasm', '.mjs', '.jsx', '.js', '.json', '.ts', '.tsx'],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].css',
        }),
    ],
    target: 'web',
})

module.exports = webpackCommon
