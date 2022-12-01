import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import React, { useState, useContext } from "react";
import { OrderContext } from "../context/orderState";
import { calcultePrice } from "../utils/totalPrice";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  width: 100%;
  margin: 10px 0px;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Checkout = () => {
  const navigate = useNavigate();

  const { order } = useContext(OrderContext);
  const totalAmount = calcultePrice(order);

  console.log(order, "this is order");

  const [address, setAddress] = useState({});

  async function placeOrder(args) {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/orders",
        {
          productId: args.productId._id,
          quantity: args.quantity,
          address: address,
          amount: args.productId.price,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async function orderNow(e) {
    e.preventDefault();
    const promiseArr = [];
    order.forEach((item) => {
      promiseArr.push(placeOrder(item));
    });

    try {
      const res = Promise.all(promiseArr);
      console.log(res);
    } catch (error) {
      console.log(error);
    }

    navigate("/orders");
  }
  const handleAddress = (e) => {
    console.log(e.target.value, e.target.name);
    if (e.target.name === "name") {
      setAddress((prev) => ({ ...prev, name: e.target.value }));
      console.log("hit this");
    }
    switch (e.target.name) {
      case "name":
        setAddress((prev) => ({ ...prev, name: e.target.value }));
        break;
      case "address":
        setAddress((prev) => ({ ...prev, address: e.target.value }));
        break;
      case "phone":
        setAddress((prev) => ({ ...prev, city: e.target.value }));
        break;
      case "pincode":
        setAddress((prev) => ({ ...prev, pincode: e.target.value }));
        break;
      case "state":
        setAddress((prev) => ({ ...prev, state: e.target.value }));
        break;
      case "country":
        setAddress((prev) => ({ ...prev, country: e.target.value }));
        break;
      default:
        break;
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title>Address</Title>
        <Form>
          <Input
            placeholder="name"
            name="name"
            onChange={handleAddress}
            value={address.name}
          />
          <Input
            placeholder="Country"
            name="country"
            onChange={handleAddress}
            value={address.country}
          />
          <Input
            placeholder="Address Line 1"
            name="address"
            onChange={handleAddress}
            value={address.address}
          />
          <Input
            placeholder="State"
            name="state"
            onChange={handleAddress}
            value={address.state}
          />
          <Input
            placeholder="Phone"
            name="ehone"
            onChange={handleAddress}
            value={address.phone}
          />
          <Input
            placeholder="Pin Code"
            name="pincode"
            onChange={handleAddress}
            value={address.pincode}
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Title>
            Total Price <i>$ {totalAmount}</i>
          </Title>
          <Button onClick={orderNow}>PLACE ORDER</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Checkout;
