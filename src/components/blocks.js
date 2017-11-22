import React, { Component } from 'react'
import $ from 'jquery'
import Block from '../components/block.js'
import Profile from '../components/profile.js'
import Analytics from '../components/analytics'
import Inspiration from '../components/inspiration'

class Blocks extends React.Component {
  constructor() {
    super();

    this.state = {
      blocks: [],
      failed: 0,
      success: 0,
      currentStreak: 0,
      maxStreak: 0,
      total: 0
    }
  }

  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:3002/blocks',
      success: function(data) {
        this.updateStreaks(data);
        this.setState({ blocks: data });
      }.bind(this),
      fail: function() {
        // if its a 401, redirect to login page
      }
    })
  }

  updateStreaks(blocks) {
    var failed = 0;
    var currentStreak = 0;
    var total = 0;
    var maxStreak = 0;
    var success = 0;

    for(var i = 0; i < blocks.length; i++) {
      total = total + 1;
      if(blocks[i].status === 'failed') {
        failed = failed + 1;
        if(currentStreak > maxStreak) {
          maxStreak = currentStreak;
        }

        currentStreak = 0;
      }

      if(blocks[i].status === 'done') {
        success = success + 1;
        currentStreak = currentStreak + 1;
        if(currentStreak > maxStreak) {
          maxStreak = currentStreak;
        }
      }
    }

    this.setState({ failed: failed, currentStreak: currentStreak, maxStreak: maxStreak, total: total, success: success })
  }

  render() {
    var failed = 0;
    var newBlocks = this.state.blocks;

    return <div className='all-content'>
      <div className="mini-status-tracker">
        <div className="stats">
          <Profile name="Santhosh" />
          <div>Total Number of Days: { this.state.total }</div>
          <div>Total Successful: { this.state.success }</div>
          <div>Total Failed: { this.state.failed }</div>
          <div>Max Streak: {this.state.maxStreak}</div>
          <div>Current Streak: { this.state.currentStreak }</div>
        </div>
        <div className = "mini">
          {
            newBlocks.map((item) => {
              var status = item[`status`];
              var day = item[`day`];
              var id = item[`id`];
              var created_date = item[`blockDate`];
              created_date = new Date(created_date);
            return <div key={id} className={`${status} miniStatus`}>{created_date.getDate() }</div>
            })
          }
        </div>
      </div>
      <div className="all-blocks">
        {
          this.state.blocks.reverse().map((item) => {
            var status = item[`status`];
            var id = item[`id`];
            var day = item[`day`];
            var description = item[`description`];
            var rating = item[`rating`];
            var created_date = item[`blockDate`];
            created_date = new Date(created_date);
            created_date = created_date.getDate() + '-' + monthNames[created_date.getMonth()];

            if(status === 'failed') {
              failed = failed + 1;
            }

            if(!description) {
              description = 'add description here...'
            }

            return <Block id={id} key={id} status={status} blockDate={created_date} day={day} description={description} rating={rating}/>
          }
        )
      }
      </div>
      <div className='sidebar'>
        <Analytics />
        <Inspiration />
      </div>
    </div>
  }
}

export default Blocks;

var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
