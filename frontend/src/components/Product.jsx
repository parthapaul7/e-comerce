import {
  // FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  PaymentOutlined,
} from "@material-ui/icons";
import styled from "styled-components";
import axios from 'axios'
import {useNavigate } from 'react-router-dom'

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  margin: 20px auto;
  min-width: 300px;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info}{
    opacity: 1;
  }
`;
const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around; 
  margin: 20px auto;
  min-width: 280px;
  height: 350px;
  background-color: #f5fbfd;
  `

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
const Caption =styled.div`
  font-weight: 500;
  font-size: 20px;
  margin: 5px;
  text-align: center;
  `;

const Product = ({ item }) => {

  const navigate = useNavigate();

  async function  addToCart(e){
    try {
      const res = await axios.post("http://localhost:5000/api/carts",{
        productId: item._id,
        quantity: 1
      },
      {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
      }
    }
      ) 
      console.log(res)
      navigate("/cart")

    } catch (error) {
     console.log(error) 
    }

  }

  async function  orderNow(e){
    try {
      const res = await axios.post("http://localhost:5000/api/orders",{
        productId: item._id,
        quantity : 1,
        address: {
          name: "test",
          address: "test",
        },
        amount : 1000,
    },{
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
      }
    })
    navigate("/orders")
    return res.data
  }
  catch(error){
    console.log(error)
  }
}

  function handleProd(){
    navigate(`/products/${item._id}`)
  }

  return (
    <Container>
      <InnerContainer onClick={handleProd}>
      <Image src={item.img} />
      <Info>
        <Icon onClick={addToCart}>
          <ShoppingCartOutlined />
        </Icon>
        <Icon>
          <SearchOutlined />
        </Icon>
        <Icon>
          <PaymentOutlined onClick={orderNow}/>
        </Icon>
      </Info>
      </InnerContainer>
      <Caption>
        {item.title}
      </Caption>
      <Caption>
        $ {item.price}
      </Caption>
    </Container>
  );
};

export default Product;
