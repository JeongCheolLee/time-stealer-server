import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = parseInt(process.env.PORT, 10);

  const config = new DocumentBuilder()
    .setTitle('yo, I am time stealer')
    .setDescription('월드클래스 대도 time stealer의 API 문서')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  /**
   * cors
   */
  app.enableCors({
    credentials: true,
    exposedHeaders: ['Authorization'],
  });

  await app.listen(port);
}
bootstrap();
