import { Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { LessonsEntity } from "../../lesson/entities/lessons.entity";
@Entity('student')
export class StudentEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    Number_of_selected_units:number //تعداد واحد انتخابی
    @Column()
    FieldofStudy:string
    @ManyToMany(type=> LessonsEntity, lessons=>lessons.students,{
        cascade:true
    })
    @JoinTable() 
    Lessons:LessonsEntity[]
}
