import React, { useState } from 'react';

const ImageUpload = ({ onUpload }) => {
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    onUpload(file); 
  };

  return (
    <div className="my-4 text-center">
      <input type="file" onChange={handleChange} accept="image/*" />
    </div>
  );
};

export default ImageUpload;
