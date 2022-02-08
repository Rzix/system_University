import { Inject, Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './entities/student.entity';
import { LessonsEntity } from '../lesson/entities/lessons.entity';
import { EventEntity } from 'src/event/entities/event.entity';
import { EventService } from 'src/event/event.service';
import { UtinityModule } from 'src/utinity/utinity.module';
import { UtinityService } from 'src/utinity/utinity.service';
import { CurrencyModule } from 'src/currency/currency.module';
import { LoggerModule } from 'src/logger/logger.module';
import { TUITION } from 'src/currency/constants/token.constant';



@Module({
  imports:[TypeOrmModule.forFeature([StudentEntity,LessonsEntity,EventEntity])
  ,UtinityModule,LoggerModule,CurrencyModule,
CurrencyModule.forRoot(false)],
  controllers: [StudentController],
  providers: [StudentService,{
    provide:'STUDENT_NUMBER',
    useValue:'http://edu.iau.ac.ir'
  }, EventService,
 
  ]
})
export class StudentModule {}
