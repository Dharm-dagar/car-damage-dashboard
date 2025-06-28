import React, { useState } from 'react';

const DamageAssessment = () => {
  const [fileName, setFileName] = useState('No file chosen');

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('No file chosen');
    }
  };

  const handleNotChooseFile = () => {
    
    setFileName('No file chosen');
    
    alert('You chose not to upload a file.');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h2 className="text-4xl mb-8">Damage Assessment</h2>

     
      <input
        type="file"
        id="fileInput"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex items-center space-x-6">
        
        <label
          htmlFor="fileInput"
          className="cursor-pointer bg-blue-600 hover:bg-red-700 px-6 py-3 rounded transition"
        >
          Choose File
        </label>

       
        <button
          onClick={handleNotChooseFile}
          className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded transition"
        >
          Not Choose File
        </button>
      </div>

     
      
    </div>
  );
};

export default DamageAssessment;
