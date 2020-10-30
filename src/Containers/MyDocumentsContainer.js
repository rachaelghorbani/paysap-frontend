import React from 'react';
import { connect } from 'react-redux';
import {Container, CardGroup} from 'react-bootstrap'
import DocumentUploadComponent from '../DocumentComponents/DocumentUploadComponent'
import DocumentCard from '../DocumentComponents/DocumentCard'

class MyDocumentsContainer extends React.Component {
	//this container will contain preview images of all of a users uploaded documents. Each will be in a Document card. The document card will have the preview image as well as a link to email the file url.
	//user can click on the upload file button. they will be able to be able t upload a file and when it is returned the user will be updated to include this document which will then re render this component creating a card for it.
	//ideally a user will be able to clik on the image. when the image is clicked the thumbnails will be hiddden and the reactpdf docuent exposed with the url of the image clicked and using react-pdf be able to scroll through the pages

    //want to render a document card for every thingy
    renderDocs = () => {
        return (
            this.props.user.documents.map(doc => <DocumentCard key={doc.id} doc={doc}/>
                ))
    }

	render() {
        console.log(this.props.user)
		return (
            <div>
            <DocumentUploadComponent />
            <div className="d-flex justify-content-center">
								<CardGroup className="justify-content-center">
            {this.renderDocs()}
            </CardGroup>
            </div>
            </div>

				
		);
	}
}
const mapStateToProps = (state) => {
	return {
		user: state.user
	};
};



export default connect(mapStateToProps)(MyDocumentsContainer);
