
import { Request, Response, NextFunction } from "express";

export class PruebaMiddlewar {

    use(req: Request, resp: Response, next: NextFunction) {
        console.log('Time:', Date.now());
        resp.status(401).send();
        return;
        next();
    }


}