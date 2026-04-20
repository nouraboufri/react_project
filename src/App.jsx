import { useState } from 'react'
import Navbar from './compenant/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Products from './pages/Products'
import Cart from './pages/Cart'

function App() {
  const [count, setCount] = useState(0)

  return (
  
<BrowserRouter>
<Navbar/>
<Routes>
  <Route  path="/" element={<Products/>}/>
  <Route path="/cart" element={<Cart/>}/>
</Routes>
</BrowserRouter>

    
  )
}

export default App
