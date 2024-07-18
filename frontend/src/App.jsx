import NavBar from './components/NavBar/NavBar'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CartWidget from './components/CartWidget/CartWidget.jsx';
import ItemListContainer from './components/itemListContainer/itemListContainer';
import Error from './components/Error.jsx' ;
import CheckOut from './components/Checkout/CheckOut.jsx';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer.jsx';
import Cart from './components/cart/Cart.jsx';
import CartProvider from './components/context/CartContext.jsx';





// import CartWidget from './components/CartWidget/CartWidget';
//import ItemCount from './components/ItemCount'
// import Hero from './components/Hero/Hero.jsx'


function App() {

  return (
    <div>
      <BrowserRouter>     
      <CartProvider>   
        <NavBar/>

        <Routes>

          <Route path={'/'} element={ <ItemListContainer greeting='Insumos deportivos'/> } />
          <Route path={"/categoria/:id"} element={ <ItemListContainer  />} />
          <Route path={"/item/:id"}element={ <ItemDetailContainer /> } />
          {/* <Route path={'/cart'} element={ <CartWidget /> } />   */}
          <Route path={'/cart'} element={ <Cart /> } />    
          <Route path={'/checkout'} element={ <CheckOut /> } />          
          <Route path={'*'} element={ <Error /> } />  

        </Routes>

      </CartProvider>
      </BrowserRouter>    
    </div>
  );
}

export default App;
