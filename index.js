var extend = require('xtend')
var convert = require('object-array-converter')
var createClassName = require('data-field-classname')
var listEditor = require('list-editor')
var isarray = require('isarray')

/**
Create a virtual-dom list (object or array) data-field for use with [data-ui](https://github.com/editdata/data-ui).
@param {function} h virtual-dom `h` function
@param {Object} properties an options object, including any properties you can pass to virtual-dom/h
@param {Boolean} properties.display true for display mode, default is false for input mode
@param {Boolean} properties.keys, false for array mode, default is true for object mode
@param {Object} properties.value a geojson Feature or Featurecollection
@param {Array} properties.value a geojson Feature or Featurecollection
@param {Object} value a geojson Feature or Featurecollection
@param {Array} value a geojson Feature or Featurecollection
@returns virtual-dom tree
@name createListField
@example
var createListField = require('data-field-string')

createListField(h, { onclick: function (e){} }, ['example', 'string'])
*/
module.exports = function createListField (h, properties, items) {
  properties = extend({
    tagName: 'div',
    display: false,
    size: 'normal',
    fieldType: 'input',
    attributes: {}
  }, properties)

  properties.dataType = 'list'
  items = items || properties.items
  var keys = properties.keys

  if (isarray(items)) {
    items = convert.toObject(items)
  }

  if (properties.display) {
    properties.tagName = 'ul'
    properties.fieldType = 'display'
    items = Object.keys(items).map(function (key) {
      var item = items[key]
      var el = []
      if (keys) el.push(h('span.data-field-list-key', key + ': '))
      el.push(h('span.data-field-list-value', item))
      return h('li.data-field-list-item', el)
    })
  } else {
    items = [listEditor({ items: items, keys: keys }, properties)]
  }

  properties.className = createClassName(properties)
  delete properties.size
  return h(properties.tagName, properties, items)
}
