import React from 'react'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid,Tooltip, Legend} from 'recharts';




class ExpenseChart extends React.Component {
   


    findMonthlyExpenses = (month) => {
        
        //takes in a month ane returns the total for all the jobs that month
        const monthlyExpenses = this.props.expenses.filter(exp => exp.date.includes(month))
        let sum = 0
        for(let exp of monthlyExpenses){
            sum += exp.amount
        }
        return +sum.toFixed(2)
    

    }

   

    data = [
        {
            name: 'Jan', 'Total Expenses': this.findMonthlyExpenses('Jan')
        },
        {
            name: 'Feb', 'Total Expenses': this.findMonthlyExpenses('Feb')
        },
        {
            name: 'Mar', 'Total Expenses': this.findMonthlyExpenses('Mar')
        },
        {
            name: 'Apr', 'Total Expenses': this.findMonthlyExpenses('Apr')
        },
        {
            name: 'May', 'Total Expenses': this.findMonthlyExpenses('May')
        },
        {
            name: 'Jun', 'Total Expenses': this.findMonthlyExpenses('Jun')
        },
        {
            name: 'Jul', 'Total Expenses': this.findMonthlyExpenses('Jul')
        },
        {
            name: 'Aug', 'Total Expenses': this.findMonthlyExpenses('Aug')
        },
        {
            name: 'Sep', 'Total Expenses': this.findMonthlyExpenses('Sep')
        },
        {
            name: 'Oct', 'Total Expenses': this.findMonthlyExpenses('Oct')
        },
        {
            name: 'Nov', 'Total Expenses': this.findMonthlyExpenses('Nov')
        },
        {
            name: 'Dec', 'Total Expenses': this.findMonthlyExpenses('Dec')
        }
    
    ];

	render() {
		return (
            
            <BarChart 
				width={1000}
				height={300}
                data={this.data}
				margin={{
					top: 20, right: 20, left: 20, bottom: 5,
                }}
                
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip  />
				<Legend />
				{/* <Bar dataKey="pv" stackId="a" fill="#8884d8" /> */}
				<Bar dataKey={this.props.dataKey} stackId="a" fill='#FFBA08' />
			</BarChart>
		);
	}
}

export default ExpenseChart
