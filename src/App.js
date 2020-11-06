import React from 'react';
import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import NavBar from './Components/NavBar';
import Header from './Components/Header';
import { findUserByToken } from './Redux/actions/UserActions';
import WelcomeContainer from './Containers/WelcomeContainer';
import JobsContainer from './Containers/JobsContainer';
import MySummaryContainer from './Containers/MySummaryContainer';
import MyDocumentsContainer from './Containers/MyDocumentsContainer';

class App extends React.Component {
    
	componentDidMount = () => {
		this.props.checkIfLoggedIn(this.props.history);
	};

	render() {
		return (
			<div className="App">
				{this.props.user ? (
					<div>
						<Header />
						<NavBar />
						<Switch>
							<Route path="/jobs" render={() => <JobsContainer />} />
							<Route path="/mysummary" render={() => <MySummaryContainer />} />
							<Route path="/mydocuments" render={() => <MyDocumentsContainer />} />
						</Switch>
					</div>
				) : (
					<div>
						<WelcomeContainer />
					</div>
				)}
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
