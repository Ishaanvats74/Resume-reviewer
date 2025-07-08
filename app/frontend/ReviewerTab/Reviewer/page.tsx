'use client';
import React, { useState } from 'react'

 const Reviewer = () => {
  const [file,setFile] = useState<File | null>(null);
  const [uploading,setUploading] = useState(false);
  const [response, setRepsonse] = useState("");

   const handleUpload = async ()=>{
    if(!file) return console.log("No File is selected");

    const formData = new FormData();
    formData.append('resume',file);

    setUploading(true);
    const res = await fetch('/Backend/api/review',{
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setRepsonse(data.feedback || 'no feedback received.')
    setUploading(false);

  }

  const handleCancel = async()=>{
    setUploading(false);
    setRepsonse("");
  }
  return (
    <div className='bg-black h-screen flex justify-center items-center'>
        <div className='shadow shadow-white bg-gray-100/40 p-10 rounded-xl space-y-5 '>
          <p className='text-center text-3xl'> Upload Your Resume </p>
          <input type="file" name="resume" className=' p-2 rounded-2xl bg-gray-300/40 hover:bg-gray-400/40 transition-all duration-200 ease-in-out' onChange={(e) => setFile(e.target.files?.[0] || null)}/>
          <div className='flex justify-between w-full gap-4'>
            <button onClick={handleUpload} disabled={uploading} className='bg-green-600/80 hover:bg-green-700 w-full py-1 rounded-xl  transition-all duration-200 ease-in-out'>{uploading ? "Uploading..." : "Upload & Review"}</button>
            <button  className='bg-gray-300/40 hover:bg-red-400/80 w-full py-1 rounded-xl  transition-all duration-200 ease-in-out' onClick={handleCancel}>Cancel</button>
          </div>
          {response && (
            <div className="mt-6 p-4 border rounded bg-gray-100 text-black w-[80%]">
              <h2 className="text-lg font-semibold mb-2">AI Feedback:</h2>
              <pre>{response}</pre>
            </div>
            
          )
          }

        </div>
    </div>
  )
}

export default Reviewer
