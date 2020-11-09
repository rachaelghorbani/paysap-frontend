export const setExpenseCategory = (category) => {
	return {
		type: 'EXPENSE_CATEGORY',
		payload: category
	};
};

export const setStartDateForFilter = (date) => {
	return {
		type: 'SET_START_DATE',
		payload: date
	};
};

export const setEndDateForFilter = (date) => {
	return {
		type: 'SET_END_DATE',
		payload: date
	};
};
