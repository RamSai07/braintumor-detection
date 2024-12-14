import React, { useState } from 'react';
import axios from 'axios';
const api = 'http://localhost:8000';

function BrainUI() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [prediction, setPrediction] = useState('');

    const Filetobackend = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post(`${api}/brainimage`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // Set the prediction result in the state
        setPrediction(response.data.prediction);
        console.log('file uploaded successfully');
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(URL.createObjectURL(file)); // Display the selected image
        Filetobackend(file);
    };

    return (
        <>
            <h1><center>Brain Tumor Detection</center></h1>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <form>
                    <p>Upload your Image</p>
                    <input type="file" onChange={handleFileChange} style={{ marginLeft: '85px' }} />
                </form>
            </div>

            {/* Display the uploaded image */}
            {selectedImage && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <h3>Uploaded Image:</h3>
                    <img src={selectedImage} alt="Uploaded" style={{ width: '300px', height: 'auto' }} />
                </div>
            )}

            {/* Display the prediction result */}
            {prediction && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <h3>Prediction: {prediction}</h3>
                </div>
            )}
        </>
    );
}

export default BrainUI;
