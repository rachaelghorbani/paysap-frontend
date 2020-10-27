import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import navbarImg from '../assets/navbarImg.svg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './headerstyles.css';
import { logoutUser } from '../Redux/actions/UserActions';

const NavBar = (props) => {
	const localLogout = () => {
		localStorage.removeItem('token');
		props.logoutUser();
	};
	return (
		<Navbar className="NavbarText" style={{ background: '#1D3557' }} variant="dark">
			<Navbar.Brand>
				<img alt="" src={navbarImg} width="30" height="30" className="d-inline-block align-top mr-2" />
				Welcome to PAY.S.A.P. {props.user.first_name}!
			</Navbar.Brand>
			<Nav className="ml-auto align-items-center">
				<Link to="/jobs/new" className="mx-2">
					Create Job
				</Link>
				<Link to="/jobs/clientside" className="mx-2">
					My Client-Side Jobs
				</Link>
				<Link to="/jobs/freelance" className="mx-2">
					My Freelance Jobs
				</Link>
				<Link to="/profile" className="mx-2">
					Profile
				</Link>
				<Link to="/" onClick={localLogout} className="mx-2">
					Logout
				</Link>
			</Nav>
		</Navbar>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		logoutUser: () => dispatch(logoutUser())
	};
};
const mapStateToProps = (state) => {
	return {
		user: state.user
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
