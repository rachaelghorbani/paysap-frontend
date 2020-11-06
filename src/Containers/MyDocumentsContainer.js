import React from 'react';
import { connect } from 'react-redux';
import { Container, CardGroup, Row, Col, Button } from 'react-bootstrap';
import DocumentUploadComponent from '../DocumentComponents/DocumentUploadComponent';
import DocumentCard from '../DocumentComponents/DocumentCard';
import PDFViewer from '../DocumentComponents/PDFViewer';
import PDFJs from '../DocumentComponents/PDFJs';
import {showUploadForm} from '../Redux/actions/DocumentActions'

class MyDocumentsContainer extends React.Component {

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
					</Container>

					<Container>
						<Row className="d-flex justify-content-center">
							<Col>
								<CardGroup className="justify-content-center mb-4">{this.renderDocs()}</CardGroup>
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
