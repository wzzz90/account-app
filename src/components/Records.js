import React, { Component } from 'react';
import Record from './Record';
import RecordForm from './RecordForm';
import * as RecordsAPI from '../utils/RecordsAPI';

class Records extends Component {
  constructor() {
    super();
    this.state = {
      records: [],
      errorText: null,
      isLoading: false,
    }
    this.loadData = this.loadData.bind(this)
  }
  
  async loadData() {
    try {
      let response = await RecordsAPI.getAll()
      
      this.setState({
        records: response.data,
        isLoading: true
      })
      
    } catch (error) {
      this.setState({
        isLoading: true,
        errorText: error.message
      })
    }
  }
  
  componentDidMount() {
    this.loadData()
  }
  
  render() {
    const { errorText, records, isLoading} = this.state
    let RecordsComponent;
    
    if(!isLoading) {
      RecordsComponent = <div>正在加载...</div>
    } else if(errorText) {
      RecordsComponent = <div>{errorText}</div>
    } else {
      RecordsComponent = (
        <div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {
                records.map((item, index) => <Record {...item} key={index} />)
              }
            </tbody>
          </table>
        </div>
      ); 
    }
    
    return (
      <div>
        <h2>Records</h2>
        <RecordForm init={this.loadData}/>
        {RecordsComponent}
      </div>
    )
  }
}

export default Records;

