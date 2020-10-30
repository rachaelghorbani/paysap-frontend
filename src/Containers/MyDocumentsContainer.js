import React from 'react';
import { connect } from 'react-redux';
import DocumentUploadComponent from '../Components/DocumentUploadComponent'

class MyDocumentsContainer extends React.Component {
	//this container will contain preview images of all of a users uploaded documents. Each will be in a Document card. The document card will have the preview image as well as a link to email the file url.
	//user can click on the upload file button. they will be able to be able t upload a file and when it is returned the user will be updated to include this document which will then re render this component creating a card for it.
	//ideally a user will be able to clik on the image. when the image is clicked the thumbnails will be hiddden and the reactpdf docuent exposed with the url of the image clicked and using react-pdf be able to scroll through the pages

	//1. set up form properly
	//2. move submit handler to redux
	//3. create document there and udate user

	// state = {
	// 	document: {},
	// 	description: ''
	// };

    // descOnChange = (e) => {
    //     this.setState({[e.target.name]: e.target.value})
    // }
	// onChange = (e) => {
	// 	e.persist();
	// 	this.setState(() => {
	// 		return {
	// 			[e.target.name]: e.target.files[0]
	// 		};
	// 	});
	// };
	// onSubmit = (e) => {
	// 	e.preventDefault();
	// 	console.log(this.state.document);
	// 	const form = new FormData();
	// 	form.append('document', this.state.document);
	// 	form.append('user_id', this.props.user.id);
    //     form.append('description', this.state.description);
    //     //here we want to go to redux and pass form
	// 	const options = {
	// 		method: 'POST',
	// 		body: form
	// 	};
	// 	fetch('http://localhost:3000/documents', options).then((resp) => resp.json()).then((pdfmaybe) => {
	// 		this.setState({ url: pdfmaybe.url });
	// 		console.log(pdfmaybe);
	// 	});
	// };

	render() {
        console.log(this.props.user)
		return (
            <DocumentUploadComponent />
				// <Form onSubmit={this.onSubmit}>
				// 	<Form.Group controlId="formFileUpload">
				// 		<Form.Label>Upload Document</Form.Label>
				// 		<Form.Control type="file" name="document" onChange={this.onChange} />
				// 	</Form.Group>

				// 	<Form.Group controlId="formDocumentDescription">
				// 		<Form.Label>Document Description</Form.Label>
				// 		<Form.Control type="text" value={this.state.description} name='description' onChange={this.descOnChange}placeholder="Description" />
				// 	</Form.Group>
				// 	<Button variant="primary" type="submit">
				// 		Upload Document
				// 	</Button>
				// </Form>
				// {/* <a href={`mailto:no-one@snai1mai1.com?subject=look at this website&body=${this.state.url}`}> */}

		);
	}
}
const mapStateToProps = (state) => {
	return {
		user: state.user
	};
};



export default connect(mapStateToProps)(MyDocumentsContainer);
