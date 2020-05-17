import { Request, Response, NextFunction } from "express";
import { TokenControlador } from "../controladores/personalizados/TokenControlador";
import { UnauthorizedError } from "routing-controllers";

export class VerificarTokenMiddleWar {

    use(req: Request, res: Response, next: NextFunction) {

        //console.log(req.headers);
        const token = <string>req.headers['authorization'];
        console.log(token);

        // jwt.decode(token)[req.headers["Authorization"]] as string;
        // console.log(token);
        try {
            TokenControlador.controlarToken(token, res);
        } catch (error) {
            //res.status(401).send(error)
            return next(new UnauthorizedError('Token invalido'));
        }

        next();
    }

}