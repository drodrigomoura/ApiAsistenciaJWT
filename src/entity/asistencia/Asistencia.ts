import { Identidad } from "../comun/Identidad";
import { Entity, Column, OneToMany, ManyToOne, BeforeInsert } from "typeorm";
import { DateUtils } from "../../util/DateUtils";
import { Marcada } from "../marcada/Marcada";
import { Usuario } from "../Usuario";

@Entity()
export class Asistencia extends Identidad {

    @Column()
    fecha: string;

    @OneToMany(type => Marcada, marcada => marcada.asistencia, { cascade: true, onUpdate: "CASCADE" })
    marcadas: Marcada[];

    @ManyToOne(type => Usuario, usuario => usuario.asistencias)
    usuario: Usuario;

    // @BeforeInsert()
    // setearFecha() {
    //     console.log('Before');
    //     this.fecha = DateUtils.mixedDateToDateString(new Date());
    // }
}