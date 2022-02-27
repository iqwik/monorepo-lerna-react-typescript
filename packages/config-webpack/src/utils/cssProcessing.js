const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const nodeSass = require('node-sass')

const cacheLoader = require('./cacheLoader')

const cssProcessing = ({ withModules = true, sassResources }) => ({
    test: withModules ? /\.module\.(css|scss)$/ : /^((?!\.module).)*\.(css|scss)$/,
    use: [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                esModule: false,
                // publicPath: 'assets',
            },
        },
        { ...cacheLoader() },
        {
            loader: require.resolve('css-loader'),
            options: {
                importLoaders: 1,
                localIdentName: '[folder]__[local]__[hash:base64:6]',
                modules: withModules,
                sourceMap: true,
            },
        },
        {
            loader: require.resolve('postcss-loader'),
            options: {
                postcssOptions: {
                    plugins: ['autoprefixer'],
                },
            },
        },
        {
            loader: require.resolve('sass-loader'),
            options: {
                implementation: nodeSass,
                sourceMap: true,
            },
        },
        {
            loader: 'sass-resources-loader',
            options: {
                resources: sassResources,
            },
        },
    ],
})

module.exports = cssProcessing
