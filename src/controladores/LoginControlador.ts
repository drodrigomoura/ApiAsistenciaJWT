import { JsonController, Post, Body } from "routing-controllers";
import { Usuario } from "../entity/Usuario";
import { Controlador } from "./personalizados/Controlador";
import { TokenControlador } from "./personalizados/TokenControlador";

@JsonController()
export class LoginControlador {

    private controlador: Controlador = new Controlador();

    @Post("/login")
    async post(@Body() usuario: Usuario) {

        let usuario1 = await this.controlador.devolverUsuarioPorUsuarioYClave(usuario.nombreUsuario, usuario.clave).catch((err: any) => {
            throw new Error("Usuario no encontrado " + err.message);
        });
        const token = TokenControlador.asignartoken(usuario1);

        return token;

    }

}