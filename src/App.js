import React from 'react';
import './App.css';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import NavBar from './HeaderComponents/NavBar';
import Header from './HeaderComponents/Header';
import LoginForm from './Components/LoginForm';
import { findUserByToken } from './Redux/actions/actions';

class App extends React.Component {
	componentDidMount = () => {
       this.props.checkIfLoggedIn(this.props.history);
	};

	render() {
        console.log(this.props.user)
		return (
			<div className="App">
				<Header />
				<NavBar />
				{this.props.user ? 
                <Redirect to="/" /> : 
                <LoginForm />
                }
				<Switch>{/* <Route path="/" /> */}</Switch>
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
