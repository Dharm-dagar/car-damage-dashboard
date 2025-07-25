import React from 'react';
import loadingGif from '../assets/loading_icon.gif'; 

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <img src={loadingGif} alt="Loading..." className="w-32 h-32" />
    </div>
  );
};

export default LoadingScreen;