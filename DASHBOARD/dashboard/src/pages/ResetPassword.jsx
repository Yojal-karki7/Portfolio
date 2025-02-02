import React, { useEffect, useState } from 'react'
import SpecialLoadingButton from './subComponent/SpecialLoadingButton'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearAllForgotPasswordErrors, resetPassword } from '@/store/slices/forgotResetPasswordSlice'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button'
import { getUser } from '@/store/slices/userSlice'

const ResetPassword = () => {
  const {token} = useParams();
  
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const {loading, error, message} = useSelector(state=> state.forgotPassword)
  const {isAuthenticated} = useSelector(state=> state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleResetPassword = () => {
    dispatch(resetPassword(token, password, confirmPassword))
  }

  useEffect(()=>{
      if (error) {
        toast.error(error)
        dispatch(clearAllForgotPasswordErrors())
      }
      if(isAuthenticated) {
        navigateTo('/')
      }
      if(message !== null) {
        toast.success(message)
        dispatch(getUser())
      }
    }, [dispatch, isAuthenticated, error, loading])
  return (
    <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className=" min-h-[100vh] flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Reset Password</h1>
            <p className="text-balance text-muted-foreground">
              Set a new Password
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>Confirm Password</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {
              loading ? <SpecialLoadingButton content={"Resetting Password"}/> : <Button type="submit" className='w-full' onClick={handleResetPassword}>
              Reset Password
            </Button>
            }
            
          </div>
          
        </div>
      </div>
      <div className="flex justify-center items-center bg-muted">
        <img src="/reset.png" alt="login" />
      </div>
    </div>
  )
}

export default ResetPassword
