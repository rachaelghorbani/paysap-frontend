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