import './main.css';

import React from 'react';
import { render } from 'react-dom';
import Main from './MainComponent';

render(
  <div className="global-bg">
    <Main />
  </div>
, document.getElementById('app'));

