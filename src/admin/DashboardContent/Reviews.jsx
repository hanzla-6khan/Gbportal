import { useState, useEffect } from 'react';
import { FiStar, FiFilter, FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Reviews = () => {
  // State management
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTab, setCurrentTab] = useState('all'); // 'all', 'products', 'hotels'
  const [ratingFilter, setRatingFilter] = useState(0); // 0 = all, 1-5 for specific ratings
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 10;

  // Generate mock data
  useEffect(() => {
    const generateMockData = () => {
      const mockReviews = [];
      
      // Generate product reviews
      const productStores = ['Tech Haven', 'Fashion Plus', 'Home Essentials', 'Gadget World', 'Book Nook'];
      const productCategories = ['Electronics', 'Clothing', 'Home', 'Accessories', 'Books'];
      
      for (let i = 0; i < 30; i++) {
        const rating = Math.floor(Math.random() * 5) + 1;
        mockReviews.push({
          id: `product-review-${i}`,
          type: 'product',
          storeName: productStores[i % 5],
          productName: `Product ${i + 100}`,
          category: productCategories[i % 5],
          reviewerName: `Customer ${i + 1}`,
          rating: rating,
          comment: [
            'Great product, very satisfied with my purchase!',
            'Not as described, disappointed with the quality',
            'Fast shipping and good packaging',
            'The product stopped working after a week',
            'Exactly what I was looking for',
            'Average product, nothing special',
            'Highly recommend this to everyone',
            'Customer service was terrible',
            'Better than expected for the price',
            'Would buy again from this store'
          ][i % 10],
          date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
          images: Math.random() > 0.7 ? [`https://picsum.photos/200/300?random=${i}`] : []
        });
      }
      
      // Generate hotel reviews
      const hotelNames = ['Grand Plaza Hotel', 'Sunset Inn', 'Ocean View Resort', 'Mountain Lodge', 'City Tower'];
      const locations = ['New York', 'Paris', 'Tokyo', 'Dubai', 'London'];
      
      for (let i = 0; i < 30; i++) {
        const rating = Math.floor(Math.random() * 5) + 1;
        mockReviews.push({
          id: `hotel-review-${i}`,
          type: 'hotel',
          hotelName: hotelNames[i % 5],
          location: locations[i % 5],
          reviewerName: `Guest ${i + 1}`,
          rating: rating,
          comment: [
            'Excellent service and comfortable rooms',
            'The room was not clean when we arrived',
            'Amazing view from the balcony',
            'Breakfast buffet was disappointing',
            'Staff were very friendly and helpful',
            'Noisy construction nearby ruined our stay',
            'Perfect location for sightseeing',
            'Overpriced for what you get',
            'Will definitely come back again',
            'The pool area needs maintenance'
          ][i % 10],
          date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
          stayDate: `2023-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
          images: Math.random() > 0.5 ? [
            `https://picsum.photos/300/200?random=${i}1`,
            `https://picsum.photos/300/200?random=${i}2`
          ] : []
        });
      }
      
      // Shuffle reviews
      setReviews(mockReviews.sort(() => Math.random() - 0.5));
      setLoading(false);
    };

    setLoading(true);
    setTimeout(generateMockData, 1000);
  }, []);

  // Filter reviews based on search, tab, and rating
  const filteredReviews = reviews.filter(review => {
    // Tab filter
    if (currentTab !== 'all' && review.type !== currentTab) return false;
    
    // Rating filter
    if (ratingFilter > 0 && review.rating !== ratingFilter) return false;
    
    // Search term
    const searchLower = searchTerm.toLowerCase();
    if (review.type === 'product') {
      return (
        review.storeName.toLowerCase().includes(searchLower) ||
        review.productName.toLowerCase().includes(searchLower) ||
        review.reviewerName.toLowerCase().includes(searchLower) ||
        review.comment.toLowerCase().includes(searchLower)
      );
    } else {
      return (
        review.hotelName.toLowerCase().includes(searchLower) ||
        review.location.toLowerCase().includes(searchLower) ||
        review.reviewerName.toLowerCase().includes(searchLower) ||
        review.comment.toLowerCase().includes(searchLower)
      );
    }
  });

  // Pagination
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  // Render star rating
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar 
            key={star}
            className={`${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Reviews Management</h1>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
              <button
                onClick={() => setCurrentTab('all')}
                className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${currentTab === 'all' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
              >
                All Reviews
              </button>
              <button
                onClick={() => setCurrentTab('product')}
                className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${currentTab === 'product' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
              >
                Product Reviews
              </button>
              <button
                onClick={() => setCurrentTab('hotel')}
                className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${currentTab === 'hotel' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
              >
                Hotel Reviews
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Filter by rating:</span>
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(Number(e.target.value))}
                className="border rounded-md p-2 text-sm bg-white"
              >
                <option value={0}>All Ratings</option>
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={2}>2 Stars</option>
                <option value={1}>1 Star</option>
              </select>
              <button className="p-2 bg-gray-100 rounded-md">
                <FiFilter className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm font-medium text-gray-500">Total Reviews</p>
            <p className="text-2xl font-bold">{filteredReviews.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm font-medium text-gray-500">Average Rating</p>
            <div className="flex items-center">
              <p className="text-2xl font-bold mr-2">
                {(filteredReviews.reduce((sum, review) => sum + review.rating, 0) / (filteredReviews.length || 1)).toFixed(1)}
              </p>
              <FiStar className="text-yellow-400 fill-yellow-400" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm font-medium text-gray-500">Product Reviews</p>
            <p className="text-2xl font-bold">{filteredReviews.filter(r => r.type === 'product').length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm font-medium text-gray-500">Hotel Reviews</p>
            <p className="text-2xl font-bold">{filteredReviews.filter(r => r.type === 'hotel').length}</p>
          </div>
        </div>

        {/* Reviews Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            </div>
          ) : filteredReviews.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No reviews found matching your criteria
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {currentReviews.map((review) => (
                <div key={review.id} className="p-4 hover:bg-gray-50">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                        {review.reviewerName.charAt(0)}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{review.reviewerName}</h3>
                          <div className="flex items-center mt-1">
                            {renderStars(review.rating)}
                            <span className="ml-2 text-sm text-gray-500">
                              {review.date.toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        {review.type === 'product' ? (
                          <div className="mt-2 md:mt-0">
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                              {review.category}
                            </span>
                            <p className="text-sm font-medium text-gray-900 mt-1">
                              {review.productName} at {review.storeName}
                            </p>
                          </div>
                        ) : (
                          <div className="mt-2 md:mt-0">
                            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                              Stayed on {review.stayDate}
                            </span>
                            <p className="text-sm font-medium text-gray-900 mt-1">
                              {review.hotelName}, {review.location}
                            </p>
                          </div>
                        )}
                      </div>
                      <p className="mt-2 text-gray-600">{review.comment}</p>
                      {review.images.length > 0 && (
                        <div className="mt-3 flex space-x-2">
                          {review.images.map((img, idx) => (
                            <img
                              key={idx}
                              src={img}
                              alt="Review"
                              className="h-20 w-20 rounded-md object-cover border border-gray-200"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{indexOfFirstReview + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(indexOfLastReview, filteredReviews.length)}</span> of{' '}
                    <span className="font-medium">{filteredReviews.length}</span> reviews
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Previous</span>
                      <FiChevronLeft className="h-5 w-5" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium 
                          ${currentPage === page ? 'z-10 bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Next</span>
                      <FiChevronRight className="h-5 w-5" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;