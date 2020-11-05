import React from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';

class GoogleMap extends React.Component {
	state = {
		showingInfoWindow: false,
		activeMarker: {},
		selectedPlace: {},
		lat: null,
		long: null,
		// initLat: null,
		// initLong: null
	};
	//want to bring in the find location on component did mount and reset initial center to those dots
	// mapStyles = {
	//     width: "88%",
	//     height: "50%",
	// }

	

	containerStyle = {
		marginTop: '10px',
		position: 'relative',
		width: '1100px',
		height: '350px'
	};

	onMarkerClick = (props, marker, e) => {
		console.log(props);
		this.setState({
			selectedPlace: props,
			activeMarker: marker,
			showingInfoWindow: true,
			lat: props.position.lat,
			long: props.position.lng
		});
	};

	onClose = () => {
		if (this.state.showingInfoWindow) {
			this.setState({
				showingInfoWindow: false,
				activeMarker: null
			});
		}
	};

	renderMarker = () => {
		return this.props.jobs.map((job) => {
			const refactoredDate = job.start_time.slice(0, 21);
			const refactoredAddress = job.location.slice(0, job.location.length - 5);
			return (
				<Marker
					key={job.id}
					onClick={this.onMarkerClick}
					description={job.description}
					date={refactoredDate}
					location={refactoredAddress}
					position={{ lat: job.lat, lng: job.long }}
				/>
			);
		});
    };
    
    // would use these in production but takes longer to load so will use set lat and long for demo purposes

	// getCoordinates = (position) => {
	// 	const lat = parseFloat(JSON.stringify(position.coords.latitude), 10);
	// 	const long = parseFloat(JSON.stringify(position.coords.longitude), 10);
	// 	this.setState({ initLat: lat, initLong: long });
	// };
	// getLocation = () => {
	// 	if (navigator.geolocation) {
	// 		navigator.geolocation.getCurrentPosition(this.getCoordinates);
	// 	} else {
	// 		alert('geolocation not avail');
	// 	}
	// };
	// componentDidMount = () => {
	// 	this.getLocation();
	// };

	render() {
		// if (this.state.initLong !== null && this.state.initLat !== null) {
			return (
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<Map
						containerStyle={this.containerStyle}
						google={this.props.google}
						zoom={14}
						// style={this.mapStyles}
						initialCenter={{
							// lat: this.state.initLat,
							// lng: this.state.initLong
							lat: 42.4538356,
							lng: -71.2337416
						}}
						//maybe set these in state and then onclick reset them for the individual marker
						// center={{
						// 	lat: this.state.lat,
						// 	lng: this.state.long
						// }}
					>
						{this.renderMarker()}
						<InfoWindow
							marker={this.state.activeMarker}
							visible={this.state.showingInfoWindow}
							onClose={this.onClose}
						>
							<div style={{ textAlign: 'center', width: 300 }}>
								<h6>{this.state.selectedPlace.description}</h6>
								<h6>{this.state.selectedPlace.date}</h6>
								<h6>{this.state.selectedPlace.location}</h6>
							</div>
						</InfoWindow>
					</Map>
				</div>
			);
		// } else {
		// 	return <div></div>;
		// }
	}
}

export default GoogleApiWrapper({
	apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(GoogleMap);
