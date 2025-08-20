import React from "react";
import { Package, Plus, Calendar, List, Edit, Trash2 } from "lucide-react";

const AllProductsPage = () => {
  const products = [
    {
      id: 1,
      name: "Premium Olive Oil",
      image: "https://example.com/oil.jpg",
      price: "$300",
      status: "Active",
      description: "Cold-pressed extra virgin olive oil from Italy",
      category: "Groceries",
      location: "Warehouse A",
      stock: 150,
      date: "Mon Aug 11 2025"
    },
    {
      id: 2,
      name: "Organic Honey",
      image: "https://example.com/honey.jpg",
      price: "$15",
      status: "Active",
      description: "Pure organic honey from local beekeepers",
      category: "Groceries",
      location: "Warehouse B",
      stock: 85,
      date: "Tue Aug 12 2025"
    }
  ];

  return (
    <div className="bg-white m-8 rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-800 flex items-center">
              <Package className="h-6 w-6 mr-2 text-green-600" />
              All Products
            </h1>
            <p className="text-gray-500 mt-1">We found {products.length} items for you!</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              <Calendar className="h-4 w-4 mr-2" />
              Date, new to old
            </button>
            <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add product
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              <List className="h-4 w-4 mr-2" />
              Show all
            </button>
          </div>
        </div>
      </div>

      {/* Products List */}
      <div className="divide-y divide-gray-200">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="p-6 hover:bg-gray-50">
              <div className="flex flex-col gap-4">
                {/* First Row - Basic Info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      {product.image && (
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-12 h-12 rounded-md object-cover"
                        />
                      )}
                      <div>
                        <h3 className="font-medium text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.date}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium">{product.price}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}>
                      {product.status}
                    </span>
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Second Row - Additional Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div>
                    <p className="font-medium">Description</p>
                    <p>{product.description}</p>
                  </div>
                  <div>
                    <p className="font-medium">Category</p>
                    <p>{product.category}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">Location</p>
                      <p>{product.location}</p>
                    </div>
                    <div>
                      <p className="font-medium">Stock</p>
                      <p>{product.stock} units</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-gray-500">
            No More Products!
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProductsPage;