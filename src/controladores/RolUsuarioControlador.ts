import { JsonController, Param, Body, Get, Post, Put, Delete, UseBefore } from "routing-controllers";
import { getRepository } from "typeorm";
import { LoginMiddlewar } from "../middlewares/LoginMiddlewar";
import { Usuario } from "../entity/Usuario";
import { RolUsuario } from "../entity/RolUsuario";

@JsonController()
// @UseBefore(LoginMiddlewar)
export class RolUsuarioControlador {

    private rolRepositorio = getRepository(RolUsuario);

    @Get("/rol")
    //@UseBefore(PruebaMiddlewar)
    getAll() {
        //setTimeout(a);
        return this.rolRepositorio.find();
    }


    @Get("/rol/:id")
    getOne(@Param("id") id: number) {
        return this.rolRepositorio.findOne(id);
    }

    @Post("/rol")
    post(@Body() rol: RolUsuario) {
        return this.rolRepositorio.save(rol);
    }

    @Put("/rol/:id")
    put(@Param("id") id: number, @Body() rol: RolUsuario) {
        return this.rolRepositorio.update(id, rol);
    }

    @Delete("/rol/:id")
    async remove(@Param("id") id: number) {
        let rolToRemove = await this.rolRepositorio.findOne(id);
        return this.rolRepositorio.remove(rolToRemove);
    }

}