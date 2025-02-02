import express from 'express'
import { isAuthenticated } from '../middlewares/auth.js'
import { addNewProject, deletProject, getAllProjects, getSingleProject, updateProject } from '../controllers/projectController.js'

const router = express.Router()

router.post('/add',isAuthenticated, addNewProject)
router.delete('/delete/:id',isAuthenticated, deletProject)
router.put('/update/:id',isAuthenticated, updateProject)
router.get('/getall', getAllProjects)
router.get('/get/:id', getSingleProject)

export default router