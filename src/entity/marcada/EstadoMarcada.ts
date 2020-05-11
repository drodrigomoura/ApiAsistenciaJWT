import { Identidad } from "../comun/Identidad";
import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { Direccion } from "../comun/Direccion";
import { Institucion } from "../institucion/Institucion";
import { Asistencia } from "../asistencia/Asistencia";
import { Marcada } from "./Marcada";

@Entity()
export class EstadoMarcada extends Identidad {

    @Column()
    estado: string

    @OneToMany(type => Marcada, marcada => marcada.estadoMarcada)
    marcadas: Marcada[];
}