import React from 'react'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid,Tooltip, Legend} from 'recharts';

const Chart = (props) => {
    
    const findMonthlyTransactions = (month) => {
        const monthlyCompleted = props.jobs.filter(job => job.start_time.includes(month) && job.completed === true)
        let sum = 0
        for(let job of monthlyCompleted){
            sum += job.total_amount
        }
        return sum
    }

   const data = [
        {
            name: 'Jan', [`${props.text}`]: findMonthlyTransactions('Jan')
        },
        {
            name: 'Feb', [`${props.text}`]: findMonthlyTransactions('Feb')
        },
        {
            name: 'Mar', [`${props.text}`]: findMonthlyTransactions('Mar')
        },
        {
            name: 'Apr', [`${props.text}`]: findMonthlyTransactions('Apr')
        },
        {
            name: 'May', [`${props.text}`]: findMonthlyTransactions('May')
        },
        {
            name: 'Jun', [`${props.text}`]: findMonthlyTransactions('Jun')
        },
        {
            name: 'Jul', [`${props.text}`]: findMonthlyTransactions('Jul')
        },
        {
            name: 'Aug', [`${props.text}`]: findMonthlyTransactions('Aug')
        },
        {
            name: 'Sep', [`${props.text}`]: findMonthlyTransactions('Sep')
        },
        {
            name: 'Oct', [`${props.text}`]: findMonthlyTransactions('Oct')
        },
        {
            name: 'Nov', [`${props.text}`]: findMonthlyTransactions('Nov')
        },
        {
            name: 'Dec', [`${props.text}`]: findMonthlyTransactions('Dec')
        }
    
    ];

    return (
        <BarChart 
            width={1000}
            height={300}
            data={data}
            margin={{
                top: 20, right: 20, left: 20, bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip  />
            <Legend />
            <Bar dataKey={props.text} stackId="a" fill={props.fill} />
        </BarChart>
    );
}

export default Chart
