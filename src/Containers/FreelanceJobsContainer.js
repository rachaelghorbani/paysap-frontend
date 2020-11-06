import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { Table, Container} from 'react-bootstrap';
import OpenFreelanceCard from '../Components/OpenFreelanceCard'
import GoogleMap from '../GoogleComponents/GoogleMap'
import CompletedJobCard from '../Components/CompletedJobCard'
import DateFilterAndExcelRow, { filterByDate} from '../Components/DateFilterAndExcelRow'
import {setEndDateForFilter, setStartDateForFilter} from '../Redux/actions/SortActions'


const FreelanceJobsContainer = ({user, filterStartDate, filterEndDate, setStartDateForFilter, setEndDateForFilter}) => {
    
  
	const usersCompletedFreelanceJobs = () => {
		return filterByDate(user.jobs_as_freelancer, filterStartDate, filterEndDate, 'start_time', 'completed').map((job) => <CompletedJobCard key={job.id} job={job} email={job.client_email}/>);
	};

	const usersOpenFreelanceJobs = () => {
        const openJobs = user.jobs_as_freelancer.filter((job) => job.completed === false);
        const sorted = () => {
            return openJobs.sort((a, b) => {
                return Date.parse(b.start_time) - Date.parse(a.start_time)
            })
        }
		return sorted().map((job) => {
        return <OpenFreelanceCard key={job.id} job={job} />});
    };
    
    const openJobsForMap = () => {
        return user.jobs_as_freelancer.filter((job) => job.completed === false);
    }

    useEffect(() => {
        return () => {
            setStartDateForFilter('');
            setEndDateForFilter('')
        }
    }, [setStartDateForFilter, setEndDateForFilter])
  
	
		return (
			<Container>
                {/* <GoogleMap jobs={openJobsForMap()}/> */}
				<Table bordered className="mt-2">
					<thead>
						<tr>
							<th style={{fontSize: 14}}>Open Freelance Jobs</th>
						</tr>
					</thead>
				</Table>
				<Table bordered hover>
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
							<th>Hours</th>
                            
							<th>Complete Job</th>
						</tr>
					</thead>
					<tbody>
                        {usersOpenFreelanceJobs()}
					</tbody>
				</Table>

                <DateFilterAndExcelRow tableHeader='Completed Freelance Jobs' tableTitle='closed-freelance-jobs' filename='freelanceJobs' />

				<Table id='closed-freelance-jobs' bordered hover>
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
                    {usersCompletedFreelanceJobs()}
					</tbody>
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

const mapDispatchToProps = dispatch => {
    return {
        setEndDateForFilter: date => dispatch(setEndDateForFilter(date)),
        setStartDateForFilter: date => dispatch(setStartDateForFilter(date)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FreelanceJobsContainer);
