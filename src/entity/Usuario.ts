import { Entity, Column, OneToMany, ManyToOne } from "typeorm";
import { Persona } from "./Persona";
import { Allow } from "class-validator";
import { RolUsuario } from "./RolUsuario";
import { Asistencia } from "./asistencia/Asistencia";

@Entity()
export class Usuario extends Persona {

    @Allow()
    @Column("varchar", {
        length: 45,
        unique: true
    })
    nombreUsuario: string;

    @Column()
    clave: string;

    //@OneToOne(type => RolUsuario, { cascade: true })
    //@JoinColumn()
    //rol: RolUsuario;
    //Debe ser Uno a Muchos
    
    @ManyToOne(type => RolUsuario, rolUsuario => rolUsuario.usuarios)
    rol: RolUsuario;

    @OneToMany(type => Asistencia, asistencia => asistencia.usuario)
    asistencias: Asistencia[];

}