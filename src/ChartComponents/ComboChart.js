import React from 'react'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid,Tooltip, Legend} from 'recharts';




class ComboChart extends React.Component {
    
    findMonthlyTransactionsFL = (month) => {
        const monthlyCompleted = this.props.fl_jobs.filter(job => job.start_time.includes(month) && job.completed === true)
        let sum = 0
        for(let job of monthlyCompleted){
            sum += job.total_amount
        }
        return sum

    }

    findMonthlyTransactionsCL = (month) => {
        const monthlyCompleted = this.props.cl_jobs.filter(job => job.start_time.includes(month) && job.completed === true)
        let sum = 0
        for(let job of monthlyCompleted){
            sum += job.total_amount
        }
        return sum

    }

    
   

    data = [
        {
            name: 'Jan', 'Client Spending': this.findMonthlyTransactionsCL('Jan'), 'Freelance Income': this.findMonthlyTransactionsFL('Jan')
        },
        {
            name: 'Feb', 'Client Spending': this.findMonthlyTransactionsCL('Feb'), 'Freelance Income': this.findMonthlyTransactionsFL('Feb')
        },
        {
            name: 'Mar', 'Client Spending': this.findMonthlyTransactionsCL('Mar'), 'Freelance Income': this.findMonthlyTransactionsFL('Mar')
        },
        {
            name: 'Apr', 'Client Spending': this.findMonthlyTransactionsCL('Apr'), 'Freelance Income': this.findMonthlyTransactionsFL('Apr')
        },
        {
            name: 'May', 'Client Spending': this.findMonthlyTransactionsCL('May'), 'Freelance Income': this.findMonthlyTransactionsFL('May')
        },
        {
            name: 'Jun', 'Client Spending': this.findMonthlyTransactionsCL('Jun'), 'Freelance Income': this.findMonthlyTransactionsFL('Jun')
        },
        {
            name: 'Jul', 'Client Spending': this.findMonthlyTransactionsCL('Jul'), 'Freelance Income': this.findMonthlyTransactionsFL('Jul')
        },
        {
            name: 'Aug', 'Client Spending': this.findMonthlyTransactionsCL('Aug'), 'Freelance Income': this.findMonthlyTransactionsFL('Aug')
        },
        {
            name: 'Sep', 'Client Spending': this.findMonthlyTransactionsCL('Sep'), 'Freelance Income': this.findMonthlyTransactionsFL('Sep')
        },
        {
            name: 'Oct', 'Client Spending': this.findMonthlyTransactionsCL('Oct'), 'Freelance Income': this.findMonthlyTransactionsFL('Oct')
        },
        {
            name: 'Nov', 'Client Spending': this.findMonthlyTransactionsCL('Nov'), 'Freelance Income': this.findMonthlyTransactionsFL('Nov')
        },
        {
            name: 'Dec', 'Client Spending': this.findMonthlyTransactionsCL('Dec'), 'Freelance Income': this.findMonthlyTransactionsFL('Dec')
        }
    
    ];

	render() {
		return (
            
			<BarChart
				width={1000}
				height={300}
                data={this.data}
				margin={{
					top: 20, right: 30, left: 20, bottom: 5,
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip  />
				<Legend />
				<Bar dataKey='Freelance Income' stackId="a" fill="#05449D" />
                <Bar dataKey="Client Spending" stackId="a" fill="#FD3D0D" />
			</BarChart>
		);
	}
}

export default ComboChart
