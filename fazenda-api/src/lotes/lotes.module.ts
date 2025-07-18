import { Module } from '@nestjs/common';
import { LoteService } from './lotes.service';
import { LotesController } from './lotes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LotesController],
  providers: [LoteService],
})
export class LotesModule {}
