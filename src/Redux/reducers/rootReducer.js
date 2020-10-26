import { combineReducers } from 'redux';

let defaultState = {
	user: null
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

let rootReducer = combineReducers({
	user: userReducer
});

export default rootReducer;
