import React from 'react';
import { Table, Form, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import ExpenseCard from '../Components/ExpenseCard';
import { Button, Row, Col } from 'react-bootstrap';
import NewExpenseForm from '../Components/NewExpenseForm';
import {showNewExpenseForm} from '../Redux/actions/ExpenseActions'
import {setExpenseCategory} from '../Redux/actions/SortActions'

class ExpenseContainer extends React.Component {
	
	//need to render all expenses
	//will need to have some kind of state for the search selections that we use to filter through the results
	//will need a button that will 'unhide' a new expense form that will actually be a row that we can insert into the header.
	//new expesne will be a separate form

	//on click of

	showNewExpense = () => {
        //set to true
		this.props.showNewExpenseForm()
	};

    sortByCat = cat => {
        if(cat === 'All'){
            return this.props.user.expenses
        } else {
            return this.props.user.expenses.filter(exp => exp.category === cat)
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

	showOrHideForm = () => {
		if (this.props.showOrHideNewExpenseForm) {
			return (
				<div>
					<Table bordered className="mt-2">
						<thead>
							<tr>
								<th>My Expenses</th>
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
							<th>My Expenses</th>
						</tr>
						<tr >
							<th >
                            <Row>
                                <Col className="d-flex align-items-center">
								<Button style={{margin: 500}} onClick={this.showNewExpense} style={{ fontSize: 12 }}>
									Add Expense
								</Button>date range selector will go here on left
                                </Col>
                                <Col className="d-flex align-items-center">
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

        console.log(this.props.expenseCategory)
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
