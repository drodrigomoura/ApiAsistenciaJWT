import { JsonController, Param, Body, Get, Post, Put, Delete, UseBefore } from "routing-controllers";
import { getRepository } from "typeorm";
import { VerificarTokenMiddleWar } from "../middlewares/VerificarTokenMiddlewar";
import { Asistencia } from "../entity/asistencia/Asistencia";
import { Marcada } from "../entity/marcada/Marcada";
import { EstadoMarcada } from "../entity/marcada/EstadoMarcada";

@JsonController()
@UseBefore(VerificarTokenMiddleWar)
export class EstadoMarcadaControlador {

    private estadoMarcadaRepositorio = getRepository(EstadoMarcada);

    @Get("/estadoMarcada")

    getAll() {
        return this.estadoMarcadaRepositorio.find();
    }

    @Get("/estadoMarcada/:id")
    getOne(@Param("id") id: number) {
        return this.estadoMarcadaRepositorio.findOne(id);
    }

    @Post("/estadoMarcada")
    post(@Body() estadoMarcada: EstadoMarcada) {
        return this.estadoMarcadaRepositorio.save(estadoMarcada);
    }

    @Put("/estadoMarcada/:id")
    put(@Param("id") id: number, @Body() estadoMarcada: EstadoMarcada) {
        return this.estadoMarcadaRepositorio.update(id, estadoMarcada);
    }

    @Delete("/estadoMarcada/:id")
    async remove(@Param("id") id: number) {
        let estadoMarcadaToRemove = await this.estadoMarcadaRepositorio.findOne(id);
        return this.estadoMarcadaRepositorio.remove(estadoMarcadaToRemove);
    }

}