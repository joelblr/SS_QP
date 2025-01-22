'use client';

import React, { useState } from 'react';
import UploadBtn from './UploadBtn';

export default function FileDropzone() {
  const [files, setFiles] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      (file) => file.type === 'application/pdf'
    );
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).filter(
      (file) => file.type === 'application/pdf'
    );
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="w-full max-w-xl mx-auto p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
      >
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-gray-600">Drag and drop PDF files here</p>
          <p className="text-gray-500 text-sm">or</p>
          <label
            htmlFor="file-upload"
            className="cursor-pointer text-blue-500 hover:underline"
          >
            Browse files
            <input
              id="file-upload"
              type="file"
              accept=".pdf"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
        {files.length > 0 && (
          <ul className="mt-4">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-2 bg-gray-100 rounded-lg mt-1"
              >
                <span>{file.name}</span>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <UploadBtn files={files} />
    </div>
  );
}
