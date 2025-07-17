import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';

@Injectable()
export class AnimalService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.prisma.animal.findMany({
      take: limit,
      skip: offset,
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const animal = await this.prisma.animal.findUnique({
      where: { id },
    });

    if (animal) return animal;

    throw new HttpException('Esse animal não existe', HttpStatus.NOT_FOUND);
  }

  async create(createAnimalDto: CreateAnimalDto) {
    try {
      const newAnimal = await this.prisma.animal.create({
        data: createAnimalDto,
      });
      return newAnimal;
    } catch (e) {
      throw new HttpException('Não foi possível cadastrar o animal', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updateAnimalDto: UpdateAnimalDto) {
    const animal = await this.prisma.animal.findUnique({ where: { id } });

    if (!animal)
      throw new HttpException('Esse animal não existe', HttpStatus.NOT_FOUND);

    try {
      return this.prisma.animal.update({
        where: { id },
        data: updateAnimalDto,
      });
    } catch (e) {
      throw new HttpException('Não foi possível atualizar o animal', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    const animal = await this.prisma.animal.findUnique({ where: { id } });

    if (!animal)
      throw new HttpException('Esse animal não existe', HttpStatus.NOT_FOUND);

    try {
      await this.prisma.animal.delete({ where: { id } });
      return 'Animal excluído com sucesso';
    } catch (e) {
      throw new HttpException('Não foi possível deletar o animal', HttpStatus.BAD_REQUEST);
    }
  }
}