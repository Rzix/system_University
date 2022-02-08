import { Module } from '@nestjs/common';
import { UtinityService } from './utinity.service';

@Module({
    providers:[UtinityService],
    exports:[UtinityService]
})
export class UtinityModule {}
