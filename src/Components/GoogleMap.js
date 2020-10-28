import React from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';

class GoogleMap extends React.Component {
	state = {
		showingInfoWindow: false,
		activeMarker: {},
		selectedPlace: {}
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
		this.setState({
			selectedPlace: props,
			activeMarker: marker,
			showingInfoWindow: true
		});
	};

	onClose = (props) => {
		if (this.state.showingInfoWindow) {
			this.setState({
				showingInfoWindow: false,
				activeMarker: null
			});
		}
	};

	renderMarker = () => {
		return this.props.jobs.map((job) => (
			<Marker onClick={this.onMarkerClick} name={job.location} position={{ lat: job.lat, lng: job.long }} />
		));
	};

	render() {
		console.log(this.props.jobs);
		return (
            <div style={{display: "flex", justifyContent: "center"}}> 
			<Map
				containerStyle={this.containerStyle}
				google={this.props.google}
				zoom={14}
				// style={this.mapStyles}
				initialCenter={{
					lat: 42.4538356,
					lng: -71.2337416
				}}
				center={{
					lat: 42.4538356,
					lng: -71.2337416
				}}
			>
				{this.renderMarker()}
				<InfoWindow
					marker={this.state.activeMarker}
					visible={this.state.showingInfoWindow}
					onClose={this.onClose}
				>
					<div>
						<h6 style={{ width: 200 }}>{this.state.selectedPlace.name}</h6>
					</div>
				</InfoWindow>
			</Map>
            </div>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(GoogleMap);
