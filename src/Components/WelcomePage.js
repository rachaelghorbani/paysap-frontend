import React from 'react';
import { Button } from 'react-bootstrap';
import LoginForm from './LoginForm';
import SignUp from './SignUp';

class WelcomePage extends React.Component {
	state = {
		show_login: false,
		show_signup: false,
		show_buttons: true
	};

	loginHandler = () => {
		this.setState({show_login: true, show_buttons: false})
    };
    
    signupHandler = () => {
        this.setState({show_signup: true, show_buttons: false})
    }
    backHandler = () => {
        this.setState({show_login: false, show_signup: false, show_buttons: true})
    }

	//on click of either of the buttons, we want to hide the buttons and show the particular form
	render() {
		//onclick we want to hide the buttons and show the form instead
		//welcome page should show the buttons to log in or sign up. depending on the button, should render the proper component
		return (
			<div>
				{this.state.show_buttons ? (
					<div>
						<Button onClick={this.loginHandler}>Login</Button>
						<Button onClick={this.signupHandler}>Signup</Button>
					</div>
				) : null}
				{this.state.show_login ? <div><Button onClick={this.backHandler}>Back</Button><LoginForm /></div> : null}
				{this.state.show_signup ? <div><Button onClick={this.backHandler}>Back</Button><SignUp /> </div>: null}
			</div>
		);
	}
}

export default WelcomePage;
