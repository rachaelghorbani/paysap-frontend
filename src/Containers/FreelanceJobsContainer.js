import React from 'react';
import { connect } from 'react-redux';
import { Table, Container } from 'react-bootstrap';
import CompletedFreelanceCard from '../Components/CompletedFreelanceJobCard';
import OpenFreelanceCard from '../Components/OpenFreelanceCard'
import GoogleMap from '../Components/GoogleMap'



class FreelanceJobsContainer extends React.Component {


	usersCompletedFreelanceJobs = () => {
		const completedJobs = this.props.user.jobs_as_freelancer.filter((job) => job.completed === true);
		return completedJobs.map((job) => <CompletedFreelanceCard key={job.id} job={job} />);
	};

	usersOpenFreelanceJobs = () => {
		const openJobs = this.props.user.jobs_as_freelancer.filter((job) => job.completed === false);
		return openJobs.map((job) => {
        return <OpenFreelanceCard key={job.id} job={job} />});
    };
    
    openJobsForMap = () => {
        return this.props.user.jobs_as_freelancer.filter((job) => job.completed === false);

    }
	//will create the taable here. will then create a freelance job card that will be a table row with the appropriate buttons
	//will iterate through all jobs to get jobs where the jobs freelancer id is equal to our users id. will then filter through those to separate completed from open
	//will create a card for each and send back the job data so that we can use it to compare with our location and set the appropriate buttons
	render() {

		return (
			<Container>
                <GoogleMap jobs={this.openJobsForMap()}/>
				<Table bordered className="mt-2">
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
	};
};

export default connect(mapStateToProps)(FreelanceJobsContainer);
