import _ from 'underscore';
import {
    TOGGLE_MODAL, CHANGE_CATEGORY, CHANGE_FACTOR, ADD_YEAR, REMOVE_YEAR,
    ADD_COLLECTION, REMOVE_COLLECTION, ADD_VOLUME, REMOVE_VOLUME, CHANGE_FILTER
} from '../type';


const INITIAL_STATE = { // all selections
    isOpen: false,
    category: "books",
    factor: '1',
    years: [],
    data: {}
}

//{'data':{
//'author':['author1','author2','author3'],
//'authname':{
// 'collection':[12,34,45],
// 'volumne':{'12':[1,4],'34':[2,3]}, 
// 'book':{'1':[50,52],'4':[61,62]}
// }
// }}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TOGGLE_MODAL: {
            state = {
                ...state,
                isOpen: action.value
            }
            // state.isOpen = action.value
            break;
        }
        case CHANGE_CATEGORY: {
            state = {
                ...state,
                category: action.payload.category
            }
            break;
        }
        case CHANGE_FACTOR: {
            state = {
                ...state,
                factor: action.payload.value
            }
            break;
        }
        case ADD_YEAR: {
            const { yearArr } = action.payload;
            state = {
                ...state,
                years: _.uniq([...state.years, ...yearArr])
            }
            break;
        }
        case REMOVE_YEAR: {
            const { yearArr } = action.payload;
            state = {
                ...state,
                years: state.years.filter(year => !yearArr.includes(year))
            }
            break;
        }
        case ADD_COLLECTION: {
            const { authName, collectionIdArr } = action.payload;
            state = {
                ...state,
                data: {
                    ...state.data,
                    [authName]: {
                        ...(state.data[authName]) ? state.data[authName] : {},
                        collections: _.uniq([...((state.data[authName] &&
                            state.data[authName].collections) ?
                            state.data[authName].collections : []),
                        ...collectionIdArr])
                    }
                }
            }
            break;

            // const { authName, collectionId } = action.payload;
            // // state.data[authName]= !state.data[authName]?{}:state.data[authName]
            // state.data[authName].collections = _.uniq([...((state.data[authName] &&
            //     state.data[authName].collections) ?
            //     state.data[authName].collections : []),
            // ...collectionId])

        }
        case REMOVE_COLLECTION: {
            const { authName, collectionIdArr } = action.payload
            state = {
                ...state,
                data: {
                    ...state.data,
                    [authName]: {
                        ...(state.data[authName]) ? state.data[authName] : {},
                        collections: state.data[authName] &&
                            state.data[authName].collections &&
                            state.data[authName].collections.
                                filter(row => !collectionIdArr.includes(row))//(collectionId.length > 0) && 
                    }
                }
            }

            //     state[action.payload.authName] = {
            //         collections: state[action.payload.authName] &&
            //             state[action.payload.authName].collections.
            //                 filter(row => !action.payload.collectionId.includes(row))//(action.payload.collectionId.length > 0) && 
            //     }
            break;
        }
        case ADD_VOLUME: {
            const { authName, collectionId, volumeIdArr } = action.payload
            state = {
                ...state,
                data: {
                    ...state.data,
                    [authName]: {
                        ...(state.data[authName]) ? state.data[authName] : {},
                        volumes: {
                            ...((state.data[authName] && state.data[authName].volumes) ?
                                state.data[authName].volumes : {}),
                            [collectionId]:
                                _.uniq([...((state.data[authName] &&
                                    state.data[authName].volumes &&
                                    state.data[authName].volumes[collectionId]) ?
                                    state.data[authName].volumes[collectionId] : []),
                                ...volumeIdArr])
                        }
                    }
                }
            }

            //     state[action.payload.authName] = {
            //         ...(state[action.payload.authName]) ? state[action.payload.authName] : {},
            //         volumes: {
            //             ...((state[action.payload.authName] && state[action.payload.authName].volumes) ? state[action.payload.authName].volumes : {}),
            //                 [action.payload.collectionId]:
            //                 _.uniq([...((state[action.payload.authName] &&
            //                     state[action.payload.authName].volumes &&
            //                     state[action.payload.authName].volumes[action.payload.collectionId]) ?
            //                     state[action.payload.authName].volumes[action.payload.collectionId] : []),
            //                 ...action.payload.volumeId])
            //         }
            //     }
            break;
        }
        case REMOVE_VOLUME: {
            const { authName, collectionId, volumeIdArr } = action.payload
            state = {
                ...state,
                data: {
                    ...state.data,
                    [authName]: {
                        ...(state.data[authName]) ? state.data[authName] : {},
                        volumes: {
                            ...((state.data[authName] && state.data[authName].volumes) ?
                                state.data[authName].volumes : {}),
                            [collectionId]: state.data[authName].volumes[collectionId].
                                filter(row => !volumeIdArr.includes(row))
                        }
                    }
                }
            }

            // state[action.payload.authName] = {
            //     volumes: {
            //         [action.payload.collectionId]:
            //             state[action.payload.authName].volumes[action.payload.collectionId].
            //                 filter(row => !action.payload.volumeId.includes(row))
            //     }
            // }
            break;
        }
        case CHANGE_FILTER: {
            state = {
                ...state,
                data: {},
                years: [],
            }
            break;
        }
        // case 'ADD_AUTHOR': {
        //     const { authName } = action.payload;
        //     state = {
        //         ...state,
        //         data: {
        //             ...state.data,
        //             authors: [...state.data.authors, authName]
        //         }
        //     }
        //     break;
        // }
        // case 'REMOVE_AUTHOR': {
        //     const { authName } = action.payload;
        //     state = {
        //         ...state,
        //         data: {
        //             ...state.data,
        //             authors: state.data.authors.filter(value => value !== authName)
        //         }
        //     }
        //     break;
        // }
    }
    return state
}