import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  //swagger
  const config = new DocumentBuilder()
    .setTitle('Clinic API')
    .setDescription('API Documentation for Clinic System')
    .setVersion('1.0')
    .addBearerAuth() // عشان JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // Global error handling
  app.useGlobalFilters(new AllExceptionsFilter());
  // await app.listen(process.env.PORT ?? 5000);
  if (process.env.NODE_ENV !== 'production') {
  await app.listen(3000);
}

}
bootstrap();
