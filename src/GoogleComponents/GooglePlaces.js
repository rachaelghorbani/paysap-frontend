import React from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import PlacesAutocomplete from 'react-places-autocomplete';

const GooglePlaces = (props) => {
    
	return (
		<PlacesAutocomplete
			onChange={props.addressChangeHandler}
			value={props.value}
			onSelect={props.handleAddressSelect}
		>
			{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
				return (
					<div>
						<input
							style={{
								width: parseInt(props.width),
								height: parseInt(props.height),
								borderColor: '#d3d3d3',
								borderWidth: 1,
								borderRadius: 3
							}}
							{...getInputProps({ placeholder: 'Type address' })}
						/>
						<div>
							{loading ? <div>...loading</div> : null}
							{suggestions.map((suggestion, index) => {
								const style = { backgroundColor: suggestion.active ? '#d3d3d3' : '#fff', width: parseInt(props.width) };
								return (
									<div {...getSuggestionItemProps(suggestion, { style })} key={index}>
										{suggestion.description}
									</div>
								);
							})}
						</div>
					</div>
				);
			}}
		</PlacesAutocomplete>
	);
};

export default GoogleApiWrapper({
	apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(GooglePlaces);
