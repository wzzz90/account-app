import React, { Component } from 'react';

const getMonthDays = (year) => {

	//定义每个月的天数，如果是闰年第二月改为29天
  let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    monthDays[1] = 29
  }

  //保存上个月的天数 [31, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30]
  let previousMonthDays = [].concat(monthDays)
  previousMonthDays.unshift(previousMonthDays.pop())

  //获取每一个月显示数据中需要补足上个月的天数
  //通过获取每个月第一天的是星期几来推断出前面需要补全的数字

  let addDaysFromPreMonth = new Array(12)
    .fill(null)
    .map((item, index)=> {
      let day = new Date(year, index, 1).getDay()
      if (day === 0) {
        return 6
      } else {
        return day - 1
      }
    })

	//已数组形式返回一年中每个月的显示数据,每个数据为6行*7天
	  return new Array(12)
	    .fill([])
	    .map((month, monthIndex)=> {
	      let addDays = addDaysFromPreMonth[monthIndex],
	        daysCount = monthDays[monthIndex],
	        daysCountPrevious = previousMonthDays[monthIndex],
	        monthData = []
	      // //补足上一个月
	      for (addDays > 0; addDays--;) {
	        monthData.unshift(daysCountPrevious--)
	      }
	      // //添入当前月
	      for (let i = 0; i < daysCount;) {
	        monthData.push(++i)
	      }
	      
	      // //补足下一个月
	      for (let i = 42 - monthData.length, j = 0; j < i;) {
	        monthData.push(++j)
	      }

	      return monthData
	    })

}


class CalendarHeader extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="calendar-header">
  			<div className="content">
          <span className="prev" onClick={this.props.prevMonth}>《《</span>
          <span className="date-info">{this.props.year}年{this.props.month + 1}</span>
          <span className="next" onClick={this.props.nextMonth}>》》</span>			
  			</div>

			</div>
		)
	}
}

class CalendarMain extends Component {
	constructor(props) {
		super(props);
	}

	 handleDatePick(index, styleName) {
	 	switch(styleName) {
	 		case 'thisMonth':
	 			let months = this.props.viewData[this.props.month]
	 			this.props.datePick(months[index])
	 			break
	 		case 'prevMonth':
	 			this.props.prevMonth()
	 			break
	 		case 'nextMonth':
	 			let month = this.props.viewData[this.props.month]
	 			this.props.nextMonth()
	 			break

	 	}
	 }

	render() {
		let month = this.props.viewData[this.props.month], 
		    rowsInMonth = [], 
		    i = 0,
		    styleOfDays = (()=> {
        let i = month.indexOf(1),
          j = month.indexOf(1, i + 1),
          arr = new Array(42)
        arr.fill('prevMonth', 0, i)
        arr.fill('thisMonth', i, j)
        arr.fill('nextMonth', j)
        return arr
      })()
      
      
		//把每一个月的显示数据以7天为一组等分
	    month.forEach((day, index)=> {
	      if (index % 7 === 0) {
	        rowsInMonth.push(month.slice(index, index + 7))
	      }
	    })
		return (
			<table className="calendar-main">
				<thead>
					<tr>
						<th>一</th>
						<th>二</th>
						<th>三</th>
						<th>四</th>
						<th>五</th>
						<th>六</th>
						<th>七</th>
					</tr>
				</thead>
				<tbody>
					{
						rowsInMonth.map((row, rowIndex) => {
							return (
								<tr key={rowIndex}>
								{
									row.map(day => {
										return (
                      <td className={styleOfDays[i]}
                          onClick={
                            this.handleDatePick.bind
                            (this, i, styleOfDays[i])}
                          key={i++}>
                        {day}
                      </td>
										)
									})
								}
								</tr>
							)
						})
					}
				</tbody>
			</table>
		)
	}
}


class Calendar extends Component {
  constructor() {
    super();
    const now = new Date()
    this.state = {
      	year: now.getFullYear(),
      	month: now.getMonth(),
      	day: now.getDate(),
      	picked: false
    }

    this.prevMonth = this.prevMonth.bind(this)
    this.nextMonth = this.nextMonth.bind(this)
    this.datePick = this.datePick.bind(this)
    this.datePickerToggle = this.datePickerToggle.bind(this)
    
  }

  prevMonth() {
  	if(this.state.month === 0) {
  		this.setState({
  			year: --this.state.year,
  			month: 11
  		})
  	} else {
  		this.setState({
  			month: --this.state.month
  		})
  	}
  }

  nextMonth() {
  	if(this.state.month === 11) {
  		this.setState({
  			year: ++this.state.year,
  			month: 0
  		})
  	} else {
  		this.setState({
  			month: ++this.state.month
  		})
  	}
  }

  datePick(day) {
	  this.setState({day})
  }
  
  //切换日期选择器是否显示
  datePickerToggle() {
    this.refs.main.style.display = this.refs.main.style.display === 'block' ? 'none' : 'block'
  }

  render() {
  	let props = {
  		viewData: getMonthDays(this.state.year),
  		datePicked: `${this.state.year}年${this.state.month}月${this.state.day}日`
  	}

  	return (
  		<div className="calendar" ref="main">
  			<p onClick={this.datePickerToggle}>{props.datePicked}</p>
  			<div className="calendar-wrapper">
  				<CalendarHeader {...this.state} prevMonth={this.prevMonth} nextMonth={this.nextMonth}/>
  				<CalendarMain
  					{...this.state} 
  					{...props} 
  					prevMonth={this.prevMonth} 
  					nextMonth={this.nextMonth}
  					datePick={this.datePick}/>
  			</div>
  		</div>
  	)

  }
}

export default Calendar;
