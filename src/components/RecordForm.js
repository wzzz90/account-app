import React, { Component } from 'react';
import * as RecordsAPI from '../utils/RecordsAPI';

class RecordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
     date:'',
     title: '',
     amount: ''
    }
    
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  valid() {
    return this.state.date && this.state.title && this.state.amount
  }
  
  handleChange(event) {
    let name, obj;
    
    name = event.target.name;
    this.setState((
      obj = {},
      obj["" + name] = event.target.value,
      obj
    ))
  }
  
  async handleSubmit(event) {
    event.preventDefault();
    const params = {...this.state};
    params.amount = parseInt(params.amount);
    
    try{
    	let res = await RecordsAPI.addRecords(params)
    	console.log(res.data)
    	this.props.init()
    	Object.keys(params).forEach(key => {
    	  params[key] = ''
    	})
    	this.setState({
    	  ...params
    	})
    }catch(e){
    	console.log(e)
    }
    
  }
  
  render() {
    return (
      <form className="form-inline mb-3" onSubmit={this.handleSubmit}>
        <div className="form-group mr-1">
          <input type="text" className="form-control" placeholder="Date" onChange={this.handleChange} name="date" value={this.state.date} />
        </div>
        <div className="form-group mr-1">
          <input type="text" className="form-control" placeholder="Title" onChange={this.handleChange}  name="title" value={this.state.title} />
        </div>
        <div className="form-group mr-1">
          <input type="text" className="form-control" placeholder="Amount" onChange={this.handleChange}  name="amount" value={this.state.amount} />
        </div>
        <button type="submit" className="btn btn-primary" disabled={!this.valid()}>Create Record</button>
      </form>
    );
  }
}


export default RecordForm;
