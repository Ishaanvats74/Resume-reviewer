'use client';
import React, { useState } from 'react'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw"; 

 const Reviewer = () => {
  const [file,setFile] = useState<File | null>(null);
  const [uploading,setUploading] = useState(false);

  const [atsScore,setAtScore] = useState('');
  const [strengths,setStrengths] = useState('');
  const [improvements,setImprovements] = useState('');

   const handleUpload = async ()=>{
    if(!file) return console.log("No File is selected");

    const formData = new FormData();
    formData.append('resume',file);

    setUploading(true);
    try{
    const res = await fetch('/Backend/api/review',{
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if(!res){
      console.error('server Error:', data?.error || "Unkown error")
    }else {
      setAtScore(data.atsScore || "No ATS Score")
      setStrengths(data.strengths || "No Strenght")
      setImprovements(data.improvements || "No Improvment")
    }} catch(error){
      console.error(error)
    }finally{
      setUploading(false);
    }
  }

  const handleCancel = async()=>{
    setUploading(false);
    setAtScore('');
    setImprovements('');
    setStrengths('');
    setFile(null);
  }
  return (
   <div className="bg-black min-h-screen flex justify-center items-center py-10 px-4">
    <div className="shadow shadow-white bg-gray-100/40 p-8 rounded-xl space-y-6 w-full max-w-3xl">
      <p className="text-center text-3xl font-semibold text-white">Upload Your Resume</p>

      <input
        type="file"
        name="resume"
        className="w-full p-2 rounded-xl bg-gray-300/40 hover:bg-gray-400/40 transition-all duration-200 ease-in-out text-white"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <div className="flex flex-col sm:flex-row justify-between w-full gap-4">
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="bg-green-600/80 hover:bg-green-700 w-full py-2 rounded-xl transition-all duration-200 ease-in-out text-white"
        >
          {uploading ? "Uploading..." : "Upload & Review"}
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-300/40 hover:bg-red-400/80 w-full py-2 rounded-xl transition-all duration-200 ease-in-out text-white"
        >
          Cancel
        </button>
      </div>

      {atsScore && (
        <div className="bg-white text-black rounded-lg p-5">
          <h2 className="font-bold text-xl mb-2">ATS Score:</h2>
          <div className="prose max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{atsScore}</ReactMarkdown>
          </div>
        </div>
      )}

      {strengths && (
        <div className="p-4 border rounded bg-gray-100 text-black max-h-80 overflow-auto">
          <h2 className="text-lg font-semibold mb-2">Strengths:</h2>
          <div className="prose max-w-none text-black">
            <ReactMarkdown remarkPlugins={[remarkGfm]}  rehypePlugins={[rehypeRaw]}>{strengths}</ReactMarkdown> 
          </div>
        </div>
      )}

      {improvements && (
        <div className="p-4 border rounded bg-gray-100 text-black max-h-80 overflow-auto">
          <h2 className="text-lg font-semibold mb-2">Improvements:</h2>
          <div  className="prose max-w-none text-black">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} >{improvements}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
</div>

  )
}

export default Reviewer
