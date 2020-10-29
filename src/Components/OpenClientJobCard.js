import React from 'react';
import {Button} from 'react-bootstrap'

class OpenClientJobCard extends React.Component {
    restructuredDate = () => {
        const date = this.props.job.start_time
        const slicedDate = date.slice(0, 21)
        return slicedDate
    }

    tdToReturnForHourlyVsDay = () => {
        if(this.props.job.dayrate_or_hourly === "Day Rate"){
            return <td>${this.props.job.rate}/day</td>
        } else {
            return <td>${this.props.job.rate}/hr</td>
        }
    }
	render() {
		const { job } = this.props;
		return (
			<tr>
				<td>{job.description}</td>
                <td><a href={`mailto: ${job.freelancer_email}`}>{job.freelancer_email}</a></td>
				<td>{this.restructuredDate()}</td>
				<td>{job.dayrate_or_hourly}</td>
                {this.tdToReturnForHourlyVsDay()}
                <td>{job.location}</td>
                <td><Button style={{fontSize: 12}}>Edit</Button></td>
			</tr>
		);
	}
}

export default OpenClientJobCard;


