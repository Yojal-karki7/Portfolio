
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import SpecialLoadingButton from './SpecialLoadingButton'
import { clearAllUserErrors, getUser, resetProfile, updateProfile } from '@/store/slices/userSlice'
import { toast } from 'react-toastify'

const UpdateProfile = () => {
  const {user, loading, error, isUpdated, message} = useSelector(state => state.user)
  const [fullName, setFullName] = useState(user.fullName)
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState(user.phone)
  const [aboutMe, setAboutMe] = useState(user.aboutMe)
  const [portfolioURL, setPortfolioURL] = useState(user.portfolioURL)
  const [linkedInURL, setLinkedInURL] = useState(user && user.linkedInURL === "undefined" ? '' : user.linkedInURL)
  const [githubURL, setGithubURL] = useState(user && user.githubURL === "undefined" ? '' : user.githubURL)
  const [instagramURL, setInstagramURL] = useState(user && user.instagramURL === "undefined" ? '' : user.instagramURL)
  const [twitterURL, setTwitterURL] = useState(user && user.twitterURL === "undefined" ? '' : user.twitterURL)
  const [facebookURL, setFacebookURL] = useState(user && user.facebookURL === "undefined" ? '' : user.facebookURL)
  const [avatar, setAvatar] = useState(user && user.avatar && user.avatar.url)
  const [avatarPreview, setAvatarPreview] = useState(user && user.avatar && user.avatar.url)
  const [resume, setResume] = useState(user && user.resume && user.resume.url)
  const [resumePreview, setResumePreview] = useState(user && user.resume && user.resume.url)
  const dispatch = useDispatch()

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = ()=>{
      setAvatarPreview(reader.result)
      setAvatar(file)
    }
  }
  const resumeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = ()=>{
      setResumePreview(reader.result)
      setResume(file)
    }
  }

  const handleUpdateProfile = ()=>{
    const formData = new FormData();
    formData.append("fullName", fullName)
    formData.append("email", email)
    formData.append("phone", phone)
    formData.append("portfolioURL", portfolioURL)
    formData.append("aboutMe", aboutMe)
    formData.append("linkedInURL", linkedInURL)
    formData.append("githubURL", githubURL)
    formData.append("instagramURL", instagramURL)
    formData.append("facebookURL", facebookURL)
    formData.append("twitterURL", twitterURL)
    formData.append("avatar", avatar)
    formData.append("resume", resume)

    dispatch(updateProfile(formData))
  };

  useEffect(()=>{
    if(error) {
      toast.error(error)
      dispatch(clearAllUserErrors())
    }
    if(isUpdated) {
      dispatch(getUser())
      dispatch(resetProfile())
    }
    if(message) {
      toast.success(message)
    }
  },[dispatch, loading, error, isUpdated])
  return (
    <div className='w-full h-full'>
          <div className="">
            <div className="grid w-[100%] gap-6">
              <div className="grid gap-2">
                <h1 className='text-3xl font-bold'>Update Profile</h1>
                <p className='mb-5'>Update Your Profile</p>
              </div>
            </div>
            <div className="grid gap-6">
              <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5">
                <div className="grid gap-2 w-full sm:w-72">
                  <Label>Profile Image</Label>
                  <img src={avatarPreview ? `${avatarPreview}` : 'https://www.vecteezy.com/free-vector/profile-pic'} alt="avatar"  className='w-full h-auto sm:w-72 sm:h-72 rounded-2xl'/>
                  <div className="relative">
                  <Input
                    type="file" 
                    className='avatar-update-btn' 
                    onChange={avatarHandler}/>
                  </div>
                </div>
                <div className="grid gap-2 w-full sm:w-72">
                  <Label>Resume</Label>
                  <Link to={user && user.resume && user.resume.url} target='_blank'>
                  <img src={resumePreview ? `${resumePreview}` : 'https://www.vecteezy.com/free-vector/profile-pic'} alt="avatar"  className='w-full h-auto sm:w-72 sm:h-72 rounded-2xl'/>
                  </Link>
                  <div className="relative">
                  <Input
                    type="file" 
                    className='avatar-update-btn'
                    onChange={resumeHandler}/>
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Full Name</Label>
                <Input type="text" placeholder='Your Full Name' value={fullName} onChange={(e)=>setFullName(e.target.value)} className='px-3 py-2'/>
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className='px-3 py-2'/>
              </div>
              <div className="grid gap-2">
                <Label>Phone</Label>
                <Input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} className='px-3 py-2'/>
              </div>
              <div className="grid gap-2">
                <Label>About Me</Label>
                <Textarea placeholder='About Me' value={aboutMe} onChange={(e)=>setAboutMe(e.target.value)}className='px-3 py-2'/>
              </div>
              <div className="grid gap-2">
                <Label>Portfolio Url</Label>
                <Input placeholder='Your Portfolio Url' value={portfolioURL} onChange={(e)=>setPortfolioURL(e.target.value)} className='px-3 py-2'/>
              </div>
              <div className="grid gap-2">
                <Label>Github Url</Label>
                <Input placeholder='Your Github Url' value={githubURL} onChange={(e)=>setGithubURL(e.target.value)} className='px-3 py-2'/>
              </div>
              <div className="grid gap-2">
                <Label>LinkedIn Url</Label>
                <Input placeholder='Your LinkedIn Url' value={linkedInURL} onChange={(e)=>setLinkedInURL(e.target.value)} className='px-3 py-2'/>
              </div>
              <div className="grid gap-2">
                <Label>Facebook Url</Label>
                <Input placeholder='Your Facebook Url' value={facebookURL} onChange={(e)=>setFacebookURL(e.target.value)} className='px-3 py-2'/>
              </div>
              <div className="grid gap-2">
                <Label>Twitter Url</Label>
                <Input placeholder='Your Twitter Url' value={twitterURL} onChange={(e)=>setTwitterURL(e.target.value)} className='px-3 py-2'/>
              </div>
              <div className="grid gap-2">
                <Label>Instagram Url</Label>
                <Input placeholder='Your Instagram Url' value={instagramURL} onChange={(e)=>setInstagramURL(e.target.value)} className='px-3 py-2'/>
              </div>
              <div className="grid gap-2">
                {
                !loading ? (
                <Button className='w-full' onClick={handleUpdateProfile}>Update Profile</Button> 
                ) : (
                <SpecialLoadingButton content={'Updating'}/> 
              )
                }
              </div>
            </div>

          </div>
        </div>
  )
}

export default UpdateProfile
