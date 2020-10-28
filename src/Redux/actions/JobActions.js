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

export const completeJob = (jobObj) => {
    return function(dispatch, getState){

        const token = localStorage.getItem('token');


        const patchJobObj = {
            hours: jobObj.hours,
            total_amount: jobObj.total_amount,
            completed: jobObj.completed
        }
        const options = {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(patchJobObj)
        }
        fetch(`http://localhost:3000/jobs/${jobObj.id}`, options)
        .then(resp => resp.json())
        .then(updatedJob => {
            const user = getState().user.jobs_as_freelancer
            const oldJob = user.find(job => job.id === updatedJob.id)
            const newJob = {...oldJob, completed: true, hours: updatedJob.hours, total_amount: updatedJob.total_amount}
            const index = user.indexOf(oldJob)
            user[index] = newJob
            const newArr = {...getState().user, jobs_as_freelancer:user}
            console.log(newArr)
           return dispatch({type: "COMPLETE_JOB", payload: newArr })
            
           

            console.log(updatedJob)
        })
        
        //send patch request to the the job with the updated info
        //have to update both accounts
        //have to update the user object. have to find and update this freelance job. will have to take the extra data(client_email etc from the old obj and add it to the new object we receive back maybe can change in serializer)
    }
}

