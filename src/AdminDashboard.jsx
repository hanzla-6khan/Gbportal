import React, { useState, useEffect } from "react";
import Sidebar from "./admin/Sidebar/Sidebar";
import Header from "./admin/Header";
import Overview from "./admin/DashboardContent/Overview";
import Approvals from "./admin/DashboardContent/Approvals/Approvals";
import Products from "./admin/DashboardContent/Products";
import Hotels from "./admin/DashboardContent/Hotels/Hotels";
import Payments from "./admin/DashboardContent/Payments";
import Reviews from "./admin/DashboardContent/Reviews";
import Settings from "./admin/DashboardContent/Settings";
import RegisteredSellers from "./admin/DashboardContent/Registered/store/RegisteredSellers";
import RegisteredHotels from "./admin/DashboardContent/Registered/hotels/RegisteredHotels";
import axios from "axios";
import { ShoppingCart, DollarSign, CheckCircle } from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const [stats, setStats] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // ✅ Fetch dashboard data from backend
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        const [ordersRes] = await Promise.all([
          axios.get("http://localhost:5000/api/orders", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          // later you can also add stats, bookings, etc.
        ]);

        const orders = ordersRes.data || [];

        // ✅ Orders formatting for RecentOrders
        const formattedOrders = orders.map((order) => ({
          id: order._id,
          customer: order.user?.name || "Unknown",
          seller: order.items?.[0]?.product?.seller?.name || "N/A",
          date: order.createdAt,
          amount: `${order.totalPrice}`,
          status: order.status,
        }));

        setRecentOrders(formattedOrders);

        // ✅ Build Stats
        const totalOrders = orders.length;
        const totalRevenue = orders.reduce(
          (sum, o) => sum + (o.totalPrice || 0),
          0
        );
        const deliveredOrders = orders.filter(
          (o) => o.status?.toLowerCase() === "delivered"
        ).length;

        setStats([
          {
            title: "Total Orders",
            value: totalOrders,
            change: "+5% from last week",
            icon: <ShoppingCart />,
            changeType: "positive",
          },
          {
            title: "Revenue",
            value: `${totalRevenue}`,
            change: "+12% growth",
            icon: <DollarSign />,
            changeType: "positive",
          },
          {
            title: "Delivered Orders",
            value: deliveredOrders,
            change: `${Math.round(
              (deliveredOrders / (totalOrders || 1)) * 100
            )}% success`,
            icon: <CheckCircle />,
            changeType: "positive",
          },
        ]);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  // ✅ Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (isMobile) setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed md:static inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto min-w-0">
        <Header
          activeTab={activeTab}
          notifications={notifications}
          onMenuClick={toggleSidebar}
          isSidebarOpen={sidebarOpen}
        />

        <main className="p-4 md:p-6">
          {activeTab === "overview" && (
            <Overview
              stats={stats}
              recentOrders={recentOrders}
              upcomingBookings={upcomingBookings}
            />
          )}
          {activeTab === "approvals" && <Approvals />}
          {activeTab === "products" && <Products />}
          {activeTab === "registered-sellers" && <RegisteredSellers />}
          {activeTab === "registered-hotels" && <RegisteredHotels />}
          {activeTab === "hotels" && <Hotels />}
          {activeTab === "payments" && <Payments />}
          {activeTab === "reviews" && <Reviews />}
          {activeTab === "settings" && <Settings />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
