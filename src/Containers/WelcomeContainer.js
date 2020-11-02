import React from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';
import LoginForm from '../Components/LoginForm';
import SignUp from '../Components/SignUp';
import { connect } from 'react-redux';
import { resetSuccessfulLogin } from '../Redux/actions/UserActions';
import logo3 from '../assets/logo3.svg';
import {showLogin, showSignup, hideSignupAndLoginButtons} from '../Redux/actions/UserActions'

class WelcomeContainer extends React.Component {
	state = {
		show_login: false,
		show_signup: false,
		show_buttons: true
	};

	loginHandler = () => {
        this.props.showLogin()
        this.props.hideSignupAndLoginButtons()
		//will have to be a dispatch now
		// this.setState({ show_login: true, show_buttons: false });
	};

	signupHandler = () => {
        this.props.showSignup()
        this.props.hideSignupAndLoginButtons()
		// this.setState({ show_signup: true, show_buttons: false });
	};

	// backToLoginOrSignupOptions = () => {
	// 	this.props.resetSuccessfulLogin();
	// 	this.setState({ show_login: false, show_signup: false, show_buttons: true });
	// };

	//on click of either of the buttons, we want to hide the buttons and show the particular form
	render() {
		//onclick we want to hide the buttons and show the form instead
		//welcome page should show the buttons to log in or sign up. depending on the button, should render the proper component
		return (
			// <div>
			<Row className="rowbkg ">
				<Col className="bkg " />
				<Col className="h-100">
					{this.props.showOrHideLoginAndSignupButtons ? (
						<div>
							<Row style={{ height: '50vh', display: 'block' }} className="align-items-center ">
								<Col className="mt-2">
									<img src={logo3} style={{ height: 300, opacity: 0.6 }} />
								</Col>
							</Row>
							<Row>
								<Col>
									<Button
										className="mx-2"
										style={{ backgroundColor: '#FD3D0D', border: 'none' }}
										onClick={this.loginHandler}
									>
										Login
									</Button>
									<Button
										className="mx-2"
										style={{ backgroundColor: '#FD3D0D', border: 'none' }}
										onClick={this.signupHandler}
									>
										Signup
									</Button>
								</Col>
							</Row>
						</div>
					) : null}
					{this.props.showLoginForm? (
						<div>
							<Row style={{ height: '100vh' }} className="align-items-center justify-content-center">
								<Col className="col-6">
									{/* <Button
										style={{ backgroundColor: '#FD3D0D', border: 'none' }}
										onClick={this.backToLoginOrSignupOptions}
									>
										Back
									</Button> */}
									<LoginForm />
								</Col>
							</Row>
						</div>
					) : null}
					{this.props.showSignupForm ? (
						<div>
							<Row style={{ height: '100vh' }} className="align-items-center justify-content-center">
								<Col className="col-6">
									{/* <Button
										style={{ backgroundColor: '#FD3D0D', border: 'none' }}
										onClick={this.backToLoginOrSignupOptions}
									>
										Back
									</Button> */}
									<SignUp />
								</Col>
							</Row>
						</div>
					) : null}
				</Col>
			</Row>
			// {/* {this.state.show_buttons ? (
			// 	<div>
			// 		<Button onClick={this.loginHandler}>Login</Button>
			// 		<Button onClick={this.signupHandler}>Signup</Button>
			// 	</div>
			// ) : null}
			// {this.state.show_login ? <div><Button onClick={this.backToLoginOrSignupOptions}>Back</Button><LoginForm /></div> : null}
			// {this.state.show_signup ? <div><Button onClick={this.backToLoginOrSignupOptions}>Back</Button><SignUp /> </div>: null} */}

			// {/* </div> */}
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
        resetSuccessfulLogin: () => dispatch(resetSuccessfulLogin()),
        hideSignupAndLoginButtons: () => dispatch(hideSignupAndLoginButtons()),
        showSignup: () => dispatch(showSignup()),
        showLogin: () => dispatch(showLogin())
	};
};

const mapStateToProps = (state) => {
	return {
		showLoginForm: state.showLoginForm,
		showSignupForm: state.showSignupForm,
		showOrHideLoginAndSignupButtons: state.showOrHideLoginAndSignupButtons
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeContainer);
