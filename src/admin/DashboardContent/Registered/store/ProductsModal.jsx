import React, { useState } from "react";
import {
  FiEdit2,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiBox,
  FiDollarSign,
  FiArchive,
  FiHash,
  FiTag
} from "react-icons/fi";

// ✅ Modern Edit Product Modal Component
const EditProductModal = ({ isOpen, product, onClose, onSave }) => {
  const [formData, setFormData] = useState(product || {});

  React.useEffect(() => {
    setFormData(product || {});
  }, [product]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 overflow-y-auto z-50 backdrop-blur-2xl bg-opacity-40 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Edit Product</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiDollarSign className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  name="price"
                  value={formData.price || ""}
                  onChange={handleChange}
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiHash className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock || ""}
                  onChange={handleChange}
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={formData.status || "Draft"}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
              <option value="Archived">Archived</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors focus:ring-2 focus:ring-gray-400 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ✅ Modern Main Products Modal
const ProductsModal = ({
  isOpen,
  onClose,
  seller,
  products,
  loading,
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  onEditProduct,
  onDeleteProduct,
}) => {
  const [editingProduct, setEditingProduct] = useState(null);

  if (!isOpen) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <>
      <div className="fixed inset-0 overflow-y-auto z-40 backdrop-blur-2xl bg-opacity-40 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center">
              <FiBox className="text-gray-700 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Products by {seller?.name}
                </h3>
                <p className="text-sm text-gray-500">{seller?.email}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-lg hover:bg-gray-100"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-6">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <FiBox className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-4 text-lg font-medium text-gray-700">No products found</h3>
                <p className="mt-1 text-sm text-gray-500">This seller hasn't added any products yet.</p>
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden md:block overflow-hidden rounded-lg border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stock
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products.map((product) => (
                        <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {product.category}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            ${product.price}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {product.stock}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2.5 py-1 inline-flex text-xs leading-4 font-medium rounded-full 
                                ${
                                  product.status === "Published"
                                    ? "bg-green-100 text-green-800"
                                    : product.status === "Draft"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                            >
                              {product.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right text-sm font-medium">
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                onClick={() => setEditingProduct(product)}
                                className="text-blue-600 hover:text-blue-800 transition-colors p-1.5 rounded-md hover:bg-gray-100"
                                title="Edit product"
                              >
                                <FiEdit2 size={16} />
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm("Are you sure you want to delete this product?")) {
                                    onDeleteProduct(product._id);
                                  }
                                }}
                                className="text-red-600 hover:text-red-800 transition-colors p-1.5 rounded-md hover:bg-gray-100"
                                title="Delete product"
                              >
                                <FiTrash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-3">
                  {products.map((product) => (
                    <div key={product._id} className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">{product.name}</h4>
                          <p className="text-xs text-gray-500 mt-1">{product.category}</p>
                          
                          <div className="flex items-center mt-3 space-x-4">
                            <div className="flex items-center">
                              <FiDollarSign className="h-3.5 w-3.5 text-gray-400 mr-1" />
                              <span className="text-sm font-medium text-gray-700">${product.price}</span>
                            </div>
                            
                            <div className="flex items-center">
                              <FiHash className="h-3.5 w-3.5 text-gray-400 mr-1" />
                              <span className="text-sm text-gray-600">{product.stock}</span>
                            </div>
                            
                            <span
                              className={`px-2 py-0.5 text-xs font-medium rounded-full 
                                ${
                                  product.status === "Published"
                                    ? "bg-green-100 text-green-800"
                                    : product.status === "Draft"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                            >
                              {product.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-1 ml-2">
                          <button
                            onClick={() => setEditingProduct(product)}
                            className="text-blue-600 hover:text-blue-800 p-1.5 rounded-md hover:bg-gray-100"
                            title="Edit product"
                          >
                            <FiEdit2 size={14} />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm("Are you sure you want to delete this product?")) {
                                onDeleteProduct(product._id);
                              }
                            }}
                            className="text-red-600 hover:text-red-800 p-1.5 rounded-md hover:bg-gray-100"
                            title="Delete product"
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Footer with Pagination */}
          {products.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startItem}</span> to{" "}
                  <span className="font-medium">{endItem}</span> of{" "}
                  <span className="font-medium">{totalItems}</span> products
                </div>
                
                {totalPages > 1 && (
                  <nav className="flex items-center space-x-2">
                    <button
                      onClick={() => onPageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-1.5 text-gray-500 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FiChevronLeft size={16} />
                    </button>
                    
                    <span className="text-sm text-gray-700">
                      Page {currentPage} of {totalPages}
                    </span>
                    
                    <button
                      onClick={() => onPageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-1.5 text-gray-500 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FiChevronRight size={16} />
                    </button>
                  </nav>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <EditProductModal
        isOpen={!!editingProduct}
        product={editingProduct}
        onClose={() => setEditingProduct(null)}
        onSave={(updatedProduct) => {
          onEditProduct(updatedProduct);
          setEditingProduct(null);
        }}
      />
    </>
  );
};

export default ProductsModal;