import React from 'react'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid,Tooltip, Legend} from 'recharts';




class Chart extends React.Component {
    //each bar will represent a month which will have the total income for the freelancer chart and the total expenditure for the client chart. the name will be amonth
    findMonthlyTransactions = (month) => {
        //takes in a month ane returns the total for all the jobs that month
        const monthlyCompleted = this.props.jobs.filter(job => job.start_time.includes(month) && job.completed === true)
        let sum = 0
        for(let job of monthlyCompleted){
            sum += job.total_amount
        }
        return sum

    }
   

    data = [
        {
            name: 'Jan', [`${this.props.text}`]: this.findMonthlyTransactions('Jan')
        },
        {
            name: 'Feb', [`${this.props.text}`]: this.findMonthlyTransactions('Feb')
        },
        {
            name: 'Mar', [`${this.props.text}`]: this.findMonthlyTransactions('Mar')
        },
        {
            name: 'Apr', [`${this.props.text}`]: this.findMonthlyTransactions('Apr')
        },
        {
            name: 'May', [`${this.props.text}`]: this.findMonthlyTransactions('May')
        },
        {
            name: 'Jun', [`${this.props.text}`]: this.findMonthlyTransactions('Jun')
        },
        {
            name: 'Jul', [`${this.props.text}`]: this.findMonthlyTransactions('Jul')
        },
        {
            name: 'Aug', [`${this.props.text}`]: this.findMonthlyTransactions('Aug')
        },
        {
            name: 'Sep', [`${this.props.text}`]: this.findMonthlyTransactions('Sep')
        },
        {
            name: 'Oct', [`${this.props.text}`]: this.findMonthlyTransactions('Oct')
        },
        {
            name: 'Nov', [`${this.props.text}`]: this.findMonthlyTransactions('Nov')
        },
        {
            name: 'Dec', [`${this.props.text}`]: this.findMonthlyTransactions('Dec')
        }
    
    ];

	render() {
		return (
            
			<BarChart 
				width={800}
				height={300}
				data={this.data}
				// margin={{
				// 	top: 20, right: 20, left: 20, bottom: 5,
                // }}
                
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip  />
				<Legend />
				{/* <Bar dataKey="pv" stackId="a" fill="#8884d8" /> */}
				<Bar dataKey={this.props.text} stackId="a" fill={this.props.fill} />
			</BarChart>
		);
	}
}

export default Chart
