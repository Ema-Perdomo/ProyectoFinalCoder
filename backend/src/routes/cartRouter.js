import { Router } from 'express';
import passport from 'passport';
import { createCart, getCart, insertProductCart, createTicket, deleteFromCart } from '../controllers/cartController.js';

const cartRouter = Router()

cartRouter.get('/:cid', getCart)
cartRouter.post('/', createCart)    //Crea un carrito
cartRouter.post('/:cid/:pid', passport.authenticate('jwt', { session: false }), insertProductCart)
cartRouter.get('/purchase/:cid', passport.authenticate('jwt', { session: false }), createTicket)
cartRouter.delete('/:cid/:pid', deleteFromCart)


export default cartRouter 