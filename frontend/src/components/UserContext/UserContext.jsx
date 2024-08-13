import React, { useState, useContext, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    useEffect(() => {
        try {
            fetch('http://localhost:8080/api/session/current', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "success") {
                        setUser(data.payload);
                        console.log('Current', data.payload);
                    } else {
                        setUser(null);
                        console.log(data.error);
                    }
                });
        } catch (error) {
            console.error('Failed to fetch user:', error);
        }
    }, []);

    const logIn = (email, password) => {
        fetch('http://localhost:8080/api/session/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 'success') {
                    setUser(data.user);
                    console.log('Usuario logueado', data.user);
                    navigate('/');
                } else {
                    console.log('Usuario no logueado');
                }
            });
    };

    const logOut = () => {
        fetch('http://localhost:8080/api/session/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 'success') {
                    setUser(null);
                    console.log('Usuario deslogueado');
                    navigate('/');
                } else {
                    console.log('Usuario no deslogueado');
                }
            });
    };

    return (
        <UserContext.Provider value={{ user, logIn, logOut }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
