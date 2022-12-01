import styled from "styled-components";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Footer from "../components/Footer";
import { useEffect,useState } from "react";
import axios from "axios";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;



const ProductList = () => {
  const [prod,setProd] = useState([]);

  async function getProduct() {
    setProd((await axios.get("http://localhost:5000/api/products")).data);
  }
  useEffect(() => {
    getProduct();
  }, [])
  
  return (
    <Container>
      <Navbar />
      <Title>Dresses</Title>
      <Products prod={prod} />
      <Footer />
    </Container>
  );
};

export default ProductList;
