import { Module } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { ProfessorController } from './professor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ProfessorEntity } from './entities/professor.entity';
import { EventEntity } from 'src/event/entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProfessorEntity,EventEntity])],
  controllers: [ProfessorController],
  providers: [ProfessorService]
})
export class ProfessorModule {}
