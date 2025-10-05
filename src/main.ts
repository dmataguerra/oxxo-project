import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule} from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

async function bootstrap() {

  const app = await NestFactory.create(AppModule, { cors: {origin: process.env.allowedOrigin, credentials : true} });
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('OXXO API')
    .setDescription('The OXXO API description')
    .setVersion('0.9')
    .addTag('oxxo')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  const port = Number(process.env.PORT) || 4000;
  await app.listen(port);
  console.log(`Listening on port ${port}`);
}
bootstrap();
