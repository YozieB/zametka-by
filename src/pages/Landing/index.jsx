import React, { useEffect, useState } from 'react'
import { getUserSession, googleLogin } from '../../api/api.js'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../store/store.js'
export const Landing = props => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const boardFromLocal = localStorage.getItem('possibleBoard')
    ? `board/${localStorage.getItem('possibleBoard')}`
    : 'profile'
  const loginWithGoogle = () => {
    googleLogin(boardFromLocal)
  }

  useEffect(() => {
    getUserSession()
      .then(() => {
        navigate('/profile')
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <>
      {isLoading ? (
        <div></div>
      ) : (
        <section className="h-[100%] p-[25px] bg-[#ECEDF0] w-[100%]">
          <div className="h-[100%] flex flex-col items-center justify-center gap-y-[10px] bg-[#fff] rounded-[12px]">
            <h1 className="font-bold text-2xl">Welcome</h1>
            <p className="mb-2 text-center">
              To use our app, you have to authorize first
            </p>
            <div className="flex items-center justify-center">
              <button
                onClick={loginWithGoogle}
                className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-500 hover:shadow transition duration-150"
              >
                <img
                  className="w-6 h-6"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  loading="lazy"
                  alt="google logo"
                />
                <span>Login with Google</span>
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
