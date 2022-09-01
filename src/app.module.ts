import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubscribersModule } from './subscribers/subscribers.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [SubscribersModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
