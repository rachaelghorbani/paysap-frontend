import React from 'react';
import {Button} from 'react-bootstrap'

const ExpenseCard = (props) => {
	return (
		<tr>
			<td>{props.expense.date}</td>

			<td>{props.expense.description}</td>
			<td>{props.expense.category}</td>
			<td>{props.expense.amount}</td>
			<td>
				<Button style={{ fontSize: 12 }}>Edit</Button>
			</td>
			<td>
				<Button style={{ fontSize: 12 }}>Delete</Button>
			</td>
		</tr>
	);
};

export default ExpenseCard;
