// import Cookies from 'js-cookie';
import axios from 'axios';
import { LOADING, RESULT, DETAIL, DETAIL_MODAL, SEARCH_PARAM } from '../type';
import { backendUrl, queryPath, queryDetailPath } from '../../config/BackendUrl';
// import { authenticateAction, setAwaitAuthAction } from '../';


export const search = (term, filters = null, offset = 0) => { //filters is the entire state of filtersReducer
    console.log("F State: ", filters)
    const queryUrl = `${backendUrl}${queryPath}`

    let param = {};
    let collectionArr = [];
    let volumneArr = [];
    Object.entries(filters.data).map((row) => {
        const [author, entity] = row
        console.log(author)
        Object.entries(entity).map((row1) => {
            const [entityName, entityValue] = row1;
            if (entityName === 'collections') {
                collectionArr = [...collectionArr, ...entityValue];
            }
            if (entityName === 'volumes') {
                Object.entries(entityValue).map((row2) => {
                    const [collId, volArr] = row2;
                    volArr.map((row3) => {
                        volumneArr.push(collId + '-' + row3);
                    })
                })
            }
        })
    })
    param.collections = collectionArr.join(",")
    param.volumes = volumneArr.join(",")
    param.qtype = filters.factor
    param.tab = filters.category
    param.term = term
    param.offset = offset
    return (dispatch) => {
        dispatch({ type: SEARCH_PARAM, payload: param })
        // authenticate
        // const access = Cookies.get('token');
        // if (String(access) !== "null") {
        dispatch({ type: LOADING, value: true })
        dispatch(message(''))
        // scroll load or not
        // if (offset === 0) {
        //     dispatch({ type: RESULT, results: [] })
        //     dispatch(message(''))
        // }
        axios.get(queryUrl, {
            params: param
            // ,headers: { Authorization: `Bearer ${access}` } 
        }).then(res => {
            console.log("RESPONSE: ", res);
            dispatch({ type: LOADING, value: false });
            if (typeof (res.data) == 'string') {
                dispatch(message(res.data))
            } else {
                const { hits, total } = res.data.hits;
                if (total.value === 0) {
                    dispatch(message("No results found"));
                } else if (hits.length === 0) { // reached the end
                    dispatch(message("The end."));
                    console.log("End reached");
                } else {
                    console.log("Still to go");
                    dispatch({ type: RESULT, payload: { hits, total } });
                }
            }
            // if (offset === 0) // save history
            //     setTimeout(() =>
            //         document.getElementById("refresh-history") ?
            //             document.getElementById("refresh-history").click() : null, 3000)
        }).catch(err => {
            dispatch({ type: LOADING, value: false })
            console.log("ERROR: ", err)
            if (err.response && err.response.status === 401) {
                // setAwaitAuthAction(true)
                // if (offset === 0) {
                //     dispatch(authenticateAction(false))
                // } else {
                // window.onscroll = null
                // dispatch(message("You have been logged out. Please sign in again."))
                // setTimeout(() => {
                //     dispatch(authenticateAction(false))
                // }, 2000)
                // }
                dispatch(message("Something went wrong. Please try again."))
            } else { // probably the server's down
                dispatch(message("Something went wrong. Please try again."))
            }
        })
        // } else {
        //     dispatch(loading(false))
        //     dispatch(authenticateAction(false))
        // }
    }
}

export const resultDetail = (params) => {
    return (dispatch) => {
        // const access = Cookies.get('token');
        // if (String(access) !== "null") {
        axios.get(`${backendUrl}${queryDetailPath}`, {
            params
            // , headers: { Authorization: `Bearer ${access}` } 
        }).then(res => {
            dispatch(detailData(res.data.hits.hits))
        })
        // } else {
        //     dispatch({ type: LOADING, value: false })
        //     dispatch(authenticateAction(false))
        // }
    }
}

export const detailData = data => {
    return { type: DETAIL, payload: { data } }
}

export const detailModal = value => {
    return { type: DETAIL_MODAL, value }
}

export const message = (message) => {
    return { type: 'MESSAGE', message }
}