import { getRepository } from "typeorm";
import { Usuario } from "../../entity/Usuario";

/**
 * Sirve para realizar diferentes consultas a la base de dato (Utilzando el patron Controller)
 */
export class Controlador {

    private usuarioRepository = getRepository(Usuario);

    /**
     * Devuelve un usuario por nombre de usuario y clave.
    * @param nombreUsuario  nombre de usuario(string).
    * @param clae  clave de usuario(string).
    */
    devolverUsuarioPorUsuarioYClave(nombreUsuario: string, clave: String) {
        let usuario = this.usuarioRepository.findOneOrFail({
            relations: ["rol"],
            where: {
                nombreUsuario: nombreUsuario,
                clave: clave
            }
        });
        return usuario;
    }

}