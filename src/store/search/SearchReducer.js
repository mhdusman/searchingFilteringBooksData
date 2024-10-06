import { LOADING, MESSAGE, RESULT, DETAIL, DETAIL_MODAL, SEARCH_PARAM } from '../type';

const initState = {
    loading: false,
    detailModel: false,
    detail: null,
    result: [],
    resultCount: 0,
    offset: 0,
    searchParam: {},
}

export default (state = initState, action) => {

    switch (action.type) {
        case LOADING: {
            state = {
                ...state,
                loading: action.value
            }
            break;
        }
        case DETAIL_MODAL: {
            state = {
                ...state,
                detailModel: action.value
            }
            break;
        }
        case DETAIL: {
            const { data } = action.payload;
            state = {
                ...state,
                detail: data
            }
            break;
        }
        case RESULT: {
            const { hits, total } = action.payload;
            state = {
                ...state,
                result: hits,
                // result:[...state.result, ...hits],
                resultCount: total.value,
                offset: hits.length
            }
            break;
        }
        case MESSAGE: {
            state = { ...state, message: action.message }
            break;
        }
        case SEARCH_PARAM: {
            state = { ...state, searchParam: action.payload }
            break;
        }
    }

    return state
}