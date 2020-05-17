import { Identidad } from "../comun/Identidad";
import { Entity, Column, OneToMany } from "typeorm";
import { Direccion } from "../comun/Direccion";
import { Marcada } from "../marcada/Marcada";

@Entity()
export class Institucion extends Identidad {

    @Column()
    nombre: string;

    @Column()
    siglas: string

    @Column()
    cue: string

    @Column({ nullable: true })
    geolocalizacion: string

    @Column(type => Direccion)
    direccion: Direccion;

    @OneToMany(type => Marcada, marcada => marcada.institucion)
    marcadas: Marcada[];

}