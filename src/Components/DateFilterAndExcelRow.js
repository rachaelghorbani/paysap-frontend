import React from 'react'
import {connect} from 'react-redux'
import {setEndDateForFilter, setStartDateForFilter} from '../Redux/actions/SortActions'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import ReactToExcel from 'react-html-table-to-excel'
import {Table, Row, Col, Button} from 'react-bootstrap'



const DateFilterAndExcelRow = props => {

    const startDateChangeHandler = (date) => {
        props.setStartDateForFilter(date)
    }
    const endDateChangeHandler = date => {
        props.setEndDateForFilter(date)
    }

    const resetDate = () => {
        props.setEndDateForFilter('')
        props.setStartDateForFilter('')
    }
   

    return (
        <Table bordered className="mt-2">
					<thead>
						<tr>
							<th style={{fontSize: 14}}>{props.tableHeader}</th>
						</tr>
						<tr >
							<th >
                            <Row className='mb-2'>
                                <Col className="d-flex align-items-center">
								
                                <ReactToExcel 
                                    table={props.tableTitle}
                                    filename={props.filename}
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
                                onChange={startDateChangeHandler} selected={props.filterStartDate}
                                /> 
                                End Date: <DatePicker className='dateSort' 
                                onChange={endDateChangeHandler} selected={props.filterEndDate}
                                /><Button 
                                onClick={resetDate}
                                style={{ fontSize: 12 , marginLeft: 6}}>Reset</Button>
                                {/* will need two date selectors, a button to filter and a button to reset */}
                                
                                {/* date range selector will go here on left */}
                                </Col>
                                
                        </Row>
                        </th>
						</tr>
					</thead>
				</Table>
    )
}

export const filterByDate = (openCLOrFLJobs, startDate, endDate) => {
      
    const parsedStartDate = Date.parse(startDate)
    const parsedEndDate = Date.parse(endDate)

    if(startDate !== '' && endDate !=='' && startDate !== null && endDate !== null && parsedStartDate <= parsedEndDate ){
        const closedJobs = openCLOrFLJobs.filter(job => job.completed === true)
        const sorted = () => {
            return closedJobs.sort((a, b) => {
                return Date.parse(b.start_time) - Date.parse(a.start_time)
            })
        }
            return sorted().filter(cl => {
                const parsedExpenseDate = Date.parse(cl.start_time)
                return parsedExpenseDate >= parsedStartDate && parsedExpenseDate <= parsedEndDate
            })
        // }
    } else{
        const closedJobs = openCLOrFLJobs.filter(job => job.completed === true)
        
            return closedJobs.sort((a, b) => {
                return Date.parse(b.start_time) - Date.parse(a.start_time)
            })
        
    }
}


const mapStateToProps = state => {
    return {
        filterStartDate: state.filterStartDate,
        filterEndDate: state.filterEndDate
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setEndDateForFilter: date => dispatch(setEndDateForFilter(date)),
        setStartDateForFilter: date => dispatch(setStartDateForFilter(date))
    }
}
const tableRow = connect(mapStateToProps, mapDispatchToProps)(DateFilterAndExcelRow)
export {tableRow as DateFilterAndExcelRow}
// export default connect(mapStateToProps, mapDispatchToProps)(DateFilterAndExcelRow)