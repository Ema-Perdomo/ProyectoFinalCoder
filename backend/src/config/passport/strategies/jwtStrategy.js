import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { userModel } from '../../../models/user.js';

const cookieExtractor = req => {        // Cookie extractor es para cuando no tenemos Frontend
    console.log(req.cookies)
    // { } no hay cookies != esta cookie no existe
    //Si existen cookies, asigno mi cookie en especifico
    const token = req.cookies ? req.cookies.jwtCookie : {}
    console.log(token)
    return token

    //     // if (req && req.cookies) {                    hay alguna cookie?
    //     //    token = req.cookies['coderCookie']        entonces tomo la cookie que necesito
    //     // }
}
const jwtOptions = {
    // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: "coderSecret"
}



export const strategyJWT = new JwtStrategy(jwtOptions, async (payload, done) => { //jwt_payload es el payload que se decodificó
    try {
        console.log(payload)
        const user = await userModel.findById(payload.user._id) //payload va a tener los datos de mi user
        if (!user) {
            return done(null, false) //no hay user
        }
        //req.res = user Ater 34?
        return done(null, user) //existe el user, el token es válido, entonces puede pasar
    } catch (error) {
        done(error, null) //user null, este user no se logueo
    }
})