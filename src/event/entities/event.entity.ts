
import { ProfessorEntity } from "src/professor/entities/professor.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
export enum EventType{
    Note='NOTE',
    Theme='THEME'
}


@Entity('Event')
export class EventEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column(  
    {length: 15})         
    massage:EventType;
    @Column()
    refType:string;
    @Column()
    refId:number;
    @ManyToOne(() => ProfessorEntity,(professor)=>professor.expertises)
    @JoinColumn()
    professors: ProfessorEntity;
}
