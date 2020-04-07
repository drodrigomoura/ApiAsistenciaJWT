import { JsonController, Get } from "routing-controllers";


@JsonController()
export class InicioControlador {

    @Get('/')
    getInicio() {
        return "Bienvenidos a ApiAsistencia";
    }
}