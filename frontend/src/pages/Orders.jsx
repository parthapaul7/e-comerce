import { Add,Remove } from "@material-ui/icons";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import React,{useState, useEffect } from "react";
import axios from "axios";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Orders = () => {
  const [order, setOrder] = useState([{
    productId:{
        img: "1",
    }}])

  const getCart = async ()=>{
    const data = await axios.get("http://localhost:5000/api/orders",
      {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
      }
      
    })
    let arr = []
    data.data.forEach(item=>{
        arr = arr.concat(item.products)
    })

    console.log(arr,"arr")
    setOrder(arr)
    
  }

  useEffect(() => {
    getCart()    
  }, [])
  
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>YOUR ORDERS</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
        </Top>
        <Bottom>
          <Info>
           {order.map((item,id)=>{
                return <Prod {...item} key={id} />}
           )} 
          </Info>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

const Prod = (props)=>{
  const totalAmount = props.quantity * props.productId.price;
 return (<><Product>
              <ProductDetail>
                <Image src={props.productId.img} />
                <Details>
                  <ProductName>
                    <b>Product:</b>{props.productId.title} 
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> {props.productId._id} 
                  </ProductId>
                  <ProductColor color="gray" />
                  <ProductSize>
                    <b>Size:</b> M
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <Add />
                  <ProductAmount>{props.quantity}</ProductAmount>
                  <Remove />
                </ProductAmountContainer>
                <ProductPrice>{totalAmount}</ProductPrice>
              </PriceDetail>
            </Product>
            <Hr/></>
            )
}


export default Orders;