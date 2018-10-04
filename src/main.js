import './main.css';

import React from 'react';
import { render } from 'react-dom';
import { preloadReady } from 'react-loadable';
import Main from './MainComponent';

preloadReady().then(() => {
  render(<Main />, document.getElementById('app'));
});
