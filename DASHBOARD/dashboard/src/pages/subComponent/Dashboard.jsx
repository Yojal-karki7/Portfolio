import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { clearAllApplicationSliceErrors, deleteSoftwareApplication, getAllSoftwareApplication, resetSoftwareApplicationSlice } from '@/store/slices/softwareAplplicationSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import SpecialLoadingButton from './SpecialLoadingButton'

const Dashboard = () => {
  const {user} = useSelector(state=>state.user)
  const {projects} = useSelector(state=>state.project)
  const {skills} = useSelector(state=>state.skill)
  const {softwareApplications, error, message, loading} = useSelector(state=>state.application)
  const {timelines} = useSelector(state=>state.timeline);
  const [appId, setAppId] = useState('')
  const dispatch = useDispatch()

  const handleDeleteSoftwareApplication = (id)=>{
    setAppId(id)
    dispatch(deleteSoftwareApplication(id))

  }

  useEffect(()=>{
    if(error) {
      toast.error(error)
      dispatch(clearAllApplicationSliceErrors())
    }
    if(message) {
      toast.success(message)
      dispatch(resetSoftwareApplicationSlice())
      dispatch(getAllSoftwareApplication())
    }
  }, [dispatch, loading, message, error ])
  return (
    <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
      <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2'>
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card className='sm:col-span-2'>
              <CardHeader className='pb-3'>
                <CardDescription className='max-w-lg text-balance leading-relaxed'>{user.aboutMe}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link to={user.portfolioURL && user.portfolioURL} target='_blank'>
                <Button>Visit Portfolio</Button>
                </Link>
              </CardFooter>
            </Card>
            <Card className='flex flex-col justify-center'>
              <CardHeader className='pb-2'>
                <CardTitle>Projects Completed</CardTitle>
                <CardTitle className=''>{projects && projects.length}</CardTitle>
              </CardHeader>
              <CardFooter>
                <Link to={'/manage/projects'}>
                <Button>Manage Projects</Button>
                </Link>
              </CardFooter>
            </Card>
            <Card className='flex flex-col justify-center'>
              <CardHeader className='pb-2'>
                <CardTitle>Skills</CardTitle>
                <CardTitle className=''>{skills && skills.length}</CardTitle>
              </CardHeader>
              <CardFooter>
                <Link to={'/manage/skills'}>
                <Button>Manage Skills</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
          <Tabs>
            <TabsContent>
              <Card>
                <CardHeader className='px-7'>
                  <CardTitle>Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead className='hidden md:table-cell'>Stack</TableHead>
                        <TableHead className='hidden md:table-cell'>Deployed</TableHead>
                        <TableHead className='md:table-cell'>Update</TableHead>
                        <TableHead className='text-right'>Visit</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {
                        projects && projects.length > 0 ? (
                          projects.map((element)=>{
                            return (
                              <TableRow className='bg-accent' key={element._id}>
                                <TableCell>
                                  <div className="font-semibold">{element.title}</div>
                                </TableCell>
                                <TableCell className='hidden md:table-cell'>{element.stack}</TableCell>
                                <TableCell className='hidden md:table-cell'>{element.deployed}</TableCell>
                                <TableCell><Link to={`/update/project/${element._id}`}>
                                <Button>Update</Button></Link></TableCell>
                                <TableCell className='text-right'><Link target='_blank' to={element.projectLink ? `${element.projectLink}` : ''}>
                                <Button>Visit</Button></Link></TableCell>
                              </TableRow>
                            )
                          }) ) : <TableRow>
                            <TableCell className='text-3xl overflow-y-hidden'>
                              You have not added any project yet!
                            </TableCell>
                          </TableRow> }
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <Tabs>
            <TabsContent>
              <Card>
                <CardHeader className='px-7 gap-3'>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent className='grid sm:grid-cols-2 gap-4'>
                          {
                            skills && skills.length > 0 ? (
                              skills.map((element) => {
                                return (
                                  <Card key={element._id} >
                                    <CardHeader>{element.title}</CardHeader>
                                    <CardFooter>
                                      <Progress value={element.proficiency}></Progress>
                                    </CardFooter>
                                  </Card>
                                )
                              })
                            ) :
                             <p className='text-3xl overflow-y-hidden'>
                            You have not added any skills yet!
                          </p>
                          }
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <Tabs>
            <TabsContent className='grid min-[1050px]:grid-cols-2 gap-4'>
              <Card>
                <CardHeader className='px-7'>
                  <CardTitle>Software Application</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          Name
                        </TableHead>
                        <TableHead className='md:table-cell'>
                          Icons
                        </TableHead>
                        <TableHead className='md:table-cell'>
                          Action
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {
                        softwareApplications && softwareApplications.length > 0 ? (
                          softwareApplications.map((element)=>{
                            return (
                              <TableRow className='bg-accent' key={element._id}>
                                <TableCell>{element.name}</TableCell>
                                <TableCell><img className='w-7 h-7' src={element.svg && element.svg.url} alt={element.name} /></TableCell>
                                <TableCell>
                                  {
                                    loading && appId === element._id ? (
                                      <SpecialLoadingButton content={'Deleting...'} width={'w-fit'}/>
                                    ) : <Button onClick={()=>handleDeleteSoftwareApplication(element._id)}>Delete</Button>
                                  }
                                  
                                  </TableCell>
                              </TableRow>
                            )
                          })
                        ) : <TableCell className='text-3xl overflow-y-hidden'>
                        You have not added any application yet!
                      </TableCell>
                      }
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='px-7 flex items-center justify-between flex-row'>
                  <CardTitle>Timeline</CardTitle>
                  <Link to={'/manage/timeline'}>
                  <Button>Manage Timeline</Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>From</TableHead>
                        <TableHead>To</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {
                        timelines && timelines.length > 0 ? (
                          timelines.map((element)=>{
                            return (
                              <TableRow className='bg-accent' key={element._id}>
                                <TableCell className='font-medium'>{element.title}</TableCell>
                                <TableCell className='md:table-cell'>{element.timeline.from}</TableCell>
                                <TableCell className='md:table-caption text-right'>
                                    {element.timeline.to ? `${element.timeline.to}` : 'Present'}
                                </TableCell>
                              </TableRow>
                            )
                          })
                        ) : <TableCell className='text-3xl overflow-y-hidden'>
                        You have not added any timeline yet!
                      </TableCell>
                      }
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
