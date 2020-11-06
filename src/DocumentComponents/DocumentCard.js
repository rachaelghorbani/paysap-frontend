import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { updatePdfUrl, hideThumbnails, deleteDocument } from '../Redux/actions/DocumentActions';

const DocumentCard = (props) => {

	const handleClick = () => {
		props.updatePdfUrl(props.doc.pdf_url);
		props.hideThumbnails();
	};

	const deleteHandler = () => {
		const publicIdForThumbnail = props.doc.preview_url.slice(61, 81);
		const publicIdForPdf = props.doc.pdf_url.slice(61, 81);
		const form = new FormData();
		form.append('thumb_public', publicIdForThumbnail);
		form.append('pdf_public', publicIdForPdf);
		props.deleteDocument(form, props.doc.id);
    };
    
	return (
		<div>
			<Card style={{ width: '12rem', borderColor: '#FD3D0D' }} className="mx-4 my-4 ">
				<Card.Img
					onClick={handleClick}
					style={{ height: 150 }}
					className="card-image"
					variant="top"
					src={props.doc.preview_url}
				/>
				<Card.Body>
					<Card.Title style={{ fontSize: 14 }}>{props.doc.description}</Card.Title>
					<Button
						style={{ fontSize: 14 }}
						href={`mailto:?subject=${props.doc.description} from PAY.S.A.P. &body=${props.doc.pdf_url}`}
					>
						Email Document
					</Button>
					<Button onClick={deleteHandler} style={{ fontSize: 14 }} className="mt-2">
						Delete
					</Button>
				</Card.Body>
			</Card>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		updatePdfUrl: (pdf) => dispatch(updatePdfUrl(pdf)),
		hideThumbnails: () => dispatch(hideThumbnails()),
		deleteDocument: (docObj, id) => dispatch(deleteDocument(docObj, id))
	};
};

export default connect(null, mapDispatchToProps)(DocumentCard);
