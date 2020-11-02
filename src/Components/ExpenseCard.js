import React from 'react';
import {Button} from 'react-bootstrap'

const ExpenseCard = (props) => {
    const restructuredDate = () => {
        return props.expense.date.slice(0, 15)
    }

	return (
		<tr>
			<td>{restructuredDate()}</td>
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
