import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import NewJobForm from '../Components/NewJobForm'
import FreelanceJobsContainer from './FreelanceJobsContainer'
import ClientJobsContainer from './ClientJobsContainer'
import {fetchAllUsers} from '../Redux/actions/UsersActions'

class JobsContainer extends React.Component{
    componentDidMount = () => {
		this.props.fetchAllUsers();
	}

    //this component will be responsible for rendering 
        // a users freelance jobs component
        // a users client-side jobs component
        // form to create a new job
        // will need access to all users upon component mounting so that we can create an instance of the job join table in the new form by finding a user through their email address
    render(){
        return(
            <div>
                <Switch>
                    <Route path="/jobs/new" render={() => <NewJobForm />}/>
                    <Route path='/jobs/freelance' render={() => <FreelanceJobsContainer />} />
                    <Route path='/jobs/clientside' render={() => <ClientJobsContainer />}/>
                </Switch>
            </div>
        )
    }
}
//doe we need curent user?
const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUsers: () => dispatch(fetchAllUsers()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobsContainer)