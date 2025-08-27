// New ------------------------------------------------------------------
'use client';

import React, { useState, useEffect } from 'react';
import { Bounce, Flip, toast } from 'react-toastify';
import axios from 'axios';

// User-Components
import UploadBtn from './UploadBtn';
import ConvertBtn from './ConvertBtn';
import TabularDisplay from './TabularDisplay';

export default function FileDropzone() {

  const MAX_FILE_SIZE_MB = 5;
  const [toUploadFiles, setToUploadFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [fileDetails, setFileDetails] = useState(null);

  useEffect(() => {
    fetchFileDetails();
  }, []);


  async function fetchFileDetails() {
    try {
      const response = await axios.get('http://localhost:5000/api/docword/pdf-uploads');
      setFileDetails(response.data.docs_info);

    } catch (error) {
      toast.error('Failed to load pdf-file details.', { transition: Bounce });
      console.error('Failed to load pdf-file details:', error);
    }
  }

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files).filter((file) => {
      if (file.type !== 'application/pdf') {
        toast.error(
          `${file.name} is not a valid PDF.`,
          { transition: Bounce }
        );
        return false;
      }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast.error(
          `${file.name} exceeds the ${MAX_FILE_SIZE_MB}MB size limit.`,
          { transition: Bounce }
        );
        return false;
      }
      return true;
    });

    setToUploadFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).filter((file) => {
      if (file.type !== 'application/pdf') {
        toast.error(`"${file.name}" is not a valid PDF.`);
        return false;
      }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast.error(`"${file.name}" exceeds the ${MAX_FILE_SIZE_MB}MB size limit.`);
        return false;
      }
      return true;
    });

    setToUploadFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const removeFile = (index) => {
    setToUploadFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleUploadSuccess = async () => {
    setToUploadFiles([]);
    await fetchFileDetails();
  };


  return (
    <>
      <div className="h-auto flex flex-col bg-gray-50 rounded-lg">
        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          className={`w-full max-w-xl mx-auto my-4 p-4 border-2 ${isDragging ? 'border-blue-500' : 'border-gray-300'
            } border-dashed rounded-lg transition-colors`}
        >
          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-gray-600">Drag and drop PDF to upload here</p>
            <p className="text-gray-500 text-sm">or</p>
            <label
              htmlFor="file-upload"
              className="cursor-pointer text-blue-500 hover:underline"
            >
              Browse Files
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

          {toUploadFiles.length > 0 && (
            <ul className="mt-4">
              {toUploadFiles.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-200 rounded-lg mt-1"
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

        <div className="flex items-center justify-center">
          <UploadBtn toUploadFiles={toUploadFiles} onUploadSuccess={handleUploadSuccess} />
          <ConvertBtn />
        </div>

      </div>

      <TabularDisplay fileDetails={fileDetails} />
    </>
  );
}


// OLD ------------------------------------------------------------------
// OLD ------------------------------------------------------------------
// OLD ------------------------------------------------------------------
// 'use client';

// import React, { useState } from 'react';
// import { toast } from 'react-toastify';

// // User-Components
// import UploadBtn from './UploadBtn';

// export default function FileDropzone() {

//   const [toUploadFiles, setToUploadFiles] = useState([]);
//   const [isDragging, setIsDragging] = useState(false);

//   const MAX_FILE_SIZE_MB = 5;

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setIsDragging(false);

//     const droppedFiles = Array.from(e.dataTransfer.files).filter((file) => {
//       if (file.type !== 'application/pdf') {
//         toast.error(`${file.name} is not a valid PDF.`);
//         return false;
//       }
//       if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
//         toast.error(`${file.name} exceeds the ${MAX_FILE_SIZE_MB}MB size limit.`);
//         return false;
//       }
//       return true;
//     });

//     setToUploadFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
//   };

//   const handleFileChange = (e) => {
//     const selectedFiles = Array.from(e.target.files).filter((file) => {
//       if (file.type !== 'application/pdf') {
//         toast.error(`"${file.name}" is not a valid PDF.`);
//         return false;
//       }
//       if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
//         toast.error(`"${file.name}" exceeds the ${MAX_FILE_SIZE_MB}MB size limit.`);
//         return false;
//       }
//       return true;
//     });

//     setToUploadFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
//   };

//   const removeFile = (index) => {
//     setToUploadFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
//   };

//   const handleUploadSuccess = () => {
//     setToUploadFiles([]); // Clear the toUploadFiles list on successful upload
//   };

//   return (
//     <div className="h-full flex flex-col bg-gray-50 rounded-lg">
//       <div
//         onDrop={handleDrop}
//         onDragOver={(e) => {
//           e.preventDefault();
//           setIsDragging(true);
//         }}
//         onDragLeave={() => setIsDragging(false)}
//         className={`w-full max-w-xl mx-auto my-4 p-4 border-2 ${
//           isDragging ? 'border-blue-500' : 'border-gray-300'
//         } border-dashed rounded-lg transition-colors`}
//       >
//         <div className="flex flex-col items-center justify-center text-center">
//           <p className="text-gray-600">Drag and drop PDF toUploadFiles here</p>
//           <p className="text-gray-500 text-sm">or</p>
//           <label
//             htmlFor="file-upload"
//             className="cursor-pointer text-blue-500 hover:underline"
//           >
//             Browse Files
//             <input
//               id="file-upload"
//               type="file"
//               accept=".pdf"
//               multiple
//               onChange={handleFileChange}
//               className="hidden"
//             />
//           </label>
//         </div>

//         {toUploadFiles.length > 0 && (
//           <ul className="mt-4">
//             {toUploadFiles.map((file, index) => (
//               <li
//                 key={index}
//                 className="flex items-center justify-between p-2 bg-gray-200 rounded-lg mt-1"
//               >
//                 <span>{file.name}</span>
//                 <button
//                   onClick={() => removeFile(index)}
//                   className="text-red-500 hover:text-red-700"
//                 >
//                   Remove
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       <UploadBtn files={toUploadFiles} onUploadSuccess={handleUploadSuccess} />
//     </div>
//   );
// }
