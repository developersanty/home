import React from 'react'
import GoogleLogin from 'react-google-login';
import $ from 'jquery'
import { Link } from 'react-router-dom'
import Header from '../components/header'


class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      authenticated: false,
      errorMessage: false
    };

    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.login = this.login.bind(this);
  }

  setPassword(event) {
    this.setState({ password: event.target.value });
  }

  setEmail(event) {
    this.setState({ email: event.target.value });
  }

  login(event) {
    event.preventDefault();

    $.ajax({
      type: 'POST',
      url: 'http://localhost:3002/user_token',
      data: {
        auth: { email: this.state.email, password: this.state.password }
      }
    }).done(function(data) {
      localStorage.setItem("token", data.jwt);
      this.props.history.push('/home');
    }.bind(this)).fail(function() {
      this.setState({ errorMessage: true, authenticated: false });
    }.bind(this));
  }

  render() {
    const responseGoogle = (response) => {
      // at this point, take the user to the landing page
      console.log(response);
      console.log("Welcome " +response.profileObj.name + " You are Awesome!")
    };

    var failedAuth;
    if(this.state.errorMessage) {
      failedAuth = <div className='failed-auth'> Invalid Email/Password </div>
    }

    return (
      <div>
      <Header renderLogOut = {false}/>
      <div className='login container'>
        <h3>Login</h3>
        <div>
            {failedAuth}
          <form>
            <div className="form-group">
              <input type="email" className="form-control" id="loginEmail" name="email"  aria-describedby="emailHelp" placeholder="Enter email" onChange={this.setEmail}/>
            </div>
            <div className="form-group">
              <input type="password" className="form-control" id="loginPassword" name="password" placeholder="Password" onChange={this.setPassword}/>
            </div>
            <button type="button" className="btn btn-primary" onClick={this.login}>Login</button>
            <div className='forgot-link'>Forgot Password?<Link to={'/forgot'}>&nbsp;Reset</Link></div>
            <div className='register-link'>Don’t have an account? <Link to={'/register'}>SignUp</Link></div>
          </form>
        </div>

        <GoogleLogin
          className ='google-login'
          clientId={'906027843318-qord7bfi17stbbflfl9abbmil5khsmr0.apps.googleusercontent.com'}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        >
        <span className='google-button'> Login with Google</span>
        </GoogleLogin>
      </div>
      </div>
    )
  }
}

export default Login;