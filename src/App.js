import React from 'react';
import './App.css';
import { Route, Switch,  withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import NavBar from './Components/NavBar';
import Header from './Components/Header';
import { findUserByToken } from './Redux/actions/UserActions';
import WelcomePage from './Components/WelcomePage';
import JobsContainer from './Containers/JobsContainer';
import MySummaryContainer from './Containers/MySummaryContainer';
import MyDocumentsContainer from './Containers/MyDocumentsContainer';

class App extends React.Component {

	componentDidMount = () => {
		this.props.checkIfLoggedIn(this.props.history);
    };
    


	render() {
        console.log(this.props.user)
		//if this.props.user isnt' null show them the good stuff, otherwise just show the welcome page
		return (
			<div className="App">
				{this.props.user ? (
					<div>
						<Header />
						<NavBar />
                        <Switch>
                            <Route path="/jobs" render={() => <JobsContainer/>}/>
                            <Route path="/profile"/> 
                            <Route path="/mysummary" render={()=> <MySummaryContainer/>}/>
                            <Route path='/mydocuments' render={() => <MyDocumentsContainer />}/>
                            {/* above will render a profile component eventually */}
                        </Switch>
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
