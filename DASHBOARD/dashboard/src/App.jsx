import React, { useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import ForgotPasswords from './pages/ForgotPasswords'
import ResetPassword from './pages/ResetPassword'
import ManageSkills from './pages/ManageSkills'
import ManageTimeline from './pages/ManageTimeline'
import ManageProjects from './pages/ManageProjects'
import ViewProjects from './pages/ViewProjects'
import UpdateProject from './pages/UpdateProject'
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux'
import { getUser } from './store/slices/userSlice'
import './App.css'
import { getAllMessages } from './store/slices/messageSlice'
import { getAllTimeline } from './store/slices/timelineSlice'
import { getAllSkills } from './store/slices/skillSlice'
import { getAllSoftwareApplication } from './store/slices/softwareAplplicationSlice'
import { getAllProjects } from './store/slices/projectSlice'

const App = () => {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getUser())
    dispatch(getAllMessages())
    dispatch(getAllTimeline())
    dispatch(getAllSkills())
    dispatch(getAllSoftwareApplication())
    dispatch(getAllProjects())
  },[])
  return (
    <Router>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/password/forgot' element={<ForgotPasswords />}/>
      <Route path='/password/reset/:token' element={<ResetPassword />}/>
      <Route path='/manage/skills' element={<ManageSkills />}/>
      <Route path='/manage/timeline' element={<ManageTimeline />}/>
      <Route path='/manage/projects' element={<ManageProjects />}/>
      <Route path='/view/project/:id' element={<ViewProjects />}/>
      <Route path='/update/project/:id' element={<UpdateProject/>}/>
      </Routes>
      <ToastContainer position='bottom-right' theme='dark'/>
    </Router>
  )
}

export default App
