import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link, Redirect} from 'react-router-dom'

import $ from 'jquery'
import './styles/app.css';
import './styles/blocks.css';
import './styles/block.css';
import './styles/top-box.css';
import './styles/profile.css';
import './styles/trigger.css';
import './styles/landing.css';
import './styles/sidebar.css';

import 'font-awesome/css/font-awesome.min.css';


import Login from './components/login'
import Registration from './components/registration'
import Home from './components/home'
import Header from "./components/header";

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.authenticated = this.authenticated.bind(this);
  }

  componentWillMount() {
    $.ajaxSetup({
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
      }
    });
  }

  authenticated() {
    if(localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
     <div>
      <BrowserRouter>
        <Switch>
          <Route exact path= '/' render={ props => this.authenticated() ? <Home {...props }/> : <Redirect to='login' /> }></Route>
          <Route path= '/login' render={ props => this.authenticated() ? <Home {...props }/> : <Login {...props }/> }></Route>
          <Route path= '/register' render={ props => this.authenticated() ? <Home {...props }/> : <Registration {...props }/> }></Route>
          <Route path= '/home' render={ props => this.authenticated() ? <Home {...props }/> : <Redirect to='login' /> }></Route>
        </Switch>
      </BrowserRouter>
        </div>
    );
  }
}

ReactDOM.render(
  <App />, document.getElementById('root')
);


