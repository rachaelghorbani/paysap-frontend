export const fetchAllUsers = () => {
    return function(dispatch){
        fetch('http://localhost:3000/users')
        .then(resp => resp.json())
        .then(users => {
            return dispatch({type: 'FETCH_ALL_USERS', payload: users})
        })
    }
}

