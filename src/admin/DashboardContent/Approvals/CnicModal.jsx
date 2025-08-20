import React from 'react';
import { X, Download } from 'lucide-react';

const CnicModal = ({ selectedApplication, setShowCnicModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            CNIC Verification - {selectedApplication?.owner}
          </h3>
          <button
            onClick={() => setShowCnicModal(false)}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-2">CNIC Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <label className="block text-sm text-gray-500">CNIC Number</label>
                <p className="font-medium">{selectedApplication?.cnicNumber}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500">Phone Number</label>
                <p className="font-medium">{selectedApplication?.phoneNumber}</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
              <div className="bg-gray-100 p-3 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Front Side</span>
                <a 
                  href={selectedApplication?.cnicFront} 
                  download
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                >
                  <Download className="mr-1" size={14} />
                  Download
                </a>
              </div>
              <div className="p-4 flex justify-center">
                <img 
                  src={selectedApplication?.cnicFront} 
                  alt="CNIC Front" 
                  className="max-h-64 rounded object-contain border border-gray-200"
                />
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
              <div className="bg-gray-100 p-3 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Back Side</span>
                <a 
                  href={selectedApplication?.cnicBack} 
                  download
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                >
                  <Download className="mr-1" size={14} />
                  Download
                </a>
              </div>
              <div className="p-4 flex justify-center">
                <img 
                  src={selectedApplication?.cnicBack} 
                  alt="CNIC Back" 
                  className="max-h-64 rounded object-contain border border-gray-200"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CnicModal;