import * as jwt from "jsonwebtoken";
import config from "../../config/config";
import { Usuario } from "../../entity/Usuario";
import { Response } from "express";

/**
 * Sirve para realizar diferentes operaciones con jsonwebtoken (Utilzando el patron Controller)
 */
export class TokenControlador {

    /**
    * Asigna el token seteandolo con los .datos del usuario(nombreUsuario,id,rol)
    * Tambien setean el tiempo de expiracion
    * @param usuario  usuario(Usuario)..
    */
    static asignartoken(usuario: Usuario) {
        const token = jwt.sign(
            { usuarioId: usuario.id, nombreUsuario: usuario.nombreUsuario, rol: usuario.rol.descripcion },
            config.jwtSecret,
            { expiresIn: '24h' }
        );
        return token;
    }


    /**
    *   Controla que el token ingreso sea valido 
    * @param token  token(string)
    * @param res    respuesta(Response)
    */
    static controlarToken(token: string, res: Response) {
        let jwtPayload;
        console.log(token);
        //Try to validate the token and get data
        try {
            jwtPayload = <any>jwt.verify(token, config.jwtSecret);
            res.locals.jwtPayload = jwtPayload;
            console.log(jwtPayload);
        } catch (error) {
            //If token is not valid, respond with 401 (unauthorized)
            res.status(401).send(error);
        }
    }
}