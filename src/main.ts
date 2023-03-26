import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';
import cookieParser from 'cookie-parser';
import { json, urlencoded } from 'body-parser';
import helmet from 'helmet';
// TODO: needs to updated
import { description } from '../package.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  app.setGlobalPrefix('apis/v1', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.use(cookieParser());
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(json({ limit: '100mb' }));
  app.use(urlencoded({ limit: '100mb', extended: true }));
  const config = new DocumentBuilder()
    .setTitle('App Apis')
    .setDescription(description)
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(configService.get<string>('port'));
}
bootstrap();
