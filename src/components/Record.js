import React, { Component } from 'react';
import moment from 'moment';
import PropType from 'prop-types';

class Record extends Component {  
  render() {
    return (
      <tr>
        <td>{moment(this.props.date).format('YYYY-MM-DD')}</td>
        <td>{this.props.title}</td>
        <td>{this.props.amount}</td>
      </tr>
    );
  }
}

Record.propTypes = {
  id: PropType.string,
  date: PropType.string,
  title: PropType.string,
  amount: PropType.number,
}

export default Record;
