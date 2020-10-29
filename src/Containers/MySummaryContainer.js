import React from 'react';
import Chart from '../Components/Chart';
import { connect } from 'react-redux';
import { Container, Form } from 'react-bootstrap';
import ComboChart from '../Components/ComboChart'

class MySummaryContainer extends React.Component {
	state = {
		showFL: true,
        showCL: false,
        showCC: false
	};
	changeHandler = (e) => {
		//update state to show/hide chart
		if(e.target.value === "Freelance Income"){
	        this.setState({showFL: true, showCL: false, showCC: false})
	    } else if(e.target.value === "Client Spending"){
	        this.setState({showFL: false, showCL: true, showCC:false})
	    } else if(e.target.value === "Comparison"){
	        this.setState({showFL: false, showCL: false, showCC:true})
        }
	};
	render() {
        console.log(this.props.user)
		//will have a select here for freelance income or client spending. will change state here for value. depending on the value will hide/show one of two charts
		return (
			<Container style={{ justifyContents: 'center' }}>
				<div className="mt-2" style={{ width: 200 }}>
					<Form.Group>
						<Form.Control onChange={this.changeHandler} as="select" size="med">
							<option>Freelance Income</option>
							<option>Client Spending</option>
                            <option>Comparison</option>
						</Form.Control>
					</Form.Group>
				</div>
				{this.state.showFL ? <Chart jobs={this.props.user.jobs_as_freelancer} fill='#D7CDCC'text={'Total Freelance Income'} />
				 : null}
                {this.state.showCL? <Chart jobs={this.props.user.jobs_as_client} fill='#B26CA1' text="Total Client Spending" /> : null}
                {this.state.showCC? <ComboChart fl_jobs={this.props.user.jobs_as_freelancer} cl_jobs={this.props.user.jobs_as_client}/> : null
 }
				
			</Container>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		user: state.user
	};
};
export default connect(mapStateToProps)(MySummaryContainer);
