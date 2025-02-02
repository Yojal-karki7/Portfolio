import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const ViewProjects = () => {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [projectBanner, setProjectBanner] = useState('')
  const [gitRepoLink, setGitRepoLink] = useState('')
  const [projectLink, setProjectLink] = useState('')
  const [technologies, setTechnologies] = useState('')
  const [stack, setStack] = useState('')
  const [deployed, setDeployed] = useState('')

  const {id} = useParams()

  useEffect(()=>{
    const getProject = async()=>{
      await axios.get(`http://localhost:4000/api/v1/project/get/${id}`, {withCredentials: true}).then((response)=>{
        console.log(response);
        setTitle(response.data.project.title)
        setDescription(response.data.project.description)
        setStack(response.data.project.stack)
        setGitRepoLink(response.data.project.gitRepoLink)
        setProjectLink(response.data.project.projectLink)
        setProjectBanner(response.data.project.projectBanner.url)
        setTechnologies(response.data.project.technologies)
        setDeployed(response.data.project.deployed)
      }).catch(error=>{
        toast.error(error.response.data.message)
      })
    }
    getProject();
  }, [id])

  const descriptionInListFormat = description.split('. ')
  const technologiesInListFormat = technologies.split('. ')

  return (
    <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
        <div className='w-[100%] px-5 md:w-[1000px]'>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 flex flex-col gap-6">
                <div className="w-full sm:col-span-4">
                  <h1 className='text-2xl font-bold mb-4'>
                  {title}
                  </h1>
                  <img src={projectBanner ? projectBanner : 'https://in.pinterest.com/pin/mern-stack-development-services--744853225901119265/'} alt={title} className='mt-10 py-3 max-h-[620px] w-full object-top'/>
                </div>

                <div className="w-full sm:col-span-4">
                  <p className='text-2xl mb-2'>Description:</p>
                  <ul className='list-disc'>
                    {
                      descriptionInListFormat.map((item, index)=>{
                        return (
                          <li className='list-none' key={index}>{item}</li>
                        )}
                      )
                    }
                  </ul>
                </div>
                <div className="w-full sm:col-span-4">
                  <p className='text-2xl mb-2'>Technologies:</p>
                  <ul className='list-disc'>
                    {
                      technologiesInListFormat.map((item, index)=>{
                        return (
                          <li key={index}>{item}</li>
                        )}
                      )
                    }
                  </ul>
                </div>
                <div className="w-full sm:col-span-4">
                  <p className='text-2xl mb-2'>Stack:</p>
                  <p>{stack}</p>
                </div>
                <div className="w-full sm:col-span-4">
                  <p className='text-2xl mb-2'>Deployed:</p>
                  <p>{deployed}</p>
            </div>
                <div className="w-full sm:col-span-4">
                  <p className='text-2xl mb-2'>Github Repository Link:</p>
                  <Link to={gitRepoLink} target='_blank' className='text-sky-700'>{gitRepoLink}</Link>
                </div>
                <div className="w-full sm:col-span-4">
                  <p className='text-2xl mb-2'>Project Link:</p>
                  <Link to={projectLink ? projectLink : '/'} target='_blank' className='text-sky-700'>{projectLink ? projectLink : 'Still not deployed'}</Link>
                </div>
                
            </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ViewProjects
