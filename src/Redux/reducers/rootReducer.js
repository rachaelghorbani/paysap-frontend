import { combineReducers } from 'redux';

let defaultState = {
	user: null,
	users: [],
	jobs: []
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

const jobsReducer = (state = defaultState.jobs, action) => {
	switch (action.type) {
		case 'FETCH_ALL_JOBS':
			return action.payload;
		case 'CREATE_JOB':
            console.log(action.payload)
			return action.payload;
		default:
			return state;
	}
};
let rootReducer = combineReducers({
	user: userReducer,
	users: usersReducer,
	jobs: jobsReducer
});

export default rootReducer;
