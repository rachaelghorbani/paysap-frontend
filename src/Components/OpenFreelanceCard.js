import React from 'react'
import {Button} from 'react-bootstrap'

class OpenFreelanceCard extends React.Component{
    state = {
        disableButtons: true,
        startTimer: false,
        hours: 0,
        minutes: 0
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
    const parsedJobDate = Date.parse(this.props.job.start_time)
    const dateNow = new Date()
    const parsedDateNow = Date.parse(dateNow)
    const lat = parseFloat(JSON.stringify(position.coords.latitude), 10)
    const long = parseFloat(JSON.stringify(position.coords.longitude), 10)
    console.log("myLat:", lat, "jl", this.props.job.lat, "mylong", long, "jlo", this.props.job.long)
    if(((long <= this.props.job.long + 0.0005) && (long >= this.props.job.long - 0.0005)) && ((lat <= this.props.job.lat + 0.0005) && (lat >= this.props.job.lat - 0.0005)) && (parsedDateNow >= parsedJobDate)){
        console.log("i worked!")
        this.setState({disableButtons: false})
    } else {
        console.log("out of range")
    }


    // this.setState({myLat: lat, myLong: long})
    // if(((this.state.myLong <= this.state.long + 1) && (this.state.myLong >= this.state.long - 1)) && ((this.state.myLat <= this.state.lat + 1) && (this.state.myLat >= this.state.lat - 1))){
    //     this.setState({withinDistance: true})
    //  } else{
    //      this.setState({withinDistance: false})
    //  }
}

//function to update state to pass to setTimeout

intervalId = 0
startTimer = () => {
    this.setState({startTimer: true})
    this.intervalId = setInterval(() => {
        this.updateStateFromTimer()
    }, 1000)
}

stopTimer = () => {
    clearInterval(this.intervalId)
}


updateStateFromTimer = () => {
    if(this.state.minutes < 59){
        this.setState( prevState => ({
            minutes: prevState.minutes + 1
        }))
    } else {
        this.setState(prevState => ({
            hours: prevState.hours + 1,
            minutes: 0
        }))
    }
    //if the previous state of minutes is less than 60, increment the state.minutes. otherwise reset the minutes to 0 and increment the hours by 1
}


//onclick will call setTimeout


startOrStopTimerButton = () => {
    if(this.state.startTimer){
       return  <Button onClick={this.stopTimer}disabled={this.state.disableButtons} style={{fontSize: 12}}>Stop</Button>
    } else {
        return <Button onClick={this.startTimer}disabled={this.state.disableButtons} style={{fontSize: 12}}>Start</Button>
    }
}
hourFormatToShow = () => {
    if(this.state.minutes < 10){
        return (
            <td><div>H M</div>
                    {this.state.hours}:0{this.state.minutes}
                    </td>
        )
    } else {
        return (
            <td><div>H M</div>
                    {this.state.hours}:{this.state.minutes}
                    </td>
        )
    }
}
//on form submit will have to check to see if day or hourly and then set up the obj to send back accordingly

    restructuredDate = () => {
        const date = this.props.job.start_time
        const slicedDate = date.slice(0, 21)
        return slicedDate
    }
    rowToRender = () => {
        const job = this.props.job

        if(job.dayrate_or_hourly === "Day Rate"){
            return (
                <>
                <td>{job.description}</td>
                <td><a href={`mailto: ${job.client_email}`}>{job.client_email}</a></td>
                <td>{this.restructuredDate()}</td>
                <td>{job.dayrate_or_hourly}</td>
                <td>${job.rate}/day</td>
                <td>{job.location}</td>
                <td ><Button onClick={this.getLocation}style={{fontSize: 12}}>Locate</Button></td>
                <td colSpan="2"></td>
                <td><Button disabled={this.state.disableButtons} style={{fontSize: 12}}>Complete</Button></td>
                </>
            )
        } else {
            return (
                <>
                <td>{job.description}</td>
                <td><a href={`mailto: ${job.client_email}`}>{job.client_email}</a></td>
                <td>{this.restructuredDate()}</td>
                <td>{job.dayrate_or_hourly}</td>
                <td>${job.rate}/hr</td>
                <td>{job.location}</td>
                <td><Button onClick={this.getLocation} style={{fontSize: 12}}>Locate</Button></td>
                <td>{this.startOrStopTimerButton()}</td>
                {this.hourFormatToShow()}
                <td><Button disabled={this.state.disableButtons} style={{fontSize: 12}}>Complete</Button></td>
                </>
            )
        }
    }
    //if the job is hourly, render a certain row with certain buttons
    //else render another way without those buttons
    render(){
        console.log("min", this.state.minutes, "hour", this.state.hours, "intid", this.intervalId)
        return(
            <tr>
                {this.rowToRender()}

            </tr>
        )
    }
}


export default OpenFreelanceCard