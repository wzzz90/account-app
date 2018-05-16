import React, { Component } from 'react';
import moment from 'moment';
import PropType from 'prop-types';
import * as RecordsAPI from '../utils/RecordsAPI';

class Record extends Component {  
  constructor() {
    super();
    this.state = {
      edit: false
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    
  }
  
  handleToggle() {
    this.setState({
      edit: !this.state.edit
    })
  }
  
  async handleDelete(event) {
    
    event.preventDefault();
    try{
      let res = await RecordsAPI.removeRecords(this.props.id)
      this.props.init()
    }catch(e){
      console.log(e)
    }
  }
  
  async handleUpdate(event) {
    event.preventDefault();
    const params = {
      id: this.props.id,
      date: this.refs.date.value,
      title: this.refs.title.value,
      amount: Number(this.refs.amount.value),
    };
    
    try{
    	let res = await RecordsAPI.updateRecords(params)
    	this.props.init()
    	this.setState({
    	  edit: false
    	})
    }catch(e){
    	console.log(e)
    	this.setState({
        edit: false
      })
    }
  }
  
  recordRow() {
    return (
      <tr>
        <td>{moment(this.props.date).format('YYYY-MM-DD')}</td>
        <td>{this.props.title}</td>
        <td>{this.props.amount}</td>
        <td>
          <button className="btn btn-info mr-1" onClick={this.handleToggle}>Edit</button>
          <button className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
        </td>
      </tr>
    ); 
  }
  
  recordRowForm() {
    return (
      <tr>
        <td>
          <input type="text" className="form-control" defaultValue={moment(this.props.date).format('YYYY-MM-DD')} ref="date"/>
        </td>
        <td><input type="text" className="form-control" defaultValue={this.props.title} ref="title"/></td>
        <td><input type="text" className="form-control" defaultValue={this.props.amount} ref="amount"/></td>
        <td>
          <button className="btn btn-info mr-1" onClick={this.handleUpdate}>Update</button>
          <button className="btn btn-danger" onClick={this.handleToggle}>Cancel</button>
        </td>
      </tr>
    ); 
  }
  
  render() {
    if(this.state.edit) {
      return this.recordRowForm()
    } else {
      return this.recordRow()
    }
  }
}

Record.propTypes = {
  id: PropType.string,
  date: PropType.string,
  title: PropType.string,
  amount: PropType.number,
}

export default Record;
