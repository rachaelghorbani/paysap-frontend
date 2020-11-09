import React from 'react'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid,Tooltip, Legend} from 'recharts';

const BasicChart = ({content, text, fill, dateKey, amountKey}) => {

    const findMonthlyTransactions = (month) => {
        const jobVsExp = () => {
            if(dateKey === 'start_time'){
                return content.filter(content => content[dateKey].includes(month) && content.completed === true)
            } else {
                return content.filter(content => content[dateKey].includes(month))
            }
        }
        let sum = 0
        for(let content of jobVsExp()){
            sum += content[amountKey]
        }
        return +sum.toFixed(2)
    }

   const data = [
        {
            name: 'Jan', [`${text}`]: findMonthlyTransactions('Jan')
        },
        {
            name: 'Feb', [`${text}`]: findMonthlyTransactions('Feb')
        },
        {
            name: 'Mar', [`${text}`]: findMonthlyTransactions('Mar')
        },
        {
            name: 'Apr', [`${text}`]: findMonthlyTransactions('Apr')
        },
        {
            name: 'May', [`${text}`]: findMonthlyTransactions('May')
        },
        {
            name: 'Jun', [`${text}`]: findMonthlyTransactions('Jun')
        },
        {
            name: 'Jul', [`${text}`]: findMonthlyTransactions('Jul')
        },
        {
            name: 'Aug', [`${text}`]: findMonthlyTransactions('Aug')
        },
        {
            name: 'Sep', [`${text}`]: findMonthlyTransactions('Sep')
        },
        {
            name: 'Oct', [`${text}`]: findMonthlyTransactions('Oct')
        },
        {
            name: 'Nov', [`${text}`]: findMonthlyTransactions('Nov')
        },
        {
            name: 'Dec', [`${text}`]: findMonthlyTransactions('Dec')
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
            <Bar dataKey={text} stackId="a" fill={fill} />
        </BarChart>
    );
}

export default BasicChart
