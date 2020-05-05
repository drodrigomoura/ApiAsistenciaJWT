import { Request, Response, NextFunction } from "express";
import { TokenControlador } from "../controladores/personalizados/TokenControlador";

export class VerificarTokenMiddleWar {

    use(req: Request, res: Response, next: NextFunction) {

        //console.log(req.headers);
        const token = <string>req.headers['authorization'];
        console.log(token);

        // jwt.decode(token)[req.headers["Authorization"]] as string;
        // console.log(token);
        TokenControlador.controlarToken(token, res);

        next();
    }

}