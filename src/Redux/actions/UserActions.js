export const onLoginSubmit = (user, history) => {
	return function(dispatch) {
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({ user })
		};
		fetch('http://localhost:3000/login', options).then((resp) => resp.json()).then((currentUser) => {
			if (currentUser.user) {
				localStorage.setItem('token', currentUser.jwt);
				history.push('/mysummary');

				return dispatch({ type: 'LOGIN_USER', payload: currentUser.user });
			} else if (currentUser.message) {
				return dispatch({ type: 'UNSUCCESSFUL_LOGIN', payload: false });
				// maybe send back a dispatch that changes some state key (successfulLogin) to false and then unhides something on the login page that says sorry wrong username and password
			}
		});
	};
};

export const findUserByToken = (history) => {
	return function(dispatch) {
		const token = localStorage.getItem('token');
		if (token) {
			fetch('http://localhost:3000/profile', {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
				.then((resp) => resp.json())
				.then((user) => {
					if (user.user) {
						history.push('/mysummary');
						return dispatch({ type: 'LOGIN_FROM_TOKEN', payload: user.user });
					} else {
						history.push('/');
					}
				});
		} else {
			history.push('/');
		}
	};
};

export const logoutUser = () => {
	return {
		type: 'LOGOUT_USER',
		payload: null
	};
};

export const signupUser = (user, history) => {
	return function(dispatch) {
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({ user })
		};
		fetch('http://localhost:3000/users', options).then((resp) => resp.json()).then((newUser) => {
			if (newUser.user) {
				localStorage.setItem('token', newUser.jwt);
				history.push('/mysummary');
				return dispatch({ type: 'SIGNUP_USER', payload: newUser.user });
			} else {
				return dispatch({ type: 'UNSUCCESSFUL_LOGIN', payload: false });
			}
		});
	};
};

export const resetSuccessfulLogin = () => {
	return {
		type: 'RESET_SUCCESSFUL_LOGIN',
		payload: true
	};
};

export const hideSignup = () => {
	return {
		type: 'HIDE_SIGNUP',
		payload: false
	};
};

export const showSignup = () => {
	return {
		type: 'SHOW_SIGNUP',
		payload: true
	};
};

export const hideLogin = () => {
	return {
		type: 'HIDE_LOGIN',
		payload: false
	};
};

export const showLogin = () => {
	return {
		type: 'SHOW_LOGIN',
		payload: true
	};
};

export const showSignupAndLoginButtons = () => {
	return {
		type: 'SHOW_LOGIN_AND_SIGNUP_BUTTONS',
		payload: true
	};
};

export const hideSignupAndLoginButtons = () => {
	return {
		type: 'HIDE_LOGIN_AND_SIGNUP_BUTTONS',
		payload: false
	};
};
