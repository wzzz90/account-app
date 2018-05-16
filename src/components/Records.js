import React, { Component } from 'react';
import Record from './Record';
import RecordForm from './RecordForm';
import AmountBox from './AmountBox';
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
  
  getCredit() {
    let credits = this.state.records.filter(record => {
      return record.amount >= 0;
    })
    
    return credits.reduce((prev, curr) => {
      return prev + Number.parseInt(curr.amount, 0)
    }, 0)
  }
  
  getDebit() {
    let debits = this.state.records.filter(record => {
      return record.amount < 0;
    })
    
    return debits.reduce((prev, curr) => {
      return prev + Number.parseInt(curr.amount, 0)
    }, 0)
  }
  
  getBalance() {
    return this.getDebit() + this.getCredit()
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                records.map((item, index) => <Record {...item} key={index}  init={this.loadData}/>)
              }
            </tbody>
          </table>
        </div>
      ); 
    }
    
    return (
      <div>
        <h2>Records</h2>
        <div className="row mb-3">
          <AmountBox text="Credit" type="success" amount={this.getCredit()} />
          <AmountBox text="Debit" type="danger" amount={this.getDebit()} />
          <AmountBox text="Balance" type="info" amount={this.getBalance()} />
        </div>
        <RecordForm init={this.loadData}/>
        {RecordsComponent}
      </div>
    )
  }
}

export default Records;

