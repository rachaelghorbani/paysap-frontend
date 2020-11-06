import React, {useEffect} from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import LoginForm from '../Components/LoginForm';
import SignUpForm from '../Components/SignUpForm';
import { connect } from 'react-redux';
import { resetSuccessfulLogin } from '../Redux/actions/UserActions';
import logo3 from '../assets/logo3.svg';
import {showLogin, showSignup, hideLogin, hideSignup, showSignupAndLoginButtons, hideSignupAndLoginButtons} from '../Redux/actions/UserActions'

const WelcomeContainer = ({showLogin, hideSignupAndLoginButtons, showSignup, hideLogin, hideSignup,showSignupAndLoginButtons, resetSuccessfulLogin, showOrHideLoginAndSignupButtons, showLoginForm, showSignupForm}) => {

	const loginHandler = () => {
        showLogin()
        hideSignupAndLoginButtons()
	};

	const signupHandler = () => {
        showSignup()
        hideSignupAndLoginButtons()
    };

    useEffect(() => {
        return () => {
            hideLogin();
            hideSignup();
            showSignupAndLoginButtons();
            resetSuccessfulLogin();
        }
    }, [hideLogin, hideSignup, resetSuccessfulLogin, showSignupAndLoginButtons])
	
		return (
			<Row className="rowbkg ">
				<Col className="bkg " />
				<Col className="h-100">
					{showOrHideLoginAndSignupButtons ? (
						<div>
							<Row style={{ height: '50vh', display: 'block' }} className="align-items-center ">
								<Col className="mt-2">
									<img src={logo3} style={{ height: 300, opacity: 0.6 }} alt='paysap logo'/>
								</Col>
							</Row>
							<Row>
								<Col>
									<Button
										className="mx-2"
										style={{ backgroundColor: '#FD3D0D', border: 'none' }}
										onClick={loginHandler}
									>
										Login
									</Button>
									<Button
										className="mx-2"
										style={{ backgroundColor: '#FD3D0D', border: 'none' }}
										onClick={signupHandler}
									>
										Signup
									</Button>
								</Col>
							</Row>
						</div>
					) : null}
					{showLoginForm? (
						<div>
							<Row style={{ height: '100vh' }} className="align-items-center justify-content-center">
								<Col className="col-6">
									<LoginForm />
								</Col>
							</Row>
						</div>
					) : null}
					{showSignupForm ? (
						<div>
							<Row style={{ height: '100vh' }} className="align-items-center justify-content-center">
								<Col className="col-6">
									<SignUpForm />
								</Col>
							</Row>
						</div>
					) : null}
				</Col>
			</Row>
		);
	
}

const mapDispatchToProps = (dispatch) => {
	return {
        resetSuccessfulLogin: () => dispatch(resetSuccessfulLogin()),
        hideSignupAndLoginButtons: () => dispatch(hideSignupAndLoginButtons()),
        showSignup: () => dispatch(showSignup()),
        showLogin: () => dispatch(showLogin()),
        hideLogin: () => dispatch(hideLogin()),
        hideSignup: () => dispatch(hideSignup()),
        showSignupAndLoginButtons: () => dispatch(showSignupAndLoginButtons()),
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
