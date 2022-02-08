import { Controller, Get, Headers, Param } from '@nestjs/common';
import { TranslateFielsEnum, TranslateService } from 'src/translate/translate.service';
import { TextfieldsService } from './textfields.service';

@Controller('textfields')
export class TextfieldsController {
  constructor(private readonly textfieldsService: TextfieldsService,
              private readonly translateService:TranslateService) {}
  @Get('/:field')
  getFields(@Param('input') input:TranslateFielsEnum){
         return  this.translateService.translate(input)
  };
}
