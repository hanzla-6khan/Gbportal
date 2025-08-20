import React from 'react';
import { X } from 'lucide-react';

const BankModal = ({ selectedApplication, setShowBankModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            Bank Details - {selectedApplication?.owner}
          </h3>
          <button
            onClick={() => setShowBankModal(false)}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-500">Bank Name</label>
                <p className="font-medium">{selectedApplication?.bankDetails.bankName}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500">Account Title</label>
                <p className="font-medium">{selectedApplication?.bankDetails.accountTitle}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-500">Account Number</label>
                <p className="font-medium">{selectedApplication?.bankDetails.accountNumber}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500">IBAN</label>
                <p className="font-medium">{selectedApplication?.bankDetails.iban}</p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-500">Branch Code</label>
              <p className="font-medium">{selectedApplication?.bankDetails.branchCode}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankModal;