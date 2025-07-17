import { Module } from '@nestjs/common';
import { PiqueteService } from './piquetes.service';
import { PiquetesController } from './piquetes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PiquetesController],
  providers: [PiqueteService],
})
export class PiquetesModule {}
