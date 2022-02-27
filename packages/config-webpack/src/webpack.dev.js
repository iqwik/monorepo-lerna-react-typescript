const path = require('path')
const merge = require('webpack-merge')
const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

const webpackCommon = require('./webpack.common.js')
// const { buildFolder } = require('./constants')

const smp = new SpeedMeasurePlugin()

const webpackDev = (props) => smp.wrap(merge(webpackCommon(props), {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        // contentBase: path.resolve(__dirname, `../${buildFolder}`),
        open: true,
        hot: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Dev::App',
            filename: 'index.html',
            template: path.resolve(__dirname, './template.html'),
            minify: false,
            hash: false,
            chunks: ['app', 'vendors'],
        }),
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
    ],
}))

console.log({ webpackDev })

module.exports = webpackDev
