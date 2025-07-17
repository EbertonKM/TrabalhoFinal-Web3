import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreatePiqueteDto } from './dto/create-piquete.dto';
import { UpdatePiqueteDto } from './dto/update-piquete.dto';

@Injectable()
export class PiqueteService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.prisma.piquete.findMany({
      take: limit,
      skip: offset,
      orderBy: { id: 'asc' },
      include: { lote: true },
    });
  }

  async findOne(id: number) {
    const piquete = await this.prisma.piquete.findUnique({
      where: { id },
      include: { lote: true },
    });

    if (piquete) return piquete;

    throw new HttpException('Esse piquete não existe', HttpStatus.NOT_FOUND);
  }

  async create(createPiqueteDto: CreatePiqueteDto) {
    try {
      const newPiquete = await this.prisma.piquete.create({
        data: createPiqueteDto,
      });
      return newPiquete;
    } catch (e) {
      throw new HttpException('Não foi possível cadastrar o piquete', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updatePiqueteDto: UpdatePiqueteDto) {
    const piquete = await this.prisma.piquete.findUnique({ where: { id } });

    if (!piquete)
      throw new HttpException('Esse piquete não existe', HttpStatus.NOT_FOUND);

    try {
      return this.prisma.piquete.update({
        where: { id },
        data: updatePiqueteDto,
      });
    } catch (e) {
      throw new HttpException('Não foi possível atualizar o piquete', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    const piquete = await this.prisma.piquete.findUnique({ where: { id } });

    if (!piquete)
      throw new HttpException('Esse piquete não existe', HttpStatus.NOT_FOUND);

    try {
      await this.prisma.piquete.delete({ where: { id } });
      return 'Piquete excluído com sucesso';
    } catch (e) {
      throw new HttpException('Não foi possível deletar o piquete', HttpStatus.BAD_REQUEST);
    }
  }
}