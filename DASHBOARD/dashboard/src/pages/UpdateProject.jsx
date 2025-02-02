import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { clearAllProjectSliceErrors, getAllProjects, resetProjectSLice, updateProject } from '@/store/slices/projectSlice'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import SpecialLoadingButton from './subComponent/SpecialLoadingButton'

const UpdateProject = () => {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [projectBanner, setProjectBanner] = useState('')
  const [gitRepoLink, setGitRepoLink] = useState('')
  const [projectLink, setProjectLink] = useState('')
  const [technologies, setTechnologies] = useState('')
  const [projectBannerPreview, setProjectBannerPreview] = useState('')
  const [stack, setStack] = useState('')
  const [deployed, setDeployed] = useState('')

  const {error, message, loading} = useSelector(state => state.project)
  const dispatch = useDispatch()
  const {id} = useParams()

  const handleProjectbannerPreview = (e)=>{
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = ()=>{
      setProjectBanner(file)
      setProjectBannerPreview(reader.result)
    }
  }

  useEffect(()=>{
    const getProject = async()=>{
      await axios.get(`http://localhost:4000/api/v1/project/get/${id}`, {withCredentials: true}).then((response)=>{
        setTitle(response.data.project.title)
        setDescription(response.data.project.description)
        setStack(response.data.project.stack)
        setGitRepoLink(response.data.project.gitRepoLink)
        setProjectLink(response.data.project.projectLink)
        setProjectBanner(response.data.project.projectBanner && response.data.project.projectBanner.url)
        setProjectBannerPreview(response.data.project.projectBanner && response.data.project.projectBanner.url)
        setTechnologies(response.data.project.technologies)
        setDeployed(response.data.project.deployed)
    
      }).catch(error=>{
        toast.error(error.response.data.message)
      })
    }
    getProject();

    if(error) {
      toast.error(error)
      dispatch(clearAllProjectSliceErrors())
    }
    if(message) {
      toast.success(message)
      dispatch(resetProjectSLice())
      dispatch(getAllProjects())
      setDeployed('')
      setTitle('')
      setProjectLink('')
      setDescription('')
      setGitRepoLink('')
      setStack('')
      setProjectBannerPreview('')
      setTechnologies('')
    }
  }, [id,message,loading,error])

  const handleUpdateProject = (e)=>{
    e.preventDefault()
    const formData = new FormData();
      formData.append('title', title)
      formData.append('description', description)
        formData.append('gitRepoLink', gitRepoLink)
        formData.append('projectLink', projectLink)
        formData.append('technologies', technologies)
        formData.append('stack', stack)
        formData.append('deployed', deployed)
        formData.append('projectBanner', projectBanner)
        dispatch(updateProject(id, formData))
  }

  return (
    <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
        <form onSubmit={handleUpdateProject} className='w-[100%] px-5 md:w-[1000px]'>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
            <div className="flex justify-between items-center">

            <h2 className='font-semibold leading-7 text-gray-900 text-3xl text-center'>
              Update Project</h2>
              <Link to={'/'}>Return to Dashboard</Link>
            </div>
            <div className="mt-10 flex flex-col gap-6">
              <div className="w-full sm:col-span-4">
                <img src={
                  projectBannerPreview ? projectBannerPreview : 'https://in.pinterest.com/pin/mern-stack-development-services--744853225901119265/'
                } alt="projectBanner" className='mt-10 py-3 max-h-[620px] w-full object-top' />
                <div className="relative">
                  <input type="file"
                  onChange={handleProjectbannerPreview}
                  className='avatar-update-btn mt-4 w-full'  />
                </div>
              </div>
                <div className="w-full sm:col-span-4">
                  <Label className='block text-sm font-medium leading-6 text-gray-900'>Title</Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input type='text' placeholder='Project Title' value={title} onChange={(e)=>setTitle(e.target.value)} className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'/>
                    </div>
                  </div>
                </div>
                <div className="w-full sm:col-span-4">
                  <Label className='block text-sm font-medium leading-6 text-gray-900'>Description</Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <Textarea  placeholder='Feature 1. feature2. feature3....' value={description} onChange={(e)=>setDescription(e.target.value)} className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'/>
                    </div>
                  </div>
                </div>


                <div className="w-full sm:col-span-4">
                  <Label className='block text-sm font-medium leading-6 text-gray-900'>Technologies Used In this Project</Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <Textarea type='text' placeholder='HTML, CSS, JavaScript, React.Js' value={technologies} onChange={(e)=>setTechnologies(e.target.value)} />
                    </div>
                  </div>
                </div>

                <div className="w-full sm:col-span-4">
                  <Label className='block text-sm font-medium leading-6 text-gray-900'>Stack</Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <Select value={stack} onValueChange={(selectedValue)=>setStack(selectedValue)}>
                        <SelectTrigger>
                          <SelectValue placeholder='Select Project Stack'/>
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value='Full Stack'>Full Stack</SelectItem>
                        <SelectItem value='MERN Stack'>MERN Stack</SelectItem>
                        <SelectItem value='MEAN Stack'>MEAN Stack</SelectItem>
                        <SelectItem value='MEVN Stack'>MEVN Stack</SelectItem>
                        <SelectItem value='NEXT.JS'>NEXT.JS</SelectItem>
                        <SelectItem value='REACT.JS'>REACT.JS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="w-full sm:col-span-4">
                  <Label className='block text-sm font-medium leading-6 text-gray-900'>Github Repository Link</Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <Input type='text' placeholder='Paste Your Github Repository Link Here' value={gitRepoLink} onChange={(e)=>setGitRepoLink(e.target.value)} className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'/>
                    </div>
                  </div>
                </div>

                <div className="w-full sm:col-span-4">
                  <Label className='block text-sm font-medium leading-6 text-gray-900'>Project Link</Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <Input type='text' placeholder='Paste Your Deployed Project Link Here' value={projectLink} onChange={(e)=>setProjectLink(e.target.value)} className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'/>
                    </div>
                  </div>
                </div>

                <div className="w-full sm:col-span-4">
                  <Label className='block text-sm font-medium leading-6 text-gray-900'>
                    Deployed
                  </Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <Select value={deployed} onValueChange={(selectedValue)=>setDeployed(selectedValue)}>
                        <SelectTrigger>
                          <SelectValue placeholder='Is this project deployed?'/>
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value='Yes'>Yes!</SelectItem>
                        <SelectItem value='No'>No!</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                  </div>
                </div>

            </div>
            </div>
            
          </div>
          <div className="flex justify-center w-full items-center">
          {
              loading ? <SpecialLoadingButton width={'w-56'} content={'Updating...'}/> : <Button
              onClick={handleUpdateProject} className='w-56 mt-4 mb-6'
              >Update Project</Button>
            }
          </div>
        </form>
      </div>
  )
}

export default UpdateProject

