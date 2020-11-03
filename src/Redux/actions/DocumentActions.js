
export const addDocument = formData => {
    return function(dispatch, getState){

        // const token = localStorage.getItem('token');

        const options = {
            method: 'POST',
            // headers: {
			// 	Authorization: `Bearer ${token}`
			// },
			body: formData
        };


        fetch('http://localhost:3000/documents', options)
        .then((resp) => resp.json())
        .then((document) => {
            console.log(document)
            const formattedJob = {
                id: document.id,
                description: document.description,
                pdf_url: document.pdf_url,
                preview_url: document.preview_url
            }
            const user = {...getState().user, documents:[...getState().user.documents, formattedJob]}
            return dispatch({type: "ADD_DOCUMENT", payload: user})
		});
    }
}

export const updatePdfUrl = pdf => {
    return {
        type: 'PDF_URL',
        payload: pdf
    }
}

export const hideThumbnails = () => {
    return {
        type: 'HIDE_THUMBNAILS',
        payload: true
    }
}
export const showThumbnails = () => {
    return {
        type: 'SHOW_THUMBNAILS',
        payload: false
    }
}

export const deleteDocument = (docObj, id) => {
    return function(dispatch, getState){
        const token = localStorage.getItem('token');
        console.log(docObj)
        const options = {
            method: 'DELETE',
            headers: {
            	Authorization: `Bearer ${token}`
            },
            body: docObj
        }
        fetch(`http://localhost:3000/documents/${id}`, options)
        .then(resp => resp.json())
        .then((retdoc) => {
            const documents = getState().user.documents
            const filtered = documents.filter(doc => doc.id !== id)
            const newArr = {
                ...getState().user,
                documents: filtered
            };
            console.log(retdoc)
            return dispatch({type: 'DELETE_DOCUMENT', payload: newArr})
        })
    }
}

export const showUploadForm = () => {
    return {
        type: 'SHOW_UPLOAD_FORM',
        payload: true
    }
}

export const hideUploadForm = () => {
    return {
        type: 'HIDE_UPLOAD_FORM',
        payload: false 
    }
}