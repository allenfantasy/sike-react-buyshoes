'use strict';

// @connect decorator function

import MakeConnectedComponent from './MakeConnectedComponent';

module.exports = function connect(store, ...propNames) {
  return (klass) => {
    let klassReplacement = MakeConnectedComponent(klass, store, ...propNames);
    return klassReplacement;
  }
};

