import { combineReducers } from 'redux';

let defaultState = {
	user: null,
	users: [],
	successfulLogin: true
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
	successfulLogin: successfulLoginReducer
});

export default rootReducer;
