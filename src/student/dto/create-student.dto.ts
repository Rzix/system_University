import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  name:string
  @IsNumber()
  Number_of_selected_units: number;
  @IsString()
  @IsOptional()
  FieldofStudy:string
  @IsString({each: true})
  Lessons:string[];
}
