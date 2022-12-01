import React,{useEffect,useState} from "react";
import ProductContext from "./productContext";
import axios from "axios";


const ProductState = (props) => {
    let p1= [
      {
        id: 1,
        img: "https://i.ibb.co/cXFnLLV/3.png",
        title: "LOUNGEWEAR LOVE",
        desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
        bg: "fbf0f4",
      },
    ];

    const [prod,setProd] = useState(p1);

    async function getProduct() {
    setProd((await axios.get("http://localhost:5000/api/products")).data);
  }
  useEffect(() => {
    getProduct();
  }, [])


  return (
    <ProductContext.Provider value={prod}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
