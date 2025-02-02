import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const softwareApplicationSlice = createSlice({
    name: 'application',
    initialState: {
        softwareApplications: [],
        loading: false,
        error: null,
        message: null,
    },
    reducers: {
        getAllSoftwareApplicationRequest(state, action) {
            state.softwareApplications = [];
            state.loading = true;
            state.error = false
        },
        getAllSoftwareApplicationSuccess(state, action) {
            state.softwareApplications = action.payload;
            state.loading = false;
            state.error = null;
        },
        getAllSoftwareApplicationFailed(state, action) {
            state.softwareApplications = state.softwareApplications;
            state.loading = false;
            state.error = action.payload;
        },
        addNewSoftwareApplicationRequest(state, action) {
            state.loading = true
            state.error = null
            state.message = null
        },
        addNewSoftwareApplicationSuccess(state, action) {
            state.loading = false
            state.error = null
            state.message = action.payload
        },
        addNewSoftwareApplicationlFailed(state, action) {
            state.loading = false
            state.error = action.payload
            state.message = null
        },
        deleteSoftwareApplicationRequest(state, action) {
            state.loading = true
            state.error = null
            state.message = null
        },
        deleteSoftwareApplicationSuccess(state, action) {
            state.loading = false
            state.error = null
            state.message = action.payload
        },
        deleteSoftwareApplicationFailed(state, action) {
            state.loading = false
            state.error = action.payload
            state.message = null
        },
        resetSoftwareApplicationSlice(state, action) {
            state.error = null;
            state.loading = false;
            state.message = null
            state.softwareApplications = state.softwareApplications
        },
        clearAllErrors(state, action) {
            state.error = null;
            state.softwareApplications = state.softwareApplications
        }
    }
});

export const getAllSoftwareApplication = ()=> async(dispatch)=>{
    dispatch(softwareApplicationSlice.actions.getAllSoftwareApplicationRequest())
    try {
        const response = await axios.get(
            'http://localhost:4000/api/v1/softwareapplication/getall', {withCredentials: true,}
        );
        dispatch(softwareApplicationSlice.actions.getAllSoftwareApplicationSuccess(response.data.softwareApplications));
        setTimeout(() => {
            dispatch(softwareApplicationSlice.actions.clearAllErrors());
        }, 1000);
    } catch (error) {
        dispatch(softwareApplicationSlice.actions.getAllSoftwareApplicationFailed(error.response.data.message))
    }
}

export const addNewSoftwareApplication = (data)=>async(dispatch)=>{
    console.log(data);
    
    dispatch(softwareApplicationSlice.actions.addNewSoftwareApplicationRequest())
    try {
        const response = await axios.post(
           'http://localhost:4000/api/v1/softwareapplication/add', data, {withCredentials: true,  headers: {'Content-Type': 'multipart/form-data'}}
        )
        dispatch(softwareApplicationSlice.actions.addNewSoftwareApplicationSuccess(response.data.message))
        setTimeout(() => {
            dispatch(softwareApplicationSlice.actions.clearAllErrors());
        }, 2000);
    } catch (error) {
        dispatch(softwareApplicationSlice.actions.addNewSoftwareApplicationlFailed(error.response.data.message))
    }
}

export const deleteSoftwareApplication = (id)=>async(dispatch)=>{
    dispatch(softwareApplicationSlice.actions.deleteSoftwareApplicationRequest())
    try {
        const response = await axios.delete(`http://localhost:4000/api/v1/softwareapplication/delete/${id}`, {withCredentials: true})
       dispatch(softwareApplicationSlice.actions.deleteSoftwareApplicationSuccess(response.data.message)) 
       setTimeout(() => {
        dispatch(softwareApplicationSlice.actions.clearAllErrors());
    }, 1000);
    } catch (error) {
        dispatch(softwareApplicationSlice.actions.deleteSoftwareApplicationFailed(error.response.data.message))
    }
}
export const clearAllApplicationSliceErrors = ()=>(dispatch) => {
    dispatch(softwareApplicationSlice.actions.clearAllErrors())
}

export const resetSoftwareApplicationSlice = () => (dispatch) => {
    dispatch(softwareApplicationSlice.actions.resetSoftwareApplicationSlice())
}


export default softwareApplicationSlice.reducer