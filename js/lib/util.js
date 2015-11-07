'use strict';

// Implement object iterator
// thus we can use the almighty 'for of' loop

// @see https://esdiscuss.org/topic/es6-iteration-over-object-values
function* entries(obj) {
  for (let key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}

module.exports = {
  entries: entries,
};
