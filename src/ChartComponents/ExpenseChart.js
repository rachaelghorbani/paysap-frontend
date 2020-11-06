import React from 'react'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid,Tooltip, Legend} from 'recharts';

const ExpenseChart = props => {

    const findMonthlyExpenses = (month) => {
        const monthlyExpenses = props.expenses.filter(exp => exp.date.includes(month))
        let sum = 0
        for(let exp of monthlyExpenses){
            sum += exp.amount
        }
        return +sum.toFixed(2)
    }

    const fetchData = () => {
        const data = [
        {
            name: 'Jan', 'Total Expenses': findMonthlyExpenses('Jan')
        },
        {
            name: 'Feb', 'Total Expenses': findMonthlyExpenses('Feb')
        },
        {
            name: 'Mar', 'Total Expenses': findMonthlyExpenses('Mar')
        },
        {
            name: 'Apr', 'Total Expenses': findMonthlyExpenses('Apr')
        },
        {
            name: 'May', 'Total Expenses': findMonthlyExpenses('May')
        },
        {
            name: 'Jun', 'Total Expenses': findMonthlyExpenses('Jun')
        },
        {
            name: 'Jul', 'Total Expenses': findMonthlyExpenses('Jul')
        },
        {
            name: 'Aug', 'Total Expenses': findMonthlyExpenses('Aug')
        },
        {
            name: 'Sep', 'Total Expenses': findMonthlyExpenses('Sep')
        },
        {
            name: 'Oct', 'Total Expenses': findMonthlyExpenses('Oct')
        },
        {
            name: 'Nov', 'Total Expenses': findMonthlyExpenses('Nov')
        },
        {
            name: 'Dec', 'Total Expenses': findMonthlyExpenses('Dec')
        }
    
    ];
    return data
}

    return (
        <BarChart 
            width={1000}
            height={300}
            data={fetchData()}
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
            <Bar dataKey={props.dataKey} stackId="a" fill='#FFBA08' />
        </BarChart>
    );
}

export default ExpenseChart
