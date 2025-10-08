import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Home'
import Product from './Product'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Product" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;