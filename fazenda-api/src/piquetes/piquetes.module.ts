import { Module } from '@nestjs/common';
import { PiquetesService } from './piquetes.service';
import { PiquetesController } from './piquetes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PiquetesController],
  providers: [PiquetesService],
})
export class PiquetesModule {}
