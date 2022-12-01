import React,{useContext} from "react";
import ProductContext from "../context/productContext";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Slider from "../components/Slider";

const Home = () => {
  const products= useContext(ProductContext);

  return (
    <div>
      <Navbar />
      <Slider />
      <Categories />
      <Products prod={products}/>
      <Footer/>
    </div>
  );
};

export default Home;
