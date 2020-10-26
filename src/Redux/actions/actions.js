

export const onLoginSubmit = user => {
    return function(dispatch){
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(user)
        }
        fetch('http://localhost:3000/login', options)
        .then(resp =>  resp.json())
        .then(currentUser => {
            if(currentUser.user){
                localStorage.setItem("token", currentUser.jwt)
                return dispatch({type: 'LOGIN_USER', payload: currentUser.user})
            }
        })
    }
}

export const findUserByToken = (history) => {
    return function(dispatch){
       const token = localStorage.getItem('token')
       console.log(token)
       if(token){
           fetch('http://localhost:3000/profile', {
               method: "GET",
               headers: {
                   Authorization: `Bearer ${token}`
               }
           }).then(resp => resp.json())
           .then(user => dispatch({type:"LOGIN_FROM_TOKEN", payload: user.user}))
       }else {
           history.push('/login')
       }
    }
}