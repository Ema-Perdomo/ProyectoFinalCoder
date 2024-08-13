import React, { useState, useContext, useEffect } from 'react';
import { useUserContext } from '../UserContext/UserContext';

const CartContext = React.createContext('');
export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const { user } = useUserContext()

    useEffect(() => {
        try {
            fetch(`http://localhost:8080/api/cart/${user.cartId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                })
                .then((res) => res.json())
                .then((data) => {
                    setCart(data.products)
                    console.log(data)
                })

        } catch (error) {
            console.error('Failed to fetch cart:', error);
        }
    }, []); 







    const addProduct = (item, quantity) => {
        if (isInCart(item.id)) {
            setCart(
                cart.map((product) => {
                    return product.id === item.id
                        ? { ...product, quantity: product.quantity + quantity }
                        : product;
                })
            );
        } else {
            setCart([...cart, { ...item, quantity }]);
        }
    };

    const totalPrice = () => {
        return cart.reduce((prev, act) => prev + act.quantity * act.precio, 0);
    };

    const totalProducts = () =>
        cart.reduce(
            (acumulador, productoActual) => acumulador + productoActual.quantity,
            0
        );

    const clearCart = () => setCart([]);

    const isInCart = (id) =>
        cart.find((product) => product.id === id) ? true : false;

    const removeProduct = (id) =>
        setCart(cart.filter((product) => product.id !== id));

    return (
        <CartContext.Provider
            value={{
                clearCart,
                isInCart,
                removeProduct,
                addProduct,
                totalPrice,
                totalProducts,
                cart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;