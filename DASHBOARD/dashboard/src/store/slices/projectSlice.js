import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const projectSlice = createSlice({
    name: 'project',
    initialState: {
        projects: [],
        loading: false,
        error: null,
        message: null,
    },
    reducers: {
        getAllProjectsRequest(state, action) {
            state.projects = []
            state.error = null
            state.loading = true
        },
        getAllProjectsSuccess(state, action) {
            state.projects = action.payload
            state.error = null
            state.loading = false
        },
        getAllProjectsFailed(state, action) {
            state.projects = state.projects
            state.error = action.payload
            state.loading = false
        },
        addNewProjectsRequest(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null
        },
        addNewProjectsSuccess(state, action) {
            state.loading = false;
            state.error = null;
            state.message = action.payload
        },
        addNewProjectsFailed(state, action) {
            state.loading = false;
            state.error = action.payload
            state.message = null
        },
        deleteProjectsRequest(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null
        },
        deleteProjectsSuccess(state, action) {
            state.loading = false;
            state.error = null;
            state.message = action.payload
        },
        deleteProjectsFailed(state, action) {
            state.loading = false;
            state.error = action.payload
            state.message = null
        },
        updateProjectsRequest(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null
        },
        updateProjectsSuccess(state, action) {
            state.loading = false;
            state.error = null;
            state.message = action.payload
        },
        updateProjectsFailed(state, action) {
            state.loading = false;
            state.error = action.payload
            state.message = null
        },
        clearAllErrors (state, action) {
            state.error = null;
            state.projects = state.projects
        },
        resetProjectSLice (state, action) {
            state.error = null;
            state.message = null;
            state.projects = state.projects
            state.loading = false
        }
    }
});

export const getAllProjects = ()=>async(dispatch)=>{
    dispatch(projectSlice.actions.getAllProjectsRequest())
    try {
        const response = await axios.get(
            "http://localhost:4000/api/v1/project/getall", 
            {withCredentials: true });
            dispatch(projectSlice.actions.getAllProjectsSuccess(response.data.projects))
            setTimeout(() => {
                dispatch(projectSlice.actions.clearAllErrors());
            }, 2000);
    } catch (error) {
        dispatch(projectSlice.actions.getAllProjectsFailed(error.response.data.message))
    }
}

export const addNewProject = (data)=>async(dispatch)=>{
    dispatch(projectSlice.actions.addNewProjectsRequest())
    try {
        const response = await axios.post(
            "http://localhost:4000/api/v1/project/add", data,
            {withCredentials: true, headers: {'Content-Type': 'multipart/form-data'}});
            dispatch(projectSlice.actions.addNewProjectsSuccess(response.data.message))
            setTimeout(() => {
                dispatch(projectSlice.actions.clearAllErrors());
            }, 2000);
    } catch (error) {
        dispatch(projectSlice.actions.addNewProjectsFailed(error.response.data.message))
    }
}

export const deleteProjects = (id)=> async(dispatch)=>{
    dispatch(projectSlice.actions.deleteProjectsRequest())
    try {
        const response = await axios.delete(
            `http://localhost:4000/api/v1/project/delete/${id}`, {withCredentials: true}
        )
        dispatch(projectSlice.actions.deleteProjectsSuccess(response.data.message))
        setTimeout(() => {
            dispatch(projectSlice.actions.clearAllErrors());
        }, 2000);
    } catch (error) {
        dispatch(projectSlice.actions.deleteProjectsFailed(error.response.data.message))
    }
}
export const updateProject = (id, newData)=> async(dispatch)=>{
    dispatch(projectSlice.actions.updateProjectsRequest())
    try {
        const response = await axios.put(
            `http://localhost:4000/api/v1/project/update/${id}`,newData, {withCredentials: true, headers: {'Content-Type': 'multipart/form-data'}}
        )
        dispatch(projectSlice.actions.updateProjectsSuccess(response.data.message))
        setTimeout(() => {
            dispatch(projectSlice.actions.clearAllErrors());
        }, 2000);
    } catch (error) {
        dispatch(projectSlice.actions.updateProjectsFailed(error.response.data.message))
    }
}

export const clearAllProjectSliceErrors = ()=>(dispatch)=>{
    dispatch(projectSlice.actions.clearAllErrors)
}

export const resetProjectSLice = ()=> (dispatch)=>{
    dispatch(projectSlice.actions.resetProjectSLice())
}

export default projectSlice.reducer