import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { query } from 'express';
import { PaginationDto } from './dto/pagination.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  insert(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  findAll() {
    return this.studentService.findAll();
  }
  @Get('/PaginationDto')
  findAllPaginateds(@Query() query: PaginationDto){
    return this.studentService.findAll(query);
  }
  @Put(':id')
  update(@Param('id') id, @Body() createStudentDto: CreateStudentDto) {
    return this.studentService.update(+id, createStudentDto);
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return this.studentService.findOne(+id);
  }
   


  @Patch(':id')
  patch(@Param('id') id, @Body() updateStudentDto: UpdateStudentDto) {
    console.log(updateStudentDto instanceof UpdateStudentDto);    
    return this.studentService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
  @Get('/page')
  findAllPaginated(@Query()query:PaginationDto){
    return `Allposts,paginated,page ${query.Page}, count: ${query.PageCount}`;
  }
}
