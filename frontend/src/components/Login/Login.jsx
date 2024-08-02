import { set } from 'mongoose';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {
    const [registro, setRegistro] = useState(false);
    const registerChange = () => {
        //Cambio estado del botón
        setRegistro(!registro)
    }

    const loginForm = () => {
        fetch('http://localhost:8080/api/session/login', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            })

        })
        console.log(email, password)
    }

    const loginGithub = () => {
        console.log("Login con git")
        // fetch('http://localhost:8080/api/session/github', { TODO:

        // method: 'GET',
        // headers: {
        //     'Content-Type': 'application/json'
        // },

        // })
    }

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
                password: document.getElementById('password').value
            })
            //         .then(res => res.json())                                         CON ESTO NO FUNCIONA
            //         .then(data =>
            //             console.log(data)
            //         )
        })
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
                <Button variant="secondary" type="button">Forgot password?</Button> </> : null}
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