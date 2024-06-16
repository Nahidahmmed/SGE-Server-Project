// dr75v4jup fksqlqhl
import React, { useState } from 'react';
import axios from 'axios';

const FileUploadComponent = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFiles([file]);

    // Preview selected image if it's an image file
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl('');
    }
  };

  const handleUpload = async () => {
    setUploading(true);
    setUploadError('');

    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('file', file);
    });

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dr75v4jup/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          params: {
            upload_preset: 'fksqlqhl' // Replace with your actual upload preset name
          }
        }
      );

      if (response.data && response.data.secure_url) {
        const newUploadedUrls = [...uploadedUrls, response.data.secure_url];
        setUploadedUrls(newUploadedUrls);
        console.log('Uploaded URLs:', newUploadedUrls);

        // Clear selected files and preview after successful upload
        setSelectedFiles([]);
        setPreviewUrl('');
      } else {
        console.error('Unexpected response format:', response.data);
        setUploadError('Error: Unexpected response format.');
      }
    } catch (error) {
      if (error.response) {
        console.error('Server responded with status code:', error.response.status);
        console.error('Response data:', error.response.data);
        setUploadError('Error uploading files. Please check the console for details.');
      } else if (error.request) {
        console.error('No response received:', error.request);
        setUploadError('No response received from the server.');
      } else {
        console.error('Error setting up the request:', error.message);
        setUploadError('Error setting up the upload request.');
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">Upload Files to Cloudinary</h1>
        {uploadError && <p className="text-red-500 mb-4">{uploadError}</p>}
        <div className="mb-4">
          {previewUrl && (
            <img src={previewUrl} alt="Preview" className="mb-4 max-w-full max-h-60" />
          )}
          <input
            type="file"
            className="border-gray-300 border p-2 w-full"
            onChange={handleFileChange}
            value="" // Reset value attribute to clear input after selection
          />
        </div>
        <div className="mb-4">
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleUpload}
            disabled={uploading || selectedFiles.length === 0}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
        {uploadedUrls.length > 0 && (
          <div className="mb-4">
            <h2 className="text-lg font-bold mb-2">Uploaded Files:</h2>
            <ul className="list-disc pl-4">
              {uploadedUrls.map((url, index) => {
                const isImage = url.match(/\.(jpeg|jpg|gif|png)$/);
                const isVideo = url.match(/\.(mp4|webm|ogg)$/);
                const isPdf = url.match(/\.pdf$/);

                return (
                  <li key={index}>
                    {isImage ? (
                      <img src={url} alt={`Uploaded file ${index + 1}`} className="max-w-full max-h-60 mb-2" />
                    ) : isVideo ? (
                      <video src={url} controls className="max-w-full max-h-60 mb-2">
                        Your browser does not support the video tag.
                      </video>
                    ) : isPdf ? (
                      <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                        View PDF
                      </a>
                    ) : (
                      <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                        Download File
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadComponent;
