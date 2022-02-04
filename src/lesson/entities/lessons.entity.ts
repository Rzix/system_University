import { Optional } from "@nestjs/common";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { StudentEntity } from "../../student/entities/student.entity";

@Entity('Lesson')
export class LessonsEntity {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    name:string
    @Column()
    course:number //واحد درس
    @Column()
    Lesson_Code:number     //کد درس
    @Column()
    Presentation_Code:number //کد ارائه درس
    @ManyToMany(type=>StudentEntity, students=>students.Lessons)
    students:StudentEntity
}
