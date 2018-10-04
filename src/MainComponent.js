import React from 'react';
import { hot } from 'react-hot-loader'
import ComponentA from './ComponentA';
import ComponentB from './ComponentB';

const App = () => (
  <div>
    <div>Hello World!</div>
    <ComponentA />
    <ComponentB />
  </div>
);

export default hot(module)(App);
