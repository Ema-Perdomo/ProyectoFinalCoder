import { Router } from 'express';
import passport from 'passport';
import { login, register, githubSession, sendEmailPassword, changePassword, logout, testJWT } from '../controllers/sessionController.js'


const sessionRouter = Router()

sessionRouter.post('/login', passport.authenticate('login'), login)

sessionRouter.post('/register', passport.authenticate('register'), register)

sessionRouter.get('/github', passport.authenticate('github', { scope: ['user: email'] }), async (req, res) => { }) //scope: lo que voy a devolver

sessionRouter.get('/githubSession', passport.authenticate('github'), githubSession)

sessionRouter.post('/sendEmailPassword', sendEmailPassword)

sessionRouter.post("reset-password/:token", changePassword)

//TODO:
// session /current asi se que usuario esta logueado
/*
    import { Router } from 'express';
    import sessionsController from '../controllers/sessions.controller.js';

    const router = Router();

    router.post('/register',sessionsController.register);
    router.post('/login',sessionsController.login);
    router.get('/current',sessionsController.current);
    router.get('/unprotectedLogin',sessionsController.unprotectedLogin);
    router.get('/unprotectedCurrent',sessionsController.unprotectedCurrent);

    export default router;
*/



//GOOGLE AUTH (si quiero hacerlo) TODO: ver como hacerlo
// app.get('/auth/google',
//     passport.authenticate('google', { scope: ['profile'] }));

// app.get('/auth/google/callback',
//     passport.authenticate('google', { failureRedirect: '/login' }),
//     function (req, res) {
//         // Successful authentication, redirect home.
//         res.redirect('/');
//     });

sessionRouter.get('/logout', logout)

sessionRouter.get('/testJWT', passport.authenticate('jwt', { session: false }), testJWT)

export default sessionRouter