import React from 'react';
import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import(/* webpackChunkName: "ComponentA" */ './ComponentA'),
  loading: () => <div>Loading...</div>,
});
