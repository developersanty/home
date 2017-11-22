import React  from 'react'
import $ from 'jquery'

class Analytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mostTriggered: ''
    }
  }

  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:3002/analytics',
      success: function(data) {
        this.setState({ mostTriggered: data.most_triggered })
      }.bind(this),
      fail: function(response) {
        console.log(response)
      }
    })
  }

  render() {
    return <div className='analytics-bar'>
      <div>Analytics</div>
      <div className='analytics-content'>
        <div className='analytics-result'>{this.state.mostTriggered } is your top most trigger.</div>
      </div>
    </div>
  }
}

export default Analytics