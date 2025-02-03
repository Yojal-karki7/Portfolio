import { Button } from '@/components/ui/button';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [viewAll, setViewAll] = useState(false)
  useEffect(() => {
    const getMyProjects = async () => {
      const { data } = await axios.get(
        "https://portfolio-backend-flax-sigma.vercel.app/api/v1/project/getall",
        { withCredentials: true }
      );
      setProjects(data.projects);
      console.log(data.projects);
    };
    getMyProjects();
  }, []);
  return (
    <div>
      <div className="relative mb-12">
        <h1 className=' hidden sm:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold '
        style={{background: 'hsl(222.2 84% 4.9%)'}}
        >
          My
          <span className='text-tubeLight-effect font-extrabold'>Portfolio</span>
        </h1>
        <h1 className='flex sm:hidden gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold '
        style={{background: 'hsl(222.2 84% 4.9%)'}}
        >
          My
          <span className='text-tubeLight-effect font-extrabold'>Work</span>
        </h1>
        <span className='absolute w-full h-1 top-7 smtop7
         md:top-8 lg:top-11 z-[-1] bg-slate-200'></span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {
          viewAll ? projects && projects.map((element)=>{
            return (
              <Link to={`/project/${element._id}`} key={element._id}>
              <img src={element.projectBanner && element.projectBanner.url} alt='project banner' /></Link>
            )
          }) : projects && projects.slice(0,6).map((element)=>{
            return (
              <Link to={`/project/${element._id}`} key={element._id}>
              <img src={element.projectBanner && element.projectBanner.url} alt='project banner' /></Link>
            )
          })}
      </div>
      {
        projects && projects.length > 6 && (
          <div className="w-full text-center my-9">
            <Button className='w-52' onClick={()=>setViewAll(!viewAll)}>
              {viewAll ? 'show Less' : 'Show More'}
            </Button>
          </div>
        )
      }
    </div>
  )
}

export default Portfolio
