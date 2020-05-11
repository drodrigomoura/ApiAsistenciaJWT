import { Identidad } from "../comun/Identidad";
import { Entity, Column, ManyToOne, BeforeInsert } from "typeorm";
import { Institucion } from "../institucion/Institucion";
import { Asistencia } from "../asistencia/Asistencia";
import { EstadoMarcada } from "./EstadoMarcada";
import { Usuario } from "../Usuario";
import { DateUtils } from "../../util/DateUtils";

@Entity()
export class Marcada extends Identidad {

    @Column()
    hora: string;

    @Column()
    geolocalizacion: string

    @ManyToOne(type => Asistencia, asistencia => asistencia.marcadas)
    asistencia: Asistencia;

    @ManyToOne(type => Institucion, institucion => institucion.marcadas)
    institucion: Institucion;

    @ManyToOne(type => EstadoMarcada, estadoMarcada => estadoMarcada.marcadas)
    estadoMarcada: EstadoMarcada;

    // @BeforeInsert()
    // setearHora() {
    //     console.log('Before');
    //     this.hora = DateUtils.mixedDateToTimeString(new Date());
    // }

}