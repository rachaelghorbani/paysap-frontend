export const createJob = (jobObj, history) => {
	return function(dispatch, getState) {
		const token = localStorage.getItem('token');
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(jobObj)
		};
        fetch('http://localhost:3000/jobs', options)
        .then((resp) => resp.json())
        .then((job) => {
            const newArr = [ ...getState().jobs, job ];
            history.push('/jobs/clientside')

            return dispatch({ type: 'CREATE_JOB', payload: newArr });
            
        });

		//will need to create job and update the current user. should navigate to our my client-side-jobs page after
	};
};

export const fetchAllJobs = () => {
	return function(dispatch) {
		fetch('http://localhost:3000/jobs').then((resp) => resp.json()).then((jobs) => {
			return dispatch({ type: 'FETCH_ALL_JOBS', payload: jobs });
		});
	};
};
