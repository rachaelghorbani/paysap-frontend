export const showNewExpenseForm = () => {
    return {
        type: 'SHOW_NEW_EXPENSE_FORM', payload: true
    }
}

export const hideNewExpenseForm = () => {
    return {
        type: 'HIDE_NEW_EXPENSE_FORM', payload: false
    }
}

export const addExpense = (expenseObj) => {
    return function(dispatch, getState){
        const token = localStorage.getItem('token');
        const newArr = {...getState().user, expenses: [...getState().user.expenses, expenseObj]}
        console.log(newArr)

        const options = {
            method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(expenseObj)
        }

        fetch('http://localhost:3000/expenses', options)
        .then(resp => resp.json())
        .then(exp => {
            const newArr = {...getState().user, expenses: [...getState().user.expenses, exp]}
            return dispatch({type: 'ADD_EXPENSE', payload: newArr})
        })


        //need to post to expenses and then reset user when returned
    }
}

export const updateExpense = expenseObj => {
    return function(dispatch, getState){
        const token = localStorage.getItem('token');

       ;
           

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(expenseObj)
        }
        fetch(`http://localhost:3000/expenses/${expenseObj.id}`, options)
        .then(resp => resp.json())
        .then(retJob => {
            const expenses = getState().user.expenses;
			const oldExpense = expenses.find((ex) => ex.id === expenseObj.id);

			const index = expenses.indexOf(oldExpense);
			expenses[index] = retJob;
			const newArr = {
				...getState().user,
				expenses: expenses
            }
            return dispatch({type: 'UPDATE_JOB', payload: newArr })
        })

    }
}