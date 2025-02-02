import { Button } from '@/components/ui/button'
import axios from 'axios'
import { ExternalLink, Github, Linkedin } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Typewriter } from 'react-simple-typewriter'

const Hero = () => {
  const [user, setUser] = useState({})

  useEffect(()=>{
    const getMyProfile = async() => {
      const response = await axios.get('http://localhost:4000/api/v1/user/me/portfolio', {withCredentials: true});
      setUser(response.data.user);
    }
    getMyProfile()
  },[])
  return (
    <div className='w-full'>
      <div className="flex items-center gap-2 mb-2">
        <span className='bg-green-400 rounded-full h-2 w-2'></span>
        <p>Online</p>
      </div>
      <h1 className='overflow-x-hidden text-[1.3rem] sm:text-[1.7rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[2px] mb-4'>
        Hey, I'm {user.fullName}.
      </h1>
      <h1 className='text-tubeLight-effect overflow-x-hidden text-[1.3rem] sm:text-[1.7rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[15pxpx]'>
        <Typewriter words={["FULLSTACK DEVELOPER.", "STUDENT."]} loop={50} cursor typeSpeed={70} deleteSpeed={70} delaySpeed={100}/>
      </h1>
      <div className="w-fit px-5 py-2 bg-slate-50 rounded-[20px] flex gap-5 items-center mt-4 md:mt-8 lg:mt-10">
        <Link to={user.LinkedinURL} target='_blank'>
        <img src={'/linkedin.png'} alt="" className='text-blue-500 w-7 h-7'/></Link>
        <Link to={user.instagramURL} target='_blank' className='text-blur-500 w-7 h-7'>
        <img src={'/instagram.png'} alt="" className='text-pink-500 w-7 h-7'/></Link>
        <Link to={user.githubURL} target='_blank'><img src={'/github-sign.png'} alt="" className='text-blur-500 w-7 h-7'/></Link>
        <Link to={user.facebookURL} target='_blank'><img src={'/facebook.png'} alt="" className='text-blur-500 w-7 h-7'/></Link>
      </div>
      <div className="mt-4 md:mt-8 lg:mt-10 flex gap-3">
        <Link to={user.githubURL} target='_blank'>
        <Button className='rounded-[30px] flex items-center gap-2 flex-row'>
          <span>
            <Github />
          </span>
          <span>
            Github
          </span>
          </Button></Link>
        <Link>
        <Button className='rounded-[30px] flex items-center gap-2 flex-row'>
          <span>
            <ExternalLink />
          </span>
          <span>Resume</span>
          </Button></Link>
      </div>
      <p className='mt-8 text-xl tracking-[2px]'>{user.aboutMe}</p>
    </div>
  )
}

export default Hero
