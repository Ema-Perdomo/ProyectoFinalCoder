import { set } from 'mongoose';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useUserContext } from '../UserContext/UserContext';


const Login = () => {

    const { logIn } = useUserContext();
    const [registro, setRegistro] = useState(false);

    const registerChange = () => {
        //Cambio estado del botón
        setRegistro(!registro)
    }
        // TODO: RESOLVER UNA FORMA DE REGISTRAR USUARIOS COMO ADMIN O PREMIUM
            // const userStatusChange = (status) => {
            //     //Hago un fetch al user update y cambio el campo segun el parametro status  TODO
            //     // fetch('http://localhost:8080/api/user/update', {

            //     // })
            //     return userStatusChange(status)
            // }

    const loginForm = () => {
        logIn(document.getElementById('email').value, document.getElementById('password').value)
        /*fetch('http://localhost:8080/api/session/login', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', //Para que guarde la cookie
            body: JSON.stringify({
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            })
        })
            .then(res => res.json())
            .then(data =>
                console.log(data)
            )*/

    }
    const loginGithub = () => {
        alert('Under development. Sorry for the inconvenience')
        // fetch('http://localhost:8080/api/session/github', { TODO:

        // method: 'GET',
        // headers: {
        //     'Content-Type': 'application/json'
        // },

        // })
    }

    // <div className="Premium">
    //                 <input type="checkbox" id="premiumUser" value="Premium" onSelect={role = "premium"} />Selecciona para activar premium
    //                 {/* <input type="checkbox" id="premiumUser" value="Premium" />Selecciona para activar premium */}
    //             </div>
    //             <div className="Premium">
    //                 {/* <input type="checkbox" id="userAdmin" value="Admin" onSelect={userStatusChange(admin)} />Selecciona para activar Admin */}
    //                 <input type="checkbox" id="userAdmin" value="Admin" />Selecciona para activar Admin
    //             </div>

    const register = () => {
        fetch('http://localhost:8080/api/session/register', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                first_name: document.getElementById('first_name').value,
                last_name: document.getElementById('last_name').value,
                age: document.getElementById('age').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                // role: document.getElementById('role').value //TODO:No se si va  afuncionar
                // role:  role ? (userStatusChange("premium") || userStatusChange("admin") ) : null //TODO: ASi?
            })
            //         .then(res => res.json())                                         CON ESTO NO FUNCIONA
            //         .then(data =>
            //             console.log(data)
            //         )
        })

        //Luego de registrar al user, creo su carrito
        fetch('http://localhost:8080/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
             body: JSON.stringify({
                 products: []
             })
        }
        )
    }


    return (
        <Form>
            {!registro ? <>  <Form.Group className="mb-3" >
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" id='email' />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" id='password' />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Button variant="success" type="button" onClick={loginForm}>
                        Login
                    </Button>
                    <Button variant="dark" type="button" onClick={loginGithub}>
                        Login with Github
                    </Button>
                </Form.Group>
                <Button variant="secondary" type="button" >Forgot password?</Button> </> :
                null
            }
            {registro ? <><Form.Group className="mb-3" >
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="First Name" id='first_name' />
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Last Name" id='last_name' />
                <Form.Label>Age</Form.Label>
                <Form.Control type="number" placeholder="Age" id='age' />
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Email" id='email' />
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" id='password' />

                {/* <Form.Label>Role: Para activar premium o admin, escriba 'admin' o 'premium'</Form.Label>
                <Form.Control type="text" placeholder="User" id='last_name' /> 
                TODO: Dropdown para elegir rol*/}



            </Form.Group>
                <Button variant="success" type="button" onClick={register}>
                    Register
                </Button ></>
                : null
            }
            <Button variant="primary" type="button" onClick={registerChange} > {registro ? "Cambiar a login" : "Registrarse"} </Button>

        </Form>
    )
}

export default Login