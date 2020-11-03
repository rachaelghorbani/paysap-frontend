import React from 'react';
import { connect } from 'react-redux';
import {Button, Form} from 'react-bootstrap'
import {addDocument} from '../Redux/actions/DocumentActions'

class DocumentUploadComponent extends React.Component {

	state = {
        document: {},
        preview: {},
		description: ''
	};

    descOnChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
	onChange = (e) => {
        e.persist();
        this.setState({document: e.target.files[0], preview: e.target.files[0]})
	};
	onSubmit = (e) => {
        e.preventDefault();
        
		const form = new FormData();
        form.append('document', this.state.document);
        form.append('preview', this.state.preview);
		form.append('user_id', this.props.user.id);
        form.append('description', this.state.description);
        if(this.state.document !== {} && this.state.description !== ''){
        this.props.addDocument(form)
        e.target.document.value = null

        
        this.setState({
            image: {},
            preview: {},
            description: ""
        })
    }
	};
	render() {
		return (
			<Form className='formBorder'  onSubmit={this.onSubmit}>
				<Form.Group controlId="formFileUpload">
					{/* <Form.Label>Upload Document</Form.Label> */}
					<Form.Control type="file" name="document" onChange={this.onChange} />
				</Form.Group>

				<Form.Group controlId="formDocumentDescription">
					<Form.Label>Document Description:</Form.Label>
					<Form.Control
						type="text"
						value={this.state.description}
						name="description"
						onChange={this.descOnChange}
						placeholder="Description"
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Upload Document
				</Button>
			</Form>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		user: state.user
	};
};

const mapDispatchToProps = dispatch => {
    return {
        addDocument: (formData) => dispatch(addDocument(formData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentUploadComponent);
