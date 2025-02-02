import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/Error.js";
import { Timeline } from '../Models/timelineSchema.js';

export const postTimeline = catchAsyncErrors(async(req, res, next) =>{
    const {title, description, from, to} = req.body;
    const newTimeline = await Timeline.create({
        title, 
        description,
        timeline:{ from, to }
    });
    res.status(200).json({
        success: true,
        message: 'Timeline has been added',
        newTimeline,
    })
})
export const getAllTimelines = catchAsyncErrors(async(req, res, next) =>{
    const timelines = await Timeline.find();
    res.status(200).json({
        success: true,
        timelines
    })
})
export const deleteTimeline = catchAsyncErrors(async(req, res, next) =>{
    const {id} = req.params;
    const timeline = await Timeline.findById(id);
    if(!timeline) {
        return next(new ErrorHandler("Timeline not found", 404))
    }
    await timeline.deleteOne();
    res.status(200).json({
        success: true,
        message: 'Timeline has been deleted Successfully!'
    })
})