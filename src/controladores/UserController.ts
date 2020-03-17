import { JsonController, Param, Body, Get, Post, Put, Delete, UseBefore } from "routing-controllers";
import { getRepository } from "typeorm";
import { LoginMiddlewar } from "../middlewares/LoginMiddlewar";
import { Usuario } from "../entity/Usuario";

@JsonController()
// @UseBefore(LoginMiddlewar)
export class UserController {

    private userRepository = getRepository(Usuario);

    @Get("/users")
    //@UseBefore(PruebaMiddlewar)
    getAll() {
        //setTimeout(a);
        return this.userRepository.find();
    }



    @Get("/prueba")
    //@UseBefore(PruebaMiddlewar)
    async devolviendo() {

        let user = await this.userRepository.findOne(1)
            .then(
                resolve => {
                    console.log(resolve);
                    return resolve;
                }, reject => {
                    console.log(reject);
                    setTimeout(() => { this.devolviendo() }, 1000);
                });
        // console.log("Hola ");


        return user;
        //return a;

    }

    @Get("/users/:id")
    getOne(@Param("id") id: number) {
        return this.userRepository.findOne(id);
    }

    @Post("/users")
    post(@Body() user: Usuario) {
        return this.userRepository.save(user);
    }

    @Put("/users/:id")
    put(@Param("id") id: number, @Body() user: Usuario) {
        return this.userRepository.update(id, user);
    }

    @Delete("/users/:id")
    async remove(@Param("id") id: number) {
        let userToRemove = await this.userRepository.findOne(id);
        return this.userRepository.remove(userToRemove);
    }

}