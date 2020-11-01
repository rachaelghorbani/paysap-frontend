import React from 'react';
import { connect } from 'react-redux';
import { Container, CardGroup, Button } from 'react-bootstrap';
import DocumentUploadComponent from '../DocumentComponents/DocumentUploadComponent';
import DocumentCard from '../DocumentComponents/DocumentCard';
import PDFViewer from '../DocumentComponents/PDFViewer';
import PDFJs from '../DocumentComponents/PDFJs';
import { showThumbnails } from '../Redux/actions/DocumentActions';

class MyDocumentsContainer extends React.Component {
	//this container will contain preview images of all of a users uploaded documents. Each will be in a Document card. The document card will have the preview image as well as a link to email the file url.
	//user can click on the upload file button. they will be able to be able t upload a file and when it is returned the user will be updated to include this document which will then re render this component creating a card for it.
	//ideally a user will be able to clik on the image. when the image is clicked the thumbnails will be hiddden and the reactpdf docuent exposed with the url of the image clicked and using react-pdf be able to scroll through the pages
	showThumbnailsClickHandler = () => {
		this.props.showThumbnails();
	};

	renderDocs = () => {
		return this.props.user.documents.map((doc) => <DocumentCard key={doc.id} doc={doc} />);
	};

	componentsToRender = () => {
		if (this.props.showOrHideThumbnails === false) {
			return (
				<div>
					<DocumentUploadComponent />
					<div className="d-flex justify-content-center">
						<CardGroup className="justify-content-center mb-4">{this.renderDocs()}</CardGroup>
					</div>
				</div>
			);
		} else {
			return (
				<div>
					<Button onClick={this.showThumbnailsClickHandler}>Hide Pdf</Button>
					<Container d-flex>
                        <div className="justify-contents-center"
>
						<PDFViewer style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}}
							src={this.props.pdfUrl}
							backend={PDFJs}
						/>
                        </div>
					</Container>
				</div>
			);
		}
	};

	render() {
		//if showOrHideThumbnails is false, show the thumbnails, if its true show the big doc with the url from state and a button to exit
		console.log(this.props);
		return <div>{this.componentsToRender()}</div>;
	}
}
const mapStateToProps = (state) => {
	return {
		user: state.user,
		showOrHideThumbnails: state.showOrHideThumbnails,
		pdfUrl: state.pdfUrl
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		showThumbnails: () => dispatch(showThumbnails())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MyDocumentsContainer);
