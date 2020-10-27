import React from 'react'

const CompletedFreelanceCard = props => {    
    const restructuredDate = () => {
        const date = props.job.start_time
        const slicedDate = date.slice(0, 24)
        return slicedDate
    }

    const tdToReturnForHourlyVsDay = () => {
        if(props.job.dayrate_or_hourly === "Day Rate"){
            return <td>${props.job.rate}/day</td>
        } else {
            return <td>${props.job.rate}/hr</td>
        }
    }
    return (
       <tr>
           <td>{props.job.description}</td>
           <td>{props.job.client.email}</td>
           <td>{restructuredDate()}</td>
           <td>{props.job.dayrate_or_hourly}</td>
           {tdToReturnForHourlyVsDay()}
           <td>{props.job.location}</td>
           <td>{props.job.hours}</td>
           <td>${props.job.total_amount}</td>

       </tr>
    )
}

export default CompletedFreelanceCard
