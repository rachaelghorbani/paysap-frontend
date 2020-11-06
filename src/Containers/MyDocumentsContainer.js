import React from 'react';
import { connect } from 'react-redux';
import { Container, CardGroup, Row, Col, Button } from 'react-bootstrap';
import DocumentUploadComponent from '../DocumentComponents/DocumentUploadComponent';
import DocumentCard from '../DocumentComponents/DocumentCard';
import PDFViewer from '../DocumentComponents/PDFViewer';
import PDFJs from '../DocumentComponents/PDFJs';
import { showUploadForm } from '../Redux/actions/DocumentActions';

const MyDocumentsContainer = (props) => {

	const showForm = () => {
		props.showUploadForm();
	};

	const buttonToShowFormOrFormItself = () => {
		if (props.showDocumentUploadForm) {
			return <DocumentUploadComponent />;
		} else {
			return (
				<Button style={{ fontSize: 14 }} onClick={showForm}>
					Upload Document
				</Button>
			);
		}
	};

	const renderDocs = () => {
		return props.user.documents.map((doc) => <DocumentCard key={doc.id} doc={doc} />);
	};

	const componentsToRender = () => {
		if (props.showOrHideThumbnails === false) {
			return (
				<div>
					<div style={{ fontSize: 36 }}>My Documents</div>
					<Container className="d-flex justify-content-center">{buttonToShowFormOrFormItself()}</Container>

					<Container>
						<Row className="d-flex justify-content-center">
							<Col>
								<CardGroup className="justify-content-center mb-4">{renderDocs()}</CardGroup>
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
							src={props.pdfUrl}
							backend={PDFJs}
						/>
					</Container>
				</div>
			);
		}
	};

	return (
        <div>{componentsToRender()}</div>
    ) 
};

const mapStateToProps = (state) => {
	return {
		user: state.user,
		showOrHideThumbnails: state.showOrHideThumbnails,
		pdfUrl: state.pdfUrl,
		showDocumentUploadForm: state.showDocumentUploadForm
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		showUploadForm: () => dispatch(showUploadForm())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MyDocumentsContainer);
