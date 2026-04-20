import { Link } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import { useContext } from "react";

function Navbar(){
  const {cartCount}= useContext(CartContext);

return (
    <nav className="navbar navbar-dark bg-dark px-4">2
        <Link to="/" className="navbar-brand" >E-Commerce
        </Link>
        <Link to="/cart" className="btn btn-outline-light">
        panier <span className="badge bg-danger">{cartCount}</span>
        </Link>

    </nav>

  )
}
  


export default Navbar
