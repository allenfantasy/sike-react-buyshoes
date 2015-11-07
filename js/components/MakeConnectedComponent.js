'use strict';
import React from 'react';

import ConnectedStore from './ConnectedStore.jsx';

function MakeConnectedComponent(ViewComponent, Store, ...propNames) {
  class ConnectedViewComponent extends React.Component {
    render() {
      let outerProps = this.props;
      return (
        <ConnectedStore store={Store} propNames={propNames}>
          {props => <ViewComponent {...outerProps} {...props} />}
        </ConnectedStore>
      );
    }
  }

  return ConnectedViewComponent;
}

module.exports = MakeConnectedComponent;
