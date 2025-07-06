import React, { useState } from 'react';

const ViewAttachmentsModal = ({ isOpen, files, onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white max-w-3xl w-full rounded-lg shadow-lg overflow-auto max-h-[90vh] p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">View Attachments</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 text-xl font-bold"
          >
            ×
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {files.map((file, idx) => (
            <div
              key={idx}
              className="border rounded-md p-3 bg-gray-50 cursor-pointer hover:shadow"
              onClick={() => setSelectedFile(file)}
            >
              {file.type === 'image' ? (
                <img
                  src={file.url}
                  alt={file.name}
                  className="max-h-48 w-full object-contain rounded"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-48">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                    <span className="text-3xl">📄</span>
                  </div>
                  <p className="text-sm text-center text-gray-700">{file.name}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Full view modal inside modal */}
        {selectedFile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white max-w-4xl w-full rounded-lg shadow-lg max-h-[90vh] overflow-auto p-4 relative">
              <button
                onClick={() => setSelectedFile(null)}
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold"
              >
                ×
              </button>
              <h2 className="text-lg font-semibold mb-4">{selectedFile.name}</h2>
              {selectedFile.type === 'image' ? (
                <img
                  src={selectedFile.url}
                  alt={selectedFile.name}
                  className="w-full h-auto object-contain rounded"
                />
              ) : (
                <iframe
                  src={selectedFile.url}
                  className="w-full h-[70vh] border rounded"
                  title={selectedFile.name}
                ></iframe>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAttachmentsModal;
