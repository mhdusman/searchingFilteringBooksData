import {
    TOGGLE_MODAL, CHANGE_CATEGORY, CHANGE_FACTOR, ADD_YEAR, REMOVE_YEAR,
    ADD_COLLECTION, REMOVE_COLLECTION, ADD_VOLUME, REMOVE_VOLUME, CHANGE_FILTER
} from '../type';


export const toggleModal = (value) => {
    return { type: TOGGLE_MODAL, value }
}

export const changeCategory = (category) => {
    return { type: CHANGE_CATEGORY, payload: { category } }
}

export const changeFactor = value => {
    return { type: CHANGE_FACTOR, payload: { value } }
}

export const addYear = (yearArr) => {
    return { type: ADD_YEAR, payload: { yearArr } }
}

export const removeYear = (yearArr) => {
    return { type: REMOVE_YEAR, payload: { yearArr } }
}

export const addCollection = (authName, collectionIdArr) => {
    return { type: ADD_COLLECTION, payload: { authName, collectionIdArr } }
}

export const removeCollection = (authName, collectionIdArr) => {
    return { type: REMOVE_COLLECTION, payload: { authName, collectionIdArr } }
}

export const addVolume = (authName, collectionId, volumeIdArr) => {
    return { type: ADD_VOLUME, payload: { authName, collectionId, volumeIdArr } }
}

export const removeVolume = (authName, collectionId, volumeIdArr) => {
    return { type: REMOVE_VOLUME, payload: { authName, collectionId, volumeIdArr } }
}

export const changeFilter = () => {
    return { type: CHANGE_FILTER, payload: {} }
}

// export const addAuthor = (author) => {
//     return { type: 'ADD_AUTHOR', author }
// }

// export const removeAuthor = (author) => {
//     return { type: 'REMOVE_AUTHOR', author }
// }