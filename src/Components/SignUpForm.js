import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { signupUser } from '../Redux/actions/UserActions';
import { hideSignup, showSignupAndLoginButtons, resetSuccessfulLogin } from '../Redux/actions/UserActions';
import { withRouter } from 'react-router-dom';

class SignUpForm extends React.Component {
	state = {
		username: '',
		first_name: '',
		last_name: '',
		password: '',
		email: ''
	};

	changeHandler = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	localSubmitHandler = (e) => {
        e.preventDefault();
        this.props.signupUser(this.state, this.props.history);
        this.setState({username: '',
		first_name: '',
		last_name: '',
		password: '',
		email: ''})
		// this.props.hideSignup()
		// this.props.showSignupAndLoginButtons()
	};

	backClickHandler = (e) => {
        this.props.resetSuccessfulLogin()
		this.props.hideSignup();
		this.props.showSignupAndLoginButtons();
	};

	render() {
		console.log(this.state);
		return (
			<Container>
				{this.props.successfulLogin ? null : <p>Please Fill Out All Fields/Select Another Username</p>}
				<Form onSubmit={this.localSubmitHandler}>
					<Form.Group controlId="formBasicUserName">
						<Form.Label>
							<strong>Username: </strong>
						</Form.Label>
						<Form.Control
							value={this.state.username}
							onChange={this.changeHandler}
							name="username"
							type="text"
							placeholder="Username"
						/>
					</Form.Group>
					<Form.Group controlId="formBasicFirstName">
						<Form.Label>
							<strong>First Name: </strong>
						</Form.Label>
						<Form.Control
							value={this.state.first_name}
							onChange={this.changeHandler}
							name="first_name"
							type="text"
							placeholder="First Name"
						/>
					</Form.Group>
					<Form.Group controlId="formBasicLastName">
						<Form.Label>
							<strong>Last Name: </strong>
						</Form.Label>
						<Form.Control
							value={this.state.last_name}
							onChange={this.changeHandler}
							name="last_name"
							type="text"
							placeholder="Last Name"
						/>
					</Form.Group>

					<Form.Group controlId="formBasicEmail">
						<Form.Label>
							<strong>Email Address: </strong>
						</Form.Label>
						<Form.Control
							value={this.state.email}
							onChange={this.changeHandler}
							name="email"
							type="email"
							placeholder="Enter email"
						/>
					</Form.Group>

					<Form.Group controlId="formBasicPassword">
						<Form.Label>
							<strong>Password: </strong>
						</Form.Label>
						<Form.Control
							value={this.state.password}
							onChange={this.changeHandler}
							name="password"
							type="password"
							placeholder="Password"
						/>
					</Form.Group>

					<Button className="mx-2" style={{ backgroundColor: '#FD3D0D', border: 'none' }} type="submit">
						Create Account!
					</Button>
					<Button
						className="mx-2"
						onClick={this.backClickHandler}
						style={{ backgroundColor: '#FD3D0D', border: 'none' }}
					>
						Back
					</Button>
				</Form>
			</Container>
		);
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		signupUser: (user, history) => dispatch(signupUser(user, history)),
		hideSignup: () => dispatch(hideSignup()),
        showSignupAndLoginButtons: () => dispatch(showSignupAndLoginButtons()),
        resetSuccessfulLogin: ()=> dispatch(resetSuccessfulLogin())

	};
};
const mapStateToProps = (state) => {
	return {
		successfulLogin: state.successfulLogin
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUpForm));
