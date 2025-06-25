import { Injectable } from '@nestjs/common';
import { CreatePiqueteDto } from './dto/create-piquete.dto';
import { UpdatePiqueteDto } from './dto/update-piquete.dto';

@Injectable()
export class PiquetesService {
  create(createPiqueteDto: CreatePiqueteDto) {
    return 'This action adds a new piquete';
  }

  findAll() {
    return `This action returns all piquetes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} piquete`;
  }

  update(id: number, updatePiqueteDto: UpdatePiqueteDto) {
    return `This action updates a #${id} piquete`;
  }

  remove(id: number) {
    return `This action removes a #${id} piquete`;
  }
}
