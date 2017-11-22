import React, { Component } from 'react'
import $ from 'jquery'
import {Link} from 'react-router-dom'
import Header from '../components/header'
import GoogleLogin from 'react-google-login';

class Registration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    };

    this.setEmail = this.setEmail.bind(this);
      this.setFirstName = this.setFirstName.bind(this);
      this.setLastName = this.setLastName.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.register = this.register.bind(this);
  }

  setPassword(event) {
    this.setState({ password: event.target.value });
  }

  setFirstName(event) {
    this.setState({ firstName: event.target.value });
  }

  setLastName(event) {
    this.setState({ lastName: event.target.value });
  }

  setEmail(event) {
    this.setState({ email: event.target.value });
  }

  register(event) {
    event.preventDefault();

    $.ajax({
      type: 'POST',
      url: 'http://localhost:3002/users',
      data: { email: this.state.email, password: this.state.password, first_name: this.state.firstName, last_name: this.state.lastName }
    }).then(function(data) {
      alert(data);
      // redirect the user to whatever page the user wants to login to
    });
  }

  render() {
    return (
      <div>
      <Header renderLogOut = {false}/>
      <div className='registration container'>
        <h3>SignUp</h3>
        <form>
          <div className="form-group">
            <input required='required' type="text" className="form-control" id="firstName" name="firstName" placeholder="First Name" onChange={this.setFirstName}/>
          </div>
          <div className='form-group'>
            <input required='required' type="text" className="form-control" id="lastName" name="lastName" placeholder="Last Name" onChange={this.setLastName}/>
          </div>
          <div className='form-group'>
            <input required='required' type="email" className="form-control" id="inputEmail" name="email"  aria-describedby="emailHelp" placeholder="Enter email" onChange={this.setEmail}/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>

          <div className="form-group">
            <input required type="password" className="form-control" id="inputPassword" name="password" placeholder="Password" onChange={this.setPassword}/>
          </div>
          <div className="form-group">
            <input required type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" />
          </div>
          <button type="button" className="btn-big-red" onClick={this.register}>Submit</button>
          <div className='login-link'>Already have an account? <Link to={'/login'} activeClassName="active">Login</Link></div>
        </form>
        <GoogleLogin
            className ='google-login'
            clientId={'906027843318-qord7bfi17stbbflfl9abbmil5khsmr0.apps.googleusercontent.com'}
        >
          <span className='google-button'> SignUp with Google</span>
        </GoogleLogin>
      </div>
      </div>
    )
  }
}

export default Registration;
