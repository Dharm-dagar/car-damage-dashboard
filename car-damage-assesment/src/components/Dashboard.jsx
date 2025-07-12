import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      const response = await fetch(`/api/process-video/?vid_name=${baseName}`);

      const responseText = await response.text();
      console.log("Raw Response:", responseText);

      if (!response.ok) {
        alert("Server Error:\n" + responseText);
        return;
      }

      try {
        const data = JSON.parse(responseText);
        setUploaded(true);
        setResult(data);
        console.log("Video URL:", data.output_video);
      } catch (jsonErr) {
        alert("Could not parse JSON:\n" + jsonErr.message);
        console.error("JSON Parse Error:", jsonErr);
      }
    } catch (err) {
      alert("Request failed. See console.");
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
        <p className="text-green-400 mb-2">Uploaded: {videoFile.name}</p>
      )}

      {loading && <p className="text-blue-400 mb-2">⏳ Processing...</p>}

      {result && (
        <div className="mt-4 p-4 bg-gray-800 rounded shadow-md w-full max-w-xl">
          <h3 className="text-lg font-semibold mb-2">Result:</h3>
          <DownloadAndPlayVideo videoLink={result.output_video} />
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

// ⬇️ Separated component for video download & playback
const DownloadAndPlayVideo = ({ videoLink }) => {
  const [progress, setProgress] = useState(0);
  const [videoURL, setVideoURL] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadAndPlay = async (videoLink) => {
    try {
      setIsDownloading(true);
      setProgress(0);
      setVideoURL(null);

      const response = await axios.get(videoLink, {
        responseType: "blob",
        onDownloadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      });

      const blob = new Blob([response.data], { type: "video/mp4" });
      const videoLocalURL = URL.createObjectURL(blob);
      setVideoURL(videoLocalURL);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download video.");
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    handleDownloadAndPlay(videoLink);
  }, [videoLink]);

  return (
    <div className="flex flex-col items-center gap-4">
      {isDownloading && (
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {videoURL && (
        <video
          controls
          autoPlay
          className="rounded-xl shadow-lg w-full max-w-[720px] mt-4"
        >
          <source src={videoURL} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};
