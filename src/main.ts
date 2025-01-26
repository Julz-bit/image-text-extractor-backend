import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  //config
  const configService = app.get(ConfigService);
  //cors
  app.enableCors();
  //swagger
  const config = new DocumentBuilder()
    .setTitle("Image Text Extractor")
    .setDescription("A simple API that handles extracting text from images")
    .setVersion('1.0')
    .addTag("Files")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);
  await app.listen(+configService.get<number>('APP_PORT') || 3001);
}
bootstrap();