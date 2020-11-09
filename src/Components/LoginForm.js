import React from 'react'
import {Container, Form, Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {onLoginSubmit} from '../Redux/actions/UserActions'
import {withRouter} from 'react-router-dom'
import {hideLogin, showSignupAndLoginButtons, resetSuccessfulLogin} from '../Redux/actions/UserActions'

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
            this.props.submitUser(this.state, this.props.history)
            this.setState({username: "", password: ""})
            // this.props.hideLogin()
            // this.props.showSignupAndLoginButtons()


        }

        backClickHandler = (e) => {
            this.props.resetSuccessfulLogin()
            this.props.hideLogin()
            this.props.showSignupAndLoginButtons()
        }
    
    render(){
        console.log(this.state)
    return (
        <Container>
            {this.props.successfulLogin ? null : <p>Username and/or Password Incorrect</p>}
            
        <Form onSubmit={ e => this.localSubmitHandler(e)}>
            <Form.Group controlId="formBasicUsername">
                <Form.Label><strong>Username: </strong></Form.Label>
                <Form.Control type="text" name="username" placeholder="Enter username" value={this.state.username} onChange={this.changeHandler}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label><strong>Password: </strong></Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.changeHandler}/>
            </Form.Group>
            <Button className='mx-2'style={{ backgroundColor: '#FD3D0D', border: 'none'}} type="submit">
                Submit
            </Button>
            <Button className='mx-2'onClick={this.backClickHandler}style={{ backgroundColor: '#FD3D0D', border: 'none' }}>Back</Button>
            
        </Form>
        </Container>
    );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submitUser: (user, history) => dispatch(onLoginSubmit(user, history)),
        hideLogin: () => dispatch(hideLogin()),
        showSignupAndLoginButtons: () => dispatch(showSignupAndLoginButtons()),
        resetSuccessfulLogin: () => dispatch(resetSuccessfulLogin())

        
    }
}

const mapStateToProps = state => {
    return {
        successfulLogin: state.successfulLogin
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginForm))