# gl-material-test

[![NPM version][npm-image]][npm-url]
![experimental][experimental-image]
[![js-standard-style][standard-image]][standard-url]

Test your 3d materials!

This module provides a test function for validating that a material conforms to the definition in [`gl-material`](https://github.com/freeman-lab/gl-material). It creates a `gl` context, makes sure that your material can generate a compiled shader, and has valid styles and defaults.

## install

Add to your project with

```
npm install gl-material-test
```

## example

Test a material by providing it alongside a test module like [`tape`](https://github.com/substack/tape) or [`tap`](https://github.com/tapjs/node-tap)

```javascript
var test = require('tape')

var material = {
  fragment: `precision highp float;\ 
    struct Style {\
      vec3 color;\
    };\
    uniform Style style;\
    void main() {\
      gl_FragColor = vec4(style.color, 1.0);\
    }`
  style: {
    color: {type: 'vec3', default: [0, 100, 0]}
  },
  name: 'my-flat-material'
}

require('gl-material-test')(test, material)
```

If you put this inside a file `test.js`, you can run the tests by browserifying it and piping it to anything that runs tests in the browser like [`testron`](https://github.com/shama/testron). For example, your full test script could be `browserify test.js | testron | tap-spec`.

## usage

#### `require('gl-material-test')(test, material, [constants])`

Provide a `test` module like [`tape`](https://github.com/substack/tape) or [`tap`](https://github.com/tapjs/node-tap), and a `material` that conforms to the definition in [`gl-material`](https://github.com/freeman-lab/gl-material). Optionally provide an object of constants for performing string replacement. If your material doesn't use this feature, leave this argument out.

[npm-image]: https://img.shields.io/badge/npm-v1.0.1-lightgray.svg?style=flat-square
[npm-url]: https://npmjs.org/package/gl-material-test
[standard-image]: https://img.shields.io/badge/code%20style-standard-lightgray.svg?style=flat-square
[standard-url]: https://github.com/feross/standard
[experimental-image]: https://img.shields.io/badge/stability-experimental-lightgray.svg?style=flat-square