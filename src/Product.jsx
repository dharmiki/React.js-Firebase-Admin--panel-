import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./Firebase/firebase";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const data = querySnapshot.docs.map((doc) => doc.data());
        setProductData(data);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="text-center mb-6">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-white transition"
        >
          Back to Form
        </button>
        <h1 className="text-3xl font-semibold mt-4 text-blue-400">
          All Products
        </h1>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {productData.map((e, i) => (
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
        ))}
      </div>
    </div>
  );
};

export default Product;
