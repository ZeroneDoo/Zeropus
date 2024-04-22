import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useLogin } from '../context/AuthProvider.tsx'
import { getData, removeItem } from '../helper/LocalStorage.tsx'
import { Icon } from '@iconify-icon/react';
import Dropdown from './Dropdown.tsx';

const Header = () => {
  const { isLogin } = useLogin()
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const data = getData("user")
    if(data){
      setUser(data)
    }
  }, [])

  useEffect(() => {
  }, [user])

  const logout = () => {
    removeItem("user")
    removeItem("token")

    navigate("/login")
  }
  
  
  return (
    <nav className='py-5 px-[10vw] w-full fixed flex justify-between z-10 bg-white text-dark'>
        {/* logo */}
        <Link to={"/"} className="flex items-center gap-3">
          <Icon icon={"subway:book"}  style={{color: '#CD0C0D'}} width={32} height={32} />
          <p className="font-bold text-xl">ZeroPus</p>
        </Link>

        {/* list */}
        <div className='hidden items-center gap-16 md:hidden lg:flex'>
          <div className='hidden items-center gap-11 md:hidden lg:flex'>
            <NavLink to={"/"} className={({ isActive }) => `hover:text-primary ${isActive ? 'text-primary' : ''} font-semibold`}>Home</NavLink>
            <NavLink to={"/credit"} className={({ isActive }) => `hover:text-primary ${isActive ? 'text-primary' : ''} font-semibold`}>Credit</NavLink>
            {/* <NavLink to={"/#about"} className={({ isActive }) => `hover:text-primary ${isActive ? 'text-primary' : ''} font-semibold`}>About</NavLink> */}
            <NavLink to={"/book"} className={({ isActive }) => `hover:text-primary ${isActive ? 'text-primary' : ''} font-semibold`}>Book</NavLink>
          </div>
          <div className='flex items-center gap-5'>
            {user ? (
              <>
                <div className='min-w-16 pl-1 pr-3 border min-h-8 flex justify-center items-center border-[#BABABA] rounded-full bg-[#FAFAFA]'>
                  <div className='flex items-center w-full gap-1'>
                    <Icon icon={"tabler:coin-filled"}  style={{color: '#ffc700'}} width={24} height={24} />
                    <p className='font-semibold text-sm'>{user ? user?.credit.toLocaleString('id', {minimumFractionDigits: 0}) : "0"}</p>
                  </div>
                </div>
                
                <Dropdown 
                toggleLabel={<img src={user?.profile} alt="" className="circle-avatar ring-1 ring-[#BABABA]" />}
                dropdownItem={<>
                  <NavLink to="/profile" className="flex items-center gap-3 w-full min-w-[120px] cursor-pointer whitespace-nowrap bg-transparent px-4 py-2 text-sm text-left font-normal pointer-events-auto hover:bg-neutral-100 active:text-neutral-800 active:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-800 focus:outline-none active:no-underline">
                    <Icon icon={"ph:user"} width={24} height={24} /> Profile
                  </NavLink>
                  <NavLink to="/bookmark" className="flex items-center gap-3 w-full min-w-[120px] cursor-pointer whitespace-nowrap bg-transparent px-4 py-2 text-sm text-left font-normal pointer-events-auto hover:bg-neutral-100 active:text-neutral-800 active:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-800 focus:outline-none active:no-underline">
                    <Icon icon={"material-symbols:bookmark-outline"} width={24} height={24} /> Bookmark
                  </NavLink>
                  <NavLink to="/rent" className="flex items-center gap-3 w-full min-w-[120px] cursor-pointer whitespace-nowrap bg-transparent px-4 py-2 text-sm text-left font-normal pointer-events-auto hover:bg-neutral-100 active:text-neutral-800 active:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-800 focus:outline-none active:no-underline">
                    <Icon icon={"ion:book-outline"} width={24} height={24} /> Rent
                  </NavLink>
                  <button type="button" onClick={() => logout()} className="flex items-center gap-3 w-full min-w-[120px] cursor-pointer whitespace-nowrap bg-transparent px-4 py-2 text-sm text-left font-normal pointer-events-auto hover:bg-neutral-100 active:text-neutral-800 active:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-800 focus:outline-none active:no-underline">
                    <Icon icon={"solar:logout-2-outline"} width={24} height={24} /> Logout
                  </button>
                </>}
                />
              </>
            ): (
              <>
                <Link to={"/register"} className="hover:text-primary font-semibold">Register</Link>
                <Link to={"/login"} className="active:opacity-70 btn-primary">Login</Link>
              </>
            )}
          </div>
        </div>
        {/* btn drawer */}
        <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="md:inline-flex lg:hidden inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
          <span className="sr-only">Open sidebar</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
          </svg>
        </button>
      </nav>
  )
}

export default Header