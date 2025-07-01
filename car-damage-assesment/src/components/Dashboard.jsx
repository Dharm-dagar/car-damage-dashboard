import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!videoFile) {
      alert("Please choose a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("video", videoFile);
    const baseName = videoFile.name.split(".")[0];

    setResult(null);
    setUploaded(false);
    setLoading(true);

    try {
      const uploadResponse = await fetch("http://coder-edgestg.com:8127/process-video/?vid_name=lak",{
        method: "GET",
        body: formData,
      });

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        alert("❌ Upload failed:\n" + errorText);
        setLoading(false);
        return;
      }

      setUploaded(true); 

      const processResponse = await fetch(
        `http://coder-edgestg.com:8127/process-video/?vid_name=lak`
      );

      if (!processResponse.ok) {
        const errorText = await processResponse.text();
        alert("❌ Processing failed:\n" + errorText);
        return;
      }

      const data = await processResponse.json();
      setResult(data);
    } catch (err) {
      alert("Something went wrong. Check console.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-white flex flex-col justify-center items-center px-4 py-10">
      <h2 className="text-3xl font-semibold mb-8">Damage Assessment</h2>

    
      <label className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded cursor-pointer mb-4">
        Choose File
        <input
          type="file"
          accept="video/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files[0];
            setVideoFile(file);
            setUploaded(false);
            setResult(null);
          }}
        />
      </label>

  
      <button
        onClick={handleUpload}
        className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded mb-4 disabled:opacity-50"
        disabled={!videoFile || loading}
      >
        Upload & Assess
      </button>

      
      {uploaded && videoFile && (
        <p className="text-green-400 mb-2">
          ✅ Uploaded: {videoFile.name}
        </p>
      )}

      
      {loading && (
        <p className="text-blue-400 mb-2">⏳ Processing...</p>
      )}

      
      {result && (
        <div className="mt-4 p-4 bg-gray-800 rounded shadow-md w-full max-w-md">
          <h3 className="text-lg font-semibold mb-2">Result:</h3>
          <pre className="text-green-400 whitespace-pre-wrap">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      
      <button
        onClick={() => navigate("/")}
        className="mt-10 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
      >
       Back to Home
      </button>
    </div>
  );
};

export default Dashboard;
