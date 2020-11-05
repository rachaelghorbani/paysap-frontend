import React from 'react'
import {connect} from 'react-redux'
import {Table, Container} from 'react-bootstrap'
import OpenClientJobCard from '../Components/OpenClientJobCard'
// import CompletedClientJobCard from '../Components/CompletedClientJobCard'
import CompletedJobCard from '../Components/CompletedJobCard'

// import DatePicker from "react-datepicker"
// import "react-datepicker/dist/react-datepicker.css"
// import ReactToExcel from 'react-html-table-to-excel'
import {DateFilterAndExcelRow, filterByDate} from '../Components/DateFilterAndExcelRow'
import {setEndDateForFilter, setStartDateForFilter} from '../Redux/actions/SortActions'


class ClientJobsContainer extends React.Component {
    // state = {
    //     startDate: '',
    //     endDate: '',

    // }

    openClientJobs = () => {
        const openJobs = this.props.user.jobs_as_client.filter(job => job.completed === false)
        const sorted = () => {
            return openJobs.sort((a, b) => {
                return Date.parse(b.start_time) - Date.parse(a.start_time)
            })
        }
        return sorted().map(job => <OpenClientJobCard key={job.id} job={job} />)
    }

    closedClientJobs = () => {
        // const closedJobs = this.props.user.jobs_as_client.filter(job => job.completed === true)
        // const sorted = () => {
        //     return closedJobs.sort((a, b) => {
        //         return Date.parse(b.start_time) - Date.parse(a.start_time)
        //     })
        // }
        return filterByDate(this.props.user.jobs_as_client, this.props.filterStartDate, this.props.filterEndDate).map(job=> <CompletedJobCard key={job.id} job={job} email={job.freelancer_email}/>)
    }

    // filterByDate = () => {
      
    //     const parsedStartDate = Date.parse(this.props.filterStartDate)
    //     const parsedEndDate = Date.parse(this.props.filterEndDate)

    //     if(this.props.filterStartDate !== '' && this.props.filterEndDate !=='' && this.props.filterStartDate !== null && this.props.filterEndDate !== null && parsedStartDate <= parsedEndDate ){
    //         const closedJobs = this.props.user.jobs_as_client.filter(job => job.completed === true)
    //         const sorted = () => {
    //             return closedJobs.sort((a, b) => {
    //                 return Date.parse(b.start_time) - Date.parse(a.start_time)
    //             })
    //         }
        
    //             return sorted().filter(cl => {
    //                 const parsedExpenseDate = Date.parse(cl.start_time)
    //                 return parsedExpenseDate >= parsedStartDate && parsedExpenseDate <= parsedEndDate
    //             })
    //         // }
    //     } else{
    //         const closedJobs = this.props.user.jobs_as_client.filter(job => job.completed === true)
            
    //             return closedJobs.sort((a, b) => {
    //                 return Date.parse(b.start_time) - Date.parse(a.start_time)
    //             })
            
    //     }
    // }

    // startDateChangeHandler = (date) => {
    //     this.setState({startDate: date})
    // }
    // endDateChangeHandler = date => {
    //     this.setState({endDate: date})
    // }

    // resetDate = () => {
    //     this.setState({startDate: '', endDate: ''})
    // }
    componentWillUnmount = () => {
        this.props.setStartDateForFilter('')
        this.props.setEndDateForFilter('')
    }
    render(){
        // console.log(filterByDate)
    return (

        <Container>
                {/* <GoogleMap jobs={this.openJobsForMap()}/> */}
				<Table bordered className="mt-2">
					<thead>
						<tr>
							<th style={{fontSize: 14}}>Open Client Jobs</th>
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
					<tbody>

                        {this.openClientJobs()}
						
					</tbody>
				</Table>

				{/* <Table bordered>
					<thead>
						<tr>
							<th style={{fontSize: 14}}>Completed Client Jobs</th>
						</tr>
					</thead>
				</Table> */}

<DateFilterAndExcelRow tableHeader='Completed Client Jobs' tableTitle='closed-client-jobs' filename='clientJobs' />

                {/* <Table bordered className="mt-2">
					<thead>
						<tr>
							<th style={{fontSize: 14}}>Completed Client Jobs</th>
						</tr>
						<tr >
							<th >
                            <Row className='mb-2'>
                                <Col className="d-flex align-items-center">
								
                                <ReactToExcel 
                                    table='closed-client-jobs'
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
                               
                                </Col>
                                
                        </Row>
                        </th>
						</tr>
					</thead>
				</Table> */}
				<Table  id='closed-client-jobs'bordered hover>
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
                    {this.closedClientJobs()}
					</tbody>
				</Table>

{/* <Table bordered className="mt-2">
					<thead>
						<tr>
							<th style={{fontSize: 14}}>Completed Client Jobs</th>
						</tr>
						<tr >
							<th >
                            <Row className='mb-2'>
                                <Col className="d-flex align-items-center">
								
                                <ReactToExcel 
                                    table='table-to-xls'
                                    filename='expenses'
                                    sheet='sheet 1'
                                    className='btn ml-2'
                                    id='exlButton'
                                    buttonText='Export To XLS'
                                />
                                </Col>
                                </Row>
                                <Row>
                                    <Col className = 'd-flex align-items-center'>
                                Start Date: <DatePicker className='dateSort'onChange={this.startDateChangeHandler} selected={this.state.startDate}/> End Date: <DatePicker className='dateSort' onChange={this.endDateChangeHandler} selected={this.state.endDate}/><Button onClick={this.resetDate}style={{ fontSize: 12 , marginLeft: 6}}>Reset</Button> */}
                                {/* will need two date selectors, a button to filter and a button to reset */}
                                
                                {/* date range selector will go here on left */}
                                {/* </Col>
                               
                        </Row>
                        </th>
						</tr>
					</thead>
				</Table> */}
			</Container>
    )
            }
}

const mapStateToProps = state =>{
    return {
        user: state.user,
        filterStartDate: state.filterStartDate,
        filterEndDate: state.filterEndDate
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setEndDateForFilter: date => dispatch(setEndDateForFilter(date)),
        setStartDateForFilter: date => dispatch(setStartDateForFilter(date)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientJobsContainer)