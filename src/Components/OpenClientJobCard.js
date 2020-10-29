import React from 'react';
import { Button, InputGroup, FormControl, Form } from 'react-bootstrap';

class OpenClientJobCard extends React.Component {
	state = {
		showEditForm: false,
		description: this.props.job.description,
		freelancer_email: this.props.job.freelancer_email,
		start_time: '',
		rate: this.props.job.rate,
		address: '',
		dayrate_or_hourly: this.props.dayrate_or_hourly
	};
	restructuredDate = () => {
		const date = this.props.job.start_time;
		const slicedDate = date.slice(0, 21);
		return slicedDate;
	};

	tdToReturnForHourlyVsDay = () => {
		if (this.props.job.dayrate_or_hourly === 'Day Rate') {
			return <td>${this.props.job.rate}/day</td>;
		} else {
			return <td>${this.props.job.rate}/hr</td>;
		}
	};

	basicChangeHandler = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	updateJob = () => {
		this.setState({ showEditForm: false });
		//for now just switch show edit form but will need to send a patch request to the job and make sure that this component is listening for changes in user
	};

	componentToRender = () => {
		if (this.state.showEditForm) {
			return (
				<tr>
					<td>
						<InputGroup className="mb-3">
							<FormControl
								style={{ height: 32, fontSize: 12 }}
								value={this.state.description}
								onChange={this.basicChangeHandler}
								name="description"
								aria-label="description"
								aria-describedby="basic-addon1"
							/>
						</InputGroup>
					</td>
					<td>
						<InputGroup className="mb-3">
							<FormControl
								style={{ height: 32, fontSize: 12 }}
								value={this.state.freelancer_email}
								onChange={this.basicChangeHandler}
								name="freelancer_email"
								aria-label="freelancer email"
								aria-describedby="basic-addon1"
							/>
						</InputGroup>
					</td>
					<td>
						{/* ///date and time picker goes here */}
						<InputGroup className="mb-3">
							<FormControl
								//   value="hi"
								//   onChange={this.handleChange}
								name="start_time"
								aria-label="start_time"
								aria-describedby="basic-addon1"
							/>
						</InputGroup>
					</td>
					<td>
						<InputGroup style={{ width: 100 }} onChange={this.basicChangeHandler} className="mb-3">
							<Form.Control style={{ fontSize: 12 }} name="dayrate_or_hourly" as="select">
								<option>Day Rate</option>
								<option>Hourly</option>
							</Form.Control>
						</InputGroup>
					</td>
					<td>
						<InputGroup  className="mb-3">
							<FormControl
                                style={{ height: 32, fontSize: 12 }}
                                value={this.state.rate}
								onChange={this.basicChangeHandler}
								name="rate"
								aria-label="rate"
								aria-describedby="basic-addon1"
								type="number"
							/>
						</InputGroup>
					</td>
					<td>
						{/* ///// google places goes here*/}
						<InputGroup className="mb-3">
							<FormControl
								//   value="hi"
								//   onChange={this.handleChange}
								aria-label="Username"
								aria-describedby="basic-addon1"
							/>
						</InputGroup>
					</td>
					<td>
						<Button onClick={this.updateJob} style={{ fontSize: 12 }}>
							Save
						</Button>
					</td>
				</tr>
			);
		} else {
			return (
				<tr>
					<td>{this.props.job.description}</td>
					<td>
						<a href={`mailto: ${this.props.job.freelancer_email}`}>{this.props.job.freelancer_email}</a>
					</td>
					<td>{this.restructuredDate()}</td>
					<td>{this.props.job.dayrate_or_hourly}</td>
					{this.tdToReturnForHourlyVsDay()}
					<td>{this.props.job.location}</td>
					<td>
						<Button onClick={this.showEditForm} style={{ fontSize: 12 }}>
							Edit
						</Button>
					</td>
				</tr>
			);
		}
	};

	showEditForm = () => {
		this.setState({ showEditForm: true });
	};

	render() {
		console.log(this.state);
		return (
			<>{this.componentToRender()}</>

			// <tr>
			// 	<td>{job.description}</td>
			// 	<td>
			// 		<a href={`mailto: ${job.freelancer_email}`}>{job.freelancer_email}</a>
			// 	</td>
			// 	<td>{this.restructuredDate()}</td>
			// 	<td>{job.dayrate_or_hourly}</td>
			// 	{this.tdToReturnForHourlyVsDay()}
			// 	<td>{job.location}</td>
			// 	<td>
			// 		<Button onClick={this.showEditForm}style={{ fontSize: 12 }}>Edit</Button>
			// 	</td>

			// </tr>
		);
	}
}

export default OpenClientJobCard;
