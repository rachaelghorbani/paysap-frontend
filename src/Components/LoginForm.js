import React from 'react'
import {Container, Form, Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {onLoginSubmit} from '../Redux/actions/actions'

class LoginForm extends React.Component {

    
        state={
            username: "",
            password: ""
        }
    
        changeHandler = (e) => {
            this.setState({
                [e.target.name]: e.target.value
            })
        }

        localSubmitHandler = (e) => {
            e.preventDefault()
            this.props.submitUser(this.state)
        }
    
    render(){
    return (
        <Container>
        <Form onSubmit={ e => this.localSubmitHandler(e)}>
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" name="username" placeholder="Enter username" value={this.state.username} onChange={this.changeHandler}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password: </Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.changeHandler}/>
            </Form.Group>
            
            
            <Button variant="primary" type="submit">
                Submit
            </Button>
            
            
        </Form>
        </Container>
    );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submitUser: (user) => dispatch(onLoginSubmit(user))
    }
}

export default connect(null, mapDispatchToProps)(LoginForm)