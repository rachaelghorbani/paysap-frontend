import React from 'react'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid,Tooltip, Legend} from 'recharts';

const ComboChart = ({fl_jobs, cl_jobs}) => {

    const findMonthlyTransactions = (month, jobs) => {
        const monthlyCompleted = jobs.filter(job => job.start_time.includes(month) && job.completed === true)
        let sum = 0
        for(let job of monthlyCompleted){
            sum += job.total_amount
        }
        return sum
    }

    const data = [
        {
            name: 'Jan', 'Client Spending': findMonthlyTransactions('Jan', cl_jobs), 'Freelance Income': findMonthlyTransactions('Jan', fl_jobs)
        },
        {
            name: 'Feb', 'Client Spending': findMonthlyTransactions('Feb', cl_jobs), 'Freelance Income': findMonthlyTransactions('Feb', fl_jobs)
        },
        {
            name: 'Mar', 'Client Spending': findMonthlyTransactions('Mar', cl_jobs), 'Freelance Income': findMonthlyTransactions('Mar', fl_jobs)
        },
        {
            name: 'Apr', 'Client Spending': findMonthlyTransactions('Apr', cl_jobs), 'Freelance Income': findMonthlyTransactions('Apr', fl_jobs)
        },
        {
            name: 'May', 'Client Spending': findMonthlyTransactions('May', cl_jobs), 'Freelance Income': findMonthlyTransactions('May', fl_jobs)
        },
        {
            name: 'Jun', 'Client Spending': findMonthlyTransactions('Jun', cl_jobs), 'Freelance Income': findMonthlyTransactions('Jun', fl_jobs)
        },
        {
            name: 'Jul', 'Client Spending': findMonthlyTransactions('Jul', cl_jobs), 'Freelance Income': findMonthlyTransactions('Jul', fl_jobs)
        },
        {
            name: 'Aug', 'Client Spending': findMonthlyTransactions('Aug', cl_jobs), 'Freelance Income': findMonthlyTransactions('Aug', fl_jobs)
        },
        {
            name: 'Sep', 'Client Spending': findMonthlyTransactions('Sep', cl_jobs), 'Freelance Income': findMonthlyTransactions('Sep', fl_jobs)
        },
        {
            name: 'Oct', 'Client Spending': findMonthlyTransactions('Oct', cl_jobs), 'Freelance Income': findMonthlyTransactions('Oct', fl_jobs)
        },
        {
            name: 'Nov', 'Client Spending': findMonthlyTransactions('Nov', cl_jobs), 'Freelance Income': findMonthlyTransactions('Nov', fl_jobs)
        },
        {
            name: 'Dec', 'Client Spending': findMonthlyTransactions('Dec', cl_jobs), 'Freelance Income': findMonthlyTransactions('Dec', fl_jobs)
        }
    ];
	
    return (
        <BarChart
            width={1000}
            height={300}
            data={data}
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

export default ComboChart
