import { combineReducers } from 'redux';

let defaultState = {
	user: null,
	users: [],
	successfulLogin: true,
	showOrHideThumbnails: false,
	pdfUrl: '',
	showLoginForm: false,
	showSignupForm: false,
	showOrHideLoginAndSignupButtons: true,
	showOrHideNewExpenseForm: false
};

const showOrHideNewExpenseFormReducer = (state = defaultState.showOrHideNewExpenseForm, action) => {
	switch (action.type) {
		case 'SHOW_NEW_EXPENSE_FORM':
			return action.payload;
		case 'HIDE_NEW_EXPENSE_FORM':
			return action.payload;
		default:
			return state;
	}
};
const showLoginFormReducer = (state = defaultState.showLoginForm, action) => {
	switch (action.type) {
		case 'SHOW_LOGIN':
			return action.payload;
		case 'HIDE_LOGIN':
			return action.payload;
		default:
			return state;
	}
};

const showSignupFormReducer = (state = defaultState.showSignupForm, action) => {
	switch (action.type) {
		case 'SHOW_SIGNUP':
			return action.payload;
		case 'HIDE_SIGNUP':
			return action.payload;
		default:
			return state;
	}
};

const showOrHideLoginAndSignupButtonsReducer = (state = defaultState.showOrHideLoginAndSignupButtons, action) => {
	switch (action.type) {
		case 'HIDE_LOGIN_AND_SIGNUP_BUTTONS':
			return action.payload;
		case 'SHOW_LOGIN_AND_SIGNUP_BUTTONS':
			return action.payload;
		default:
			return state;
	}
};

const thumbnailReducer = (state = defaultState.showOrHideThumbnails, action) => {
	switch (action.type) {
		case 'HIDE_THUMBNAILS':
			return action.payload;
		case 'SHOW_THUMBNAILS':
			return action.payload;
		default:
			return state;
	}
};
const pdfReducer = (state = defaultState.pdfUrl, action) => {
	switch (action.type) {
		case 'PDF_URL':
			return action.payload;
		default:
			return state;
	}
};
const userReducer = (state = defaultState.user, action) => {
	switch (action.type) {
		case 'LOGIN_USER':
			return action.payload;
		case 'LOGIN_FROM_TOKEN':
			return action.payload;
		case 'LOGOUT_USER':
			return action.payload;
		case 'SIGNUP_USER':
			return action.payload;
		case 'CREATE_JOB':
			return action.payload;
		case 'COMPLETE_JOB':
			return action.payload;
		case 'UPDATE_JOB':
			return action.payload;
		case 'DELETE_JOB':
			return action.payload;
		case 'ADD_DOCUMENT':
			return action.payload;
		case 'ADD_EXPENSE':
			return action.payload;
		case 'UPDATE_EXPENSE':
			return action.payload;
		case 'DELETE_EXPENSE':
			return action.payload;
		default:
			return state;
	}
};
const usersReducer = (state = defaultState.users, action) => {
	switch (action.type) {
		case 'FETCH_ALL_USERS':
			return action.payload;
		default:
			return state;
	}
};

const successfulLoginReducer = (state = defaultState.successfulLogin, action) => {
	switch (action.type) {
		case 'UNSUCCESSFUL_LOGIN':
			return action.payload;
		case 'RESET_SUCCESSFUL_LOGIN':
			return action.payload;
		default:
			return state;
	}
};

let rootReducer = combineReducers({
	user: userReducer,
	users: usersReducer,
	successfulLogin: successfulLoginReducer,
	showOrHideThumbnails: thumbnailReducer,
	pdfUrl: pdfReducer,
	showLoginForm: showLoginFormReducer,
	showSignupForm: showSignupFormReducer,
	showOrHideLoginAndSignupButtons: showOrHideLoginAndSignupButtonsReducer,
	showOrHideNewExpenseForm: showOrHideNewExpenseFormReducer
});

export default rootReducer;
