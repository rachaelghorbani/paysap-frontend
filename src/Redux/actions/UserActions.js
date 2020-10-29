

export const onLoginSubmit = (user, history) => {
    return function(dispatch){
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({user})
        }
        fetch('http://localhost:3000/login', options)
        .then(resp =>  resp.json())
        .then(currentUser => {
            if(currentUser.user){
                localStorage.setItem("token", currentUser.jwt)
                history.push('/mysummary')

                return dispatch({type: 'LOGIN_USER', payload: currentUser.user})
            } 
            else if(currentUser.message){
                return dispatch({type:"UNSUCCESSFUL_LOGIN", payload: false})
                // maybe send back a dispatch that changes some state key (successfulLogin) to false and then unhides something on the login page that says sorry wrong username and password
            }
        })
    }
}

export const findUserByToken = (history) => {
    return function(dispatch){
       const token = localStorage.getItem('token')
       if(token){
           fetch('http://localhost:3000/profile', {
               method: "GET",
               headers: {
                   Authorization: `Bearer ${token}`
               }
           }).then(resp => resp.json())
           .then(user => {
               history.push('/mysummary')
              return dispatch({type:"LOGIN_FROM_TOKEN", payload: user.user})
            })
       }else {
           history.push('/')
       }
    }
}

export const logoutUser = () => {
    return {
        type: "LOGOUT_USER",
        payload: null
    }
}

export const signupUser = user => {
    return function(dispatch){
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({user})
        }
        fetch('http://localhost:3000/users', options)
        .then(resp => resp.json())
        .then(newUser => {
            localStorage.setItem("token", newUser.jwt)
            return dispatch({type: 'SIGNUP_USER', payload: newUser.user})


        })
    }
}

export const resetSuccessfulLogin = () => {
    return {
        type: "RESET_SUCCESSFUL_LOGIN", 
        payload: true
    }
}



