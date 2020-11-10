import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import { hideNewExpenseForm, addExpense } from '../Redux/actions/ExpenseActions';
import { connect } from 'react-redux';

class NewExpenseForm extends React.Component {
    
	state = {
		date: '',
		description: '',
		category: 'Materials and Supplies',
		amount: null
	};

	dateChangeHandler = (date) => {
		this.setState({ date });
	};

	basicChangeHandler = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	backClickHandler = () => {
		this.props.hideNewExpenseForm();
    };
    
	addExpense = () => {
		if (this.state.date !== '' && this.state.date && this.state.description !== '' && this.state.amount) {
			const stringDate = this.state.date.toString();
            const parsedAmount = parseFloat(this.state.amount);
			const newExpense = {
				date: stringDate,
				description: this.state.description,
				category: this.state.category,
				amount: parsedAmount,
				user_id: this.props.user.id
            };
			this.props.addExpense(newExpense);
			this.props.hideNewExpenseForm();
		}
	};

	render() {
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
					<InputGroup className="mb-3">
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

				<td>
					<Button onClick={this.addExpense} style={{ fontSize: 12 }}>
						Add
					</Button>
				</td>
				<td>
					<Button onClick={this.backClickHandler} style={{ fontSize: 12 }}>
						Back
					</Button>
				</td>
			</tr>
		);
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		hideNewExpenseForm: () => dispatch(hideNewExpenseForm()),
		addExpense: (expenseObj) => dispatch(addExpense(expenseObj))
	};
};

const mapStateToProps = (state) => {
	return {
		user: state.user
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NewExpenseForm);
