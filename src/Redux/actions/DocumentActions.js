const token = localStorage.getItem('token');

const options = (method, data) => {
    return {
        method: method,
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: data
    }
}

export const addDocument = (formData) => {
	return function(dispatch, getState) {
        fetch('http://localhost:3000/documents', options('POST', formData))
        .then((resp) => resp.json())
        .then((document) => {
			console.log(document);
			const formattedJob = {
				id: document.id,
				description: document.description,
				pdf_url: document.pdf_url,
				preview_url: document.preview_url
			};
			const user = { ...getState().user, documents: [ ...getState().user.documents, formattedJob ] };
			return dispatch({ type: 'ADD_DOCUMENT', payload: user });
		});
	};
};

export const deleteDocument = (docObj, id) => {
	return function(dispatch, getState) {
        fetch(`http://localhost:3000/documents/${id}`, options('DELETE', docObj))
        .then((resp) => resp.json())
        .then(() => {
			const documents = getState().user.documents;
			const filtered = documents.filter((doc) => doc.id !== id);
			const newArr = {
				...getState().user,
				documents: filtered
			};
			return dispatch({ type: 'DELETE_DOCUMENT', payload: newArr });
		});
	};
};

export const showUploadForm = () => {
	return {
		type: 'SHOW_UPLOAD_FORM',
		payload: true
	};
};

export const hideUploadForm = () => {
	return {
		type: 'HIDE_UPLOAD_FORM',
		payload: false
	};
};

export const updatePdfUrl = (pdf) => {
	return {
		type: 'PDF_URL',
		payload: pdf
	};
};

export const hideThumbnails = () => {
	return {
		type: 'HIDE_THUMBNAILS',
		payload: true
	};
};
export const showThumbnails = () => {
	return {
		type: 'SHOW_THUMBNAILS',
		payload: false
	};
};
