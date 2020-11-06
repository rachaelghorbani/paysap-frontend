import React from 'react';
import { connect } from 'react-redux';
import { Table, Container} from 'react-bootstrap';
// import CompletedFreelanceCard from '../Components/CompletedFreelanceJobCard';
import OpenFreelanceCard from '../Components/OpenFreelanceCard'
import GoogleMap from '../GoogleComponents/GoogleMap'
import CompletedJobCard from '../Components/CompletedJobCard'
import {DateFilterAndExcelRow, filterByDate} from '../Components/DateFilterAndExcelRow'
import {setEndDateForFilter, setStartDateForFilter} from '../Redux/actions/SortActions'





class FreelanceJobsContainer extends React.Component {
  
	usersCompletedFreelanceJobs = () => {
        console.log(this.props.filterStartDate)
		return filterByDate(this.props.user.jobs_as_freelancer, this.props.filterStartDate, this.props.filterEndDate, 'start_time', 'completed').map((job) => <CompletedJobCard key={job.id} job={job} email={job.client_email}/>);
	};

	usersOpenFreelanceJobs = () => {
        const openJobs = this.props.user.jobs_as_freelancer.filter((job) => job.completed === false);
        const sorted = () => {
            return openJobs.sort((a, b) => {
                return Date.parse(b.start_time) - Date.parse(a.start_time)
            })
        }
		return sorted().map((job) => {
        return <OpenFreelanceCard key={job.id} job={job} />});
    };
    
    openJobsForMap = () => {
        return this.props.user.jobs_as_freelancer.filter((job) => job.completed === false);

    }

    componentWillUnmount = () => {
        this.props.setStartDateForFilter('')
        this.props.setEndDateForFilter('')
    }
  
	render() {
		return (
			<Container>
                <GoogleMap jobs={this.openJobsForMap()}/>
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
                        {this.usersOpenFreelanceJobs()}
						
					</tbody>
				</Table>

				{/* <Table bordered>
					<thead>
						<tr>
							<th style={{fontSize: 14}}>Completed Freelance Jobs</th>
						</tr>
					</thead>
				</Table> */}

<DateFilterAndExcelRow tableHeader='Completed Freelance Jobs' tableTitle='closed-freelance-jobs' filename='freelanceJobs' />

{/* <Table bordered className="mt-2">
					<thead>
						<tr>
							<th style={{fontSize: 14}}>Completed Freelance Jobs</th>
						</tr>
						<tr >
							<th >
                            <Row className='mb-2'>
                                <Col className="d-flex align-items-center">
								
                                <ReactToExcel 
                                    table='closed-freelance-jobs'
                                    filename='freelanceJobs'
                                    sheet='sheet 1'
                                    className='btn ml-2'
                                    id='exlButton'
                                    buttonText='Export To XLS'
                                />
                                </Col>
                                </Row>
                                <Row>
                                    <Col className = 'd-flex align-items-center'>
                                Start Date: <DatePicker className='dateSort'
                                onChange={this.startDateChangeHandler} selected={this.state.startDate}
                                /> 
                                End Date: <DatePicker className='dateSort' 
                                onChange={this.endDateChangeHandler} selected={this.state.endDate}
                                /><Button 
                                onClick={this.resetDate}
                                style={{ fontSize: 12 , marginLeft: 6}}>Reset</Button>
                                
                                </Col>
                                
                        </Row>
                        </th>
						</tr>
					</thead>
				</Table> */}
				

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
