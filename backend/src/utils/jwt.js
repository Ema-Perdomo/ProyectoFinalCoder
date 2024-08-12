import jwt from 'jsonwebtoken'

//genero token
export const generateToken = (user) => {
    /*
        1er parametro. Objeto de asociacion del token(Usuario)
        2do.           Secret key. Clave privada del cifrado (coderhouse)
        3er.           Tiempo de expiracion del token
    */

    const token = jwt.sign({ user }, "coderhouse", { expiresIn: '12h' }) //token firmado por mi backend, solo mi backend puede leerlo
    return token
}

// const authToken = (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//         return res.status(401).send({
//             error: "Not authenticated"
//         })
//         const token = authHeader.split(' ')[1]; //Para quitar la palabra Bearer
//         jwt.verify(token, "coderhouse", (err, user) => {
//             if (err) {
//                 return res.status(403).send({
//                     error: "Not authorized"
//                 })
//             }
//             req.user = user;
//             next();
//         })
//     }
// }


//Para el dotenv
// export const verifyToken = (token) => {
//     return jwt.verify(token, varenv.jwtSecret);
// }

export const verifyToken = (token) => {
    return jwt.verify(token, "coderhouse");
}