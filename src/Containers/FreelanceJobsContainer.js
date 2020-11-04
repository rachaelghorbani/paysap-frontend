import React from 'react';
import { connect } from 'react-redux';
import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import CompletedFreelanceCard from '../Components/CompletedFreelanceJobCard';
import OpenFreelanceCard from '../Components/OpenFreelanceCard'
import GoogleMap from '../GoogleComponents/GoogleMap'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import ReactToExcel from 'react-html-table-to-excel'




class FreelanceJobsContainer extends React.Component {
    state = {
        startDate: '',
        endDate: '',

    }

    //sort by date?
	usersCompletedFreelanceJobs = () => {
        // const completedJobs = this.props.user.jobs_as_freelancer.filter((job) => job.completed === true);
        // const sorted = () => {
        //     return completedJobs.sort((a, b) => {
        //         return Date.parse(b.start_time) - Date.parse(a.start_time)
        //     })
        // }
		return this.filterByDate().map((job) => <CompletedFreelanceCard key={job.id} job={job} />);
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


    filterByDate = () => {
      
        const parsedStartDate = Date.parse(this.state.startDate)
        const parsedEndDate = Date.parse(this.state.endDate)

        if(this.state.startDate !== '' && this.state.endDate !=='' && this.state.startDate !== null && this.state.endDate !== null && parsedStartDate <= parsedEndDate ){
            const closedJobs = this.props.user.jobs_as_freelancer.filter(job => job.completed === true)
            const sorted = () => {
                return closedJobs.sort((a, b) => {
                    return Date.parse(b.start_time) - Date.parse(a.start_time)
                })
            }
        
                return sorted().filter(fl => {
                    const parsedExpenseDate = Date.parse(fl.start_time)
                    return parsedExpenseDate >= parsedStartDate && parsedExpenseDate <= parsedEndDate
                })
            // }
        } else{
            const closedJobs = this.props.user.jobs_as_freelancer.filter(job => job.completed === true)
            
                return closedJobs.sort((a, b) => {
                    return Date.parse(b.start_time) - Date.parse(a.start_time)
                })
            
        }
    }

    startDateChangeHandler = (date) => {
        this.setState({startDate: date})
    }
    endDateChangeHandler = date => {
        this.setState({endDate: date})
    }

    resetDate = () => {
        this.setState({startDate: '', endDate: ''})
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



<Table bordered className="mt-2">
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
                                    filename='clientJobs'
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
                                {/* will need two date selectors, a button to filter and a button to reset */}
                                
                                {/* date range selector will go here on left */}
                                </Col>
                                
                        </Row>
                        </th>
						</tr>
					</thead>
				</Table>
				

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
	};
};

export default connect(mapStateToProps)(FreelanceJobsContainer);
