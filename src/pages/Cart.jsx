import { useContext, useEffect, useState } from "react"
import { getCart, removeFromCart, updateCart } from "../services/api";
import { CartContext } from "../context/CartContext";

const Cart = () => {

  const [cart, setCart]=useState([]);
  const {cartTotal, refreshCart}= useContext(CartContext);


  const loadCart= ()=>{
    getCart().then(data=>{
      setCart(data);
      refreshCart()
    });
  };

  useEffect(()=>{
    loadCart();
  }, []);

  const changeQty = async (item, qty)=>{
    if (qty <= 0){
      await removeFromCart(item.id);
    }else{
      await updateCart(item.id, {
        ...item,
        quantity:qty
      });
    }
    loadCart();
  }

  return (
    <div className="container mt-4 ">
      <h2>Panier</h2>
      {cart.length === 0 && <p>Panier vide</p>}
      {cart.map(item => (
        <div className="cart mb-2">
          <div className="cart-body d-flex justify-content-between align-items-center">
            <div>
              <h5>{item.name}</h5>
              <p>{item.price}</p>
            </div>

            <div>
              <button className="btn btn-secondary btn-sm"
              onClick={()=> changeQty(item, item.quantity -1)}
              >-</button>
              <span className="mx-2">{item.quantity}</span>

              <button className="btn btn-secondary btn-sm"
              onClick={()=> changeQty(item, item.quantity +1)}
              >+</button>
              <button className="btn btn-danger btn-sm sm-3"
              onClick={()=> changeQty(item, 0)}
              >Supprimer</button>
            </div>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <div className="alert alert-success mt-4 text-end">
          <h4>Total :{cartTotal}DH</h4>
        </div>
      )}
      
    </div>
  );
}

export default Cart
