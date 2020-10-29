import React from 'react'
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
									<input {...getInputProps({ placeholder: 'Type address' })} />
									<div>
										{loading ? <div>...loading</div> : null}
										{suggestions.map((suggestion, index) => {
                                            // const style = { backgroundColor: suggestion.active ? '#41b6e6' : '#fff', width: 300 };
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
					</PlacesAutocomplete>
    )
}

export default GoogleApiWrapper({
	apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(GooglePlaces)