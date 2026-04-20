import { useContext, useEffect, useState } from "react"
import { addToCart, getCart, getProducts, updateCart } from "../services/api";
import { CartContext } from "../context/CartContext";


function Products(){
    const [products, setProducts]= useState([]);
      const {refreshCart}= useContext(CartContext);
      
    

    useEffect(()=>{
        getProducts().then(data=>{
            setProducts(data);
        });
    }, []);

const handleAddToCart= async product => {
    const cart = await getCart();
    const existingItem = cart.find(
        item => item.productId === product.id
    );
    if (existingItem){
        await updateCart (existingItem.id,
            {...existingItem,quantity: existingItem.quantity +1}
        );
    }else {
        await addToCart({
            productId: product.id,
            name :product.name,
            price: product.price,
            quantity: 1
        });
    }

    refreshCart()
    
}

    return(

  <div className="container mt-4">
  <h2 className="mb-4">liste des produits</h2>
  <div className="row">
{products.map(product=>(
    <div className="col mb-4">
        <div className="card mb-3"> 
            <div className="card-body">
            <h5 class="card-title">{product.name}</h5>
            <p class="card-text">{product.price}</p>
            <button className="btn btn-primary"
            onClick={()=>handleAddToCart(product)}> 
            ajouter au panier
            </button>
            </div>

        </div>
        </div>
    
))}
    
    
  </div>
</div>
    )
    
}

export default Products
