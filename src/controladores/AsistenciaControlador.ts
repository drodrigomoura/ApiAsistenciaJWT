import { JsonController, Param, Body, Get, Post, Put, Delete, UseBefore } from "routing-controllers";
import { getRepository } from "typeorm";
import { VerificarTokenMiddleWar } from "../middlewares/VerificarTokenMiddlewar";
import { Asistencia } from "../entity/asistencia/Asistencia";
import { Controlador } from "./personalizados/Controlador";

@JsonController()
@UseBefore(VerificarTokenMiddleWar)
export class AsistenciaControlador {

    private asistenciaRepositorio = getRepository(Asistencia);

    private controlador: Controlador = new Controlador();

    @Get("/asistencia")
    getAll() {
        return this.asistenciaRepositorio.find();
    }

    @Get("/asistencia/:id")
    getOne(@Param("id") id: number) {
        return this.asistenciaRepositorio.findOne(id);
    }

    @Post("/asistencia")
    async post(@Body() asistencia: Asistencia) {
        try {
            let retorno = await this.controlador.controlarYActualizarMarcadasDeAsistencia(asistencia);
            return retorno;
        } catch (error) {
            //Error= no hay asistencia creada en la fecha
            //Persisto la asistencia enviada
            return this.asistenciaRepositorio.save(asistencia);
        }
    }

    @Put("/asistencia/:id")
    put(@Param("id") id: number, @Body() asistencia: Asistencia) {
        return this.asistenciaRepositorio.update(id, asistencia);
    }

    @Delete("/asistencia/:id")
    async remove(@Param("id") id: number) {
        let asistenciaToRemove = await this.asistenciaRepositorio.findOne(id);
        return this.asistenciaRepositorio.remove(asistenciaToRemove);
    }

    @Get('/asistenciahoy/:idUsuario/:fecha')
    async hayAsistenciaHoy(@Param("idUsuario") idUsuario: number, @Param("fecha") fecha: string) {
        let asistencia = await this.asistenciaRepositorio.findOneOrFail({
            relations: ["marcadas", 'marcadas.estadoMarcada', 'marcadas.institucion'],
            where: {
                fecha: fecha,
                usuario: idUsuario
            }
        });

        console.log(asistencia);
        return asistencia;
    }

}