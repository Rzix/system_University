import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentController } from './student/student.controller';
import { StudentService } from './student/student.service';
import { VahedController } from './vahed/vahed.controller';
import { StudentModule } from './student/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './student/entities/student.entity';
import { LessonModule } from './lesson/lesson.module';

@Module({
  imports: [StudentModule,TypeOrmModule.forRoot({

    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'reza2019',
    extra: {
      trustServerCertificate: true,
    },
    database: 'University',
    synchronize: true,
    autoLoadEntities: true,
  }), LessonModule],
  controllers: [AppController, VahedController],
  providers: [AppService],
  
})
export class AppModule {}
