// @flow

const path = require('path')
const {describe, it} = require('mocha')
const {expect} = require('chai')

const script = require('..')

describe('script', function () {
  it('works', function () {
    const code = `
import get from 'lodash.get'
import mapValues from 'lodash.mapvalues'
require('lodash.get')
const sortBy = require('lodash.sortby')
`
    expect(script(
      {
        source: code,
        path: path.resolve(__dirname, 'test.js'),
      },
      {
        jscodeshift: require('jscodeshift'),
      }
    )).to.equal(`
import get from "lodash/get"
import mapValues from "lodash/mapValues"
require("lodash/get")
const sortBy = require("lodash/sortBy")
`)
  })
})
