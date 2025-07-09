'use client';

import React, { useEffect, useState } from 'react'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw"; 

const ResultTab = () => {
    const [atsScore,setAtsScore] = useState('');
    const [strengths,setStrengths] = useState('');
    const [improvements,setImprovements] = useState('');

    useEffect(()=>{
        setAtsScore(sessionStorage.getItem('atsScore') || '' );
        setStrengths(sessionStorage.getItem('strengths') || '');
        setImprovements(sessionStorage.getItem('improvements') || '');
    },[]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center space-y-6 px-6 py-10">
      <h1 className="text-3xl font-bold">Resume Review Result</h1>

      <div className="bg-gray-800 p-4 rounded-lg w-full max-w-3xl text-white ">
        <h2 className="text-xl font-semibold mb-2">ATS Score:</h2>
        <p className='prose max-w-none'><ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{atsScore || 'No score found'}</ReactMarkdown></p>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg w-full max-w-3xl">
        <h2 className="text-xl font-semibold mb-2">Strengths:</h2>
        <p className='prose max-w-none'><ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{strengths || 'No strengths found'}</ReactMarkdown></p>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg w-full max-w-3xl">
        <h2 className="text-xl font-semibold mb-2">Improvements:</h2>
        <p className='prose max-w-none'><ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{improvements || 'No improvements found'}</ReactMarkdown></p>
      </div>
    </div>
  )
}

export default ResultTab
