# gl-test-material

Test your stack.gl materials!

This module provides a test function for validating that a material conforms to the definition in [`gl-material`](https://github.com/freeman-lab/gl-material). It creates a `gl` context, makes sure that your material yields a valid compiled shader, and has valid styles and defaults.

## install

Add to your project with

```
npm install gl-test-material
```

## example

Test a material by providing it alongside a test module (like `tape` or `tap`)

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

require('gl-test-material')(test, material)
```

If you put this inside a file `test.js`, you can run the tests by browserifying it and piping it to anything that runs tests in the browser. For example, your full test script could be `browserify test.js | testron | tap-spec`.

## usage

#### `require('gl-test-material')(test, material, [constants])`

Provide a `test` module (like `tape` or `tap`) and a `material` that conforms to the definition in [`gl-material`](https://github.com/freeman-lab/gl-material). Optionally provide an object of constants for performing string replacement. If your material doesn't use this feature, leave this argument out.