import React from 'react';
import './App.css';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import NavBar from './Components/NavBar';
import Header from './Components/Header';
import LoginForm from './Components/LoginForm';
import { findUserByToken } from './Redux/actions/actions';
import WelcomePage from './Components/WelcomePage';

class App extends React.Component {
	componentDidMount = () => {
		this.props.checkIfLoggedIn(this.props.history);
	};

	render() {
		//if this.props.user isnt' null show them the good stuff, otherwise just show the welcome page
		return (
			<div className="App">
				{this.props.user ? (
					<div>
						<Header />
						<NavBar />
						{/* additional paths will go here with a switch statement*/}
					</div>
				) : (
					<div>
						<Header />
						<WelcomePage />
					</div>
				)}

				{/* {this.props.user ? <Redirect to="/" /> : <LoginForm />} */}
				{/* <Switch><Route path="/" /></Switch> */}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		checkIfLoggedIn: (history) => dispatch(findUserByToken(history))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
