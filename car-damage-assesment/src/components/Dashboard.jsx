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

  const baseName = videoFile.name.split(".")[0];

  setResult(null);
  setUploaded(false);
  setLoading(true);

  try {
    const response = await fetch(`/api/process-video/?vid_name=${baseName}`); // << use /api instead of full URL

    const responseText = await response.text(); // read as text first
    console.log(" Raw Response:", responseText);

    if (!response.ok) {
      alert(" Server Error:\n" + responseText);
      return;
    }

    // Try parsing only if response was OK
    try {
      const data = JSON.parse(responseText);
      setUploaded(true);
      setResult(data);
    } catch (jsonErr) {
      alert(" Could not parse JSON:\n" + jsonErr.message);
      console.error("JSON Parse Error:", jsonErr);
    }
  } catch (err) {
    alert(" Request failed. See console.");
    console.error("Request Error:", err);
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
          Uploaded: {videoFile.name}
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
