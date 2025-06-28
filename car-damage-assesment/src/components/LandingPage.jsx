import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/background.png')",
      }}
    >
     
      <div className="absolute top-0 w-full bg-red-500 text-white flex justify-between items-center px-6 py-3 text-sm font-semibold tracking-wide">
        <span>CAR DAMAGE ASSESSMENT</span>
        <button
          onClick={() => navigate('/damage-assessment')}
          className="bg-black text-white px-4 py-1 rounded"
        >
          ASSESS DAMAGE
        </button>
      </div>

     
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Get back on the road?
        </h1>
        <button
          onClick={() => navigate('/damage-assessment')}
          className="mt-4 px-6 py-3 bg-blue text-black font-medium rounded shadow hover:bg-blue-100 transition"
        >
           Go to Damage Assessment
        </button>
      </div>

      
      <div className="absolute bottom-0 w-full h-6 bg-yellow-400" />
    </div>
  );
};

export default LandingPage;
