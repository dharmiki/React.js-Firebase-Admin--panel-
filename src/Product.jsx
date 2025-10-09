import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase/firebase";
import { useNavigate } from "react-router-dom";
import { getAuth, deleteUser } from "firebase/auth";

const Product = () => {
  const [productData, setProductData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  //  Fetch Data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const data = querySnapshot.docs.map((doc) => doc.data());
        setProductData(data);
        setFilteredData(data);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  // ✅ Filtering & Sorting Logic
  useEffect(() => {
    let filtered = productData.filter(
      (item) =>
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.des?.toLowerCase().includes(search.toLowerCase())
    );

    if (sortOption === "priceLowHigh") {
      filtered.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortOption === "priceHighLow") {
      filtered.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortOption === "alphabetical") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredData(filtered);
  }, [search, sortOption, productData]);

  //  Logout 
  const handleLogout = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await deleteUser(user);
        alert("Account deleted successfully!");
        navigate("/"); 
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete account. Please try again.");
      }
    } else {
      navigate("/"); 
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
   
      <div className="text-center mb-6">
        <button
          onClick={() => navigate("/home")}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-white transition me-5"
        >
          Back to Form
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium text-white transition"
        >
          Logout
        </button>
        <h1 className="text-3xl font-semibold mt-4 text-blue-400">
          All Products
        </h1>
      </div>

      {/*  Filter & Sort Controls */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 w-full md:w-1/3 focus:border-blue-400 focus:ring focus:ring-blue-500/20 outline-none"
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 w-full md:w-1/4 focus:border-blue-400 focus:ring focus:ring-blue-500/20 outline-none"
        >
          <option value="">Sort by</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
          <option value="alphabetical">Name: A → Z</option>
        </select>
      </div>

      {/*  Product Display */}
      <div className="flex flex-wrap justify-center gap-6">
        {filteredData.length > 0 ? (
          filteredData.map((e, i) => (
            <div
              key={i}
              className="bg-white text-gray-900 w-56 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all p-4"
            >
              <img
                src={e.url}
                alt={e.name}
                className="w-full h-36 object-cover rounded-md mb-3"
              />
              <h3 className="text-lg font-semibold text-center">{e.name}</h3>
              <p className="text-center text-sm text-gray-700">
                Price: ₹{e.price}
              </p>
              <p className="text-center text-gray-600 text-sm mt-1">{e.des}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-lg mt-6">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Product;
