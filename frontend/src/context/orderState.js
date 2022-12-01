
import React,{useEffect,useState} from "react";
import { createContext } from "react";

const OrderContext= createContext();

export {OrderContext};

const OrderState = (props) => {
    let p1= [
      {
        id: 1,
        img: "https://i.ibb.co/cXFnLLV/3.png",
        title: "LOUNGEWEAR LOVE",
        desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
        bg: "fbf0f4",
      },
    ];

    const [order,setOrder] = useState(p1);

  useEffect(() => {
  }, [])


  return (
    <OrderContext.Provider value={{order,setOrder}}>
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderState;