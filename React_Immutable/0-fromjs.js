const { fromJS } = require('immutable');

function getImmutableObject(obj) {
  return fromJS(obj);
}

module.exports = getImmutableObject;