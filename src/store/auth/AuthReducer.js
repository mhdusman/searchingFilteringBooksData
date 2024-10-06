const initState = {
    isAuthenticated: false,
    awaitAuth: true,
}

export default (state = initState, action) => {
    
    switch (action.type){
        case 'AUTHENTICATE': {
            state = {
                ...state,
                isAuthenticated: action.value
            }
            break;
        }
        case 'SET_AWAIT_AUTH': {
            state = {
                ...state,
                awaitAuth: action.value
            }
            break;
        }
    }
    return state
}