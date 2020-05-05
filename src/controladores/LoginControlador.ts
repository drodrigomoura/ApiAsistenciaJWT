import { JsonController, Post, Body } from "routing-controllers";
import { Usuario } from "../entity/Usuario";
import { Controlador } from "./personalizados/Controlador";
import { TokenControlador } from "./personalizados/TokenControlador";

@JsonController()
export class LoginControlador {

    private controlador: Controlador = new Controlador();
    retorno;

    @Post("/login")
    async post(@Body() usuario: Usuario) {

        let usuario1 = await this.controlador.devolverUsuarioPorUsuarioYClave(usuario.nombreUsuario, usuario.clave).catch((err: any) => {
            throw {
                error: new Error(),
                mensaje: 'Usuario no encontrado'
            };
        });
        const token = TokenControlador.asignartoken(usuario1);

        this.retorno = {
            'idUsuario': usuario1.id,
            'rol': usuario1.rol.descripcion,
            'dni': usuario1.dni,
            'token': token
        };

        return this.retorno;

    }

}