const ESLintPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { DuplicatesPlugin } = require('inspectpack/plugin')
const { aliasesWebpack } = require('@packages/config-aliases')
const { moduleRules } = require('./constants')

const enableEslint = true
const enableDuplicates = false

const eslintProcessing = () => (enableEslint ? [
    new ESLintPlugin({
        emitWarning: true,
    }),
] : [])

const duplicatesProcessing = () => (enableDuplicates ? [
    new DuplicatesPlugin({
        emitErrors: false,
        verbose: true,
    }),
] : [])

const webpackCommon = (props) => ({
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
        ...eslintProcessing(),
        ...duplicatesProcessing(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].css',
        }),
    ],
    target: 'web',
})

module.exports = webpackCommon
