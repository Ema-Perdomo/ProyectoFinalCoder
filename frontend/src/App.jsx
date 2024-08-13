import NavBar from './components/NavBar/NavBar'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import ItemListContainer from './components/ItemListContainer/ItemListContainer.jsx';
import Error from './components/Error.jsx';
import CheckOut from './components/Checkout/CheckOut.jsx';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer.jsx';
import Cart from './components/cart/cart.jsx';
import CartProvider from './components/context/CartContext.jsx';
import CrearProducto from './components/CrearProducto/CrearProducto.jsx';
import Login from './components/Login/Login.jsx';
import UserProvider, { useUserContext } from './components/UserContext/UserContext.jsx';
import { useEffect } from 'react';
import LogOut from './components/LogOut/LogOut.jsx';

function App() {
  const navigate = useNavigate();
  const { user } = useUserContext();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user) {
        navigate("/login");
      }
    }, 200); // Redirect to login after 200ms if user is not logged in

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [user, navigate]);

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path={'/'} element={<ItemListContainer greeting='Insumos deportivos' />} />
        <Route path={"/categoria/:category"} element={<ItemListContainer />} />
        <Route path={"/updateProduct/:pid"} element={<CrearProducto greeting='Actualizar producto' />} />
        <Route path={"/item/:pid"} element={<ItemDetailContainer />} />
        <Route path={'/cart'} element={<Cart />} />
        <Route path={'/checkout'} element={<CheckOut />} />
        <Route path={'/logout'} element={<LogOut />} />
        {
          user && user.role === 'Admin' ?
            <Route path={'/CrearProducto'} element={<CrearProducto greeting='Crear producto' />} />
            : null
        }
        <Route path={'*'} element={<Error />} />
        <Route path={'/login'} element={<Login />} />
      </Routes>
    </div>
  );
}

export default function Root() {
  return (
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

/*import NavBar from './components/NavBar/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ItemListContainer from './components/ItemListContainer/ItemListContainer.jsx';
import Error from './components/Error.jsx';
import CheckOut from './components/Checkout/CheckOut.jsx';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer.jsx';
import Cart from './components/cart/cart.jsx';
import CartProvider from './components/context/CartContext.jsx';
import { useState } from 'react';
import CrearProducto from './components/CrearProducto/CrearProducto.jsx';
import Login from './components/Login/Login.jsx';
import UserProvider from './components/UserContext/UserContext.jsx';
import  { useUserContext } from './components/UserContext/UserContext.jsx';


// import CartWidget from './components/CartWidget/CartWidget';
//import ItemCount from './components/ItemCount'
// import Hero from './components/Hero/Hero.jsx'


function App() {
  const { user } = useUserContext();
  console.log(user)
  //Consulto  a current el role y lo pongo con setRole TODO: corregir
  // const [role, setRole] = useState('Admin')

  // const usuario=() => {
  //   
  //   // setRole(user.role)
  //   //  setRole(reqSession.user.role)
  //   //  console.log(role)

  //   console.log(user(document.getElementById('role').value))
  // }
  // usuario()

  return (
    <div>
      <BrowserRouter>
        <UserProvider>
          <CartProvider>
            <NavBar />

            <Routes>
              {/* {user ?
              <Route path={'/'} element={<ItemListContainer greeting='Insumos deportivos' />} />
              : <Route path={'/'} element={<Login />} />
            } 
              <Route path={'/'} element={<ItemListContainer greeting='Insumos deportivos' />} />
              <Route path={"/categoria/:category"} element={<ItemListContainer />} />
              <Route path={"/updateProduct/:pid"} element={<CrearProducto greeting='Actualizar producto' />} />
              <Route path={"/item/:pid"} element={<ItemDetailContainer />} />
              {/* <Route path={'/cart'} element={ <CartWidget /> } />   }
              <Route path={'/cart'} element={<Cart />} />
              <Route path={'/checkout'} element={<CheckOut />} />
              {/* { user.role === 'Admin' ?
                <Route path={'/CrearProducto'} element={<CrearProducto greeting='Crear producto' />} />
                : null
              }  }
              <Route path={'*'} element={<Error />} />
              <Route path={'/login'} element={<Login />} />
            </Routes>

          </CartProvider>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
*/
