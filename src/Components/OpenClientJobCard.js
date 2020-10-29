import React from 'react';
import { Button, InputGroup, FormControl, Form } from 'react-bootstrap';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import GooglePlaces from '../Components/GooglePlaces'
import DateTimePicker from 'react-datetime-picker';
import {connect} from 'react-redux'
import {updateJob} from '../Redux/actions/JobActions'



class OpenClientJobCard extends React.Component {
	state = {
        showEditForm: false,
        
		description: this.props.job.description,
		freelancer_email: this.props.job.freelancer_email,
		date: new Date(this.props.job.start_time),
		rate: this.props.job.rate,
		address: this.props.job.location,
        dayrate_or_hourly: this.props.job.dayrate_or_hourly,
        lat: this.props.job.lat,
		long: this.props.job.long,
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
    
    dateChangeHandler = (date) => {
		this.setState({ date });
	};
    
	basicChangeHandler = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};


    
    //google places

    handleAddressSelect = async (value) => {
		const results = await geocodeByAddress(value);
		//formatted address would bbe results[0].formatted_address
		const latLong = await getLatLng(results[0]);
		this.setState({ lat: latLong.lat, long: latLong.lng, address: value });
	};

	addressChangeHandler = (e) => {
		this.setState({ address: e });
    };


	updateJob = (e) => {
        e.preventDefault();
        this.setState({ showEditForm: false });

        const freelancer = this.props.users.find((user) => user.email === this.state.freelancer_email);

        // if(freelancer !== undefined && freelancer.email !== this.props.user.email && this.state.address !== '' && this.state.date !=='' && this.state.rate !== null && this.state.description !== ''){
        //     // will put everything below in here when time to actually demo
        // } 

        // going to make a patch request for this job
		const freelancer_id = freelancer.id;
		const stringDate = this.state.date.toString();
        const rate = parseInt(this.state.rate);

		const jobObj = { 
            hours: null,
            completed: false,
            id: this.props.job.id,
            freelancer_bank_account_id: freelancer.account.id,
            freelancer_email: freelancer.email,
			description: this.state.description,
            start_time: stringDate,
            freelancer_balance: freelancer.account.amount,
			freelancer_id: freelancer_id,
			dayrate_or_hourly: this.state.dayrate_or_hourly,
			lat: this.state.lat,
			long: this.state.long,
			location: this.state.address,
            rate: rate,
            total_amount: null
        };
		 this.props.updateJob(jobObj)

		
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
					<td >
						<InputGroup className="mb-3">
							<FormControl

								style={{ height: 32, fontSize: 12}}
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
						<InputGroup style={{width: 210}} className="mb-3">
                        <DateTimePicker className='w-4'onChange={this.dateChangeHandler} value={this.state.date} />

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
							<GooglePlaces handleAddressSelect={this.handleAddressSelect} addressChangeHandler={this.addressChangeHandler} value={this.state.address} />
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
        console.log(this.state.dayrate_or_hourly)
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

const mapStateToProps = state => {
    return {
        user: state.user,
        users: state.users
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updateJob: (jobObj) => dispatch(updateJob(jobObj))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(OpenClientJobCard)
