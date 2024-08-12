import { sendEmailChangePassword } from "../utils/nodemailer.js";
import jwt from 'jsonwebtoken';
import { userModel } from "../models/user.js";
import { validatePassword, createHash } from "../utils/bcrypt.js";
import { generateToken, verifyToken } from "../utils/jwt.js";


// export const login = async (req, res) => {
//     try {
//         const { email, password } = req.body
//         const user = await userModel.findOne({email:email});
//         if (!req.user) { //Si no existe el usuario
//             res.status(401).send('Usuario o contraseña invalidos')
//         }
//         //req.session guarda en MongoDB
//         req.session.user = {
//             email: req.user.email,
//             first_name: req.user.first_name,
//         }
//         const accessToken = generateToken(req.session.user)
//         console.log(accessToken)
//         // res.cookie('coderCookie', accessToken, { maxAge: 3600000, httpOnly: true, sameSite:"lax" })
//         //.send({ status: "success", message: "Logged in", user: req.session.user })
//         res.cookie('coderCookie', accessToken, { maxAge: 3600000, httpOnly: true, sameSite: 'lax' });
//         res.send({ status: 200, message: 'Logueado correctamente', user: req.session.user });
//     } catch (error) {
//         res.status(500).send(`Error al loguear usuario: ${error}`)
//     }
// };


export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" });
    const user = await userModel.findOne({ email: email });

    if (!user) return res.status(404).send({ status: "error", error: "User doesn't exist" });
    const isValidPassword = await validatePassword(password, user.password);

    if (!isValidPassword) return res.status(400).send({ status: "error", error: "Incorrect password" });

    //req.session guarda en MongoDB
    req.session.user = {
        email: req.user.email,
        first_name: req.user.first_name,
    }

    const accessToken = generateToken(req.session.user)
    console.log("###### Login success #######")
    console.log(accessToken, ': accessToken desde el sessionController')
    res.cookie('coderCookie', accessToken, { maxAge: 3600000 }).send({ status: "success", message: "Logged inAAAAA", user: user })
}




export const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        if (!first_name || !last_name || !email || !password) return res.status(400).send({ status: "error", error: "Incomplete values" });
        const exists = await usersService.getUserByEmail(email);
        if (exists) return res.status(400).send({ status: "error", error: "User already exists" });
        const hashedPassword = await createHash(password);
        const user = {
            first_name,
            last_name,
            email,
            password: hashedPassword
        }
        // let result = await usersService.create(user); Asi no lo creaba
        let result = await usersModel.create(user); //Asi si lo crea
        console.log(result, "Usuario registrado con éxito");
        res.send({ status: "success", payload: result._id });
    } catch (error) {
        res.status(500).send({ status: "error", error: error.message });
    }
}



export const githubSession = async (req, res) => {
    req.session.user = {
        email: req.user.email,
        first_name: req.user.name,
    }
    res.redirect('/')
};

export const logout = async (req, res) => {
    const user = await userModel.findOne({ email: req.session.user.email })
    user.lastConnection = new Date() //TODO: ajustar date para que muestre el correcto segun nuestra zona horaria o segun la zona del user
    await user.save()

    req.session.destroy((e =>
        //Si hay error al cerrar sesion devuelvo el error sino redirijo a la pagina principal
        e ? res.status(500).send('Error al cerrar sesion') : res.status(200).redirect(/*"api/session/login" o: */ "/")
    ))
};

export const testJWT = async (req, res) => {
    if (req.user.role == 'user')
        return res.status(403).send('Usuario no autorizado')
    else
        res.status(200).send(req.user)
};

export const changePassword = async (req, res) => {
    const { token } = req.params
    const { newPassword } = req.body

    try {
        //Verifico si el token y la contraseña ("coder") son validos
        const validateToken = jwt.verify(token.substr(6,), "coder")
        //Valido mi user por si acaso
        const user = await userModel.findOne({ email: validateToken.userEmail })
        if (user) {
            if (!validatePassword(newPassword, user.password)) { //Si no es igual, cambio la contraseña
                const hashPassword = createHash(newPassword)
                user.password = hashPassword
                const resultado = await userModel.findByIdAndUpdate(user._id, user) //Busco el user, le cambio la contraseña y lo guardo

                console.log(resultado)

                res.status(200).send('Contraseña cambiada con éxito')
            } else {//Contraseñas iguales}
                res.status(400).send('La contraseña es igual a la anterior')
            }
        } else {
            //Usuario no existe
            res.status(404).send('Usuario no encontrado')
        }
    } catch (error) {
        res.status(500).send('Error al cambiar contraseña: ', error)

        if (error?.message === "jwt expired") {       //Si el link expira
            res.status(400).send("El tiempo maximo para recuperar la contraseña ha expirado, por favor solicite un nuevo link")
            //REEENVIO DE EMAIL (hacerlo)
        }
    }
}

export const sendEmailPassword = async (req, res) => {
    try {
        const { email } = req.body
        const user = await userModel.find({ email: email }) //Busco el usuario tal que el email sea igual al email que me pasan
        if (user) {
            const token = jwt.sign
                ({ userEmail: email }, "coder", { expiresIn: '1h' })                             //Como tengo al usuario, genero un token con el email del usuario
            const resetLink = `http://localhost:8000/api/session/reset-password?token=${token}`     //Creo un link con el token
            sendEmailChangePassword(email, resetLink)                                        //Envio el email con el link
            res.status(200).send('Email enviado con éxito')
        } else {
            return res.status(404).send('Usuario no encontrado')
        }
    } catch (error) {
        res.status(500).send(error)
    }
}





export const current = async (req, res) => {
    try {
        const cookie = req.cookies['coderCookie']
        const verify = verifyToken(cookie)
        if (verify) {
            const user = await userModel.findOne({ email: verify.user.email })
            return res.send({ status: "success", payload: user })
        }
    } catch (error) {
        res.send({ status: "error", error: 'No hay usuario logeado' })
    }
}