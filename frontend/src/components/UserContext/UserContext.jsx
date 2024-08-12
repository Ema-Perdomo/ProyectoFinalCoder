import React, { useState, useContext, useEffect } from 'react';

const UserContext = React.createContext('');
export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        fetch('http://localhost:8080/api/session/current', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((data) => {
                setUser(data.payload);
            });
    });

    const logIn = ( email, password) => {
        fetch('http://localhost:8080/api/session/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 'success'){
                    setUser(data.user);
                    //console.log('Usuario logueado', data.user.email);
                    // window.location.href = '/';
                } else {
                    console.log('Usuario no logueado');
                }
            });
    }

    /* se setean con constantes lo que va a usar UserProvider */

    return (
        <UserContext.Provider
            value={{
                user,
                logIn
                /*Los nombres de las constantes que se usan */
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;