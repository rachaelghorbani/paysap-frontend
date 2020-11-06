import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { completeJob } from '../Redux/actions/JobActions';

class OpenFreelanceCard extends React.Component {
    
	state = {
		disableButtons: true,
		startTimer: false,
		hours: 0,
		minutes: 0,
		showModal: false
	};

	hideModal = () => {
		this.setState({ showModal: false });
	};

	//for lat and long of your own computer

	getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(this.getCoordinates);
		} else {
			alert('geolocation not avail');
		}
	};

	//for lat and long of your own computer

	getCoordinates = (position) => {
		const parsedJobDate = Date.parse(this.props.job.start_time);
		const dateNow = new Date();
		const parsedDateNow = Date.parse(dateNow);
		const lat = parseFloat(JSON.stringify(position.coords.latitude), 10);
		const long = parseFloat(JSON.stringify(position.coords.longitude), 10);
		if (
			long <= this.props.job.long + 0.0005 &&
			long >= this.props.job.long - 0.0005 &&
			(lat <= this.props.job.lat + 0.0005 && lat >= this.props.job.lat - 0.0005) &&
			parsedDateNow >= parsedJobDate
		) {
			this.setState({ disableButtons: false });
		} else {
			this.setState({ showModal: true });
		}
	};

	localCompleteJobSubmitHandler = () => {
		this.stopTimer();

		const completedJobObj = {
			id: this.props.job.id,
			client_balance: this.props.job.client_balance,
			client_bank_account_id: this.props.job.client_bank_account_id,
			freelancer_bank_account_id: this.props.user.account.id,
			completed: true
		};

		if (this.props.job.dayrate_or_hourly === 'Hourly') {
			const hours = this.state.minutes / 60 + this.state.hours;
			const roundedHours = +hours.toFixed(2);
			const totalAmount = Math.floor(this.props.job.rate * roundedHours);

			completedJobObj.hours = roundedHours;
			completedJobObj.total_amount = totalAmount;

			this.props.completeJob(completedJobObj);
		} else if (this.props.job.dayrate_or_hourly === 'Day Rate') {
			completedJobObj.hours = 10;
			completedJobObj.total_amount = this.props.job.rate;

			this.props.completeJob(completedJobObj);
		}
	};

	intervalId = 0;

	// set to 1 second interval instead of 1 minute interval for demo purposes

	startTimer = () => {
		this.setState({ startTimer: true });
		this.intervalId = setInterval(() => {
			this.updateStateFromTimer();
		}, 1000);
	};

	stopTimer = () => {
		this.setState({ startTimer: false });
		clearInterval(this.intervalId);
	};

	updateStateFromTimer = () => {
		if (this.state.minutes < 59) {
			this.setState((prevState) => ({
				minutes: prevState.minutes + 1
			}));
		} else {
			this.setState((prevState) => ({
				hours: prevState.hours + 1,
				minutes: 0
			}));
		}
	};

	startOrStopTimerButton = () => {
		if (this.state.startTimer) {
			return (
				<Button onClick={this.stopTimer} disabled={this.state.disableButtons} style={{ fontSize: 12 }}>
					Stop
				</Button>
			);
		} else {
			return (
				<Button onClick={this.startTimer} disabled={this.state.disableButtons} style={{ fontSize: 12 }}>
					Start
				</Button>
			);
		}
	};

	componentWillUnmount = () => {
		this.stopTimer();
	};

	hourFormatToShow = () => {
		if (this.state.minutes < 10) {
			return (
				<td>
					<div>H M</div>
					{this.state.hours}:0{this.state.minutes}
				</td>
			);
		} else {
			return (
				<td>
					<div>H M</div>
					{this.state.hours}:{this.state.minutes}
				</td>
			);
		}
	};

	restructuredDate = () => {
		const date = this.props.job.start_time;
		const slicedDate = date.slice(0, 21);
		return slicedDate;
	};

	rowsToRenderBasedOnHourlyOrDaily = () => {
		if (this.props.job.dayrate_or_hourly === 'Day Rate') {
			return <td colSpan="2" />;
		} else {
			return (
				<>
					<td>{this.startOrStopTimerButton()}</td>
					{this.hourFormatToShow()}
				</>
			);
		}
	};

	render() {
		const { job } = this.props;
		return (
			<tr>
				<td>{job.description}</td>
				<td>
					<a href={`mailto: ${job.client_email}`}>{job.client_email}</a>
				</td>
				<td>{this.restructuredDate()}</td>
				<td>{job.dayrate_or_hourly}</td>
				{job.dayrate_or_hourly === 'Day Rate' ? <td>${job.rate}/day</td> : <td>${job.rate}/hr</td>}
				<td>{job.location}</td>
				<td>
					<Button onClick={this.getLocation} style={{ fontSize: 12 }}>
						Locate
					</Button>
				</td>
				{this.rowsToRenderBasedOnHourlyOrDaily()}
				<td>
					<Button
						onClick={this.localCompleteJobSubmitHandler}
						disabled={this.state.disableButtons}
						style={{ fontSize: 12 }}
					>
						Complete
					</Button>
				</td>
				<Modal show={this.state.showModal} onHide={this.hideModal}>
					<Modal.Header>
						<Modal.Title style={{ textAlign: 'center' }}>
							Sorry, you're either out of range or too early! Check your start time and/or try moving
							closer to the location.
						</Modal.Title>
					</Modal.Header>
					<Modal.Footer>
						<Button variant="secondary" onClick={this.hideModal}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			</tr>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		completeJob: (jobObj) => dispatch(completeJob(jobObj))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OpenFreelanceCard));
