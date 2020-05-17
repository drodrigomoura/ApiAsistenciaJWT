import { Entity, Column, OneToMany } from "typeorm";
import { Identidad } from "./comun/Identidad";
import { Usuario } from "./Usuario";

@Entity()
export class RolUsuario extends Identidad {

    @Column()
    descripcion: string;

    @OneToMany(type => Usuario, usuario => usuario.rol) // note: we will create author property in the Photo class below
    usuarios: Usuario[];

}