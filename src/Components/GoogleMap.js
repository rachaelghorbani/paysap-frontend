import React from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends React.Component{
    render(){
        return (
            <Map 
                        google={this.props.google}
                        style={mapStyles}
                        initialCenter={{
                          lat: 42.4538356,
                          lng: -71.2337416
                        }}
                        center={{
                          lat: 42.4538356,
                          lng: -71.2337416
                        }}
                      >
                         
                        <Marker 
                          position={{
                            lat: 42.0,
                            lng: -71.0
                          }} />
                          <Marker 
                          position={{
                            lat: 42.4538356,
                            lng: -71.2337416
                          }} />
                      </Map>
        )
    }
}
      
export default GoogleApiWrapper({
          apiKey: (process.env.REACT_APP_GOOGLE_API_KEY)
        })(MapContainer)
