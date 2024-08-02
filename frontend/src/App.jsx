import NavBar from './components/NavBar/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ItemListContainer from './components/ItemListContainer/ItemListContainer.jsx';
import Error from './components/Error.jsx';
import CheckOut from './components/Checkout/CheckOut.jsx';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer.jsx';
import Cart from './components/cart/Cart.jsx';
import CartProvider from './components/context/CartContext.jsx';
import { useState } from 'react';
import CrearProducto from './components/CrearProducto/CrearProducto.jsx';
import Login from './components/Login/Login.jsx';


// import CartWidget from './components/CartWidget/CartWidget';
//import ItemCount from './components/ItemCount'
// import Hero from './components/Hero/Hero.jsx'


function App() {


  const [role, setRole] = useState('Admin')
  //Consulto  a current el role y lo pongo con setRole

  return (
    <div>
      <BrowserRouter>
        <CartProvider>
          <NavBar role={role} />

          <Routes>
            {/* {user ?
              <Route path={'/'} element={<ItemListContainer greeting='Insumos deportivos' />} />
              : <Route path={'/'} element={<Login />} />
            } */}
            <Route path={'/'} element={<ItemListContainer greeting='Insumos deportivos' />} />
            <Route path={"/categoria/:category"} element={<ItemListContainer />} />
            <Route path={"/updateProduct/:pid"} element={<CrearProducto greeting='Actualizar producto' />} />
            <Route path={"/item/:pid"} element={<ItemDetailContainer />} />
            {/* <Route path={'/cart'} element={ <CartWidget /> } />   */}
            <Route path={'/cart'} element={<Cart />} />
            <Route path={'/checkout'} element={<CheckOut />} />
            {role === 'Admin' ?
              <Route path={'/CrearProducto'} element={<CrearProducto greeting='Crear producto' />} />
              : null
            }
            {/* <Route path={'/editProduct'} element={<EditProduct />} /> */}
            <Route path={'*'} element={<Error />} />
            <Route path={'/login'} element={<Login/>} />
          </Routes>

        </CartProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
