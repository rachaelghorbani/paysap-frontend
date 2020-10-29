import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { GoogleApiWrapper } from 'google-maps-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import DateTimePicker from 'react-datetime-picker';
import { fetchAllUsers } from '../Redux/actions/UsersActions';
import {createJob} from '../Redux/actions/JobActions'
import { withRouter } from 'react-router-dom';

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
	componentDidMount = () => {
		this.props.fetchAllUsers();
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
        //need if statement for if you can't find freelancer
        const freelancer = this.props.users.find((user) => user.email === this.state.freelancer_email);


        // if(freelancer !== undefined && freelancer.email !== this.props.user.email && this.state.address !== '' && this.state.date !=='' && this.state.rate !== null && this.state.description !== ''){
        //     // will put everything below in here when time to actually demo
        // } 


		const freelancer_id = freelancer.id;
		const stringDate = this.state.date.toString();
		const rate = parseInt(this.state.rate);

		const jobObj = {
            hours: null,
            completed: false,
            freelancer_bank_account: freelancer.account.id,
            freelancer_email: freelancer.email,
			description: this.state.description,
			start_time: stringDate,
			client_id: this.props.user.id,
			freelancer_id: freelancer_id,
			dayrate_or_hourly: this.state.dayrate_or_hourly,
			lat: this.state.lat,
			long: this.state.long,
			location: this.state.address,
			rate: rate
        };
		this.props.createJob(jobObj, this.props.history)

		
	};
	//this form will need state, the date time picker, the google places api
	//will have to reset state for both  hours(if it's a day rate it gets 10 hours diretly from here otherwise run the timer when the job starts) and  on change of

	// will set total amount and hours when freelancer submits on their end

	//when user submits will have to
	// 1. find the user from the users key in state
	// 2. will have to set hours to 10 if the selection is day_rate
	// 3. set total amount if day_rate
	// 4. turn date into string before sending back
	// 5. get both lat and long from google places as well as address
	// 6. parse int rate
	render() {
		return (
			<Form onSubmit={this.localSubmitHandler}>
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

				<Form.Group
					onChange={this.basicChangeHandler}
					value={this.state.dayrate_or_hourly}
					controlId="dayRateOrHourly"
				>
					<Form.Label>Job Type: </Form.Label>
					<Form.Control name="dayrate_or_hourly" as="select">
						<option>Day Rate</option>
						<option>Hourly</option>
					</Form.Control>
				</Form.Group>

				{this.rateFormComponent()}

				<Form.Group controlId="formBasicRate">
					<Form.Label>Time and Date:</Form.Label>
					<br />
					<DateTimePicker onChange={this.dateChangeHandler} value={this.state.date} />
				</Form.Group>

				<Form.Group controlId="formBasicHours">
					<Form.Label>Location:</Form.Label>
					<PlacesAutocomplete
						onChange={this.addressChangeHandler}
						value={this.state.address}
						onSelect={this.handleAddressSelect}
					>
						{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
							return (
								<div>
									<input {...getInputProps({ placeholder: 'Type address' })} />
									<div>
										{loading ? <div>...loading</div> : null}
										{suggestions.map((suggestion, index) => {
                                            // const style = { backgroundColor: suggestion.active ? '#41b6e6' : '#fff' };
                                            //to put style back in after suggestion below , {style}
											return (
												<div {...getSuggestionItemProps(suggestion)} key={index}>
													{suggestion.description}
												</div>
											);
										})}
									</div>
								</div>
							);
						}}
					</PlacesAutocomplete>{' '}
				</Form.Group>

				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
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
        fetchAllUsers: () => dispatch(fetchAllUsers()),
        createJob: (jobObj, history) => dispatch(createJob(jobObj, history))
	};
};

const connector = connect(mapStateToProps, mapDispatchToProps)(withRouter(NewJobForm));
export default GoogleApiWrapper({
	apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(connector);

// const FormContainer = GoogleApiWrapper({
//     apiKey: (process.env.REACT_APP_GOOGLE_API_KEY)
// })(NewJobForm);

// export default GoogleApiWrapper({
//     apiKey: (process.env.REACT_APP_GOOGLE_API_KEY)
//   })(NewJobForm)

// export default connect(mapStateToProps)(FormContainer);

// j1 = Job.create(start_time: "Tue Oct 27 2020 10:25:50 GMT-0400 (Eastern Daylight Time)", client_id: blade.id, freelancer_id: val.id, hours: 10, dayrate_or_hourly: "dayrate", lat: 42.4538168, long: -71.2337149, location: "74 Bedford St, Lexington, MA 02420", rate: 600, total_amount: 600, completed: true)
