import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import NewJobForm from '../Components/NewJobForm';
import FreelanceJobsContainer from './FreelanceJobsContainer';
import ClientJobsContainer from './ClientJobsContainer';
import { fetchAllUsers } from '../Redux/actions/UsersActions';

const JobsContainer = ({fetchAllUsers}) => {

    // need to fetch all users on mounting in order to ensure email belongs to an actual user when creating or editing a job.

	useEffect(() => {
		fetchAllUsers();
	});

	return (
		<div>
			<Switch>
				<Route path="/jobs/new" render={() => <NewJobForm />} />
				<Route path="/jobs/freelance" render={() => <FreelanceJobsContainer />} />
				<Route path="/jobs/clientside" render={() => <ClientJobsContainer />} />
			</Switch>
		</div>
    );

};

const mapStateToProps = (state) => {
	return {
        user: state.user
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchAllUsers: () => dispatch(fetchAllUsers())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(JobsContainer);
