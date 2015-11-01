'use strict'; 

import React from 'react';
import App from './components/App.jsx';

window.onload = () => {
  // Replace innerHTML of `#root` with the App component
  React.render(<App />, document.querySelector('#root'));
}
