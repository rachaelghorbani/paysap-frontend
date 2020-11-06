import React from 'react';
import { Form, Button, Container, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import DateTimePicker from 'react-datetime-picker';
import { createJob } from '../Redux/actions/JobActions';
import { withRouter } from 'react-router-dom';
import GooglePlaces from '../GoogleComponents/GooglePlaces';

class NewJobForm extends React.Component {
	state = {
		description: '',
		lat: null,
		long: null,
		address: '',
		date: '',
		rate: null,
		freelancer_email: '',
		dayrate_or_hourly: 'Day Rate'
	};

	//google places
	handleAddressSelect = async (value) => {
		const results = await geocodeByAddress(value);
		const latLong = await getLatLng(results[0]);
		this.setState({ lat: latLong.lat, long: latLong.lng, address: value });
	};

	addressChangeHandler = (e) => {
		this.setState({ address: e });
	};

	dateChangeHandler = (date) => {
		this.setState({ date });
	};

	basicChangeHandler = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	rateFormComponent = () => {
		if (this.state.dayrate_or_hourly === 'Day Rate') {
			return (
				<Form.Group onChange={this.basicChangeHandler} value={this.state.rate} controlId="formBasicRate">
					<Form.Label>Day Rate:</Form.Label>
					<Form.Control name="rate" type="number" placeholder="Enter day rate" />
				</Form.Group>
			);
		} else {
			return (
				<Form.Group onChange={this.basicChangeHandler} value={this.state.rate} controlId="formBasicRate">
					<Form.Label>Hourly Rate:</Form.Label>
					<Form.Control name="rate" type="number" placeholder="Enter hourly rate" />
				</Form.Group>
			);
		}
	};

	localSubmitHandler = (e) => {
		e.preventDefault();
		const freelancer = this.props.users.find((user) => user.email === this.state.freelancer_email);

		if (
			freelancer !== undefined &&
			freelancer.email !== this.props.user.email &&
			this.state.address !== '' &&
			this.state.date !== '' &&
			this.state.rate !== null &&
			this.state.description !== ''
		) {
			const freelancer_id = freelancer.id;
			const stringDate = this.state.date.toString();
			const rate = parseInt(this.state.rate);

			const jobObj = {
				hours: null,
				completed: false,
				freelancer_bank_account_id: freelancer.account.id,
				freelancer_email: freelancer.email,
				description: this.state.description,
				start_time: stringDate,
				client_id: this.props.user.id,
				freelancer_id: freelancer_id,
				dayrate_or_hourly: this.state.dayrate_or_hourly,
				lat: this.state.lat,
				long: this.state.long,
				location: this.state.address,
				rate: rate,
				freelancer_balance: freelancer.account.amount
			};
			this.props.createJob(jobObj, this.props.history);
		}
	};

	render() {
		return (
			<div className="d-flex justify-content-center">
				<Container className="d-flex justify-content-center">
					<Form className="newJobForm " onSubmit={this.localSubmitHandler}>
						<div style={{ fontSize: 36, marginBottom: 20 }}>Create Job</div>
						<Form.Row>
							<Col>
								<Form.Group controlId="formBasicJobDescription">
									<Form.Label>Job Description:</Form.Label>
									<Form.Control
										onChange={this.basicChangeHandler}
										value={this.state.description}
										name="description"
										type="text"
										placeholder="Enter description"
									/>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group controlId="formBasicFreelancerEmail">
									<Form.Label>Freelancer's Email:</Form.Label>
									<Form.Control
										onChange={this.basicChangeHandler}
										value={this.state.email}
										name="freelancer_email"
										type="email"
										placeholder="Enter email"
									/>
								</Form.Group>
							</Col>
						</Form.Row>

						<Form.Row>
							<Col>
								<Form.Group
									onChange={this.basicChangeHandler}
									value={this.state.dayrate_or_hourly}
									controlId="dayRateOrHourly"
								>
									<Form.Label>Job Type: </Form.Label>
									<Form.Control name="dayrate_or_hourly" as="select" type="select">
										<option>Day Rate</option>
										<option>Hourly</option>
									</Form.Control>
								</Form.Group>
							</Col>
							<Col>{this.rateFormComponent()}</Col>
						</Form.Row>

						<Form.Row className="d-flex align-items-top">
							<Col>
								<Form.Group controlId="formBasicRate">
									<Form.Label>Time and Date:</Form.Label>
									<br />
									<DateTimePicker onChange={this.dateChangeHandler} value={this.state.date} />
								</Form.Group>
							</Col>
							<Col>
								<Form.Group className="w-4" controlId="formBasicHours">
									<Form.Label>Location:</Form.Label>
									<GooglePlaces
										width="250"
										height="36"
										handleAddressSelect={this.handleAddressSelect}
										addressChangeHandler={this.addressChangeHandler}
										value={this.state.address}
									/>
								</Form.Group>
							</Col>
						</Form.Row>

						<Button style={{ fontSize: 14 }} variant="primary" type="submit">
							Submit
						</Button>
					</Form>
				</Container>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		user: state.user,
		users: state.users
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		createJob: (jobObj, history) => dispatch(createJob(jobObj, history))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewJobForm));
