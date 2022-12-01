import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductState from "./context/productState";
import Checkout from "./pages/Checkout";
import OrderState from "./context/orderState";

const App = () => {
  return (
    <ProductState>
      <OrderState>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/checkout" element={<Checkout/>} />
        </Routes>
      </Router>
    </OrderState>
    </ProductState>
  );
};

export default App;
