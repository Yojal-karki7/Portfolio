import axios from 'axios'
import React, { useEffect, useState } from 'react'

const About = () => {
  const [user, setUser] = useState({})

  useEffect(()=>{
    const getMyProfile = async() => {
      const response = await axios.get('https://portfolio-backend-flax-sigma.vercel.app/api/v1/user/me/portfolio', {withCredentials: true});
      setUser(response.data.user);
      console.log(response.data.user);
    }
    getMyProfile()
  },[])
  return (
    <div className='w-full flex flex-col overflow-x-hidden'>
      <div className="relative">
        <h1 className='flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold '
        style={{background: 'hsl(222.2 84% 4.9%)'}}
        >
          ABOUT
          <span className='text-tubeLight-effect font-extrabold'>ME</span>
        </h1>
        <span className='absolute w-full h-1 top-7 smtop7
         md:top-8 lg:top-11 z-[-1] bg-slate-200'></span>
      </div>
      <div className="">
        <div className="grid md:grid-cols-2 my-8 sm:my-20 gap-14">
          <div className="flex justify-center items-center">
            <img src={user.avatar && user.avatar.url} alt={user.fullName}  className='bg-white p-2 sm:p-4 rotate-[25deg] h-[240px] sm:h-[340px] md:h=[350px] lg:h-[450px]'/>
          </div>
          <div className="flex justify-center flex-col tracking-[1px] text-xl gap-5">
            <p>My name is Yojal. I will graduate in Computer Systems Engineering from University of Sunderland around 2027.I work as a web developer and freelancer.Always eager to learn efficiently and effectively.</p>
            <p>I have interest not only in technology but also in movies, anime, video game. I excel in meeting deadlines for my work.</p>
          </div>
        </div>
        <p className='tracking-[1px] text-xl'>
          My dedication and preseverance in timely delivery of work are integral to me. I maintain the courage to face my challanges for extented periods.
        </p>
      </div>
    </div>
  )
}

export default About
