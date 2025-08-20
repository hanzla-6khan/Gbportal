import React, { useState } from 'react';
import { Bed, Plus, Search, Filter, Edit, Trash2, ChevronDown, ChevronUp, Star, MapPin, Users, Home } from 'lucide-react';

const HotelRoomsPage = () => {
  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: "Deluxe Ocean View",
      image: "https://example.com/room1.jpg",
      status: "Available",
      type: "Double",
      capacity: 2,
      price: "$250/night",
      location: "Floor 3, Wing A",
      amenities: ["WiFi", "AC", "TV", "Mini-bar"],
      description: "Spacious room with king bed and ocean view",
      featured: true
    },
    {
      id: 2,
      name: "Executive Suite",
      image: "https://example.com/room2.jpg",
      status: "Occupied",
      type: "Suite",
      capacity: 4,
      price: "$450/night",
      location: "Floor 5, Wing B",
      amenities: ["WiFi", "AC", "TV", "Kitchenette", "Jacuzzi"],
      description: "Luxury suite with separate living area",
      featured: false
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    type: "",
    featured: ""
  });
  const [expandedRoom, setExpandedRoom] = useState(null);
  const [showAddRoom, setShowAddRoom] = useState(false);

  const toggleExpand = (id) => {
    setExpandedRoom(expandedRoom === id ? null : id);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         room.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filters.status ? room.status === filters.status : true;
    const matchesType = filters.type ? room.type === filters.type : true;
    const matchesFeatured = filters.featured ? 
                          (filters.featured === "featured" ? room.featured : !room.featured) : true;
    
    return matchesSearch && matchesStatus && matchesType && matchesFeatured;
  });

  const deleteRoom = (id) => {
    setRooms(rooms.filter(room => room.id !== id));
  };

  const toggleFeatured = (id) => {
    setRooms(rooms.map(room => 
      room.id === id ? { ...room, featured: !room.featured } : room
    ));
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-800 flex items-center">
                <Bed className="h-6 w-6 mr-2 text-indigo-600" />
                Rooms Management
              </h1>
              <p className="text-gray-500 mt-1">Manage all rooms in your property</p>
            </div>
            <button 
              onClick={() => setShowAddRoom(true)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Room
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search rooms..."
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="flex items-center gap-3">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Statuses</option>
                <option value="Available">Available</option>
                <option value="Occupied">Occupied</option>
                <option value="Maintenance">Maintenance</option>
              </select>
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Types</option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Suite">Suite</option>
              </select>
              <select
                name="featured"
                value={filters.featured}
                onChange={handleFilterChange}
                className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Rooms</option>
                <option value="featured">Featured</option>
                <option value="regular">Regular</option>
              </select>
            </div>
          </div>
        </div>

        {/* Rooms List */}
        <div className="divide-y divide-gray-200">
          {filteredRooms.length > 0 ? (
            filteredRooms.map(room => (
              <div key={room.id} className="p-6 hover:bg-gray-50">
                <div className="flex flex-col gap-4">
                  {/* Room Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        {room.image && (
                          <img 
                            src={room.image} 
                            alt={room.name} 
                            className="w-16 h-16 rounded-md object-cover"
                          />
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-gray-900">{room.name}</h3>
                            {room.featured && (
                              <span className="flex items-center text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                                <Star className="h-3 w-3 mr-1" />
                                Featured
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <span className="flex items-center text-xs text-gray-500">
                              <Home className="h-3 w-3 mr-1" />
                              {room.type}
                            </span>
                            <span className="flex items-center text-xs text-gray-500">
                              <Users className="h-3 w-3 mr-1" />
                              {room.capacity} {room.capacity > 1 ? 'guests' : 'guest'}
                            </span>
                            <span className="flex items-center text-xs text-gray-500">
                              <MapPin className="h-3 w-3 mr-1" />
                              {room.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-medium">{room.price}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        room.status === "Available" ? "bg-green-100 text-green-800" : 
                        room.status === "Occupied" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"
                      }`}>
                        {room.status}
                      </span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => toggleFeatured(room.id)}
                          className={`p-2 rounded-full ${room.featured ? 'text-yellow-500 hover:bg-yellow-50' : 'text-gray-400 hover:bg-gray-50'}`}
                        >
                          <Star className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full">
                          <Edit className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => deleteRoom(room.id)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => toggleExpand(room.id)}
                          className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                        >
                          {expandedRoom === room.id ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedRoom === room.id && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <p className="font-medium">Description</p>
                        <p>{room.description}</p>
                      </div>
                      <div>
                        <p className="font-medium">Amenities</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {room.amenities.map((amenity, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 rounded-md text-xs">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium">Location</p>
                          <p>{room.location}</p>
                        </div>
                        <div>
                          <p className="font-medium">Status</p>
                          <p>{room.status}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              No rooms found matching your criteria
            </div>
          )}
        </div>
      </div>

      {/* Add Room Modal */}
      {showAddRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                <h2 className="text-xl font-bold text-gray-800">Add New Room</h2>
                <button 
                  onClick={() => setShowAddRoom(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <form className="mt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Room Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                      placeholder="Deluxe Ocean View"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500">
                      <option value="">Select type</option>
                      <option value="Single">Single</option>
                      <option value="Double">Double</option>
                      <option value="Suite">Suite</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                      placeholder="2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price per Night</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                      placeholder="$250"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500">
                      <option value="Available">Available</option>
                      <option value="Occupied">Occupied</option>
                      <option value="Maintenance">Maintenance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    placeholder="Room description..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    placeholder="Floor 3, Wing A"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
                  <div className="flex flex-wrap gap-2">
                    {['WiFi', 'AC', 'TV', 'Mini-bar', 'Jacuzzi', 'Kitchenette'].map(amenity => (
                      <label key={amenity} className="inline-flex items-center">
                        <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" />
                        <span className="ml-2 text-sm text-gray-700">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Room Image</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <div className="flex text-sm text-gray-600 justify-center">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                          <span>Upload image</span>
                          <input type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddRoom(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
                  >
                    Save Room
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelRoomsPage;