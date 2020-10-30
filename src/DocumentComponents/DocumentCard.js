import React from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';

const DocumentCard = (props) => {
	console.log(props);
	//will add onclick to the doc preview image that will set something in redux to true/false as well as save the url of the pdf in state. document container will listen for these and hide/show either thumbainls or full pdf accordingly
	return (
		// <Card style={{ width: '18rem', height: '25rem', margin: '5px' }}>
		// 	<Card.Img variant="top" src={props.doc.preview_url} />
		// 	<Card.Body>
		//     <ListGroup as="ul" variant="flush" className="overflow-auto" style={{height: 65}}>
		// 		<Card.Title>{props.doc.description}</Card.Title>
		//         </ListGroup>
		// 		<Button href={`mailto:?subject=${props.doc.description} from PAY.S.A.P. &body=${props.doc.pdf_url}`} >Email Document</Button>
		// 	</Card.Body>
		// </Card>

		<Card style={{ width: '12rem' }} className='mx-4'>
			<Card.Img style={{height: 200}}className="card-image" variant="top" src={props.doc.preview_url} />
			<Card.Body>
				<Card.Title style={{fontSize: 14}}>{props.doc.description}</Card.Title>
				{/* <ListGroup as="ul" variant="flush" className="overflow-auto" style={{ height: 50 }}>
				</ListGroup> */}
				<Button style={{fontSize: 14}} href={`mailto:?subject=${props.doc.description} from PAY.S.A.P. &body=${props.doc.pdf_url}`}>
					Email Document
				</Button>
			</Card.Body>
		</Card>
	);
};

export default DocumentCard;
