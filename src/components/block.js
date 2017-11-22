import React  from 'react'
import Trigger from '../components/trigger.js'
import ReactStars from 'react-stars'
import $ from 'jquery'
import ContentEditable from './libraries/content-editable'

class Block extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      day: this.props.day,
      blockDate: this.props.blockDate,
      status: this.props.status,
      description: 'this.props.description',
      rating: this.props.rating,
      innerContent: this.getInnerHtml(),
      tags: []
    };

    this.updateStatus = this.updateStatus.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.commitDescription = this.commitDescription.bind(this);
    this.updateRating = this.updateRating.bind(this);
  }

  updateDescription(event) {
    this.setState({ html: "<span>"+this.state.description+"</span>" })
  }

  commitDescription(event) {
    if(event.target.innerText === this.state.description) {
      return;
    }

    $.ajax({
      type: 'PUT',
      url: 'http://localhost:3002/blocks/' + this.state.id,
      data: { description: event.target.innerText }
    }).then(function(data) {
      this.setState({ description: data.description });
    }.bind(this));
  }

  getInnerHtml() {
    var description = '';
    if(this.props.description !== null) {
      description = this.props.description;
    }

    return "<span>" + description + "</span>"
  }

  updateRating(value) {
    $.ajax({
      type: 'PUT',
      url: 'http://localhost:3002/blocks/' + this.state.id,
      data: { rating: value }
    }).then(function(data) {
      this.setState({rating: data.rating});
    }.bind(this));
  }

  updateStatus(e) {
    var newStatus = getNewStatus(this.state.status);

    $.ajax({
      type: 'PUT',
      url: 'http://localhost:3002/blocks/' + this.state.id,
      data: {status: newStatus}
    }).then(function(data) {
      this.setState({ status: data.status });
    }.bind(this));
  }

  render() {
    const getOptions = (input) => {
    return fetch('http://localhost:3002/tags', { headers: { 'Authorization': localStorage.getItem('token')  } })
      .then((response) => {
        return response.json();
      }).then((json) => {
        var tags = [];
        for(var i=0; i<json.length; i++) {
          tags.push({ value: json[i].value, label: json[i].value })
        }

        return { options: tags }
      });
    };

    var classStyle = "card-top-" + this.state.status;
    var result = this.state.status;
    var colorMode;
    var styleClass = '';
    if(this.state.status === 'done') {
      result = "Success";
        colorMode = 'done-color';
        styleClass = 'fa fa-check';
    } else if(this.state.status === 'failed') {
      styleClass = 'fa fa-times';
        colorMode = 'failed-color';
        result = 'Relapsed';
    } else {
      styleClass = 'fa fa-power-off';
      colorMode = 'pending-color';
      result = 'Pending';
    }

    return(
      <div className={`block ${classStyle}`} key={this.state.id} id={this.state.id} >
        <div className="block-header wrapper">
          <div className="ribbon-wrapper-green">
          <div className="ribbon-green">{result}</div>
        </div>
          <div className ={`status-updater ${this.state.status}`} onClick={this.updateStatus}>
          </div>
          <div className="date-reader"> Day { this.state.day }
            <div className="rating">
              <ReactStars count={5} size={24} value={this.state.rating} onChange={this.updateRating} color2={'#1496bb'} half={false} size={15}/>
            </div>
          </div>

          <div className='units'>
            <div className='unit-button button'>P</div>
            <div className='unit-button button'>M</div>
            <div className='unit-button button'>O</div>
            <div className='meter'>
              <input type="range" min="0" max="10" value="2"/>
            </div>
          </div>


        </div>
        <div className = "triggers">
          <Trigger blockId={this.state.id} triggerOptions = {getOptions}/>
        </div>
        <div className="contentEditableWrapper">
          <ContentEditable placeholder="Add Text here..." className = "edit-area" html={this.state.innerContent} onChange={this.updateDescription} onBlur={this.commitDescription}/>
        </div>
      </div>
    )
  }
}

function getNewStatus(oldStatus) {
  if(oldStatus === 'pending' || oldStatus === 'Pending') {
    return 'done';
  }

  if(oldStatus == 'done') {
    return 'failed';
  }

  if(oldStatus === 'failed') {
    return 'pending' ;
  }
}

export default Block;
