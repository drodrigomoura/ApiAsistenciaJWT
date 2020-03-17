import { JsonController, Post, Body } from "routing-controllers";
import { getRepository } from "typeorm";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { Usuario } from "../entity/Usuario";

@JsonController()
export class LoginControlador {

    private userRepository = getRepository(Usuario);

    //private restriccionDniUsuarioRepositorio = getRepository(RestriccionDniUsuario);

    @Post("/login")
    async post(@Body() user: Usuario) {
        //  try {
        console.log(user.rol.descripcion);
        let user1 = await this.devolverUsuarioPorUsuarioYClave(user.nombreUsuario, user.clave).catch((err: any) => {
            throw new Error("Usuario no encontrado " + err.message);
        });
        console.log(user1);
        //Sing JWT, valid for 1 hour
        const token = jwt.sign(
            { userId: user1.id, username: user1.nombreUsuario, rol: user1.rol.descripcion },
            config.jwtSecret,
            { expiresIn: "1h" }
        );
        //Send the jwt in the response
        //res.send(token);
        return token;

        // } catch (error) {
        //     return error.message;
        // }
    }

    devolverUsuarioPorUsuarioYClave(nombreUsuario: string, clave: String) {
        // let restriccionDniUsuario = await this.restriccionDniUsuarioRepositorio.findOneOrFail({
        //     where: {
        //         usuario: usuario
        //     }
        // });
        let user = this.userRepository.findOne({
            relations: ["rol"],
            where: {
                nombreUsuario: nombreUsuario,
                clave: clave
            }
        });

        return user;

    }


}