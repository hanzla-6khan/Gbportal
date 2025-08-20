import React, { useState } from "react";
import {
  Home,
  ShoppingCart,
  Package,
  Hotel,
  DollarSign,
  MessageSquare,
  Settings,
  User,
  Menu,
  ChevronDown,
  X,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Bed,
  CalendarCheck,
  Layers
} from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import AllProductsPage from "./seller/pages/AllProductsPage";
import AddProductPage from "./seller/pages/AddProductPage";
import RevenuePage from "./seller/pages/RevenuePage";
import HotelRoomsPage from "./seller/pages/HotelRoomsPage";
import BookedRoomsPage from "./BookedRoomsPage"; // Make sure path is correct
import DashboardSidebar from "./component/DashboardSidebar";
import DashboardPage from "./seller/pages/DashboardPage";
import OrdersPage from "./seller/pages/OrdersPage";
import ReviewsPage from "./seller/pages/Review";
import Payments from "./seller/pages/Payments";
import  SettingsPage  from "./seller/pages/SettingsPage";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function SellerAdmin() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-0 md:ml-64">
       {activePage === "dashboard" ? (
  <DashboardPage />
) : activePage === "orders" ? (
  <div className="flex-1 p-4 md:p-8">
    <OrdersPage />
  </div>
) : activePage === "hotels-rooms" ? (
  <HotelRoomsPage />
) : activePage === "hotels-booked-rooms" ? (
  <BookedRoomsPage />
) : activePage === "hotels-room-revenue" ? (
  <RevenuePage />
) : activePage === "products-all-products" ? (
  <AllProductsPage />
) : activePage === "products-add-product" ? (
  <AddProductPage />
) : activePage === "reviews" ? (        
  <ReviewsPage />
) : activePage === "Payments" ? (        
  <Payments />

)
: activePage === "settings" ? (        
  <SettingsPage />
  ///businessType={userType === 'product' ? 'store' : 'hotel'} />
)
: 
(
  <DashboardPage />
)}

      </div>
    </div>
  );
}
