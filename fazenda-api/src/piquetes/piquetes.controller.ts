import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PiqueteService } from './piquetes.service';
import { CreatePiqueteDto } from './dto/create-piquete.dto';
import { UpdatePiqueteDto } from './dto/update-piquete.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('piquetes')
export class PiquetesController {
  constructor(private readonly piquetesService: PiqueteService) {}

  @Post()
  create(@Body() createPiqueteDto: CreatePiqueteDto) {
    return this.piquetesService.create(createPiqueteDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.piquetesService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.piquetesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePiqueteDto: UpdatePiqueteDto) {
    return this.piquetesService.update(+id, updatePiqueteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.piquetesService.remove(+id);
  }
}
