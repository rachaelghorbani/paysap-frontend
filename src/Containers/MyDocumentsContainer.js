import React from 'react';
import { connect } from 'react-redux';
import DocumentUploadComponent from '../Components/DocumentUploadComponent'

class MyDocumentsContainer extends React.Component {
	//this container will contain preview images of all of a users uploaded documents. Each will be in a Document card. The document card will have the preview image as well as a link to email the file url.
	//user can click on the upload file button. they will be able to be able t upload a file and when it is returned the user will be updated to include this document which will then re render this component creating a card for it.
	//ideally a user will be able to clik on the image. when the image is clicked the thumbnails will be hiddden and the reactpdf docuent exposed with the url of the image clicked and using react-pdf be able to scroll through the pages


	render() {
        console.log(this.props.user)
		return (
            <DocumentUploadComponent />
				
		);
	}
}
const mapStateToProps = (state) => {
	return {
		user: state.user
	};
};



export default connect(mapStateToProps)(MyDocumentsContainer);
