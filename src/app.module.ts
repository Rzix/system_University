import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentController } from './student/student.controller';
import { StudentService } from './student/student.service';
import { StudentModule } from './student/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './student/entities/student.entity';
import { LessonModule } from './lesson/lesson.module';
import { EventModule } from './event/event.module';
import { UtinityService } from './utinity/utinity.service';
import { UtinityModule } from './utinity/utinity.module';
import { LoggerService } from './logger/logger.service';
import { LoggerModule } from './logger/logger.module';
import { TranslateModule } from './translate/translate.module';
import { TextfieldsModule } from './textfields/textfields.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [StudentModule,TypeOrmModule.forRoot({

    type: 'postgres',
    host: process.env.HOST,
    port: +process.env.PORT,
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    extra: {
      trustServerCertificate: true,
    },
   
    synchronize: true,
    autoLoadEntities: true,
  }), LessonModule, EventModule, UtinityModule, 
  ConfigModule.forRoot({envFilePath:'.env',validationSchema:Joi.object({HOST:Joi.string().required(),
     PORT:Joi.number().required()
    ,USER_NAME:Joi.string().default('reza2019')
    ,PASSWORD:Joi.string().required(),
  DATABASE:Joi.string().required(),
  CURRENCY:Joi.string().default('dollar')})}), LoggerModule, TranslateModule, TextfieldsModule],
  controllers: [AppController],
  providers: [AppService, UtinityService], 
})



export class AppModule {}
function HOST(HOST: any, arg1: Joi.StringSchema): any {
  throw new Error('Function not implemented.');
}

