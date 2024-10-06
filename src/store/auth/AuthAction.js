import axios from 'axios';
import Cookies from 'js-cookie';
import { backendUrl, tokenVerifyPath } from '../../config/BackendUrl';


export const verifyToken = () => {
    return (dispatch) => {
        
        dispatch(setAwaitAuthAction(true))
        const token = Cookies.get('token')

        if (String(token) !== "null"){
            axios.post(`${backendUrl}${tokenVerifyPath}`, { token })
            .then(res => {
                if (res.status === 200){
                    dispatch(authenticateAction(true))
                    dispatch(setAwaitAuthAction(false))
                }
            })
            .catch(() => {
                dispatch(authenticateAction(false))
                dispatch(setAwaitAuthAction(false))
            })
        }
        else{
            dispatch(authenticateAction(false))
            dispatch(setAwaitAuthAction(false))
        }
    }
}

export const setAwaitAuthAction = (value) => {
    return { type: 'SET_AWAIT_AUTH', value }
}

export const authenticateAction = (value) => {
    return { type: 'AUTHENTICATE', value }
}