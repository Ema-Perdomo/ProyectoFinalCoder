//Modulos de testing utilizando Mocha y Chai, para el Desafio Clase 41: Testing Avanzado
//Se usa expect en lugar de assert(Chai)

import chai from 'chai';
import mongoose from 'mongoose';
import supertest from 'supertest';
import Assert from 'assert';
import __dirname from '../src/path.js'
import e from 'express';

const expect = chai.expect
const assert = Assert.strict;
const requester = supertest('http://localhost:8080')

await mongoose.connect(`mongodb+srv://emaperdomo00:coderhouse@cluster0.al9oyst.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)


///TEST DE ROUTER DE PRODUCTOS(al menos 3 tests)
describe('Test CRUD Products en la ruta /api/products', function () {
    //Previo a comenzar todo el test
    before(() => {
        console.log('Inicio de Testing de CRUD productos.')
    })

    //Previo a comenzar cada test individual
    beforeEach(() => {
        console.log('Comienza el test individual.')
    })

    it('Ruta: /api/products - método GET', async () => {
        const { ok, _body } = await requester.get('/api/products') //Simulo un get
        console.log(_body)
        expect(ok).to.be.ok //Si el ok es true, se conectó
    })

    it('Ruta: /api/products - método POST', async () => {
        //Creo un nuevo product
        const newProd = {
            title: "ProductTest",
            description: "Test product - description",
            stock: 10,
            category: "Test products",
            code: "Code123",
            price: 100,
            thumbnail: []
        }

        const { statusCode } = await requester.post('/api/products').send(newProd) //Simulo un post a la ruta con el objeto newProd 
        expect(statusCode).to.equal(201)
    })

    it('Ruta: /api/products - método PUT (actualizacion de un product dado su id)', async () => {
        const id = ''  //Aca iria la id del producto a modificar traida con GET
        //if (req.user.role == 'Admin') {} : Solo deberia funcionar si el usuario es admin
        const updateProd = {
            title: "ProductTestUpd",
            description: "Test product updated - description",
            stock: 5,
            category: "Test updating product",
            code: "Code456",
            price: 10,
            thumbnail: []
        }
        const { statusCode } = await requester.put(`/api/products/${id}`).send(updateProd) //Simulo un put a la ruta /api/products enviando el objeto updatePet
        expect(statusCode).to.be.equal(200)
    })

    it('Ruta: /api/products - método DELETE ( borrado de un product dado su id)', async () => {
        const id = '' //Aca iria la id del producto a eliminar traida con GET
        const { statusCode } = await requester.delete(`/api/products/${id}`).expect(statusCode).to.be.equal(200)
    })

    //TODO Resto de test a las rutas de products falta get/:idProd
})
///TEST DE ROUTER DE CART(al menos 3 tests)
describe('Test CRUD Carts en la ruta /api/cart', function () {
    before(() => {
        console.log('Inicio de Testing de CRUD Cart.')
    })
    beforeEach(() => {
        console.log('Comienza el test individual.')
    })
    it('Ruta: /api/cart - método POST (creo un nuevo cart)', async () => {
        //Creo un nuevo cart
        const newCart = {
            products: []
        }
        const { statusCode } = await requester.post('/api/cart').send(newCart) //Simulo un post a la ruta 
        expect(statusCode).to.equal(201)
    })
    it('Ruta: /api/cart/:cid - método GET (obtencion de un cart dado su id)', async () => {
        const cid = '' //Aca iria la id del cart a obtener o es: id = req.params.cid?
        /*
        const { ok, _body } = await requester.get(`/api/cart/${id}`) //Simulo un get
        console.log(_body)
        expect(ok).to.be.ok //Si el ok es true, se conectó*/
        const cart = await requester.get(`/api/cart/${cid}`)  //{ _id: 'id de mongoDB' }
        assert.strictEqual(typeof (cart), "array");
        //assert.strictEqual(Array.isArray(cart), true);
    })
    it('Ruta: /api/cart/:cid/:pid - método POST (agregar un producto a un cart dado su id)', async () => {
        const cartId = '' //Aca iria la id del cart a modificar
        const idProducto = '' //Aca iria la id del producto a agregar
        const { quantity } = 1 //Cantidad a agregar
        const { statusCode, _body } = await requester.post(`/api/cart/${cartId}/${idProducto}`).send(quantity) //Simulo un post a la ruta 
        //expect(statusCode).to.equal(200)
        expect(_body.payload).to.have.property('-id') //Si se creo la id se cargo correctamente en BDD
    })

    //it('Ruta: /api/cart/purchase/:cid - método GET (genero el ticket)', async () => {}) //TODO
})
///TEST DE ROUTER DE SESSION(al menos 3 tests)
describe('Test CRUD Carts en la ruta /api/session', function () {
    before(() => {
        console.log('Inicio de Testing de CRUD Sessions.')
    })
    beforeEach(() => {
        console.log('Comienza el test individual.')
    })
    it('Ruta: /api/session/login - método POST (login de un usuario)', async () => {
        // if (req.user) {  //Mia, creo que se hace como abajo
        //     const user = {
        //         email: "Jhon@Deere.com",
        //         first_name: "Jhon"
        //     }
        // }
        // expect(user).to.be.ok
        const user = {
            email: "Jhon@Deere.com",
            first_name: "Jhon"
        }
        expect(user).to.be.ok

    })
    it('Ruta: /api/session/register - método POST (registro de un usuario)', async () => {
        const newUser = {
            first_name: 'Jhon',
            last_name: 'Deere',
            email: 'Jhon@Deere.com'
        }
        const { statusCode } = await requester.post('/api/session/register').send(newUser)
        expect(statusCode).to.be.equal(200)
    })
    it('Ruta: /api/session/logout - método GET (logout de un usuario)', async () => {
        const { statusCode } = await requester.get('/api/session/logout')
        expect(statusCode).to.be.equal(200)       
    })

    /*TODO Resto de test a las rutas de session
    it('Ruta: /api/session/testJWT - método GET (test de JWT)', async () => {})
    it('Ruta: /api/session/reset-password/:token - método POST (cambio de contraseña)', async () => {})
    it('Ruta: /api/session/sendEmailPassword - método POST (envio de email para cambio de contraseña)', async () => {})
    it('Ruta: /api/session/github - método GET (login con github)', async () => {})
    it('Ruta: /api/session/githubSession - método GET (login con github)', async () => {})
     */
})