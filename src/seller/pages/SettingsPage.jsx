import React, { useState } from 'react';
import {
  Settings,
  Store,
  Hotel,
  Banknote,
  User,
  Mail,
  Phone,
  Globe,
  Lock,
  CreditCard,
  ChevronDown,
  Check,
  X,
  Edit,
  Plus,
  Trash2
} from 'lucide-react';

const SettingsPage = ({ businessType = 'store' }) => {
  const [activeTab, setActiveTab] = useState('business');
  const [editMode, setEditMode] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: businessType === 'store' ? 'My Awesome Store' : 'Grand Hotel',
    email: 'contact@business.com',
    phone: '+1 (555) 123-4567',
    website: 'www.mybusiness.com',
    address: '123 Business St, City, Country',
    description: businessType === 'store' 
      ? 'We sell high quality products' 
      : 'Luxury accommodations with premium amenities'
  });

  // Bank accounts
  const [bankAccounts, setBankAccounts] = useState([
    { id: 1, bankName: 'Chase Bank', accountNumber: '****3456', routingNumber: '*****6789', isPrimary: true },
    { id: 2, bankName: 'Bank of America', accountNumber: '****7890', routingNumber: '*****1234', isPrimary: false }
  ]);
  
  const [newBankAccount, setNewBankAccount] = useState({
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    isPrimary: false
  });

  const [showAddBankForm, setShowAddBankForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBankInputChange = (e) => {
    const { name, value } = e.target;
    setNewBankAccount(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Saving settings:', formData);
    setEditMode(false);
  };

  const addBankAccount = (e) => {
    e.preventDefault();
    const newAccount = {
      ...newBankAccount,
      id: Date.now(),
      accountNumber: `****${newBankAccount.accountNumber.slice(-4)}`,
      routingNumber: `*****${newBankAccount.routingNumber.slice(-4)}`
    };
    setBankAccounts(prev => [...prev, newAccount]);
    setNewBankAccount({ bankName: '', accountNumber: '', routingNumber: '', isPrimary: false });
    setShowAddBankForm(false);
  };

  const setPrimaryAccount = (id) => {
    setBankAccounts(prev => 
      prev.map(account => ({
        ...account,
        isPrimary: account.id === id
      }))
    );
  };

  const deleteAccount = (id) => {
    setBankAccounts(prev => prev.filter(account => account.id !== id));
  };

  return (
    <div className="flex-1 p-4 md:p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('business')}
          className={`px-4 py-2 font-medium ${activeTab === 'business' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
        >
          {businessType === 'store' ? 'Store' : 'Hotel'} Details
        </button>
        <button
          onClick={() => setActiveTab('bank')}
          className={`px-4 py-2 font-medium ${activeTab === 'bank' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
        >
          Bank Accounts
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2 font-medium ${activeTab === 'security' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
        >
          Security
        </button>
      </div>

      {/* Business/Hotel Details Tab */}
      {activeTab === 'business' && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center">
              {businessType === 'store' ? <Store className="mr-2 h-5 w-5" /> : <Hotel className="mr-2 h-5 w-5" />}
              {businessType === 'store' ? 'Store' : 'Hotel'} Information
            </h2>
            {!editMode ? (
              <button 
                onClick={() => setEditMode(true)}
                className="flex items-center text-green-600 hover:text-green-800"
              >
                <Edit className="mr-1 h-4 w-4" /> Edit
              </button>
            ) : (
              <div className="flex space-x-2">
                <button 
                  onClick={handleSubmit}
                  className="flex items-center px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  <Check className="mr-1 h-4 w-4" /> Save
                </button>
                <button 
                  onClick={() => setEditMode(false)}
                  className="flex items-center px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  <X className="mr-1 h-4 w-4" /> Cancel
                </button>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {businessType === 'store' ? 'Store' : 'Hotel'} Name
                </label>
                {editMode ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    required
                  />
                ) : (
                  <p className="px-3 py-2 bg-gray-50 rounded-md">{formData.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                {editMode ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    required
                  />
                ) : (
                  <div className="flex items-center px-3 py-2 bg-gray-50 rounded-md">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    {formData.email}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                {editMode ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    required
                  />
                ) : (
                  <div className="flex items-center px-3 py-2 bg-gray-50 rounded-md">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    {formData.phone}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                {editMode ? (
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                ) : (
                  <div className="flex items-center px-3 py-2 bg-gray-50 rounded-md">
                    <Globe className="h-4 w-4 mr-2 text-gray-400" />
                    {formData.website}
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                {editMode ? (
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                ) : (
                  <p className="px-3 py-2 bg-gray-50 rounded-md">{formData.address}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                {editMode ? (
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                ) : (
                  <p className="px-3 py-2 bg-gray-50 rounded-md">{formData.description}</p>
                )}
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Bank Accounts Tab */}
      {activeTab === 'bank' && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center">
              <Banknote className="mr-2 h-5 w-5" />
              Bank Accounts
            </h2>
            <button 
              onClick={() => setShowAddBankForm(true)}
              className="flex items-center px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <Plus className="mr-1 h-4 w-4" /> Add Account
            </button>
          </div>

          {showAddBankForm && (
            <form onSubmit={addBankAccount} className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Add New Bank Account</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                  <input
                    type="text"
                    name="bankName"
                    value={newBankAccount.bankName}
                    onChange={handleBankInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={newBankAccount.accountNumber}
                    onChange={handleBankInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Routing Number</label>
                  <input
                    type="text"
                    name="routingNumber"
                    value={newBankAccount.routingNumber}
                    onChange={handleBankInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isPrimary"
                    checked={newBankAccount.isPrimary}
                    onChange={(e) => setNewBankAccount(prev => ({ ...prev, isPrimary: e.target.checked }))}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">Set as primary account</label>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddBankForm(false)}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Add Account
                </button>
              </div>
            </form>
          )}

          <div className="space-y-4">
            {bankAccounts.length === 0 ? (
              <p className="text-gray-500">No bank accounts added yet.</p>
            ) : (
              bankAccounts.map(account => (
                <div key={account.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">{account.bankName}</h3>
                      <p className="text-sm text-gray-600">Account: {account.accountNumber}</p>
                      <p className="text-sm text-gray-600">Routing: {account.routingNumber}</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      {account.isPrimary ? (
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Primary</span>
                      ) : (
                        <button
                          onClick={() => setPrimaryAccount(account.id)}
                          className="text-xs text-green-600 hover:text-green-800"
                        >
                          Make Primary
                        </button>
                      )}
                      <button
                        onClick={() => deleteAccount(account.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold flex items-center mb-6">
            <Lock className="mr-2 h-5 w-5" />
            Security Settings
          </h2>
          
          <div className="space-y-6">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium mb-2 flex items-center">
                <User className="mr-2 h-4 w-4" />
                Change Password
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Update Password
                </button>
              </form>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium mb-2 flex items-center">
                <CreditCard className="mr-2 h-4 w-4" />
                Two-Factor Authentication
              </h3>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm">
                  Enable
                </button>
              </div>
            </div>

            <div className="p-4 border border-red-200 rounded-lg bg-red-50">
              <h3 className="font-medium mb-2 text-red-800">Danger Zone</h3>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-red-700">Deactivate your account</p>
                  <p className="text-xs text-red-600">This will disable your account but preserve your data</p>
                </div>
                <button className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm">
                  Deactivate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;