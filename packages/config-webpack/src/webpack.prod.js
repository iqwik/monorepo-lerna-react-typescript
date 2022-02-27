const path = require('path')
const merge = require('webpack-merge')
const { DefinePlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackCommon = require('./webpack.common.js')

const { buildFolder } = require('./constants')

module.exports = (props) => merge(webpackCommon(props), {
    mode: 'production',
    devtool: false,
    plugins: [
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['!assets/fonts/**', '!assets/img/**'],
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../../core/src/assets'),
                    to: path.resolve(__dirname, `../../../${buildFolder}/assets`),
                },
            ],
        }),
        new HtmlWebpackPlugin({
            title: 'App',
            filename: 'index.html',
            // publicPath: path.resolve(__dirname, `../../../${buildFolder}`),
            template: path.resolve(__dirname, './template.html'),
            hash: true,
            minify: true,
            inject: 'body',
            scriptLoading: 'blocking',
        }),
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
    ],
})
