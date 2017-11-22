import React from 'react'
import { Redirect } from 'react-router-dom'

class Logout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logout: false
    };

    this.logout = this.logout.bind(this);
  }

  logout() {
    localStorage.removeItem("token");
    this.setState({ logout: true });
  }

  render() {
    if(this.state.logout) {
      return <Redirect to = '/login'/>
    }

    return <div className='log-out' onClick={ this.logout }>LogOut</div>
  }
}

export default Logout;