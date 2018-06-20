const path = require('path')
const {readdirSync} = require('fs')
const memoize = require('lodash/memoize')
const methodPackageRx = /^lodash\.(.+)$/
const findRoot = require('find-root')

const getReplacementsForRoot = memoize((root) => {
  const modules = readdirSync(path.resolve(root, 'node_modules', 'lodash'))
  return new Map(modules.map(file => {
    const match = /^(.*)\.js$/.exec(file)
    if (match) return [match[1].toLowerCase(), `lodash/${match[1]}`]
  }).filter(pair => pair))
})

const getReplacements = file => getReplacementsForRoot(findRoot(file))

module.exports = function replaceLodashMethodPackages(fileInfo, api) {
  const j = api.jscodeshift
  const root = api.jscodeshift(fileInfo.source)
  const replacements = getReplacements(fileInfo.path)
  const methodPackageImports = root.find(j.ImportDeclaration, {
    source: {value: value => methodPackageRx.test(value)},
  })
  methodPackageImports.forEach(path => {
    const match = methodPackageRx.exec(path.value.source.value)
    const replacement = replacements.get(match[1])
    if (replacement) path.value.source.value = replacement
    else console.error(`no replacement found for ${match[1]}`) // eslint-disable-line no-console
  })
  const methodPackageRequires = root.find(j.CallExpression, {
    callee: {name: 'require'},
    arguments: [{value: value => methodPackageRx.test(value)}],
  })
  methodPackageRequires.forEach(path => {
    const match = methodPackageRx.exec(path.value.arguments[0].value)
    const replacement = replacements.get(match[1])
    if (replacement) path.value.arguments[0].value = replacement
    else console.error(`no replacement found for ${match[1]}`) // eslint-disable-line no-console
  })
  return root.toSource()
}
