import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "./Firebase/firebase";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [productURL, setProductURL] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDes, setProductDes] = useState("");
  const navigate = useNavigate();

  const handleAdd = async () => {
    if (productName && productURL && productPrice && productDes) {
      try {
        const docRef = await addDoc(collection(db, "users"), {
          url: productURL,
          name: productName,
          price: productPrice,
          des: productDes
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      alert("Please fill out all input fields");
    }

    setProductURL("");
    setProductName("");
    setProductPrice("");
    setProductDes("");
  };

  const handleGet = () => {
    navigate("/Product");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col gap-4 text-center">
        <h1 className="text-2xl font-semibold text-blue-400">Product Details</h1>

        <input
          type="text"
          value={productURL}
          onChange={(e) => setProductURL(e.target.value)}
          placeholder="Enter Product URL"
          className="bg-gray-900 border border-gray-700 text-white rounded-lg p-3 focus:border-blue-400 focus:ring focus:ring-blue-500/20 outline-none"
        />
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Enter Product Name"
          className="bg-gray-900 border border-gray-700 text-white rounded-lg p-3 focus:border-blue-400 focus:ring focus:ring-blue-500/20 outline-none"
        />
        <input
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          placeholder="Enter Product Price"
          className="bg-gray-900 border border-gray-700 text-white rounded-lg p-3 focus:border-blue-400 focus:ring focus:ring-blue-500/20 outline-none"
        />
        <input
          type="text"
          value={productDes}
          onChange={(e) => setProductDes(e.target.value)}
          placeholder="Enter Product Description"
          className="bg-gray-900 border border-gray-700 text-white rounded-lg p-3 focus:border-blue-400 focus:ring focus:ring-blue-500/20 outline-none"
        />

        <button
          onClick={handleAdd}
          className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 transition-all text-white font-medium py-2 rounded-lg shadow-md"
        >
          Add Product
        </button>

        <button
          onClick={handleGet}
          className="bg-green-600 hover:bg-green-700 transition-all text-white font-medium py-2 rounded-lg shadow-md"
        >
          View All Products
        </button>
      </div>
    </div>
  );
};

export default Home;
