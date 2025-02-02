import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const timelineSlice = createSlice({
    name: 'timeline',
    initialState: {
        loading: false,
        timelines: [],
        error: null,
        message: null,
    },
    reducers: {
        getAllTimelineRequest(state, action){
            state.timelines = []
            state.error = null
            state.loading = true
        },
        getAllTimelineSuccess(state, action){
            state.timelines = action.payload
            state.error = null
            state.loading = false
        },
        getAllTimelineFailed(state, action){
            state.timelines = state.timelines
            state.error = action.payload
            state.loading = false
        },
        deleteTimelineRequest(state, action){
            state.message = null
            state.error = null
            state.loading = true
        },
        deleteTimelineSuccess(state, action){
            state.message = action.payload
            state.error = null
            state.loading = false
        },
        deleteTimelineFailed(state, action){
            state.message = null
            state.error = action.payload
            state.loading = false
        },
        addTimelineRequest(state, action){
            state.message = null
            state.error = null
            state.loading = true
        },
        addTimelineSuccess(state, action){
            state.message = action.payload
            state.error = null
            state.loading = false
        },
        addTimelineFailed(state, action){
            state.message = null
            state.error = action.payload
            state.loading = false
        },
        resetTimelineSlice(state, action) {
           state.error = null
           state.timelines = state.timelines
            state.message = null
            state.loading = false
        },
        clearAllErrors(state, action) {
            state.error = null,
            state.timelines = state.timelines
        }
    }
});

export const getAllTimeline = ()=>async(dispatch)=>{
    dispatch(timelineSlice.actions.getAllTimelineRequest())
    try {
        const {data} = await axios.get(
            'http://localhost:4000/api/v1/timeline/getall',
            {withCredentials: true}
            );
            dispatch(timelineSlice.actions.getAllTimelineSuccess(data.timelines))
            setTimeout(() => {
                dispatch(timelineSlice.actions.clearAllErrors());
            }, 5000);
    } catch (error) {
        dispatch(timelineSlice.actions.getAllTimelineFailed(error.response.data.message));
    }

}
export const deleteTimeline = (id)=>async(dispatch)=>{
    dispatch(timelineSlice.actions.deleteTimelineRequest())
    try {
        const {data} = await axios.delete(
            `http://localhost:4000/api/v1/timeline/delete/${id}`, {withCredentials: true});
        dispatch(timelineSlice.actions.deleteTimelineSuccess(data.message))
        setTimeout(() => {
            dispatch(timelineSlice.actions.clearAllErrors());
        }, 5000);
    } catch (error) {
        dispatch(timelineSlice.actions.deleteTimelineFailed(error.response.data.message));
    }
};
export const addNewTimeline = (timelineData)=>async(dispatch)=>{
    dispatch(timelineSlice.actions.addTimelineRequest())
    try {
        const {data} = await axios.post(
            `http://localhost:4000/api/v1/timeline/add`, timelineData, {withCredentials: true, headers: {"Content-Type": "application/json"}});
        dispatch(timelineSlice.actions.addTimelineSuccess(data.message))
        setTimeout(() => {
            dispatch(timelineSlice.actions.clearAllErrors());
        }, 5000);
    } catch (error) {
        dispatch(timelineSlice.actions.addTimelineFailed(error.response.data.message));
    }
};

export const clearAllTimelineErrors = ()=>(dispatch)=>{
    dispatch(timelineSlice.actions.clearAllErrors())
}

export const resetTimelineSlice = ()=>(dispatch)=>{
    dispatch(timelineSlice.actions.resetTimelineSlice())
}

export default timelineSlice.reducer