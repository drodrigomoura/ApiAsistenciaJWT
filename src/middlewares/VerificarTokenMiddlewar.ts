import { Request, Response, NextFunction } from "express";
import { TokenControlador } from "../controladores/personalizados/TokenControlador";

export class VerificarTokenMiddleWar {

    use(req: Request, res: Response, next: NextFunction) {
        
        const token = <string>req.headers["auth"];

        TokenControlador.controlarToken(token, res);

        next();
    }

}