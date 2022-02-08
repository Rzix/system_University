import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RefTypeEnum } from 'src/enum/ref-type.enum';
import { Repository } from 'typeorm';
import { EventEntity, EventType } from './entities/event.entity';

@Injectable()
 export class EventService {
    constructor(@InjectRepository(EventEntity)
    private readonly eventRepository:Repository<EventEntity>){}
    async getEventByStudent(refId:number,refType:RefTypeEnum,professorId:number,type:EventType){
      const event =await this.eventRepository.find({
            where:{
                refId,
                refType,
                professorId,
                type
            }
        });
        return event
    }

}
