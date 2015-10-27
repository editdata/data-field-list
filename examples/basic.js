var vraf = require('virtual-raf')
var h = require('virtual-dom/h')
var field = require('../index')

function render (state) {
  var elements = []
  console.log(state)
  elements.push(field(h, {
    keys: state.keys,
    display: true,
    onclick: function (e) { console.log('display', e.target.value) }
  }, state.items))

  elements.push(field(h, {
    keys: state.keys,
    oninput: function (e) {},
    onsubmit: function onsubmit (e, items, item) {
      state.items = items
      tree.update(state)
    },
    removeItem: function removeItem (e, items) {
      state.items = items
      tree.update(state)
    }
  }, state.items))

  return h('div.fields', elements)
}

var tree = vraf({ items: ['hi', 'ok', 'awesome'], keys: true }, render, require('virtual-dom'))
document.body.appendChild(tree())
