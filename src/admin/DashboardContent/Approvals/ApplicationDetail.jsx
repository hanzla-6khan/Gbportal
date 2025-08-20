import React from 'react';
import { FileText, Landmark, Check, X } from 'lucide-react';

const ApplicationDetail = ({
  selectedApplication,
  activeTab,
  handleViewCnic,
  handleViewBankDetails,
  handleApprove,
  handleReject
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Basic Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Application Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-500">Business Name</label>
                <p className="font-medium">{selectedApplication?.name}</p>
              </div>
              
              <div>
                <label className="block text-sm text-gray-500">Owner Name</label>
                <p className="font-medium">{selectedApplication?.owner}</p>
              </div>
              
              {activeTab === 'hotels' ? (
                <div>
                  <label className="block text-sm text-gray-500">Location</label>
                  <p className="font-medium">{selectedApplication?.location}</p>
                </div>
              ) : (
                <div>
                  <label className="block text-sm text-gray-500">Category</label>
                  <p className="font-medium">{selectedApplication?.category}</p>
                </div>
              )}
              
              <div>
                <label className="block text-sm text-gray-500">Description</label>
                <p className="font-medium">
                  {activeTab === 'hotels' 
                    ? selectedApplication?.details 
                    : `${selectedApplication?.products} products listed`}
                </p>
              </div>
              
              <div>
                <label className="block text-sm text-gray-500">Submitted Date</label>
                <p className="font-medium">
                  {new Date(selectedApplication?.submittedDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Verification Documents</h4>
              <div className="flex gap-3">
                <button
                  onClick={handleViewCnic}
                  className="flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 text-sm font-medium transition-colors"
                >
                  <FileText className="mr-2" size={14} />
                  View CNIC
                </button>
                <button
                  onClick={handleViewBankDetails}
                  className="flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 text-sm font-medium transition-colors"
                >
                  <Landmark className="mr-2" size={14} />
                  View Bank Details
                </button>
              </div>
            </div>
          </div>
          
          {/* Right Column - Contact and Verification */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact & Verification</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-500">CNIC Number</label>
                <p className="font-medium">{selectedApplication?.cnicNumber}</p>
              </div>
              
              <div>
                <label className="block text-sm text-gray-500">Phone Number</label>
                <p className="font-medium">{selectedApplication?.phoneNumber}</p>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Bank Information</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500">Bank Name</label>
                    <p className="font-medium text-sm">{selectedApplication?.bankDetails.bankName}</p>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500">Account Title</label>
                    <p className="font-medium text-sm">{selectedApplication?.bankDetails.accountTitle}</p>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500">Account Number</label>
                    <p className="font-medium text-sm">{selectedApplication?.bankDetails.accountNumber}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Approval Actions</h4>
              <div className="flex gap-3">
                <button
                  onClick={() => handleApprove(selectedApplication?.id)}
                  className="flex-1 flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                >
                  <Check className="mr-2" size={16} />
                  Approve
                </button>
                <button
                  onClick={() => handleReject(selectedApplication?.id)}
                  className="flex-1 flex items-center justify-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                >
                  <X className="mr-2" size={16} />
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetail;