import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { NodeInternalServerErrorExceptionFilter } from 'src/filters/node-exception.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
      whitelist: true,
    }),
  );

  app.enableCors();

  app.useGlobalFilters(
    new NodeInternalServerErrorExceptionFilter(),
    new HttpExceptionFilter(),
  );

  const config = new DocumentBuilder()
    .setTitle('licking-api')
    .setDescription('프론트엔드 개발과제를 위한 서버')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(8080);
}
bootstrap();
