import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Product from "./Product";
import Login from "./Login";
import Signup from "./SignUp";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup></Signup>} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
