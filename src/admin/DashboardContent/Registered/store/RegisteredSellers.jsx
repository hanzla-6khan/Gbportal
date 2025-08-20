import { useState, useEffect } from "react";
import axios from "axios";
import SellerStats from "./SellerStats";
import SearchBar from "./SearchBar";
import SellerTable from "./SellerTable";
import ProductsModal from "./ProductsModal";
import EditProductModal from "./EditProductModal";

const RegisteredSellers = () => {
  // State management
  const [sellers, setSellers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPage, setProductsPage] = useState(1);
  const sellersPerPage = 8;
  const productsPerPage = 5;
  const [loading, setLoading] = useState({
    sellers: false,
    products: false,
  });

  // ✅ Fetch sellers from backend
  useEffect(() => {
    const fetchSellers = async () => {
      setLoading(prev => ({ ...prev, sellers: true }));
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/admin/sellers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSellers(res.data || []);
      } catch (error) {
        console.error("Error fetching sellers:", error);
        setSellers([]);
      } finally {
        setLoading(prev => ({ ...prev, sellers: false }));
      }
    };

    fetchSellers();
  }, []);

  // ✅ Fetch products for a seller
  const viewProducts = async (sellerId) => {
    setSelectedSeller(sellers.find(s => s._id === sellerId));
    setIsProductModalOpen(true);
    setProductsPage(1);

    setLoading(prev => ({ ...prev, products: true }));
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:5000/api/products?seller=${sellerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(prev => ({ ...prev, products: false }));
    }
  };

  // ✅ Delete product
 const deleteProduct = async (productId) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:5000/api/admin/products/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProducts(prev => prev.filter(p => p._id !== productId));
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};


  // ✅ Edit product
  const editProduct = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  // ✅ Save updated product
  const saveProduct = async (updatedProduct) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/products/${updatedProduct._id}`,
        updatedProduct,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts(prev => prev.map(p => (p._id === updatedProduct._id ? res.data : p)));
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // 🔍 Filter sellers
  const filteredSellers = sellers.filter(
    seller =>
      seller.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seller.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination for sellers
  const indexOfLastSeller = currentPage * sellersPerPage;
  const indexOfFirstSeller = indexOfLastSeller - sellersPerPage;
  const currentSellers = filteredSellers.slice(indexOfFirstSeller, indexOfLastSeller);
  const totalSellerPages = Math.ceil(filteredSellers.length / sellersPerPage);

  // Pagination for products
  const indexOfLastProduct = productsPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalProductPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Seller Management</h1>

        <SellerStats sellers={sellers} />

        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <SellerTable
          sellers={currentSellers}
          loading={loading.sellers}
          currentPage={currentPage}
          totalPages={totalSellerPages}
          onPageChange={setCurrentPage}
          onViewProducts={viewProducts}
        />

      </div>

      <ProductsModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        seller={selectedSeller}
        products={currentProducts}
        loading={loading.products}
        currentPage={productsPage}
        totalPages={totalProductPages}
        itemsPerPage={productsPerPage}
        totalItems={products.length}
        onPageChange={setProductsPage}
        onEditProduct={editProduct}
        onDeleteProduct={deleteProduct}
      />

      {isEditModalOpen && (
        <EditProductModal
          product={selectedProduct}
          onSave={saveProduct}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default RegisteredSellers;
