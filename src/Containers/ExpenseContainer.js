import React from 'react';
import {Table} from 'react-bootstrap'
import {connect} from 'react-redux'
import ExpenseCard from '../Components/ExpenseCard';

const ExpenseContainer = (props) => {
    //need to render all expenses
    //will need to have some kind of state for the search selections that we use to filter through the results
    //will need a button that will 'unhide' a new expense form that will actually be a row that we can insert into the header.
    //new expesne will be a separate form
    //will need a

    const renderExpenses = () => {
        return props.user.expenses.map(e => <ExpenseCard key={e.id} expense={e}/>)
    }

    
	return (
		<div>
			<Table bordered className="mt-2">
				<thead>
					<tr >
						<th>My Expenses</th>
					</tr>
                    <tr>
						<th> maybe new job button over here somewhwere too date range selector will go here on left. sorting by category/search on the right</th>
					</tr>
				</thead>
			</Table>
			<Table bordered hover>
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
				<tbody>{renderExpenses()}</tbody>
			</Table>
		</div>
	);
};

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(ExpenseContainer);
