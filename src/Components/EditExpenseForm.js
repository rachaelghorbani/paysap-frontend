import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { updateExpense, hideEditExpenseForm} from '../Redux/actions/ExpenseActions'

class EditExpenseForm extends React.Component {

    state = {
		amount: this.props.expense.amount,
		date: new Date(this.props.expense.date),
		category: this.props.expense.category,
		description: this.props.expense.description
    };

    dateChangeHandler = (date) => {
		this.setState({ date });
	};

	basicChangeHandler = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

    submitHandler = () => {
        if(this.state.date && this.state.amount !== '' && this.state.description !== ''){
            const updatedExpense = {
                amount: parseFloat(this.state.amount),
                date: this.state.date.toString(),
                category: this.state.category,
                description: this.state.description
            };
            this.props.updateExpense(updatedExpense, this.props.expense.id);
            this.props.hideEditExpenseForm()
            // this.setState({ showEditForm: false });
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

				<td className="d-flex justify-content-center">
					<InputGroup style={{ width: 200 }} className="mb-3 ">
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
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
        updateExpense: (expenseObj, id) => dispatch(updateExpense(expenseObj, id)),
        hideEditExpenseForm: () => dispatch(hideEditExpenseForm())
	};
};

export default connect(null, mapDispatchToProps)(EditExpenseForm);
