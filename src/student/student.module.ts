import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './entities/student.entity';
import { LessonsEntity } from '../lesson/entities/lessons.entity';


@Module({
  imports:[TypeOrmModule.forFeature([StudentEntity,LessonsEntity])],
  controllers: [StudentController],
  providers: [StudentService,{
    provide:'STUDENT_NUMBER',
    useValue:'http://edu.iau.ac.ir'
  },]
})
export class StudentModule {}
