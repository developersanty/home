import React, { Component } from 'react'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Creatable from 'react-select';
import $ from 'jquery'

class Trigger extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      blockId: this.props.blockId,
      value: this.props.value,
      triggerOptions: this.props.triggerOptions
    };

    this.updateValue = this.updateValue.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.commitTriggers = this.commitTriggers.bind(this)
  }

  componentDidMount() {
    this.triggerList();
  }

  triggerList() {
    var that = this;

    return fetch('http://localhost:3002/blocks/' +this.state.blockId + '/tags', { method: 'GET', headers: { 'Authorization': localStorage.getItem("token") } })
      .then((response) => {
        return response.json();
      }).then((json) => {
        var test = [];
        for(var i=0; i<json.length; i++) {
          test.push({ value: json[i].value, label: json[i].value })
        }
        this.setState({ value: test })
      }
    );
  }

  commitTriggers(event) {
    var oldThis = this;
    this.state.value.forEach(function(trigger) {
      oldThis.triggerUpdate(oldThis, trigger)
    })
  }

  triggerUpdate(oldThis, trigger) {
    setTimeout(function() {
      if(oldThis.state.id) {
        $.ajax({
          type: 'POST',
          url: 'http://localhost:3002/taggings/',
          data: { block_id: oldThis.state.blockId, tag_id: this.state.id }
        }).then(function(result) {
          oldThis.setState({ id: result.id })
        });
      } else {
        $.ajax({
          type: 'POST',
          url: 'http://localhost:3002/tags',
          data: { value: trigger.value},
          success: function(result) {
            $.ajax({
              type: 'POST',
              url: 'http://localhost:3002/taggings/',
              data: { block_id: oldThis.state.blockId, tag_id: result.id}
            });
          },
          fail: function() {
            console.log('failed');
          }
        })
      }
    }, 500)
  }

  updateValue(event) {
    this.setState({time: event.value})
  }

  handleSelectChange (values) {
    var oldThis = this;
    var oldValue = this.state.value;
    this.setState({ value: values });
    var oldArray = oldValue;
    var newArray = values;
    var itemsRemoved = oldArray.filter(comparer(newArray));

    itemsRemoved.forEach(function(trigger) {
      $.ajax({
        type: 'GET',
        url: 'http://localhost:3002/tags',
        data: { value: trigger.value }
      }).then(function(result) {
        $.ajax({
          type: 'DELETE',
          url: 'http://localhost:3002/taggings',
          data: { block_id: oldThis.state.blockId, tag_id: result[0].id }
        })
      });
    })

    var that = this;
    values.forEach(function(trigger) {
      that.triggerUpdate(that, trigger)
    })
  }

  render() {
    var that = this;
    return(<div className='trigger-options'>
      <Select.AsyncCreatable
        placeholder='Select (or) Add New Trigger'
        name="form-field-name"
        value={that.state.value}
        loadOptions={this.state.triggerOptions}
        onChange={this.handleSelectChange}
        multi
        closeOnSelect={true}
        clearable={false}
      />
    </div>)
  }
}

export default Trigger;

function comparer(otherArray){
  return function(current){
    return otherArray.filter(function(other){
      return other.value == current.value && other.display == current.display
    }).length == 0;
  }
}
