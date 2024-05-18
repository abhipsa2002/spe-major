import React, { useState,useEffect } from 'react';
import { useEmail } from './Context/EmailContext';
import { useNavigate } from 'react-router-dom';
import './prediction.css';

const PredictionPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [caption, setCaption] = useState('');
  const {email} = useEmail();

  const navigate = useNavigate();

  useEffect(() => {
    if (email === null) {
      navigate('/login');
    }
  }, [email, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setCaption('');
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleBack = () => {
    navigate('/home'); 
  };


  const handlePredict = () => {
    setCaption('');
    if (!selectedImage) {
      console.error('Please select an image');
      return;
    }
    
    // Create a new instance of FileReader
    const reader = new FileReader();

    // When the file is loaded
    reader.onload = () => {
      // Extract base64 string from the loaded file
      const base64String = reader.result.split(',')[1]; // Extracting base64 string from data URL
      
      // Prepare image data object with base64 string
      const imageData = { image: `data:image/jpeg;base64,${base64String}` };
      
      // Make a fetch request to send the image data to the backend for caption generation
      fetch(`http://localhost:8020/user/generateCaption/${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(imageData), // Send image data as JSON
      })
      .then((response) => {
        // Check if the response is OK
        if (response.ok) {
          return response.text(); // Convert response to text
        } else {
          // Throw an error if the response is not OK
          throw new Error('Failed to generate caption');
        }
      })
      .then((data) => {
        // Set the caption based on the response data
        setCaption(data);
      })
      .catch((error) => {
        // Log an error if there is any issue in the process
        console.error('Error generating caption:', error);
      });
    };

  // Start reading the selected image file
  reader.readAsDataURL(selectedImage);
  }

  return (
    <div className="prediction-container">
      <h1 className="prediction-heading" style={{marginTop:0}}>Generate Captions</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && (
        <div className="image-container">
          <img src={imagePreview} alt="Preview" className="image-preview" />
          <button className="predict-button" onClick={handlePredict}>Predict</button>
          {caption && (
            <div>
              <h2 className="caption-heading">Generated Caption :</h2>
              <div className="caption-container">
              <p className="caption">{caption}</p>
            </div>
              
            </div>
          )}
        </div>
      )}
      <button className="back-button" onClick={handleBack}>Back</button>
    </div>

  );
};

export default PredictionPage;
