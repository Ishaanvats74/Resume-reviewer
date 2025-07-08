'use client';
import {  SignUpButton, SignedOut, SignInButton, SignedIn, UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'


type navItems = {
    Name: string,
    Path: string,
}
const navItems:navItems[]  = [
    {Name : "Home", Path: "/"},
    {Name : "Reviewer", Path: "/Reviewer"},
    {Name : "Support", Path: "/Support"},
];

const Navbar: React.FC = () => {
    const { isSignedIn } = useUser();
    const router = useRouter();

    const handleClick = (item: navItems) =>{
        if(item.Name === "Reviewer"){
            if(isSignedIn){
                router.push(item.Path);
            } else{
                router.push(`/sign-in?redirect_url=${item.Path}`);
            }
        } else{
            router.push(item.Path);
        }
    }

  return (


    <div className='sticky'>
        <div className=' bg-white/50 flex justify-between items-center mx-5 mt-5 h-20 rounded-full px-5 '>
            <div className='text-3xl font-semibold '>
                <p>Resume</p>
            </div>
            <div>
                <ul className='flex space-x-9 text-xl'>
                    {navItems.map((item:navItems, index:number)=>(
                        <li key={index} onClick={()=>handleClick(item)} className='p-2 rounded-xl hover:bg-gray-100/30 transition-all duration-200 ease-in-out cursor-pointer'><Link href={item.Path}>{item.Name}</Link></li>
                    ))}
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
