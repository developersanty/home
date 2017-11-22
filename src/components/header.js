import React, { Component } from 'react'
import logo from '../images/logo.svg';
import { Link } from 'react-router-dom'
import Logout from "../components/logout";

class Header extends React.Component {
  render() {
    const logout = () => {
      if(this.props.renderLogOut) {
        return <Logout />
      }
    };

    return (
      <div>
        <div className="App-header">
          {logout()}
          <Link to={'/'}>
            <img src={logo} className="App-logo" alt="logo" />
            <span className='app-title'>pixelSpite</span>
          </Link>
          </div>
        <div className="push"></div>
      </div>
    )
  }
}

export default Header;