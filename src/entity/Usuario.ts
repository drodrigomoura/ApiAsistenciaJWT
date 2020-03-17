import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { Persona } from "./Persona";
import { Allow } from "class-validator";
import { RolUsuario } from "./RolUsuario";

@Entity()
export class Usuario extends Persona {

    @Allow()
    @Column("varchar", {
        length: 8,
        unique: true
    })
    nombreUsuario: string;

    @Column()
    clave: string;

    @OneToOne(type => RolUsuario, { cascade: true })
    @JoinColumn()
    rol: RolUsuario;

}