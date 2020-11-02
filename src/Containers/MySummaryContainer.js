import React from 'react';
import Chart from '../ChartComponents/Chart';
import { connect } from 'react-redux';
import { Container, Form, Row, Col } from 'react-bootstrap';
import ComboChart from '../ChartComponents/ComboChart'
import 'bootstrap/dist/css/bootstrap.min.css';
import ExpenseContainer from './ExpenseContainer';



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
	    } else if(e.target.value === "Client Payments"){
	        this.setState({showFL: false, showCL: true, showCC:false})
	    } else if(e.target.value === "Comparison"){
	        this.setState({showFL: false, showCL: false, showCC:true})
        }
	};
	render() {
		//will have a select here for freelance income or client spending. will change state here for value. depending on the value will hide/show one of two charts
		return (
            <div>
			<Container >
                <Row className='justify-content-start'>
                    <Col style={{fontSize: 36}} >Summary for {this.props.user.first_name}</Col>
                </Row>
                <Row className="justify-content-center" >
                    <Col >
                    <Form.Group  style={{width: 250, marginLeft: 100, marginTop: 25}}>
						<Form.Control  onChange={this.changeHandler} as="select" size="med">
							<option>Freelance Income</option>
							<option>Client Payments</option>
                            <option>Comparison</option>
						</Form.Control>
					</Form.Group>
                    </Col>
                </Row>


                {/* <div style={{fontSize: 40, marginTop: 10}}>Welcome {this.props.user.first_name}!</div> */}

				{/* <div className="mt-2 justify-contents-right" style={{ width: 200 }}>
					<Form.Group>
						<Form.Control onChange={this.changeHandler} as="select" size="med">
							<option>Freelance Income</option>
							<option>Client Payments</option>
                            <option>Comparison</option>
						</Form.Control>
					</Form.Group>
				</div> */}
              
				{this.state.showFL ? <Row className='justify-content-center'><Col className="col-11"><Chart jobs={this.props.user.jobs_as_freelancer} fill='#05449D'text={'Total Freelance Income'} /></Col></Row>
				 : null}
                {this.state.showCL? <Row className='justify-content-center'><Col className="col-11"><Chart jobs={this.props.user.jobs_as_client} fill='#FD3D0D' text="Total Client Payments" /></Col></Row> : null}
                {this.state.showCC? <Row className='justify-content-center'><Col className="col-11"><ComboChart fl_jobs={this.props.user.jobs_as_freelancer} cl_jobs={this.props.user.jobs_as_client}/></Col></Row> : null}
				
			</Container>
            <Container>
                <ExpenseContainer />
            </Container>
            </div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		user: state.user
	};
};
export default connect(mapStateToProps)(MySummaryContainer);
