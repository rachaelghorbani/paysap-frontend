import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import navbarImg from '../assets/navbarImg.svg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
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
				Welcome to PAY.S.A.P. {props.user.first_name}! ACCT: xxxxxx{props.user.account.account_number}, BAL:  ${props.user.account.amount}
			</Navbar.Brand>
			<Nav className="ml-auto align-items-center">
            <Link to="/mysummary" className="mx-2">
					My Summary
				</Link>
				<NavDropdown title="Jobs" id="basic-nav-dropdown">
					<NavDropdown.Item>
						<Link to="/jobs/new" className="mx-2">
							Create Job
						</Link>
					</NavDropdown.Item>
					<NavDropdown.Item>
						<Link to="/jobs/clientside" className="mx-2">
							My Client-Side Jobs
						</Link>
					</NavDropdown.Item>
					<NavDropdown.Item>
						<Link to="/jobs/freelance" className="mx-2">
							My Freelance Jobs
						</Link>
					</NavDropdown.Item>
				</NavDropdown>
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
