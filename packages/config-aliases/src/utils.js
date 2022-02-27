// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
const { reduce } = require('lodash')

const getParams = (item, mapper) => {
    const name = item[0]
    const url = item[1]

    return mapper(name, url)
}

const replacePathConfig = (text, replaces) => reduce(replaces, (acc, newValue, oldValue) => acc.replace(oldValue, newValue), text)

const mappers = {
    eslint(item) {
        return getParams(item, (name, url) => ([name, `${url}`]))
    },
    jest(item, paths) {
        return getParams(item, (name, url) => ({
            [`^${name}(.*)$`]: `<rootDir>../..${ replacePathConfig(url, paths) }$1`,
        }))
    },
    webpack(item, paths) {
        return getParams(item, (name, url) => ({
            [name]: path.resolve(__dirname, `../../..${replacePathConfig(url, paths)}`),
        }))
    },
    tsconfig(item, paths) {
        return getParams(item, (name, url) => ({
            [`${ name }/*`]: [`.${ replacePathConfig(url, paths) }/*`],
        }))
    },
}

const getEslint = (aliases) => aliases.map((item) => mappers.eslint(item))

const getJest = (aliases, paths) => aliases.reduce((acc, item) => ({
    ...acc,
    ...mappers.jest(item, paths),
}), {})

const getWebpack = (aliases, paths) => aliases.reduce((acc, item) => ({
    ...acc,
    ...mappers.webpack(item, paths),
}), {})

const getTsconfig = (aliases, paths) => aliases.reduce((acc, item) => ({
    ...acc,
    ...mappers.tsconfig(item, paths),
}), {})

module.exports = {
    getJest,
    getEslint,
    getWebpack,
    getTsconfig,
}

