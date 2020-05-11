import { JsonController, Param, Body, Get, Post, Put, Delete, UseBefore } from "routing-controllers";
import { getRepository } from "typeorm";
import { VerificarTokenMiddleWar } from "../middlewares/VerificarTokenMiddlewar";
import { Asistencia } from "../entity/asistencia/Asistencia";
import { Marcada } from "../entity/marcada/Marcada";

@JsonController()
@UseBefore(VerificarTokenMiddleWar)
export class MarcadaControlador {

    private marcadaRepositorio = getRepository(Marcada);

    @Get("/marcada")

    getAll() {
        return this.marcadaRepositorio.find();
    }

    @Get("/marcada/:id")
    getOne(@Param("id") id: number) {
        return this.marcadaRepositorio.findOne(id);
    }

    @Post("/marcada")
    post(@Body() marcada: Marcada) {
        return this.marcadaRepositorio.save(marcada);
    }

    @Put("/marcada/:id")
    put(@Param("id") id: number, @Body() marcada: Marcada) {
        return this.marcadaRepositorio.update(id, marcada);
    }

    @Delete("/marcada/:id")
    async remove(@Param("id") id: number) {
        let marcadaToRemove = await this.marcadaRepositorio.findOne(id);
        return this.marcadaRepositorio.remove(marcadaToRemove);
    }

    @Get('/ultimaMarcada')
    async devolverUltimaMarcada() {
        console.log('idAsistencia ' + 2);
        let marcada = await this.marcadaRepositorio.findOneOrFail({
            relations: ["asistencia", "institucion", "estadoMarcada"],
            where: {
                asistencia: 2
            },
            order: {
                id: "DESC"
            }
        });
        return marcada.estadoMarcada.estado;
    }


}