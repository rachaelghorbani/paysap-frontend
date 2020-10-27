import React from 'react';
import { connect } from 'react-redux';
import { Table, Button, Container } from 'react-bootstrap';
import CompletedFreelanceCard from '../Components/CompletedFreelanceJobCard';
import OpenFreelanceCard from '../Components/OpenFreelanceCard'



class FreelanceJobsContainer extends React.Component {
	usersFreelanceJobs = () => {
		return this.props.jobs.filter((job) => job.freelancer.id === this.props.user.id);
	};

	usersCompletedFreelanceJobs = () => {
		const completedJobs = this.usersFreelanceJobs().filter((job) => job.completed === true);
		return completedJobs.map((job) => <CompletedFreelanceCard key={job.id} job={job} />);
	};

	usersOpenFreelanceJobs = () => {
		const openJobs = this.usersFreelanceJobs().filter((job) => job.completed === false);
		return openJobs.map((job) => {
            console.log(job)
        return <OpenFreelanceCard key={job.id} job={job} />});
	};
	//will create the taable here. will then create a freelance job card that will be a table row with the appropriate buttons
	//will iterate through all jobs to get jobs where the jobs freelancer id is equal to our users id. will then filter through those to separate completed from open
	//will create a card for each and send back the job data so that we can use it to compare with our location and set the appropriate buttons
	render() {
		return (
			<Container>
				<Table bordered>
					<thead>
						<tr>
							<th>Open Freelance Jobs</th>
						</tr>
					</thead>
				</Table>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Description</th>
							<th>Client Email</th>
							<th>Start Time</th>
							<th>Hourly/Day</th>
							<th>Rate</th>
							<th>Address</th>
                            <th>Get My Location</th>
							<th>Timer</th>
							<th>Time</th>
                            
							<th>Complete Job</th>
						</tr>
					</thead>
					<tbody>
                        {this.usersOpenFreelanceJobs()}
						
					</tbody>
				</Table>

				<Table bordered>
					<thead>
						<tr>
							<th>Completed Freelance Jobs</th>
						</tr>
					</thead>
				</Table>
				<Table striped bordered hover>
					<thead>
						<tr>
						<th>Description</th>
							<th>Client Email</th>
							<th>Start Time</th>
							<th>Hourly/Day</th>
							<th>Rate</th>
                            <th>Location</th>
							<th>Hours</th>
                            <th>Total Amount</th>
						</tr>
					</thead>
					<tbody>
                    {this.usersCompletedFreelanceJobs()}
					</tbody>
				</Table>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		jobs: state.jobs
	};
};

export default connect(mapStateToProps)(FreelanceJobsContainer);
