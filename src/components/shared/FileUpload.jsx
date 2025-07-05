import { useState } from 'react';

const FileUpload = ({ onFilesSelected }) => {
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    const newPreviews = [];
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviews.push({
          name: file.name,
          url: e.target.result,
          type: file.type.includes('image') ? 'image' : 'file',
          size: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
        });
        
        if (newPreviews.length === files.length) {
          setPreviews(newPreviews);
          onFilesSelected(newPreviews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, PDF, DOCX (MAX. 10MB)</p>
          </div>
          <input 
            type="file" 
            multiple 
            onChange={handleFileChange} 
            className="hidden" 
          />
        </label>
      </div>
      
      {previews.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Files:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="border rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition-shadow">
                {preview.type === 'image' ? (
                  <div className="flex flex-col">
                    <div className="relative h-40 overflow-hidden rounded-md bg-gray-100 flex items-center justify-center">
                      <img 
                        src={preview.url} 
                        alt={preview.name} 
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-900 truncate">{preview.name}</p>
                      <p className="text-xs text-gray-500">{preview.size}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <div className="h-40 bg-gray-50 rounded-md flex flex-col items-center justify-center">
                      <div className="bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                        <span className="text-3xl">📄</span>
                      </div>
                      <p className="text-xs text-gray-500">{preview.name.split('.').pop().toUpperCase()} File</p>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-900 truncate">{preview.name}</p>
                      <p className="text-xs text-gray-500">{preview.size}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;