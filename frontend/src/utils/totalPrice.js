export const calcultePrice = (cart)=>{
    console.log(cart);
    let price = 0;
        cart.forEach((item)=>{
          price += item.productId.price * item.quantity;
        })
        return price;
        
}