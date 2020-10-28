export const createJob = (jobObj, history) => {
	return function(dispatch, getState) {
        const jobToCreate = {
			description: jobObj.description,
			start_time: jobObj.start_time,
			client_id: jobObj.client_id,
			freelancer_id: jobObj.freelancer_id,
			dayrate_or_hourly: jobObj.dayrate_or_hourly,
			lat: jobObj.lat,
			long: jobObj.long,
			location: jobObj.location,
            rate: jobObj.rate
        }


       
		const token = localStorage.getItem('token');
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(jobToCreate)
		};
        fetch('http://localhost:3000/jobs', options)
        .then((resp) => resp.json())
        .then((job) => {
            jobObj.id = job.id
            const newArr = {...getState().user, jobs_as_client:[...getState().user.jobs_as_client, jobObj ]}
            history.push('/jobs/clientside')

            return dispatch({ type: 'CREATE_JOB', payload: newArr });
            
        });

		//will need to create job and update the current user. should navigate to our my client-side-jobs page after
	};
};

