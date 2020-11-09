const token = localStorage.getItem('token');

const options = (method, data) => {
	return {
		method: method,
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(data)
	};
};

export const addExpense = (expenseObj) => {
	return function(dispatch, getState) {
        fetch('http://localhost:3000/expenses', options('POST', expenseObj))
        .then((resp) => resp.json())
        .then((exp) => {
			const newArr = { ...getState().user, expenses: [ ...getState().user.expenses, exp ] };
			return dispatch({ type: 'ADD_EXPENSE', payload: newArr });
		});
	};
};

export const updateExpense = (expenseObj, id) => {

	return function(dispatch, getState) {
		fetch(`http://localhost:3000/expenses/${id}`, options('PATCH', expenseObj))
			.then((resp) => resp.json())
			.then((updatedExpense) => {
				const expenses = getState().user.expenses;
				const oldExpense = expenses.find((ex) => ex.id === id);

				const index = expenses.indexOf(oldExpense);
				expenses[index] = updatedExpense;
				const newArr = {
					...getState().user,
					expenses: expenses
				};
				return dispatch({ type: 'UPDATE_EXPENSE', payload: newArr });
			});
	};
};

export const deleteExpense = (id) => {
	return function(dispatch, getState) {
	
        fetch(`http://localhost:3000/expenses/${id}`, options('DELETE'))
        .then((resp) => resp.json())
        .then(() => {
			const expenses = getState().user.expenses;
			const filtered = expenses.filter((ex) => ex.id !== id);
			const newArr = {
				...getState().user,
				expenses: filtered
			};
			return dispatch({ type: 'DELETE_EXPENSE', payload: newArr });
		});
	};
};

export const showNewExpenseForm = () => {
	return {
		type: 'SHOW_NEW_EXPENSE_FORM',
		payload: true
	};
};

export const hideNewExpenseForm = () => {
	return {
		type: 'HIDE_NEW_EXPENSE_FORM',
		payload: false
	};
};

export const showEditExpenseForm = () => {
    return {
        type: 'SHOW_EDIT_EXPENSE_FORM',
		payload: true
    }
}

export const hideEditExpenseForm = () => {
    return {
        type: 'HIDE_EDIT_EXPENSE_FORM',
		payload: false
    }
}