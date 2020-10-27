import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import FormContainer from '../Components/NewJobForm'
import {fetchAllJobs} from '../Redux/actions/JobActions'

class JobsContainer extends React.Component{

    componentDidMount = () => {
        this.props.fetchAllJobs()
        //set all jobs in state
    }
    //this component will be responsible for rendering 
        // a users freelance jobs component
        // a users client-side jobs component
        // form to create a new job
        // will need access to all users upon component mounting so that we can create an instance of the job join table in the new form by finding a user through their email address
    render(){
        console.log(this.props.jobs)
        return(
            <div>
                <Switch>
                    <Route path="/jobs/new" render={() => <FormContainer />}/>

                    {/* <Route path='/jobs/clientside'/>
                    <Route path='/jobs/freelance'/> */}


                </Switch>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        jobs: state.jobs
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllJobs: () => dispatch(fetchAllJobs())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(JobsContainer)