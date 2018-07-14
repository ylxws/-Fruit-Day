import React from 'react';
import {
  hot,
} from 'react-hot-loader';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Home from 'container/Home';
import Login from 'container/Login';
import User from 'container/User';
import Kind from 'container/Kind';
import Cart from 'container/Cart';
import Product from 'container/Product';
import Register from 'container/Register';
import Order from 'container/Order';
import Detail from 'container/Detail';
import Address from 'container/Address';
import OrderDetail from 'container/OrderDetail';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/home" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/user" component={User} />
          <Route path="/kind" component={Kind} />
          <Route path="/cart" component={Cart} />
          <Route path="/product" component={Product} />
          <Route path="/register" component={Register} />
          <Route path="/order" component={Order} />
          <Route path="/detail" component={Detail} />
          <Route path="/address" component={Address} />
          <Route path="/orderdetail" component={OrderDetail} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default hot(module)(App);