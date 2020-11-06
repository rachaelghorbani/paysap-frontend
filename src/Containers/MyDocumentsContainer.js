import React from 'react';
import { connect } from 'react-redux';
import { Container, CardGroup, Row, Col, Button } from 'react-bootstrap';
import DocumentUploadComponent from '../DocumentComponents/DocumentUploadComponent';
import DocumentCard from '../DocumentComponents/DocumentCard';
import PDFViewer from '../DocumentComponents/PDFViewer';
import PDFJs from '../DocumentComponents/PDFJs';
import {showUploadForm} from '../Redux/actions/DocumentActions'

class MyDocumentsContainer extends React.Component {
//can remove state from here and make it a functional component
    state = {
        showForm: false
    }
	//this container will contain preview images of all of a users uploaded documents. Each will be in a Document card. The document card will have the preview image as well as a link to email the file url.
	//user can click on the upload file button. they will be able to be able t upload a file and when it is returned the user will be updated to include this document which will then re render this component creating a card for it.
    //ideally a user will be able to clik on the image. when the image is clicked the thumbnails will be hiddden and the reactpdf docuent exposed with the url of the image clicked and using react-pdf be able to scroll through the pages
    
    //if show form is false, show a button that says Upload Document
    //otherwise show the form with an option to go back probably will need to be done in redux so that the back button can go on the actual form and look cuter
    //

    showForm =()=> {
        this.props.showUploadForm()
    }
    buttonToShowFormOrFormItself = () => {
        if(this.props.showDocumentUploadForm){
            return <DocumentUploadComponent />
        } else {
            return <Button style={{fontSize: 14}}onClick={this.showForm}>Upload Document</Button>
        }
    }


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
                   <div style={{fontSize: 36}}>My Documents</div>
					<Container className="d-flex justify-content-center">
                        {this.buttonToShowFormOrFormItself()}
						{/* <DocumentUploadComponent /> */}
					</Container>

					<Container>
						
						<Row className="d-flex justify-content-center">
							<Col>
								{/* <div className="d-flex justify-content-center"> */}
								<CardGroup className="justify-content-center mb-4">{this.renderDocs()}</CardGroup>
								{/* </div> */}
							</Col>
						</Row>
					</Container>
				</div>
			);
		} else {
			return (
				<div>
					<Container className="d-flex justify-content-center">
						<PDFViewer
							style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
							src={this.props.pdfUrl}
							backend={PDFJs}
						/>
					</Container>
				</div>
			);
		}
	};

	render() {
		//if showOrHideThumbnails is false, show the thumbnails, if its true show the big doc with the url from state and a button to exit
		return <div>{this.componentsToRender()}</div>;
	}
}
const mapStateToProps = (state) => {
	return {
		user: state.user,
		showOrHideThumbnails: state.showOrHideThumbnails,
        pdfUrl: state.pdfUrl,
        showDocumentUploadForm: state.showDocumentUploadForm
	};
};

const mapDispatchToProps = dispatch => {
    return {
        showUploadForm: () => dispatch(showUploadForm())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyDocumentsContainer);
