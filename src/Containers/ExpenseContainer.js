import React from 'react';
import { Table, Form, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import ExpenseCard from '../Components/ExpenseCard';
import { Button, Row, Col } from 'react-bootstrap';
import NewExpenseForm from '../Components/NewExpenseForm';
import { showNewExpenseForm } from '../Redux/actions/ExpenseActions';
import { setExpenseCategory, setStartDateForFilter, setEndDateForFilter } from '../Redux/actions/SortActions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactToExcel from 'react-html-table-to-excel';
import { filterByDate } from '../Components/DateFilterAndExcelRow';

class ExpenseContainer extends React.Component {
	// try to use redux for the start and end date and setting them. also try and change filter date function to take a key also (start_time or date, so can sue it here too)

	showNewExpense = () => {
		this.props.showNewExpenseForm();
	};

	sortByCat = (cat) => {
        const expenses = filterByDate(this.props.user.expenses, this.props.filterStartDate, this.props.filterEndDate, 'date')
		if (cat === 'All') {
			return expenses;
		} else {
			return expenses.filter((exp) => exp.category === cat);
		}
    };
    
	renderExpenses = () => {
		return this.sortByCat(this.props.expenseCategory).map((e) => <ExpenseCard key={e.id} expense={e} />);
	};

	setFilterCategory = (e) => {
		this.props.setExpenseCategory(e.target.value);
	};

	startDateChangeHandler = (date) => {
		this.props.setStartDateForFilter(date);
	};
	endDateChangeHandler = (date) => {
		this.props.setEndDateForFilter(date);
    };
    
    resetDate = () => {
        this.props.setEndDateForFilter('');
		this.props.setStartDateForFilter('');
    }

	componentWillUnmount = () => {
		this.resetDate()
	};

	showOrHideForm = () => {
		if (this.props.showOrHideNewExpenseForm) {
			return (
				<div>
					<Table bordered className="mt-2">
						<thead>
							<tr>
								<th style={{ fontSize: 14 }}>My Expenses</th>
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
							<th style={{ fontSize: 14 }}>My Expenses</th>
						</tr>
						<tr>
							<th>
								<Row className="mb-2">
									<Col className="d-flex align-items-center">
										<Button onClick={this.showNewExpense} style={{ fontSize: 12 }}>
											Add Expense
										</Button>
										<ReactToExcel
											table="table-to-xls"
											filename="expenses"
											sheet="sheet 1"
											className="btn ml-2"
											id="exlButton"
											buttonText="Export To XLS"
										/>
									</Col>
								</Row>
								<Row>
									<Col className="d-flex align-items-center">
										Start Date:{' '}
										<DatePicker
											className="dateSort"
											onChange={this.startDateChangeHandler}
											selected={this.props.filterStartDate}
										/>{' '}
										End Date:{' '}
										<DatePicker
											className="dateSort"
											onChange={this.endDateChangeHandler}
											selected={this.props.filterEndDate}
										/>
										<Button onClick={this.resetDate} style={{ fontSize: 12, marginLeft: 6 }}>
											Reset
										</Button>
									</Col>
									<Col className="d-flex align-items-center justify-content-end">
										Filter by Category:
										<InputGroup style={{ width: 100, marginLeft: 6 }}>
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
				<Table bordered hover id="table-to-xls">
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
		expenseCategory: state.expenseCategory,
		filterStartDate: state.filterStartDate,
		filterEndDate: state.filterEndDate
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		showNewExpenseForm: () => dispatch(showNewExpenseForm()),
		setExpenseCategory: (category) => dispatch(setExpenseCategory(category)),
		setEndDateForFilter: (date) => dispatch(setEndDateForFilter(date)),
		setStartDateForFilter: (date) => dispatch(setStartDateForFilter(date))
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseContainer);
