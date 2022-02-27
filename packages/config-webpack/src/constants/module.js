const { cacheLoader, cssProcessing } = require('../utils')

const moduleRules = (props) => ({
    rules: [
        {
            test: /\.(ts|js)x?$/,
            exclude: /node_modules/,
            use: [
                { ...cacheLoader() },
                {
                    loader: 'babel-loader',
                },
            ],
        },
        cssProcessing({ ...props, withModules: false }),
        cssProcessing({ ...props, withModules: true }),
        {
            test: /\.(png|jpg|gif)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'assets/img',
                    },
                },
            ],
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        outputPath: 'assets/fonts',
                    },
                },
            ],
        },
    ],
})

module.exports = moduleRules
