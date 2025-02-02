import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/Error.js";
import {v2 as cloudinary} from 'cloudinary'
import { Project } from "../Models/projectSchema.js";

export const addNewProject = catchAsyncErrors(async(req,res, next) => {
    if(!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler('Project Banner image required!', 400))
    }
    const {projectBanner} = req.files
    const {
        title,
        description,
        gitRepoLink,
        projectLink,
        technologies,
        stack,
        deployed,
    } = req.body;
    if(!title ||!description ||!gitRepoLink ||!projectLink ||!technologies ||!stack ||!deployed) {
        return next(new ErrorHandler('Please Fill Full Form!', 400))
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(projectBanner.tempFilePath,{folder: "PROJECT_IMAGES"})
    if(!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary Error",cloudinaryResponse.error || "Unknown Cloudinary Error"); 
        return next(new ErrorHandler('Failed to upload Project Banner to cloudinary!', 500))
    }
    const project = await Project.create({
        title,
        description,
        gitRepoLink,
        projectLink,
        technologies,
        stack,
        deployed,
        projectBanner:{
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        }
    });
    res.status(201).json({
        success: true,
        message: 'New Project has been Added Successfully!',
        project,
    })

})
export const deletProject = catchAsyncErrors(async(req,res, next) => {
    const {id} = req.params;
    const project = await Project.findById(id);
    if(!project) {
        return next(new ErrorHandler('Project Not Found!', 404))
    }
        const projectBannerId = project.projectBanner.public_id;
        await cloudinary.uploader.destroy(projectBannerId)
        await project.deleteOne();
        res.status(200).json({
            success: true,
            message: 'Project has been deleted succesfully!',
        });
})
export const updateProject = catchAsyncErrors(async(req,res, next) => {
    const newProjectData = {
        title: req.body.title,
        description: req.body.description,
        gitRepoLink: req.body.gitRepoLink,
        projectLink: req.body.projectLink,
        technologies: req.body.technologies,
        stack: req.body.stack,
        deployed: req.body.deployed,
    }
    if(req.files && req.files.projectBanner) {
        const projectBanner = req.files.projectBanner;
        const project = await Project.findById(req.params.id);
        const projectBannerId = project.projectBanner.public_id;
        await cloudinary.uploader.destroy(projectBannerId);
        const cloudinaryResponse = await cloudinary.uploader.upload(projectBanner.tempFilePath,{folder: "PROJECT_IMAGES"});
        
        newProjectData.projectBanner = {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        };
    }
    const project = await Project.findByIdAndUpdate(req.params.id, newProjectData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        message: 'Project has been updated Successfully!',
        project,
    })
})
export const getAllProjects = catchAsyncErrors(async(req,res, next) => {
    const projects = await Project.find();
    res.status(200).json({
        success: true,
        projects,
    })
})
export const getSingleProject = catchAsyncErrors(async(req,res, next) => {
    const {id} = req.params;
    const project = await Project.findById(id);
    if(!project) {
        return next(new ErrorHandler('Project Not Found!', 404))

    }
    res.status(200).json({
        success: true,
        project,
    })
})