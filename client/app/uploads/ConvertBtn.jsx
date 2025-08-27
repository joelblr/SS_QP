import React, { useState } from 'react'


export default function ConvertBtn() {

  const [isConverting, setIsConverting] = useState(false);

  const handleConversion = async () => {
    return;
    setIsConverting(true);
    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
      });

      if (response.ok) {
        const result = await response.json();
        if (result.status === 'success') {
          // Update the status for each file in the table
          setFileDetails((prevFiles) =>
            prevFiles.map((file) =>
              file.status === 'pending' ? { ...file, status: 'Success' } : file
            )
          );
          toast.success('Conversion successful!');
        } else {
          setFileDetails((prevFiles) =>
            prevFiles.map((file) =>
              file.status === 'pending' ? { ...file, status: 'Failure' } : file
            )
          );
          toast.error('Conversion failed.');
        }
      } else {
        toast.error('Conversion request failed.');
      }
    } catch (error) {
      toast.error('Conversion failed.');
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div
      className={`mx-auto px-4 py-2 text-white bg-blue-500 rounded-lg ${isConverting ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={handleConversion}
      disabled={isConverting}
    >
      {isConverting ? 'Converting...' : 'Convert to DOCX'}
    </div>
  );
}
