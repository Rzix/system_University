import { EventEntity } from "src/event/entities/event.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('professor')
export class ProfessorEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    code:number;
    @Column()
    name:string;
    @OneToMany(()=>EventEntity,event=>event.professors)
    expertises:EventEntity[];
}
