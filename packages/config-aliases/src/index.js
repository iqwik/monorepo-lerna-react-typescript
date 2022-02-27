const {
    getJest, getEslint, getWebpack, getTsconfig,
} = require('./utils')

const aliasesPaths = {
    '@packages/common': '/packages/common',
    '@packages/core': '/packages/core',
    '@domain/app': '/domain',
}

const aliases = [
    ['@common', '@packages/common/src'],
    ['@core', '@packages/core/src'],
    ['@domain', '@domain/app/src'],
]

// @NOTE - tsconfig пока возможен только в виде json-файла
// Для tsconfig.json надо руками добавлять в него результат getTsconfig(aliases, aliasesPaths)
// @SEE - https://github.com/rasenplanscher/tsconfig.js
module.exports = {
    aliasesJest: getJest(aliases, aliasesPaths),
    aliasesEslint: getEslint(aliases),
    aliasesWebpack: getWebpack(aliases, aliasesPaths),
    aliasesTsconfig: getTsconfig(aliases, aliasesPaths),
}

