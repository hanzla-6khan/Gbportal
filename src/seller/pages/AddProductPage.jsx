import React, { useState } from 'react';
import { Plus, Image, Package, DollarSign, Tag, AlignLeft, Box, MapPin, ChevronDown, X, Star } from 'lucide-react';

const AddProductPage = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    location: '',
    images: []
  });

  const [activeTab, setActiveTab] = useState('basic');
  const [previewImages, setPreviewImages] = useState([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const categories = ['Electronics', 'Clothing', 'Groceries', 'Home & Garden', 'Beauty', 'Sports'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPreviewImages = files.map(file => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...newPreviewImages]);
  };

  const removeImage = (index) => {
    const updatedImages = [...previewImages];
    updatedImages.splice(index, 1);
    setPreviewImages(updatedImages);
    if (mainImageIndex === index) setMainImageIndex(0);
    else if (mainImageIndex > index) setMainImageIndex(mainImageIndex - 1);
  };

  const setAsMainImage = (index) => {
    setMainImageIndex(index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product submitted:', product);
  };

  return (
    <div className="w-full p-6 bg-white rounded-xl shadow-sm h-full">
      <div className="flex items-center mb-8">
        <Package className="h-6 w-6 text-indigo-600 mr-2" />
        <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 mb-6 w-full">
        <button
          onClick={() => setActiveTab('basic')}
          className={`px-4 py-2 font-medium text-sm flex items-center ${activeTab === 'basic' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
        >
          <AlignLeft className="h-4 w-4 mr-2" />
          Basic Info
        </button>
        <button
          onClick={() => setActiveTab('media')}
          className={`px-4 py-2 font-medium text-sm flex items-center ${activeTab === 'media' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
        >
          <Image className="h-4 w-4 mr-2" />
          Media
        </button>
        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-4 py-2 font-medium text-sm flex items-center ${activeTab === 'inventory' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
        >
          <Box className="h-4 w-4 mr-2" />
          Inventory
        </button>
      </div>

      <form onSubmit={handleSubmit} className="w-full">
        {/* Basic Info Tab */}
        {activeTab === 'basic' && (
          <div className="space-y-6 w-full">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. Premium Wireless Headphones"
                required
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Detailed product description..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    className="pl-8 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <div className="relative w-full">
                  <select
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-8"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Media Tab */}
        {activeTab === 'media' && (
          <div className="space-y-6 w-full">
            {/* Main Image Section */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">Main Product Image</label>
              {previewImages.length > 0 ? (
                <div className="relative w-full h-64 bg-gray-100 rounded-md overflow-hidden">
                  <img
                    src={previewImages[mainImageIndex]}
                    alt="Main product"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute top-2 right-2 bg-indigo-600 text-white rounded-full px-2 py-1 text-xs flex items-center">
                    <Star className="h-3 w-3 mr-1" />
                    Main
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center w-full h-64 bg-gray-100 rounded-md border-2 border-dashed border-gray-300">
                  <p className="text-gray-500">Upload images to set main image</p>
                </div>
              )}
            </div>

            {/* Supporting Images Section */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">Supporting Images (3 max)</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[0, 1, 2].map((index) => (
                  <div key={index} className="relative w-full h-40 bg-gray-100 rounded-md overflow-hidden">
                    {previewImages[index + 1] ? (
                      <>
                        <img
                          src={previewImages[index + 1]}
                          alt={`Supporting ${index}`}
                          className="w-full h-full object-contain"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index + 1)}
                          className="absolute top-2 right-2 bg-gray-800 bg-opacity-75 text-white rounded-full p-1"
                        >
                          <X className="h-3 w-3" />
                        </button>
                        {index + 1 !== mainImageIndex && (
                          <button
                            type="button"
                            onClick={() => setAsMainImage(index + 1)}
                            className="absolute bottom-2 right-2 bg-white text-indigo-600 rounded-full px-2 py-1 text-xs flex items-center shadow-sm"
                          >
                            Set as main
                          </button>
                        )}
                      </>
                    ) : (
                      <div className="flex justify-center items-center w-full h-full border-2 border-dashed border-gray-300">
                        <p className="text-gray-500 text-sm">Image {index + 1}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Upload Section */}
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md w-full">
                <div className="space-y-1 text-center">
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                      <span>Upload images</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Inventory Tab */}
        {activeTab === 'inventory' && (
          <div className="space-y-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                <input
                  type="number"
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="100"
                  min="0"
                  required
                />
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="location"
                    value={product.location}
                    onChange={handleChange}
                    className="pl-8 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Warehouse A"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">SKU (Optional)</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="PROD-12345"
              />
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-between border-t border-gray-200 pt-6 w-full">
          {activeTab !== 'basic' && (
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === 'media' ? 'basic' : 'media')}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
          )}
          
          {activeTab !== 'inventory' ? (
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === 'basic' ? 'media' : 'inventory')}
              className="ml-auto px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              className="ml-auto px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
            >
              Save Product
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;