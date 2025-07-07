
import {  SignUpButton, SignedOut, SignInButton, SignedIn, UserButton } from '@clerk/nextjs'
import React from 'react'

const Navbar = () => {
  return (


    <div className='sticky'>
        <div className=' bg-white/50 flex justify-between items-center mx-5 mt-5 h-20 rounded-full px-5 '>
            <div className='text-3xl font-semibold '>
                <p>Resume</p>
            </div>
            <div>
                <ul className='flex space-x-9 text-xl'>
                    <li className='p-2 rounded-xl hover:bg-gray-100/30 transition-all duration-200 ease-in-out cursor-pointer'>Home</li>
                    <li className='p-2 rounded-xl hover:bg-gray-100/30 transition-all duration-200 ease-in-out cursor-pointer'>Reviewer</li>
                    <li className='p-2 rounded-xl hover:bg-gray-100/30 transition-all duration-200 ease-in-out cursor-pointer'>Support</li>
                </ul>
            </div>
            <div className='flex space-x-2'>

                <SignedIn>
                    <UserButton />
                </SignedIn>
                <SignedOut>
                    <SignInButton  mode="modal" >
                        <button className='text-white bg-gray-600 hover:bg-gray-700 transition-all duration-200 ease-in-out px-5 py-4 rounded-full text-xl cursor-pointer'>
                        Sign in
                        </button>
                    </SignInButton>
                    <SignUpButton  mode="modal" >
                        <button className='text-white bg-gray-600 hover:bg-gray-700 transition-all duration-200 ease-in-out px-5 py-4 rounded-full text-xl cursor-pointer'>
                        Sign Up
                        </button>
                    </SignUpButton>
                </SignedOut>
            </div>
        </div>
    </div>

  )
}

export default Navbar
