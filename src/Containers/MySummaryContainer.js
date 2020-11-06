import React from 'react';
import Chart from '../ChartComponents/Chart';
import { connect } from 'react-redux';
import { Container, Form, Row, Col } from 'react-bootstrap';
import ComboChart from '../ChartComponents/ComboChart';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExpenseContainer from './ExpenseContainer';
import ExpenseChart from '../ChartComponents/ExpenseChart';

class MySummaryContainer extends React.Component {

	state = {
		showFL: true,
		showCL: false,
		showCC: false,
		showEX: false
	};

	changeHandler = (e) => {
		if (e.target.value === 'Freelance Income') {
			this.setState({ showFL: true, showCL: false, showCC: false, showEX: false });
		} else if (e.target.value === 'Client Made Payments') {
			this.setState({ showFL: false, showCL: true, showCC: false, showEX: false });
		} else if (e.target.value === 'Income vs Invoices Paid') {
			this.setState({ showFL: false, showCL: false, showCC: true, showEX: false });
		} else if (e.target.value === 'Expenses') {
			this.setState({ showFL: false, showCL: false, showCC: false, showEX: true });
		}
	};

	render() {
		return (
			<div>
				<Container>
					<Row className="justify-content-start">
						<Col style={{ fontSize: 36 }}>{this.props.user.first_name}'s Dashboard</Col>
					</Row>
					<Row className="justify-content-center">
						<Col>
							<Form.Group style={{ width: 250, marginLeft: 100, marginTop: 25 }}>
								<Form.Control onChange={this.changeHandler} as="select" size="med">
									<option>Freelance Income</option>
									<option>Client Made Payments</option>
									<option>Income vs Invoices Paid</option>
									<option>Expenses</option>
								</Form.Control>
							</Form.Group>
						</Col>
					</Row>
					{this.state.showFL ? (
						<Row className="justify-content-center">
							<Col className="col-11">
								<Chart
									jobs={this.props.user.jobs_as_freelancer}
									fill="#05449D"
									text={'Total Freelance Income'}
								/>
							</Col>
						</Row>
					) : null}
					{this.state.showCL ? (
						<Row className="justify-content-center">
							<Col className="col-11">
								<Chart
									jobs={this.props.user.jobs_as_client}
									fill="#FD3D0D"
									text="Total Client-Made Payments"
								/>
							</Col>
						</Row>
					) : null}
					{this.state.showCC ? (
						<Row className="justify-content-center">
							<Col className="col-11">
								<ComboChart
									fl_jobs={this.props.user.jobs_as_freelancer}
									cl_jobs={this.props.user.jobs_as_client}
								/>
							</Col>
						</Row>
					) : null}
					{this.state.showEX ? (
						<Row className="justify-content-center">
							<Col className="col-11">
								<ExpenseChart expenses={this.props.user.expenses} dataKey="Total Expenses" />
							</Col>
						</Row>
					) : null}
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
