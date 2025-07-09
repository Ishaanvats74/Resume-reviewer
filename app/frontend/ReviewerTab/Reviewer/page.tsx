'use client';

import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react'


 const Reviewer = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file,setFile] = useState<File | null>(null);
  const [uploading,setUploading] = useState(false);


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
      sessionStorage.setItem('atsScore',data.atsScore || "No ATS Score")
      sessionStorage.setItem('strengths',data.strengths || "No strengths")
      sessionStorage.setItem('improvements',data.improvements || "No Improvment")
      if(file){
        const pdf = URL.createObjectURL(file);
        sessionStorage.setItem('pdf',pdf);
      }
      router.push('/frontend/ResultTab');
    }} catch(error){
      console.error(error)
    }finally{
      setUploading(false);
    }
  }

  const handleCancel = async()=>{
    setUploading(false);
    setFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }
  return (
   <div className="bg-black min-h-screen flex justify-center items-center py-10 px-4">
    <div className="shadow shadow-white bg-gray-100/40 p-8 rounded-xl space-y-6 w-full max-w-3xl">
      <p className="text-center text-3xl font-semibold text-white">Upload Your Resume</p>
      {/* upload File */}
      <input type="file" name="resume" className="w-full p-2 rounded-xl bg-gray-300/40 hover:bg-gray-400/40 transition-all duration-200 ease-in-out text-white" onChange={(e) => setFile(e.target.files?.[0] || null)} ref={fileInputRef}/>

      <div className="flex flex-col sm:flex-row justify-between w-full gap-4">
      {/* Upload Button */}
        <button onClick={handleUpload} disabled={uploading} className="bg-green-600/80 hover:bg-green-700 w-full py-2 rounded-xl transition-all duration-200 ease-in-out text-white">{uploading ? "Uploading..." : "Upload & Review"}</button>
      {/* Cancel Button */}
        <button onClick={handleCancel} className="bg-gray-300/40 hover:bg-red-400/80 w-full py-2 rounded-xl transition-all duration-200 ease-in-out text-white">Cancel</button>
      </div>

      {uploading && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex flex-col items-center justify-center text-white text-xl">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white mb-6"></div>
          Analyzing Resume...
        </div>
      )}

  </div>
</div>

  )
}

export default Reviewer
