import React from 'react';
import ReactDOM from 'react-dom';
import 'public/style/index.css';
import 'public/style/common.less';
import Routes from './routes';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Header from 'component/Hearder';
import Nav from 'component/Nav';

import Login from 'container/Login';

ReactDOM.render(
  <div>
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/" component={Routes} />
      </Switch>
    </BrowserRouter>
  </div>,
  document.getElementById('root'));