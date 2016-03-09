var context = require('gl-context')
var materialize = require('gl-material')
var foreach = require('lodash.foreach')

module.exports = function (test, material, constants) {
  var canvas = document.body.appendChild(document.createElement('canvas'))
  var gl = context(canvas)

  test('construction', function (t) {
    var compiled = materialize(gl, material, constants)
    t.ok(compiled.shader, 'shader compiled')
    t.end()
  })

  test('defaults', function (t) {
    foreach(material.style, function (style, name) {
      t.ok(style.default, 'default for "' + name + '"" defined')
    })
    t.end()
  })

  test('types', function (t) {
    foreach(material.style, function (style, name) {
      t.ok(style.type, 'type for "' + name + '" defined')
    })
    t.end()
  })

  test('shader: struct', function (t) {
    if (material.style) {
      var compiled = materialize(gl, material, constants)
      infragment(t, compiled.shader, 'struct Style')
      t.end()
    }
  })

  test('shader: uniform', function (t) {
    if (material.style) {
      var compiled = materialize(gl, material, constants)
      infragment(t, compiled.shader, 'uniform Style style')
      t.end()
    }
  })

  test('shader: types', function (t) {
    if (material.style) {
      var compiled = materialize(gl, material, constants)
      foreach(material.style, function (style, name) {
        infragment(t, compiled.shader, style.type + ' ' + name)
      })
    }
    t.end()
  })
}

function infragment (t, shader, text) {
  var found = shader._fref.src.indexOf(text) > -1
  t.ok(found, '"' + text + '" found in shader')
}