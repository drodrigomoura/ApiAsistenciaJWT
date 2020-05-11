import { getRepository, In, BeforeInsert } from "typeorm";
import { Usuario } from "../../entity/Usuario";
import { Asistencia } from "../../entity/asistencia/Asistencia";
import { Marcada } from "../../entity/marcada/Marcada";
import { VerificarTokenMiddleWar } from "../../middlewares/VerificarTokenMiddlewar";
import { UseBefore, JsonController } from "routing-controllers";

/**
 * Sirve para realizar diferentes consultas a la base de dato (Utilzando el patron Controller)
 */

export class Controlador {

    private usuarioRepository = getRepository(Usuario);
    private asistenciaRepositorio = getRepository(Asistencia);
    private marcadaRepositorio = getRepository(Marcada);

    /**
     * Devuelve un usuario por nombre de usuario y clave.
    * @param nombreUsuario  nombre de usuario(string).
    * @param clae  clave de usuario(string).
    */
    devolverUsuarioPorUsuarioYClave(nombreUsuario: string, clave: String) {
        console.log('Nombre' + nombreUsuario + ' clave' + clave);

        let usuario = this.usuarioRepository.findOneOrFail({
            relations: ["rol"],
            where: {
                nombreUsuario: nombreUsuario,
                clave: clave
            }
        });
        return usuario;
    }


    hayAsistenciaHoy(fecha: string, idUsuario: number) {
        console.log('fecha ' + fecha + 'idUsuario ' + idUsuario);
        let asistencia = this.asistenciaRepositorio.findOneOrFail({
            relations: ["marcadas"],
            where: {
                fecha: fecha,
                usuario: idUsuario
            }
        });
        return asistencia;
    }

    async controlarYActualizarMarcadasDeAsistencia(asistencia: Asistencia) {
        try {
            let asist = await this.hayAsistenciaHoy(asistencia.fecha, asistencia.usuario.id);
            let marcada = asistencia.marcadas.pop();
            asist.marcadas.push(marcada);
            return asist;/* this.asistenciaRepositorio.save(asist); */
        } catch (error) {
            //return null;
            throw new Error('No hay asistencia en la fecha');
        }
    }


}