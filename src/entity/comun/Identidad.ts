import { PrimaryGeneratedColumn, Entity, Column, CreateDateColumn } from "typeorm";

export abstract class Identidad {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    fechaCreacion: Date;

}