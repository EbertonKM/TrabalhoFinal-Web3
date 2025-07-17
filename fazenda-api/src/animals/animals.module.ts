import { Module } from '@nestjs/common';
import { AnimalService } from './animals.service';
import { AnimalsController } from './animals.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AnimalsController],
  providers: [AnimalService],
})
export class AnimalsModule {}
