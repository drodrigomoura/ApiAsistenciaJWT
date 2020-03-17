import * as jwt from "jsonwebtoken";
import config from "../../config/config";
import { Usuario } from "../../entity/Usuario";

import { Response } from "express";

export class TokenControlador {

    static asignartoken(user: Usuario) {
        const token = jwt.sign(
            { userId: user.id, username: user.nombreUsuario, rol: user.rol.descripcion },
            config.jwtSecret,
            { expiresIn: "1h" }
        );
        return token;
    }


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