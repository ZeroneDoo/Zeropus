import React from 'react'
import { useLogin } from '../context/AuthProvider.tsx'
import { useNavigate } from 'react-router-dom'

const AuthGuard = ({ children }) => {
    const { isLogin } = useLogin()
    const navigate = useNavigate()
  return (
    <>{isLogin() ? (
      navigate(-1)
    ): (
      children
    )}</>
  )
}

export default AuthGuard