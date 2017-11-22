import React, { Component } from 'react'
import Header from '../components/header'
import Blocks from '../components/blocks'


class Home extends React.Component {
    render() {
    return (
      <div>
          <Header renderLogOut = {true}/>
        <Blocks />
      </div>
    )
  }
}

export default Home;
