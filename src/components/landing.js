import React, { Component } from 'react'
import Registration from '../components/registration'
import Login from '../components/login'
import Header from "./header";
import Blocks from "../components/blocks"

class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false
    };

    this.updateLoginStatus = this.updateLoginStatus.bind(this);
  }

  componentDidMount() {
    if(localStorage.getItem('token')) {
      this.setState({ authenticated: true })
    } else {
      this.setState({ authenticated: false })
    }
  }

  updateLoginStatus(status) {
    this.setState({ authenticated: status });
  }

  render() {
    if(!this.state.authenticated) {
      return (
        <div>
          <Header/>
          <div>
            <Login loginStatus = { this.updateLoginStatus }/>
            <Registration/>
          </div>
        </div>
      )
    } else {
     return (
        <div>
          <Header logout={true} loginStatus = { this.updateLoginStatus }/>
          <div>
            <Blocks/>
          </div>
        </div>
      )
    }
  }
}

export default Landing