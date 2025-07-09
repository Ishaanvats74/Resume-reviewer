'use client';

import React, { useEffect, useState } from 'react'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw"; 

const ResultTab = () => {
    const [atsScore,setAtsScore] = useState('');
    const [strengths,setStrengths] = useState('');
    const [improvements,setImprovements] = useState('');
    const [pdf,setPdf] = useState('');
    

    useEffect(()=>{
        setAtsScore(sessionStorage.getItem('atsScore') || '' );
        setStrengths(sessionStorage.getItem('strengths') || '');
        setImprovements(sessionStorage.getItem('improvements') || '');
        setPdf(sessionStorage.getItem('pdf') || '');
    },[]);

  return (
  <div className="h-screen flex bg-gray-50 text-black overflow-hidden">
      {/* Left Panel: Score and Feedback */}
      <div className="w-full lg:w-1/2 p-8 space-y-6 border-r border-gray-200 overflow-y-auto">
        <h1 className="text-2xl font-bold">Resume Review Result</h1>

        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-1">ATS Score</h2>
          <p className="text-3xl font-bold text-blue-600">{atsScore || "N/A"}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Strengths</h2>
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {strengths || 'No strengths found'}
          </ReactMarkdown>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Improvements</h2>
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {improvements || 'No improvements found'}
          </ReactMarkdown>
        </div>
      </div>

      {/* Right Panel: PDF Viewer */}
      <div className="w-full lg:w-1/2 p-8 bg-white flex flex-col items-center overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">PDF Preview</h2>
        {pdf ? (
          <iframe
            src={pdf}
            className="w-full h-[80vh] rounded border shadow"
            title="PDF Viewer"
          />
        ) : (
          <p>No PDF found</p>
        )}
      </div>
    </div>
  )
}

export default ResultTab
