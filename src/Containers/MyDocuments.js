import React from 'react'
import {connect} from 'react-redux'

class MyDocuments extends React.Component{
    //this container will contain preview images of all of a users uploaded documents. Each will be in a Document card. The document card will have the preview image as well as a link to email the file url.
    //user can click on the upload file button. they will be able to be able t upload a file and when it is returned the user will be updated to include this document which will then re render this component creating a card for it.
    //ideally a user will be able to clik on the image. when the image is clicked the thumbnails will be hiddden and the reactpdf docuent exposed with the url of the image clicked and using react-pdf be able to scroll through the pages

    state = {
        document: {},
        description: 'test',
        url: 'http://res.cloudinary.com/dyos8owie/image/upload/v1604072710/hxvvqzod2we04xbll2yr.jpg'
    }

    onChange = (e) => {
        e.persist()
        this.setState(() => {
            return {
                [e.target.name]: e.target.files[0]
            }
        })
    } 
    onSubmit = (e) => {
        e.preventDefault()
        console.log(this.state.document)
        const form = new FormData()
        form.append("document", this.state.document)
        form.append("user_id", this.props.user.id)
        form.append("description", this.state.description)
        const options = {
            method: "POST",
            body: form
        }
        fetch('http://localhost:3000/documents', options)
        .then(resp => resp.json())
        .then(pdfmaybe => {
            this.setState({url: pdfmaybe.url})
            console.log(pdfmaybe)
        })

    }

    render(){
        
        return (
            <div>
            <form onSubmit={this.onSubmit}>
                    <label>Image Upload</label>
                    <input type="file" name="document" onChange={this.onChange}/>
                    <input type="submit" value="Upload Document" />

                    </form>
                    <a href={`mailto:no-one@snai1mai1.com?subject=look at this website&body=${this.state.url}`}>tell a friend</a>
                    <img src="http://res.cloudinary.com/dyos8owie/image/upload/v1604074678/vab7dyke5obooqrmomzj.pdf"/>
                    </div>

        )
    }
}
const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(MyDocuments)