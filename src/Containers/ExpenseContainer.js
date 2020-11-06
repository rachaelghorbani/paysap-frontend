import React from 'react';
import { Table, Form, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import ExpenseCard from '../Components/ExpenseCard';
import { Button, Row, Col } from 'react-bootstrap';
import NewExpenseForm from '../Components/NewExpenseForm';
import {showNewExpenseForm} from '../Redux/actions/ExpenseActions'
import {setExpenseCategory} from '../Redux/actions/SortActions'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import ReactToExcel from 'react-html-table-to-excel'


class ExpenseContainer extends React.Component {
// try to use redux for the start and end date and setting them. also try and change filter date function to take a key also (start_time or date, so can sue it here too)

    state = {
        startDate: '',
        endDate: ''
    }
	
	//need to render all expenses
	//will need to have some kind of state for the search selections that we use to filter through the results
	//will need a button that will 'unhide' a new expense form that will actually be a row that we can insert into the header.
	//new expesne will be a separate form

	//on click of

	showNewExpense = () => {
        //set to true
		this.props.showNewExpenseForm()
    };
    
    filterByDate = () => {
        //first check to make sure the dates are not empty adn that start date is not greater than end date
        //must dateparse first 
        //if all good, filter through expenses cchking that date is between the two numbers and return an array. 
        //probably will pass this to sortByCat]
        const parsedStartDate = Date.parse(this.state.startDate)
        const parsedEndDate = Date.parse(this.state.endDate)

        if(this.state.startDate !== '' && this.state.endDate !=='' && this.state.startDate !== null && this.state.endDate !== null && parsedStartDate <= parsedEndDate ){
        // const parsedStartDate = Date.parse(this.state.startDate)
        // const parsedEndDate = Date.parse(this.state.endDate)
        //     if(parsedStartDate <= parsedEndDate){
                return this.props.user.expenses.filter(ex => {
                    const parsedExpenseDate = Date.parse(ex.date)
                    return parsedExpenseDate >= parsedStartDate && parsedExpenseDate <= parsedEndDate
                })
            // }
        } else{
            return this.props.user.expenses
        }
    }

    sortByCat = cat => {
        if(cat === 'All'){
            return this.filterByDate()
        } else {
            return this.filterByDate().filter(exp => exp.category === cat)
        }
    }
	renderExpenses = () => {
       
        const sorted = () => {
            return this.sortByCat(this.props.expenseCategory).sort((a, b) => {
                return Date.parse(b.date) - Date.parse(a.date)
            })
        }
		return sorted().map((e) => <ExpenseCard key={e.id} expense={e} />);
    };
    
    setFilterCategory = (e) => {
        this.props.setExpenseCategory(e.target.value)
    }

    startDateChangeHandler = (date) => {
        this.setState({startDate: date})
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
   

	showOrHideForm = () => {
		if (this.props.showOrHideNewExpenseForm) {
			return (
				<div>
					<Table bordered className="mt-2">
						<thead>
							<tr>
								<th style={{fontSize: 14}}>My Expenses</th>
							</tr>
						</thead>
					</Table>

					<Table bordered>
						<thead>
							<tr>
								<th>Date</th>
								<th>Description</th>
								<th>Category</th>
								<th>Amount</th>
								<th>Save</th>
								<th>Back</th>
							</tr>
						</thead>
						<tbody>
							<NewExpenseForm />
						</tbody>
					</Table>
				</div>
			);
		} else {
			return (
				<Table bordered className="mt-2">
					<thead>
						<tr>
							<th style={{fontSize: 14}}>My Expenses</th>
						</tr>
						<tr >
							<th >
                            <Row className='mb-2'>
                                <Col className="d-flex align-items-center">
								<Button onClick={this.showNewExpense} style={{ fontSize: 12 }} >
									Add Expense
								</Button>
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
                                Start Date: <DatePicker className='dateSort'onChange={this.startDateChangeHandler} selected={this.state.startDate}/> End Date: <DatePicker className='dateSort' onChange={this.endDateChangeHandler} selected={this.state.endDate}/><Button onClick={this.resetDate}style={{ fontSize: 12 , marginLeft: 6}}>Reset</Button>
                                {/* will need two date selectors, a button to filter and a button to reset */}
                                
                                {/* date range selector will go here on left */}
                                </Col>
                                <Col className="d-flex align-items-center justify-content-end">
                                    Filter by Category:
                            <InputGroup style={{ width: 100, marginLeft: 6}} >
							<Form.Control
								style={{ fontSize: 12 }}
								onChange={this.setFilterCategory}
								value={this.props.expenseCategory}
								name="category"
								as="select"
							>
                                <option>All</option>
								<option>Materials and Supplies</option>
								<option>Meals</option>
								<option>Office Expenses</option>
								<option>Health and Medical</option>
								<option>Travel</option>
								<option>Misc.</option>
							</Form.Control>
						</InputGroup>
                        </Col>
                        </Row>
                        </th>
						</tr>
					</thead>
				</Table>
			);
		}
	};

	render() {
		return (
			<div>
                {this.showOrHideForm()}
				{/* <Table bordered className="mt-2">
					<thead>
						<tr>
							<th>My Expenses</th>
						</tr> */}
						{/* if hidesearchrow is false, show the add expense and sort stuff. otherwise show thenew row */}
						{/* <tr>
						<th > <Button style={{marginLeft: -250, fontSize: 12}}>Add Expense</Button>maybe new job button over here somewhwere too date range selector will go here on left. sorting by category/search on the right</th>
					</tr> */}
					{/* </thead> */}
					{/* {this.showOrHideForm()}
				</Table> */}
				<Table bordered hover id='table-to-xls'>
					<thead>
						<tr>
							<th>Date</th>
							<th>Description</th>
							<th>Category</th>
							<th>Amount</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>{this.renderExpenses()}</tbody>
				</Table>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
        user: state.user,
        showOrHideNewExpenseForm: state.showOrHideNewExpenseForm,
        expenseCategory: state.expenseCategory
	};
};
const mapDispatchToProps = dispatch => {
    return {
        showNewExpenseForm: ()=> dispatch(showNewExpenseForm()),
        setExpenseCategory: category => dispatch(setExpenseCategory(category))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseContainer);
