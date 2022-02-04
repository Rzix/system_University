import { Type } from "class-transformer";
import { IsOptional } from "class-validator";

export class PaginationDto {
   // @Type(()=>Number)     because active transformOptions in main.ts
    @IsOptional()
    Page:number;
  //  @Type(()=>Number)      because active transformOptions in main.ts
    @IsOptional()
    PageCount:number

}
