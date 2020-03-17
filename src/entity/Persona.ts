import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Identidad } from "./comun/Identidad";

export abstract class Persona extends Identidad {

    @Column()
    nombre: string;

    @Column("int", {
        width: 8,
        unique: true
    })
    dni: number;


}