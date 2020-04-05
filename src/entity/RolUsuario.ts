import { Entity, Column, CreateDateColumn } from "typeorm";
import { Identidad } from "./comun/Identidad";

@Entity()
export class RolUsuario extends Identidad {

    @Column()
    descripcion: string;

}