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
		};

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
		fetch('http://localhost:3000/jobs', options).then((resp) => resp.json()).then((job) => {
			jobObj.id = job.id;
			const newArr = { ...getState().user, jobs_as_client: [ ...getState().user.jobs_as_client, jobObj ] };
			history.push('/jobs/clientside');

			return dispatch({ type: 'CREATE_JOB', payload: newArr });
		});

		//will need to create job and update the current user. should navigate to our my client-side-jobs page after
	};
};

export const completeJob = (jobObj) => {
	return function(dispatch, getState) {
		const token = localStorage.getItem('token');

		const patchJobObj = {
			hours: jobObj.hours,
			total_amount: jobObj.total_amount,
			completed: jobObj.completed
		};
		const options = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(patchJobObj)
		};

		//update job to put in hours, total amount, and to complete it

		fetch(`http://localhost:3000/jobs/${jobObj.id}`, options).then((resp) => resp.json()).then((updatedJob) => {
			const options = {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({ amount: jobObj.client_balance - jobObj.total_amount })
			};

			//update clients bank account. since we're not using it after this it we don't need to do anything with the data

			fetch(`http://localhost:3000/accounts/${jobObj.client_bank_account_id}`, options)
				.then((resp) => resp.json())
				.then();

			const user = getState().user;

			const userOptions = {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({ amount: user.account.amount + jobObj.total_amount })
			};

			//update the current user's bank account asd well as swap out the old job from their state with the new one and send it back to update state with the updated user object

			fetch(`http://localhost:3000/accounts/${user.account.id}`, userOptions)
				.then((resp) => resp.json())
				.then((updatedAccount) => {
					const userFreelanceJobs = getState().user.jobs_as_freelancer;
					const oldJob = userFreelanceJobs.find((job) => job.id === updatedJob.id);
					const newJob = {
						...oldJob,
						completed: true,
						hours: updatedJob.hours,
						total_amount: updatedJob.total_amount
					};
					const index = userFreelanceJobs.indexOf(oldJob);
					userFreelanceJobs[index] = newJob;
					const newArr = {
						...getState().user,
						account: updatedAccount,
						jobs_as_freelancer: userFreelanceJobs
					};
					return dispatch({ type: 'COMPLETE_JOB', payload: newArr });
				});
		});
	};
};

export const updateJob = (jobObj) => {
	return function(dispatch, getState) {
		const jobToUpdate = {
			description: jobObj.description,
			start_time: jobObj.start_time,
			freelancer_id: jobObj.freelancer_id,
			dayrate_or_hourly: jobObj.dayrate_or_hourly,
			lat: jobObj.lat,
			long: jobObj.long,
			location: jobObj.location,
			rate: jobObj.rate
		};

		const token = localStorage.getItem('token');
		const options = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(jobToUpdate)
		};
        fetch(`http://localhost:3000/jobs/${jobObj.id}`, options)
        .then((resp) => resp.json())
        .then((job) => {
			const userClientJobs = getState().user.jobs_as_client;
			const oldJob = userClientJobs.find((job) => job.id === jobObj.id);

			const index = userClientJobs.indexOf(oldJob);
			userClientJobs[index] = jobObj;
			const newArr = {
				...getState().user,
				jobs_as_client: userClientJobs
			};
			//find old job and then reaplace
			return dispatch({ type: 'UPDATE_JOB', payload: newArr });
		});
	};
};

export const deleteJob = jobId => {
    return function(dispatch, getState){
        const token = localStorage.getItem('token');

        const options = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        fetch(`http://localhost:3000/jobs/${jobId}`, options)
        .then(resp => resp.json())
        .then(() => {
            const clientJobs = getState().user.jobs_as_client
            console.log(clientJobs)
            const filtered = clientJobs.filter(job => job.id !== jobId)
            console.log(filtered)
            const newArr = {
                ...getState().user,
                jobs_as_client: filtered
            };
            return dispatch({type: "DELETE_JOB",payload: newArr})
        })
        //send delete request to jobs/id
        //filter through a users client jobs and only return jobs where the id doesnt match this id and reset
    }
}
