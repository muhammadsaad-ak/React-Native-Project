import { ADD_DATA, DELETE_DATA, EDIT_DATA } from './types'

export const addData = (data) => {
    return ({
        type: ADD_DATA,
        payload: data
    });
}

export const deleteData = (index) => {
    return ({
        type: DELETE_DATA,
        payload: index
    })
}

export const editData = (data, index) => {
    return ({
        type: EDIT_DATA,
        payload: {
            data: data,
            index: index
        }
    })
}
