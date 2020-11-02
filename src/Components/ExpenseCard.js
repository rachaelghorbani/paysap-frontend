import React from 'react';
import { Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
import { updateExpense, deleteExpense } from '../Redux/actions/ExpenseActions';

class ExpenseCard extends React.Component {
	state = {
		showEditForm: false,
		amount: this.props.expense.amount,
		date: new Date(this.props.expense.date),
		category: this.props.expense.category,
		description: this.props.expense.description
	};
	restructuredDate = () => {
		return this.props.expense.date.slice(4, 15);
	};

	dateChangeHandler = (date) => {
		console.log(date);
		this.setState({ date });
	};

	basicChangeHandler = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	showEditForm = () => {
		this.setState({ showEditForm: true });
	};

	submitHandler = () => {
		const updatedExpense = {
			amount: parseFloat(this.state.amount),
			date: this.state.date.toString(),
			category: this.state.category,
			description: this.state.description
		};
		this.props.updateExpense(updatedExpense, this.props.expense.id);
		this.setState({ showEditForm: false });
		//need to create the obj to send back including id
		//need to call a redux method
		//nned to hide the form again
	};

	handleDelete = () => {
		this.props.deleteExpense(this.props.expense.id);
	};

	contentToShow = () => {
		if (this.state.showEditForm) {
			return (
				<tr>
					<td>
						<InputGroup style={{ height: 40 }} className="justify-content-center">
							<DatePicker onChange={this.dateChangeHandler} selected={this.state.date} />
						</InputGroup>
					</td>
					<td>
						<InputGroup className="mb-3">
							<FormControl
								style={{ height: 32, fontSize: 12 }}
								value={this.state.description}
								onChange={this.basicChangeHandler}
								name="description"
								aria-label="description"
								aria-describedby="basic-addon1"
							/>
						</InputGroup>
					</td>

					<td>
						<InputGroup style={{ width: 100 }} className="mb-3">
							<Form.Control
								style={{ fontSize: 12 }}
								onChange={this.basicChangeHandler}
								value={this.state.category}
								name="category"
								as="select"
							>
								<option>Materials and Supplies</option>
								<option>Meals</option>
								<option>Office Expenses</option>
								<option>Health and Medical</option>
								<option>Travel</option>
								<option>Misc.</option>
							</Form.Control>
						</InputGroup>
					</td>
					<td>
						<InputGroup className="mb-3">
							<FormControl
								style={{ height: 32, fontSize: 12 }}
								value={this.state.amount}
								onChange={this.basicChangeHandler}
								name="amount"
								aria-label="amount"
								aria-describedby="basic-addon1"
								type="number"
							/>
						</InputGroup>
					</td>

					<td colSpan="2">
						<Button onClick={this.submitHandler} style={{ fontSize: 12 }}>
							Save
						</Button>
					</td>
				</tr>
			);
		} else {
			return (
				<tr>
					<td>{this.restructuredDate()}</td>
					<td>{this.props.expense.description}</td>
					<td>{this.props.expense.category}</td>
					<td>{this.props.expense.amount}</td>
					<td>
						<Button onClick={this.showEditForm} style={{ fontSize: 12 }}>
							Edit
						</Button>
					</td>
					<td>
						<Button onClick={this.handleDelete} style={{ fontSize: 12 }}>
							Delete
						</Button>
					</td>
				</tr>
			);
		}
	};
	render() {
		console.log(this.state);
		return (
			<>{this.contentToShow()}</>

			// <tr>
			// 	<td>{this.restructuredDate()}</td>
			// 	<td>{this.props.expense.description}</td>
			// 	<td>{this.props.expense.category}</td>
			// 	<td>{this.props.expense.amount}</td>
			// 	<td>
			// 		<Button style={{ fontSize: 12 }}>Edit</Button>
			// 	</td>
			// 	<td>
			// 		<Button style={{ fontSize: 12 }}>Delete</Button>
			// 	</td>
			// </tr>
		);
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		updateExpense: (expenseObj, id) => dispatch(updateExpense(expenseObj, id)),
		deleteExpense: (id) => dispatch(deleteExpense(id))
	};
};
export default connect(null, mapDispatchToProps)(ExpenseCard);
