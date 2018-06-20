# jscodeshift-replace-lodash-method-packages

[![Build Status](https://travis-ci.org/jcoreio/jscodeshift-replace-lodash-method-packages.svg?branch=master)](https://travis-ci.org/jcoreio/jscodeshift-replace-lodash-method-packages)
[![Coverage Status](https://codecov.io/gh/jcoreio/jscodeshift-replace-lodash-method-packages/branch/master/graph/badge.svg)](https://codecov.io/gh/jcoreio/jscodeshift-replace-lodash-method-packages)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

This is a codemod script for use with
[JSCodeshift](https://github.com/facebook/jscodeshift) that helps convert lodash
method package imports/requires (e.g. `lodash.mapvalues`) to imports from lodash
submodules (e.g. `lodash/mapValues`)

## Setup & Run

1. `yarn global add jscodeshift`
1. `git clone https://github.com/jcoreio/jscodeshift-replace-lodash-method-packages.git`
1. Run `yarn install` in the react-codemod directory
1. `jscodeshift -t <path/to>/jscodeshift-replace-lodash-method-packages/index.js <path>`
   * `path` - files or directory to transform;
   * use the `-d` option for a dry-run and use `-p` to print the output for comparison;
   * use the `--extensions` option if your files have different extensions than `.js` (for example, `--extensions js,jsx`);
   * if you use flowtype, you might also need to use `--parser=flow` or `--parser=babylon`;
   * see all available [jscodeshift options](https://github.com/facebook/jscodeshift#usage-cli).
