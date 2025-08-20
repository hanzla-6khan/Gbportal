import React, { useState } from 'react';
import { 
  Bed, Plus, Image, DollarSign, MapPin, Users, Home, Star, Wifi, Tv, Coffee, Snowflake, Bath, CookingPot, X, ChevronDown 
} from 'lucide-react';

const BookedRoomsPage = () => {
  const [room, setRoom] = useState({
    name: '',
    type: '',
    capacity: '',
    price: '',
    status: 'Available',
    description: '',
    location: '',
    amenities: [],
    images: []
  });

  const [previewImages, setPreviewImages] = useState([]);

  const roomTypes = ['Single', 'Double', 'Twin', 'Queen', 'King', 'Suite', 'Executive Suite', 'Presidential Suite'];
  const amenityOptions = [
    { name: 'WiFi', icon: <Wifi className="h-4 w-4" /> },
    { name: 'TV', icon: <Tv className="h-4 w-4" /> },
    { name: 'AC', icon: <Snowflake className="h-4 w-4" /> },
    { name: 'Coffee Maker', icon: <Coffee className="h-4 w-4" /> },
    { name: 'Private Bathroom', icon: <Bath className="h-4 w-4" /> },
    { name: 'Kitchenette', icon: <CookingPot className="h-4 w-4" /> }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoom(prev => ({ ...prev, [name]: value }));
  };

  const handleAmenityToggle = (amenity) => {
    setRoom(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Room submitted:', { ...room, images: previewImages });
    // Add your submission logic here
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4">
      {/* <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden"> */}
        <div className="w-full bg-white rounded-xl shadow-sm overflow-hidden px-4 md:px-8">

        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-800 flex items-center">
                <Bed className="h-6 w-6 mr-2 text-indigo-600" />
                Add New Room
              </h1>
              <p className="text-gray-500 mt-1">Fill in the details to add a new room to your property</p>
            </div>
          </div>
        </div>

        {/* Room Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Home className="h-5 w-5 mr-2 text-indigo-500" />
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Room Name</label>
                  <input
                    type="text"
                    name="name"
                    value={room.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    placeholder="Deluxe Ocean View"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
                  <div className="relative">
                    <select
                      name="type"
                      value={room.type}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 appearance-none"
                      required
                    >
                      <option value="">Select room type</option>
                      {roomTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <ChevronDown className="h-4 w-4 absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                  <input
                    type="number"
                    name="capacity"
                    value={room.capacity}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    placeholder="2"
                    min="1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price per Night</label>
                  <div className="relative">
                    <DollarSign className="h-4 w-4 absolute left-3 top-2.5 text-gray-400" />
                    <input
                      type="text"
                      name="price"
                      value={room.price}
                      onChange={handleChange}
                      className="w-full pl-8 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                      placeholder="250.00"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={room.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <div className="relative">
                    <MapPin className="h-4 w-4 absolute left-3 top-2.5 text-gray-400" />
                    <input
                      type="text"
                      name="location"
                      value={room.location}
                      onChange={handleChange}
                      className="w-full pl-8 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                      placeholder="Floor 3, Wing A"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={room.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                  placeholder="Describe the room features and view..."
                  required
                />
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Star className="h-5 w-5 mr-2 text-indigo-500" />
                Amenities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {amenityOptions.map((amenity) => (
                  <label
                    key={amenity.name}
                    className={`flex items-center p-3 border rounded-md cursor-pointer ${
                      room.amenities.includes(amenity.name)
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                      checked={room.amenities.includes(amenity.name)}
                      onChange={() => handleAmenityToggle(amenity.name)}
                    />
                    <span className="ml-2 flex items-center">
                      {amenity.icon}
                      <span className="ml-2 text-sm text-gray-700">{amenity.name}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Room Images */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Image className="h-5 w-5 mr-2 text-indigo-500" />
                Room Images
              </h2>
              <div className="space-y-4">
                {previewImages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {previewImages.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img}
                          alt={`Preview ${index}`}
                          className="h-32 w-full object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-gray-800 bg-opacity-75 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <Image className="h-10 w-10 text-gray-400 mb-2" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500">
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
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB each</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Room
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookedRoomsPage;
