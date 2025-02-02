import { clearAllForgotPasswordErrors, forgotPassword } from '@/store/slices/forgotResetPasswordSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SpecialLoadingButton from './subComponent/SpecialLoadingButton';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ForgotPasswords = () => {
  const [email, setEmail] = useState('')
  const {loading, error, message} = useSelector(state=> state.forgotPassword);
  const {isAuthenticated} = useSelector(state=> state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate()

  const handleForgotPassword = ()=>{
    dispatch(forgotPassword(email))
  }

  useEffect(()=>{
    if(error) {
      toast.error(error)
      dispatch(clearAllForgotPasswordErrors())
    }
    if(isAuthenticated) {
      navigateTo('/')
    }
    if(message !== null) {
      toast.success(message)
    }
  }, [dispatch, isAuthenticated, error, loading])
  return (
    <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className=" min-h-[100vh] flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Forgot Password</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to request for reset password
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
                className='px-3 py-2'
              />
            </div>
                <Link
                  to="/login"
                  className="ml-auto inline-block text-sm underline"
                >
                  Remember your password?
                </Link>
            {
              loading ? <SpecialLoadingButton content={"Requesting..."}/> : <Button type="submit" className='w-full' onClick={handleForgotPassword}>
              Request For Reset Password
            </Button>
            }
            
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center bg-muted">
        <img src='/forgot.png' alt='Image' />
      </div>
    </div>
  )
}

export default ForgotPasswords
