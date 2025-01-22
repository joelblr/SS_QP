'use client';

import React, { useState } from 'react';
import axios from 'axios';

export default function UploadBtn({ files }) {
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleUpload = async () => {
    if (files.length === 0) {
      setUploadStatus('No files to upload.');
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('pdf_files', file);
    });

    try {
      setUploading(true);
      const response = await axios.post(
        'http://localhost:5000/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setUploadStatus(response.data.message || 'Files uploaded successfully!');
    } catch (error) {
      setUploadStatus('Error uploading files.');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-4 flex flex-col items-center">
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300"
      >
        {uploading ? 'Uploading...' : 'Upload Files'}
      </button>

      {uploadStatus && (
        <p
          className={`mt-2 text-sm ${
            uploadStatus.includes('successfully') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {uploadStatus}
        </p>
      )}
    </div>
  );
}
