import React, { useState, useEffect } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { Search, Filter, ShoppingCart, Heart, Star, Eye, Package } from 'lucide-react';

const UserProducts = () => {
    const { products, isLoading } = useProducts();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

    // Filter and search products
    const filteredProducts = products
        .filter(product => {
            const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name?.localeCompare(b.name);
                case 'price-low':
                    return (a.price || 0) - (b.price || 0);
                case 'price-high':
                    return (b.price || 0) - (a.price || 0);
                case 'rating':
                    return (b.rating || 0) - (a.rating || 0);
                default:
                    return 0;
            }
        });

    // Get unique categories
    const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];

    const handleAddToCart = (product) => {
        // TODO: Implement add to cart functionality
        console.log('Adding to cart:', product);
    };

    const handleAddToWishlist = (product) => {
        // TODO: Implement add to wishlist functionality
        console.log('Adding to wishlist:', product);
    };

    const handleQuickView = (product) => {
        // TODO: Implement quick view modal
        console.log('Quick view:', product);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Browse Products</h1>
                    <p className="text-gray-600">Discover and shop for amazing products</p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="lg:w-48">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Sort */}
                    <div className="lg:w-48">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="name">Sort by Name</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Sort by Rating</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                    <Package className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
                    <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
                </div>
            ) : (
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
                    {filteredProducts.map((product) => (
                        <div
                            key={product._id}
                            className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow ${viewMode === 'list' ? 'flex' : ''
                                }`}
                        >
                            {/* Product Image */}
                            <div className={`${viewMode === 'list' ? 'w-32 h-32 flex-shrink-0' : 'w-full h-48'} bg-gray-200`}>
                                {product.image ? (
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                        <Package className="h-12 w-12 text-gray-400" />
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                        <span className="text-sm text-gray-600">{product.rating || 'N/A'}</span>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-lg font-bold text-gray-900">
                                        ${product.price?.toFixed(2) || '0.00'}
                                    </span>
                                    {product.originalPrice && product.originalPrice > product.price && (
                                        <span className="text-sm text-gray-500 line-through">
                                            ${product.originalPrice.toFixed(2)}
                                        </span>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <ShoppingCart className="h-4 w-4" />
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={() => handleAddToWishlist(product)}
                                        className="p-2 text-gray-600 hover:text-red-600 transition-colors border border-gray-300 rounded-md hover:border-red-300"
                                    >
                                        <Heart className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => handleQuickView(product)}
                                        className="p-2 text-gray-600 hover:text-blue-600 transition-colors border border-gray-300 rounded-md hover:border-blue-300"
                                    >
                                        <Eye className="h-4 w-4" />
                                    </button>
                                </div>

                                {/* Additional Info for List View */}
                                {viewMode === 'list' && (
                                    <div className="mt-3 pt-3 border-t border-gray-200">
                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                            <span>Category: {product.category || 'N/A'}</span>
                                            <span>Stock: {product.stock || 'N/A'}</span>
                                            <span>Seller: {product.seller?.name || 'N/A'}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Load More Button */}
            {filteredProducts.length > 0 && (
                <div className="text-center">
                    <button className="bg-gray-100 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-200 transition-colors">
                        Load More Products
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserProducts; 