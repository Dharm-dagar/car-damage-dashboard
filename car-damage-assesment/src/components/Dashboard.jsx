import React , { useState } from 'react';
import ImageUpload from './ImageUpload';
import ResultCard from './ResultCard';

const Dashboard = () => {
  const [result, setResult] = useState(null);

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    // Replace with your backend URL
    const res = await fetch('http://127.0.0.1:8000/predict', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-bold text-center">Car Damage Assessment</h1>
      <ImageUpload onUpload={handleUpload} />
      {result && (
        <div className="grid grid-cols-1 gap-4 mt-6">
          <ResultCard title="Car Detected" value={result.car_detected ? 'Yes' : 'No'} />
          <ResultCard title="Damage Detected" value={result.damage_detected ? 'Yes' : 'No'} />
          <ResultCard title="Damage Location" value={result.damage_location} />
          <ResultCard title="Severity" value={result.severity} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
