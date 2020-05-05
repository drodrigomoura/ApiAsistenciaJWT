import { JsonController, Param, Body, Get, Post, Put, Delete, UseBefore } from "routing-controllers";
import { getRepository } from "typeorm";
import { VerificarTokenMiddleWar } from "../middlewares/VerificarTokenMiddlewar";
import { Institucion } from "../entity/institucion/Institucion";

@JsonController()
@UseBefore(VerificarTokenMiddleWar)
export class InstitucionControlador {

    private institucionRepositorio = getRepository(Institucion);

    @Get("/institucion")
    getAll() {
        return this.institucionRepositorio.find();
    }

    @Get("/institucion/:id")
    getOne(@Param("id") id: number) {
        return this.institucionRepositorio.findOne(id);
    }

    @Post("/institucion")
    post(@Body() institucion: Institucion) {
        return this.institucionRepositorio.save(institucion);
    }

    @Put("/institucion/:id")
    put(@Param("id") id: number, @Body() institucion: Institucion) {
        return this.institucionRepositorio.update(id, institucion);
    }

    @Delete("/institucion/:id")
    async remove(@Param("id") id: number) {
        let institucionToRemove = await this.institucionRepositorio.findOne(id);
        return this.institucionRepositorio.remove(institucionToRemove);
    }

}