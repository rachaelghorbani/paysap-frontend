import React from 'react'
import {connect} from 'react-redux'
import {Table, Container} from 'react-bootstrap'
import OpenClientJobCard from '../Components/OpenClientJobCard'
import CompletedClientJobCard from '../Components/CompletedClientJobCard'

const ClientJobsContainer = (props) => {

    const openClientJobs = () => {
        const openJobs = props.user.jobs_as_client.filter(job => job.completed === false)
        return openJobs.map(job => <OpenClientJobCard key={job.id} job={job} />)
    }

    const closedClientJobs = () => {
        const closedJobs = props.user.jobs_as_client.filter(job => job.completed === true)
        return closedJobs.map(job=> <CompletedClientJobCard key={job.id} job={job}/>)
    }
    return (

        <Container>
                {/* <GoogleMap jobs={this.openJobsForMap()}/> */}
				<Table bordered className="mt-2">
					<thead>
						<tr>
							<th>Open Client Jobs</th>
						</tr>
					</thead>
				</Table>
				<Table bordered hover>
					<thead>
						<tr>
							<th>Description</th>
							<th>Freelancer Email</th>
							<th>Start Time</th>
							<th>Hourly/Day</th>
							<th>Rate</th>
							<th>Address</th>
                            <th>Edit</th>
						</tr>
					</thead>
					<tbody>

                        {openClientJobs()}
						
					</tbody>
				</Table>

				<Table bordered>
					<thead>
						<tr>
							<th>Completed Client Jobs</th>
						</tr>
					</thead>
				</Table>
				<Table  bordered hover>
					<thead>
						<tr>
						<th>Description</th>
							<th>Freelancer Email</th>
							<th>Start Time</th>
							<th>Hourly/Day</th>
							<th>Rate</th>
                            <th>Location</th>
							<th>Hours</th>
                            <th>Total Amount</th>
						</tr>
					</thead>
					<tbody>
                    {closedClientJobs()}
					</tbody>
				</Table>
			</Container>
    )
}

const mapStateToProps = state =>{
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(ClientJobsContainer)