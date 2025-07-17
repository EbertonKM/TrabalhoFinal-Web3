import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateLoteDto } from './dto/create-lote.dto';
import { UpdateLoteDto } from './dto/update-lote.dto';

@Injectable()
export class LoteService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.prisma.lote.findMany({
      take: limit,
      skip: offset,
      orderBy: { id: 'asc' },
      include: { animais: true, piquete: true },
    });
  }

  async findOne(id: number) {
    const lote = await this.prisma.lote.findUnique({
      where: { id },
      include: { animais: true, piquete: true },
    });

    if (lote) return lote;

    throw new HttpException('Esse lote não existe', HttpStatus.NOT_FOUND);
  }

  async create(createLoteDto: CreateLoteDto) {
    try {
      const newLote = await this.prisma.lote.create({
        data: createLoteDto,
      });
      return newLote;
    } catch (e) {
      throw new HttpException('Não foi possível cadastrar o lote', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updateLoteDto: UpdateLoteDto) {
    const lote = await this.prisma.lote.findUnique({ where: { id } });

    if (!lote)
      throw new HttpException('Esse lote não existe', HttpStatus.NOT_FOUND);

    try {
      return this.prisma.lote.update({
        where: { id },
        data: updateLoteDto,
      });
    } catch (e) {
      throw new HttpException('Não foi possível atualizar o lote', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    const lote = await this.prisma.lote.findUnique({ where: { id } });

    if (!lote)
      throw new HttpException('Esse lote não existe', HttpStatus.NOT_FOUND);

    try {
      await this.prisma.lote.delete({ where: { id } });
      return 'Lote excluído com sucesso';
    } catch (e) {
      throw new HttpException('Não foi possível deletar o lote', HttpStatus.BAD_REQUEST);
    }
  }
}