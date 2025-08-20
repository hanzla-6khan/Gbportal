import React, { useState } from 'react';
import Header from './Header';
import ApplicationList from './ApplicationList';
import ApplicationDetail from './ApplicationDetail';
import CnicModal from './CnicModal';
import BankModal from './BankModal';

const ApprovalDashboard = () => {
  const [activeTab, setActiveTab] = useState('hotels');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showCnicModal, setShowCnicModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [viewMode, setViewMode] = useState('list');

  // Sample data with enhanced details
  const hotelApprovals = [
    {
      id: 'H001',
      name: 'Grand Plaza Hotel',
      location: 'New York',
      owner: 'John Smith',
      submittedDate: '2023-06-15',
      status: 'pending',
      details: '5-star luxury hotel with 200 rooms',
      cnicNumber: '42201-1234567-8',
      phoneNumber: '+1 (555) 123-4567',
      bankDetails: {
        bankName: 'Chase Bank',
        accountTitle: 'John Smith Hotels LLC',
        accountNumber: '1234567890',
        iban: 'US33CHAS1234567890',
        branchCode: '021000021'
      },
      cnicFront: 'https://example.com/cnic-front.jpg',
      cnicBack: 'https://example.com/cnic-back.jpg'
    },
  ];

  const estoreApprovals = [
    {
      id: 'E001',
      name: 'Fashion Haven',
      category: 'Clothing',
      owner: 'Michael Brown',
      submittedDate: '2023-06-10',
      status: 'pending',
      products: 45,
      cnicNumber: '42201-7654321-9',
      phoneNumber: '+1 (555) 987-6543',
      bankDetails: {
        bankName: 'Bank of America',
        accountTitle: 'Fashion Haven Inc.',
        accountNumber: '9876543210',
        iban: 'US33BOFA9876543210',
        branchCode: '026009593'
      },
      cnicFront: 'https://example.com/cnic-front.jpg',
      cnicBack: 'https://example.com/cnic-back.jpg'
    },
  ];

  const filteredData = activeTab === 'hotels' 
    ? hotelApprovals.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.owner.toLowerCase().includes(searchTerm.toLowerCase()))
    : estoreApprovals.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.owner.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setViewMode('detail');
  };

  const handleViewCnic = () => {
    setShowCnicModal(true);
  };

  const handleViewBankDetails = () => {
    setShowBankModal(true);
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedApplication(null);
  };

  const handleApprove = (id) => {
    console.log(`Approved ${activeTab} with ID: ${id}`);
    handleBackToList();
  };

  const handleReject = (id) => {
    console.log(`Rejected ${activeTab} with ID: ${id}`);
    handleBackToList();
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        viewMode={viewMode}
        selectedApplication={selectedApplication}
        handleBackToList={handleBackToList}
        hotelApprovals={hotelApprovals}
        estoreApprovals={estoreApprovals}
      />
      
      <div className="p-6">
        {viewMode === 'list' ? (
          <ApplicationList 
            filteredData={filteredData}
            activeTab={activeTab}
            handleViewDetails={handleViewDetails}
            searchTerm={searchTerm}
          />
        ) : (
          <ApplicationDetail 
            selectedApplication={selectedApplication}
            activeTab={activeTab}
            handleViewCnic={handleViewCnic}
            handleViewBankDetails={handleViewBankDetails}
            handleApprove={handleApprove}
            handleReject={handleReject}
          />
        )}
      </div>

      {showCnicModal && (
        <CnicModal 
          selectedApplication={selectedApplication}
          setShowCnicModal={setShowCnicModal}
        />
      )}

      {showBankModal && (
        <BankModal 
          selectedApplication={selectedApplication}
          setShowBankModal={setShowBankModal}
        />
      )}
    </div>
  );
};

export default ApprovalDashboard;