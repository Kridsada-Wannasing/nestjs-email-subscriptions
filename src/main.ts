import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // with TCP
  // await app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.TCP,
  //   options: {
  //     port: configService.get('PORT'),
  //   },
  // });

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'subscribers',
      protoPath: join(process.cwd(), 'src/subscribers/subscribers.proto'),
      url: configService.get('GRPC_CONNECTION_URL'),
    },
  });

  app.startAllMicroservices();
}
bootstrap();
