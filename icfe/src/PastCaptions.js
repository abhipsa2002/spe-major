import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEmail } from './Context/EmailContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './images.css';

const PastImagesPage = () => {

  const navigate = useNavigate();

  const {email} = useEmail();
  const [pastImages, setPastImages] = useState([]);

  useEffect(() => {
    if (email === null) {
      navigate('/login');
    }
  }, [email, navigate]);

  const handleBack = () => {
    navigate('/home'); 
  };


  useEffect(() => {
    const fetchPastImages = async () => {
      try {
        const response = await axios.get(`http://localhost:8020/user/getPastImageCaptions/${email}`);
        const processedPastImages = response.data.map((pastImage) => {
          const imageData = pastImage.image.split(',')[1]; // Extract the Base64 string
          return {
            ...pastImage,
            data: `data:image/jpeg;base64,${imageData}`, // Construct the data URL
          };
        });
        setPastImages(processedPastImages);
      } catch (error) {
        console.error('Error fetching past images:', error);
      }
    };
    
  
    fetchPastImages(); // Call fetchPastImages inside useEffect
  }, [email]);
  

  return (
    <div className="past-images">
      <h1 className="caption-heading" style={{marginTop:0}}>Past Images and Captions</h1>
      {pastImages && pastImages.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Created At</th>
              <th>Caption</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {pastImages.map((pastImage) => (
              <tr key={pastImage.id}>
                <td className="created-at-column">{pastImage.createdAt}</td>
                <td>{pastImage.caption}</td>
                <td className="image-cell">
                  <img src={pastImage.data} alt="Past Captions" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No past images available</p>
      )}
      <div className="text-center"> 
          <button onClick={handleBack} className="back-button">Back</button>
      </div>
    </div>
  );
};

export default PastImagesPage;
