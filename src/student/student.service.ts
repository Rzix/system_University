import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';
import { NotFoundError, skip, throwError } from 'rxjs';
import { Connection, QueryRunnerAlreadyReleasedError, Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { LessonsEntity } from '../lesson/entities/lessons.entity';
import { StudentEntity } from './entities/student.entity';
import { PaginationDto } from './dto/pagination.dto';
import { EventEntity, EventType } from 'src/event/entities/event.entity';
import { RefTypeEnum } from 'src/enum/ref-type.enum';
import { EventService } from 'src/event/event.service';
import { TUITION } from '../currency/constants/token.constant';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class StudentService {
  constructor(
    @Inject('STUDENT_NUMBER')
    private readonly student_number:string,
    @InjectRepository(StudentEntity)
    private readonly studentRepository:Repository<StudentEntity>,
    @InjectRepository(LessonsEntity)
    private readonly LessonRepository:Repository<LessonsEntity>,
    @InjectRepository(EventEntity)
    private readonly eventRepository:Repository<EventEntity>,
    private readonly connection: Connection,
    private readonly eventService:EventService,
    @Inject(TUITION) private readonly tuition:string ,
    private readonly loggerService:LoggerService,
  ){
    this.loggerService.Setprifix('PostService :')
    this.loggerService.log(`constructor,student number is ${student_number}`)
    this.loggerService.log(`constructor,tuition number is ${this.tuition}`)
  }

  async preloadLessons(item:string){
    const Lesson= await this.LessonRepository.findOne({
      where:{
      name:item,
      }
     })
     if(Lesson){
       return Lesson
     }
     else{
       return this.LessonRepository.create({name:item})
     }
  }
 async create(createStudentDto: CreateStudentDto) {
 const Lessons=await Promise.all(  createStudentDto.Lessons.map(item=>{
   return this. preloadLessons(item) 
   }))
   const student=this.studentRepository.create({
     ...createStudentDto,
     Lessons
   });
   return this.studentRepository.save(student)
  }

  findAll(pageination?:PaginationDto) { 
    return this.studentRepository.find({
      relations:['Lessons'],
      skip:pageination.Page*pageination.PageCount,
      take:pageination.PageCount
    });
  }

   findOne(id: number) {
    return this.studentRepository.findOne(id,{
      relations:['Lessons']
    })
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const Lessons=await Promise.all(  updateStudentDto.Lessons.map(item=>{
      return this. preloadLessons(item) 
      }))
      const student=this.studentRepository.create({
        id:id,
        ...updateStudentDto,
        Lessons
      });
    if(!student){
       throw new NotFoundException(`The student with ${id} not found`)
    }
   return this.studentRepository.save(student)
     }
  

  async remove(id: number) {
    const student= await this.findOne(id);
    this.studentRepository.remove(student);
    return student;
  }


 async event(id: number,type:EventType,professorId:number){
  const queryRunner=this.connection.createQueryRunner()
  let student= await this.findOne(id);
  this.eventService.getEventByStudent(
    student.id,
    RefTypeEnum.Student_work,
    professorId,EventType.Note
    );
  if(type==EventType.Note){
    student.Note
  }
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try{
  student =await this.LessonRepository.save(student)
  this.eventRepository.create({
    massage:type,
    refId: student.id,
    refType:RefTypeEnum.Student_work
  });
 await queryRunner.commitTransaction()
}
catch(e){
 await queryRunner.rollbackTransaction()
}
finally{
 await queryRunner.release();
}
return student
  }

}
