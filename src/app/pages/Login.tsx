import React, { useRef, useState } from 'react'
import Header from '../components/Header.tsx'
import { Link, useNavigate } from 'react-router-dom'
import { authenticate } from '../helper/Api.tsx'
import { toast } from 'react-toastify'
import Loader from '../components/Loader.tsx'
import { storeData } from '../helper/LocalStorage.tsx'

const Login = () => {
  const navigate = useNavigate()
  const [onFetching, setOnFetching] = useState(false)

  const handleSubmit = async (e) => {
    try {
      setOnFetching(true)
      e.preventDefault()
      
      const data = {
        email: e.target.email.value,
        password: e.target.password.value,
        device: "web"
      }
      
      const response = await authenticate("/auth/login", "POST", {}, JSON.stringify(data))

      storeData("user", response)
      storeData("token", response.token)

      if(response) {
        navigate(-1)
      }

      setOnFetching(false)
    } catch (error) {
      console.log(error)
      toast.error("Failed to login!");
      setOnFetching(false)
    }

  }
  return (
    <div className="font-nunito">
        <Header />
        {/* content */}
        <div className="flex justify-between">
          {/* left */}
            <div className='w-[35vw] h-screen overflow-hidden relative sm:block hidden'>
              <div className='absolute bg-black/70 w-screen h-screen'></div>
              <img src="./hero_book.png" alt="" className=''/>
            </div>
          {/* right */}
            <div className='sm:w-[65vw] flex items-center justify-center w-full h-screen relative overflow-hidden'>
              {/* element */}
              <div className='rounded-tl-full w-32 h-[30vh] bg-red-200 absolute bottom-0 right-0'></div>
              <div className='rounded-full w-6 h-6 bg-red-700 absolute bottom-[35vh] right-[5vh]'></div>
              <div className='sm:w-[15vw] sm:h-[15vw] w-[30vw] h-[30vw] bg-blue-200 absolute top-0 -left-10 rotate-45'></div>
              <div className='sm:top-[20vw] w-6 h-6 top-[40vw] bg-blue-600 absolute left-[20vh]'></div>

              {/* form */}
              <div className="sm:w-[50%] w-[80%] mt-[10vh] p-4 bg-white border border-[#e3e6f0] rounded-lg shadow sm:p-6 md:p-8 text-left z-10">
                  <form className="space-y-6" onSubmit={handleSubmit}>
                      <h5 className="text-xl font-bold text-gray-900 text-center">Login to ZeroPus</h5>
                      <div>
                          <label for="email" className="block mb-2 text-base font-medium text-gray-900">Email Or Username<sup className='text-primary'>*</sup></label>
                          <input type="text" name="email" id="email" className="bg-gray-50 border border-[#e3e6f0] text-gray-900 text-base rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5" required />
                      </div>
                      <div>
                          <label for="password" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">Password<sup className='text-primary'>*</sup></label>
                          <input type="password" name="password" id="password" className="bg-gray-50 border border-[#e3e6f0] text-gray-900 text-base rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5" required />
                      </div>
                      <div className="flex items-start">
                          <div className="flex items-start">
                              <div className="flex items-center h-5">
                                  <input id="remember" type="checkbox" className="border border-[#e3e6f0] rounded bg-gray-50 focus:ring-3 focus:ring-primary text-primary" />
                              </div>
                              <label for="remember" className="ms-2 text-base font-medium text-gray-900">Remember me</label>
                          </div>
                      </div>
                      <button type="submit" disabled={onFetching} className="w-full text-white bg-primary focus:ring-4 focus:outline-none focus:ring-primary/30 font-medium rounded-lg text-base px-5 py-2.5 text-center flex justify-center items-center">{onFetching ? (
                        <Loader fill1={"#CD0C0D"} fill2={"white"} width={"20px"} height={"20px"} />
                      ): (
                         "Login to your account"
                      )} </button>
                      <div className="text-base font-medium text-gray-500">
                          Not registered? <Link to={"/register"} className="text-primary hover:underline">Create account</Link>
                      </div>
                  </form>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Login