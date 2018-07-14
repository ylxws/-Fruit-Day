import React from 'react';
import {
  hot
} from 'react-hot-loader';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Header from 'component/Hearder';
import Nav from 'component/Nav';
import Home from 'container/Home';
import Product from 'container/Product';
import Order from 'container/Order';
import Class from 'container/Class';

class App extends React.Component {
  componentWillMount() {
    const admin = sessionStorage.getItem("admin");
    if (!admin) {
      return location.href = "/login";
    }
    const userName = admin.split(',')[0].split(":")[1].slice(1, -1);
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          <Nav />
          <div className="main">
            <BrowserRouter>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/product" component={Product} />
              <Route path="/order" component={Order} />
              <Route path="/class" component={Class} />
            </Switch>
          </BrowserRouter>
          </div>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);