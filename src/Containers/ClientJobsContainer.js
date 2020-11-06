import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { Table, Container } from 'react-bootstrap';
import OpenClientJobCard from '../Components/OpenClientJobCard';
import CompletedJobCard from '../Components/CompletedJobCard';
import DateFilterAndExcelRow, { filterByDate } from '../Components/DateFilterAndExcelRow';
import { setEndDateForFilter, setStartDateForFilter } from '../Redux/actions/SortActions';

const ClientJobsContainer = ({user, filterStartDate, filterEndDate, setStartDateForFilter, setEndDateForFilter}) => {

	const openClientJobs = () => {
		const openJobs = user.jobs_as_client.filter((job) => job.completed === false);
		const sorted = () => {
			return openJobs.sort((a, b) => {
				return Date.parse(b.start_time) - Date.parse(a.start_time);
			});
		};
		return sorted().map((job) => <OpenClientJobCard key={job.id} job={job} />);
	};

	const closedClientJobs = () => {
		return filterByDate(user.jobs_as_client, filterStartDate, filterEndDate, 'start_time', 'completed').map((job) => <CompletedJobCard key={job.id} job={job} email={job.freelancer_email} />);
	};

    useEffect(() => {
        return () => {
            setStartDateForFilter('');
            setEndDateForFilter('')
        }
    }, [setStartDateForFilter, setEndDateForFilter])

    
	
		return (
			<Container>
				<Table bordered className="mt-2">
					<thead>
						<tr>
							<th style={{ fontSize: 14 }}>Open Client Jobs</th>
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
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>{openClientJobs()}</tbody>
				</Table>

				<DateFilterAndExcelRow
					tableHeader="Completed Client Jobs"
					tableTitle="closed-client-jobs"
					filename="clientJobs"
				/>

				<Table id="closed-client-jobs" bordered hover>
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
					<tbody>{closedClientJobs()}</tbody>
				</Table>
			</Container>
		);
	
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		filterStartDate: state.filterStartDate,
		filterEndDate: state.filterEndDate
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		setEndDateForFilter: (date) => dispatch(setEndDateForFilter(date)),
		setStartDateForFilter: (date) => dispatch(setStartDateForFilter(date))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientJobsContainer);
