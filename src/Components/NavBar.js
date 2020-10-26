import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import navbarImg from './navbarImg.svg'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './headerstyles.css'
import {logoutUser} from '../Redux/actions/actions'



const NavBar = (props) => {

    const localLogout = () => {
        localStorage.removeItem("token")
       props.logoutUser()
    }
    return (
  
        <Navbar className = "NavbarText" style={{background: "#1D3557"}} variant="dark">
          <Navbar.Brand>
            <img
              alt=""
              src={navbarImg}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            
            Welcome to PAY.S.A.P. {props.user.first_name}!
          </Navbar.Brand>
          <Nav className="ml-auto align-items-center">
              <Link className="mx-2" to='/xomeplace'>
              My Jobs
              </Link >
              <Link className="mx-2" to='/profile'>
                Profile
              </Link>
              <Link onClick={localLogout}className="mx-2" to='/'>
              Logout
              </Link>
          </Nav>
        </Navbar>
      
    )
}

const mapDispatchToProps = dispatch => {
    return {
        logoutUser: () => dispatch(logoutUser())
    }
}
const mapStateToProps = state => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NavBar)