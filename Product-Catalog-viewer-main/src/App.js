import "./App.css";
import { AllProductsView } from "./Components/Products/AllProductsView/allProductsView";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProductDetailView } from "./Components/Products/ProductDetailedView/productDetailedView.js";
function App() {
  return (
    <div className="App">
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<AllProductsView />} />
            <Route path="/products/:id" element={<ProductDetailView />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
