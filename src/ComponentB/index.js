import React from 'react';
import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import(/* webpackChunkName: "ComponentB" */ './ComponentB'),
  loading: () => <div>Loading...</div>,
});
