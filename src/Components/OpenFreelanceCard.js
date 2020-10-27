import React from 'react'
import {Button} from 'react-bootstrap'

class OpenFreelanceCard extends React.Component{
    state = {
        disableButtons: true
        //timerstarted true or false to toggle
        //disable buttons set to true to turn off when in range
        //timer count
        //will need state to disable and enable buttons based on location
    }

    //onclick for get location will get location of user based on console navigation. if the users coordinates are within +- certain amount of the lat and long of the job, and the parsed current time and date are greater than the parsed start time of the job, enable the buttons

   //for lat and long of your own computer
   getLocation = () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(this.getCoordinates)
        
    } else {
        alert("geolocation not avail")
    }
}
//for lat and long of your own computer
getCoordinates = position => {
const lat = parseFloat(JSON.stringify(position.coords.latitude), 10)
const long = parseFloat(JSON.stringify(position.coords.longitude), 10)
console.log("my lat", lat, "my long", long)


    // this.setState({myLat: lat, myLong: long})
    // if(((this.state.myLong <= this.state.long + 1) && (this.state.myLong >= this.state.long - 1)) && ((this.state.myLat <= this.state.lat + 1) && (this.state.myLat >= this.state.lat - 1))){
    //     this.setState({withinDistance: true})
    //  } else{
    //      this.setState({withinDistance: false})
    //  }
}

    restructuredDate = () => {
        const date = this.props.job.start_time
        const slicedDate = date.slice(0, 24)
        return slicedDate
    }
    rowToRender = () => {
        const job = this.props.job

        if(job.dayrate_or_hourly === "Day Rate"){
            return (
                <>
                <td>{job.description}</td>
                <td>{job.client.email}</td>
                <td>{this.restructuredDate()}</td>
                <td>{job.dayrate_or_hourly}</td>
                <td>${job.rate}/day</td>
                <td>{job.location}</td>
                <td ><Button onClick={this.getLocation}style={{fontSize: 12}}>Get My Location</Button></td>
                <td colSpan="2"></td>
                <td><Button disabled={this.state.disableButtons} style={{fontSize: 12}}>Complete Job</Button></td>
                </>
            )
        } else {
            return (
                <>
                <td>{job.description}</td>
                <td>{job.client.email}</td>
                <td>{this.restructuredDate()}</td>
                <td>{job.dayrate_or_hourly}</td>
                <td>${job.rate}/hr</td>
                <td>{job.location}</td>
                <td><Button onClick={this.getLocation} style={{fontSize: 12}}>Get My Location</Button></td>
                <td><Button disabled={this.state.disableButtons} style={{fontSize: 12}}>Start Timer</Button></td>
                <td>Timer count from props</td>
                <td><Button disabled={this.state.disableButtons} style={{fontSize: 12}}>Complete Job</Button></td>
                </>
            )
        }
    }
    //if the job is hourly, render a certain row with certain buttons
    //else render another way without those buttons
    render(){
        return(
            <tr>
                {this.rowToRender()}

            </tr>
        )
    }
}

{/* <th>Description</th>
							<th>Client Email</th>
							<th>Start Time</th>
							<th>Hourly/Day</th>
							<th>Rate</th>
							<th>Address</th>
                            <th>Get My Location</th>
							<th>Timer</th>
							<th>Time</th>
                            
							<th>Complete Job</th> */}

export default OpenFreelanceCard