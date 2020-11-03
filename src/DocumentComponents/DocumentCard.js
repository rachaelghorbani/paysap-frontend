import React from 'react';
import { Card, Button } from 'react-bootstrap';
import {connect} from 'react-redux'
import {updatePdfUrl, hideThumbnails, deleteDocument} from '../Redux/actions/DocumentActions'



const DocumentCard = (props) => {
    // 1. add onclick to image part
    // 2. create dispatch for updatePdfUrl
    // 3. in this dispatch will have to send back the pdf_url of this doc, as well as some toggle to hide the thumbnails
    // 4. must listen for both in container
    // 5. toggle hide/hide based on these in container
    // 6. some kind of exit button that untoggles and hides the pdf and shows the thumbnails

    //will add onclick to the doc preview image that will set something in redux to true/false as well as save the url of the pdf in state. document container will listen for these and hide/show either thumbainls or full pdf accordingly

    //on delete must sent back the object id as well as the public_id of our pdf and thumbnail
    const handleClick = () => {
        props.updatePdfUrl(props.doc.pdf_url)
        props.hideThumbnails()
    }

    const deleteHandler = () => {
        const publicIdForThumbnail = props.doc.preview_url.slice(61, 81)
        const publicIdForPdf = props.doc.pdf_url.slice(61, 81)
        const form = new FormData();
        form.append('thumb_public', publicIdForThumbnail);
        form.append('pdf_public', publicIdForPdf);
        props.deleteDocument(form, props.doc.id)
        
    }
	return (
        <div>
		<Card style={{ width: '12rem', borderColor: '#FD3D0D' }}className='mx-4 my-4 '>
			<Card.Img  onClick={handleClick} style={{height: 150}}className="card-image" variant="top" src={props.doc.preview_url} />
			<Card.Body>
				<Card.Title style={{fontSize: 14}}>{props.doc.description}</Card.Title>
				{/* <ListGroup as="ul" variant="flush" className="overflow-auto" style={{ height: 50 }}>
				</ListGroup> */}
				<Button style={{fontSize: 14}} href={`mailto:?subject=${props.doc.description} from PAY.S.A.P. &body=${props.doc.pdf_url}`}>
					Email Document
				</Button>
                <Button onClick={deleteHandler} style={{fontSize: 14}} className='mt-2'>Delete</Button>
			</Card.Body>
		</Card>
        </div>
	);
};



const mapDispatchToProps = dispatch => {
return {
    updatePdfUrl: (pdf) => dispatch(updatePdfUrl(pdf)),
    hideThumbnails: () => dispatch(hideThumbnails()),
    deleteDocument: (docObj, id) => dispatch(deleteDocument(docObj, id)) 
}
}

export default connect(null, mapDispatchToProps)(DocumentCard);
