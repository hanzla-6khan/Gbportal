import { useState } from 'react';
import { StarIcon, ShoppingBagIcon, BuildingOfficeIcon, CheckBadgeIcon, ArrowPathIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

const ReviewsPage = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [sortBy, setSortBy] = useState('newest');
  
  // Sample data - replace with your actual data
  const productReviews = [
    {
      id: 1,
      productName: 'Wireless Headphones',
      rating: 5,
      comment: 'Excellent sound quality and very comfortable to wear for long periods.',
      reviewer: 'Alex Johnson',
      date: '2023-05-15',
      verified: true
    },
    {
      id: 2,
      productName: 'Smart Watch',
      rating: 4,
      comment: 'Great features but battery life could be better.',
      reviewer: 'Sarah Miller',
      date: '2023-05-10',
      verified: true
    },
    {
      id: 3,
      productName: 'Bluetooth Speaker',
      rating: 3,
      comment: 'Sound is decent but not as loud as I expected.',
      reviewer: 'Mike Chen',
      date: '2023-04-28',
      verified: false
    }
  ];

  const hotelReviews = [
    {
      id: 1,
      roomType: 'Deluxe Suite',
      rating: 5,
      comment: 'Amazing stay! The room was spacious and the staff was very helpful.',
      reviewer: 'Emily Wilson',
      date: '2023-05-12',
      stayDate: '2023-05-08 to 2023-05-11'
    },
    {
      id: 2,
      roomType: 'Standard Room',
      rating: 4,
      comment: 'Comfortable bed and clean room. Would stay again.',
      reviewer: 'David Thompson',
      date: '2023-05-05',
      stayDate: '2023-05-01 to 2023-05-04'
    },
    {
      id: 3,
      roomType: 'Executive Suite',
      rating: 2,
      comment: 'Room wasn\'t as clean as expected for the price. Disappointing.',
      reviewer: 'Jessica Lee',
      date: '2023-04-20',
      stayDate: '2023-04-15 to 2023-04-19'
    }
  ];

  const sortedReviews = () => {
    const reviews = activeTab === 'products' ? productReviews : hotelReviews;
    
    return [...reviews].sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'highest') return b.rating - a.rating;
      if (sortBy === 'lowest') return a.rating - b.rating;
      return 0;
    });
  };

  const averageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className={`h-5 w-5 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-500">({rating})</span>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Customer Reviews</h1>
        <div className="mt-4 md:mt-0 flex items-center space-x-4">
          <div className="flex items-center">
            <label htmlFor="sort" className="mr-2 text-sm font-medium text-gray-700">Sort by:</label>
            <select
              id="sort"
              className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('products')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === 'products' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            <ShoppingBagIcon className="h-5 w-5 mr-2" />
            Product Reviews
            <span className="ml-2 bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
              {productReviews.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('hotel')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === 'hotel' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            <BuildingOfficeIcon className="h-5 w-5 mr-2" />
            Hotel Reviews
            <span className="ml-2 bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
              {hotelReviews.length}
            </span>
          </button>
        </nav>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Total Reviews</h3>
          <p className="text-3xl font-bold">
            {activeTab === 'products' ? productReviews.length : hotelReviews.length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Average Rating</h3>
          <div className="flex items-center">
            {renderStars(activeTab === 'products' ? averageRating(productReviews) : averageRating(hotelReviews))}
            <span className="ml-2 text-gray-500">
              ({activeTab === 'products' ? averageRating(productReviews) : averageRating(hotelReviews)}/5)
            </span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Recent Activity</h3>
          <p className="text-gray-600">
            Last review: {new Date(sortedReviews()[0]?.date).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {sortedReviews().length > 0 ? (
            sortedReviews().map((review) => (
              <li key={review.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                      {review.reviewer.charAt(0)}
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{review.reviewer}</p>
                        {activeTab === 'products' ? (
                          <p className="text-sm text-gray-500">
                            Reviewed {review.productName}
                            {review.verified && (
                              <span className="ml-2 inline-flex items-center text-xs text-green-600">
                                <CheckBadgeIcon className="h-4 w-4 mr-1" />
                                Verified Purchase
                              </span>
                            )}
                          </p>
                        ) : (
                          <p className="text-sm text-gray-500">
                            Stayed in {review.roomType} • {review.stayDate}
                          </p>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="mt-2">
                      {renderStars(review.rating)}
                      <p className="mt-1 text-gray-600">{review.comment}</p>
                    </div>
                    <div className="mt-4 flex space-x-4">
                      <button className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500">
                        <ChatBubbleLeftRightIcon className="h-5 w-5 mr-1" />
                        Reply
                      </button>
                      {activeTab === 'hotel' && (
                        <button className="inline-flex items-center text-sm text-gray-600 hover:text-gray-500">
                          <ArrowPathIcon className="h-5 w-5 mr-1" />
                          Request Update
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="p-6 text-center text-gray-500">
              No reviews found for {activeTab === 'products' ? 'products' : 'hotel'}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ReviewsPage;