import { Column } from "typeorm";

export class Direccion {

    @Column({ nullable: true })
    calle: string;

    @Column({ nullable: true })
    altura: string;

}