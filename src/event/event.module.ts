import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorEntity } from 'src/professor/entities/professor.entity';
import { StudentEntity } from 'src/student/entities/student.entity';
import { EventEntity } from './entities/event.entity';
import { EventService } from './event.service';

@Module({
    imports: [TypeOrmModule.forFeature([EventEntity,ProfessorEntity,StudentEntity  ])],
    providers: [EventService],
    exports: [EventService],
})
export class EventModule {}
