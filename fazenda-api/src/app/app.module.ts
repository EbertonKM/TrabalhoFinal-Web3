import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LotesModule } from 'src/lotes/lotes.module';
import { PiquetesModule } from 'src/piquetes/piquetes.module';
import { AnimalsModule } from 'src/animals/animals.module';

@Module({
  imports: [AnimalsModule, LotesModule, PiquetesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
