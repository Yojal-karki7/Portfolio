import express from 'express'
import { isAuthenticated } from '../middlewares/auth.js'
import { addSkills, deleteSkills, getAllSkills, updateSkills } from '../controllers/skillsController.js'

const router = express.Router()

router.post('/add',isAuthenticated, addSkills)
router.delete('/delete/:id',isAuthenticated, deleteSkills)
router.get('/getall', getAllSkills)
router.put('/update/:id',isAuthenticated, updateSkills)

export default router