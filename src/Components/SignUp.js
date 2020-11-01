import React from 'react';
import { Form, Button } from 'react-bootstrap';
import {connect} from 'react-redux'
import {signupUser} from '../Redux/actions/UserActions'

class SignUp extends React.Component {
	state = {
        username: '',
        first_name: '',
        last_name: '',
        password: '',
        email: ''
    };

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    localSubmitHandler = (e) => {
        e.preventDefault()
        this.props.signupUser(this.state)
    }
	render() {
        console.log(this.state)
		return (
			<Form onSubmit={this.localSubmitHandler}>
				<Form.Group controlId="formBasicUserName">
					<Form.Label><strong>Username: </strong></Form.Label>
					<Form.Control value={this.state.username} onChange={this.changeHandler} name="username" type="text" placeholder="Username" />
				</Form.Group>
				<Form.Group controlId="formBasicFirstName">
					<Form.Label><strong>First Name: </strong></Form.Label>
					<Form.Control value={this.state.first_name}  onChange={this.changeHandler} name="first_name" type="text" placeholder="First Name" />
				</Form.Group>
				<Form.Group controlId="formBasicLastName">
					<Form.Label><strong>Last Name: </strong></Form.Label>
					<Form.Control value={this.state.last_name} onChange={this.changeHandler} name="last_name" type="text" placeholder="Last Name" />
				</Form.Group>

				<Form.Group controlId="formBasicEmail">
					<Form.Label><strong>Email Address: </strong></Form.Label>
					<Form.Control value={this.state.email} onChange={this.changeHandler} name="email" type="email" placeholder="Enter email" />
				</Form.Group>

				<Form.Group controlId="formBasicPassword">
					<Form.Label><strong>Password: </strong></Form.Label>
					<Form.Control value={this.state.password} onChange={this.changeHandler} name="password" type="password" placeholder="Password" />
				</Form.Group>

				<Button style={{ backgroundColor: '#FD3D0D', border: 'none' }} type="submit">
					Sign Up!
				</Button>
			</Form>
		);
	}
}
const mapDispatchToProps = dispatch => {
    return {
        signupUser: (user) => dispatch(signupUser(user))
    }
}
export default connect(null, mapDispatchToProps)(SignUp);
