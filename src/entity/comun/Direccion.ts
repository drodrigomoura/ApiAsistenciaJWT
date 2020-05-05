import { Column } from "typeorm";

export class Direccion {

    @Column()
    calle: string;

    @Column()
    altura: string;

}