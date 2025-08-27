"use client";

import React, { useState } from "react";
import { Bounce, Flip, Zoom, toast } from 'react-toastify';
import axios from "axios";


export default function UploadBtn({ toUploadFiles, onUploadSuccess }) {

  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (toUploadFiles.length === 0) {
      toast.warn("No files to upload.", { transition: Zoom })
      return;
    }

    const formData = new FormData();
    toUploadFiles.forEach((file) => {
      formData.append("pdf_files", file);
    });

    try {
      setUploading(true);
      const response = await axios.post(
        "http://localhost:5000/api/docword/pdf-uploads",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { saved_files, duplicate_files } = response.data;

      if (saved_files.length > 0)
        toast.success(response.data.message, { transition: Flip })
      if (duplicate_files.length > 0)
        toast.warn("Duplicate Files Detected", { transition: Zoom })

      if (onUploadSuccess)
        onUploadSuccess(); // Notify parent component about success

    } catch (error) {
      toast.error("Error uploading files !", { transition: Bounce })
      console.error(error);

    } finally {
      setUploading(false);
    }
  };


  return (
    <div
      className="mx-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300"
      onClick={handleUpload}
      disabled={uploading}
    >
      {uploading ? "Uploading..." : "Upload Files"}
    </div>
  );
}


// "use client";

// import React, { useState } from "react";
// import axios from "axios";


// // Components
// import ToastNotification from "../components/ToastNotification";

// export default function UploadBtn({ files, onUploadSuccess }) {
//   const [uploading, setUploading] = useState(false);
//   const [uploadStatus, setUploadStatus] = useState(null);
//   const [duplicateFiles, setDuplicateFiles] = useState([]);
//   const [toastNotifications, setToastNotifications] = useState([]);

//   const handleUpload = async () => {
//     if (files.length === 0) {
//       setToastNotifications([
//         ...toastNotifications,
//         {
//           type: "warning",
//           title: "Warning",
//           messages: ["No files to upload."],
//         },
//       ]);
//       console.log("MT");
//       return;
//     }

//     const formData = new FormData();
//     files.forEach((file) => {
//       formData.append("pdf_files", file);
//     });

//     try {
//       setUploading(true);
//       const response = await axios.post(
//         "http://localhost:5000/pdf_upload",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       const { saved_files, duplicate_files } = response.data;
//       setDuplicateFiles(duplicate_files.length > 0 ? duplicate_files : []); // Update state for duplicate files

//       if (saved_files.length > 0) {
//         setToastNotifications([
//           ...toastNotifications,
//           {
//             type: "success",
//             title: "Success",
//             messages: [response.data.message || "Files uploaded successfully!"],
//           },
//         ]);
//       }

//       setUploadStatus("Upload successful!");

//       if (onUploadSuccess) onUploadSuccess(); // Notify parent component about success

//     } catch (error) {
//       setToastNotifications([
//         ...toastNotifications,
//         {
//           type: "error",
//           title: "Error Occurred",
//           messages: ["Error uploading files."],
//         },
//       ]);
//       setUploadStatus("Error uploading files.");
//       console.error(error);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleToastClose = (index) => {
//     const updatedNotifications = toastNotifications.filter((_, i) => i !== index);
//     setToastNotifications(updatedNotifications);
//   };

//   return (
//     <>
//       <ToastContainer />

//       <div className="mt-4 flex flex-col items-center">
//         <button
//           onClick={handleUpload}
//           disabled={uploading}
//           className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300"
//         >
//           {uploading ? "Uploading..." : "Upload Files"}
//         </button>

//         {/* Display Toast Notifications */}
//         {toastNotifications.map((toast, index) => (
//           <ToastNotification
//             key={index}
//             type={toast.type}
//             title={toast.title}
//             messages={toast.messages}
//             onClose={() => handleToastClose(index)}
//           />
//         ))}

//         {/* Optionally, display duplicate files notification */}
//         {duplicateFiles.length > 0 && (
//           <ToastNotification
//             type="warning"
//             title="Duplicate Files:"
//             messages={duplicateFiles}
//             onClose={() => setDuplicateFiles([])}
//           />
//         )}
//       </div>
//     </>
//   );
// }
