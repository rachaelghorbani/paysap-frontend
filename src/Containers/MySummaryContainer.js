import React from 'react';
import Chart from '../ChartComponents/Chart';
import { connect } from 'react-redux';
import { Container, Form, Row, Col } from 'react-bootstrap';
import ComboChart from '../ChartComponents/ComboChart';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExpenseContainer from './ExpenseContainer';

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
									content={this.props.user.jobs_as_freelancer}
									fill="#05449D"
									text="Total Freelance Income"
									dateKey="start_time"
									amountKey="total_amount"
								/>
							</Col>
						</Row>
					) : null}
					{this.state.showCL ? (
						<Row className="justify-content-center">
							<Col className="col-11">
								<Chart
									content={this.props.user.jobs_as_client}
									fill="#FD3D0D"
									text="Total Client-Made Payments"
									dateKey="start_time"
									amountKey="total_amount"
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
								<Chart
									text="Total Expenses"
									dateKey="date"
									content={this.props.user.expenses}
									fill="#FFBA08"
									amountKey="amount"
								/>
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
