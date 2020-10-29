import React from 'react';
import Chart from '../Components/Chart';
import {connect} from 'react-redux'
import {Container} from 'react-bootstrap'

class MySummaryContainer extends React.Component {
    render(){
        console.log(this.props.user.jobs_as_client)
    //will have a select here for freelance income or client spending. will change state here for value. depending on the value will hide/show one of two charts
	return (
    <Container style={{justifyContents: "center"}}>
    <Chart jobs={this.props.user.jobs_as_freelancer} text={'Total Freelance Income'}/>
    <Chart jobs={this.props.user.jobs_as_client} text="Total Client Spending"/>
    </Container>
    )
    }
};
const mapStateToProps = state => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(MySummaryContainer)
